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

These are default weights. Individual Assessment Missions may override weights when the learning objective requires it. For example, Incident Closure raises Evidence to 45 because verification is the primary skill being assessed.

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

Safety-critical scenarios may raise the floor. The Published Regression Assessment currently uses a Safety floor of 70.

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

## 8. Future Calibration

Before using Assessment scores for hiring, certification, or employee evaluation, Git Adventures must collect enough internal usability evidence to validate:

- whether the scenario itself is unambiguous
- whether alternate safe solutions deserve equal or partial credit
- whether weights correlate with real Git competence
- whether language/localization changes difficulty
- whether Safety floors are appropriately calibrated

The current score is a training feedback instrument, not a validated psychometric measure.
