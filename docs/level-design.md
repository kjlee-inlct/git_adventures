# Level Design

## 1. Design Goal

Build a curriculum that remains useful from first Git contact through real production recovery.

The unit of learning is not a command.

```text
Command != Level
Decision in Context = Mission
```

A Mission presents a repository state and a development problem. The learner decides what to inspect, what to change, and what risk is acceptable.

## 2. Content Hierarchy

```text
Track
  |
  +--- Chapter
        |
        +--- Mission
              |
              +--- Scenario
              +--- Repository State
              +--- Objective
              +--- Constraints
              +--- Accepted Paths
              +--- Unsafe Paths
              +--- Feedback
              +--- Hint Ladder
              +--- Mastery Tags
```

This hierarchy must be represented as content data so adding Missions does not require UI code changes.

## 3. Track Structure

### Track 0 - Orientation

Purpose:

- establish Git mental model
- make repository state visually understandable
- teach inspection-first behavior

Target: 5-8 Missions.

### Track 1 - Foundations

Purpose:

- inspect changes
- stage intentionally
- Commit logically
- create and switch Branches
- understand Local vs Remote
- complete first Feature Branch workflow

Target: 25-35 Missions.

### Track 2 - Daily Workflow

Purpose:

- handle realistic multi-file work
- split unrelated changes
- use amend / stash safely
- manage Remote tracking
- update Branches
- prepare PR-ready history

Target: 30-45 Missions.

### Track 3 - Recovery Lab

Purpose:

- remove fear of Git mistakes
- distinguish Local vs shared History
- recover before reaching for destructive commands

Target: 35-50 Missions.

### Track 4 - Collaboration

Purpose:

- work with PRs, conflicts, Branch divergence, shared History, review changes, and merge policy

Target: 30-45 Missions.

### Track 5 - History Management

Purpose:

- cherry-pick
- reflog
- bisect
- interactive rebase concepts
- Tags
- multi-Remote
- History investigation

Target: 35-50 Missions.

### Track 6 - Release & Incident

Purpose:

- apply Git under release pressure
- bad release recovery
- Hotfix
- Backport
- Tag validation
- rollback / forward-fix decision

Target: 25-40 Missions.

### Track 7 - Mastery / Assessment

Purpose:

- validate reasoning without step-by-step hints
- combine multiple mastery tags in one scenario

Scenario-based rather than fixed command sequence.

See [Curriculum Roadmap](curriculum-roadmap.md) for detailed chapter planning.

## 4. Difficulty Dimensions

Difficulty grows through context, not by artificially locking useful commands.

### Repository Complexity

- changed File count
- staged + unstaged combinations
- untracked Files
- Branch count
- Remote state

### History Risk

- Working Tree only
- Local Commit
- unpublished Branch
- shared Remote History
- protected / Release Branch

### Decision Ambiguity

- one obvious safe action
- multiple safe alternatives
- safe but suboptimal choice
- policy-dependent choice
- missing information requiring inspection

### Recovery Cost

- trivial reversible state
- Commit rewrite
- Branch divergence
- Conflict
- shared History
- production Release

## 5. Difficulty Scale

### Difficulty 1 - Guided State

- one concept
- one File
- explicit objective
- rich hints

### Difficulty 2 - Selective Action

- multiple Files
- one irrelevant change
- learner chooses target

### Difficulty 3 - Workflow

- multiple commands required
- Branch and Remote concepts combined

### Difficulty 4 - Recovery

- incorrect state already exists
- learner must preserve work before repair

### Difficulty 5 - Shared History

- Remote collaboration
- unsafe History Rewrite possible

### Difficulty 6 - Conflict / Ambiguity

- multiple possible strategies
- trade-offs explained after completion

### Difficulty 7 - Incident

- incomplete information
- Release pressure
- safety prioritized

### Difficulty 8 - Mastery

- minimal guidance
- optional efficiency scoring
- combined concepts

## 6. Mission Types

### Guided

First exposure to a concept.

### Standard

Objective and state only.

### Choice

Select the safest strategy among alternatives.

### Recovery

Repair a broken repository state.

### Git Detective

Infer what happened from History and state evidence.

### Workflow Review

Review another developer's proposed command sequence.

### Incident

Production / Release scenario with incomplete context.

### Challenge

Optional speed, command-count, or no-hint target.

### Assessment

No hints and scored mastery evaluation.

## 7. Failure States

A wrong command should usually create a consequence rather than terminate the Mission.

Example:

```text
Objective:
Commit only README.md

State:
README.md modified
debug.log untracked
```

Learner runs:

```bash
git add .
```

Instead of:

```text
FAIL
```

Transition to:

```text
Both Files are now staged.
The Commit scope is incorrect.
Repair the Staging Area without losing README.md changes.
```

This converts mistakes into Recovery practice.

## 8. Hint Design

Four-step ladder:

1. Concept direction
2. Relevant repository area
3. Command family
4. Exact command

Using hints reduces optional mastery score but never blocks progression.

## 9. Scoring

```text
Completion
+ Safety
+ State Understanding
+ History Quality
+ Hint Independence
+ Optional Efficiency
= Mission Score
```

Weight changes by Track.

Beginner:

```text
Safety > Understanding > Completion > Efficiency
```

Challenge:

```text
Safety + Correctness required
Efficiency becomes differentiator
```

## 10. Mastery Tags

Example taxonomy:

```text
state.status
state.diff
stage.selective
stage.unstage
commit.create
commit.scope
commit.message
branch.create
branch.switch
remote.fetch
remote.pull
remote.push
history.shared
history.rewrite
recovery.restore
recovery.reflog
conflict.resolve
release.tag
release.hotfix
```

Mission completion updates mastery per tag.

Future Practice Arena can select weak tags automatically.

## 11. Access Metadata

During internal testing, all implemented content is accessible.

Missions may still include neutral future packaging metadata:

```json
{
  "accessGroup": "advanced-practice"
}
```

The internal policy maps all groups to accessible.

This avoids redesign later if product packaging changes.

## 12. Anti-Patterns

Avoid:

- one command per Level
- large first Level with excessive repetition
- mentioning unavailable tools long before unlock
- withholding basic commands to manufacture difficulty
- accepting only one exact command when alternatives are valid
- generic "wrong" feedback
- difficulty based only on obscure syntax
- beginner curriculum with no intermediate continuation

## 13. Content Scale

Long-term planned volume:

```text
185-273 Core Missions
+ scenario variations
+ weekly / incident packs
+ assessments
```

The architecture should assume hundreds of Missions from the beginning.
