# Service Architecture

## 1. Architecture goal

Keep the learning engine independent from authentication, billing, analytics, and organization features.

## 2. Target architecture

```text
Web Client
 |
 +--- UI
 +--- Mission Engine
 +--- Git State Simulator
 +--- Content Renderer
 +--- i18n
 +--- Local Progress Adapter
 |
 v
Platform API
 |
 +--- Auth Service
 +--- Progress Service
 +--- Entitlement Service
 +--- Team Service
 +--- Assessment Service
 +--- Analytics Events
 |
 +--- Content API / CDN
 |
 +--- Billing Adapter
         |
         +--- Stripe / Paddle / Lemon Squeezy / Other
```

## 3. Content-first design

Mission content should be data.

Recommended future structure:

```text
content/
|--- schema/
|--- en/
|    |--- foundations/
|    |--- recovery/
|    |--- collaboration/
|
|--- ko/
     |--- foundations/
     |--- recovery/
     |--- collaboration/
```

Prefer language-neutral mission mechanics with translated copy separated where practical.

## 4. Mission schema concept

```json
{
  "id": "foundations.status.001",
  "track": "foundations",
  "tier": "free",
  "difficulty": 1,
  "initialState": {},
  "objective": {},
  "acceptedSolutions": [],
  "targetState": {},
  "explanation": {},
  "scoring": {}
}
```

The engine should validate resulting Git state rather than match one exact command whenever multiple safe solutions exist.

## 5. Git simulation layers

Phase 1:
- deterministic browser state machine
- curated commands only

Phase 2:
- richer parser and state transition engine
- multiple accepted command forms

Phase 3 options:
- WASM/libgit2-like sandbox
- isolated server-side ephemeral repositories

Security and operating cost should determine whether real Git execution is necessary. Most beginner missions can remain deterministic simulations.

## 6. Progress model

Guest:

```text
Local Storage / IndexedDB
```

Account:

```text
Local Progress
   |
   v
Progress Sync Adapter
   |
   v
Cloud Progress
```

Never require an account to begin learning.

## 7. Entitlement model

Content metadata defines required entitlement.

```text
free
pro
team
```

Game engine asks an entitlement interface, not a billing provider.

## 8. Multi-user scale

Static content and client simulation should be CDN-cacheable. Backend traffic should focus on authenticated value:

- progress sync
- assignments
- assessments
- analytics
- billing

This keeps free-user infrastructure cost low.

## 9. Team extensibility

Organization domain:

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

Policy Profiles can generate or configure missions for company-specific branch, commit, PR, merge, and release rules.

## 10. Reliability

- version mission content
- preserve progress during content migration
- never silently delete learner progress
- content schema validation in CI
- golden tests for accepted solution -> target state
- regression tests for previously broken scenarios
