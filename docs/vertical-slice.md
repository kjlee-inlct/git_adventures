# Vertical Slice 01

## 1. Purpose

Validate the product's core promise with a small but representative playable curriculum before expanding toward hundreds of Missions.

The slice intentionally spans three learner levels instead of implementing only beginner commands.

```text
Foundations
    |
    +--- inspect state
    +--- inspect diff
    +--- selective staging
    +--- atomic commit
    |
Daily Workflow
    |
    +--- branch isolation
    +--- atomic commit from a busy workspace
    |
Recovery Lab
    |
    +--- unstage without discarding work
    +--- recover shared history with revert
```

Total: 8 Missions.

## 2. Product Questions

This slice should answer:

1. Does Repository State visualization teach more effectively than command-answer matching?
2. Do learners inspect with `status` / `diff` voluntarily when those commands are always available?
3. Can beginners understand Staging as a commit draft?
4. Does a multi-step Mission feel like solving work rather than passing a quiz?
5. Does an accidental broad staging action naturally teach Recovery?
6. Do experienced Git users consider the Recovery scenarios credible enough to continue?
7. Do progressive Hints help without immediately revealing the answer?
8. Are Mastery and Safety understood as learning feedback rather than game decoration?
9. Does the Mission Debrief reinforce Why?
10. Does Track Map clarify the learner's skill path?

## 3. Mission Matrix

| # | Track | Mission | Primary Concept | Difficulty |
|---:|---|---|---|---:|
| 1 | Foundations | Inspect before you act | Inspection-first | 1 |
| 2 | Foundations | Read the change | `status` vs `diff` | 1 |
| 3 | Foundations | Stage only the story | Selective staging | 2 |
| 4 | Foundations | Record one change intent | Atomic commit | 2 |
| 5 | Daily Workflow | Start work safely | Branch isolation | 2 |
| 6 | Daily Workflow | Atomic commit from busy workspace | select -> inspect -> commit | 3 |
| 7 | Recovery Lab | Undo staging safely | Unstage vs discard | 3 |
| 8 | Recovery Lab | Recover shared history | Revert vs rewrite | 4 |

## 4. Interaction Rules

### Inspection commands are always available

The learner may run:

```bash
git status
git diff
git diff --staged
git log --oneline
```

without being punished for not entering the Mission's expected progression command.

Purpose:

- reward investigation
- reduce exact-answer guessing
- teach repeatable diagnostic habits

### Valid detours may change state

Example:

```bash
git add .
```

In a selective-staging scenario this stages more than intended.

The game should show the new state instead of displaying a generic wrong-answer modal.

The learner can then recover:

```bash
git restore --staged debug.log
```

If the resulting Repository State matches the intended target, the Mission can complete even though the learner did not follow the shortest path.

## 5. Learning Feedback

### Progressive Hints

Each Mission exposes three Hint depths:

```text
1. Direction
2. Concept-specific authored hint
3. Command shape
```

Hint use reduces Mastery but never blocks completion.

### Mastery

Mastery represents independent problem solving.

Inspection Commands do not reduce Mastery.

Prototype deductions:

```text
Hint              -10
Unnecessary Detour -7
Wrong Attempt      -4
Dangerous Command  -5
```

### Safety

Safety represents protection of work and Shared History.

Prototype blocks high-risk commands in ordinary Missions:

```bash
git reset --hard
git clean -fd
git push --force
```

Dedicated Recovery Labs can teach these later through isolated consequence simulation.

### Debrief

Mission completion shows:

```text
Why
Mastery
Safety
Hint Count
Detour Count
```

The purpose is reflective learning, not competitive ranking.

## 6. Multi-step Mission

Mission 6 represents the first full puzzle sequence.

```text
Busy Working Tree
   |
   v
Select Related Files
   |
   v
Inspect Staged Diff
   |
   v
Commit One Change Intent
   |
   v
Unrelated File Remains Local
```

Required direct sequence:

```bash
git add src/transfer.py tests/test_transfer.py
git diff --staged
git commit -m "Add firmware block transfer"
```

The important learning outcome is not the exact syntax order of filenames. Both file orders are accepted.

## 7. State-based Success

For one-step state-changing Missions, success may be determined by the resulting state in addition to accepted direct commands.

Example target:

```text
Working Tree
  debug.log

Staging Area
  README.md
```

Both can reach the same target:

```bash
git add README.md
```

or:

```bash
git add .
git restore --staged debug.log
```

The second path is less efficient but educationally valid and produces lower feedback scores.

## 8. Content Architecture Validation

```text
content/missions.js
        |
        v
Mission Engine
        |
        v
Repository State Simulator
        |
        v
UI / Learning Feedback
```

Long-term migration target:

```text
Language-neutral Mission JSON
+
Translation resources
+
Schema validation
```

## 9. Automated Validation

Current CI validates:

- JavaScript syntax
- Mission Content object exists
- exactly 8 Vertical Slice Missions
- unique ID / number
- continuous numbering
- bilingual required fields
- valid difficulty
- valid initial Repository State
- valid Step regex patterns
- expected Track distribution

Future validation:

- Action schema
- target-state Golden tests
- accepted command -> expected state tests
- alternate solution tests
- regression scenarios
- translation completeness

## 10. Internal Test Order

### Beginner

Missions 1 -> 4 -> 7

Observe mental model, Hint use, and Recovery safety.

### Basic Git User

Missions 3 -> 6 -> 7 -> 8

Observe staging habits, Mastery/Safety interpretation, and Shared-History decisions.

### Experienced Developer

Mission 6 -> 8 followed by concept interview.

Primary question:

> Does this feel like the beginning of a serious Git training product, or only a beginner command game?

## 11. Gate to Expand Content

Do not expand Foundations to 20-30 Missions until the slice demonstrates:

- users understand Repository Board without facilitator explanation
- inspection commands are used naturally
- learners understand selective staging after Mission 3
- multi-step Mission 6 feels fair
- Recovery Mission 7 clearly distinguishes unstage from discard
- experienced users consider Mission 8 technically credible
- Hint 1 and Hint 2 provide value before Hint 3
- users can explain why Mastery/Safety changed
- Debrief reinforces the learning concept
- Track Map clarifies progression without feeling like a generic dashboard
- no strong 'AI-generated dashboard/template' visual feedback
