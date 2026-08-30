# Experience Design

## 1. Design Objective

Git Adventures should feel like a deliberate developer game, not a generic AI-generated dashboard.

The interface must communicate:

- focus
- craft
- technical credibility
- playful tension
- visible cause and effect

Avoid visual noise that competes with repository reasoning.

## 2. Visual Identity Direction

Recommended direction:

```text
Developer Tool
   +
Puzzle Game
   +
Repository Map
   +
Editorial Typography
```

Not:

```text
Generic SaaS Dashboard
+ Gradient Hero
+ Random Glass Cards
+ Excessive Icons
+ Decorative AI Illustration
```

## 3. Primary Screen Anatomy

Desktop target:

```text
+---------------------------------------------------------------+
| Git Adventures | Track / Mission | XP / Progress | Language   |
+-----------------------+---------------------------------------+
| Mission Brief         | Repository Board                      |
|                       |                                       |
| Situation             | Working Tree -> Staging -> History    |
| Objective             |                  |                    |
| Constraints           |                  +-> Branch / Remote  |
|                       |                                       |
+-----------------------+---------------------------------------+
| Terminal                                                      |
| $                                                             |
+---------------------------------------------------------------+
| Feedback / Why / Next                                         |
+---------------------------------------------------------------+
```

The Repository Board is the visual center of the product.

## 4. Repository Board

The board should make Git's invisible state visible.

Core objects:

- File
- Working Tree
- Staging Area
- Commit
- Branch Pointer
- HEAD
- Remote Branch
- Conflict Marker
- Tag

Movement should correspond directly to Git semantics.

Example:

```text
README.md
   |
   | git add README.md
   v
[ Staging Area ]
   |
   | git commit
   v
[ c4f2a1 Add guide ] <- main <- HEAD
```

## 5. Motion Principles

Animation only when it teaches state transition.

Good:

- File moves from Working Tree to Staging
- Branch Pointer advances after Commit
- Remote Pointer catches up after Push
- Conflict state visibly forks / blocks flow

Avoid:

- floating cards
- constant pulsing
- decorative particles
- long page transitions
- motion unrelated to Git state

Support `prefers-reduced-motion`.

## 6. Typography

Use two intentional roles:

### Interface / Explanation

Readable sans-serif with strong Korean and Latin coverage.

### Terminal / Git State

Monospace font.

Do not make the entire product monospace. That often creates novelty at the cost of reading comfort.

Hierarchy must come from size, weight, spacing, and layout rather than excessive color.

## 7. Color

Color is semantic first.

Suggested roles:

- Neutral: normal state
- Accent: selected / active path
- Positive: safe completion
- Warning: recoverable risk
- Critical: destructive / shared-history danger
- Remote: visually distinct from Local

Do not encode meaning by color alone.

## 8. Terminal Experience

The terminal should feel real enough to transfer learning, but not reproduce every shell behavior.

Requirements:

- clear prompt
- command history
- keyboard-first operation
- Up / Down history navigation later
- Tab completion later where educationally useful
- pasted commands supported
- command explanation available after execution

The terminal should not reveal the exact expected answer before the learner has attempted the Mission.

## 9. Feedback Placement

Feedback appears close to the changed state.

Preferred order:

```text
1. State visually changes
2. Short result message
3. Why explanation
4. Optional deeper detail
```

Avoid modal dialogs for routine success and failure.

## 10. Mission Brief Writing

Keep the Brief short enough to scan.

Structure:

```text
Situation
Objective
Constraint
```

Example:

```text
Situation
README.md and debug.log changed.

Objective
Prepare a Commit containing only README.md.

Constraint
Do not discard either File.
```

## 11. Difficulty Presentation

Do not label beginner users as "Level 1 / Noob".

Prefer skill progression:

- Foundations
- Workflow
- Recovery
- Collaboration
- History
- Release
- Mastery

Difficulty may be shown as subtle Mission metadata.

## 12. Gamification UI

XP and badges should support progress but remain secondary to the repository board.

Priority:

```text
Mission Objective
> Repository State
> Terminal
> Feedback
> Progress
> Cosmetic Reward
```

Avoid casino-style reward animation.

## 13. Human Design Review Checklist

Before accepting a screen:

- Does the visual hierarchy make the next action obvious?
- Does every card/panel have a real information role?
- Can two visually similar components be merged?
- Is any gradient, glow, icon, or animation purely decorative?
- Does the screen still look coherent in grayscale?
- Can a developer understand repository state within 3 seconds?
- Does Korean text wrap naturally?
- Does the UI still work at 125-150% browser zoom?
- Is keyboard navigation complete?

## 14. Figma Usage

Figma should be used before major UI implementation for:

1. Repository Board visual grammar
2. Mission screen hierarchy
3. State transition variants
4. Desktop / narrow desktop responsive behavior
5. Failure / conflict / recovery states
6. Component inventory

Do not design dozens of screens before validating the core Mission screen.

Recommended first Figma set:

- Mission - clean state
- Mission - staged state
- Mission - successful Commit
- Mission - recoverable mistake
- Mission - destructive warning
- Track Map

## 15. Design Acceptance Goal

The desired reaction is:

> "This looks like a purpose-built Git learning game."

Not:

> "This looks like an AI-generated admin dashboard with a terminal added."
