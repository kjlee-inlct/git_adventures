# Internal Usability Interview Note Template

## Purpose

Capture post-session explanations that help interpret Session JSON and facilitator observations.

The interview should explain **why the tester acted as observed** without turning the session into a Git lesson or collecting identity information.

## Privacy Rule

Do not record name, email, employee id, account id, or other direct identity information.

Use:

```text
Session ID:
Tester Group: Beginner / Basic / Experienced
Locale: KO / EN
```

## Interview Timing

Run this interview **after**:

1. the Session Recorder is ended,
2. the anonymous Session JSON is exported.

This prevents interview discussion from contaminating the recorded task behavior.

## Interviewer Rule

Ask neutral questions first.

Avoid:

- teaching the intended answer,
- defending the product,
- explaining why a Mission was designed a certain way,
- telling the tester their Assessment score is good or bad,
- leading wording such as "Wasn't the Remote panel confusing?"

Prefer:

> What were you looking at when you made that decision?

instead of:

> Did you forget to check Remote?

---

## 1. Repository State Mental Model

### Q1

What did the Repository State panel represent to you?

Notes:

```text

```

### Q2

Which parts of the Repository State felt immediately understandable? Which parts required interpretation?

Notes:

```text

```

### Q3

When you saw Working Tree and Staging Area, how did you think they were related?

Notes:

```text

```

## 2. Decision Process

### Q4

Which Mission required the most thinking? What made it difficult?

Mission number / id if known:

```text

```

Reasoning notes:

```text

```

### Q5

Was there a moment when you intentionally inspected state before changing it? What were you trying to confirm?

Notes:

```text

```

### Q6

Was there a moment when you acted first and only inspected after something happened? Why?

Notes:

```text

```

## 3. Fairness and Ambiguity

### Q7

Did any Mission feel like guessing the author's expected command rather than solving a repository problem?

```text
Mission:
Why:
Expected alternative:
```

### Q8

Was there a safe solution you expected Git Adventures to accept but it rejected?

```text
Mission:
Command / approach:
Why you considered it safe:
```

Do not decide during the interview whether the tester is correct. Record the objection for technical review.

### Q9

Did any scenario lack information you thought was necessary to make the decision?

```text
Mission:
Missing evidence / policy:
```

## 4. Recovery and Safety

### Q10

When Git Adventures blocked or rejected an action, what did you think Git was protecting?

Notes:

```text

```

### Q11

For Recovery scenarios, how did you decide between continuing, reverting, aborting, skipping, or preserving work?

Notes:

```text

```

## 5. Assessment

Ask only when the preset includes Assessment.

### Q12

What evidence did you use before choosing your Assessment answer?

Notes:

```text

```

### Q13

Was any Assessment answer technically defensible in more than one way?

```text
Mission:
Alternative decision:
Conditions under which it would be valid:
```

### Q14

Did the Assessment feel like it measured Git judgment, Git command memory, or scenario-reading skill? Why?

Notes:

```text

```

## 6. Product Experience

### Q15

Which moment felt most satisfying or clear?

Notes:

```text

```

### Q16

Which moment felt most confusing, unfair, or unnecessary?

Notes:

```text

```

### Q17

Without using our product wording, how would you describe Git Adventures to another developer?

Notes:

```text

```

### Q18

What would you want to practice next?

Notes:

```text

```

### Q19

Would you voluntarily use this again? What would make the answer change?

Notes:

```text

```

## 7. Experienced-Tester Technical Review

Use for Experienced preset.

### Q20

Which scenario felt technically least credible?

```text
Mission:
Technical objection:
```

### Q21

Which scenario had more than one defensible Team Policy or History Strategy?

```text
Mission:
Alternative policy:
What additional scenario evidence would disambiguate it:
```

### Q22

Did any Simulator simplification teach a misleading mental model even if the Mission answer was technically acceptable?

Notes:

```text

```

## 8. Interview Summary

Summarize observations, not personality.

```text
Strongest mental-model evidence:

Largest confusion:

Most important safe-alternative objection:

Most important technical-credibility objection:

Possible UI issue:

Possible Mission-content issue:

Possible Rubric issue:

What should be reviewed, not yet changed:
```

## 9. Evidence Tags

Tag each major note with one or more of:

```text
LEARNING_MODEL
UI_AFFORDANCE
SCENARIO_EVIDENCE
TECHNICAL_CORRECTNESS
SAFE_ALTERNATIVE
RUBRIC
LOCALIZATION
ENGAGEMENT
SESSION_TOOLING
```

Tags support later grouping, but the original quote/paraphrased reasoning should remain available for context.
