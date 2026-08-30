# Local Usability Session Report

## 1. Purpose

The internal test needs behavioral evidence before Git Adventures expands from 44 Missions toward the long-term curriculum.

The first recorder is intentionally local and account-free:

```text
Browser Test Session
      |
Local Storage
      |
Anonymous JSON Export
      |
Internal Comparison
```

No backend is required for the first calibration cycle.

## 2. Privacy Boundary

The recorder does **not** collect:

- name
- email
- employee id
- account id
- free-text identity

A test session stores only the selected experience group:

```text
Beginner
Basic
Experienced
```

The JSON explicitly records `privacy.piiCollected = false`.

If future testing adds accounts, server analytics, or free-text feedback, that is a separate privacy/design decision and must not be silently added to this schema.

## 3. Operator Flow

```text
1. Open Git Adventures
2. Select Test Group
3. Start Session
4. Let the tester play without coaching
5. End Session
6. Export JSON
7. Compare reports across groups
```

The recorder controls appear in the top bar only as internal test utilities.

## 4. Session Schema

Top-level data:

```text
schemaVersion
sessionId
testerGroup
startedAt
endedAt
locale
curriculumVersion
missionCount
privacy
attempts[]
summary
```

`sessionId` is a random local identifier and is not tied to an account.

## 5. Mission Attempt Record

Each Mission attempt records:

```text
missionId
missionNumber
track
difficulty
assessment
startedAt
completedAt / abandonedAt
durationMs
commandTrace[]
hintCount
inspections
detours
wrongAttempts
unsafeAttempts
guidedScore
assessmentScore
finalState
```

### Command Trace

Each command stores:

```text
atMs
command
category
```

`atMs` is relative to Mission start. This supports metrics such as time to first command without requiring a separate timer service.

Command categories:

```text
inspection
mutation
unsafe
```

Inspection includes commands such as `git status`, `git log --oneline`, and `git diff`.

## 6. Final Repository Summary

The report does not need a full duplicate Repository object for every Mission. It stores the key final state:

- current Branch
- HEAD
- Working Tree count
- Staging count
- Conflict count
- Stash count
- Tracking / Ahead / Behind / Reject state
- Local Tags
- Published Tags

This is enough to correlate user behavior with Mission outcome while keeping reports compact.

## 7. Guided vs Assessment Results

Guided Mission result:

```text
guidedScore
  mastery
  safety
```

Assessment Mission result:

```text
assessmentScore
  axes
    judgment
    safety
    evidence
    efficiency
  total
  passed
```

The recorder preserves the shared Assessment Scoring Engine output rather than recomputing scores.

## 8. Session Summary

The exported report derives:

- attempts
- completed Missions
- abandoned attempts
- average completed-Mission duration
- unsafe attempts
- Hint count
- Inspection count
- average Assessment total

The raw attempt data remains available so internal analysis does not depend only on aggregates.

## 9. Group Comparison

Recommended first comparison:

| Metric | Beginner | Basic | Experienced |
|---|---:|---:|---:|
| Time to first command | | | |
| Mission completion | | | |
| Hint rate | | | |
| Inspection rate | | | |
| Unsafe-command rate | | | |
| Detours / wrong attempts | | | |
| Assessment Judgment | | | |
| Assessment Safety | | | |
| Assessment Evidence | | | |
| Assessment Efficiency | | | |

Do not treat a single tester or a small sample as a statistically validated benchmark. The purpose of the first cycle is to locate product/design failures and calibrate hypotheses.

## 10. Questions the Data Should Answer

### Beginner

- How long before the first command?
- Do they inspect before mutating state?
- Does Hint use fall after Foundations?
- Are broad actions such as `git add .` repeated?

### Basic User

- Do they distinguish Local and Shared History?
- Do Recovery Missions reduce destructive choices?
- Do they understand Remote divergence before integration?

### Experienced Developer

- Do they voluntarily inspect relevant evidence?
- Do advanced scenarios produce meaningful judgment differences?
- Are Assessment choices technically credible rather than obvious trivia?

## 11. What the Recorder Must Not Become

Avoid optimizing the product for telemetry volume.

The recorder should not:

- reward fewer commands at the expense of inspection
- interpret long duration automatically as failure
- rank employees
- claim certification validity
- collect identity by default
- replace qualitative observation

The exported JSON is a **training-product calibration artifact**, not employee performance evidence.

## 12. Future Evolution

Only after local internal testing proves useful:

```text
Local JSON
   |
Optional Import / Aggregation Tool
   |
Anonymous Internal Analytics
   |
Validated Metrics
   |
Possible Cloud Analytics Later
```

The local schema should remain versioned so a future backend can import existing reports without coupling Mission logic to analytics infrastructure.
