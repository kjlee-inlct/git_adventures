# Git Adventures

[English](README.md)

Git Adventures는 다음 원칙을 중심으로 설계하는 Scenario 기반 Git 학습 Game입니다.

> Git Command 목록을 외우는 대신 Repository State를 직접 변화시키며 Git을 학습.

현재 Browser Prototype은 **44개 Mission / 6개 Track**입니다.

```text
Foundations          4
Daily Workflow       8
Recovery Lab         6
Collaboration        9
Release & Incident  13
Assessment           4
```

1~40번은 Guided Learning / Practice, 41~44번은 Assessment입니다.

## Assessment

Assessment는 마지막 Command Shape Hint를 차단하고 다음 4축을 사용합니다.

```text
Judgment    40
Safety      30
Evidence    20
Efficiency  10
```

PASS는 Total Score와 Safety Floor를 모두 만족해야 합니다. 필요한 Inspection은 Efficiency Penalty가 아닙니다.

상세: [Assessment Track](docs/assessment-track.md), [Assessment Scoring Rubric](docs/assessment-scoring.md)

## 사내 Usability Test Workflow

현재 Backend 없이 첫 Calibration Cycle 전체를 실행할 수 있습니다.

```text
Facilitator Preset
      |
Session Sheet + Local Recorder
      |
Anonymous Session JSON
      |
Post-session Interview
      |
Local Report Aggregator
      |
Evidence Review
      |
Explicit Product Decision
```

### Facilitator Console

Game Header의 **Facilitator** 버튼 또는 다음 주소를 사용합니다.

`http://localhost:8000/facilitator.html`

Group별 Preset:

```text
Beginner      약 25분   Core Mental Model
Basic         약 30분   Workflow / Recovery
Experienced   약 35분   History / Release / Assessment
```

각 Preset에는 Mission 선택, 핵심 Hypothesis, 관찰 항목, Stop / Redesign Signal, Mission 바로가기가 포함됩니다.

Facilitator Console에서 전체 운영 문서도 바로 열 수 있습니다.

### Session Recorder

Local-only Recorder는 Mission 시간, 상대 시간 Command Trace, Hint / Inspection / Detour / Unsafe 횟수, Guided Score, Assessment Score, 최종 Repository State 요약을 저장합니다.

이름, 이메일, Employee ID, Account ID는 요청하지 않습니다.

### Post-session Interview

Interview는 **Session JSON Export 이후** 진행합니다. 그래야 Interview 설명이 기록된 실제 행동에 영향을 주지 않습니다.

Interview Template은 다음을 확인합니다.

- Mental Model
- 판단에 사용한 Evidence
- Scenario Ambiguity
- Rejected Safe Alternative
- Technical Credibility
- Assessment Fairness

### Report Aggregator

Game Header의 **Reports** 버튼 또는 다음 주소를 사용합니다.

`http://localhost:8000/reports.html`

여러 Session JSON을 Beginner / Basic / Experienced 그룹별로 비교합니다.

주요 지표:

- Completion Rate
- Average / Median / P75 Time to First Command
- Mission Duration
- Hint / Inspection / Unsafe / Detour / Wrong Rate
- Assessment Total / Pass Rate
- Judgment / Safety / Evidence / Efficiency
- Mission Hotspot

지원하지 않는 Schema, Tester Group, `privacy.piiCollected != false` Report는 집계에서 제외합니다.

### Review Decision Framework

Metric 하나가 바로 Product Backlog가 되지는 않습니다.

중요 Pattern은 다음 Evidence를 결합합니다.

```text
Session JSON
   +
Aggregator Pattern
   +
Session Sheet Observation
   +
Interview Reasoning
   +
필요 시 Technical Review
```

그 뒤 다음 중 하나를 명시적으로 선택합니다.

```text
FIX NOW
CHANGE MISSION ONLY
CHANGE UI / LEARNING MODEL
ADD ALTERNATE SOLUTION
CHANGE RUBRIC
OBSERVE MORE
KEEP AS-IS
ESCALATE TECHNICAL REVIEW
```

Global Rubric 변경은 여러 Assessment Mission과 여러 Tester에서 반복되는 Evidence가 필요합니다. 하나의 애매한 Mission은 먼저 Mission-local 문제로 수정합니다.

## 사내 Test 운영 문서 세트

| Artifact | Purpose |
| --- | --- |
| [Internal Test Plan](docs/internal-test-plan.md) | 왜 / 무엇을 검증할지 |
| [First Internal Test Cycle Runbook](docs/first-internal-test-cycle.md) | Cycle 실행 방법 |
| [Internal Test Session Sheet](docs/test-session-sheet.md) | 세션 중 사실 기반 관찰 |
| [Interview Note Template](docs/interview-note-template.md) | Tester가 왜 그렇게 판단했는지 |
| [Local Usability Session Report](docs/usability-session-report.md) | 익명 Machine-recorded 행동 |
| [Local Usability Report Aggregation](docs/report-aggregation.md) | 여러 Session에서 무엇이 반복되는지 |
| [Result Review Decision Framework](docs/result-review-decision-framework.md) | 무엇을 바꾸고 유지할지 |

## Git / GitHub / Team Policy 구분

```text
Git
  = Repository Fact + History Operation

GitHub / PR Platform
  = Review Conversation + CI + Approval Surface

Team Policy
  = Integration 전 필요한 Evidence / Approval 기준
```

Approval 자체를 가짜 Git Command로 만들지 않습니다.

## Validation Gate

```text
Guided Curriculum (40)
  Syntax -> Content -> Golden -> Repository Invariants
  -> Release Governance -> Command Coverage

Assessment Curriculum (4)
  Schema -> Command Leak 방지 -> Decision -> Final State
  -> Scoring Contract -> Unsafe / Evidence Test

Internal Usability Data
  Session Report Contract -> PII Non-Collection
  -> Report Aggregation Contract -> Group / Mission Metric
  -> Test Preset Contract
  -> Operations Documentation Contract
```

Documentation Contract는 필수 운영 문서의 존재 / Link, Decision Outcome 집합, 그리고 Session / Interview Template에 직접 신원 입력 Field가 다시 생기지 않는지 검증합니다.

## Local 실행

```bash
python -m http.server 8000
```

Game: `http://localhost:8000/`

Facilitator: `http://localhost:8000/facilitator.html`

Reports: `http://localhost:8000/reports.html`

## 주요 Product 문서

- [Product Vision](docs/product-vision.md)
- [Game Design](docs/game-design.md)
- [Curriculum Roadmap](docs/curriculum-roadmap.md)
- [Assessment Track](docs/assessment-track.md)
- [Assessment Scoring Rubric](docs/assessment-scoring.md)
- [Internal Test Plan](docs/internal-test-plan.md)
- [First Internal Test Cycle Runbook](docs/first-internal-test-cycle.md)
- [Internal Test Session Sheet](docs/test-session-sheet.md)
- [Interview Note Template](docs/interview-note-template.md)
- [Local Usability Session Report](docs/usability-session-report.md)
- [Local Usability Report Aggregation](docs/report-aggregation.md)
- [Result Review Decision Framework](docs/result-review-decision-framework.md)
- [Release Governance and Incident Closure](docs/release-governance.md)
- [Command Coverage](docs/command-coverage.md)
- [Product Packaging and Future Monetization](docs/product-monetization.md)
- [Service Architecture](docs/service-architecture.md)
- [Product Roadmap](docs/product-roadmap.md)

## Figma

https://www.figma.com/design/4u02b7msrNYjPDQbITbnGi

## 다음 단계

Group별 **3~5개 첫 사내 Session**을 실행합니다. 각 usable Session마다 Anonymous Session JSON, Session Sheet, Interview Note를 함께 보관합니다. 이후 반복 Pattern을 Aggregation하고 Review Record를 만든 뒤, Evidence가 반복되는 Mission / UI / Technical 문제부터 수정합니다.

Global Rubric Weight는 충분한 반복 Evidence가 생긴 뒤 조정합니다.

## License

MIT. [LICENSE](LICENSE) 참고.
