---
name: Visitor country routing
description: Why visitor country detection must not use the backend relay's location.
---

Resolve the visitor's country from the browser rather than assuming a backend geo header represents the visitor. Keep explicitly chosen UI languages ahead of automatic region routing, including an explicit English choice.

**Why:** The public frontend stays on Bluehost and API traffic is relayed to a separate backend. A geo header on that backend can describe Bluehost's outgoing connection, not the visitor. A direct browser lookup avoids that ambiguity without changing hosting or forwarding raw visitor IPs through another service.

**How to apply:** For future country-sensitive links, use a non-blocking browser lookup or a verified visitor-country signal captured at the public edge. Preserve language-based destinations if detection is unavailable. Never infer a country from the backend's own outbound IP.
