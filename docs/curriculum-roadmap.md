# Curriculum Roadmap

## 1. Curriculum Goal

The curriculum is designed around transferable Git reasoning rather than isolated command recall.

A Track is complete only when the learner can solve realistic scenarios without being told which command to use.

## 2. Track Map

```text
Track 0  Orientation
   |
Track 1  Foundations
   |
Track 2  Daily Workflow
   |
   +------------+
   |            |
Track 3      Track 4
Recovery     Collaboration
   |            |
   +------v-----+
Track 5  History Management
   |
Track 6  Release & Incident
   |
Track 7  Mastery / Assessment
```

All Tracks are available during internal testing. Future packaging may use Track metadata without changing the curriculum structure.

## 3. Track 0 - Orientation

Target: 5-8 Missions.

Learning outcomes:

- Git vs GitHub distinction
- Repository concept
- Working Tree / Staging / Commit / Remote mental model
- safe inspection-first habit

Representative Missions:

1. Identify current Branch
2. Read `git status`
3. Find changed File
4. Predict what `git add` changes
5. Predict what `git commit` changes

Exit assessment:

Learner can explain the four core repository states without command prompts.

## 4. Track 1 - Foundations

Target: 25-35 Missions.

Chapters:

### 1A. Inspect

- `status`
- `diff`
- `diff --staged`
- untracked vs modified

### 1B. Stage

- stage one File
- stage multiple intended Files
- selective staging concept
- unstage

### 1C. Commit

- create Commit
- Commit scope
- meaningful Commit Message
- inspect `log`

### 1D. Branch

- Branch mental model
- `switch`
- `switch -c`
- Branch pointer movement

### 1E. Remote

- `origin`
- `fetch`
- `pull`
- `push`
- upstream tracking

### 1F. Mini Project

Complete:

```text
Update main
 -> Create Feature Branch
 -> Modify Files
 -> Inspect
 -> Stage
 -> Commit
 -> Push
```

Exit assessment:

Learner independently completes a basic Feature Branch workflow.

## 5. Track 2 - Daily Workflow

Target: 30-45 Missions.

Topics:

- multiple unrelated changes
- split Commit scopes
- `git add .` risk
- amend before Push
- stash
- Branch cleanup
- Remote tracking
- sync Feature Branch with main
- interpret Push rejection
- prepare clean PR history
- choose inspection Command before action

Scenario examples:

- README + debug.log modified
- Test and implementation belong together, unrelated config does not
- urgent Bug Fix interrupts unfinished Feature
- local Branch is behind `origin/main`

Exit assessment:

Learner can work for a normal development day without copying a fixed command sequence.

## 6. Track 3 - Recovery Lab

Target: 35-50 Missions.

Principle:

```text
Observe -> Preserve -> Recover -> Verify
```

Chapters:

### 3A. Staging Recovery

- wrong File staged
- all Files staged accidentally
- partial correction

### 3B. Commit Recovery

- missing File
- wrong Commit Message
- wrong local Commit
- amend vs new Commit

### 3C. Branch Recovery

- work on wrong Branch before Commit
- work on wrong Branch after Commit
- detached HEAD

### 3D. Shared History

- bad Commit already pushed
- `revert` vs `reset`
- Force Push decision
- `--force-with-lease`

### 3E. Lost Work

- restore deleted tracked File
- reflog recovery
- reset accident

Exit assessment:

Learner selects the safest recovery method based on whether History is Local or shared.

## 7. Track 4 - Collaboration

Target: 30-45 Missions.

Topics:

- PR scope
- Review feedback
- merge conflict
- conflict markers
- stale Branch
- merge vs rebase
- squash policy
- shared Feature Branch
- parallel developer changes
- protected `main`

Unique Mission type:

### Review Desk

Given a proposed Git sequence, decide:

- safe / unsafe
- acceptable / policy violation
- history quality
- recommended correction

Exit assessment:

Learner can participate in collaborative Git workflow and explain merge strategy trade-offs.

## 8. Track 5 - History Management

Target: 35-50 Missions.

Topics:

- interactive rebase concept
- reorder / squash / fixup
- cherry-pick
- reflog deep dive
- commit graph reading
- branch divergence
- tags
- multiple remotes
- history archaeology
- bisect

Game mode emphasis:

- Git Detective
- Challenge
- Recovery

Exit assessment:

Learner can deliberately reshape Local history and diagnose historical problems without damaging shared work.

## 9. Track 6 - Release & Incident

Target: 25-40 Missions.

Scenario packs:

### Release Day

- version Commit
- release Tag
- validation
- hotfix

### Bad Release

- defective Commit shipped
- revert decision
- forward fix vs rollback

### Backport

- cherry-pick Bug Fix to older release

### Diverged Release Branch

- choose integration strategy

### Production Incident

- limited time
- incomplete information
- safety prioritized over command count

Exit assessment:

Learner can reason through Git operations under release pressure.

## 10. Track 7 - Mastery / Assessment

Assessment dimensions:

- repository state reading
- safe action selection
- recovery
- collaboration
- history quality
- command efficiency
- policy understanding

Possible formats:

- adaptive test
- fixed certification path
- incident simulation
- team onboarding assessment

No hints in scored assessment mode, but practice version of every assessed concept must remain available.

## 11. Difficulty Curve

Difficulty Level 1:

- one File
- one Branch
- obvious objective

Level 2:

- multiple Files
- one irrelevant change

Level 3:

- local history + Remote
- multiple valid solutions

Level 4:

- Branch divergence
- recovery choice

Level 5:

- conflicts / shared history

Level 6:

- incomplete information
- policy-dependent decision

Level 7:

- incident pressure
- multiple developers / releases

Level 8:

- mastery challenge with optimization

## 12. Spaced Repetition

Concepts receive mastery tags:

```text
state.reading
stage.selective
commit.scope
branch.model
remote.sync
history.shared
recovery.safe
conflict.resolve
history.rewrite
release.tag
```

Weak tags can generate Practice Arena Missions later.

## 13. Content Volume Target

Long-term target:

| Track | Missions |
|---|---:|
| Orientation | 5-8 |
| Foundations | 25-35 |
| Daily Workflow | 30-45 |
| Recovery Lab | 35-50 |
| Collaboration | 30-45 |
| History Management | 35-50 |
| Release & Incident | 25-40 |
| Mastery / Assessment | Scenario-based |

Total planned content depth: approximately 185-273 core Missions before generated variations.

This volume is intentional: the product should remain useful after the learner passes beginner Git.
