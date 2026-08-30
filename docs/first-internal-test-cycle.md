# First Internal Test Cycle Runbook

## Purpose

Run the first Git Adventures calibration cycle consistently across Beginner, Basic, and Experienced testers.

The objective is not to prove that the current product is good. The objective is to discover where the learning model, interaction design, scenario wording, or scoring assumptions fail.

## 1. Entry points

```text
Game
  /

Facilitator Console
  /facilitator.html

Report Aggregator
  /reports.html
```

The Facilitator Console contains the current group presets, observation targets, stop/redesign signals, and a simple checklist.

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

Experienced-user objections are especially important when they identify safe equivalent solutions or technical inaccuracies.

## 3. Before the session

Facilitator checklist:

- assign only the coarse tester group: Beginner / Basic / Experienced
- do not record name, email, employee id, or account identity in Git Adventures
- open `/facilitator.html`
- review the group hypothesis and stop signals
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

Record the intervention separately in facilitator notes; do not put personal identity into the Session JSON.

## 5. Stop / redesign signals

A single failure does not automatically trigger redesign, but repeated signals should stop content expansion.

Examples:

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

Then ask a short qualitative interview:

1. What did the Repository State panel mean to you?
2. Which Mission required the most thinking?
3. Which Mission felt unfair or ambiguous?
4. Did any Mission feel like guessing the author's command?
5. Was there a safe solution you expected to work but the game rejected?
6. What would you want to practice next?

For Experienced testers also ask:

7. Which scenario felt technically least credible?
8. Which policy decision had more than one defensible answer?

## 7. Aggregation

After several sessions:

1. open `/reports.html`
2. load all anonymous Session JSON files
3. verify rejected-report warnings
4. compare Beginner / Basic / Experienced summaries
5. inspect Mission Hotspots
6. inspect raw Command Traces for suspicious Missions
7. combine quantitative patterns with interview notes

Prioritize:

```text
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
- at least one qualitative interview exists per session
- major technical-credibility objections are resolved or documented
- the team has decided what **not** to change as well as what to change

Only then should the next large Mission expansion or Rubric recalibration begin.
