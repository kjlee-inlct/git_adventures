# Internal Test Operations Index

## Purpose

Provide one entry point for all Git Adventures internal calibration documents.

Use this page when you are unsure which artifact applies to the current stage.

## End-to-End Flow

```text
Prepare deployment
   |
Choose tester preset
   |
Run session
   |
Record factual observation
   |
Export anonymous Session JSON
   |
Run post-session interview
   |
Store evidence correctly
   |
Aggregate sessions
   |
Construct Review Record
   |
Choose product decision
   |
Implement with Review ID
   |
Retest
   |
Close / carry Review Record
```

## 1. Before Testing

| Need | Document |
| --- | --- |
| Why / what to validate | [Internal Test Plan](internal-test-plan.md) |
| Exact first-cycle procedure | [First Internal Test Cycle Runbook](first-internal-test-cycle.md) |
| Current hosting choice / Compose rule | [Internal Deployment Options](internal-deployment-options.md) |
| Server / browser / rollback checks | [Internal Deployment Checklist](internal-deployment-checklist.md) |
| Group-specific Mission presets | `/facilitator.html` |

## 2. During One Session

| Need | Document / Tool |
| --- | --- |
| Factual facilitator observation | [Internal Test Session Sheet](test-session-sheet.md) |
| Machine-recorded command / score trace | Local Session Recorder |
| Intervention / validity rule | [First Internal Test Cycle Runbook](first-internal-test-cycle.md) |

Do not collect direct tester identity in Git Adventures artifacts.

## 3. Immediately After One Session

| Need | Document |
| --- | --- |
| Post-session reasoning interview | [Interview Note Template](interview-note-template.md) |
| Evidence naming / storage / privacy | [Internal Test Evidence Handling](internal-evidence-handling.md) |
| Session JSON schema meaning | [Local Usability Session Report](usability-session-report.md) |

Recommended order:

```text
End recorder
 -> Export JSON
 -> Interview
 -> Save Session Sheet
 -> Save Interview Note
```

## 4. After Multiple Sessions

| Need | Document / Tool |
| --- | --- |
| Group / Mission descriptive metrics | `/reports.html` |
| How to interpret aggregation | [Local Usability Report Aggregation](report-aggregation.md) |
| How to form the first evidence bundle | [First Review Record Workflow](first-review-record-workflow.md) |

## 5. Product Decision

| Need | Document |
| --- | --- |
| Standard Review Record fields | [Review Record Template](review-record-template.md) |
| Decide FIX / OBSERVE / KEEP / etc. | [Result Review Decision Framework](result-review-decision-framework.md) |
| Assessment global-weight change rules | [Assessment Scoring Rubric](assessment-scoring.md) |

## 6. Implement and Retest

| Need | Document |
| --- | --- |
| Link Review ID to code/content change | [Review Record to Change Traceability](review-record-to-change-traceability.md) |
| Define expected post-change evidence | [Result Review Decision Framework](result-review-decision-framework.md) |
| Retest using consistent preset | `/facilitator.html` |

## 7. Deployment / Architecture

| Need | Document |
| --- | --- |
| Current architecture boundary | [Service Architecture](service-architecture.md) |
| Whether Docker Compose is needed | [Internal Deployment Options](internal-deployment-options.md) |
| Deployment start/rollback checklist | [Internal Deployment Checklist](internal-deployment-checklist.md) |

Current answer:

```text
Docker Compose required now? NO
```

Use Compose only when multiple coordinated runtime services or equivalent operations requirements make it useful.

## 8. Core Operating Principles

```text
Facts before interpretation
Evidence before change
Change scope proportional to evidence scope
Implementation is not closure
Do Not Change is an explicit decision
Privacy-minimal by default
```

## 9. First-Cycle Required Artifact Set

Per usable session:

```text
Session JSON
Session Sheet
Interview Note
```

Per test cycle:

```text
Aggregate JSON
Candidate Pattern List
Review Record(s)
Explicit Keep / Observe decisions
```

Per implemented evidence-backed change:

```text
Review ID linkage
Expected improvement
Do Not Change boundary
Retest result
Closure status
```
