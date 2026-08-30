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

장기 목표는 약 **185~273개 Core Mission** + Scenario Variation + Assessment 규모입니다.

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

즉 Assessment는 Command 암기 시험이 아닙니다. 최소 Hint는 Evidence / Policy 방향만 제시하고 정답 Command는 노출하지 않습니다.

### Assessment Scoring

Assessment Debrief는 다음 4개 축을 사용합니다.

```text
Judgment    40
Safety      30
Evidence    20
Efficiency  10
```

위 값은 Default Weight이며 Mission의 학습 목표에 따라 조정할 수 있습니다. 예를 들어 Incident Closure는 Verification 자체가 핵심 Skill이므로 Evidence Weight를 더 높게 설정합니다.

PASS 조건은 단순 총점 하나가 아닙니다.

```text
total >= passScore
AND
safety >= criticalSafetyFloor
```

따라서 Shared History를 위험하게 Rewrite한 뒤 나중에 정답 State에 도달해도 Safety Floor를 넘지 못하면 PASS하지 않습니다.

또한 필요한 `status`, `log`, `diff` 같은 Inspection은 Efficiency Penalty가 아닙니다. 필요한 Evidence를 생략하면 Evidence Score가 낮아지고, 불필요한 Mutation이나 위험한 시도만 Efficiency / Safety를 낮춥니다.

상세: [Assessment Track](docs/assessment-track.md), [Assessment Scoring Rubric](docs/assessment-scoring.md)

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

상세: [Release Governance and Incident Closure](docs/release-governance.md)

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

핵심 Rule:

- Dependency를 Fix보다 먼저 Backport.
- 긴급 변경도 Hotfix Branch로 격리.
- Approval 전에 정확한 Hotfix Scope Review.
- Merge 가능하다는 사실과 Release 승인 여부를 구분.
- Local Tag 생성과 Remote Tag Publication을 별도 State로 취급.
- Published Release Tag는 Immutable Release Identity로 유지.
- 필요 시 Explicit Revert로 Shared History Auditability 보존.
- Release에서 끝내지 않고 최종 Recovery Intent를 main에 재반영.
- 운영 Workflow는 Successful Command가 아니라 Verification으로 종료.

## Validation Gate

이제 Guided Curriculum과 Assessment를 분리하여 검증하고 Assessment Scoring Contract도 별도 검증합니다.

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
```

기존 40개 Regression Gate를 그대로 유지하면서 Assessment와 Scoring은 더 엄격한 평가 규칙을 독립적으로 발전시킬 수 있습니다.

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
- [Command Coverage](docs/command-coverage.md)
- [Internal Test Plan](docs/internal-test-plan.md)
- [Product Packaging and Future Monetization](docs/product-monetization.md)
- [Service Architecture](docs/service-architecture.md)
- [Product Roadmap](docs/product-roadmap.md)

## Figma

https://www.figma.com/design/4u02b7msrNYjPDQbITbnGi

## 다음 구현 깊이

1. 더 많은 Evidence를 사용하는 Forward-fix vs Revert vs Rollback Assessment
2. 동시에 지원하는 여러 Release Line 판단
3. 여러 선택지가 유효해 보이는 PR Review / Merge Strategy Assessment
4. Remote Branch 정리 / Release Cleanup Policy
5. 사내 Usability Session을 통한 Rubric Weight / Safety Floor Calibration
6. 대규모 Mission 확장 전 사내 Usability Test

## License

MIT. [LICENSE](LICENSE) 참고.
