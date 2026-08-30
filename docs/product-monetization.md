# Product Packaging and Future Monetization

## 1. Current Phase

The current phase is internal product validation.

All implemented learning content and product features should remain accessible during internal testing unless a restriction is required to test a specific entitlement behavior.

```text
Now
 |
 +--- Internal users
 +--- No payment
 +--- No artificial paywall
 +--- Broad feature access
 +--- Learn from usage
 |
 v
Later
 |
 +--- Decide packaging from evidence
 +--- Convert selected depth / service features to paid
```

The purpose of commercial planning now is architectural readiness, not early monetization.

## 2. Product Principle

Monetization must not damage the learning loop.

A future free user should still reach a real outcome: understand Git state and complete a basic Feature Branch workflow.

Future paid value should come from depth, realism, assessment, continuity, specialized content, and organizational value.

## 3. Product Risks from Reference Feedback

Public feedback around learning games highlights several risks:

- mandatory account creation before first value creates friction
- an early hard paywall makes the product feel like a bait-and-switch
- beginner-only content loses intermediate users
- users want harder scenarios after the basics
- one-time educational value may not fit a subscription-only model
- learners value a game when it makes otherwise tedious repetition enjoyable

Git Adventures response:

- Guest-first initial experience
- Local progress possible before account creation
- Full internal-test access
- Beginner-to-advanced curriculum designed from the beginning
- Future packaging separated from Mission logic
- Future pricing model chosen only after usage and retention data exist

## 4. Future Packaging Model

The following names are planning labels, not current product restrictions.

### Core

Purpose: broad adoption and genuine Git competency.

Potential contents:

- Orientation
- Foundations
- meaningful Daily Workflow coverage
- essential safe Recovery concepts
- Korean / English
- local progress
- command reference
- core achievements

### Individual Mastery

Potential future paid value:

- complete Recovery Lab
- Collaboration scenarios
- History Management
- Release / Incident packs
- adaptive Practice Arena
- assessments
- detailed mastery map
- cloud progress and multi-device sync
- advanced challenge modes

### Team / Organization

Potential future paid value:

- organization workspace
- assigned paths
- onboarding curriculum
- team progress dashboard
- private company-policy Missions
- configurable Branch / PR / Release rules
- assessment reports
- internal scenario packs
- LMS / HR integration potential

## 5. Do Not Hardcode Pricing Into Content

Mission content should use neutral capability metadata.

Example:

```json
{
  "track": "recovery",
  "difficulty": 5,
  "accessGroup": "advanced-practice",
  "assessmentEligible": true
}
```

The game engine consumes the Mission regardless of future pricing.

Future access policy maps entitlement to `accessGroup`.

```text
Mission Content
     |
     +--- accessGroup
     |
     v
Entitlement Policy
     |
     +--- Internal Test: allow all
     +--- Future Core: allow selected groups
     +--- Future Individual: allow expanded groups
     +--- Future Team: allow organization groups
```

## 6. Payment Provider Independence

If commercial billing is introduced later, payment must remain outside the game engine.

```text
User / Organization
        |
        v
Billing Adapter
        |
        v
Entitlement Service
        |
        v
Access Policy
        |
        v
Game / Content
```

This permits future options such as:

- one-time purchase
- subscription
- lifetime individual license
- school / classroom license
- organization seat license
- manual enterprise agreement

without changing Mission implementation.

## 7. Pricing Model Should Follow Product Usage

Do not decide subscription vs one-time purchase now.

Evidence required later:

- Do users return weekly after curriculum completion?
- Does Practice Arena create recurring use?
- Are new scenario packs consumed continuously?
- Is cloud progress valued?
- Are assessments repeated?
- Do teams need ongoing analytics and assignments?

Possible interpretation:

```text
Mostly one-time curriculum consumption
 -> one-time / lifetime model likely stronger

Continuous practice + new scenario packs
 -> subscription may be reasonable

Organization management / analytics
 -> recurring team pricing likely reasonable
```

## 8. Future Conversion Moments

If paid packaging is introduced, show it only after meaningful value.

Reasonable moments:

- Foundations completed
- learner explicitly selects an advanced scenario pack
- learner requests cloud sync
- learner starts a formal assessment
- Team admin opens organization functions

Avoid:

- paywall before first Mission
- account requirement before product evaluation
- paywall after only trivial commands
- repeated modal interruptions during a Mission
- blocking essential safety knowledge

## 9. Internal Test Metrics

Before monetization decisions, collect product-quality evidence first.

### Activation

- first Mission start rate
- first Mission completion rate
- time to first successful state transition
- first-session Track depth

### Learning

- retries by mastery tag
- hint depth
- unsafe-command rate
- ability to solve a similar Mission later
- Recovery safety decisions

### Engagement

- session duration
- Missions per session
- return rate
- voluntary Practice Arena use
- advanced Track entry rate

### Product Value

- where users voluntarily stop
- which Tracks users request next
- whether experienced users find enough depth
- whether users would recommend the game internally

Commercial metrics come after these learning/product metrics.

## 10. Decision Gate for Future Monetization

Do not activate paid restrictions until all are true:

1. Core learning experience is validated
2. Advanced content has meaningful depth
3. Internal users voluntarily return
4. Product has a clear value boundary beyond basic Git knowledge
5. Access architecture is stable
6. Pricing hypothesis is supported by observed behavior or direct research

Until then:

> Design commercially, operate openly, learn aggressively.
