# Game Design

## 1. Core Loop

```text
Mission Brief
   |
   v
Inspect Repository
   |
   v
Predict Result
   |
   v
Enter Git Command
   |
   v
State Transition
   |
   v
Feedback
   |
   +--- Success -> Explain Why -> Next Scenario
   |
   +--- Safe but Suboptimal -> Explain Trade-off -> Continue
   |
   +--- Unsafe -> Show Consequence -> Recovery Opportunity
   |
   +--- Invalid -> Command Feedback -> Retry
```

The player should spend most of the session reading state and making decisions, not reading long lesson text.

## 2. Mission Anatomy

Every Mission contains:

- Story Context
- Repository State
- Objective
- Constraints
- Available Knowledge
- Accepted Solution Paths
- Unsafe Paths
- Feedback Rules
- Hint Ladder
- Success Explanation
- Mastery Tags
- Difficulty Metadata
- Future Entitlement Metadata

Commands are not hardcoded to one exact answer when multiple safe solutions exist.

## 3. Outcome Classes

### Optimal

Safe and appropriate for the context.

Example:

```text
git add README.md
```

when only README belongs in the Commit.

### Valid Alternative

Correct but not the recommended workflow.

Feedback should acknowledge success and explain the trade-off.

### Recoverable Mistake

A realistic mistake that creates a new learning opportunity.

Example:

```text
git add .
```

when debug output is also present.

Instead of an immediate fail screen, the game can transition into:

```text
"You staged one file too many. Repair the Staging Area."
```

### Unsafe

A command that risks unintended loss or shared-history damage.

The game should visualize the consequence before allowing continuation.

## 4. Failure Philosophy

Failure should create information.

Avoid:

```text
Wrong command. Try again.
```

Prefer:

```text
`git commit` cannot create the intended Commit yet.
README.md is still in the Working Tree and the Staging Area is empty.

Inspect the state and decide what must move first.
```

Advanced scenarios may reduce explanation and require diagnosis.

## 5. Hint Ladder

Hints must preserve problem solving.

### Hint 1 - Direction

Concept only.

```text
The next Commit should contain only one File.
```

### Hint 2 - State

Point to the relevant state boundary.

```text
Move the intended File from Working Tree to Staging Area.
```

### Hint 3 - Command Family

```text
Use `git add` with a specific File path.
```

### Hint 4 - Answer

```text
git add README.md
```

Scoring may track Hint depth, but learning progression must never be blocked because the learner used hints.

## 6. Progression

Difficulty must grow through reasoning dimensions rather than arbitrary command restriction.

### Dimension A - State Size

- 1 changed File
- multiple changed Files
- staged + unstaged changes
- untracked Files
- multiple Branches

### Dimension B - History Risk

- Local uncommitted
- Local committed
- Remote unpublished
- Shared Remote
- Protected Branch / Release state

### Dimension C - Ambiguity

- one obvious action
- multiple valid actions
- valid but policy-dependent actions
- incomplete context requiring inspection

### Dimension D - Recovery Cost

- easy reversible action
- history rewrite
- conflict
- shared change
- production incident

## 7. Game Modes

### Story Path

Structured curriculum with progressive Missions.

### Recovery Lab

Broken repository states requiring repair.

### Incident Room

Time-sensitive production or release scenarios.

### Practice Arena

Short repeated drills for weak concepts.

### Git Detective

Read `log`, graph, blame-like evidence, and repository state to determine what happened.

### Workflow Review

Judge whether a proposed sequence is safe, readable, and policy-compliant.

### Challenge Mode

Optional efficiency scoring based on commands, time, or hints.

Challenge Mode must not define normal learning quality.

## 8. Reward System

Rewards should represent learning progress, not addiction mechanics.

Possible systems:

- XP
- Track completion
- Mastery badges
- Recovery streak
- No-Hint clear
- Safe History badge
- Git Detective cases solved
- Weekly scenario

Avoid punitive streak loss.

## 9. Scoring Model

```text
Mission Score =
    Completion
  + Safety
  + State Understanding
  + History Quality
  + Hint Independence
  + Optional Efficiency
```

Beginner Track weighting:

```text
Safety > Completion > Understanding > Efficiency
```

Advanced Challenge weighting can increase Efficiency.

## 10. Visual Feedback

The repository state must visibly change when a command succeeds.

Examples:

```text
Working Tree --git add--> Staging Area
Staging Area --git commit--> Commit Graph
Branch Pointer --commit--> New Commit
Local Branch --push--> Remote Tracking Branch
```

Animations should be short and meaningful, not decorative.

## 11. Session Design

Mission target duration:

- Intro: 20-60 seconds
- Standard: 1-3 minutes
- Recovery: 2-5 minutes
- Incident: 5-10 minutes
- Assessment: 10-20 minutes

A learner should be able to complete a meaningful session in 5 minutes.

## 12. Commercial-Grade Design Without Current Paywall

All implemented Missions remain available during the internal test phase.

However, every Mission may carry neutral metadata such as:

```json
{
  "accessGroup": "core",
  "track": "recovery",
  "difficulty": 4,
  "assessmentEligible": true
}
```

This allows future product packaging without rewriting content or the engine.

No Mission should be designed to be intentionally weak merely because it might later become free content.
