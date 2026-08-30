# Git Adventures

[한국어](README.ko.md)

Git Adventures is a scenario-driven Git learning game built around one idea:

> Learn Git by changing repository state, not by memorizing a command list.

The learner receives a realistic repository situation, inspects Local / Remote state, types Git commands, and observes how Working Tree, Staging Area, Commit History, Tracking, Stash, and Conflict state change.

## Current phase

**Internal product design and MVP validation.**

- Internal server deployment
- Korean / English
- No required account or payment
- All implemented content open during testing
- Architecture prepared for future large-scale and commercial packaging
- Product / game-design quality prioritized before content volume

## Playable curriculum

The current prototype contains **18 Missions** across four Tracks.

```text
Foundations (4)
  status -> diff -> selective staging -> atomic commit

Daily Workflow (7)
  feature branch isolation
  atomic commit from a busy workspace
  fetch remote state
  pull a clean upstream update
  publish with push -u
  stash WIP before urgent branch switching
  recover from non-fast-forward push rejection by fetching facts first

Recovery Lab (4)
  unstage without data loss
  revert shared history
  restore stashed WIP
  recover from a conflicted stash pop

Collaboration (3)
  read ahead / behind divergence
  rebase a private feature branch under explicit team policy
  merge a shared branch under history-preservation policy
```

Long-term curriculum target: approximately **185-273 core Missions**, plus variations and assessments.

## Repository state model

```text
Repository State
 |
 +--- Current Branch
 +--- Working Tree
 +--- Staging Area
 +--- Conflict Set
 +--- Commit History
 +--- Remote / Tracking
 |      +--- tracking branch
 |      +--- known remote HEAD
 |      +--- actual remote HEAD
 |      +--- ahead / behind
 |      +--- fetch state
 |      +--- rejected push state
 |
 +--- Stash Stack
```

The game rewards inspection and safe reasoning rather than exact command-string guessing.

## History policy learning

Git Adventures intentionally avoids teaching `merge` or `rebase` as universally superior.

```text
Who owns these commits?
        |
        +-- Private / coordinated rewrite
        |       |
        |       +-- Rebase may be appropriate
        |
        +-- Shared / already published
                |
                +-- Preserve ancestry unless team policy says otherwise
```

A rejected normal Push is treated as new repository evidence, not as a prompt to force-push.

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

Golden tests cover all 18 Missions. Invariants now verify Remote refresh behavior, Stash preservation, conflicted Stash retention, Rebase commit rewriting, and the distinct history outcome of Merge vs Rebase.

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
- [Collaboration and Divergence Expansion](docs/collaboration-expansion.md)
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

1. Rebase Conflict and `rebase --continue` / `--abort`
2. Merge Conflict and Merge abort
3. Branch switch blocked by overlapping Working Tree changes
4. Remote changes again after a completed Rebase
5. `--force-with-lease` only inside an explicitly constrained advanced Scenario
6. Cherry-pick / Backport across Release Branches
7. PR Review and Merge strategy decisions
8. Internal usability testing before large-scale Mission expansion

## License

MIT. See [LICENSE](LICENSE).
