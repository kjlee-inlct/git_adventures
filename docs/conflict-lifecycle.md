# Conflict Lifecycle

## 1. Purpose

Teach conflicts as a temporary Repository operation state rather than a generic error screen.

```text
Start Operation
    |
    v
Conflict
    |
    +--- Inspect
    |
    +--- Resolve
    |      |
    |      v
    |    Stage
    |      |
    |      v
    |   Continue / Commit
    |
    +--- Abort
           |
           v
      Restore Known Baseline
```

## 2. Rebase Conflict

A Rebase Conflict occurs while Git is replaying commits on a new base.

Learning sequence:

```bash
git rebase <upstream>
git status
# resolve file
git add <resolved-file>
git rebase --continue
```

Key outcomes:

- Rebase is an operation in progress until completed or aborted.
- The learner resolves the commit currently being replayed.
- The resolved file must be staged before `--continue`.
- The replayed Commit receives a new identity.

## 3. Rebase Abort

When the correct resolution is unclear:

```bash
git rebase --abort
```

is a valid safety decision.

The Simulator validates that Abort restores:

- Branch
- Working Tree
- Staging Area
- Conflict Set
- Commit History
- Remote / Tracking state

The product should not reward guessed conflict resolutions merely because they complete an operation.

## 4. Merge Conflict

A Merge Conflict is resolved in the combined result rather than while replaying one commit at a time.

```bash
git merge <upstream>
git status
# resolve file
git add <resolved-file>
git commit -m "<merge message>"
```

The resulting Merge Commit preserves both History lines.

## 5. Merge Abort

When integration should not continue:

```bash
git merge --abort
```

restores the pre-Merge baseline.

The learner should understand Abort as an explicit operation-level recovery command, not as deleting conflict markers manually.

## 6. Operation State

The Repository model now contains:

```text
operation
  |
  +--- null
  +--- rebase
  +--- merge
```

An active operation keeps a snapshot of the pre-operation state so Abort can be tested as an exact restoration invariant.

## 7. Force-with-Lease Advanced Lab

`git push --force-with-lease` is intentionally not taught as a normal Push alternative.

The Mission permits it only when all conditions are explicit:

```text
Private Branch
    +
Single / coordinated owner
    +
Rewrite explicitly permitted
    +
Fetch performed immediately beforehand
    +
Known Remote HEAD == Actual Remote HEAD
```

Then:

```bash
git push --force-with-lease
```

can publish the rewritten branch.

If the Remote changed after the learner's verification, the lease must fail and Remote History must remain untouched.

## 8. Safety Principle

```text
git push --force
    !=
git push --force-with-lease
```

`--force-with-lease` still rewrites Remote History. The difference is that it adds a Remote-state precondition; it does not make History rewriting universally safe.

## 9. Automated Invariants

CI validates:

- Rebase Continue clears Conflict and Operation state.
- Rebase Abort restores the exact pre-Rebase fingerprint.
- Merge Commit clears Conflict and Operation state.
- Merge Abort restores the exact pre-Merge fingerprint.
- Force-with-Lease succeeds only when Known and Actual Remote HEAD match.
- Lease mismatch does not overwrite unexpected Remote work.

## 10. Next Depth

- Rebase with multiple conflicts
- `git rebase --skip`
- `git rebase --abort` after partially resolved files
- Merge conflict involving multiple files
- Branch switch blocked by overlapping Working Tree changes
- Cherry-pick Conflict / Abort
- Backport workflow
