---
name: Canvas preview provisioning
description: Avoid unavailable previews when a user-started design helper writes into an unprovisioned sandbox.
---

A user-started design helper may create component files and mark its frame live without provisioning the isolated preview runtime. Verify the runtime separately.

**Why:** A wallet-finder variation was marked live but its URL reached the main application's 404 page. Creating the sandbox also initially collided with the helper-created directory.

**How to apply:** Check artifact metadata and workflows before delivery. If only component files exist, preserve them outside the target directory, provision the sandbox, restore them to the component discovery folder, and verify the rendered preview. Do not replace or rearrange the reserved frame.
