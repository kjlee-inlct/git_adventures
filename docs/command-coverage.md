# Simulator Command Coverage

## 1. Purpose

Track the difference between:

- commands shown to learners
- commands accepted by Missions
- commands the simulator can inspect or mutate
- commands intentionally blocked for safety
- commands planned but not yet implemented

A learning product loses trust quickly if the UI teaches a command that the simulator cannot understand.

## 2. Current coverage

| Command | Mode | Current behavior |
|---|---|---|
| `git status` | Inspection | Available in every Mission; shows Branch, Working Tree, Staging state |
| `git diff` | Inspection | Available in every Mission; shows unstaged file-level delta summary |
| `git diff --staged` / `--cached` | Inspection | Shows staged delta summary; also used in multi-step Mission |
| `git log --oneline` | Inspection | Shows current simulated History |
| `git add <file>` | Mutation | Stages known Working Tree files |
| `git add .` | Detour Mutation | Stages all current Working Tree files and may create Recovery work |
| `git restore --staged <file>` | Recovery Mutation | Moves staged file back to Working Tree without discarding it |
| `git switch -c <branch>` | Mission Step | Creates/switches simulated Branch in curated Mission |
| `git commit -m "..."` | Mission Step | Records curated Commit and clears Staging Area |
| `git revert <sha>` | Mission Step | Adds curated inverse Commit in Shared History scenario |
| `git reset --hard` | Blocked Danger | Not executed in ordinary Mission; Safety penalty + explanation |
| `git clean -fd` | Blocked Danger | Not executed in ordinary Mission; Safety penalty + explanation |
| `git push --force` | Blocked Danger | Not executed in ordinary Mission; Safety penalty + explanation |

## 3. Coverage levels

```text
Inspection
    = can run freely without affecting score

Generic Mutation
    = simulator parses common form and changes Repository State

Mission Step
    = supported in curated Scenario through Mission step definition

Blocked Danger
    = recognized but deliberately not executed outside dedicated lab

Planned
    = documented product target, not exposed as currently supported
```

## 4. Next command groups

### Priority A - Daily Workflow

- `git fetch`
- `git pull`
- `git branch`
- `git switch <existing-branch>`
- `git push -u origin <branch>`
- `git stash push`
- `git stash pop`

### Priority B - Collaboration

- `git merge`
- `git merge --abort`
- `git rebase`
- `git rebase --continue`
- `git rebase --abort`

### Priority C - Recovery / History

- `git commit --amend`
- safe local `git reset` variants
- `git reflog`
- `git cherry-pick`
- `git bisect`

### Priority D - Release

- `git tag`
- release Branch scenarios
- Hotfix / Backport flows

## 5. Rule for adding commands

A command should not be presented as supported until all relevant layers are updated:

```text
Product / Curriculum Need
        |
        v
Simulator Behavior
        |
        v
Mission Content
        |
        v
Coverage Matrix
        |
        v
Golden / Regression Test
```

For destructive or History-rewriting commands, add consequence tests before exposing them in ordinary learning content.

## 6. CI contract

`tests/command-coverage.mjs` verifies that:

- learner-facing command references have a simulator coverage category
- core implemented command categories still have implementation evidence
- Mission accepted command families are represented by the coverage model

This test is intentionally architectural rather than exhaustive. Scenario-specific correctness belongs in Golden and Alternate Solution tests.
