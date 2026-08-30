# First Review Record Workflow

## Purpose

Describe exactly how to turn the first real internal calibration data into the first evidence-backed Git Adventures Review Record.

This workflow starts **after** the first 3-5 usable sessions per tester group have been run.

The input is not one score or one interview comment. The input bundle is:

```text
Anonymous Session JSON
        +
Test Session Sheet
        +
Interview Note
        +
Report Aggregator pattern
        +
Technical review when required
        |
        v
First Review Record
```

The output is one explicit product decision with a clearly limited change scope.

---

## 1. Preconditions

Do not start the first formal Review Record merely because the first tester finished.

Recommended first-cycle discovery target:

```text
Beginner      3-5 usable sessions
Basic         3-5 usable sessions
Experienced   3-5 usable sessions
```

This is a discovery target, not a statistical-power threshold.

Before review, verify:

- Session JSON exports exist for the usable sessions.
- Each usable session has a Test Session Sheet.
- Each usable session has a post-session Interview Note.
- Facilitator interventions and invalid/caveated sessions are identified.
- Session files do not contain direct identity data.
- `reports.html` accepts the intended JSON files without schema/privacy rejection.

A technically confirmed product defect may still be fixed immediately before this sample target; see the Result Review Decision Framework.

---

## 2. Organize the Evidence Bundle

Use Session ID, Tester Group, and Mission number as the join keys.

Recommended local working structure outside the repository:

```text
internal-test-cycle-01/
|-- sessions/
|   |-- Beginner/
|   |-- Basic/
|   `-- Experienced/
|
|-- session-sheets/
|-- interview-notes/
|-- aggregate/
|   `-- git-adventures-aggregate-....json
|
`-- review-records/
```

Do not use tester names as filenames.

Example:

```text
sessions/Beginner/session-2db7....json
session-sheets/session-2db7....md
interview-notes/session-2db7....md
```

The repository contains templates and rules; actual internal test evidence should be stored only in the internally approved location.

---

## 3. Build the Aggregate View

Open:

```text
/reports.html
```

Load all usable Session JSON files from the same test cycle.

First check:

- accepted report count,
- rejected report warnings,
- tester-group counts,
- whether any group has materially fewer usable sessions,
- Mission coverage implied by the presets.

Export the Aggregate JSON so the review is reproducible.

Do not interpret averages before checking Median / P75 and Mission-level rows.

---

## 4. Create the Candidate Pattern List

Start with observations, not solutions.

Review in this order:

```text
1. Technical correctness objections
2. Unsafe-command hotspots
3. Low-completion Missions
4. Safe alternate-solution objections
5. Repeated mental-model confusion
6. High Hint dependence
7. Long Time-to-First-Command
8. Assessment-axis mismatch
9. Engagement / polish observations
```

Write each candidate as a falsifiable statement.

Good:

> Mission 17 causes Basic users to interpret a retained Stash Entry after conflict as duplicate data and three testers try to remove it before verifying the resolved result.

Bad:

> Stash UX is bad.

Good:

> Experienced users in Missions 41 and 43 give technically sound explanations but lose Evidence points because the Rubric requires explicit inspection they considered unnecessary.

Bad:

> Evidence score is too strict.

---

## 5. Triangulate One Candidate Pattern

For each candidate, check four evidence layers.

### Layer A - Session JSON

Look for:

- exact Command Trace,
- `atMs` timing,
- Hint usage,
- Wrong / Detour / Unsafe counts,
- Guided scores,
- Assessment axes,
- final Repository summary.

### Layer B - Session Sheet

Look for factual observation:

- hesitation point,
- State-panel interpretation,
- visible confusion,
- Facilitator intervention,
- whether the session remained valid.

### Layer C - Interview Note

Look for the learner's reasoning:

- why they chose the command,
- what evidence they believed mattered,
- whether wording felt ambiguous,
- whether a rejected alternate seemed safe,
- whether an Experienced tester disputes Git semantics.

### Layer D - Technical Review

Required when the candidate concerns:

- Git semantics,
- destructive History behavior,
- alternate commands,
- Team Policy assumptions,
- Release/Tag behavior,
- Assessment answer defensibility.

Do not resolve technical objections by majority vote.

---

## 6. Decide Whether the Evidence Is Strong Enough

Use scope proportionality.

### Mission-local change evidence

A Mission-local change can be justified when:

```text
pattern repeats in the same Mission
AND
trace / observation / interview explain the same failure
```

### Global UI / Learning Model evidence

Require broader repetition:

```text
same misunderstanding across >= 2 Missions
AND
multiple usable sessions
AND
qualitative reasoning supports the same mental-model failure
```

### Global Assessment Rubric evidence

Require the strongest calibration evidence:

```text
multiple Assessment Missions
AND
multiple testers
AND
interview-supported sound engineering judgment
AND
Mission ambiguity / scoring-event bug ruled out
```

If evidence does not meet the needed scope, choose `OBSERVE MORE` rather than widening the change.

---

## 7. Write the First Review Record

Use the template from `result-review-decision-framework.md`.

The first Review Record should contain:

```text
Review ID:
Date:
Mission(s):
Tester Group(s):
Evidence Tags:

Observed Pattern:

Session JSON Evidence:

Aggregator Evidence:

Facilitator / Interview Evidence:

Technical Review:

Decision:
[ ] FIX NOW
[ ] CHANGE MISSION ONLY
[ ] CHANGE UI / LEARNING MODEL
[ ] ADD ALTERNATE SOLUTION
[ ] CHANGE RUBRIC
[ ] OBSERVE MORE
[ ] KEEP AS-IS
[ ] ESCALATE TECHNICAL REVIEW

Why:

Next Action:

Evidence Needed After Change:

Do Not Change:
```

### Evidence Tags

Recommended tags:

```text
TECHNICAL_CORRECTNESS
UNSAFE_BEHAVIOR
MENTAL_MODEL
SCENARIO_AMBIGUITY
SAFE_ALTERNATE
UI_AFFORDANCE
ASSESSMENT_JUDGMENT
ASSESSMENT_SAFETY
ASSESSMENT_EVIDENCE
ASSESSMENT_EFFICIENCY
ENGAGEMENT
TEST_INVALIDATION
```

---

## 8. Example First Review Record

Example only; do not treat this as an observed result before real data exists.

```text
Review ID: CYCLE01-RR-001
Mission(s): 17
Tester Group(s): Basic
Evidence Tags: MENTAL_MODEL, UNSAFE_BEHAVIOR

Observed Pattern:
Three Basic sessions interpret the retained Stash Entry after a conflicted
stash pop as something that should immediately be deleted.

Session JSON Evidence:
- repeated stash drop / unrelated cleanup attempts after conflict
- high Wrong count before resolution verification

Aggregator Evidence:
- Mission 17 appears in the Basic hotspot set
- Unsafe / Wrong pattern is higher than adjacent Recovery Missions

Facilitator / Interview Evidence:
- testers describe the retained Stash as "duplicated old data"
- they do not understand that the failed pop preserved the recovery copy

Technical Review:
Current simulator behavior matches the intended Git safety concept.

Decision:
[X] CHANGE MISSION ONLY

Why:
The Git behavior is correct. The learning evidence does not make the retained
recovery copy salient enough.

Next Action:
Improve conflict-state explanation and debrief wording without revealing the
next command.

Evidence Needed After Change:
- lower premature stash-drop attempts
- same or better conflict-resolution completion
- interview explanation mentions retained recovery copy

Do Not Change:
- stash conflict semantics
- global Safety weight
- generic Stash UI across unrelated Missions
```

---

## 9. Create a Small Decision Set, Not a Comment Backlog

The first review meeting should usually end with a small number of records.

Recommended categories:

```text
Critical Fixes
Mission-local Fixes
Safe Alternate additions
Observe-more hypotheses
Explicit Keep-as-is decisions
```

Do not create one Review Record for every subjective comment.

Prefer patterns with enough evidence to support a decision.

---

## 10. Implement the Decision with a Re-test Hypothesis

Before changing code/content, write:

```text
What will change?
Why is this the narrowest useful change?
What should improve in the next session?
What must remain unchanged?
```

Examples:

### Mission wording change

Expected next-cycle effect:

- lower Hint dependence,
- no loss of Safety,
- no increase in exact-command guessing.

### Alternate command support

Expected:

- fewer Wrong Attempts from the specific safe path,
- same final learning invariant.

### UI state-label change

Expected:

- lower repeated state interpretation error across affected Missions.

Never define success only as "average score goes up."

---

## 11. Close or Carry the Review Record

After the next test pass, mark the Review Record as one of:

```text
VALIDATED
PARTIALLY_VALIDATED
NOT_REPRODUCED
REGRESSION_FOUND
OBSERVE_MORE
SUPERSEDED
```

Keep the original evidence and decision rationale. Do not rewrite history to make the first hypothesis appear correct.

---

## 12. Relationship to Other Documents

```text
Internal Test Plan
  -> what / why to validate

First Internal Test Cycle Runbook
  -> how to run sessions

Test Session Sheet
  -> factual observation

Interview Note Template
  -> learner reasoning

Local Session JSON
  -> machine-recorded behavior

Report Aggregation
  -> repeated descriptive patterns

THIS DOCUMENT
  -> construct the first Review Record

Result Review Decision Framework
  -> decide what to change / not change
```

The first calibration loop is complete when real session evidence produces explicit Review Records and those records drive limited, testable product changes.
