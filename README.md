# Git Adventures

[한국어](README.ko.md)

Git Adventures is a scenario-driven Git learning game built around one idea:

> Learn Git by changing repository state, not by memorizing a command list.

The learner receives a realistic repository situation, inspects Local / Remote state, types Git commands, and observes how Working Tree, Staging Area, Commit History, Tracking, and Stash change.

## Current phase

**Internal product design and MVP validation.**

- Internal server deployment
- Korean / English
- No required account or payment
- All implemented content open during testing
- Architecture prepared for future large-scale and commercial packaging
- Product / game-design quality prioritized before content volume

## Playable curriculum

The current prototype contains **13 Missions**.

```text
Foundations (4)
  status -> diff -> selective staging -> atomic commit

Daily Workflow (6)
  feature branch
  busy workspace atomic commit
  fetch remote state
  pull a clean upstream update
  publish with push -u
  stash WIP before urgent branch switching

Recovery Lab (3)
  unstage without data loss
  revert shared history
  restore stashed WIP
```

Long-term curriculum target: approximately **185-273 core Missions**, plus variations and assessments.

## Repository state model

```text
Repository State
 |
 +--- Current Branch
 +--- Working Tree
 +--- Staging Area
 +--- Commit History
 +--- Remote / Tracking
 |      +--- tracking branch
 |      +--- known remote HEAD
 |      +--- actual remote HEAD
 |      +--- ahead / behind
 |      +--- fetch state
 |
 +--- Stash Stack
```

The game rewards inspection and safe reasoning rather than exact command-string guessing.

## Learning feedback

- 3-level progressive Hints: Direction -> Concept -> Command shape
- Mastery: independent problem solving / unnecessary detours
- Safety: protection of work and shared History
- Mission Debrief: Why + Mastery + Safety + Hint / Detour use
- Inspection commands do not reduce Mastery
- Dangerous commands are blocked in ordinary Missions and reserved for explicit Recovery Labs

## Validation gates

Every PR runs:

```text
JavaScript Syntax
      |
Content Contract
      |
Golden Mission Tests
      |
Alternate / Invariant Tests
      |
Simulator Command Coverage
```

Golden tests cover all 13 Missions. Remote/Stash invariants verify that `fetch` does not move Local HEAD, `push -u` establishes tracking, and stash push/pop preserves WIP correctly.

## Run locally

```bash
python -m http.server 8000
```

Open `http://localhost:8000`.

## Product documentation

- [Product Vision](docs/product-vision.md)
- [Game Design](docs/game-design.md)
- [Curriculum Roadmap](docs/curriculum-roadmap.md)
- [Level Design](docs/level-design.md)
- [Mission Schema](docs/mission-schema.md)
- [Experience Design](docs/experience-design.md)
- [Design Direction](docs/design-direction.md)
- [Learning Feedback System](docs/learning-feedback-system.md)
- [Vertical Slice](docs/vertical-slice.md)
- [Daily Workflow Expansion](docs/daily-workflow-expansion.md)
- [Command Coverage](docs/command-coverage.md)
- [Internal Test Plan](docs/internal-test-plan.md)
- [Product Packaging and Future Monetization](docs/product-monetization.md)
- [Service Architecture](docs/service-architecture.md)
- [Product Roadmap](docs/product-roadmap.md)
- [References and Product Research](docs/references.md)

## Figma

Core experience design:

https://www.figma.com/design/4u02b7msrNYjPDQbITbnGi

Current design screens:

- Track Map
- Core Mission
- Recovery Incident

## Next depth

1. `fetch` -> inspect divergence -> explicit Merge / Rebase decision
2. rejected Push because Remote moved
3. policy-driven `pull --rebase`
4. Stash Pop Conflict
5. Branch switch blocked by overlapping changes
6. Collaboration Track: PR / Conflict / shared-history decisions
7. Internal usability testing before expanding Foundations to 20-30 Missions

## License

MIT. See [LICENSE](LICENSE).
