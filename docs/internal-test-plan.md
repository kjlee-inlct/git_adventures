# Internal Test Plan

## 1. Purpose

Use internal users to validate learning quality, game flow, product depth, technical credibility, and Assessment assumptions before optimizing deployment or monetization.

The test should answer:

- Do beginners understand Git state better after playing?
- Do routine Git users adopt safer Workflow / Recovery reasoning?
- Do experienced users find meaningful technical depth?
- Are Missions enjoyable enough to continue voluntarily?
- Where does confusion occur?
- Which problems belong to Mission wording, UI, learning model, safe-alternative coverage, or scoring?
- Does the UI feel like a purpose-built product rather than a generic training dashboard?

## 2. Test Groups

### Group A - Git Beginner

Profile:

- little or no Git experience

Target observations:

- first-action hesitation
- Working Tree / Staging understanding
- fear of commands
- Hint dependency
- ability to inspect state before mutation

### Group B - Basic Git User

Profile:

- uses commit / pull / push
- limited Recovery knowledge

Target observations:

- selective staging habits
- Branch mental model
- Local vs Remote distinction
- Local vs shared History decisions
- transfer from guided Recovery into Assessment

### Group C - Experienced Developer

Profile:

- comfortable with Branch / Rebase / Recovery

Target observations:

- whether scenarios feel realistic
- whether advanced Tracks are deep enough
- whether feedback is technically credible
- whether safe equivalent Git paths are accepted
- whether Simulator simplification teaches a misleading mental model

## 3. Session Presets

Use `/facilitator.html` for the current first-cycle presets.

```text
Beginner      ~25 min   Core Mental Model
Basic         ~30 min   Workflow / Recovery
Experienced   ~35 min   History / Release / Assessment
```

Do not ask every tester to play all 44 Missions during the first calibration cycle.

Preset details and execution rules: [First Internal Test Cycle Runbook](first-internal-test-cycle.md).

## 4. Metrics

### Learning

- Mission completion rate
- first-attempt success
- Hint depth / use
- repeated mistake rate
- similar-scenario retention
- unsafe-command rate
- Inspection behavior

### UX

- time to first command
- terminal input error rate
- state-board comprehension errors
- Mission abandonment point
- UI element confusion

### Engagement

- voluntary next-Mission rate
- Missions per session
- session duration
- return within 1 / 3 / 7 days when later instrumentation exists
- voluntary advanced-Track entry

### Assessment

- Judgment
- Safety
- Evidence
- Efficiency
- total / PASS / REVIEW

Assessment results are training-feedback hypotheses and are not validated hiring, certification, or employee-performance metrics.

### Qualitative

Use the [Internal Usability Interview Note Template](interview-note-template.md) after exporting the Session JSON.

Qualitative evidence should capture:

- mental model
- decision reasoning
- ambiguity
- safe alternative expectations
- technical credibility
- missing Scenario evidence / policy
- Assessment fairness
- future-practice demand

## 5. Critical Failure Signals

Stop and redesign or escalate technical review if repeated users show:

- inability to explain Working Tree vs Staging after Foundations
- repeated confusion between Local and Remote
- progress dependent on guessing exact command strings
- frustration from safe Git commands rejected without a learning reason
- UI requiring facilitator explanation
- experienced users reporting technically incorrect scenarios
- Assessment answer determined mainly from wording patterns rather than state / policy
- reward UI distracting from Git state

Independently verified technical correctness or privacy defects do not require repeated-user evidence before fixing.

## 6. Design Validation

Ask users to describe the product appearance without prompting.

Desired words:

- game
- Git
- developer
- focused
- clear
- polished

Warning words:

- dashboard
- template
- AI-generated
- cluttered
- confusing

## 7. Internal Access / Privacy Policy

Initial test:

- no payment
- no account requirement unless account behavior itself is under test
- all implemented Tracks open
- local progress acceptable
- internal server only
- Session Recorder optional and local-only
- no direct identity fields in Git Adventures test artifacts

Current Session artifacts must not request:

- name
- email
- employee id
- account id

Future entitlement metadata remains invisible to users.

## 8. Iteration Cycle

```text
Design / Implement
   |
Internal Test
   |
Observe + Record
   |
Aggregate
   |
Interview / Technical Review
   |
Decision Framework
   |
Fix Product Problem
   |
Retest
   |
Expand Content only after evidence
```

Do not create 200 Missions before validating the learning model and advanced-scenario credibility.

## 9. Release Gates

### Gate 1 - Concept Prototype

- Repository Board understood without explanation
- first 5 Missions playable

### Gate 2 - Foundations Alpha

- 20-30 Missions
- beginner learning improvement observed qualitatively
- bilingual flow stable

### Gate 3 - Internal Beta

- Foundations + Daily Workflow + Recovery slice
- local progress stable
- responsive UI acceptable
- anonymous Local Session Report available
- Beginner / Basic / Experienced comparison possible without accounts
- Facilitator Presets and first-cycle Runbook available
- evidence-backed Review Decision process available

### Gate 4 - External Readiness

- accessibility review
- privacy review
- deployment hardening
- content QA
- support / feedback channel
- instrumentation / retention policy reviewed if central telemetry is introduced

Commercial packaging decision occurs after product value is validated, not before.

## 10. Local Session Report Procedure

```text
Select Test Group
   |
Start Session
   |
Play without facilitator coaching
   |
End Session
   |
Export anonymous JSON
   |
Conduct Interview
   |
Aggregate behavior
   |
Review product decisions
```

The report stores Mission timing, relative Command Trace, Hint use, Inspection count, Detours, wrong attempts, unsafe attempts, Guided scores, Assessment scores, and a compact final Repository State.

Detailed schema: [Local Usability Session Report](usability-session-report.md).

Cross-session comparison: [Local Usability Report Aggregation](report-aggregation.md).

## 11. Operating Document Set

Use these documents as one controlled workflow:

| Artifact | Purpose |
| --- | --- |
| [Internal Test Plan](internal-test-plan.md) | Why / what to validate |
| [First Internal Test Cycle Runbook](first-internal-test-cycle.md) | How to run the cycle |
| [Internal Test Session Sheet](test-session-sheet.md) | Factual per-session observation |
| [Interview Note Template](interview-note-template.md) | Why the tester acted that way |
| Session JSON | Machine-recorded anonymous behavior |
| [Report Aggregation](report-aggregation.md) | What repeats across sessions |
| [Result Review Decision Framework](result-review-decision-framework.md) | What to change / not change |

Do not replace the Session JSON with facilitator notes, and do not replace interview reasoning with metrics alone.

## 12. Decision Governance

Every significant product issue from internal testing should end in an explicit Review decision.

Allowed Review outcomes:

```text
FIX NOW
CHANGE MISSION ONLY
CHANGE UI / LEARNING MODEL
ADD ALTERNATE SOLUTION
CHANGE RUBRIC
OBSERVE MORE
KEEP AS-IS
ESCALATE TECHNICAL REVIEW
```

Use the [Result Review Decision Framework](result-review-decision-framework.md).

Important boundaries:

- technical correctness beats metric popularity
- one Mission problem should not automatically change global UI or Rubric
- one tester should not recalibrate Assessment weights
- repeated mental-model failure across Missions may justify a global UX / learning-model change
- safe equivalent solutions should be reviewed against the intended learning invariant
- `KEEP AS-IS` and `Do Not Change` are valid explicit decisions

## 13. First-Cycle Sample Target

Initial discovery target:

```text
Beginner      3-5 sessions
Basic         3-5 sessions
Experienced   3-5 sessions
```

This is a qualitative product-discovery target, not a statistical-power claim.

The first cycle should expose obvious repeated problems and improve hypotheses for the next cycle.
