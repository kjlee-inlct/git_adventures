# Git Adventures

[한국어](README.ko.md)

Git Adventures is a scenario-driven Git learning game built around one idea:

> Learn Git by changing repository state, not by memorizing a command list.

The learner receives a realistic repository situation, inspects Local / Remote state, types Git commands, and observes how Working Tree, Staging Area, Commit History, Tracking, Stash, Conflict, Release Tag, and in-progress operation state change.

## Current phase

**Internal product design and MVP validation.**

- Internal server deployment
- Korean / English
- No required account or payment
- All implemented content open during testing
- Architecture prepared for future large-scale and commercial packaging
- Product / game-design quality prioritized before content volume

## Playable curriculum

The current prototype contains **35 Missions** across five Tracks.

```text
Foundations (4)
  status -> diff -> selective staging -> atomic commit

Daily Workflow (8)
  branch isolation / atomic commit / fetch / pull / push / stash
  Push Reject -> Fetch before integration decision
  blocked Branch switch -> preserve WIP -> switch safely

Recovery Lab (6)
  safe unstage / revert shared history / stash recovery
  conflicted stash pop
  rebase abort
  merge abort

Collaboration (9)
  Ahead / Behind Divergence
  policy-driven Rebase and Merge
  Rebase / Merge Conflict lifecycle
  constrained force-with-lease rewrite
  multi-file Rebase / Merge Conflict
  deliberate rebase --skip

Release & Incident (8)
  selective Cherry-pick / Backport
  Cherry-pick Conflict / Abort
  dependency-ordered Backport
  Hotfix Branch isolation
  annotated Release Tag
  bad Release Revert
  new Patch Tag after recovery
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
 |      +--- cherry-pick
 +--- Commit History
 +--- Release Tags
 +--- Remote / Tracking
 |      +--- tracking branch
 |      +--- known / actual Remote HEAD
 |      +--- ahead / behind
 |      +--- fetch / rejection state
 +--- Stash Stack
 +--- Guardrail State
        +--- blocked Branch switch
```

The game rewards inspection and safe reasoning rather than exact command-string guessing.

## Conflict lifecycle

Conflicts are modeled as temporary operation state, not generic failure screens.

```text
Operation
   |
Conflict Set
   |
   +--- inspect -> resolve every required path -> stage -> continue / commit
   |
   +--- abort -> exact pre-operation baseline
   |
   +--- skip -> only when the current commit intent is explicitly obsolete
```

See [Conflict Lifecycle](docs/conflict-lifecycle.md) and [Worktree Guardrails and Advanced Rebase Decisions](docs/advanced-rebase-and-worktree-safety.md).

## Release / incident model

Release work is taught around **change intent, dependency, identity, and recovery**.

```text
Verified Fix
   |
Dependency Check
   |
Selective Backport
   |
Hotfix Branch
   |
Verification
   |
Annotated Tag
   |
Production
   |
   +--- Healthy
   |
   +--- Regression -> Revert -> Verify -> New Patch Tag
```

Key rules:

- Backport prerequisite commits before dependent fixes.
- Keep emergency changes isolated and reviewable on a Hotfix Branch.
- Tag the exact Commit that passed verification.
- Do not move a Published Release Tag to hide a bad release.
- Recover Shared Release History with an explicit Revert when appropriate.
- Publish verified recovery under a new Patch Version.

See [Release and Backport Learning Model](docs/release-and-backport.md) and [Release Incident Lifecycle](docs/release-incident-lifecycle.md).

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

Golden tests cover all **35 Missions**. Invariants include exact operation Abort restoration, conflict completeness, blocked-switch WIP preservation, dependency-ordered Backports, immutable Published Tags, auditable Bad Release Revert, and new Patch Tag creation for verified recovery.

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
- [Worktree Guardrails and Advanced Rebase Decisions](docs/advanced-rebase-and-worktree-safety.md)
- [Release and Backport Learning Model](docs/release-and-backport.md)
- [Release Incident Lifecycle](docs/release-incident-lifecycle.md)
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

1. Hotfix Branch -> Release PR -> Review / approval decisions
2. Tag publication and remote tag handling
3. Forward-fix vs Revert / Rollback decision scenarios
4. Hotfix propagation back to main
5. Multiple supported release lines
6. PR Review / Merge Strategy assessment
7. Internal usability testing before large-scale Mission expansion

## License

MIT. See [LICENSE](LICENSE).
