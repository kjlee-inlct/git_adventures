# Worktree Guardrails and Advanced Rebase Decisions

## 1. Purpose

Missions 24-26 move beyond single-file conflict mechanics into decisions that are easy to misuse in real repositories.

The learning target is not command recall. It is recognizing what Git is protecting and what History change a command implies.

```text
Blocked Switch
    -> protect uncommitted work

Multi-file Conflict
    -> resolve the complete logical change

Rebase Skip
    -> intentionally remove one commit from rebased History
```

## 2. Mission 24 - Blocked Branch Switch

Scenario:

```text
Feature Branch
    |
Local WIP in src/device.py
    |
    v
git switch main
    |
    X  would overwrite local work
```

Git refusing to switch branches is treated as a safety event, not an inconvenience to bypass.

The learner must preserve the unfinished work first:

```text
switch blocked
    |
    v
stash WIP
    |
Working Tree clean
    |
    v
switch main
```

Learning rule:

> Never teach a bypass before explaining what data the guardrail is protecting.

## 3. Mission 25 - Multi-file Rebase Conflict

One logical commit may affect implementation and tests together.

```text
Rebase current commit
    |
    +--- src/transfer.py          CONFLICT
    +--- tests/test_transfer.py   CONFLICT
```

Resolving one file is insufficient.

```text
2 conflicts
    |
resolve transfer.py
    |
1 conflict remains
    |
rebase --continue
    X
```

Only after the entire Conflict Set is resolved and staged should Rebase continue.

This is enforced by an invariant test: `continueRebase` must not advance History while any conflict remains.

## 4. Mission 26 - Rebase Skip

`git rebase --skip` is deliberately introduced at high difficulty.

It means:

```text
Current commit being replayed
        |
        v
      SKIP
        |
        X--- commit absent from resulting History
```

It is not a generic conflict-resolution shortcut.

The Mission permits Skip only because the scenario explicitly establishes that:

- Upstream already contains the final intended behavior.
- The local commit's intent is obsolete.
- Product / team review confirms the commit should no longer exist.

The learner should understand the decision as:

```text
Is this commit still needed?
        |
        +--- Yes -> resolve / continue
        |
        +--- No, intentionally obsolete
                 -> rebase --skip
```

## 5. Product Safety Rule

Advanced commands must include the condition that makes them appropriate.

Do not teach:

```text
Conflict -> rebase --skip
```

Teach:

```text
Conflict
  |
  +--- Commit intent still required
  |       -> resolve
  |
  +--- Commit intent confirmed obsolete
          -> skip
```

The same principle already applies to `--force-with-lease`: the product teaches the safety condition before the command.

## 6. Validation

Automated tests verify:

- blocked switch does not change Branch
- blocked switch preserves Working Tree WIP
- Stash cleans the workspace before Branch switch
- multi-file conflict tracks all unmerged paths
- Rebase cannot continue while one conflict remains
- resolving all paths allows Rebase completion
- Rebase Skip removes the skipped commit from resulting History
- Rebase Skip clears Conflict / Operation state
