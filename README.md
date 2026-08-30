# Git Adventures

[한국어](README.ko.md)

Git Adventures is a scenario-driven Git learning game built around one idea:

> Learn Git by changing repository state, not by memorizing a command list.

The learner receives a realistic repository situation, inspects Local / Remote state, types Git commands, and observes how Working Tree, Staging Area, Commit History, Tracking, Stash, Conflict, and in-progress operation state change.

## Current phase

**Internal product design and MVP validation.**

- Internal server deployment
- Korean / English
- No required account or payment
- All implemented content open during testing
- Architecture prepared for future large-scale and commercial packaging
- Product / game-design quality prioritized before content volume

## Playable curriculum

The current prototype contains **23 Missions** across four Tracks.

```text
Foundations (4)
  status -> diff -> selective staging -> atomic commit

Daily Workflow (7)
  branch isolation / atomic commit / fetch / pull / push / stash
  non-fast-forward Push Reject -> Fetch before integration decision

Recovery Lab (6)
  safe unstage / revert shared history / stash recovery
  conflicted stash pop
  rebase abort
  merge abort

Collaboration (6)
  Ahead / Behind Divergence
  policy-driven Rebase and Merge
  Rebase Conflict -> resolve -> continue
  Merge Conflict -> resolve -> merge commit
  constrained force-with-lease rewrite
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
 +--- Operation State
 |      +--- null
 |      +--- rebase
 |      +--- merge
 +--- Commit History
 +--- Remote / Tracking
 |      +--- tracking branch
 |      +--- known / actual Remote HEAD
 |      +--- ahead / behind
 |      +--- fetch / rejection state
 +--- Stash Stack
```

The game rewards inspection and safe reasoning rather than exact command-string guessing.

## Conflict lifecycle

Conflicts are modeled as temporary operation state, not generic failure screens.

```text
Operation
   |
Conflict
   |
   +--- inspect -> resolve -> stage -> continue / commit
   |
   +--- abort -> exact pre-operation baseline
```

Rebase and Merge intentionally produce different History outcomes. Abort paths are first-class safety decisions.

See [Conflict Lifecycle](docs/conflict-lifecycle.md).

## Force-with-lease policy

`git push --force-with-lease` is exposed only in a constrained advanced Mission:

- Private / coordinated branch
- Rewrite explicitly permitted
- Fetch immediately before push
- Known Remote HEAD still equals Actual Remote HEAD

A lease mismatch must reject the rewrite and preserve unexpected Remote work.

## Learning feedback

- 3-level progressive Hints: Direction -> Concept -> Command shape
- Mastery: independent problem solving / unnecessary detours
- Safety: protection of work and shared History
- Mission Debrief: Why + Mastery + Safety + Hint / Detour use
- Inspection commands do not reduce Mastery

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

Golden tests cover all **23 Missions**. Invariants verify exact Rebase/Merge Abort restoration, conflict resolution state transitions, Stash retention on conflict, Remote divergence behavior, and force-with-lease rejection when the Remote changes unexpectedly.

See [Simulator Command Coverage](docs/command-coverage.md).

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
- [Conflict Lifecycle](docs/conflict-lifecycle.md)
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

1. Branch switch blocked by overlapping Working Tree changes
2. Multiple-file Rebase / Merge Conflict
3. `rebase --skip` and partially resolved Abort
4. Cherry-pick / Backport across Release Branches
5. PR Review and Merge strategy decisions
6. Release / Hotfix incident Track
7. Internal usability testing before large-scale Mission expansion

## License

MIT. See [LICENSE](LICENSE).
