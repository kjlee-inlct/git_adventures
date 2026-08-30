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

Assessment currently covers:

- Published regression: choose auditable Revert instead of erasing shared History
- Supported release line: choose where a verified Fix actually belongs
- Approved integration: choose the Merge strategy required by Scenario History Policy
- Incident closure: verify state instead of assuming the workflow succeeded

Long-term curriculum target: approximately **185-273 core Missions**, plus variations and assessments.

## Assessment design

Assessment Missions use `assessment: true` and intentionally suppress the normal final **Command Shape** hint.

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

### Assessment scoring

Assessment Debrief uses four explainable axes:

```text
Judgment    40
Safety      30
Evidence    20
Efficiency  10
```

These are default weights; Missions may override them when the learning objective requires another emphasis.

PASS uses both total score and a Safety floor:

```text
total >= passScore
AND
safety >= criticalSafetyFloor
```

Useful inspection does not reduce Efficiency. Missing required inspection lowers Evidence, and unsafe Shared-History actions can fail the Safety floor even if the learner later reaches the correct state.

See [Assessment Track](docs/assessment-track.md) and [Assessment Scoring Rubric](docs/assessment-scoring.md).

## Internal usability session recorder

The browser now includes an optional **local-only internal test recorder**.

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

Groups:

- Beginner
- Basic
- Experienced

A report records Mission timing, relative Command Trace, Hint / Inspection / Detour / Unsafe counts, Guided scores, Assessment scores, and compact final Repository state.

The recorder does not request name, email, employee id, or account id. It uses a separate Local Storage key and exports a versioned JSON report for internal comparison. The data is for product/rubric calibration, not employee ranking or certification.

See [Local Usability Session Report](docs/usability-session-report.md) and [Internal Test Plan](docs/internal-test-plan.md).

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

A review approval is not simulated as a fake Git command. Git produces review evidence; the Scenario defines the approval gate.

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

## Validation gates

Every PR now validates curriculum, Assessment scoring, and the local test-report contract.

```text
Guided curriculum (40)
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

Assessment curriculum (4)
  Assessment Schema
       |
  Minimal Hint / No Command Leak
       |
  Expected Decision Command
       |
  Final State Verification
       |
  Scoring Rubric Contract
       |
  Unsafe / Evidence-loss Scoring Tests

Internal usability data
  Session Report Schema
       |
  Tester Group Contract
       |
  PII Non-Collection Contract
       |
  Command Classification
       |
  Guided / Assessment Score Preservation
       |
  JSON Summary Validation
```

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
- [Assessment Track](docs/assessment-track.md)
- [Assessment Scoring Rubric](docs/assessment-scoring.md)
- [Local Usability Session Report](docs/usability-session-report.md)
- [Command Coverage](docs/command-coverage.md)
- [Internal Test Plan](docs/internal-test-plan.md)
- [Product Packaging and Future Monetization](docs/product-monetization.md)
- [Service Architecture](docs/service-architecture.md)
- [Product Roadmap](docs/product-roadmap.md)
- [References and Product Research](docs/references.md)

## Figma

https://www.figma.com/design/4u02b7msrNYjPDQbITbnGi

## Next depth

1. Run the first Beginner / Basic / Experienced internal sessions
2. Compare time-to-first-command, Hint, Unsafe, Inspection, and Assessment patterns
3. Calibrate Rubric weights / Safety floors from observed behavior
4. Add richer Forward-fix vs Revert vs Rollback Assessment
5. Add multiple simultaneously supported Release Lines
6. Improve PR Review / Merge Strategy assessment with competing valid-looking options

## License

MIT. See [LICENSE](LICENSE).
