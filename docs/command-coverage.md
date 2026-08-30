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
| `git switch -c <branch>` | Workflow | Create isolated Feature / Hotfix Branch |
| `git switch <branch>` | Workflow | Switch existing Branch in curated Scenario |
| `git commit -m "..."` | History | Atomic Commit or resolved Merge Commit |
| `git revert <sha>` | Recovery / Incident | Shared-History inverse Commit and Bad Release recovery |
| `git fetch origin` | Remote | Refresh tracking knowledge without moving Local HEAD |
| `git pull` | Integration | Curated clean Fast-forward Scenario |
| `git pull --rebase` | Integration | Policy-driven Rebase |
| `git rebase <upstream>` | Integration | Policy-driven Rebase / Conflict start |
| `git rebase --continue` | Conflict Lifecycle | Continue after staged resolution |
| `git rebase --abort` | Conflict Lifecycle | Exact pre-Rebase restoration |
| `git rebase --skip` | History Decision | Drop only an explicitly obsolete replayed Commit |
| `git pull --no-rebase` | Integration | Policy-driven Merge |
| `git merge <upstream>` | Integration | Merge / Conflict start |
| `git merge --abort` | Conflict Lifecycle | Exact pre-Merge restoration |
| `git push` | Remote | Publish synchronized History or model Push Reject |
| `git push -u origin <branch>` | Remote | Publish + configure upstream |
| `git push --force-with-lease` | Conditional Rewrite | Only in explicitly coordinated Private Branch lab |
| `git stash push -m "..."` | Workspace | Preserve WIP temporarily |
| `git stash pop` | Workspace / Recovery | Restore WIP; Conflict may retain Stash entry |
| `git stash drop` | Recovery Cleanup | Remove verified retained Stash copy |
| `git cherry-pick <sha>` | Release / Backport | Apply one selected Change Intent to maintained Release History |
| `git cherry-pick --continue` | Release Conflict | Continue after Release-specific adaptation and staged resolution |
| `git cherry-pick --abort` | Release Safety | Restore exact pre-Backport Release State |
| `git tag -a <tag> -m "..."` | Release Identity | Create immutable annotated identity for verified Release Commit |
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
operation = null | rebase | merge | cherry-pick
```

Abort restores the pre-operation snapshot. Continue/Commit clears the operation only after Conflict resolution.

## 5. Release State

Release Missions additionally model Release Tags:

```text
v1.4.3@<verified-release-commit>
v1.4.4@<verified-recovery-commit>
```

A Published Release Tag is treated as an immutable identity. A corrected Release receives a new Patch Tag instead of silently moving the old Tag.

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

## 7. Next command groups

### Release / Incident

- remote Tag publication
- Hotfix PR / Approval state
- Hotfix propagation back to main
- multiple supported Release Lines

### History / Diagnostics

- `git commit --amend`
- safe local reset variants
- `git reflog`
- `git bisect`

### Assessment

- incomplete-evidence Incident scenarios
- Merge / Rebase / Revert decision questions
- Backport dependency and ordering assessments
