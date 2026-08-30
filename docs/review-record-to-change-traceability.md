# Review Record to Change Traceability

## Purpose

Connect evidence-backed Review Records to source/content changes without turning every observation into implementation work.

## 1. Required Linkage

Every implemented change that originates from internal testing should reference a Review ID in the commit message, PR description, issue, or change note.

Example:

```text
Review: CYCLE01-RR-003
Change: Mission 17 conflict explanation clarified
Retest: Basic preset, Mission 17
```

## 2. Traceability Chain

```text
Session Evidence
   |
Review Record
   |
Decision
   |
Implementation
   |
Regression / CI
   |
Retest
   |
Review Closure
```

Implementation is not the end of the chain.

## 3. Change Scope

The implementation scope must match the Review decision.

Examples:

### CHANGE MISSION ONLY
Allowed scope:

- Mission story/objective
- visible scenario evidence
- accepted safe paths
- Mission-specific feedback
- Mission-specific Rubric

Do not silently change global scoring or unrelated UI.

### CHANGE UI / LEARNING MODEL
Allowed scope must cite the repeated cross-Mission pattern that justified the global change.

### CHANGE RUBRIC
Must cite:

- multiple Assessment Missions
- multiple tester sessions
- interview-supported mismatch
- ruled-out Mission-local ambiguity

## 4. Commit / PR Guidance

Recommended commit message suffix:

```text
[RR:CYCLE01-RR-003]
```

Recommended PR section:

```text
## Internal test evidence
Review Record: CYCLE01-RR-003
Decision: CHANGE MISSION ONLY
Expected improvement: lower premature stash-drop attempts
Do Not Change: global Stash semantics / Safety weighting
```

## 5. Retest Contract

Before implementation, the Review Record must state:

- retest Mission(s)
- retest Group(s)
- expected behavior change
- regression behavior that must remain stable

After implementation, compare new evidence against those expectations.

## 6. Closure

Close only when the Review Record has one of these outcomes:

```text
VALIDATED
PARTIALLY_VALIDATED
NOT_REPRODUCED
REGRESSION_FOUND
OBSERVE_MORE
SUPERSEDED
```

A merged code change without retest remains `IMPLEMENTED`, not `CLOSED`.

## 7. Avoiding Backlog Inflation

Do not create implementation work from:

- one isolated preference
- one unsupported comment
- a metric without qualitative context
- a low score caused by an ambiguous Mission

Route weak evidence to `OBSERVE MORE` instead.

## 8. Principle

```text
Evidence defines decision
Decision defines scope
Scope defines implementation
Retest defines closure
```
