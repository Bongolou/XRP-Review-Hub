---
name: Google rich-result validation
description: Authentication barrier encountered when checking structured data with Google's Rich Results Test.
---

Distinguish automated local schema checks from an actual Google Rich Results Test result.

**Why:** On 2026-10-22, submitting a preview URL in an anonymous browser to Google's Rich Results Test returned “Something went wrong — Log in and try again,” rather than a validation report. This is not evidence of invalid structured data.

**How to apply:** If the same gate appears, use a user-authorized signed-in browser for the external check, or explicitly leave that validation pending. Do not claim Google verification from passing local tests or repeatedly submit URLs to the authentication gate.
