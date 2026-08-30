# Git Adventures

[한국어](README.ko.md)

Git Adventures is a scenario-driven Git learning game built around one idea:

> Learn Git by changing repository state, not by memorizing a command list.

A learner receives a realistic repository situation, inspects the state, types real Git commands, and immediately sees how the Working Tree, Staging Area, Commit History, Branches, and Remote state change.

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

## Product goal

```text
Beginner
   |
   v
Understand Git State
   |
   v
Complete Daily Workflow
   |
   v
Recover from Mistakes
   |
   v
Collaborate Safely
   |
   v
Manage History
   |
   v
Handle Release / Incident Scenarios
   |
   v
Git Mastery
```

The product should remain useful after the learner already knows `commit`, `pull`, and `push`.

## Core game loop

```text
Scenario
   |
   v
Inspect Repository State
   |
   v
Choose / Type Git Command
   |
   v
Observe State Transition
   |
   v
Understand Why
   |
   v
Solve Harder Scenario
```

A wrong but recoverable command should often create a new recovery problem instead of a generic fail screen.

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

The current browser prototype provides:

- Korean / English switch
- terminal-style command input
- repository state visualization
- Working Tree / Staging / Commit History feedback
- Mission progression
- XP and local progress
- no build step or backend requirement

Run locally:

```bash
python -m http.server 8000
```

Open:

```text
http://localhost:8000
```

## Product documentation

Planning is intentionally kept in the repository before implementation expands.

- [Product Vision](docs/product-vision.md)
- [Game Design](docs/game-design.md)
- [Curriculum Roadmap](docs/curriculum-roadmap.md)
- [Level Design](docs/level-design.md)
- [Experience Design](docs/experience-design.md)
- [Visual Design Direction](docs/design-direction.md)
- [Mission Schema](docs/mission-schema.md)
- [Product Phase Gates](docs/product-phase-gates.md)
- [Content Guideline](docs/content-guideline.md)
- [Internal Test Plan](docs/internal-test-plan.md)
- [Product Packaging and Future Monetization](docs/product-monetization.md)
- [Service Architecture](docs/service-architecture.md)
- [References and Product Research](docs/references.md)

## Figma product design

Core product screens are maintained in Figma:

https://www.figma.com/design/4u02b7msrNYjPDQbITbnGi

Current design set:

- Track Map
- Core Mission
- Recovery Incident

The Figma screens define the visual grammar and learning hierarchy. The implementation may adapt dimensions while preserving the same product logic.

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

## Visual direction

The UI should feel like a purpose-built developer puzzle game.

```text
Developer Tool
+
Puzzle Game
+
Repository Map
+
Editorial Typography
```

Avoid generic SaaS dashboard patterns, decorative glass cards, random gradients, or animations that do not teach Git state.

## Product research

The project studies interaction and learning patterns from products such as VIM Adventures and VIM Master, along with community feedback around those tools. The implementation, scenarios, visual identity, and Git-specific learning model remain original.

See [References and Product Research](docs/references.md).

## Future commercialization

Commercial options are planned now only to avoid architectural dead ends.

During internal testing:

```text
All implemented content -> Accessible
```

Later, evidence may support packaging around:

- advanced individual practice
- assessments
- cloud progress
- specialized scenario packs
- team onboarding and analytics
- company-specific Git policy Missions

Pricing and payment model will be decided from real product usage, not assumed in advance.

## Immediate roadmap

1. Validate Product Vision and Game Loop
2. Validate Repository Board / Mission / Recovery visual grammar in Figma
3. Build 5-10 high-quality prototype Missions using the versioned Mission Schema
4. Run internal usability sessions with beginner / basic / experienced Git users
5. Refine learning and UX problems before expanding content volume
6. Expand Foundations to 20-30 Missions
7. Add Daily Workflow and Recovery vertical slices
8. Add automated content validation and Golden scenario tests
9. Review accessibility and bilingual behavior
10. Decide next service architecture from actual usage evidence

## License

MIT. See [LICENSE](LICENSE).
