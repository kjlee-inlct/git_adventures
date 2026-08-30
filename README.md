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
- Architecture prepared for future large-scale and commercial packaging
- Product / game-design quality prioritized before content volume

## Playable curriculum

The browser prototype now contains **44 Missions across six Tracks**.

```text
Foundations          4
Daily Workflow       8
Recovery Lab         6
Collaboration        9
Release & Incident  13
Assessment           4
```

The first 40 Missions are guided learning / practice. Missions 41-44 form the first Assessment Track and measure decision quality using already learned tools.

## Assessment design

Assessment Missions use `assessment: true` and suppress the final **Command Shape** hint.

```text
Scenario Evidence
      |
Repository State
      |
Team / Release Policy
      |
Decision
      |
Git Action
      |
Outcome Verification
```

Assessment scoring uses four explainable axes:

```text
Judgment    40
Safety      30
Evidence    20
Efficiency  10
```

PASS requires both total score and a Safety floor. Useful inspection does not reduce Efficiency; missing required inspection lowers Evidence.

See [Assessment Track](docs/assessment-track.md) and [Assessment Scoring Rubric](docs/assessment-scoring.md).

## Internal usability session recorder

The browser includes an optional **local-only internal test recorder**.

```text
Choose Test Group
      |
Start Session
      |
Play normally
      |
End Session
      |
Export anonymous JSON
```

Groups: Beginner / Basic / Experienced.

Reports contain Mission timing, relative Command Trace, Hint / Inspection / Detour / Unsafe counts, Guided scores, Assessment scores, and compact final Repository state. No name, email, employee id, or account id is requested.

See [Local Usability Session Report](docs/usability-session-report.md) and [Internal Test Plan](docs/internal-test-plan.md).

## Local report aggregation

Open `http://localhost:8000/reports.html` or use the **Reports** button in the game header.

Multiple exported Session JSON files can be loaded together and compared by tester group without a backend.

The Aggregator provides:

- Completion Rate
- Average / Median / P75 Time to First Command
- Mission Duration
- Hint / Inspection / Unsafe / Detour / Wrong rates
- Assessment Total / Pass Rate
- Judgment / Safety / Evidence / Efficiency averages and medians
- Mission-level hotspot ranking

Reports with unsupported schema, tester group, or `privacy.piiCollected != false` are rejected from aggregation.

See [Local Usability Report Aggregation](docs/report-aggregation.md).

## Repository state model

```text
Repository State
 |
 +--- Current Branch
 +--- Working Tree
 +--- Staging Area
 +--- Conflict Set
 +--- Operation State
 |      +--- rebase
 |      +--- merge
 |      +--- cherry-pick
 +--- Commit History
 +--- Local Release Tags
 +--- Published Release Tags
 +--- Review Gate
 +--- Remote / Tracking
 +--- Stash Stack
 +--- Guardrail State
```

## Git vs GitHub vs Team Policy

```text
Git
  = repository facts and history operations

GitHub / PR Platform
  = review conversation, CI and approval surface

Team Policy
  = evidence and approval requirements before integration
```

A review approval is not simulated as a fake Git command. Git produces review evidence; the Scenario defines the approval gate.

## Validation gates

```text
Guided curriculum (40)
  Syntax -> Content -> Golden -> Repository Invariants
  -> Release Governance -> Command Coverage

Assessment curriculum (4)
  Schema -> No Command Leak -> Decision -> Final State
  -> Scoring Contract -> Unsafe / Evidence tests

Internal usability data
  Session Report Contract
  -> PII Non-Collection
  -> Report Aggregation Contract
  -> Group / Mission Metrics
```

## Run locally

```bash
python -m http.server 8000
```

Game: `http://localhost:8000/`

Reports: `http://localhost:8000/reports.html`

## Product documentation

- [Product Vision](docs/product-vision.md)
- [Game Design](docs/game-design.md)
- [Curriculum Roadmap](docs/curriculum-roadmap.md)
- [Assessment Track](docs/assessment-track.md)
- [Assessment Scoring Rubric](docs/assessment-scoring.md)
- [Local Usability Session Report](docs/usability-session-report.md)
- [Local Usability Report Aggregation](docs/report-aggregation.md)
- [Internal Test Plan](docs/internal-test-plan.md)
- [Release Governance and Incident Closure](docs/release-governance.md)
- [Command Coverage](docs/command-coverage.md)
- [Product Packaging and Future Monetization](docs/product-monetization.md)
- [Service Architecture](docs/service-architecture.md)
- [Product Roadmap](docs/product-roadmap.md)

## Figma

https://www.figma.com/design/4u02b7msrNYjPDQbITbnGi

## Next depth

1. Run the first Beginner / Basic / Experienced internal sessions
2. Load exported reports into `reports.html`
3. Compare repeated Group / Mission patterns before changing Rubric weights
4. Add richer Forward-fix vs Revert vs Rollback Assessment
5. Add multiple simultaneously supported Release Lines
6. Improve PR Review / Merge Strategy assessment with competing valid-looking options

## License

MIT. See [LICENSE](LICENSE).
