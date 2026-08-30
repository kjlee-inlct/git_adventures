# Git Adventures

[English](README.md)

Git Adventures는 다음 원칙을 중심으로 설계하는 Scenario 기반 Git 학습 Game입니다.

> Git Command 목록을 외우는 대신 Repository State를 직접 변화시키며 Git을 학습.

사용자는 실제 개발 상황과 유사한 Repository를 확인하고 Git Command를 직접 입력한 뒤 Working Tree, Staging Area, Commit History, Remote Tracking, Stash, Conflict, Release Tag, Tag Publication, 진행 중 Operation State 변화를 확인합니다.

## 현재 단계

**사내 Product 기획 및 MVP 검증 단계**.

- 사내 Server 배포
- 한국어 / English 지원
- Account / 결제 강제 없음
- 구현 Content 전체 공개 기반 Test
- 향후 다수 사용자 및 Commercial Packaging 확장 가능한 구조
- Content 수보다 Product / Game Design 품질 우선

## 현재 Playable Curriculum

Browser Prototype에는 현재 **44개 Mission / 6개 Track**이 있습니다.

```text
Foundations          4
Daily Workflow       8
Recovery Lab         6
Collaboration        9
Release & Incident  13
Assessment           4
```

1~40번은 Guided Learning / Practice이며, 41~44번은 이미 학습한 도구를 상황에 맞게 선택하는 첫 Assessment Track입니다.

## Assessment 설계

Assessment Mission은 `assessment: true`를 사용하며 일반 Mission의 마지막 **Command Shape Hint를 의도적으로 차단**합니다.

```text
Scenario Evidence
      |
Repository State
      |
Team / Release Policy
      |
Decision
      |
Git Action
      |
Outcome Verification
```

Assessment Debrief는 다음 4개 축을 사용합니다.

```text
Judgment    40
Safety      30
Evidence    20
Efficiency  10
```

PASS는 총점과 Safety Floor를 모두 만족해야 하며 필요한 Inspection은 Efficiency Penalty가 아닙니다.

상세: [Assessment Track](docs/assessment-track.md), [Assessment Scoring Rubric](docs/assessment-scoring.md)

## 사내 Usability Session Recorder

Browser에 선택적으로 사용할 수 있는 **Local-only 사내 Test Recorder**가 있습니다.

```text
Test Group 선택
      |
Session 시작
      |
Mission 진행
      |
Session 종료
      |
익명 JSON Export
```

Test Group: Beginner / Basic / Experienced.

Report에는 Mission 소요 시간, 상대 시간 기반 Command Trace, Hint / Inspection / Detour / Unsafe 횟수, Guided Score, Assessment 4축 Score, 최종 Repository 요약이 저장됩니다.

이 Recorder는 이름, 이메일, Employee ID, Account ID를 요청하지 않습니다.

상세: [Local Usability Session Report](docs/usability-session-report.md), [Internal Test Plan](docs/internal-test-plan.md)

## Local Report Aggregation

Game 상단의 **Reports** 버튼 또는 `http://localhost:8000/reports.html`로 이동합니다.

여러 Session JSON을 한 번에 불러오면 Backend 없이 Beginner / Basic / Experienced 그룹을 자동 비교합니다.

집계 항목:

- Completion Rate
- Average / Median / P75 Time to First Command
- Mission Duration
- Hint / Inspection / Unsafe / Detour / Wrong Rate
- Assessment Total / Pass Rate
- Judgment / Safety / Evidence / Efficiency Average / Median
- Mission 단위 Hotspot Ranking

지원하지 않는 Schema, 잘못된 Tester Group, `privacy.piiCollected != false` Report는 집계에서 제외합니다.

상세: [Local Usability Report Aggregation](docs/report-aggregation.md)

## Repository State Model

```text
Repository State
 |
 +--- Current Branch
 +--- Working Tree
 +--- Staging Area
 +--- Conflict Set
 +--- Operation State
 |      +--- rebase
 |      +--- merge
 |      +--- cherry-pick
 +--- Commit History
 +--- Local Release Tags
 +--- Published Release Tags
 +--- Review Gate
 +--- Remote / Tracking
 +--- Stash Stack
 +--- Guardrail State
```

## Git / GitHub / Team Policy 구분

```text
Git
  = Repository Fact + History Operation

GitHub / PR Platform
  = Review Conversation + CI + Approval Surface

Team Policy
  = Release Integration 전 필요한 Evidence / Approval 기준
```

Approval 자체를 가짜 Git Command로 만들지 않습니다. Git은 Review Evidence를 제공하고 Approval은 Scenario Policy Gate로 표현합니다.

## Validation Gate

```text
Guided Curriculum (40)
  Syntax -> Content -> Golden -> Repository Invariants
  -> Release Governance -> Command Coverage

Assessment Curriculum (4)
  Schema -> Command Leak 방지 -> Decision -> Final State
  -> Scoring Contract -> Unsafe / Evidence Test

Internal Usability Data
  Session Report Contract
  -> PII Non-Collection
  -> Report Aggregation Contract
  -> Group / Mission Metric Validation
```

## Local 실행

```bash
python -m http.server 8000
```

Game: `http://localhost:8000/`

Reports: `http://localhost:8000/reports.html`

## 주요 Product 문서

- [Product Vision](docs/product-vision.md)
- [Game Design](docs/game-design.md)
- [Curriculum Roadmap](docs/curriculum-roadmap.md)
- [Assessment Track](docs/assessment-track.md)
- [Assessment Scoring Rubric](docs/assessment-scoring.md)
- [Local Usability Session Report](docs/usability-session-report.md)
- [Local Usability Report Aggregation](docs/report-aggregation.md)
- [Internal Test Plan](docs/internal-test-plan.md)
- [Release Governance and Incident Closure](docs/release-governance.md)
- [Command Coverage](docs/command-coverage.md)
- [Product Packaging and Future Monetization](docs/product-monetization.md)
- [Service Architecture](docs/service-architecture.md)
- [Product Roadmap](docs/product-roadmap.md)

## Figma

https://www.figma.com/design/4u02b7msrNYjPDQbITbnGi

## 다음 구현 깊이

1. Beginner / Basic / Experienced 첫 사내 Test Session 실행
2. Export JSON을 `reports.html`에서 비교
3. 반복되는 Group / Mission Pattern을 확인한 뒤 Rubric Weight 조정
4. Forward-fix vs Revert vs Rollback Assessment 확장
5. 동시에 지원하는 여러 Release Line 판단 추가
6. PR Review / Merge Strategy Assessment 개선

## License

MIT. [LICENSE](LICENSE) 참고.
