# Release and Backport Learning Model

## Purpose

Release work is not taught as "merge everything that is newest."

Git Adventures models release decisions around **change intent, scope, and risk**.

```text
Production / Release need
        |
        v
Which exact change intent is required?
        |
        +--- one verified Commit
        |        |
        |        v
        |   cherry-pick / backport
        |
        +--- broader coordinated history
                 |
                 v
          explicit integration policy
```

## Why Cherry-pick appears in the Release Track

A maintained release branch may need one verified fix while `main` already contains unrelated features.

```text
main
 |
 +--- Feature A
 +--- Feature B
 +--- Hotfix X   <--- required
 +--- Refactor C

release/2.4
 |
 +--- existing release history
 +--- Hotfix X only
```

The learning objective is not the `cherry-pick` syntax itself. The important decision is whether **the selected Commit intent belongs in the release**.

## Clean Backport

Mission 28 teaches a clean selective backport:

```text
release/2.4
   |
select verified Commit
   |
git cherry-pick <sha>
   |
new Commit on release branch
```

The resulting Commit has a different identity on the target branch even though its change intent comes from the source Commit.

## Backport Conflict

Release branches frequently differ structurally from `main`.

A conflict therefore does not mean that the fix should be copied line-for-line.

```text
Verified Fix Intent
        |
        v
Cherry-pick
        |
     Conflict
        |
        v
Adapt implementation to release branch
        |
        v
Preserve Fix Intent
        |
        v
Stage -> cherry-pick --continue
```

The learner should preserve the **verified behavior / reason for the fix**, while adapting implementation details to the older release architecture.

## Abort the Wrong Backport

Incident pressure can cause the wrong Commit to be selected.

If the Commit intent is outside the release scope, resolving the conflict is the wrong action.

```text
Wrong Commit selected
        |
Cherry-pick conflict
        |
Inspect intent / release scope
        |
        v
Out of scope
        |
        v
git cherry-pick --abort
        |
Exact pre-operation release state
```

Abort is treated as a correct safety decision.

## Multi-file Merge Conflict

Mission 27 completes the Collaboration conflict model before Release Backport begins.

A Merge with two conflicted paths must not complete after only one file is resolved.

```text
Conflict Set = {A, B}

resolve A
  |
  +--- B still unresolved
  |        |
  |        +--- Merge cannot complete
  |
resolve B
  |
  v
Merge Commit allowed
```

## Safety Rules

- Do not widen a release change merely because conflict resolution is difficult.
- Do not merge all of `main` when only one verified change is required unless release policy explicitly calls for it.
- Do not continue a Cherry-pick when the selected Commit intent is outside release scope.
- Conflict resolution should preserve fix intent, not necessarily identical source lines.
- Abort must restore the exact pre-operation state.
- Release scenarios should make verification expectations explicit before public deployment is modeled.

## Current Missions

```text
27 Collaboration
   Multi-file Merge Conflict

28 Release & Incident
   Clean Cherry-pick / selective Backport

29 Release & Incident
   Cherry-pick Conflict -> Resolve -> Continue

30 Release & Incident
   Wrong Backport -> Abort
```

## Next Release Depth

- Backport dependency chain: one Commit depends on another
- Multiple Commit Backport ordering
- Cherry-pick range vs explicit Commit selection
- Hotfix Branch creation and Review
- Release Tag creation
- Bad Release / Revert / Rollback decision
- Patch Release preparation
- Backport verification checklist
- PR-based release approval workflow

The Release Track should continue to prioritize **risk control and decision quality** over command count.
