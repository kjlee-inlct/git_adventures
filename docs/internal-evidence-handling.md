# Internal Test Evidence Handling

## Purpose

Define how Git Adventures internal test evidence is named, stored, reviewed, retained, and separated from source code.

The goal is reproducible product review without turning the repository into a store of employee/tester data.

## 1. Evidence Types

A usable session may produce:

- anonymous Session JSON
- Test Session Sheet
- Interview Note
- Aggregate JSON
- Review Record
- optional technical-review note

## 2. Repository Boundary

Do not commit raw internal session evidence to the public product repository by default.

The repository should contain:

- schemas
- templates
- test operations rules
- synthetic fixtures only

Actual session evidence should live in an internally approved storage location.

## 3. Naming

Use anonymous identifiers.

Recommended:

```text
cycle-01/
  sessions/
    Beginner/session-<uuid>.json
    Basic/session-<uuid>.json
    Experienced/session-<uuid>.json
  session-sheets/session-<uuid>.md
  interview-notes/session-<uuid>.md
  aggregate/aggregate-<timestamp>.json
  review-records/CYCLE01-RR-001.md
```

Do not use names, email addresses, employee numbers, or team-member usernames as filenames.

## 4. Join Keys

Use only:

- Cycle ID
- Session ID
- Tester Group
- Mission number / Mission ID
- Review ID

These are sufficient to connect machine and facilitator evidence.

## 5. Sensitive-data Rule

Do not intentionally collect:

- name
- email
- employee ID
- account ID
- phone number
- personal demographic profile

If a free-form interview note accidentally contains identifying data, remove or redact it before sharing the evidence bundle more broadly.

## 6. Access

Keep raw session evidence accessible only to people who need it for product/test review.

Aggregated reports are preferred for broader discussion.

## 7. Retention

For the first internal validation phase, retention should be defined by the team/company policy rather than embedded in the application.

At minimum:

- keep the evidence long enough to close linked Review Records,
- do not retain it indefinitely by default,
- delete superseded local copies when an approved canonical evidence location exists.

## 8. Versioning

Record the product/curriculum version in Session JSON.

When a Mission changes materially, do not mix pre-change and post-change evidence without marking the version boundary.

Recommended review notation:

```text
Mission 17
  before: curriculumVersion X
  after:  curriculumVersion Y
```

## 9. Synthetic Fixtures

CI tests may contain synthetic Session JSON fixtures.

Synthetic fixtures must not copy real participant free-text notes or real identity data.

## 10. Export / Sharing

Before sending evidence outside the immediate test group:

- prefer Aggregate JSON or summarized Review Records,
- remove accidental identity data,
- include test-cycle and curriculum version,
- preserve caveat / invalid-session labels.

## 11. Incident Handling

If unintended PII is found in Session JSON or templates:

1. stop using the affected artifact,
2. identify whether the issue is template, UI, or facilitator-process related,
3. remove the affected data from the active evidence set,
4. fix the source of collection,
5. create a `FIX NOW` Review Record if product behavior caused the collection.

## 12. Principle

```text
Collect only what is needed
        |
Store only where approved
        |
Aggregate before broad sharing
        |
Retain only as long as useful
```

Internal usability evidence exists to improve the product, not to build profiles of individual employees or testers.
