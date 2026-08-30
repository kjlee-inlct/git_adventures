# Git Adventures

[English](README.md)

Git Adventures는 다음 원칙을 중심으로 설계하는 Scenario 기반 Git 학습 Game입니다.

> Git Command 목록을 외우는 대신 Repository State를 직접 변화시키며 Git을 학습.

사용자는 실제 개발 상황과 유사한 Repository를 확인하고 Git Command를 직접 입력한 뒤 Working Tree, Staging Area, Commit History, Remote Tracking, Stash의 변화를 즉시 확인합니다.

## 현재 단계

**사내 Product 기획 및 MVP 검증 단계**.

- 사내 Server 배포
- 한국어 / English 지원
- Account / 결제 강제 없음
- 구현된 Content 전체 공개 기반 Test
- 향후 다수 사용자 및 Commercial Packaging 확장 가능한 구조
- Content 수보다 Product / Game Design 품질 우선

## 현재 Playable Curriculum

현재 Prototype에는 **13개 Mission**이 있습니다.

```text
Foundations (4)
  status -> diff -> selective staging -> atomic commit

Daily Workflow (6)
  Feature Branch
  복잡한 Workspace에서 Atomic Commit
  Remote State Fetch
  Clean Upstream Pull
  push -u 기반 Branch Publish
  긴급 Branch 전환 전 WIP Stash

Recovery Lab (3)
  작업 손실 없는 Unstage
  Shared History Revert
  Stash WIP 복원
```

장기 목표는 약 **185~273개 Core Mission** + Scenario Variation + Assessment 규모입니다.

## Repository State Model

```text
Repository State
 |
 +--- Current Branch
 +--- Working Tree
 +--- Staging Area
 +--- Commit History
 +--- Remote / Tracking
 |      +--- Tracking Branch
 |      +--- Known Remote HEAD
 |      +--- Actual Remote HEAD
 |      +--- Ahead / Behind
 |      +--- Fetch State
 |
 +--- Stash Stack
```

정확한 Command 문자열 맞히기보다 Inspection과 안전한 판단을 학습하도록 설계합니다.

## Learning Feedback

- 3단계 Progressive Hint: Direction -> Concept -> Command Shape
- Mastery: 독립적인 문제 해결 / 불필요한 Detour
- Safety: 작업 및 Shared History 보호 수준
- Mission Debrief: Why + Mastery + Safety + Hint / Detour
- Inspection Command는 Mastery Penalty 없음
- 위험 Command는 일반 Mission에서 차단하고 전용 Recovery Lab에서 Consequence와 함께 학습

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

13개 Mission 전체에 Golden Test를 적용합니다. Remote/Stash Invariant Test로 `fetch`가 Local HEAD를 움직이지 않는지, `push -u`가 Tracking을 설정하는지, Stash Push/Pop이 WIP를 보존하는지 검증합니다.

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

1. `fetch` -> Divergence 확인 -> Merge / Rebase 명시적 선택
2. Remote 변경으로 인한 Push Reject
3. Team Policy 기반 `pull --rebase`
4. Stash Pop Conflict
5. 겹치는 Local 변경 때문에 Branch Switch가 차단되는 Scenario
6. Collaboration Track: PR / Conflict / Shared History 판단
7. Foundations 20~30개 확장 전에 사내 Usability Test

## License

MIT. [LICENSE](LICENSE) 참고.
