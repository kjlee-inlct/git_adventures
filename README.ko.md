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

현재 Assessment는 다음 판단을 평가합니다.

- Published Regression에서 Shared History를 삭제하지 않고 Auditable Revert 선택
- Support Policy와 영향 범위를 바탕으로 Fix를 적용할 Release Line 선택
- Review / Approval / History Policy를 바탕으로 Release Integration Strategy 선택
- Story를 믿는 대신 Repository State를 직접 확인한 뒤 Incident Closure 판단

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

### Assessment Scoring

Assessment Debrief는 다음 4개 축을 사용합니다.

```text
Judgment    40
Safety      30
Evidence    20
Efficiency  10
```

PASS는 총점과 Safety Floor를 모두 만족해야 합니다.

```text
total >= passScore
AND
safety >= criticalSafetyFloor
```

필요한 `status`, `log`, `diff` Inspection은 Efficiency Penalty가 아닙니다. 필요한 Evidence를 생략하면 Evidence가 낮아지고, 불필요한 Mutation이나 위험한 시도만 Efficiency / Safety를 낮춥니다.

상세: [Assessment Track](docs/assessment-track.md), [Assessment Scoring Rubric](docs/assessment-scoring.md)

## 사내 Usability Session Recorder

Browser에 선택적으로 사용할 수 있는 **Local-only 사내 Test Recorder**를 추가했습니다.

```text
Test Group 선택
      |
Session 시작
      |
평소처럼 Mission 진행
      |
Session 종료
      |
익명 JSON 내보내기
```

Test Group:

- Beginner
- Basic
- Experienced

Report에는 Mission 소요 시간, 상대 시간 기반 Command Trace, Hint / Inspection / Detour / Unsafe 횟수, Guided Score, Assessment 4축 Score, 최종 Repository 요약이 저장됩니다.

이 Recorder는 이름, 이메일, Employee ID, Account ID를 요청하지 않습니다. 기존 Progress와 별도의 Local Storage Key를 사용하며, Versioned JSON을 Export하여 그룹별 행동 차이를 비교할 수 있습니다.

이 데이터는 Product / Rubric Calibration을 위한 것이며 직원 순위나 인증 지표로 사용하지 않습니다.

상세: [Local Usability Session Report](docs/usability-session-report.md), [Internal Test Plan](docs/internal-test-plan.md)

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

## Release / Incident Lifecycle

```text
Verified Fix
   |
Dependency Check
   |
Selective Backport / Hotfix Branch
   |
Scope Review Evidence
   |
Approval Gate
   |
Release Integration
   |
Verification
   |
Local Tag
   |
Tag Publication
   |
Production
   |
   +--- Healthy
   |
   +--- Regression -> Revert -> Verify -> New Patch Tag
   |
Final Recovery를 main에 재반영
   |
Incident Closure Verification
```

## Validation Gate

이제 Curriculum, Assessment Scoring, Local Test Report Contract를 각각 검증합니다.

```text
Guided Curriculum (40)
  JavaScript Syntax
       |
  Content Contract
       |
  Golden Mission Tests
       |
  Alternate / Repository Invariants
       |
  Release Governance Invariants
       |
  Simulator Command Coverage

Assessment Curriculum (4)
  Assessment Schema
       |
  Minimal Hint / Command Leak 방지
       |
  Expected Decision Command
       |
  Final State Verification
       |
  Scoring Rubric Contract
       |
  Unsafe / Evidence-loss Scoring Test

Internal Usability Data
  Session Report Schema
       |
  Tester Group Contract
       |
  PII Non-Collection Contract
       |
  Command Classification
       |
  Guided / Assessment Score 보존
       |
  JSON Summary Validation
```

## Local 실행

```bash
python -m http.server 8000
```

`http://localhost:8000` 접속.

## 주요 Product 문서

- [Product Vision](docs/product-vision.md)
- [Game Design](docs/game-design.md)
- [Curriculum Roadmap](docs/curriculum-roadmap.md)
- [Conflict Lifecycle](docs/conflict-lifecycle.md)
- [Release and Backport Learning Model](docs/release-and-backport.md)
- [Release Incident Lifecycle](docs/release-incident-lifecycle.md)
- [Release Governance and Incident Closure](docs/release-governance.md)
- [Assessment Track](docs/assessment-track.md)
- [Assessment Scoring Rubric](docs/assessment-scoring.md)
- [Local Usability Session Report](docs/usability-session-report.md)
- [Command Coverage](docs/command-coverage.md)
- [Internal Test Plan](docs/internal-test-plan.md)
- [Product Packaging and Future Monetization](docs/product-monetization.md)
- [Service Architecture](docs/service-architecture.md)
- [Product Roadmap](docs/product-roadmap.md)

## Figma

https://www.figma.com/design/4u02b7msrNYjPDQbITbnGi

## 다음 구현 깊이

1. Beginner / Basic / Experienced 첫 사내 Test Session 실행
2. First Command 시간, Hint, Unsafe, Inspection, Assessment Pattern 비교
3. 실제 행동 데이터를 바탕으로 Rubric Weight / Safety Floor Calibration
4. Forward-fix vs Revert vs Rollback Assessment 확장
5. 동시에 지원하는 여러 Release Line 판단 추가
6. 여러 선택지가 유효해 보이는 PR Review / Merge Strategy Assessment 개선

## License

MIT. [LICENSE](LICENSE) 참고.
