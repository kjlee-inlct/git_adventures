# Git Adventures

[한국어](README.ko.md)

Git Adventures is a scenario-driven Git learning game built around one idea:

> Learn Git by changing repository state, not by memorizing a command list.

The browser prototype contains **44 Missions across six Tracks**.

```text
Foundations          4
Daily Workflow       8
Recovery Lab         6
Collaboration        9
Release & Incident  13
Assessment           4
```

The first 40 Missions are guided learning / practice. Missions 41-44 form the first Assessment Track.

## Assessment

Assessment suppresses the final Command Shape hint and scores four explainable axes:

```text
Judgment    40
Safety      30
Evidence    20
Efficiency  10
```

PASS requires both total score and a Safety floor. Useful inspection does not reduce Efficiency; missing required inspection lowers Evidence.

See [Assessment Track](docs/assessment-track.md) and [Assessment Scoring Rubric](docs/assessment-scoring.md).

## Internal usability workflow

The first calibration cycle can run without a backend:

```text
Facilitator Preset
      |
Session Sheet + Local Recorder
      |
Anonymous Session JSON
      |
Post-session Interview
      |
Local Report Aggregator
      |
First Review Record
      |
Explicit Product Decision
```

### Facilitator Console

Open `http://localhost:8000/facilitator.html` or use the **Facilitator** button in the game header.

Group presets:

```text
Beginner      ~25 min   Core Mental Model
Basic         ~30 min   Workflow / Recovery
Experienced   ~35 min   History / Release / Assessment
```

Each preset includes Mission selection, one primary hypothesis, observation targets, stop / redesign signals, and one-click Mission jumps.

The Console also links the full operations document set.

### Session Recorder

The optional local-only recorder stores Mission timing, relative Command Trace, Hint / Inspection / Detour / Unsafe counts, Guided scores, Assessment scores, and compact final Repository state.

It does not request name, email, employee id, or account id.

### Post-session Interview

Interview notes are collected **after** Session JSON export to avoid changing recorded task behavior.

The template focuses on:

- mental model,
- evidence used for decisions,
- ambiguity,
- rejected safe alternatives,
- technical credibility,
- Assessment fairness.

### Report Aggregator

Open `http://localhost:8000/reports.html` or use the **Reports** button.

Multiple Session JSON files can be compared by Beginner / Basic / Experienced group. Metrics include Completion, Average / Median / P75 Time to First Command, Mission Duration, Hint / Inspection / Unsafe / Detour / Wrong rates, Assessment axes, and Mission Hotspots.

Reports with unsupported schema, tester group, or `privacy.piiCollected != false` are rejected.

### First Review Record

After the first **3-5 usable sessions per group**, build the first evidence-backed Review Record from:

```text
Anonymous Session JSON
   +
Session Sheet
   +
Interview Note
   +
Aggregator Pattern
   +
Technical Review when needed
```

Use [First Review Record Workflow](docs/first-review-record-workflow.md) to organize the evidence bundle and write the first traceable Review Record before choosing a product change.

### Review Decision Framework

Metrics do not directly create product work.

Each significant pattern should then use [Result Review Decision Framework](docs/result-review-decision-framework.md) and choose one explicit outcome:

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

Global Rubric changes require repeated evidence across multiple Assessment Missions and testers. One ambiguous Mission should be fixed locally first.

## Docker / internal deployment

**Docker Compose is not required for the current phase.**

Today Git Adventures is a static browser application with no backend API or database.

Recommended current deployment:

```text
Development / one PC
  python -m http.server 8000

Small shared internal server
  Nginx / Caddy static hosting
  OR
  one static-web container
```

A single Nginx/Caddy container does not require Compose.

Introduce Docker Compose when multiple coordinated runtime services become real requirements, for example:

```text
static-web
   +
report/progress API
   +
database/storage
```

or when reverse proxy / TLS / persistence / environment coordination materially benefits from one reproducible stack.

See [Internal Deployment Options](docs/internal-deployment-options.md) and [Service Architecture](docs/service-architecture.md).

## Internal test operations document set

| Artifact | Purpose |
| --- | --- |
| [Internal Test Plan](docs/internal-test-plan.md) | Why / what to validate |
| [First Internal Test Cycle Runbook](docs/first-internal-test-cycle.md) | How to run the cycle |
| [Internal Test Session Sheet](docs/test-session-sheet.md) | Factual per-session observations |
| [Interview Note Template](docs/interview-note-template.md) | Why the tester acted that way |
| [Local Usability Session Report](docs/usability-session-report.md) | Anonymous machine-recorded behavior |
| [Local Usability Report Aggregation](docs/report-aggregation.md) | What repeats across sessions |
| [First Review Record Workflow](docs/first-review-record-workflow.md) | How to turn the first real evidence bundle into a Review Record |
| [Result Review Decision Framework](docs/result-review-decision-framework.md) | What to change / not change |
| [Internal Deployment Options](docs/internal-deployment-options.md) | Current hosting choice and Compose adoption trigger |

## Git vs GitHub vs Team Policy

```text
Git
  = repository facts and history operations

GitHub / PR Platform
  = review conversation, CI and approval surface

Team Policy
  = evidence and approval requirements before integration
```

Approval is not simulated as a fake Git command. Git produces review evidence; the Scenario defines the approval gate.

## Validation gates

```text
Guided curriculum (40)
  Syntax -> Content -> Golden -> Repository Invariants
  -> Release Governance -> Command Coverage

Assessment curriculum (4)
  Schema -> No Command Leak -> Decision -> Final State
  -> Scoring Contract -> Unsafe / Evidence tests

Internal usability data
  Session Report Contract -> PII Non-Collection
  -> Report Aggregation Contract -> Group / Mission Metrics
  -> Test Preset Contract
  -> Operations Documentation Contract
```

The Documentation Contract keeps required operations artifacts linked, preserves the Decision Outcome set, and prevents direct identity-input fields from being reintroduced into Session / Interview templates.

## Run locally

```bash
python -m http.server 8000
```

Game: `http://localhost:8000/`

Facilitator: `http://localhost:8000/facilitator.html`

Reports: `http://localhost:8000/reports.html`

## Product documentation

- [Product Vision](docs/product-vision.md)
- [Game Design](docs/game-design.md)
- [Curriculum Roadmap](docs/curriculum-roadmap.md)
- [Assessment Track](docs/assessment-track.md)
- [Assessment Scoring Rubric](docs/assessment-scoring.md)
- [Internal Test Plan](docs/internal-test-plan.md)
- [First Internal Test Cycle Runbook](docs/first-internal-test-cycle.md)
- [Internal Test Session Sheet](docs/test-session-sheet.md)
- [Interview Note Template](docs/interview-note-template.md)
- [Local Usability Session Report](docs/usability-session-report.md)
- [Local Usability Report Aggregation](docs/report-aggregation.md)
- [First Review Record Workflow](docs/first-review-record-workflow.md)
- [Result Review Decision Framework](docs/result-review-decision-framework.md)
- [Internal Deployment Options](docs/internal-deployment-options.md)
- [Release Governance and Incident Closure](docs/release-governance.md)
- [Command Coverage](docs/command-coverage.md)
- [Product Packaging and Future Monetization](docs/product-monetization.md)
- [Service Architecture](docs/service-architecture.md)
- [Product Roadmap](docs/product-roadmap.md)

## Figma

https://www.figma.com/design/4u02b7msrNYjPDQbITbnGi

## Next milestone

Run the first **3-5 sessions per tester group** using the Facilitator presets. For each usable session, keep the anonymous Session JSON, Session Sheet, and Interview Note. Aggregate repeated patterns, create the first Review Record, and fix evidence-backed Mission / UI / technical problems before changing global Rubric weights or expanding content further.

## License

MIT. See [LICENSE](LICENSE).
