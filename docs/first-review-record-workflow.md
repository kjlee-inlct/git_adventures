# First Review Record Workflow

## Purpose

Describe exactly how to turn the first real internal calibration data into the first evidence-backed Git Adventures Review Record.

This workflow starts **after** the first 3-5 usable sessions per tester group have been run.

The input bundle is:

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
        |
        v
Scoped Product Change
        |
        v
Retest / Closure
```

Use these supporting documents:

- [Review Record Template](review-record-template.md)
- [Internal Test Evidence Handling](internal-evidence-handling.md)
- [Review Record to Change Traceability](review-record-to-change-traceability.md)
- [Result Review Decision Framework](result-review-decision-framework.md)

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
- Evidence is stored in the internally approved location described by [Internal Test Evidence Handling](internal-evidence-handling.md).

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

The repository contains templates/rules and synthetic fixtures only. Actual internal test evidence should be stored only in the internally approved location.

---

## 3. Build the Aggregate View

Open `/reports.html` and load all usable Session JSON files from the same test cycle.

Check:

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

Write each candidate as a falsifiable statement rather than a broad judgment.

---

## 5. Triangulate One Candidate Pattern

For each candidate, check four evidence layers.

### A - Session JSON

- exact Command Trace
- `atMs` timing
- Hint usage
- Wrong / Detour / Unsafe counts
- Guided / Assessment scores
- final Repository summary

### B - Session Sheet

- hesitation point
- State-panel interpretation
- visible confusion
- Facilitator intervention
- session validity

### C - Interview Note

- why the learner chose the command
- what evidence they believed mattered
- ambiguity
- rejected safe alternatives
- technical credibility objections

### D - Technical Review

Required for Git semantics, History safety, alternate commands, Team Policy assumptions, Release/Tag behavior, or Assessment answer defensibility.

Do not resolve technical objections by majority vote.

---

## 6. Match Evidence Scope to Change Scope

### Mission-local change

```text
pattern repeats in the same Mission
AND
trace / observation / interview explain the same failure
```

### Global UI / Learning Model

```text
same misunderstanding across >= 2 Missions
AND
multiple usable sessions
AND
qualitative reasoning supports the same mental-model failure
```

### Global Assessment Rubric

```text
multiple Assessment Missions
AND
multiple testers
AND
interview-supported sound engineering judgment
AND
Mission ambiguity / scoring-event bug ruled out
```

If the evidence is weaker than the proposed change scope, choose `OBSERVE MORE`.

---

## 7. Write the First Review Record

Copy [Review Record Template](review-record-template.md) and create one record per important repeated pattern or independently confirmed critical defect.

Recommended ID:

```text
CYCLE01-RR-001
```

Evidence Tags may include:

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

Do not omit `Do Not Change`.

---

## 8. Example First Review Record

Example only; do not treat this as observed evidence before real sessions exist.

```text
Review ID: CYCLE01-RR-001
Mission(s): 17
Tester Group(s): Basic
Evidence Tags: MENTAL_MODEL, UNSAFE_BEHAVIOR

Observed Pattern:
Three Basic sessions interpret the retained Stash Entry after a conflicted
stash pop as something that should immediately be deleted.

Decision:
[X] CHANGE MISSION ONLY

Why:
Git behavior is correct; learning evidence does not make the retained recovery copy salient enough.

Next Action:
Improve conflict-state explanation and debrief wording without revealing the next command.

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

## 9. Keep the Decision Set Small

The first review meeting should normally end with a small number of evidence-backed records:

```text
Critical Fixes
Mission-local Fixes
Safe Alternate additions
Observe-more hypotheses
Explicit Keep-as-is decisions
```

Do not convert every interview comment into implementation work.

---

## 10. Implement with Traceability

Before changing code/content, state:

```text
What will change?
Why is this the narrowest useful change?
What should improve in the next session?
What must remain unchanged?
```

Then follow [Review Record to Change Traceability](review-record-to-change-traceability.md).

Implementation should reference the Review ID in the commit / PR / issue or equivalent internal change record.

---

## 11. Retest and Close

After the next test pass, close/carry the Review Record as:

```text
VALIDATED
PARTIALLY_VALIDATED
NOT_REPRODUCED
REGRESSION_FOUND
OBSERVE_MORE
SUPERSEDED
```

Implementation without retest remains `IMPLEMENTED`, not `CLOSED`.

Keep the original evidence and decision rationale.

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

Internal Test Evidence Handling
  -> where/how evidence is stored

Report Aggregation
  -> repeated descriptive patterns

THIS DOCUMENT
  -> construct the first Review Record

Review Record Template
  -> standard record format

Result Review Decision Framework
  -> decide what to change / not change

Review Record to Change Traceability
  -> implementation and retest linkage
```

The first calibration loop is complete when real evidence produces explicit Review Records and those records drive limited, traceable, retested product changes.
