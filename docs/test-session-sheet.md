# Internal Test Session Sheet

## Purpose

Use one consistent operational sheet for every Git Adventures internal usability session.

This sheet is a **facilitator aid**, not part of the learner score and not an employee-performance record.

## Privacy Rule

Do **not** record:

- name,
- email,
- employee id,
- account id,
- team name when it can identify one person,
- free-text identity clues.

Use only the anonymous Session ID exported by Git Adventures and the coarse Tester Group.

---

## 1. Session Header

```text
Session ID:
Tester Group: Beginner / Basic / Experienced
Preset Version: 1
Locale: KO / EN
Session Date:
Target Duration:
Actual Duration:
Session JSON Exported: Yes / No
Interview Notes Saved: Yes / No
```

Do not add a tester-name field.

## 2. Preset Mission Sequence

### Beginner

```text
1, 2, 3, 4, 7, 9, 12, 24
```

Primary hypothesis:

> A new learner can form a Working Tree / Staging / History mental model and begin inspecting Repository State without facilitator explanation.

### Basic

```text
3, 5, 6, 7, 9, 12, 14, 15, 17, 20, 24, 41
```

Primary hypothesis:

> A routine Git user can replace habitual command use with safer Local / Remote / Recovery decisions and transfer that reasoning into the first Assessment.

### Experienced

```text
14, 16, 18, 19, 23, 27, 29, 34, 36, 37, 41, 43, 44
```

Primary hypothesis:

> Advanced scenarios are technically credible and require real History / Policy judgment rather than command trivia.

## 3. Pre-Session Check

Mark each item before starting.

```text
[ ] Correct Tester Group selected
[ ] Correct preset reviewed
[ ] Browser input works
[ ] Session Recorder is not already carrying another active session
[ ] Tester Group is preselected in Recorder
[ ] Recorder started
[ ] No Git concept explanation given before start
[ ] Facilitator intervention rule reviewed
```

## 4. Observation Log

Use short factual notes. Record what happened before interpreting why.

| Mission | Time / Order | Observable Behavior | Facilitator Intervention? | Follow-up Needed? |
| --- | --- | --- | --- | --- |
|  |  |  | No / Yes | No / Yes |
|  |  |  | No / Yes | No / Yes |
|  |  |  | No / Yes | No / Yes |
|  |  |  | No / Yes | No / Yes |

Good observation:

> Mission 14: typed `git push`, read rejection, paused, then used `git status` before Hint.

Weak observation:

> Does not understand Git.

The first is evidence. The second is interpretation without evidence.

## 5. Mental-Model Signals

Mark only when directly observed or stated by the tester.

```text
Working Tree vs Staging
[ ] clear
[ ] partial
[ ] confused
[ ] not observed

Local vs Remote
[ ] clear
[ ] partial
[ ] confused
[ ] not observed

Shared vs Private History
[ ] clear
[ ] partial
[ ] confused
[ ] not observed

Conflict / Recovery State
[ ] clear
[ ] partial
[ ] confused
[ ] not observed

Release / Policy Reasoning
[ ] clear
[ ] partial
[ ] confused
[ ] not observed
```

## 6. Critical Events

Record counts here only as a quick facilitator reference. The exported JSON remains the source of truth for machine-recorded counts.

```text
Visible unsafe attempts:
Repeated exact-command guessing:
Repeated Hint dependence:
Safe equivalent solution rejected by engine:
Scenario credibility objection:
Product bug / blocked interaction:
```

## 7. Intervention Log

Only log interventions that could have changed the session.

| Mission | Reason | What Facilitator Said / Did | Data Impact |
| --- | --- | --- | --- |
|  |  |  | none / minor / session-invalidating |

Allowed reasons include:

- browser / keyboard failure,
- unusable UI control,
- product bug,
- impossible scenario contradiction,
- tester explicitly stops.

Do not intervene merely because the learner is struggling with normal Git reasoning.

## 8. End-of-Session Checklist

```text
[ ] Recorder ended
[ ] Anonymous Session JSON exported
[ ] JSON filename includes Session ID only
[ ] Interview conducted after JSON export
[ ] Interview notes contain no identity information
[ ] Any facilitator intervention recorded
[ ] Safe alternate-solution objections captured
[ ] Technical-credibility objections captured
```

## 9. Session Classification

This is a product-research classification, not a learner grade.

Choose one:

```text
[ ] Usable session - no material intervention
[ ] Usable with caveat - minor intervention / environment issue
[ ] Exclude from aggregate decision - session-invalidating condition
```

Reason:

```text

```

## 10. Immediate Product Flags

Do not decide the fix during the session. Only flag the area for later Review.

```text
[ ] Learning-model issue
[ ] Scenario wording / evidence issue
[ ] Safe alternate solution missing
[ ] Technical correctness issue
[ ] UI affordance issue
[ ] Assessment rubric issue
[ ] Session tooling issue
[ ] No immediate flag
```

Final product action is decided only through the [Result Review Decision Framework](result-review-decision-framework.md).
