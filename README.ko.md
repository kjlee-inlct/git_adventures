# Git Adventures

[English](README.md)

Git Adventures는 다음 원칙을 중심으로 설계하는 Scenario 기반 Git 학습 Game입니다.

> Git Command 목록을 외우는 대신 Repository State를 직접 변화시키며 Git을 학습.

현재 Browser Prototype은 **44개 Mission / 6개 Track**으로 구성됩니다.

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

현재는 Backend 없이 다음 전체 Cycle을 실행할 수 있습니다.

```text
Facilitator Preset
      |
Local Session Recorder
      |
Anonymous Session JSON
      |
Local Report Aggregator
      |
Group / Mission Review
```

### Facilitator Console

Game Header의 **Facilitator** 버튼 또는 다음 주소를 사용합니다.

`http://localhost:8000/facilitator.html`

모든 Tester에게 44개 Mission을 동일하게 수행시키지 않고, Group별 핵심 가설에 맞는 짧은 Preset을 제공합니다.

```text
Beginner      약 25분   Core Mental Model
Basic         약 30분   Workflow / Recovery
Experienced   약 35분   History / Release / Assessment
```

각 Preset에는 다음이 포함됩니다.

- 선택 Mission 번호
- 핵심 Test Hypothesis
- 관찰 항목
- Stop / Redesign Signal
- Before / During / After Checklist
- Mission 바로가기

Facilitator Console에서 Mission을 열면 해당 Test Group이 Session Recorder에 자동으로 미리 선택됩니다.

상세: [First Internal Test Cycle Runbook](docs/first-internal-test-cycle.md)

### Session Recorder

Local-only Recorder는 Mission 시간, 상대 시간 Command Trace, Hint / Inspection / Detour / Unsafe 횟수, Guided Score, Assessment 4축 Score, 최종 Repository State 요약을 저장합니다.

이름, 이메일, Employee ID, Account ID는 요청하지 않습니다.

상세: [Local Usability Session Report](docs/usability-session-report.md), [Internal Test Plan](docs/internal-test-plan.md)

### Report Aggregator

Game Header의 **Reports** 버튼 또는 다음 주소를 사용합니다.

`http://localhost:8000/reports.html`

여러 Session JSON을 Beginner / Basic / Experienced 그룹별로 비교할 수 있습니다.

주요 지표:

- Completion Rate
- Average / Median / P75 Time to First Command
- Mission Duration
- Hint / Inspection / Unsafe / Detour / Wrong Rate
- Assessment Total / Pass Rate
- Judgment / Safety / Evidence / Efficiency
- Mission Hotspot

지원하지 않는 Schema, Tester Group, `privacy.piiCollected != false` Report는 집계에서 제외합니다.

상세: [Local Usability Report Aggregation](docs/report-aggregation.md)

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
```

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
- [Local Usability Session Report](docs/usability-session-report.md)
- [Local Usability Report Aggregation](docs/report-aggregation.md)
- [First Internal Test Cycle Runbook](docs/first-internal-test-cycle.md)
- [Internal Test Plan](docs/internal-test-plan.md)
- [Release Governance and Incident Closure](docs/release-governance.md)
- [Command Coverage](docs/command-coverage.md)
- [Product Packaging and Future Monetization](docs/product-monetization.md)
- [Service Architecture](docs/service-architecture.md)
- [Product Roadmap](docs/product-roadmap.md)

## Figma

https://www.figma.com/design/4u02b7msrNYjPDQbITbnGi

## 다음 단계

1. Group별 3~5개 첫 사내 Session 실행
2. Reports와 Interview Note 함께 검토
3. 반복되는 Mission / UI 문제를 먼저 수정
4. Global Rubric Weight는 충분한 반복 Evidence가 생긴 뒤 조정
5. 그 결과를 바탕으로 다음 Assessment / Reporting 기능 우선순위 결정

## License

MIT. [LICENSE](LICENSE) 참고.
