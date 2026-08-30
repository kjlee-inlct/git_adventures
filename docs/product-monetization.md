# Product and Monetization

## 1. Product principle

Monetization must not damage the learning loop.

Free users should reach a real outcome: understand Git state and complete a basic feature-branch workflow. Paid value should come from depth, realism, assessment, continuity, and organization features.

## 2. Reference feedback applied

Public feedback around Vim learning games repeatedly highlights several product risks:

- login before users can evaluate the product creates friction
- an early hard paywall feels worse than a generous free sample
- beginner-only content loses intermediate users
- users want more levels and harder scenarios
- game-like learning is attractive when the interaction itself feels satisfying

Git Adventures response:

- Guest-first onboarding
- no mandatory login for Free Core
- local progress before account creation
- account prompt at natural value moments: cloud sync, Pro unlock, Team assignment
- advanced curriculum designed from the beginning

## 3. Proposed tiers

### Free

Purpose: acquisition, trust, and genuine Git competency.

- Foundations track
- selected Daily Workflow missions
- selected Recovery missions
- local save
- Korean / English
- command reference
- basic XP / achievements

### Pro

Purpose: individual mastery and recurring value.

Potential monthly / annual subscription or lifetime option.

- all individual tracks
- Recovery Lab
- Collaboration Lab
- Advanced Git
- Release / Incident scenarios
- assessments
- detailed skill map
- cloud progress
- multi-device sync
- advanced achievements
- practice arena

### Team / Business

Purpose: measurable onboarding and policy compliance.

- organization workspace
- seat management
- assigned paths
- team dashboard
- completion analytics
- private company-policy missions
- custom branch / PR / release rules
- assessment reports
- export / LMS integration potential

## 4. Pricing architecture

Do not couple UI directly to a payment provider.

```text
User
 |
 v
Entitlement Service
 |
 +--- free
 +--- pro
 +--- team
 |
 v
Feature Gate

Payment Provider
 |
 v
Billing Adapter
 |
 v
Entitlement Update
```

This permits Stripe, Lemon Squeezy, Paddle, app-store billing, coupons, or manual enterprise licensing without rewriting game logic.

## 5. Conversion moments

Good conversion moments:

- learner completes Free Foundations
- learner tries first advanced recovery lab
- learner wants cloud sync
- learner starts an assessment
- team admin wants assignments / analytics

Avoid:

- login wall on first visit
- paywall after only a few trivial commands
- blocking basic recovery knowledge
- repeated modal interruptions during a mission

## 6. Retention loops

- daily 5-minute scenario
- streaks without punitive loss mechanics
- weekly incident challenge
- skill mastery map
- spaced repetition of weak concepts
- personalized recovery drills
- team assignments
- new scenario packs

## 7. Metrics

Acquisition:

- landing -> first mission start
- first mission completion

Activation:

- Foundations completion rate
- time to first successful commit workflow

Learning:

- retries per concept
- hint usage
- recovery-safety score
- retention assessment after 7 / 30 days

Commercial:

- Free -> Pro conversion after meaningful free completion
- Pro retention
- Team seat activation

Do not optimize conversion at the expense of learning completion.
