# Internal Test Plan

## 1. Purpose

Use internal users to validate learning quality, game flow, and product depth before optimizing deployment or monetization.

The test should answer:

- Do beginners understand Git state better after playing?
- Do experienced users find meaningful depth?
- Are Missions enjoyable enough to continue voluntarily?
- Where does confusion occur?
- Which advanced Tracks create the strongest interest?
- Does the UI feel like a purpose-built product?

## 2. Test Groups

### Group A - Git Beginner

Profile:

- little or no Git experience

Target observations:

- first-action hesitation
- Working Tree / Staging understanding
- fear of commands
- hint dependency

### Group B - Basic Git User

Profile:

- uses commit / pull / push
- limited Recovery knowledge

Target observations:

- selective staging habits
- Branch mental model
- Local vs shared History decisions

### Group C - Experienced Developer

Profile:

- comfortable with Branch / Rebase / Recovery

Target observations:

- whether scenarios feel realistic
- whether advanced Tracks are deep enough
- whether feedback is technically credible

## 3. Session Structure

### Session 1 - First Contact

15-20 minutes.

No verbal explanation before start beyond opening the URL.

Observe:

- time to first command
- where eyes move first
- whether objective is understood
- whether repository board is self-explanatory
- whether language switch is discoverable

### Session 2 - Workflow

20-30 minutes.

Use Foundations / Daily Workflow.

Observe:

- whether learner predicts state changes
- whether they repeatedly use broad commands such as `git add .`
- whether feedback changes later behavior

### Session 3 - Recovery

20-30 minutes.

Introduce safe recovery scenarios.

Observe:

- tendency to choose destructive commands
- ability to distinguish Local vs shared History
- whether consequence visualization teaches risk

## 4. Metrics

### Learning

- Mission completion rate
- first-attempt success
- hint depth
- repeated mistake rate
- similar-scenario retention
- unsafe-command rate

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
- return within 1 / 3 / 7 days
- voluntary advanced-Track entry

### Qualitative

After session ask:

1. What did you think the Repository Board represented?
2. Which moment felt most satisfying?
3. Which moment felt confusing or unfair?
4. Did any Mission feel like memorizing an answer rather than solving a problem?
5. What would you want to practice next?
6. Would you use this again without being asked?

## 5. Critical Failure Signals

Stop and redesign if repeated users show:

- inability to explain Working Tree vs Staging after Foundations
- repeated confusion between Local and Remote
- progress dependent on guessing exact command strings
- frustration from unavailable commands mentioned by the lesson
- UI requiring facilitator explanation
- experienced users reporting the product becomes trivial after basics
- reward UI distracting from Git state

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

## 7. Internal Access Policy

Initial test:

- no payment
- no account requirement unless account behavior itself is under test
- all implemented Tracks open
- local progress acceptable
- internal server only

Future entitlement metadata remains invisible to users.

## 8. Iteration Cycle

```text
Design 5-10 Missions
   |
   v
Internal Test
   |
   v
Observe / Record
   |
   v
Fix Learning Problem
   |
   v
Fix UX Problem
   |
   v
Expand Content
```

Do not create 200 Missions before validating the first 20-30.

## 9. Release Gates

### Gate 1 - Concept Prototype

- Repository Board understood without explanation
- first 5 Missions playable

### Gate 2 - Foundations Alpha

- 20-30 Missions
- beginner learning improvement observed
- bilingual flow stable

### Gate 3 - Internal Beta

- Foundations + Daily Workflow + Recovery slice
- local progress stable
- responsive UI acceptable
- basic analytics available if approved internally

### Gate 4 - External Readiness

- accessibility review
- privacy review
- deployment hardening
- content QA
- support / feedback channel

Commercial packaging decision occurs after product value is validated, not before.
