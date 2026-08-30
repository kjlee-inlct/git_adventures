# Content Guideline

## 1. Learning first

Mission purpose is skill acquisition, not demonstrating Git cleverness.

- explain repository state before obscure syntax
- introduce one major concept at a time
- use short feedback loops in early missions
- prefer safe workflows over shortest commands

## 2. Scenario over command trivia

Bad lesson:

```text
Type git stash.
```

Preferred lesson:

```text
You have unfinished feature work.
A production hotfix must start from clean main.
Preserve the unfinished work without committing it.
```

The learner should decide that `stash` is useful from context.

## 3. State-based validation

Whenever possible, validate target repository state rather than one exact command string.

Example valid alternatives may differ by Git version or user preference.

## 4. Difficulty progression

Increase difficulty by adding realistic constraints:

- multiple changed files
- mixed staged / unstaged state
- multiple branches
- shared history
- remote divergence
- conflicts
- incomplete information

Do not rely primarily on obscure flags as difficulty.

## 5. Free content quality

Free content must be production-quality and educationally complete for foundational Git use. Paid content may be deeper, longer, more realistic, assessed, or organization-specific.

## 6. Advanced learner support

Avoid the common tutorial ceiling where all content ends after basic commands.

Every major beginner concept should eventually connect to advanced scenarios:

```text
status -> diagnosing complex state
commit -> history quality / bisect
branch -> collaboration / release
revert -> incident recovery
log -> history archaeology
```

## 7. i18n

Korean and English are first-class languages.

- keep Git commands and standard Git terms in original English form
- translate explanations naturally rather than word-for-word
- do not embed translated copy inside engine logic

## 8. Feedback

Feedback should answer:

1. What happened to repository state?
2. Why was the command appropriate or unsafe?
3. What should the learner notice next time?

## 9. Destructive commands

Commands such as these require explicit safe context:

```text
git reset --hard
git clean -fd
git push --force
```

Teach state inspection and recovery paths before destructive operations.

## 10. Product UX lessons from reference projects and community feedback

- let users try meaningful lessons before asking for login
- avoid early hard paywalls
- provide enough advanced content for intermediate users
- make progress visible
- preserve local progress
- prioritize correctness of simulation because broken input behavior destroys trust
- keep content contribution simpler than engine modification

## 11. Content testing

Future CI should include:

- schema validation
- unique mission ID validation
- translation completeness
- accepted solution validation
- target state validation
- regression scenarios
- link / metadata validation
