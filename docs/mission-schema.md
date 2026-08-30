# Mission Content Schema

## 1. Purpose

Mission content should be authored, translated, validated, tested, and packaged without modifying the game engine.

Target scale:

```text
Hundreds of Missions
+ Multiple Locales
+ Scenario Variants
+ Assessments
+ Future Organization Packs
```

## 2. Design Rule

```text
Mission = Data
Git Behavior = Engine
Translation = Locale Data
Access = Policy
```

These responsibilities must remain separate.

## 3. Mission Definition

Recommended conceptual structure:

```json
{
  "id": "workflow.commit-scope.004",
  "version": 1,
  "track": "workflow",
  "chapter": "commit-scope",
  "missionType": "standard",
  "difficulty": 3,
  "accessGroup": "core",
  "masteryTags": [
    "state.status",
    "stage.selective",
    "commit.scope"
  ],
  "initialState": {},
  "goalState": {},
  "constraints": [],
  "acceptedPaths": [],
  "unsafePaths": [],
  "hints": [],
  "scoring": {},
  "copyKey": "workflow.commit-scope.004"
}
```

## 4. Locale Definition

Mechanics should not be duplicated per language.

```json
{
  "workflow.commit-scope.004": {
    "title": "Prepare a focused commit",
    "situation": "README.md and debug.log changed.",
    "objective": "Commit only README.md.",
    "constraints": ["Do not discard either file."],
    "success": "The commit contains only the intended change."
  }
}
```

Korean and English files use the same keys.

## 5. Repository State Model

Minimum state domains:

```text
RepositoryState
 |
 +--- files
 +--- staging
 +--- commits
 +--- branches
 +--- head
 +--- remotes
 +--- tags
 +--- conflicts
 +--- operationState
```

### File State

Potential values:

```text
untracked
modified
staged-added
staged-modified
deleted
staged-deleted
conflicted
clean
```

### Operation State

Examples:

```text
normal
merge-in-progress
rebase-in-progress
bisect
cherry-pick-in-progress
revert-in-progress
```

## 6. Accepted Paths

Avoid exact-command-only validation.

A path can define:

- command pattern
- required precondition
- resulting state
- score modifier
- feedback key

Example concept:

```json
{
  "commands": ["git add README.md", "git commit -m <message>"],
  "classification": "optimal"
}
```

Another safe sequence may be accepted with different feedback.

## 7. Unsafe Paths

Unsafe commands deserve explicit scenario behavior.

Example:

```json
{
  "match": "git reset --hard",
  "classification": "unsafe",
  "consequence": "discard-working-tree",
  "feedbackKey": "recovery.shared.unsafe-hard-reset"
}
```

The engine may simulate the consequence when educationally useful.

## 8. State-Based Completion

Preferred validation:

```text
Current Repository State
        |
        v
Goal Predicate
        |
        +--- Match -> Complete
        +--- Partial -> Continue
        +--- Recoverable Divergence -> Recovery Path
        +--- Unsafe Divergence -> Consequence / Explain
```

Do not require the learner to use the author's exact command sequence when the final state and safety properties are correct.

## 9. Constraints

Constraints express what must be preserved.

Examples:

```text
Do not lose uncommitted changes
Do not modify shared history
Commit only README.md
Keep release/v1.2 unchanged
Do not create a merge commit
```

Constraints should be machine-validatable where possible.

## 10. Mastery Tags

Mission content declares concepts independently of Track.

Example:

```json
[
  "state.diff",
  "stage.selective",
  "history.shared"
]
```

This enables:

- mastery map
- weak-skill practice
- adaptive Mission selection
- assessments
- analytics

## 11. Hint Schema

```json
[
  {"level": 1, "kind": "concept", "copyKey": "...hint1"},
  {"level": 2, "kind": "state", "copyKey": "...hint2"},
  {"level": 3, "kind": "command-family", "copyKey": "...hint3"},
  {"level": 4, "kind": "answer", "copyKey": "...hint4"}
]
```

## 12. Scoring Schema

Potential dimensions:

```json
{
  "completion": 40,
  "safety": 30,
  "understanding": 15,
  "historyQuality": 10,
  "efficiency": 5
}
```

Weights vary by Mission type.

## 13. Access Metadata

Use neutral groups only.

```text
core
advanced-practice
assessment
organization
special-pack
```

Current internal policy:

```text
allow all
```

Future packaging maps entitlement to groups externally.

## 14. Content Validation

Every Mission must pass automated validation before release.

### Contract Test

- required fields
- valid Track
- valid Mission type
- valid mastery tags
- Locale key exists

### Golden Test

Run canonical accepted path through the real simulation engine and confirm target state.

### Unsafe Path Test

Run unsafe command cases and confirm expected consequence / feedback.

### Regression Test

Preserve previously fixed Mission behaviors.

## 15. Authoring Rule

A content author should be able to add a Mission without changing:

- UI components
- command parser code
- progress engine
- access logic

If normal Mission creation requires engine changes, first evaluate whether the schema or engine abstraction is incomplete.
