---
name: Live audit language redirects
description: Production redirect behavior can invalidate apparent language coverage.
---

Count language coverage by the final URL and rendered language, not the requested sitemap URL.

**Why:** During a production audit, non-home URLs without trailing slashes redirected to slash URLs while dropping `?lang`. Repeated English responses initially looked like coverage of seven additional languages.

**How to apply:** Record redirect destinations, check query preservation, and separately request slash-plus-language URLs. Distinguish initial static HTML from hydrated browser results; neither HTTP 200 nor a requested locale proves the translated surface was inspected.
