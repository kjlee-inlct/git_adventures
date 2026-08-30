# Internal Test Result Review Decision Framework

## Purpose

Turn internal usability evidence into disciplined product decisions without overreacting to one tester, one metric, or one loud opinion.

The framework decides whether to:

```text
FIX NOW
OBSERVE MORE
KEEP AS-IS
CHANGE MISSION ONLY
CHANGE UI / LEARNING MODEL
CHANGE RUBRIC
ADD ALTERNATE SOLUTION
ESCALATE TECHNICAL REVIEW
```

It is not a learner-grading framework.

For the first real calibration cycle, construct the evidence bundle and first Review Record using [First Review Record Workflow](first-review-record-workflow.md) before applying this decision framework.

## 1. Evidence Sources

Every product decision should identify which evidence supports it.

```text
A. Session JSON
   - timing
   - command trace
   - hints
   - inspections
   - unsafe attempts
   - detours / wrong attempts
   - guided / assessment scores

B. Aggregator
   - group pattern
   - Mission hotspot
   - Median / P75 timing
   - completion
   - Assessment axes

C. Facilitator Observation
   - visible hesitation
   - panel interpretation
   - intervention
   - verbal mental model

D. Interview Notes
   - reasoning
   - ambiguity
   - rejected safe alternative
   - technical credibility

E. Technical Review
   - actual Git semantics
   - Team Policy assumptions
   - Simulator simplification risk
```

No single source is automatically authoritative for every problem.

## 2. Decision Priority

Review in this order:

```text
Technical correctness / destructive teaching risk
        |
Privacy / session-data integrity
        |
Repeated unsafe behavior caused by product ambiguity
        |
Learning-model failure
        |
Rejected safe alternative
        |
Scenario evidence / wording
        |
UI affordance
        |
Rubric calibration
        |
Efficiency / polish
```

A technically misleading Mission is more urgent than a cosmetic usability issue.

## 3. Immediate FIX NOW Conditions

Fix before further content expansion when any of these are confirmed:

### Technical correctness

- Mission teaches an incorrect Git semantic.
- Simulator state transition contradicts the intended Git concept.
- A dangerous action is presented as generally safe without scenario constraints.
- Assessment has no defensible answer under its stated evidence / policy.

### Data / privacy

- PII is collected unintentionally.
- Session JSON mixes testers or corrupts Mission attribution.
- Aggregator accepts data outside the declared privacy/schema contract.

### Test invalidation

- UI bug prevents normal completion for multiple testers.
- Mission state cannot be reached using its intended path.

These do **not** require waiting for 3-5 sessions if independently verified.

## 4. ADD ALTERNATE SOLUTION Conditions

Add or review an alternate solution when:

- a tester proposes a safe Git path,
- the path reaches the same intended Repository State or preserves the same learning invariant,
- rejecting it does not serve an explicit Scenario Policy or learning objective.

Decision test:

```text
Technically safe?
   |
Same intended invariant?
   |
No explicit Policy conflict?
   |
No hidden destructive side effect?
   |
YES -> accept or score equivalently
```

Do not add an alternate merely because Git syntactically accepts it.

## 5. CHANGE MISSION ONLY Conditions

Prefer a Mission-local change when the problem is concentrated in one scenario.

Examples:

- one Mission has high Hint use across all groups,
- one scenario lacks necessary policy evidence,
- one Mission wording causes exact-command guessing,
- one Assessment over-constrains Evidence while other Assessments behave normally.

Change:

- story,
- objective,
- visible Repository State,
- Scenario Policy,
- accepted safe alternatives,
- Mission-specific Rubric.

Do **not** change global scoring or UI first.

## 6. CHANGE UI / LEARNING MODEL Conditions

Prefer a global UI / learning-model change when a pattern repeats across multiple Missions.

Signals:

- Beginner repeatedly confuses Working Tree vs Staging across several Missions,
- multiple groups misread Known Remote HEAD vs Actual Remote state,
- users fail to notice Operation State across Rebase / Merge / Cherry-pick conflicts,
- users cannot explain what Git is protecting when guardrails trigger.

Required support:

```text
Repeated across >= 2 Missions
AND
Observed in multiple sessions
AND
Trace / interview supports the same misunderstanding
```

This is a product-discovery rule, not a statistical significance threshold.

## 7. CHANGE RUBRIC Conditions

Global Rubric changes require stronger evidence than Mission wording changes.

Do not change global weights because:

- one tester receives a low score,
- one Experienced user skips an inspection,
- one Assessment has an ambiguous Scenario.

Review global weights / Safety floors only when:

```text
Pattern repeats across multiple Assessment Missions
AND
multiple testers show the same mismatch
AND
interviews indicate the score misrepresents sound engineering judgment
AND
Mission-local ambiguity has been ruled out
```

Examples:

### Possible Evidence-weight problem

Experienced users consistently make safe, well-explained decisions with less explicit inspection, across several Assessments.

### Possible Safety-floor problem

Safe exploratory behavior is repeatedly classified as critical unsafe behavior even though no shared work / identity risk exists.

Before global change, verify scoring-event classification first.

## 8. OBSERVE MORE Conditions

Choose OBSERVE MORE when:

- only one tester shows the behavior,
- the session had facilitator intervention,
- the report is incomplete,
- the tester misunderstood the task due to an environment issue,
- Group differences are large but the Mission-level pattern is inconsistent,
- quantitative and qualitative evidence conflict.

Document the next evidence needed.

Example:

```text
Decision: OBSERVE MORE
Need:
- 2 more Basic sessions
- Mission 17 trace review
- ask Q10/Q11 in interview
```

## 9. KEEP AS-IS Conditions

KEEP AS-IS is an explicit decision, not the absence of a decision.

Keep when:

- difficulty is intentional,
- users struggle but recover through the intended state reasoning,
- safe alternatives are accepted,
- advanced users find the scenario credible,
- high inspection count reflects good evidence gathering rather than confusion,
- one group performs differently for reasons consistent with the learning objective.

Record why the current design is being preserved.

## 10. Decision Matrix

| Pattern | Likely First Review | Default Action |
| --- | --- | --- |
| High Unsafe across groups | Scenario / Safety teaching | Mission/UI review immediately |
| High Hint on one Mission | Scenario evidence | Change Mission only |
| Long First Command only Beginner | Initial affordance / mental model | Observe across Foundation Missions |
| Experienced rejects safe path | Alternate solution / technical review | Review immediately |
| Low Evidence only one Assessment | Mission-specific Rubric | Change Mission only / observe |
| Low Evidence across Assessments | Global Rubric hypothesis | Observe more, then calibrate |
| Low completion + browser bug | UI defect | Fix now |
| Fast completion + poor explanation | Possible command memorization | Interview + Assessment review |
| High inspection + high success | Often healthy behavior | Keep unless interviews show confusion |

## 11. Review Record Template

Create one Review Record per important pattern.

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

The `Do Not Change` field is mandatory for meaningful reviews. It reduces cascading fixes that erase working parts of the product.

For the first cycle, use [First Review Record Workflow](first-review-record-workflow.md) to populate these fields from the Session JSON + Session Sheet + Interview Note + Aggregator evidence bundle.

## 12. Change Validation

After a product change, define what evidence should improve.

Examples:

### Scenario wording fix

Expected:

- lower Hint dependence,
- same Safety behavior,
- no loss of technical credibility.

### UI state-label fix

Expected:

- shorter first-command hesitation for affected group,
- fewer interview statements showing the same state confusion.

### Alternate solution support

Expected:

- fewer Wrong Attempts from technically safe paths,
- same final learning invariant.

### Rubric change

Expected:

- score better matches interview-supported engineering judgment,
- unsafe behavior still fails the Safety constraints.

Never validate a change only by checking that average score increased.

## 13. First-Cycle Review Meeting

Recommended order:

```text
1. Technical correctness objections
2. Excluded / caveated sessions
3. Unsafe hotspots
4. Low-completion hotspots
5. Safe alternate-solution objections
6. Mental-model patterns
7. Assessment axis patterns
8. Engagement / polish observations
9. Decide what not to change
```

Output should be a short set of evidence-backed product actions, not a backlog generated from every comment.

## 14. Calibration Boundary

The first 3-5 sessions per group are for discovery.

Do not interpret them as:

- population estimates,
- statistical significance,
- employee competency ranking,
- validated learning-effect measurement,
- certification thresholds.

They are sufficient to discover obvious repeated product problems and generate better hypotheses for the next test cycle.

## 15. Related Documents

```text
first-internal-test-cycle.md
  -> execute sessions

first-review-record-workflow.md
  -> construct the first evidence-backed Review Record

result-review-decision-framework.md
  -> choose the product action

assessment-scoring.md
  -> global Rubric change control

report-aggregation.md
  -> descriptive cross-session patterns
```
