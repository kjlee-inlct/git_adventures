# Simulator Command Coverage

## 1. Purpose

Track the difference between commands shown to learners, commands accepted by Missions, Simulator behavior, and commands intentionally limited for safety.

## 2. Current coverage

| Command | Mode | Behavior |
|---|---|---|
| `git status` | Inspection | Branch, Ahead/Behind, Conflict, Operation state |
| `git diff` | Inspection | Unstaged change summary |
| `git diff --staged` | Inspection | Staged change summary |
| `git log --oneline` | Inspection | Simulated History |
| `git stash list` | Inspection | Stash entries |
| `git add <file>` | Mutation / Resolution | Stage Working Tree or resolved Conflict file |
| `git restore --staged <file>` | Recovery | Unstage without discarding work |
| `git switch -c <branch>` | Workflow | Create isolated Branch |
| `git switch <branch>` | Workflow | Switch existing Branch in curated Scenario |
| `git commit -m "..."` | History | Atomic Commit or resolved Merge Commit |
| `git revert <sha>` | Recovery | Shared-History inverse Commit |
| `git fetch origin` | Remote | Refresh tracking knowledge without moving Local HEAD |
| `git pull` | Integration | Curated clean Fast-forward Scenario |
| `git pull --rebase` | Integration | Policy-driven Rebase |
| `git rebase <upstream>` | Integration | Policy-driven Rebase / Conflict start |
| `git rebase --continue` | Conflict Lifecycle | Continue after staged resolution |
| `git rebase --abort` | Conflict Lifecycle | Exact pre-Rebase restoration |
| `git pull --no-rebase` | Integration | Policy-driven Merge |
| `git merge <upstream>` | Integration | Merge / Conflict start |
| `git merge --abort` | Conflict Lifecycle | Exact pre-Merge restoration |
| `git push` | Remote | Publish synchronized History or model Push Reject |
| `git push -u origin <branch>` | Remote | Publish + configure upstream |
| `git push --force-with-lease` | Conditional Rewrite | Only in explicitly coordinated Private Branch lab |
| `git stash push -m "..."` | Workspace | Preserve WIP temporarily |
| `git stash pop` | Workspace / Recovery | Restore WIP; Conflict may retain Stash entry |
| `git stash drop` | Recovery Cleanup | Remove verified retained Stash copy |
| `git reset --hard` | Blocked Danger | Recognized, not executed in ordinary Missions |
| `git clean -fd` | Blocked Danger | Recognized, not executed in ordinary Missions |
| `git push --force` | Blocked Danger | Recognized, not executed in ordinary Missions |

## 3. Important Safety Distinction

```text
git push --force
    !=
git push --force-with-lease
```

`--force-with-lease` remains History rewriting. It is only supported when the Scenario explicitly establishes a verified Remote-state precondition.

## 4. Operation State

Conflict-related commands operate against an explicit state:

```text
operation = null | rebase | merge
```

Abort restores the pre-operation snapshot. Continue/Commit clears the operation only after Conflict resolution.

## 5. Next command groups

### Recovery / Collaboration

- `git rebase --skip`
- multi-file Conflict resolution
- blocked Branch switch
- Cherry-pick + Cherry-pick Conflict / Abort

### History

- `git commit --amend`
- safe local reset variants
- `git reflog`
- `git bisect`

### Release

- `git cherry-pick` Backport
- Tags
- Hotfix / Release Branch workflows

## 6. Command Addition Rule

```text
Product Need
   |
Simulator State / Consequence
   |
Mission Content
   |
Golden + Invariant Tests
   |
Coverage Matrix
```

A dangerous or History-rewriting command must include a consequence/safety test before it is exposed as a playable action.
