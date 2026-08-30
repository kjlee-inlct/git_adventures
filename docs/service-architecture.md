# Service Architecture

## 1. Architecture Goal

Keep the learning engine independent from authentication, billing, analytics, organization features, deployment choice, and future product packaging.

The current internal-test version should remain simple while preserving clear extension boundaries.

## 2. Current Internal-Test Architecture

```text
Internal Static Web Server
      |
      v
Browser Client
      |
      +--- UI
      +--- Mission Engine
      +--- Git State Simulator
      +--- Assessment Scoring
      +--- Facilitator Console
      +--- Local Session Recorder
      +--- Local Report Aggregator
      +--- i18n
      +--- Local Progress
      +--- Static Mission Content
```

No backend is required for the first product-validation phase.

Current internal-test persistence is browser-local and exported manually when needed.

Detailed deployment choices: [Internal Deployment Options](internal-deployment-options.md).

## 3. Current Deployment Rule

The current runtime has one real service responsibility: serve static files.

Therefore:

```text
Docker Compose required?  NO
```

Recommended current choices:

```text
Development / single PC
  python -m http.server 8000

Small internal shared server
  Nginx / Caddy static hosting
  OR
  one static-web container
```

A single container does not require Compose.

Introduce Compose when multiple coordinated runtime services, proxy/persistence coordination, or repeatable operations needs materially justify it.

Typical future trigger:

```text
static-web
   +
report/progress API
   +
database or storage
```

Infrastructure complexity must follow a real product/operations need rather than precede it.

## 4. Future Service Architecture

```text
Web Client
 |
 +--- UI
 +--- Mission Engine
 +--- Git State Simulator
 +--- Content Renderer
 +--- i18n
 +--- Progress Adapter
 +--- Access Policy Adapter
 |
 v
Platform API
 |
 +--- Authentication
 +--- Progress Sync
 +--- Team / Organization
 +--- Assessment
 +--- Analytics
 +--- Content Delivery
 +--- Access Policy
 |
 +--- Optional Billing Adapter
```

Billing is optional and remains outside the learning engine.

## 5. Content-First Design

Mission content must be data.

Recommended structure:

```text
content/
|--- schema/
|--- missions/
|    |--- orientation/
|    |--- foundations/
|    |--- workflow/
|    |--- recovery/
|    |--- collaboration/
|    |--- history/
|    |--- release/
|
|--- locales/
     |--- en/
     |--- ko/
```

Prefer language-neutral mechanics with translated copy separated from state transitions.

## 6. Mission Schema Concept

```json
{
  "id": "foundations.stage.003",
  "version": 1,
  "track": "foundations",
  "chapter": "selective-stage",
  "difficulty": 2,
  "accessGroup": "core",
  "masteryTags": ["stage.selective"],
  "initialState": {},
  "objective": {},
  "constraints": [],
  "acceptedPaths": [],
  "unsafePaths": [],
  "targetState": {},
  "feedback": {},
  "hints": [],
  "scoring": {}
}
```

During internal testing, Access Policy allows every implemented `accessGroup`.

The engine validates resulting Git state rather than matching one exact command whenever multiple safe solutions exist.

## 7. Git Simulation Layers

### Phase 1 - Deterministic State Machine

- Browser-only
- curated command grammar
- deterministic transitions
- fastest product iteration

### Phase 2 - Rich Simulation Engine

- expanded parser
- options and alternate command forms
- more realistic Commit Graph
- Conflict simulation
- Remote state

### Phase 3 - Real Git Execution Where Valuable

Possible options:

- WASM Git implementation
- isolated ephemeral server repositories
- containerized assessment environment

Real Git execution should be introduced only where simulation becomes a learning limitation.

If server-side execution introduces API / worker / sandbox services, Docker Compose may become useful for internal development, though stronger isolation may eventually require a more specialized runtime.

## 8. Engine Boundaries

```text
Mission Content
      |
      v
Mission Engine
      |
      +--- Git Command Parser
      +--- State Transition Engine
      +--- State Validator
      +--- Feedback Resolver
      +--- Score Resolver
```

The UI renders state but should not contain Git rules.

## 9. Progress Model

Initial:

```text
Local Storage / IndexedDB
```

Future:

```text
Local Progress
    |
    v
Progress Adapter
    |
    +--- Local Only
    +--- Cloud Sync
```

Progress data should be portable and versioned.

Never silently discard learner progress during schema migration.

## 10. Access Policy Model

Mission content describes neutral groups:

```text
core
advanced-practice
assessment
organization
special-pack
```

Access Policy decides availability.

Internal test:

```text
* -> allow
```

Future product packaging can map groups to user or organization entitlements without changing Mission content.

## 11. Multi-User Scale

If the service expands publicly:

- static Mission content should be cacheable
- simulation remains client-side where practical
- backend requests focus on value requiring persistence or coordination

Potential backend traffic:

- account
- cloud progress
- assignment
- assessment results
- analytics
- organization policy

This architecture can support many anonymous learners without requiring a server-side Git process for every Mission.

## 12. Team Extensibility

Future Organization model:

```text
Organization
 |
 +--- Members
 +--- Teams
 +--- Learning Paths
 +--- Assignments
 +--- Policy Profiles
 +--- Reports
```

Policy Profile examples:

- Branch naming
- PR requirement
- Merge Method
- Commit Message Rule
- Protected Branch behavior
- Release / Tag policy

These policies can configure or generate organization-specific Missions later.

## 13. Analytics Boundary

Analytics must not be embedded throughout Mission code.

Use domain events:

```text
mission.started
command.executed
hint.requested
mission.completed
unsafe_command.attempted
track.entered
session.completed
```

The current internal cycle uses a local anonymous Session Recorder and manual JSON export rather than a central telemetry backend.

Do not introduce a central analytics service before there is a concrete operational need and privacy review.

## 14. Reliability and Content QA

Required as content grows:

- Mission JSON Schema validation
- unique ID validation
- Locale key validation
- accepted-path simulation tests
- target-state Golden tests
- unsafe-path regression tests
- progress migration tests
- broken-link / content-index validation
- internal-test operations documentation contract

## 15. Architecture Rule

```text
Product Rule changes
        !=
Game Engine rewrite
```

and:

```text
Product validation need
        !=
Infrastructure complexity
```

Future login, analytics, team features, monetization, or deployment services should attach through adapters and policy layers rather than alter the core learning engine.
