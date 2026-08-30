# Release Governance and Incident Closure

## 1. Purpose

This layer teaches the workflow around Git rather than pretending every release decision is a Git command.

```text
Git
  = repository facts and history operations

GitHub / PR Platform
  = review conversation, approval, CI surface

Team Policy
  = what evidence is required before release integration
```

Git Adventures keeps these roles explicit.

## 2. Review before approval

A hotfix branch should be reviewed by evidence before approval.

```text
release/1.4
    |
    +--- git diff release/1.4...hotfix/1.4.4
                               |
                               v
                        Scope Evidence
                               |
                               v
                        Team Approval Gate
```

The simulator models the Git evidence. Approval itself is a Scenario Policy decision rather than a fake Git command.

## 3. Approved integration

A technically mergeable branch is not automatically release-approved.

```text
Scope verified
    +
Approval satisfied
    +
History policy selected
    |
    v
git merge --no-ff hotfix/1.4.4
```

The current Scenario intentionally preserves the reviewed Hotfix Branch boundary with a Merge Commit.

## 4. Local Tag vs Published Tag

These are different states.

```text
Local Tag
   |
   | git push origin v1.4.4
   v
Published Tag
```

A local `v1.4.4` is not yet a shared Release Identity. Remote publication is explicit and must not move previously published tags.

## 5. Propagate the incident fix forward

A release-only fix leaves future regression risk if main does not receive the final corrected intent.

```text
release/1.4 fixed
      |
      v
Identify final recovery intent
      |
      v
main receives equivalent fix
```

The current Mission uses a selective Cherry-pick to keep release-only history out of main while propagating the recovery intent.

## 6. Incident closure

Incident response does not end at the first successful command.

Closure requires evidence that:

- the intended patch Release Tag is published,
- the previous Release Tag remains immutable,
- the Release History records the correction,
- main contains the durable recovery intent,
- Local / Remote state is synchronized for the modeled Scenario.

## 7. Product rule

```text
Action
  -> Evidence
  -> Policy Gate
  -> Integration
  -> Publication
  -> Propagation
  -> Verification
```

Git Adventures should teach this sequence instead of collapsing release engineering into a list of commands.
