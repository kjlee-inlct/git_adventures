# Release Incident Lifecycle

## 1. Purpose

Git Adventures treats release work as a sequence of decisions about **scope, dependency, identity, and recovery**.

The goal is not to teach a list of release commands. The learner should understand why a specific change belongs in a release, what it depends on, how the release is identified, and how to recover when a shipped change is bad.

## 2. Lifecycle

```text
Verified Fix on main
        |
        v
Release Need Identified
        |
        v
Dependency Check
        |
        v
Selective Backport
        |
        v
Hotfix Branch
        |
        v
Verification
        |
        v
Annotated Release Tag
        |
        v
Production
        |
   +----+----+
   |         |
 Healthy   Regression
   |         |
   |         v
   |       Revert
   |         |
   |         v
   |    Verify Recovery
   |         |
   |         v
   |    New Patch Tag
   |
   v
Release remains auditable
```

## 3. Backport dependency ordering

Cherry-pick does not understand semantic dependency relationships.

If Fix B depends on Change A:

```text
A -> B
```

then a release backport must preserve that order:

```bash
git cherry-pick <A>
git cherry-pick <B>
```

The training rule is:

> Selective history does not mean arbitrary ordering.

A Release engineer must keep the maintained branch buildable and testable after each selected change.

## 4. Hotfix branch

Emergency work should still have an explicit review scope.

```text
release/1.4
    |
    +--- hotfix/1.4.3
             |
             +--- verified fix only
```

The Hotfix Branch separates:

- the stable Release Branch
- unrelated development on main
- the exact emergency candidate under review

Urgency does not remove the need for scope control.

## 5. Release tag

A Release Tag identifies the exact Commit that passed release verification.

Example:

```bash
git tag -a v1.4.3 -m "Release 1.4.3"
```

Product rule:

> A published Release Tag is an immutable release identity.

Do not silently move `v1.4.3` to a corrected Commit later.

## 6. Bad release

If a shared release causes a regression, the product teaches explicit recovery instead of erasing evidence.

```text
v1.4.3
  |
Bad Fix Commit
  |
Revert Commit
  |
v1.4.4
```

The bad release remains visible because users may already have received it.

That history is useful for:

- incident reconstruction
- customer support
- build reproduction
- deployment audit
- regression analysis

## 7. Revert instead of published-history rewrite

For an already published release change:

```bash
git revert <bad-commit>
```

creates a new inverse Commit.

This is intentionally different from deleting or rewriting the original Commit.

```text
Original Release Commit
        |
        v
Explicit Revert Commit
```

Both facts remain observable.

## 8. Recovery receives a new version

After the Revert or corrective change is verified, publish a new Patch Version.

```bash
git tag -a v1.4.4 -m "Release 1.4.4"
```

Do not move the prior tag.

```text
v1.4.3 -> bad shipped state
v1.4.4 -> verified recovery state
```

This preserves release identity and operational traceability.

## 9. Mission mapping

```text
Mission 28  Selective Cherry-pick
Mission 29  Cherry-pick Conflict
Mission 30  Wrong Backport Abort
Mission 31  Dependency-ordered Backport
Mission 32  Hotfix Branch
Mission 33  Annotated Release Tag
Mission 34  Bad Release Revert
Mission 35  New Patch Tag after Recovery
```

## 10. Validation invariants

Automated tests verify that:

- dependency commits are applied before dependent fixes
- Hotfix changes remain isolated from unrelated history
- release tags point to the intended exact Commit
- a published bad-release tag is not moved during recovery
- Revert adds new auditable History instead of deleting the bad Commit
- recovery receives a new Patch Tag
- Cherry-pick Abort restores the exact pre-operation Release State

## 11. Future expansion

Later Release & Incident Missions should add:

- dependent Backport Conflict across multiple commits
- release candidate PR review
- tag push / remote publication
- rollback vs forward-fix decision
- release branch freeze policy
- hotfix propagation back to main
- rollback of configuration-only releases
- multiple supported release lines
- incident assessment Missions with incomplete information
