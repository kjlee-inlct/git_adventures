# Local Usability Report Aggregation

## Purpose

Aggregate manually exported anonymous Session JSON files without a backend so the first internal calibration cycle can compare Beginner / Basic / Experienced behavior.

Open:

```text
reports.html
```

from the same static server used by the game.

## Workflow

```text
Tester plays
   |
Session JSON export
   |
Collect JSON files
   |
reports.html
   |
Group comparison
   |
Mission hotspots
   |
Product / Rubric decision
```

## Accepted Input Contract

Only Session Report schema version 1 is accepted.

The Aggregator rejects a report when:

- `schemaVersion != 1`
- `testerGroup` is not Beginner / Basic / Experienced
- `privacy.piiCollected != false`
- `attempts` is not an array

Rejected files are counted but excluded from all metrics.

## Group Metrics

For each tester group the tool calculates:

- Sessions
- Attempts
- Completion Rate
- Average / Median / P75 Time to First Command
- Average / Median / P75 Mission Duration
- Commands per Attempt
- Hints per Attempt
- Inspections per Attempt
- Unsafe Attempts per Attempt
- Detours per Attempt
- Wrong Attempts per Attempt
- Sessions containing an Unsafe Attempt
- Assessment Average / Pass Rate
- Judgment / Safety / Evidence / Efficiency Average and Median

## Mission Hotspots

Mission-level aggregation includes:

- Attempts
- Completion Rate
- Average Duration
- Median Time to First Command
- Hints per Attempt
- Unsafe Attempts per Attempt
- Wrong Attempts per Attempt
- Assessment Average

The UI sorts hotspot rows primarily by Unsafe frequency, then low Completion, then Hint usage.

This ordering is for investigation priority, not severity certification.

## Calibration Rules

Do not change Rubric weights from one or two sessions.

Prefer evidence that repeats across:

1. multiple testers in the same Group,
2. multiple Groups,
3. the same Mission or concept,
4. command traces and qualitative observation.

Example:

```text
Beginner
  high Hint + long first-command time

Basic
  normal Hint + repeated unsafe Recovery choice

Experienced
  low Hint + same unsafe Recovery choice
```

This is more likely a Mission / Policy clarity problem than a beginner-only learning problem.

## Interpretation Examples

### High Time to First Command only in Beginner

Possible hypothesis:

- Repository Board or objective needs clearer initial affordance.

Do not immediately reveal a command.

### High Hint rate in all Groups

Possible hypothesis:

- Scenario evidence is incomplete or wording is ambiguous.

Review Mission design before reducing difficulty.

### High Unsafe rate in Basic users

Possible hypothesis:

- Existing Git habit conflicts with the intended Safety model.

This can be a valuable learning signal rather than a UI failure.

### Experienced users complete quickly but score low Evidence

Possible hypothesis:

- Assessment may over-require inspection that experienced developers can infer safely.

Review Evidence requirements using real trace and interview data.

## Statistical Restraint

The current Aggregator reports descriptive statistics only.

It does not claim:

- statistical significance,
- competency certification,
- employee ranking,
- causal learning improvement.

Use Median and P75 with Average because small internal samples can contain large timing outliers.

## Privacy

Aggregation is Group-level.

The tool does not request or add:

- name,
- email,
- employee identifier,
- account identifier,
- demographic profile.

Any report with `privacy.piiCollected != false` is rejected by design.

## Export

The Aggregator can export a versioned aggregate JSON containing:

```text
acceptedReports
rejectedReports
groups
missions
privacy
```

The aggregate file is suitable for manual comparison or later import into a spreadsheet / internal analysis tool.

## Next Stage

After the first internal cycle, decide from evidence whether to add:

- CSV aggregate export,
- cross-session trend views,
- Mission version comparison,
- optional internal upload endpoint,
- richer assessment calibration analysis.

Do not add central telemetry before there is a concrete operational need and privacy review.
