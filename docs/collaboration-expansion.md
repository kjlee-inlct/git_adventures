# Collaboration and Divergence Expansion

## 1. Purpose

Move Git Adventures beyond isolated commands into decisions that depend on history ownership, Remote state, and team policy.

The key learning progression is:

```text
Push Rejected
    |
    v
Fetch Remote Facts
    |
    v
Read Divergence
    |
    v
Choose Team Policy
   / \
  v   v
Rebase Merge
  |   |
  +---+
    |
    v
Publish Safely
```

The product should not teach `merge` or `rebase` as a universal preference.

## 2. New Missions

### Mission 14 - Push Reject

Learning outcome:

- non-fast-forward rejection protects Remote History
- Force Push is not the default recovery
- refresh Remote facts before choosing integration

Flow:

```bash
git push
git fetch origin
```

### Mission 15 - Read Divergence

State:

```text
Local  : ahead 1
Remote : behind 1
```

Command:

```bash
git status
```

Learning outcome:

- Divergence is not an error by itself
- it is a decision point
- Git cannot infer Team History Policy

### Mission 16 - Private Feature Rebase Policy

Scenario condition:

- Feature Branch is private to the learner
- Team Policy explicitly requires Rebase before Review

Flow:

```bash
git pull --rebase
git push
```

Equivalent integration entry point:

```bash
git rebase origin/feature/firmware-download
```

Learning outcome:

- Rebase changes Commit identity
- History rewrite is safer while commits remain private
- Rebase is used because Scenario Policy requires it, not because it is always superior

### Mission 17 - Stash Conflict Recovery

Flow:

```bash
git stash pop
git status
# resolve src/power.py in editor
git add src/power.py
git stash drop
```

Critical behavior:

```text
stash pop
   |
   +-- clean apply --> entry consumed
   |
   +-- conflict ----> entry retained
```

Learning outcome:

- a conflicted `stash pop` keeps the Stash Entry
- Recovery copy should not be removed before result verification
- `git add` marks a manually resolved Conflict as resolved

### Mission 18 - Shared History Merge Policy

Scenario condition:

- Integration Branch is shared
- Local and Remote both contain Published commits
- Team Policy prohibits rewriting Published History

Flow:

```bash
git pull --no-rebase
git push
```

Equivalent integration entry point:

```bash
git merge origin/integration/device
```

Learning outcome:

- Merge preserves both ancestry lines
- shared History ownership changes the appropriate integration policy
- this Scenario intentionally contrasts with Mission 16

## 3. State Model Extension

The Repository Simulator now additionally models:

```text
Remote
  rejected

Conflicts
  [file ...]

History Integration
  rebase result
  merge commit result
```

`git status` surfaces:

- ahead / behind relationship
- unmerged paths
- staged changes
- Working Tree changes

## 4. History Policy Principle

The game should teach the following reasoning model:

```text
Who owns these commits?
        |
        +-- Private / coordinated rewrite
        |       |
        |       +-- Rebase may be appropriate
        |
        +-- Shared / already published
                |
                +-- Preserve history unless policy says otherwise
```

This is more useful than a rule such as:

```text
Always Rebase
```

or:

```text
Always Merge
```

## 5. Safety Behavior

Commands blocked in ordinary Missions remain:

```bash
git reset --hard
git clean -fd
git push --force
```

A rejected normal Push therefore becomes a learning event instead of an invitation to bypass protection.

Future advanced Recovery Missions may explicitly simulate safe uses of history rewriting tools inside constrained Scenarios.

## 6. Validation Invariants

Current tests verify:

- all 18 Missions have a representative solution
- Push Reject does not overwrite Remote History
- Fetch refreshes Remote information
- Rebase creates a new Local Commit identity
- Merge creates a distinct Merge Commit result
- Rebase and Merge produce visibly different histories
- conflicted Stash Pop retains the Stash Entry
- resolved Conflict leaves the Conflict set and enters Staging
- learner-facing Command references remain covered by the Simulator

## 7. Next Collaboration Depth

Recommended next Scenarios:

1. Rebase Conflict
2. Merge Conflict
3. `rebase --continue` / `rebase --abort`
4. Merge abort
5. Push after another teammate updates Remote again
6. `--force-with-lease` in an explicitly safe advanced Scenario
7. Cherry-pick a reviewed Fix onto another release Branch
8. PR Review / Merge strategy decisions

Do not add these as command trivia. Each should begin with Repository evidence and an engineering constraint.
