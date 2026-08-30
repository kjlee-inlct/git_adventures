# Assessment Track

## Purpose

Assessment Missions measure decision quality after the learner has already encountered the relevant Git tools in guided Tracks.

They are not command-recall quizzes.

```text
Scenario Evidence
      |
Repository State
      |
Team / Release Policy
      |
Decision
      |
Git Action
      |
Outcome Verification
```

## Current Assessment Missions

| Mission | Decision being assessed |
|---|---|
| 41 | Published regression: choose auditable Revert rather than History erasure |
| 42 | Supported release line: apply a verified Fix only where support policy and impact require it |
| 43 | Release integration: follow the explicit approved History policy |
| 44 | Incident closure: verify cleanliness and History instead of assuming success |

## Hint Policy

Assessment Missions keep a minimal Direction/Concept Hint but do not reveal the final Command Shape.

`engine-assessment.js` overrides the normal command-shape hint for `assessment: true` Missions.

This prevents the assessment from becoming:

```text
Reveal Hint
   -> copy command
   -> pass
```

The intended loop is:

```text
Read evidence
   -> infer the relevant Git / policy concept
   -> choose an action
   -> inspect the resulting state
```

## Separation of concerns

Assessment preserves the product rule:

```text
Git functionality
    !=
GitHub / PR-platform functionality
    !=
Team policy
```

A learner is assessed on using Git evidence correctly and applying the Scenario policy. Approval itself is never invented as a fake Git command.

## Validation

The existing 40 guided Missions continue to run through their Regression Gates.

Assessment adds a separate Gate that validates:

- exactly four current Assessment Missions, numbered 41-44
- `assessment: true`
- bilingual minimal Hints
- no direct Git command in Assessment Hint text
- difficulty 5
- expected decision command is accepted by each Scenario
- final State matches the intended decision outcome
- Assessment Engine masks command-shaped hint output

This separation lets Assessment evolve without weakening the Golden Regression coverage of the guided curriculum.
