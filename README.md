# Git Adventures

[한국어](README.ko.md)

Git Adventures is a mission-based Git learning service inspired by the idea that tools are learned faster through repeated, contextual actions than through command memorization.

The learner receives a repository state, a realistic development problem, and a target state. They type Git commands and immediately see how the Working Tree, Staging Area, Branch, and Commit History change.

## Product direction

Git Adventures is designed as a service, not a one-off tutorial.

```text
Free Core
   |
   +--- Git mental model
   +--- status / diff / add / commit
   +--- branch / switch / log / push
   +--- safe recovery basics
   |
   v
Pro Learning
   |
   +--- Merge / Rebase / Conflict
   +--- Cherry-pick / Reflog / Bisect
   +--- realistic incident scenarios
   +--- guided assessments
   |
   v
Team / Business
   |
   +--- Team progress
   +--- Assigned learning paths
   +--- Internal Git policy missions
   +--- Assessment / certification
   +--- Admin analytics
```

The current repository contains the browser-only MVP for the Free Core experience and the product architecture for future account, payment, progress, and team capabilities.

## Current MVP

- Korean / English language switch
- Interactive terminal-style command input
- Repository state visualization
- Working Tree / Staging Area / Commit History visualization
- Mission progression and XP
- Local progress persistence
- 7 Free Core missions
- No build step or backend required

Run locally:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

Opening `index.html` directly also works in most modern browsers.

## Learning model

The core loop is intentionally short:

```text
Scenario
   |
   v
Inspect repository state
   |
   v
Choose Git command
   |
   v
Observe state transition
   |
   v
Receive explanation
   |
   v
Repeat in harder context
```

The service should reward correct reasoning, not blind command repetition.

## Content tracks

| Track | Target | Commercial tier |
|---|---|---|
| Foundations | First-time Git users | Free |
| Daily Workflow | Individual developers | Free / Pro |
| Recovery Lab | Developers handling mistakes | Pro |
| Collaboration | PR, Merge, Rebase, Conflict | Pro |
| Advanced Git | Bisect, Reflog, Cherry-pick, Tag | Pro |
| Release & Hotfix | Production workflows | Pro |
| Team Policy | Company-specific Git rules | Business |
| Assessment | Skills validation | Pro / Business |

See [Level Design](docs/level-design.md) for the full progression model.

## Service architecture

The MVP is static, but the domain model separates content from future platform services.

```text
Browser Game
   |
   +--- Mission Engine
   +--- Git State Simulator
   +--- i18n Content
   +--- Local Progress

Future Platform API
   |
   +--- Authentication
   +--- Cloud Progress
   +--- Entitlements
   +--- Payments
   +--- Team / Organization
   +--- Analytics
   +--- Content Delivery
```

See [Service Architecture](docs/service-architecture.md).

## Monetization principles

The Free tier must remain useful enough to teach the fundamental Git workflow. Payment should unlock depth, realistic practice, assessment, and organizational value rather than artificially blocking basic Git knowledge.

Potential tiers:

- Free: Foundations and selected Daily Workflow missions
- Pro: full individual curriculum, advanced scenarios, assessments, cloud progress
- Team: assignments, team dashboards, private learning paths, policy-specific missions

See [Product and Monetization](docs/product-monetization.md).

## Project structure

```text
.
|--- index.html
|--- styles.css
|--- app.js
|--- README.md
|--- README.ko.md
|--- docs/
     |--- level-design.md
     |--- product-monetization.md
     |--- service-architecture.md
     |--- content-guideline.md
```

## Design principles

- Learn by repository state transition
- Explain Why before adding command complexity
- Use realistic engineering situations
- Keep early missions short
- Introduce destructive commands only inside safe recovery scenarios
- Separate Git behavior from company policy
- Support Korean and English from the content model
- Keep Free Core genuinely useful
- Design content as data so new missions do not require UI rewrites

## Status

Current phase: Free Core MVP and scalable product foundation.

Next implementation priorities:

1. Move missions from JavaScript constants to versioned content files
2. Add mission prerequisites and Track map
3. Add scenario scoring and command alternatives
4. Add account / cloud progress backend
5. Add entitlement layer before payment integration
6. Add Pro content and Team domain model
7. Add hosted deployment and analytics

## License

MIT. See [LICENSE](LICENSE).
