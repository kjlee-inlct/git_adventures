# Daily Workflow Expansion

## Purpose

Extend Git Adventures beyond local staging/commit exercises into the two state domains that create many real-world Git mistakes:

1. Local vs Remote state
2. Unfinished workspace preservation

## Mission expansion

The playable curriculum now contains 13 Missions.

```text
Foundations       4
Daily Workflow    6
Recovery Lab      3
-------------------
Total            13
```

New Missions:

| # | Track | Scenario | Primary learning outcome |
|---:|---|---|---|
| 9 | Daily Workflow | Fetch remote facts | `fetch` updates remote-tracking knowledge without moving local HEAD |
| 10 | Daily Workflow | Pull clean upstream | `pull` is fetch + configured integration |
| 11 | Daily Workflow | Publish feature branch | `push -u` publishes committed history and establishes tracking |
| 12 | Daily Workflow | Urgent context switch | stash unfinished work instead of creating a fake temporary commit |
| 13 | Recovery Lab | Return to preserved WIP | `stash pop` restores workspace state and consumes the stash entry |

## Repository state model

The Simulator now models more than Working Tree / Staging / History.

```text
Repository State
 |
 +--- Current Branch
 +--- Working Tree
 +--- Staging Area
 +--- Commit History
 +--- Remote / Tracking
 |      +--- tracking branch
 |      +--- known remote HEAD
 |      +--- actual remote HEAD
 |      +--- ahead / behind
 |      +--- fetched state
 |
 +--- Stash Stack
```

## Fetch principle

`fetch` must not be taught as a synonym for `pull`.

Mission 9 explicitly verifies:

```text
git fetch origin
       |
       +--- update origin/* information
       +--- local branch unchanged
       +--- Working Tree unchanged
```

This supports later lessons where the learner inspects divergence before selecting merge or rebase.

## Pull principle

The prototype currently models only a deliberately simple fast-forward case.

```text
pull
 =
fetch
 +
configured integration
```

The Mission text explicitly states that team policy permits normal pull in that scenario. Future divergent-history Missions must require an integration decision rather than implying that `pull` is universally safe.

## Push principle

The first-publish Mission teaches:

```text
Local Commit History
       |
       | git push -u origin <branch>
       v
Remote Branch
       |
       +--- upstream tracking established
```

Uncommitted Working Tree data is intentionally not represented as uploaded by push.

## Stash principle

Stash is taught as temporary workspace preservation, not as durable history.

```text
Unfinished WIP
   |
   | stash push
   v
Stash Stack
   |
Clean Working Tree
   |
   | switch main
   v
Urgent Work
```

Later:

```text
stash pop
   |
   +--- WIP restored
   +--- top stash entry consumed
```

Future Missions should add stash-conflict consequences instead of implying that pop always succeeds cleanly.

## Validation

Golden tests verify final Remote / Tracking / Stash state for the new Missions.

Alternate tests verify the following invariants:

- Fetch does not move Local HEAD.
- Fetch does not switch the current Branch.
- Fetch updates known Remote HEAD.
- Stash push removes WIP from the active Working Tree.
- Stash pop restores preserved WIP.
- Stash pop consumes the restored entry.

## Next depth

Recommended next Workflow scenarios:

1. `fetch` + inspect divergence + explicit merge/rebase choice
2. rejected push because remote moved
3. `pull --rebase` under a defined team policy
4. stash pop with conflict
5. branch switch blocked by overlapping uncommitted changes
6. remote branch deletion / stale tracking cleanup

These should be added as consequences and decisions, not command trivia.
