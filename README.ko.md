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

현재 Prototype에는 **40개 Mission / 5개 Track**이 있습니다.

```text
Foundations          4
Daily Workflow       8
Recovery Lab         6
Collaboration        9
Release & Incident  13
```

Release & Incident는 Selective Backport, Dependency Ordering, Hotfix Branch, Cherry-pick Conflict / Abort, Annotated Tag, Bad Release Revert, Patch Recovery, Review Evidence, Approval Gate, Tag Publication, main 재반영, Incident Closure Verification까지 포함합니다.

장기 목표는 약 **185~273개 Core Mission** + Scenario Variation + Assessment 규모입니다.

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

Approval 자체를 가짜 Git Command로 만들지 않습니다. Git은 Review Evidence를 제공하고, Approval은 Scenario Policy Gate로 표현합니다.

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

```text
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
```

**40개 Mission 전체**에 Golden Test를 적용합니다. Governance Invariant는 Approval 없이 Hotfix Merge가 진행되지 않는지, Local Tag가 자동 Publish되지 않는지, 명시적 Tag Publication이 이전 Release Identity를 보존하는지, Incident Recovery가 main까지 수렴하는지 검증합니다.

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
- [Command Coverage](docs/command-coverage.md)
- [Internal Test Plan](docs/internal-test-plan.md)
- [Product Packaging and Future Monetization](docs/product-monetization.md)
- [Service Architecture](docs/service-architecture.md)
- [Product Roadmap](docs/product-roadmap.md)

## Figma

https://www.figma.com/design/4u02b7msrNYjPDQbITbnGi

## 다음 구현 깊이

1. Forward-fix vs Revert / Rollback 판단
2. 여러 Supported Release Line 관리
3. PR Review / Merge Strategy Assessment
4. Remote Branch 정리 / Release Cleanup Policy
5. Release Verification Checklist + Scored Assessment
6. 대규모 Mission 확장 전 사내 Usability Test

## License

MIT. [LICENSE](LICENSE) 참고.
