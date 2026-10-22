"""Read-only Bluehost smoke checks. Uses only Python's standard library."""

import json
import re
import struct
import time
import urllib.request
import xml.etree.ElementTree as ET
import zlib

BASE_URL = "https://allthingsxrpl.com"
NS = "{http://www.sitemaps.org/schemas/sitemap/0.9}"
MAX_BYTES = 5 * 1024 * 1024
ATTEMPTS = 4
TIMEOUT = 20
RETRY_DELAY = 10


def require(condition, message):
    if not condition:
        raise ValueError(message)


def validate(kind, content_type, body):
    mime = content_type.split(";", 1)[0].strip().lower()
    if kind in ("news", "reviews"):
        require(mime == "application/json", f"expected JSON, got {mime!r}")
        data = json.loads(body)
        require(isinstance(data, dict) and "error" not in data, "expected JSON object without error")
        key = "items" if kind == "news" else "reviews"
        require(isinstance(data.get(key), list), f"missing {key} array")
        require(all(isinstance(item, dict) for item in data[key]), f"invalid {key} entries")
        # Empty news/review lists are legitimate; never seed live data.
        if kind == "reviews":
            require(type(data.get("count")) is int and data["count"] >= 0, "invalid review count")
            require("average" in data and (
                (data["count"] == 0 and data["average"] is None)
                or (type(data["average"]) in (int, float) and 1 <= data["average"] <= 5)
            ), "invalid review average")
        else:
            for item in data["items"]:
                require(all(isinstance(item.get(key), str) and item[key].strip()
                            for key in ("title", "link", "source")), "invalid news item")
        return []
    if kind == "png":
        require(mime == "image/png", f"expected PNG, got {mime!r}")
        require(body.startswith(b"\x89PNG\r\n\x1a\n"), "invalid PNG signature")
        offset, chunks = 8, []
        while offset < len(body):
            require(offset + 12 <= len(body), "truncated PNG chunk")
            size = struct.unpack(">I", body[offset:offset + 4])[0]
            end = offset + 12 + size
            require(end <= len(body), "truncated PNG payload")
            tag = body[offset + 4:offset + 8]
            payload = body[offset + 8:end - 4]
            crc = struct.unpack(">I", body[end - 4:end])[0]
            require(zlib.crc32(tag + payload) == crc, "invalid PNG checksum")
            if not chunks:
                require(tag == b"IHDR" and size == 13, "missing PNG header")
                width, height = struct.unpack(">II", payload[:8])
                require(width > 0 and height > 0, "invalid PNG dimensions")
            chunks.append(tag)
            offset = end
            if tag == b"IEND":
                require(size == 0 and offset == len(body), "invalid PNG end")
                break
        require(b"IDAT" in chunks and chunks[-1:] == [b"IEND"], "incomplete PNG")
        return []

    require(mime in ("application/xml", "text/xml", "application/rss+xml"),
            f"expected XML, got {mime!r}")
    root = ET.fromstring(body)
    if kind == "rss":
        require(root.tag == "rss" and root.get("version") == "2.0", "expected RSS 2.0")
        channel = root.find("channel")
        require(channel is not None, "missing RSS channel")
        for field in ("title", "link", "description"):
            require(bool(channel.findtext(field, "").strip()), f"missing RSS {field}")
        items = channel.findall("item")
        require(bool(items), "empty RSS feed")
        for item in items:
            require(bool(item.findtext("title")) and bool(item.findtext("link")), "invalid RSS item")
        return []

    require(kind in ("index", "sitemap"), "unknown check type")
    expected = "sitemapindex" if kind == "index" else "urlset"
    require(root.tag == NS + expected, f"expected sitemap {expected}")
    entries = root.findall(NS + ("sitemap" if kind == "index" else "url"))
    require(bool(entries), "empty sitemap")
    locations = [entry.findtext(NS + "loc", "") for entry in entries]
    for location in locations:
        require(location.startswith(BASE_URL + "/"), "sitemap URL outside public origin")
        if kind == "index":
            require(re.fullmatch(re.escape(BASE_URL) + r"/sitemap-[a-z0-9-]+\.xml", location),
                    "unexpected child sitemap URL")
    require(len(locations) == len(set(locations)), "duplicate sitemap locations")
    return locations if kind == "index" else []


class NoRedirect(urllib.request.HTTPRedirectHandler):
    """Do not let a redirect hide a broken route or bypass the Bluehost origin."""

    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None


def fetch(url):
    request = urllib.request.Request(url, method="GET", headers={
        "User-Agent": "AllThingsXRPL-DeploySmoke/1.0",
        "Cache-Control": "no-cache",
    })
    with urllib.request.build_opener(NoRedirect).open(request, timeout=TIMEOUT) as response:
        require(response.status == 200, f"HTTP {response.status}")
        body = response.read(MAX_BYTES + 1)
        require(len(body) <= MAX_BYTES, "response exceeds size limit")
        return response.headers.get("Content-Type", ""), body


def check(path, kind, fetcher=fetch, sleeper=time.sleep):
    url = BASE_URL + path
    for attempt in range(1, ATTEMPTS + 1):
        try:
            locations = validate(kind, *fetcher(url))
            print(f"PASS {path} ({kind}, attempt {attempt})", flush=True)
            return locations
        except Exception as error:
            print(f"FAIL {path} ({attempt}/{ATTEMPTS}): {error}", flush=True)
            if attempt == ATTEMPTS:
                raise RuntimeError(f"{path}: failed after {ATTEMPTS} attempts") from error
            sleeper(RETRY_DELAY)


def main():
    failures = []
    routes = [
        ("/api/news?limit=1", "news"),
        ("/api/reviews/wallet/xaman?limit=1", "reviews"),
        ("/api/reviews/exchange/kraken?limit=1", "reviews"),
        ("/sitemap.xml", "index"),
        ("/rss.xml", "rss"),
        ("/og/page.png?title=All%20Things%20XRPL", "png"),
    ]
    for path, kind in routes:
        try:
            children = check(path, kind)
            # Check every advertised child, not just a hardcoded sample.
            for child in children:
                try:
                    check(child.removeprefix(BASE_URL), "sitemap")
                except RuntimeError as error:
                    failures.append(str(error))
        except RuntimeError as error:
            failures.append(str(error))
    if failures:
        raise SystemExit("Post-deploy smoke checks failed:\n" + "\n".join(failures))
    print("All read-only Bluehost smoke checks passed.", flush=True)


if __name__ == "__main__":
    main()
