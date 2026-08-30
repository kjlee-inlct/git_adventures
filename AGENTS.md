# AGENTS.md

## 1. Purpose

This file is the operating contract for coding agents working in this repository.

Git Adventures is not a generic Git command quiz. It is a bilingual, scenario-driven training product that teaches Git through **Repository State transitions, engineering judgment, safe recovery, and explicit Team / Release Policy**.

When a task is ambiguous, preserve the product thesis and existing validated behavior before adding new scope.

---

## 2. Product Thesis

Core promise:

```text
Learn Git by changing repository state,
not by memorizing a command list.
```

Core loop:

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
Recover when needed
   |
Solve a harder scenario
```

Wrong-but-valid commands should often create a consequence / recovery problem rather than a generic FAIL.

Prefer:

```text
Action -> Consequence -> Inspection -> Recovery -> Understanding
```

over:

```text
Wrong answer -> Retry exact string
```

---

## 3. Current Product State

The browser prototype currently contains:

```text
44 Missions / 6 Tracks

Foundations          4
Daily Workflow       8
Recovery Lab         6
Collaboration        9
Release & Incident  13
Assessment           4
```

The first 40 Missions are guided learning / practice.
Missions 41-44 are Assessment.

Do not mass-create hundreds of Missions before real usability evidence justifies expansion.

Current priority is **product validation and calibration**, not content volume.

---

## 4. Non-Negotiable Product Principles

1. Repository State before command memorization.
2. Learning clarity before perfect Git realism.
3. Safe Git habits before command efficiency.
4. Real engineering scenarios before trivia.
5. Beginner-to-expert continuity.
6. Mistakes should become recovery learning when possible.
7. Do not create artificial difficulty by withholding basic safe tools.
8. Korean and English are first-class languages.
9. Content is data; avoid hardcoding curriculum into UI logic.
10. Git functionality, GitHub / PR platform behavior, and Team Policy are separate concepts.
11. Future monetization is an access-policy concern, not Mission-engine logic.
12. Assessment measures judgment, not command recall.
13. Internal telemetry must remain optional and privacy-minimal.
14. Product-change scope must be proportional to evidence scope.

---

## 5. Git vs GitHub vs Team Policy

Keep these layers separate:

```text
Git
  = repository facts and history operations

GitHub / PR Platform
  = review conversation, CI, approval surface

Team Policy
  = evidence and approval requirements before integration
```

Do not invent fake Git commands for actions such as PR approval.

A Scenario may contain an approval or history-policy gate, but Git commands should only model real Git operations.

---

## 6. Repository State Model

The simulator may expose these first-class state domains:

```text
Current Branch
Working Tree
Staging Area
Conflict Set
Operation State
  - rebase
  - merge
  - cherry-pick
Commit History
Local Release Tags
Published Release Tags
Review Gate
Remote / Tracking
Stash Stack
Guardrail State
```

When adding a new Git workflow, first ask whether it requires a new first-class state domain.

Do not fake a multi-step operation such as Rebase/Merge/Cherry-pick conflict resolution as a single Commit mutation when an explicit Operation State is needed.

Abort behavior must restore the appropriate pre-operation snapshot exactly when that is the intended Git concept.

---

## 7. Mission Design Rules

### 7.1 Validate target state, not exact strings

Accept safe equivalent command paths when they preserve the intended learning invariant.

Reject an alternate only when there is a clear product reason, such as:

- unsafe behavior,
- different resulting Repository State,
- explicit Scenario Policy conflict,
- hidden destructive side effect,
- a required learning concept would be bypassed.

Do not reject a path merely because it is not the author's preferred command.

### 7.2 History ownership matters

Do not teach:

```text
Always Rebase
Always Merge
```

Teach:

```text
Who owns these commits?
        |
        +-- Private / coordinated rewrite
        |       -> Rebase may be appropriate
        |
        +-- Shared / published History
                -> preserve ancestry unless Team Policy says otherwise
```

### 7.3 Push rejection

A normal non-fast-forward Push rejection is new repository evidence.

Default learning flow:

```text
Push rejected -> Fetch -> Inspect Divergence -> Choose Policy
```

Do not teach Force Push as the generic fix.

`git push --force-with-lease` belongs only in explicitly constrained advanced scenarios where private/coordinated rewrite is allowed and the lease condition is part of the lesson.

### 7.4 Abort / Skip are legitimate decisions

Do not model `rebase --abort`, `merge --abort`, `cherry-pick --abort`, or `rebase --skip` as automatically wrong.

They are correct only when Scenario Evidence supports them.

---

## 8. Assessment Rules

Assessment Missions use `assessment: true`.

They intentionally suppress the normal final Command Shape hint.

Assessment flow:

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

Assessment must not become an exact-command recall quiz.

### 8.1 Scoring

Default explainable axes:

```text
Judgment    40
Safety      30
Evidence    20
Efficiency  10
```

Mission-specific weight overrides are allowed when the learning objective requires them.

PASS uses both total score and a Safety floor:

```text
total >= passScore
AND
safety >= criticalSafetyFloor
```

Useful inspection is **not** an Efficiency penalty.

Missing required inspection may reduce Evidence.

Unsafe Shared-History / Release-identity actions must reduce Safety and can fail the Safety floor even if the learner later reaches the target state.

### 8.2 Global Rubric changes

Do not change global weights or Safety floors because of one tester or one ambiguous Mission.

Require, at minimum:

```text
repeated mismatch across multiple Assessment Missions
AND
multiple testers
AND
interview-supported sound engineering judgment
AND
Mission-local ambiguity / scoring-event bugs ruled out
```

See:

- `docs/assessment-track.md`
- `docs/assessment-scoring.md`
- `docs/result-review-decision-framework.md`

---

## 9. Architecture Boundaries

Keep the learning engine independent from:

- authentication,
- billing,
- analytics transport,
- organization features,
- deployment choice,
- future entitlement packaging.

Preferred boundary:

```text
Mission Content
      |
      v
Mission Engine
      |
      +--- Command Parser
      +--- State Transition Engine
      +--- State Validator
      +--- Feedback Resolver
      +--- Score Resolver
```

The UI renders state; it should not become the primary owner of Git rules.

Avoid coupling future backend/platform concerns into Mission logic.

---

## 10. File / Module Direction

Current implementation uses static browser modules.

When expanding behavior:

- keep Mission data in `content/` modules,
- keep conflict lifecycle logic in conflict-focused engine code,
- keep release/governance logic in their dedicated engine modules,
- keep Assessment scoring in the shared scoring engine,
- keep local usability recording / aggregation separate from the game rules.

Prefer a new small cohesive module over adding unrelated behavior to `app.js`.

Do not duplicate formulas between Browser UI and tests when a shared pure engine can own the rule.

---

## 11. Internal Usability Testing Is a First-Class Product Workflow

The current product can run the first calibration cycle without a backend.

Canonical flow:

```text
Facilitator Preset
      |
Session Sheet + Local Recorder
      |
Anonymous Session JSON
      |
Post-session Interview
      |
Evidence Handling
      |
Local Report Aggregator
      |
First Review Record
      |
Explicit Product Decision
      |
Traceable Change
      |
Retest / Review Closure
```

Start with:

- `docs/internal-test-operations-index.md`

Important artifacts:

- `docs/internal-test-plan.md`
- `docs/first-internal-test-cycle.md`
- `docs/test-session-sheet.md`
- `docs/interview-note-template.md`
- `docs/usability-session-report.md`
- `docs/internal-evidence-handling.md`
- `docs/report-aggregation.md`
- `docs/first-review-record-workflow.md`
- `docs/review-record-template.md`
- `docs/result-review-decision-framework.md`
- `docs/review-record-to-change-traceability.md`

### 11.1 Do not overreact to one session

For the first discovery pass, the current target is roughly:

```text
Beginner      3-5 usable sessions
Basic         3-5 usable sessions
Experienced   3-5 usable sessions
```

This is a discovery target, not a statistical-power claim.

Technically confirmed defects or privacy/data-integrity failures may be fixed immediately without waiting for the full sample.

### 11.2 Review decisions

Use one explicit decision outcome:

```text
FIX NOW
CHANGE MISSION ONLY
CHANGE UI / LEARNING MODEL
ADD ALTERNATE SOLUTION
CHANGE RUBRIC
OBSERVE MORE
KEEP AS-IS
ESCALATE TECHNICAL REVIEW
```

Every meaningful Review Record must include `Do Not Change`.

A merged implementation does not close a Review Record. Retest evidence is required.

---

## 12. Privacy and Evidence Handling

Do not add direct tester identity fields to product test artifacts.

Do not request or store in the Git Adventures test tooling:

- tester name,
- email,
- employee ID,
- account ID,
- demographic profile,
- unnecessary free-text identity.

Use:

```text
Session ID + Tester Group + Mission ID
```

as the primary evidence join keys.

Raw internal test evidence should remain outside the public product repository by default.

Do not commit real Session JSON, real Session Sheets, or real Interview Notes to the public repository unless explicitly approved and sanitized.

See `docs/internal-evidence-handling.md`.

---

## 13. Documentation Rules

Documentation is part of the product contract, not optional cleanup.

When changing behavior:

1. identify affected docs,
2. update them in the same change,
3. keep Korean / English README claims aligned,
4. update PR description when product scope materially changes,
5. extend documentation contract tests when a new operational invariant should not regress.

Do not create duplicate documents with overlapping responsibility when an existing document should be updated.

If a genuinely new operational role exists, add it to `docs/internal-test-operations-index.md`.

Use concise engineering language and ASCII diagrams where useful.

---

## 14. Validation / CI Contract

Do not bypass failing validation.

Current validation families include:

```text
Guided Curriculum
  Syntax
  Content Contract
  Golden Mission Tests
  Repository / Alternate Invariants
  Release Governance Invariants
  Command Coverage

Assessment
  Schema
  No Command Leak
  Decision / Final State
  Scoring Contract
  Unsafe / Evidence-loss tests

Internal Usability
  Session Report Contract
  PII Non-Collection
  Report Aggregation Contract
  Test Preset Contract
  Operations Documentation Contract
```

When a new behavior is introduced:

- add a Golden test when a canonical Mission path changes,
- add an invariant when a safety/state property must never regress,
- add command coverage for newly supported command families,
- add contract tests for durable content/operations rules.

A CI failure should be investigated as a contract mismatch, not patched by weakening the assertion unless the assertion itself is proven wrong.

---

## 15. Deployment Rules

Current product phase is static browser deployment.

Current recommended options:

```text
Development / one PC
  python -m http.server 8000

Small shared internal server
  Nginx / Caddy static hosting
  OR
  one static-web container
```

**Docker Compose is not required today.**

Do not introduce Compose merely because Docker is available.

Introduce Compose when multiple coordinated runtime services or a real operations need exist, for example:

```text
static-web
+
report/progress API
+
database/storage
```

or when proxy/TLS/persistence/environment coordination clearly benefits from a reproducible multi-service stack.

See:

- `docs/internal-deployment-options.md`
- `docs/internal-deployment-checklist.md`
- `docs/service-architecture.md`

---

## 16. Design Direction

Visual/product direction:

```text
Developer Tool
+ Training Simulator
+ Strategy Game
```

Avoid drifting into:

- generic SaaS dashboard,
- generic LMS,
- children's coding game,
- terminal skin with no state model,
- excessive glassmorphism / gradients / shadows / pills,
- XP / chart UI dominating the Git learning state.

Repository State and Scenario Evidence must remain visually primary.

See `docs/design-direction.md` and the linked Figma file in README.

---

## 17. Localization

Korean and English are first-class.

When adding learner-facing content:

- provide both languages,
- preserve technical meaning rather than literal word-for-word translation,
- use standard Git / software engineering terminology consistently,
- do not make one locale materially easier by leaking more answer detail.

Assessment Hint leakage checks are especially important across both locales.

---

## 18. Safe Command Philosophy

Dangerous commands such as these remain blocked in ordinary training Missions unless a Scenario explicitly teaches a constrained safe variant:

```text
git reset --hard
git clean -fd
git push --force
```

Do not normalize destructive commands as shortcuts.

If a dangerous operation is introduced into advanced content, the Scenario must clearly constrain ownership, recovery, and risk conditions.

---

## 19. Change Scope Rules

Prefer the narrowest change supported by evidence.

Examples:

```text
One Mission ambiguous
  -> fix Mission copy/state/accepted path

Same state confusion across multiple Missions
  -> consider UI / learning-model change

One safe equivalent path rejected
  -> review alternate solution support

Repeated scoring mismatch across Assessments
  -> consider Rubric calibration
```

Do not use a local symptom to justify a global rewrite without repeated evidence.

---

## 20. Git / PR Working Rules

Default development branch for the current product work is the existing feature PR branch unless the user explicitly changes direction.

Before making a write:

1. inspect the current file / blob SHA,
2. avoid parallel writes to the same path,
3. preserve unrelated existing changes,
4. keep commits focused enough to diagnose CI regressions.

After meaningful changes:

1. run / verify CI,
2. inspect failures rather than assuming success,
3. update docs / README / PR body when scope changed,
4. re-check PR mergeability if relevant.

### Critical rule

**Do not merge the pull request unless the user explicitly asks to merge / 병합.**

A request such as `진행` means continue implementation and validation, not merge.

Do not enable auto-merge on your own.

---

## 21. Autonomous Work Guidance

When the user says only `진행`:

1. continue from the strongest next evidence-backed product step,
2. do not ask unnecessary clarification,
3. prefer validation, calibration, and technical depth over raw Mission count,
4. keep the user informed during long multi-step work,
5. stop short of PR merge unless explicitly requested.

At the current project stage, real internal usability evidence has higher priority than speculative infrastructure or large curriculum expansion.

---

## 22. Read-First Map

Before substantial work, read the smallest relevant set.

### Product / game behavior

- `README.md`
- `docs/product-vision.md`
- `docs/game-design.md`
- `docs/curriculum-roadmap.md`

### Mission / engine changes

- `docs/mission-schema.md`
- `docs/content-guideline.md`
- `docs/command-coverage.md`
- relevant engine/content/tests

### Assessment

- `docs/assessment-track.md`
- `docs/assessment-scoring.md`
- `docs/result-review-decision-framework.md`

### Internal usability / calibration

- `docs/internal-test-operations-index.md`
- relevant linked operation document

### Deployment / architecture

- `docs/service-architecture.md`
- `docs/internal-deployment-options.md`
- `docs/internal-deployment-checklist.md`

### Visual design

- `docs/design-direction.md`
- `docs/experience-design.md`

Do not read every document mechanically when only a small subsystem is changing.

---

## 23. Definition of Done

A substantial change is not done merely because code was written.

Definition of Done should include the applicable subset of:

```text
Behavior implemented
      |
State semantics verified
      |
Safe alternate paths considered
      |
Golden / invariant / coverage tests updated
      |
Bilingual content checked
      |
Docs updated
      |
CI green
      |
PR description current
      |
No unrelated regression
```

For evidence-driven product fixes, also require:

```text
Review ID traceability
      |
Retest hypothesis defined
      |
Do Not Change scope preserved
```

---

## 24. Final Agent Reminder

The goal is not to maximize code, Missions, infrastructure, or apparent progress.

The goal is to build a technically credible Git training product whose learners understand **state, consequences, recovery, ownership, policy, and evidence**.

When in doubt:

```text
Preserve validated behavior
-> inspect evidence
-> make the narrowest justified change
-> test it
-> document it
```

# Luna Chat Coder entry point

When repository development is requested from a chat surface with a disposable or sandboxed code-execution environment, read `.agents/skills/luna-chat-coder/SKILL.md` before working on the repository task.

Loading the skill is a readiness step, not a reason to use GitHub Actions. Normal engineering work should stay in the chat sandbox work container when it is available and sufficient.

The repository itself defines its runtimes, services, dependencies, architecture, build system, and verification requirements. Luna Chat Coder supplies continuity, exact transport, and bounded fallback capability; it does not introduce a development methodology or substitute technologies merely because they are easier to run.

Treat exact GitHub commit and PR state as durable source truth, preserve unrelated work, and do not make access to the user's computer a dependency of the workflow.

When this repository is used as a template, keep this entry point and add the project's own engineering instructions alongside it.