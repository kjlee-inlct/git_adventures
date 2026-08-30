# Product Vision

## 1. Product Definition

Git Adventures is a scenario-driven Git learning game.

The product does not teach Git as a command catalog. It teaches the learner to read repository state, choose a safe action, predict the result, and recover from mistakes.

Core promise:

```text
See State -> Decide -> Execute -> Observe -> Explain -> Repeat
```

Primary learning outcome:

> A learner can independently operate Git in a real development workflow and can recognize when a command may damage shared history.

## 2. Target Users

### Beginner

- Git installation completed but mental model absent
- uses commands by copying from documentation or coworkers
- fears losing work
- does not understand Working Tree / Staging / Local / Remote boundaries

### Daily User

- can commit / pull / push
- often uses `git add .`
- has difficulty with branch divergence, amend, stash, conflict, revert, reset
- wants confidence rather than more command memorization

### Experienced User

- knows most daily Git commands
- wants faster diagnosis, recovery, history cleanup, release and incident practice
- benefits from difficult scenarios rather than tutorials

### Team / Training Owner

- wants consistent onboarding
- wants developers to follow company Git rules
- wants measurable training outcomes

## 3. Product Principles

Priority order:

1. Learning clarity
2. Safe Git habits
3. Enjoyable interaction
4. Realistic workflow transfer
5. Progression depth
6. Accessibility
7. Extensibility
8. Future commercial readiness

Commercial readiness must never distort the early learning experience.

## 4. What Makes Git Adventures Different

### Repository State is the Game Board

The visual board represents:

- Working Tree
- Staging Area
- Local Commit Graph
- Branch Pointer
- Remote Tracking Branch
- Conflict State

Commands change this board.

### Decisions, Not Syntax

A Mission asks a practical question:

```text
"README and debug.log changed.
Only README belongs in this commit.
What should you do?"
```

The learner must choose a workflow, not merely recall `git add`.

### Safety as a Skill

Advanced mastery includes knowing when *not* to run a command.

Examples:

- `reset --hard`
- `clean -fd`
- `push --force`
- Rebase on shared history

### Beginner to Expert Continuity

The product must not stop after `commit` and `push`.

Progression continues through:

```text
Foundations
  -> Daily Workflow
  -> Recovery
  -> Collaboration
  -> History Management
  -> Release / Incident
  -> Mastery Challenges
```

## 5. Product Experience

### First 60 Seconds

No account requirement.

The user should:

1. See a small repository state
2. Receive one clear objective
3. Type one real Git command
4. See visible state movement
5. Receive a short explanation
6. Start the next Mission

No long introduction before the first successful action.

### First Session

Target: 10-15 minutes.

Outcome:

- understand `git status`
- understand Working Tree vs Staging
- stage one intended file
- create first meaningful commit
- see commit graph update

### First Track Completion

Outcome:

- complete a Feature Branch workflow
- push a branch
- understand Local vs Remote
- understand why Commit Scope matters
- know where to inspect state before taking action

## 6. Design Risks

### Command Unlock Frustration

Do not mention or encourage a useful command long before the learner can use it.

If the UI introduces `git diff`, the learner should be able to use it immediately or within the same Mission sequence.

### Fake Difficulty

Do not create difficulty by withholding basic tools.

Difficulty should increase through:

- more repository state
- ambiguous choices
- multiple branches
- shared history
- conflicts
- incomplete information
- trade-offs

### Beginner-only Ceiling

Intermediate and advanced Tracks are part of the initial product plan, even if implemented later.

### Login Friction

Initial internal test requires no login.

Future account creation should appear only when a clear user benefit exists, such as cloud progress, team assignment, or cross-device continuity.

### Premature Paywall

Initial internal test exposes all implemented content.

Future paid boundaries are metadata and product policy, not hardcoded assumptions in Mission logic.

## 7. Success Definition

A successful user does not merely remember commands.

They can answer:

- What state is the repository in?
- What will this command change?
- Is this change Local or shared?
- Can this operation lose work?
- Is History Rewrite acceptable here?
- How can I recover if this goes wrong?

That reasoning ability is the primary product metric.
