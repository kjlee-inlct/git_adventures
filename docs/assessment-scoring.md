# Assessment Scoring Rubric

## Purpose

Assessment should measure engineering judgment, not typing speed or command memorization.

The first scoring model uses four explainable axes:

```text
Judgment   40
Safety     30
Evidence   20
Efficiency 10
```

These are default weights. Individual Assessment Missions may override weights when the learning objective requires it. For example, Incident Closure raises Evidence because verification is the primary skill being assessed.

## 1. Judgment

Judgment asks:

> Did the learner choose the Git operation that fits the scenario evidence, ownership, support policy, and required history shape?

Examples:

- Published regression -> explicit Revert rather than silent history erasure
- Supported affected release line -> selective Backport
- Policy requires reviewed Hotfix boundary -> `merge --no-ff`

Judgment does not reward a command merely because Git would technically accept it.

## 2. Safety

Safety asks:

> Did the learner preserve work, shared history, release identity, and unexpected remote changes?

Dangerous attempts reduce Safety even if the learner later reaches the correct final state.

A Mission has both a total pass threshold and a critical Safety floor.

```text
PASS
  = total >= passScore
    AND
    safety >= criticalSafetyFloor
```

This prevents a destructive decision from being hidden by strong scores on other axes.

## 3. Evidence

Evidence asks:

> Did the learner inspect the facts that the decision requires?

Inspection commands are not considered waste.

For verification-oriented Assessment, required evidence may include:

```text
git status
git log --oneline
git diff <base>...<head>
```

Skipping required inspection lowers Evidence even when the final action happens to be correct.

## 4. Efficiency

Efficiency does **not** mean "fewest commands wins."

Useful inspection is free. Efficiency is reduced by unnecessary actions that do not contribute evidence, resolution, or the intended state transition.

This avoids teaching learners to skip inspection merely to optimize command count.

## 5. Default Thresholds

Prototype defaults:

```text
passScore           = 75
criticalSafetyFloor = 60
```

Safety-critical scenarios may raise the floor. The Published Regression Assessment currently uses a higher Safety floor.

These values are product hypotheses and must be tuned with internal usability data rather than treated as universal Git competency standards.

## 6. Debrief

Assessment Debrief replaces the guided Mission fields with:

```text
Judgment
Safety
Evidence
Efficiency
```

It also shows:

- weighted total
- PASS / REVIEW result
- bilingual rationale explaining the expected engineering decision

The goal is explainability, not a leaderboard score.

## 7. Validation

CI checks:

- every Assessment has a Rubric
- all four axes have weights
- weights total 100
- thresholds are valid
- rationale is Korean / English
- ideal paths score 100
- missing required Evidence lowers Evidence and total
- unsafe history rewrite attempts reduce Safety and can fail the Safety floor
- useful inspection does not reduce Efficiency
- Browser Debrief uses the shared Scoring Engine rather than a duplicated formula

## 8. Calibration Inputs

Assessment calibration uses multiple evidence types:

```text
Session JSON
   +
Group Aggregation
   +
Command Trace
   +
Facilitator Observation
   +
Post-session Interview
   +
Technical Review
```

Do not calibrate from aggregate score alone.

Example:

> Experienced testers repeatedly score low Evidence while interviews show correct, safe inference from already-visible state.

This creates a hypothesis that Evidence requirements may be over-constrained. It does **not** prove that global Evidence weight should be reduced.

First check:

1. whether only one Assessment is affected,
2. whether Scenario evidence is redundant or unclear,
3. whether scoring-event classification is correct,
4. whether a safe alternate decision path is missing.

## 9. Rubric Change Control

Global Rubric weights / thresholds require stronger evidence than Mission-local changes.

Do not change global scoring because:

- one tester receives a low total,
- one Experienced user does not run an explicit inspection,
- one Assessment has ambiguous wording,
- average score looks lower than expected.

Consider a global change only when:

```text
Pattern repeats across multiple Assessment Missions
AND
multiple testers show the same mismatch
AND
interviews support the same engineering interpretation
AND
Mission-local ambiguity / scoring bugs are ruled out
```

A Mission-local problem should first be fixed through:

- Scenario evidence,
- accepted safe alternatives,
- Mission-specific required inspections,
- Mission-specific weights / Safety floor.

Use the [Result Review Decision Framework](result-review-decision-framework.md) before any global Rubric change.

## 10. Safety-Floor Change Control

Safety floors have a separate burden of proof.

Before lowering a Safety floor, verify that the behavior being penalized is actually safe under the stated Scenario.

Before raising a Safety floor, verify that the currently accepted behavior creates a real risk to:

- shared History,
- unexpected Remote work,
- Release identity,
- local work that cannot be reconstructed.

Do not use the Safety floor merely to make an Assessment harder.

## 11. Change Validation

After changing a Rubric, define the expected evidence before retesting.

A valid calibration change should improve agreement between score and interview-supported engineering judgment **without** making unsafe behavior easier to pass.

Check:

- ideal path remains valid,
- safe alternatives receive appropriate credit,
- unsafe path still crosses the intended Safety penalty / floor,
- required Evidence still corresponds to facts genuinely needed by the decision,
- language variants remain comparable enough for internal use.

Never validate a Rubric change only because average Assessment score increased.

## 12. Future Calibration Boundary

Before using Assessment scores for hiring, certification, or employee evaluation, Git Adventures would need substantially stronger evidence that is outside the current MVP scope, including:

- scenario unambiguity,
- alternate-safe-solution coverage,
- reliability across repeated equivalent scenarios,
- localization effects,
- external validity against real Git work,
- fairness and privacy review.

The current score is a training feedback instrument, not a validated psychometric measure.
