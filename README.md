# Git Adventures

[한국어](README.ko.md)

Git Adventures is a scenario-driven Git learning game built around one idea:

> Learn Git by changing repository state, not by memorizing a command list.

A learner receives a realistic repository situation, inspects the state, types Git commands, and immediately sees how the Working Tree, Staging Area, Commit History, Branches, and Remote state change.

## Current phase

The project is currently in **internal product design and MVP validation**.

- Internal server deployment
- Korean / English
- No payment
- No required account
- All implemented content available during testing
- Product architecture prepared for future large-scale service use
- Future paid packaging designed as metadata/policy, not hardcoded into Missions

The priority is product and game-design quality before large-scale implementation.

## Core learning loop

```text
Scenario
   |
Inspect Repository State
   |
Choose / Type Git Command
   |
Observe State Transition
   |
Understand Why
   |
Recover from mistakes when needed
   |
Solve harder scenarios
```

Valid but poor choices can create new repository consequences instead of a generic fail screen.

## First playable Vertical Slice

Eight Missions currently span three learning stages:

```text
Foundations
  1. Inspect repository status
  2. Read unstaged diff
  3. Selective staging
  4. Atomic commit

Daily Workflow
  5. Feature Branch isolation
  6. Build an Atomic Commit from a busy workspace

Recovery Lab
  7. Unstage without discarding work
  8. Revert shared History safely
```

The simulator allows inspection commands without scoring penalties and supports state-changing detours such as `git add .` followed by recovery.

## Learning feedback

The current prototype adds four learning signals:

```text
Mastery = independence / unnecessary detours
Safety  = protection of work and shared History
Hints   = progressive help depth
Debrief = Why + result after Mission completion
```

Inspection commands such as `git status`, `git diff`, `git diff --staged`, and `git log --oneline` are not treated as inefficiency.

Potentially destructive commands are blocked in ordinary Missions and reduce Safety. Dedicated Recovery Labs may teach them later with explicit consequence simulation.

See [Learning Feedback System](docs/learning-feedback-system.md).

## Planned curriculum

| Track | Learning outcome |
|---|---|
| Orientation | Git mental model and inspection-first habit |
| Foundations | First independent Feature Branch workflow |
| Daily Workflow | Normal multi-file development work |
| Recovery Lab | Safe recovery from common mistakes |
| Collaboration | PR, Merge, Rebase, Conflict, shared History |
| History Management | Reflog, Cherry-pick, Bisect, Rebase, Tags |
| Release & Incident | Hotfix, Backport, bad Release, rollback decisions |
| Mastery / Assessment | Combined scenarios with minimal guidance |

Long-term curriculum target: approximately **185-273 core Missions**, plus scenario variations and assessments.

All implemented Tracks remain open during internal testing. Future commercial packaging can be introduced later without redesigning Mission content.

## Current MVP

- Korean / English switch
- terminal-style command input
- Repository State visualization
- Working Tree / Staging / Commit History feedback
- Track Map
- progressive 3-level Hint system
- Mastery / Safety feedback
- Mission Debrief
- local progress
- no backend or build framework requirement

Run locally:

```bash
python -m http.server 8000
```

Open:

```text
http://localhost:8000
```

## Validation gates

Mission growth is protected by automated tests before the curriculum expands.

```text
Content Contract
      |
      v
Golden Mission Test
      |
      v
Alternate Solution Test
      |
      v
Simulator Command Coverage
```

GitHub Actions currently validates:

- JavaScript syntax
- Mission identity, numbering, bilingual content, difficulty, and Repository State shape
- representative direct solution -> expected final Repository State for all 8 Missions
- alternate safe paths converging to the same target state
- unstage preserving Working Tree data
- learner-facing command references matching Simulator coverage
- dangerous command recognition

See [Simulator Command Coverage](docs/command-coverage.md) and [Vertical Slice](docs/vertical-slice.md).

## Product documentation

- [Product Vision](docs/product-vision.md)
- [Game Design](docs/game-design.md)
- [Curriculum Roadmap](docs/curriculum-roadmap.md)
- [Level Design](docs/level-design.md)
- [Mission Schema](docs/mission-schema.md)
- [Experience Design](docs/experience-design.md)
- [Design Direction](docs/design-direction.md)
- [Learning Feedback System](docs/learning-feedback-system.md)
- [Simulator Command Coverage](docs/command-coverage.md)
- [Vertical Slice](docs/vertical-slice.md)
- [Content Guideline](docs/content-guideline.md)
- [Internal Test Plan](docs/internal-test-plan.md)
- [Product Packaging and Future Monetization](docs/product-monetization.md)
- [Service Architecture](docs/service-architecture.md)
- [Product Roadmap](docs/product-roadmap.md)
- [References and Product Research](docs/references.md)

## Design principles

1. Learning clarity before realism
2. Repository state before command memorization
3. Safe Git habits before efficiency
4. Real development scenarios before trivia
5. Beginner-to-expert continuity
6. Mistakes become recovery learning when possible
7. No artificial difficulty from withholding basic tools
8. Korean and English are first-class content
9. Content is data; the engine should not hardcode the curriculum
10. Design for future commercial scale without adding a current paywall

## Figma

Core experience design:

https://www.figma.com/design/4u02b7msrNYjPDQbITbnGi

Screens:

- Track Map
- Core Mission
- Recovery Incident

## Product research

The project studies interaction and learning patterns from VIM Adventures, VIM Master, community discussion, and established Git workflow guidance. Implementation, scenarios, visual identity, and the Git-specific learning model remain original.

See [References and Product Research](docs/references.md).

## Immediate roadmap

1. Internal test the eight-Mission Vertical Slice
2. Tune Hint / Mastery / Safety from observed behavior
3. Expand Simulator command coverage for Daily Workflow
4. Add consequence-focused Recovery scenarios
5. Require Golden fixtures for every new Mission
6. Expand Foundations to 20-30 high-quality Missions only after the first slice validates
7. Add Daily Workflow and Recovery depth
8. Decide account, analytics, and later packaging from real usage evidence

## License

MIT. See [LICENSE](LICENSE).
