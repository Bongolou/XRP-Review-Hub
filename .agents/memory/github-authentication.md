---
name: GitHub authentication
description: A managed connection's reported health does not prove Git push authentication works.
---

Treat an actual authenticated Git operation as stronger evidence than a connection's health label.

**Why:** Connection-health metadata and attachment status do not guarantee that the Git CLI can authenticate.

**How to apply:** Follow the integration recovery flow, but stop repeating it if statuses conflict. Consult current Replit documentation and ask the user to repair GitHub access through account Git Providers. Never inspect tokens or assume an approved deployment happened after a failed push.

Distinguish the task workspace's Git pane from the main app's Git pane.

**Why:** The task pane explicitly disables remote sync/settings and directs users to the main app. Asking the user to push from that pane sends them to an unavailable action, regardless of whether their account connection is healthy.

**How to apply:** Direct users to the main app for Git connection diagnostics. Explain that task changes need to be applied to the main app before a main-app sync can include them. Do not treat this UI limitation as proof of the cause of a command-line authentication failure.
