---
name: Portable dependency locks
description: Keep dependency download URLs usable by the external GitHub deployment runner.
---

Check lockfile download hosts after dependency updates; external CI cannot reach Replit-internal package registry addresses.

**Why:** A deployment stopped at dependency installation despite a passing local dry run. A locked package URL pointed to an internal host; an isolated fresh-cache install passed after using the identical public npm tarball.

**How to apply:** For an approved package with an internal resolved URL, verify that the public tarball matches the existing integrity hash before changing the URL. Preserve versions and checksums. Validate with a fresh cache rather than relying on locally cached packages. This does not authorize bypassing a package security block.
