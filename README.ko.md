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
First Review Record
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

### Report Aggregator

Game Header의 **Reports** 버튼 또는 다음 주소를 사용합니다.

`http://localhost:8000/reports.html`

여러 Session JSON을 Beginner / Basic / Experienced 그룹별로 비교합니다.

### First Review Record

각 Group에서 **3~5개의 usable Session**이 모이면 다음 Evidence를 결합해 첫 Review Record를 만듭니다.

```text
Anonymous Session JSON
   +
Session Sheet
   +
Interview Note
   +
Aggregator Pattern
   +
필요 시 Technical Review
```

[First Review Record Workflow](docs/first-review-record-workflow.md)는 실제 첫 데이터 묶음을 어떻게 정리하고, 어떤 Pattern을 Candidate로 만들고, 어느 수준의 Evidence가 Mission-local / Global UI / Global Rubric 변경을 정당화하는지 설명합니다.

### Review Decision Framework

Review Record가 만들어진 뒤 [Result Review Decision Framework](docs/result-review-decision-framework.md)로 다음 중 하나를 명시적으로 선택합니다.

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

## Docker / 사내 배포

**현재 단계에서는 Docker Compose가 필요하지 않습니다.**

현재 Git Adventures는 Backend API나 Database 없이 동작하는 Static Browser App입니다.

권장 방식:

```text
개발 / 단일 PC
  python -m http.server 8000

소규모 사내 공유 Server
  Nginx / Caddy Static Hosting
  또는
  Static Web Container 1개
```

Nginx/Caddy Container 하나만 사용하는 경우 Compose가 필요하지 않습니다.

다음처럼 여러 Runtime Service가 실제로 필요해질 때 Compose 도입을 검토합니다.

```text
static-web
   +
report/progress API
   +
database/storage
```

또는 Reverse Proxy / TLS / Persistence / Environment Coordination을 한 Stack으로 관리할 실질적 필요가 생길 때 도입합니다.

상세: [Internal Deployment Options](docs/internal-deployment-options.md), [Service Architecture](docs/service-architecture.md)

## 사내 Test 운영 문서 세트

| Artifact | Purpose |
| --- | --- |
| [Internal Test Plan](docs/internal-test-plan.md) | 왜 / 무엇을 검증할지 |
| [First Internal Test Cycle Runbook](docs/first-internal-test-cycle.md) | Cycle 실행 방법 |
| [Internal Test Session Sheet](docs/test-session-sheet.md) | 세션 중 사실 기반 관찰 |
| [Interview Note Template](docs/interview-note-template.md) | Tester가 왜 그렇게 판단했는지 |
| [Local Usability Session Report](docs/usability-session-report.md) | 익명 Machine-recorded 행동 |
| [Local Usability Report Aggregation](docs/report-aggregation.md) | 여러 Session에서 무엇이 반복되는지 |
| [First Review Record Workflow](docs/first-review-record-workflow.md) | 실제 첫 Evidence Bundle을 Review Record로 만드는 방법 |
| [Result Review Decision Framework](docs/result-review-decision-framework.md) | 무엇을 바꾸고 유지할지 |
| [Internal Deployment Options](docs/internal-deployment-options.md) | 현재 Hosting 방식과 Compose 도입 조건 |

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
- [First Review Record Workflow](docs/first-review-record-workflow.md)
- [Result Review Decision Framework](docs/result-review-decision-framework.md)
- [Internal Deployment Options](docs/internal-deployment-options.md)
- [Release Governance and Incident Closure](docs/release-governance.md)
- [Command Coverage](docs/command-coverage.md)
- [Product Packaging and Future Monetization](docs/product-monetization.md)
- [Service Architecture](docs/service-architecture.md)
- [Product Roadmap](docs/product-roadmap.md)

## 다음 단계

Group별 **3~5개 첫 사내 Session**을 실행합니다. 각 usable Session마다 Anonymous Session JSON, Session Sheet, Interview Note를 함께 보관합니다. 이후 반복 Pattern을 Aggregation하고 [First Review Record Workflow](docs/first-review-record-workflow.md)에 따라 첫 Review Record를 만든 뒤 Evidence가 반복되는 Mission / UI / Technical 문제부터 수정합니다.

Global Rubric Weight는 충분한 반복 Evidence가 생긴 뒤 조정합니다.

## License

MIT. [LICENSE](LICENSE) 참고.
