# Git Adventures

[English](README.md)

Git Adventures는 다음 원칙을 중심으로 설계하는 Scenario 기반 Git 학습 Game입니다.

> Git Command 목록을 외우는 대신 Repository State를 직접 변화시키며 Git을 학습.

사용자는 실제 개발 상황과 유사한 Repository를 확인하고 Git Command를 직접 입력한 뒤 Working Tree, Staging Area, Commit History, Remote Tracking, Stash, Conflict, 진행 중 Operation State 변화를 즉시 확인합니다.

## 현재 단계

**사내 Product 기획 및 MVP 검증 단계**.

- 사내 Server 배포
- 한국어 / English 지원
- Account / 결제 강제 없음
- 구현된 Content 전체 공개 기반 Test
- 향후 다수 사용자 및 Commercial Packaging 확장 가능한 구조
- Content 수보다 Product / Game Design 품질 우선

## 현재 Playable Curriculum

현재 Prototype에는 **23개 Mission**이 있으며 4개 Track으로 구성됩니다.

```text
Foundations (4)
  status -> diff -> selective staging -> atomic commit

Daily Workflow (7)
  Branch 격리 / Atomic Commit / fetch / pull / push / stash
  Non-fast-forward Push Reject -> Integration 판단 전 Fetch

Recovery Lab (6)
  안전한 Unstage / Shared History Revert / Stash 복원
  Stash Pop Conflict
  Rebase Abort
  Merge Abort

Collaboration (6)
  Ahead / Behind Divergence
  Policy 기반 Rebase / Merge
  Rebase Conflict -> Resolve -> Continue
  Merge Conflict -> Resolve -> Merge Commit
  제한된 Force-with-Lease Rewrite
```

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
 |      +--- null
 |      +--- rebase
 |      +--- merge
 +--- Commit History
 +--- Remote / Tracking
 |      +--- Tracking Branch
 |      +--- Known / Actual Remote HEAD
 |      +--- Ahead / Behind
 |      +--- Fetch / Reject State
 +--- Stash Stack
```

정확한 Command 문자열 맞히기보다 Inspection과 안전한 판단을 학습하도록 설계합니다.

## Conflict Lifecycle

Conflict를 Generic Fail 화면이 아니라 **진행 중인 Repository Operation State**로 표현합니다.

```text
Operation
   |
Conflict
   |
   +--- Inspect -> Resolve -> Stage -> Continue / Commit
   |
   +--- Abort -> Operation 이전 State 복원
```

Rebase와 Merge는 서로 다른 History 결과를 만들며, Abort 역시 정답이 될 수 있는 Safety Decision으로 취급합니다.

상세: [Conflict Lifecycle](docs/conflict-lifecycle.md)

## Force-with-Lease Policy

`git push --force-with-lease`는 일반 Push 대안으로 가르치지 않습니다.

다음 조건이 모두 명시된 Advanced Mission에서만 사용합니다.

- Private / Rewrite가 조율된 Branch
- Team이 Rewrite를 명시적으로 허용
- Push 직전 Fetch 수행
- Known Remote HEAD == Actual Remote HEAD

Lease가 일치하지 않으면 Rewrite는 실패해야 하며 예상하지 못한 Remote Work를 보존합니다.

## Learning Feedback

- 3단계 Progressive Hint: Direction -> Concept -> Command Shape
- Mastery: 독립적인 문제 해결 / 불필요한 Detour
- Safety: 작업 및 Shared History 보호 수준
- Mission Debrief: Why + Mastery + Safety + Hint / Detour
- Inspection Command는 Mastery Penalty 없음

## Validation Gate

모든 PR에서 다음 검증 수행:

```text
JavaScript Syntax
      |
Content Contract
      |
Golden Mission Tests
      |
Alternate / Invariant Tests
      |
Simulator Command Coverage
```

**23개 Mission 전체**에 Golden Test를 적용합니다. Invariant Test는 Rebase/Merge Abort의 정확한 State 복원, Conflict 해결 State Transition, Stash Conflict 시 Entry 보존, Remote Divergence, 예상하지 못한 Remote 변경 시 Force-with-Lease Reject를 검증합니다.

상세: [Simulator Command Coverage](docs/command-coverage.md)

## Local 실행

```bash
python -m http.server 8000
```

`http://localhost:8000` 접속.

## Product 기획 문서

- [Product Vision](docs/product-vision.md)
- [Game Design](docs/game-design.md)
- [Curriculum Roadmap](docs/curriculum-roadmap.md)
- [Level Design](docs/level-design.md)
- [Mission Schema](docs/mission-schema.md)
- [Experience Design](docs/experience-design.md)
- [Design Direction](docs/design-direction.md)
- [Learning Feedback System](docs/learning-feedback-system.md)
- [Vertical Slice](docs/vertical-slice.md)
- [Daily Workflow Expansion](docs/daily-workflow-expansion.md)
- [Collaboration and Divergence Expansion](docs/collaboration-expansion.md)
- [Conflict Lifecycle](docs/conflict-lifecycle.md)
- [Command Coverage](docs/command-coverage.md)
- [Internal Test Plan](docs/internal-test-plan.md)
- [Product Packaging and Future Monetization](docs/product-monetization.md)
- [Service Architecture](docs/service-architecture.md)
- [Product Roadmap](docs/product-roadmap.md)
- [References and Product Research](docs/references.md)

## Figma

Core Experience Design:

https://www.figma.com/design/4u02b7msrNYjPDQbITbnGi

현재 Design Screen:

- Track Map
- Core Mission
- Recovery Incident

## 다음 구현 깊이

1. Working Tree 변경 때문에 Branch Switch가 차단되는 Scenario
2. Multi-file Rebase / Merge Conflict
3. `rebase --skip` 및 Partially Resolved Abort
4. Release Branch 대상 Cherry-pick / Backport
5. PR Review / Merge Strategy 판단
6. Release / Hotfix Incident Track
7. 대규모 Mission 확장 전 사내 Usability Test

## License

MIT. [LICENSE](LICENSE) 참고.
