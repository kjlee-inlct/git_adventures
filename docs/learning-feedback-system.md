# Learning Feedback System

## 1. Purpose

Git Adventures feedback exists to improve Git judgment, not to create decorative game statistics.

The first system uses four signals:

```text
Mastery
Safety
Hint Depth
Detours
```

Typing speed is intentionally excluded from the core learning score.

## 2. Mastery

Mastery estimates how independently the learner solved the Repository problem.

Initial value per Mission:

```text
100
```

Current prototype deductions:

```text
Reveal Hint       -10
Unnecessary Detour -7
Wrong Attempt      -4
Dangerous Command  -5
```

The exact values are tuning parameters, not permanent product rules.

### What Mastery must not reward

- memorizing one exact answer string
- rushing without reading Repository State
- avoiding useful inspection commands
- fewer commands at the expense of safety

`git status`, `git diff`, `git diff --staged`, and `git log --oneline` do not reduce Mastery.

Inspection is considered part of expert Git behavior.

## 3. Safety

Safety measures whether the learner protects work and shared History.

Initial value:

```text
100
```

Prototype deductions:

```text
git add . detour    -5
dangerous command  -25
```

Initially blocked dangerous commands:

```bash
git reset --hard
git clean -fd
git push --force
```

The simulator explains the risk instead of executing destructive behavior.

Later Recovery Labs may intentionally teach these commands inside isolated scenarios, but only when the learning objective includes understanding their consequences.

## 4. Progressive Hint Model

Every Mission supports three Hint depths.

### Hint 1 - Direction

Reveal the Repository area or concept to consider.

Example:

```text
Think about which Repository area must change.
```

### Hint 2 - Concept

Reveal the authored Mission hint.

Example:

```text
Prefer a file-specific add when the commit scope is narrow.
```

### Hint 3 - Command Shape

Reveal the approximate command form without turning the first interaction into answer copying.

Example:

```text
git add README.md
```

Each Hint reduces Mastery, but never blocks Mission completion.

## 5. Consequence Learning

Valid Git commands should not always produce a generic failure.

Example:

```text
Mission objective:
Stage README.md only.

Learner:
git add .

State becomes:
Staged
  README.md
  debug.log
```

The learner now owns a Recovery problem.

They can solve it with:

```bash
git restore --staged debug.log
```

If the final Repository State matches the intended target, the Mission can complete with reduced Mastery/Safety.

This teaches:

```text
Action
 -> Consequence
 -> Inspection
 -> Recovery
 -> Understanding
```

rather than:

```text
Wrong answer
 -> Retry exact string
```

## 6. Debrief

Mission completion reveals a short Debrief containing:

- Why the concept matters
- Mastery
- Safety
- Hint count
- Detour count

The Debrief should eventually also compare:

```text
Initial State
Final State
Important Decision
Alternative Safe Solution
Real-world Failure Mode
```

## 7. Track Map

Track Map communicates learner progression by Skill domain rather than command count.

Current Vertical Slice:

```text
Foundations
Daily Workflow
Recovery Lab
```

Future Tracks:

```text
Collaboration
History Management
Release & Incident
Mastery / Assessment
```

The Track Map must answer:

```text
What skill am I building?
What can I already do?
What kind of problem comes next?
```

It should not become a generic dashboard.

## 8. Internal Test Questions

For Hint System:

- Do learners use Hint 1 as useful direction rather than noise?
- Does Hint 3 reveal too much?
- Do learners continue experimenting after using a Hint?

For Scores:

- Can users explain why Safety changed?
- Does Mastery feel fair?
- Do scores distract from Repository State?

For Consequence Learning:

- Do learners notice that `git add .` changed the state?
- Can they recover without facilitator help?
- Does the Recovery create stronger memory than a generic error?

For Debrief:

- Does the learner read it voluntarily?
- Can the learner explain the Why afterward?

## 9. Tuning Rule

Do not optimize the score formula before observing real learners.

Priority:

```text
Learning clarity
 > Safety behavior
 > Scenario credibility
 > Feedback usefulness
 > Score precision
```
