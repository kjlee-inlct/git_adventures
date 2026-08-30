# Product Roadmap and Phase Gates

## 1. Roadmap Principle

Do not maximize feature count before validating the learning loop.

Each phase must prove a specific product assumption before the next phase expands scope.

## 2. Phase 0 - Product Definition

Goal:

- Product Vision agreed
- Core Game Loop agreed
- Curriculum depth agreed
- visual direction agreed
- future commercial architecture understood

Deliverables:

- Product Vision
- Game Design
- Curriculum Roadmap
- Level Design
- Experience Design
- Mission Schema
- Internal Test Plan

Exit gate:

- no major contradiction between learning, UX, and architecture
- product can be explained in one sentence
- first 10 Missions can be designed without changing the product model

## 3. Phase 1 - Core Interaction Prototype

Goal:

Prove that repository state changes are understandable and satisfying.

Scope:

- Mission screen
- Repository Board
- Terminal input
- State transition animation
- Hint ladder
- success / mistake feedback
- Korean / English

Mission count:

```text
5-10 high-quality Missions
```

Do not expand curriculum yet.

Exit gate:

- internal users understand the Repository Board without facilitator explanation
- first command within 60 seconds for most testers
- recoverable mistakes are understandable
- no major UI pattern feels generic or decorative

## 4. Phase 2 - Foundations Alpha

Goal:

Prove measurable beginner learning.

Scope:

- Orientation
- Foundations
- Local progress
- Mission content files
- content validation

Mission target:

```text
20-30 Missions
```

Exit gate:

- beginner can explain Working Tree vs Staging
- beginner can complete a Feature Branch mini-project
- similar-scenario retention improves
- no repeated command-unlock frustration

## 5. Phase 3 - Workflow Vertical Slice

Goal:

Prove value for users who already know basic Git.

Scope:

- Daily Workflow slice
- Recovery Lab slice
- Git Detective prototype
- improved Commit Graph
- Remote state

Mission target:

```text
40-60 total Missions
```

Exit gate:

- basic Git users encounter non-trivial learning
- users voluntarily continue into Recovery content
- experienced reviewers judge scenarios technically credible

## 6. Phase 4 - Internal Beta

Goal:

Prove repeat usage and curriculum direction.

Scope:

- Foundations complete
- Daily Workflow meaningful depth
- Recovery meaningful depth
- Track Map
- Mastery tags
- Practice Arena prototype
- optional internal analytics

Mission target:

```text
70-100 total Missions
```

Exit gate:

- meaningful 1 / 3 / 7-day return behavior
- weak concepts can be identified
- users request specific next Tracks
- product value is clear beyond first-time onboarding

## 7. Phase 5 - Collaboration and History Alpha

Goal:

Expand toward experienced developer value.

Scope:

- Collaboration
- Conflict
- Merge / Rebase
- History Management
- Reflog / Cherry-pick / Bisect

Mission target:

```text
120-170 total Missions
```

Exit gate:

- experienced developers find useful challenge
- multiple valid Git strategies are handled correctly
- Shared History safety model is trusted

## 8. Phase 6 - Release / Incident and Assessment

Goal:

Create high-value scenario depth.

Scope:

- Release Day
- Hotfix
- Backport
- Bad Release
- Production Incident
- Mastery Assessment

Mission target:

```text
185+ Missions
```

Exit gate:

- advanced scenario packs have clear standalone value
- assessment is technically credible
- internal team onboarding use case is demonstrated

## 9. Phase 7 - External Product Readiness

Only after internal validation.

Potential scope:

- external deployment
- account / cloud progress if needed
- privacy / security review
- accessibility audit
- monitoring
- support channel
- public documentation
- content contribution process

Commercial packaging may be tested here or later.

## 10. Monetization Decision Gate

Do not activate paid restrictions merely because the architecture supports them.

Required evidence:

- users complete Core content
- users voluntarily enter advanced content
- advanced content creates clear value
- return behavior exists or one-time value is clearly demonstrated
- likely pricing model matches usage pattern

## 11. Feature Prioritization Rule

Score candidate features using:

```text
Learning Impact
+ User Value
+ Validation Need
+ Reuse Across Tracks
- Complexity
- Maintenance Cost
= Priority
```

High-priority early features:

- Repository Board clarity
- content-driven Mission engine
- state-based validation
- high-quality feedback
- bilingual content model

Low-priority early features:

- cosmetic shop
- complex avatars
- social feed
- payment integration
- organization admin dashboard
- elaborate achievement animation

## 12. Current Next Step

Current project position:

```text
Phase 0 -> Phase 1 transition
```

Immediate work:

1. Finish Product Definition review
2. Create Figma Core Mission Screen
3. Define Repository Board visual grammar
4. Convert current prototype Missions to Mission Schema
5. Select first 5-10 prototype Missions
6. Implement only enough engine behavior to test those Missions
7. Run internal sessions
