# First Internal Test Cycle Runbook

## Purpose

Run the first Git Adventures calibration cycle consistently across Beginner, Basic, and Experienced testers.

The objective is not to prove that the current product is good. The objective is to discover where the learning model, interaction design, scenario wording, technical assumptions, or scoring model fail.

## 1. Entry points

```text
Game
  /

Facilitator Console
  /facilitator.html

Report Aggregator
  /reports.html
```

The Facilitator Console contains the current group presets, observation targets, stop/redesign signals, checklist, and links to all operating documents.

## 2. Group presets

### Beginner - Core Mental Model

Target: about 25 minutes.

Mission preset:

```text
1, 2, 3, 4, 7, 9, 12, 24
```

Primary question:

> Can a new learner understand Working Tree / Staging / History and begin inspecting state without facilitator explanation?

Do not require Assessment in the first Beginner calibration pass.

### Basic - Workflow and Recovery

Target: about 30 minutes.

Mission preset:

```text
3, 5, 6, 7, 9, 12, 14, 15, 17, 20, 24, 41
```

Primary question:

> Can a routine Git user replace habitual command use with safer Local / Remote / Recovery decisions?

This group includes the first judgment Assessment to test whether guided learning transfers into a policy decision.

### Experienced - History, Release and Assessment

Target: about 35 minutes.

Mission preset:

```text
14, 16, 18, 19, 23, 27, 29, 34, 36, 37, 41, 43, 44
```

Primary question:

> Do advanced scenarios feel technically credible and require real history / policy judgment rather than command trivia?

Experienced-user objections are especially important when they identify safe equivalent solutions, misleading simplifications, or technical inaccuracies.

## 3. Before the session

Facilitator checklist:

- assign only the coarse tester group: Beginner / Basic / Experienced
- do not record name, email, employee id, or account identity in Git Adventures artifacts
- open `/facilitator.html`
- review the group hypothesis and stop signals
- prepare the [Internal Test Session Sheet](test-session-sheet.md)
- open the first preset Mission
- confirm the Test Group is preselected in the recorder
- start the Session recorder
- tell the tester only that they should solve the situation using the interface

Do not explain the Repository Board, Staging, Remote Tracking, or expected command style before the session.

## 4. During the session

### Observe silently

Record or later inspect:

- time to first command
- where the learner hesitates
- whether they inspect before mutating state
- whether they understand the visible consequence
- when they request or reveal a Hint
- unsafe command attempts
- detours and repeated wrong actions
- verbal explanations that reveal their mental model

Write factual observations in the Session Sheet before writing interpretations.

### Do not rescue normal difficulty

Do not:

- suggest a Git command
- point at the correct panel
- explain what a Branch / Stash / Rebase means
- prevent an unsafe command attempt that the simulator safely blocks
- explain Assessment scoring before the learner completes it

### Intervene only for test-invalidating conditions

Intervention is appropriate when:

- browser or keyboard input is malfunctioning
- a UI control is physically unusable
- the tester cannot continue because of a product bug
- the scenario contains an obvious contradiction that makes the intended task impossible
- the tester explicitly wants to stop

Record the intervention in the Session Sheet. Do not put personal identity into Session JSON or notes.

## 5. Stop / redesign signals

A single failure does not automatically trigger redesign, but repeated signals should stop content expansion.

### Beginner

- cannot explain Working Tree vs Staging after the Foundation slice
- needs facilitator interpretation of the Repository State panel repeatedly
- treats progress as guessing exact command strings

### Basic

- consistently treats Fetch and Pull as equivalent
- repeatedly chooses destructive recovery despite visible safer alternatives
- cannot transfer guided Recovery learning into Assessment 41

### Experienced

- calls a scenario technically incorrect
- identifies a safe equivalent solution that the engine rejects without a product reason
- solves Assessment from wording patterns rather than Repository Evidence
- says advanced Missions are command trivia rather than engineering decisions

## 6. After the session

End and export the anonymous Session JSON first.

Then use the [Internal Usability Interview Note Template](interview-note-template.md).

Core interview topics:

1. Repository State mental model
2. hardest decision and evidence used
3. unfair / ambiguous Mission
4. rejected safe alternative
5. missing Scenario evidence / policy
6. unsafe / recovery reasoning
7. Assessment fairness where applicable
8. technical credibility for Experienced testers
9. desired future practice
10. voluntary return intent

Do not teach the expected answer during the interview. Record objections for later review.

## 7. Aggregation

After several sessions:

1. open `/reports.html`
2. load all usable anonymous Session JSON files
3. verify rejected-report warnings
4. compare Beginner / Basic / Experienced summaries
5. inspect Mission Hotspots
6. inspect raw Command Traces for suspicious Missions
7. combine quantitative patterns with Session Sheets and interview notes

Prioritize:

```text
Technical correctness risk
   |
Unsafe patterns
   |
Low completion
   |
High hint dependence
   |
Long first-command hesitation
   |
Assessment axis weakness
```

Do not interpret these metrics in isolation.

## 8. Calibration rule

Do not change Assessment weights or Safety floors from one or two sessions.

Prefer evidence that repeats across:

- multiple testers
- multiple Missions
- more than one tester group where relevant
- Command Trace
- Session metrics
- qualitative explanation

If only one Mission is problematic, fix the Mission before changing the global Rubric.

If all groups misunderstand the same UI state, fix the UI / learning model before adding more content.

## 9. Initial sample target

For the first qualitative calibration pass, a pragmatic target is:

```text
Beginner      3-5 sessions
Basic         3-5 sessions
Experienced   3-5 sessions
```

This is not a statistical-power claim. It is a product-discovery sample intended to expose obvious recurring problems before larger testing.

## 10. Exit criterion for the first cycle

The first cycle is complete when:

- each group has multiple usable anonymous reports
- the highest-risk Mission hotspots have been reviewed
- one Session Sheet and one qualitative interview note exist for each usable session
- major technical-credibility objections are resolved or documented
- safe alternate-solution objections have explicit decisions
- at least one evidence-backed Review Record has been created
- the team has decided what **not** to change as well as what to change

Only then should the next large Mission expansion or Rubric recalibration begin.

## 11. Required Operating Artifacts

Use the following artifacts consistently.

```text
Test Plan
  docs/internal-test-plan.md

Runbook
  docs/first-internal-test-cycle.md

Per-session factual record
  docs/test-session-sheet.md

Post-session reasoning interview
  docs/interview-note-template.md

Machine-recorded anonymous behavior
  Session JSON export

Cross-session metrics
  /reports.html

First Review Record construction
  docs/first-review-record-workflow.md

Product-change decision
  docs/result-review-decision-framework.md
```

Role separation:

```text
Test Plan       -> Why / what to validate
Runbook         -> How to execute the cycle
Session Sheet   -> What happened
Interview       -> Why the tester acted that way
Aggregator      -> What repeats across sessions
First Review    -> How to construct the first evidence bundle
Decision Review -> What to change / not change
```

Do not merge these roles into one free-form note.

## 12. Review Meeting Handoff

When the first batch is ready, first use the [First Review Record Workflow](first-review-record-workflow.md) to construct a traceable evidence bundle and the first Review Record.

Then apply the [Result Review Decision Framework](result-review-decision-framework.md).

The Review meeting must start with:

1. technical-correctness objections,
2. excluded / caveated sessions,
3. unsafe hotspots,
4. low-completion hotspots,
5. rejected safe alternatives,
6. repeated mental-model failures,
7. Assessment-axis patterns,
8. engagement / polish observations.

Every meaningful issue should end in one explicit decision:

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

Do not turn every interview comment into backlog work.

## 13. Deployment Note for the First Cycle

The first cycle does not require a backend or Docker Compose.

Use the simplest internal hosting that satisfies company network policy:

```text
Development / one PC
  python -m http.server 8000

Shared internal server
  Nginx / Caddy static hosting
  OR
  one static-web container
```

Testers only need a browser and the internal URL.

See [Internal Deployment Options](internal-deployment-options.md) for the exact Compose adoption trigger.
