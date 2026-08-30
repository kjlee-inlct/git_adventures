# Git Adventures

[한국어](README.ko.md)

Git Adventures is a scenario-driven Git learning game built around one idea:

> Learn Git by changing repository state, not by memorizing a command list.

The learner receives a realistic repository situation, inspects Local / Remote state, types Git commands, and observes Working Tree, Staging Area, Commit History, Tracking, Stash, Conflict, Release Tag, publication, and in-progress operation state.

## Current phase

**Internal product design and MVP validation.**

- Internal server deployment
- Korean / English
- No required account or payment
- All implemented content open during testing
- Architecture prepared for future large-scale and commercial packaging
- Product / game-design quality prioritized before content volume

## Playable curriculum

The current prototype contains **40 Missions** across five Tracks.

```text
Foundations (4)
Daily Workflow (8)
Recovery Lab (6)
Collaboration (9)
Release & Incident (13)
```

Release & Incident now covers selective Backport, dependency ordering, Hotfix isolation, Conflict / Abort, annotated Tags, Bad Release Revert, Patch recovery, review evidence, approval gating, Tag publication, Hotfix propagation to main, and incident closure verification.

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

Git Adventures keeps these layers separate.

```text
Git
  = repository facts and history operations

GitHub / PR Platform
  = review conversation, CI and approval surface

Team Policy
  = evidence and approval requirements before integration
```

A review approval is therefore not simulated as a fake Git command. Git produces review evidence; the Scenario defines the approval gate.

See [Release Governance and Incident Closure](docs/release-governance.md).

## Release / incident lifecycle

```text
Verified Fix
   |
Dependency Check
   |
Selective Backport / Hotfix Branch
   |
Scope Review Evidence
   |
Approval Gate
   |
Release Integration
   |
Verification
   |
Local Tag
   |
Tag Publication
   |
Production
   |
   +--- Healthy
   |
   +--- Regression -> Revert -> Verify -> New Patch Tag
   |
Propagate final recovery to main
   |
Incident Closure Verification
```

Key rules:

- Backport prerequisite commits before dependent fixes.
- Keep emergency changes isolated and reviewable.
- Review exact Hotfix scope before approval.
- A technically mergeable Branch is not automatically release-approved.
- Local Tag creation and Remote Tag publication are separate states.
- Published Release Tags are immutable release identities.
- Preserve auditable Shared History with explicit Revert when appropriate.
- Propagate final incident fixes back to main to avoid future regression.
- End operational workflows with verification, not merely a successful command.

## Validation gates

Every PR runs:

```text
JavaScript Syntax
      |
Content Contract
      |
Golden Mission Tests
      |
Alternate / Repository Invariants
      |
Release Governance Invariants
      |
Simulator Command Coverage
```

Golden tests cover all **40 Missions**. Governance invariants verify that unapproved Hotfixes cannot integrate, Local Tags do not imply publication, explicit Tag publication preserves older Release identities, and incident recovery converges back to main.

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
- [Conflict Lifecycle](docs/conflict-lifecycle.md)
- [Worktree Guardrails and Advanced Rebase Decisions](docs/advanced-rebase-and-worktree-safety.md)
- [Release and Backport Learning Model](docs/release-and-backport.md)
- [Release Incident Lifecycle](docs/release-incident-lifecycle.md)
- [Release Governance and Incident Closure](docs/release-governance.md)
- [Command Coverage](docs/command-coverage.md)
- [Internal Test Plan](docs/internal-test-plan.md)
- [Product Packaging and Future Monetization](docs/product-monetization.md)
- [Service Architecture](docs/service-architecture.md)
- [Product Roadmap](docs/product-roadmap.md)
- [References and Product Research](docs/references.md)

## Figma

https://www.figma.com/design/4u02b7msrNYjPDQbITbnGi

## Next depth

1. Forward-fix vs Revert / Rollback decision scenarios
2. Multiple supported release lines
3. PR review strategy and merge strategy assessment
4. Remote branch deletion / release cleanup policy
5. Release verification checklist and scored assessment Missions
6. Internal usability testing before large-scale Mission expansion

## License

MIT. See [LICENSE](LICENSE).
