# Review Record Template

Use one Review Record per important repeated pattern or independently confirmed critical defect.

Do not create a Review Record for every tester comment.

```text
Review ID:
Cycle ID:
Date:
Status: DRAFT / DECIDED / IMPLEMENTED / RETESTING / CLOSED

Mission(s):
Tester Group(s):
Evidence Tags:

Observed Pattern:

Session JSON Evidence:

Aggregator Evidence:

Session Sheet Evidence:

Interview Evidence:

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

Change Scope:

Next Action:

Evidence Needed After Change:

Do Not Change:

Regression Risk:

Retest Missions:

Retest Groups:

Closure Result:
[ ] VALIDATED
[ ] PARTIALLY_VALIDATED
[ ] NOT_REPRODUCED
[ ] REGRESSION_FOUND
[ ] OBSERVE_MORE
[ ] SUPERSEDED

Closure Notes:
```

## Rules

- Use Session ID / Mission number, not tester identity.
- Link or reference the relevant aggregate export and internal evidence location.
- Keep `Do Not Change` explicit.
- A global Rubric change must cite multiple Assessment Missions and multiple testers.
- A technical correctness issue may bypass the normal 3-5/session discovery threshold when independently verified.
- Closing a Review Record requires a stated retest outcome; implementation alone is not closure.
