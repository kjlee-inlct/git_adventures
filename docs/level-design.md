# Level Design

## 1. Goal

Design a curriculum that can serve first-time Git users, experienced developers, paid individual learners, and company training programs without turning every command into a disconnected level.

## 2. Progression model

```text
Track
  |
  +--- Chapter
        |
        +--- Mission
              |
              +--- Scenario
              +--- Repository State
              +--- Objective
              +--- Accepted Solutions
              +--- Feedback
              +--- Explanation
```

A mission teaches a decision in context. Commands are tools used to solve the scenario.

## 3. Recommended curriculum

### Track A - Foundations / Free

Goal: first successful independent Git workflow.

1. Repository / Working Tree mental model
2. `status`
3. `diff`
4. selective `add`
5. `commit`
6. readable commit messages
7. `log`
8. Branch concept
9. `switch -c`
10. first `push -u`
11. `pull` vs `fetch`
12. complete feature-branch mini project

Target: 20-30 missions.

### Track B - Daily Workflow / Free + Pro

1. multiple file changes
2. split unrelated changes
3. amend before push
4. stash temporary work
5. remote branch tracking
6. sync with latest main
7. delete merged local branch
8. interpret common status output
9. choose merge vs rebase from policy
10. PR preparation scenarios

Target: 20-30 missions.

Free boundary should include enough of this track to make the learner productive without payment.

### Track C - Recovery Lab / Pro

1. accidental `git add .`
2. wrong branch before commit
3. wrong branch after commit
4. missing file in last commit
5. bad local commit
6. bad shared commit
7. `revert` vs `reset`
8. lost commit with `reflog`
9. detached HEAD recovery
10. merge abort / rebase abort
11. deleted tracked file recovery
12. safe force-with-lease scenario

Target: 25-40 missions.

### Track D - Collaboration / Pro

1. PR scope review
2. conflict interpretation
3. conflict resolution
4. merge commit
5. squash merge
6. rebase merge
7. stale branch update
8. shared-history rules
9. review-request changes
10. parallel developer scenarios

Target: 25-40 missions.

### Track E - Advanced Git / Pro

1. interactive rebase concepts
2. cherry-pick
3. bisect
4. reflog deep dive
5. tags
6. release branches
7. hotfix propagation
8. partial staging
9. history archaeology
10. multi-remote workflow

Target: 30-50 missions.

### Track F - Release & Incident / Pro

Scenario-driven production exercises:

- bad release commit
- urgent hotfix
- release tag validation
- revert chain
- backport fix
- branch divergence
- failed deployment recovery

Target: 20-30 missions.

### Track G - Team Policy / Business

Organization-specific missions generated from configurable policy:

- branch naming
- required PR flow
- merge method
- commit message requirements
- protected branch behavior
- release rules
- prohibited commands

## 4. Difficulty dimensions

Difficulty should increase using context, not obscure syntax alone.

- number of changed files
- number of branches
- local vs shared history
- ambiguous valid commands
- conflict state
- incomplete information
- required history preservation
- time / command-count challenge

## 5. Mission types

- Guided: hint-rich first exposure
- Standard: objective + state only
- Choice: choose safest workflow
- Recovery: repair a broken repository
- Debug: identify cause from history
- Challenge: command-count or time goal
- Assessment: no hints, scored result

## 6. Scoring

Possible score inputs:

```text
Completion
+ Safety
+ Command Efficiency
+ History Quality
+ Hint Independence
= Mission Score
```

Never punish a correct safe command only because a shorter command exists in beginner tracks. Efficiency scoring belongs in advanced practice.

## 7. Free / Paid boundary

Free:

- complete Foundations track
- meaningful subset of Daily Workflow
- several recovery basics
- guest progress stored locally

Paid:

- advanced recovery
- collaboration labs
- incident simulations
- assessments
- detailed analytics
- cloud progress / multi-device
- certification and team features

The free tier must deliver a complete basic skill outcome instead of ending at the moment the learner becomes engaged.
