import struct
import unittest
import zlib
from unittest.mock import patch

import post_deploy_smoke as smoke


def chunk(tag, payload):
    return (struct.pack(">I", len(payload)) + tag + payload
            + struct.pack(">I", zlib.crc32(tag + payload)))


PNG = (b"\x89PNG\r\n\x1a\n"
       + chunk(b"IHDR", struct.pack(">IIBBBBB", 1, 1, 8, 2, 0, 0, 0))
       + chunk(b"IDAT", zlib.compress(b"\x00\x00\x00\x00"))
       + chunk(b"IEND", b""))
INDEX = f'<sitemapindex xmlns="{smoke.NS[1:-1]}"><sitemap><loc>{smoke.BASE_URL}/sitemap-static.xml</loc></sitemap></sitemapindex>'.encode()
CHILD = f'<urlset xmlns="{smoke.NS[1:-1]}"><url><loc>{smoke.BASE_URL}/?lang=en&amp;x=1</loc></url></urlset>'.encode()
RSS = b"<rss version='2.0'><channel><title>News</title><link>https://allthingsxrpl.com</link><description>Guides</description><item><title>Guide</title><link>https://allthingsxrpl.com/blog/guide</link></item></channel></rss>"


class SmokeTests(unittest.TestCase):
    def test_valid_payloads(self):
        for kind, mime, body in [
            ("news", "application/json; charset=utf-8", b'{"items":[]}'),
            ("reviews", "application/json", b'{"reviews":[],"count":0,"average":null}'),
            ("reviews", "application/json", b'{"reviews":[{"rating":5}],"count":1,"average":5}'),
            ("index", "application/xml", INDEX),
            ("sitemap", "text/xml", CHILD),
            ("rss", "application/rss+xml", RSS),
            ("png", "image/png", PNG),
        ]:
            with self.subTest(kind=kind):
                smoke.validate(kind, mime, body)

    def test_html_fallback_rejected_even_with_200_or_misleading_type(self):
        for kind, mime in [("news", "application/json"), ("reviews", "application/json"),
                           ("index", "application/xml"), ("sitemap", "application/xml"),
                           ("rss", "application/rss+xml"), ("png", "image/png")]:
            for content_type in ("text/html", mime):
                with self.subTest(kind=kind, content_type=content_type):
                    with self.assertRaises((ValueError, smoke.ET.ParseError)):
                        smoke.validate(kind, content_type, b"<html><body>SPA</body></html>")

    def test_invalid_payloads(self):
        for kind, mime, body in [
            ("news", "application/json", b'{"items":{} }'),
            ("news", "application/json", b'{"items":[{}]}'),
            ("news", "application/json", b'{"items":[],"error":"offline"}'),
            ("reviews", "application/json", b'{"reviews":[]}'),
            ("reviews", "application/json", b'{"reviews":[],"count":-1,"average":5}'),
            ("reviews", "application/json", b'{"reviews":[],"count":1,"average":null}'),
            ("index", "application/xml", CHILD),
            ("index", "application/xml", INDEX.replace(smoke.BASE_URL.encode(), b"https://elsewhere.test")),
            ("index", "application/xml", INDEX.replace(b"sitemap-static.xml", b"api/subscribe")),
            ("sitemap", "application/xml", b"<urlset>"),
            ("sitemap", "application/xml", f'<urlset xmlns="{smoke.NS[1:-1]}"/>'.encode()),
            ("rss", "application/rss+xml", b"<rss version='2.0'><channel/></rss>"),
            ("png", "image/png", PNG[:-12]),
            ("png", "image/png", PNG[:-1] + b"x"),
        ]:
            with self.subTest(kind=kind, body=body[:50]):
                with self.assertRaises((ValueError, smoke.ET.ParseError)):
                    smoke.validate(kind, mime, body)

    def test_retry_covers_content_failure_and_network_failure(self):
        responses = [OSError("timeout"), ("text/html", b"SPA"),
                     ("application/json", b'{"items":[]}')]
        with patch.object(smoke, "fetch", side_effect=responses) as fetcher:
            sleeps = []
            smoke.check("/api/news?limit=1", "news", fetcher, sleeps.append)
            self.assertEqual(fetcher.call_count, 3)
            self.assertEqual(sleeps, [smoke.RETRY_DELAY] * 2)

    def test_retries_stop_and_fail(self):
        sleeps = []
        with patch.object(smoke, "fetch", side_effect=OSError("offline")) as fetcher:
            with self.assertRaises(RuntimeError):
                smoke.check("/rss.xml", "rss", fetcher, sleeps.append)
            self.assertEqual(fetcher.call_count, smoke.ATTEMPTS)
            self.assertEqual(len(sleeps), smoke.ATTEMPTS - 1)

    def test_main_checks_all_children_and_only_read_routes(self):
        children = [smoke.BASE_URL + "/sitemap-static.xml",
                    smoke.BASE_URL + "/sitemap-blog.xml"]
        def checked(path, kind):
            return children if kind == "index" else []
        with patch.object(smoke, "check", side_effect=checked) as check:
            smoke.main()
            self.assertEqual([call.args for call in check.call_args_list], [
                ("/api/news?limit=1", "news"),
                ("/api/reviews/wallet/xaman?limit=1", "reviews"),
                ("/api/reviews/exchange/kraken?limit=1", "reviews"),
                ("/sitemap.xml", "index"),
                ("/sitemap-static.xml", "sitemap"),
                ("/sitemap-blog.xml", "sitemap"),
                ("/rss.xml", "rss"),
                ("/og/page.png?title=All%20Things%20XRPL", "png"),
            ])

    def test_failure_does_not_skip_other_checks(self):
        def checked(path, kind):
            if kind == "news":
                raise RuntimeError("news offline")
            return []
        with patch.object(smoke, "check", side_effect=checked) as check:
            with self.assertRaises(SystemExit):
                smoke.main()
            self.assertEqual(check.call_count, 6)

    def test_redirects_are_not_followed(self):
        self.assertIsNone(smoke.NoRedirect().redirect_request(
            None, None, 302, "", {}, "https://elsewhere.test"))


if __name__ == "__main__":
    unittest.main()
