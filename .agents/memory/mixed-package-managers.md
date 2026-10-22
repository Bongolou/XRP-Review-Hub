---
name: Mixed package-manager remediation
description: Avoid unintended package-manager switching when regenerating one of multiple lockfiles.
---

When regenerating a lockfile in a project with multiple package-manager locks,
do not assume the package installation tool will retain its earlier manager.

**Why:** Removing the npm lock while retaining a pnpm lock caused the next
installation to select pnpm automatically, even though the previous call used
npm. That did not regenerate the intended npm lock.

**How to apply:** Keep package-manager selection explicit during lockfile
regeneration, and verify each remaining lock independently. An override
declaration is not proof that the installed or locked dependency was replaced;
inspect the resolved tree and perform a clean-install audit.
