# Service Architecture

## 1. Architecture Goal

Keep the learning engine independent from authentication, billing, analytics, organization features, deployment choice, and future product packaging.

The current internal-test version should remain simple while preserving clear extension boundaries.

## 2. Current Internal-Test Architecture

```text
Internal Web Server
      |
      v
Browser Client
      |
      +--- UI
      +--- Mission Engine
      +--- Git State Simulator
      +--- i18n
      +--- Local Progress
      +--- Static Mission Content
```

No backend is required for the first product-validation phase.

## 3. Future Service Architecture

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

## 4. Content-First Design

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

## 5. Mission Schema Concept

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

## 6. Git Simulation Layers

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

## 7. Engine Boundaries

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

## 8. Progress Model

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

## 9. Access Policy Model

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

## 10. Multi-User Scale

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

## 11. Team Extensibility

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

## 12. Analytics Boundary

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

Initial internal test may record nothing or use an approved internal analytics path.

## 13. Reliability and Content QA

Required as content grows:

- Mission JSON Schema validation
- unique ID validation
- Locale key validation
- accepted-path simulation tests
- target-state Golden tests
- unsafe-path regression tests
- progress migration tests
- broken-link / content-index validation

## 14. Architecture Rule

```text
Product Rule changes
        !=
Game Engine rewrite
```

Future login, analytics, team features, or monetization should attach through adapters and policy layers rather than alter the core learning engine.
