# Visual Design Direction

## 1. Goal

Create a learning product that feels intentionally designed for Git rather than a generic AI-generated dashboard.

The visual system should make Repository State, History, Risk, and Command Decisions easier to understand.

## 2. Core visual principle

```text
Repository State > Decoration
Learning Signal   > Gamification Signal
Clarity           > Visual novelty
```

The UI should look like a purpose-built engineering learning tool, not a collection of cards with gradients.

## 3. Reference design file

Figma:

https://www.figma.com/design/4u02b7msrNYjPDQbITbnGi

Defined screens:

- `01 Track Map`
- `02 Core Mission`
- `03 Recovery Incident`

These screens establish the product's visual language. They are reference designs, not immutable pixel specifications.

## 4. Layout language

### Track Map

Purpose:

- communicate learning paths
- show readiness and progress
- avoid linear Level 1 -> Level 2 feeling

Use large skill-path blocks with explicit learning goals.

### Core Mission

Primary reading order:

```text
Mission Brief
    |
    v
Repository Board
    |
    v
Terminal Action
    |
    v
State Transition
    |
    v
Explanation
```

Repository Board is the visual center.

### Recovery Incident

Recovery missions use a different interaction mode:

```text
Incident
   |
   v
Evidence
   |
   v
Decision
   |
   v
Safe Recovery
   |
   v
Debrief
```

The learner must inspect before acting.

## 5. Typography

Primary UI:

```text
Inter
```

Repository / Command / SHA / Branch / Status:

```text
IBM Plex Mono
```

Rules:

- Mono type indicates Git state or executable text
- Sans type indicates explanation or product navigation
- Do not use monospace everywhere
- Avoid oversized marketing typography inside the learning workspace

## 6. Color semantics

Color is functional.

```text
Acid Green  = active learning state / safe primary signal
Cyan        = neutral Git reference / remote / branch information
Amber       = caution / uncertainty / hint cost
Red         = destructive risk / unsafe decision
Gray        = inactive / historical / unavailable
```

Do not use many unrelated accent colors for decoration.

## 7. Surface treatment

Avoid:

- glassmorphism
- strong background gradients
- excessive shadows
- pill-shaped UI everywhere
- generic SaaS card layouts
- decorative charts unrelated to learning

Prefer:

- flat dark surfaces
- thin structural borders
- 8-14 px corner radii
- high information density without clutter
- whitespace created by grouping, not huge empty Hero sections

## 8. Repository Board

The Repository Board is a product-specific visual primitive.

Core columns:

```text
Working Tree
    |
    v
Staging Area
    |
    v
Commit History
```

Optional connected states:

- Remote
- Branch pointers
- HEAD
- Tags
- Conflict markers
- Stash

The Board should visually explain what a command changed.

## 9. Gamification placement

XP, Streak, Combo, Badges, and Mastery should never dominate the screen.

They exist to support retention, not become the product's main information architecture.

Preferred hierarchy:

```text
Mission Goal
Repository State
Command Decision
Feedback
Learning Explanation
Progress / XP
```

## 10. Error and recovery UX

A wrong command should not only show `Incorrect`.

Feedback layers:

1. What changed or would change
2. Why that is unsafe or unsuitable
3. What Git concept was misunderstood
4. Whether the learner should inspect more evidence

Destructive commands require stronger visual separation but should not rely on red color alone.

## 11. Bilingual design

Korean and English must fit the same interaction model.

Rules:

- allow Korean text expansion
- avoid fixed narrow labels for long explanations
- keep Git commands and canonical Git terms unchanged
- translation must not alter mission mechanics

## 12. Accessibility

Required from early prototype stage:

- keyboard-first operation
- visible focus state
- sufficient contrast
- color-independent status cues
- reduced-motion compatibility
- screen-reader-friendly labels for state changes

## 13. Product identity

Desired impression:

```text
Developer tool
+ Training simulator
+ Strategy game
```

Not:

```text
Children's coding game
Generic LMS
Generic SaaS dashboard
Terminal skin only
```

## 14. Design review questions

Before accepting a screen:

- Is the Repository State easier to understand than before?
- Can the learner identify the next decision without reading everything?
- Does the screen teach a Git mental model?
- Is any visual element present only because it looks impressive?
- Is XP or decoration competing with the learning objective?
- Does the same screen work in Korean and English?
