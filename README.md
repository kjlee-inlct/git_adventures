# Git Adventures

[한국어](README.ko.md)

Git Adventures is a scenario-driven Git learning game built around one idea:

> Learn Git by changing repository state, not by memorizing a command list.

The learner receives realistic repository situations, inspects Local / Remote state, types Git commands, and observes Working Tree, Staging Area, Commit History, Tracking, Stash, Conflict, Release Tag, publication, and in-progress operation state.

## Current phase

**Internal product design and MVP validation.**

- Internal server deployment
- Korean / English
- No required account or payment
- All implemented content open during testing
- Product / game-design quality prioritized before content volume

## Playable curriculum

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

The current internal test loop works without a backend:

```text
Facilitator Preset
      |
Local Session Recorder
      |
Anonymous Session JSON
      |
Local Report Aggregator
      |
Group / Mission Review
```

### Facilitator Console

Open `http://localhost:8000/facilitator.html` or use the **Facilitator** button in the game header.

The Console provides hypothesis-driven presets rather than asking every tester to play all 44 Missions.

```text
Beginner      ~25 min   Core Mental Model
Basic         ~30 min   Workflow / Recovery
Experienced   ~35 min   History / Release / Assessment
```

Each preset includes selected Mission numbers, one primary hypothesis, observation targets, stop / redesign signals, and a before / during / after checklist. Opening a Mission from the Console also preselects the corresponding Test Group in the Session Recorder.

See [First Internal Test Cycle Runbook](docs/first-internal-test-cycle.md).

### Session Recorder

The optional local-only recorder stores Mission timing, relative Command Trace, Hint / Inspection / Detour / Unsafe counts, Guided scores, Assessment scores, and compact final Repository state.

It does not request name, email, employee id, or account id.

See [Local Usability Session Report](docs/usability-session-report.md) and [Internal Test Plan](docs/internal-test-plan.md).

### Report Aggregator

Open `http://localhost:8000/reports.html` or use the **Reports** button.

Multiple Session JSON files can be compared by Beginner / Basic / Experienced group. Metrics include Completion, Average / Median / P75 Time to First Command, Mission Duration, Hint / Inspection / Unsafe / Detour / Wrong rates, Assessment axes, and Mission Hotspots.

Reports with unsupported schema, tester group, or `privacy.piiCollected != false` are rejected.

See [Local Usability Report Aggregation](docs/report-aggregation.md).

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
```

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
- [Local Usability Session Report](docs/usability-session-report.md)
- [Local Usability Report Aggregation](docs/report-aggregation.md)
- [First Internal Test Cycle Runbook](docs/first-internal-test-cycle.md)
- [Internal Test Plan](docs/internal-test-plan.md)
- [Release Governance and Incident Closure](docs/release-governance.md)
- [Command Coverage](docs/command-coverage.md)
- [Product Packaging and Future Monetization](docs/product-monetization.md)
- [Service Architecture](docs/service-architecture.md)
- [Product Roadmap](docs/product-roadmap.md)

## Figma

https://www.figma.com/design/4u02b7msrNYjPDQbITbnGi

## Next milestone

Run the first **3-5 sessions per tester group** using the Facilitator presets. Aggregate the anonymous reports and qualitative interview notes, then fix repeated Mission / UI problems before changing global Rubric weights or expanding content further.

## License

MIT. See [LICENSE](LICENSE).
