# Simulator Command Coverage

## Purpose

Keep learner-facing commands, Mission content, Simulator behavior, and automated tests aligned as the curriculum grows.

## Current Coverage

| Command | Mode | Current learning use |
|---|---|---|
| `git status` | Inspect | Branch / Working Tree / Staging / Ahead-Behind / Conflict |
| `git diff` | Inspect | Unstaged change inspection |
| `git diff --staged` | Inspect | Commit draft inspection |
| `git log --oneline` | Inspect | Compact History |
| `git stash list` | Inspect | Temporary WIP inventory |
| `git add <file>` | Mutate | Selective Staging / Conflict resolution marker |
| `git add .` | Detour | Broad Staging consequence |
| `git restore --staged <file>` | Recovery | Unstage without data loss |
| `git switch -c <branch>` | Branch | Feature Branch creation |
| `git switch <branch>` | Branch | Existing Branch transition |
| `git commit -m "..."` | History | Atomic Commit |
| `git revert <sha>` | Recovery | Shared History-safe inverse Commit |
| `git fetch origin` | Remote inspect | Refresh Remote-tracking knowledge |
| `git pull` | Remote integrate | Explicitly permitted clean integration Scenario |
| `git pull --rebase` | Remote rebase | Team-policy-driven private History rewrite |
| `git rebase <upstream>` | Remote rebase | Direct equivalent integration path |
| `git pull --no-rebase` | Remote merge | Team-policy-driven ancestry-preserving integration |
| `git merge <upstream>` | Remote merge | Direct equivalent integration path |
| `git push` | Remote publish | Existing upstream publish / Push Reject Scenario |
| `git push -u origin <branch>` | Remote publish | First publish + upstream tracking |
| `git stash push -m "..."` | Workspace preserve | Temporary WIP storage |
| `git stash pop` | Workspace restore | Restore WIP; may conflict |
| `git stash drop` | Workspace cleanup | Remove retained Stash after verified recovery |
| `git reset --hard` | Blocked danger | Ordinary Mission safety warning |
| `git clean -fd` | Blocked danger | Ordinary Mission safety warning |
| `git push --force` | Blocked danger | Ordinary Mission safety warning |

## State Domains

Commands can affect one or more domains:

```text
Working Tree
Staging Area
Conflict Set
Local History
Current Branch
Remote Tracking
Ahead / Behind
Push Rejection State
Stash Stack
```

Coverage is reviewed by state effect, not only by command name.

## Required Tests for a New Command

Before a new learner-facing command is merged:

1. Add the command to the reference / content layer when appropriate.
2. Define the Repository State transition.
3. Add a representative Mission or explicit inspection behavior.
4. Add a Golden fixture for any new Mission.
5. Add an Invariant / Alternate test when the command has safety-sensitive behavior.
6. Add the command family to `tests/command-coverage.mjs`.
7. Verify all CI stages pass.

## Current Safety Boundary

The Simulator deliberately distinguishes:

```text
Supported ordinary command
Blocked dangerous command
Advanced command reserved for constrained Scenario
```

`push --force`, `reset --hard`, and `clean -fd` are currently blocked in ordinary Missions.

This does not mean the tools are universally wrong. Future advanced Recovery Missions may teach selected uses with explicit preconditions, visible consequences, and recovery paths.

## Next Coverage Candidates

High priority:

- `git rebase --continue`
- `git rebase --abort`
- `git merge --abort`
- `git restore <file>`
- `git switch -`
- `git stash apply`
- `git cherry-pick`
- `git cherry-pick --abort`
- `git push --force-with-lease` inside a constrained advanced Scenario

Later:

- `git reflog`
- `git bisect`
- `git tag`
- release / backport workflows

## CI Contract

`tests/command-coverage.mjs` verifies that:

- learner-facing Command references have a Simulator coverage category
- core state-transition handlers remain implemented
- Mission accepted Command families are represented by the coverage model
- direct `rebase` / `merge` alternatives remain covered when Missions allow them

Scenario-specific correctness belongs in Golden and Invariant tests.
