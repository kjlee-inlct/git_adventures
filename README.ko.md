# Git Adventures

[English](README.md)

Git Adventures는 다음 한 가지 원칙을 중심으로 설계하는 Scenario 기반 Git 학습 Game입니다.

> Git Command 목록을 외우는 대신 Repository State를 직접 변화시키며 Git을 학습.

사용자는 실제 개발 상황과 유사한 Repository State를 확인하고, 직접 Git Command를 입력한 뒤 Working Tree, Staging Area, Commit History, Branch, Remote State 변화를 즉시 확인합니다.

## 현재 단계

현재 단계는 **사내 Product 기획 및 MVP 검증**.

- 사내 Server 배포
- 한국어 / English 지원
- 결제 기능 없음
- Account 강제 없음
- 구현된 학습 Content 전체 공개 기반 Test
- 향후 다수 사용자 Service 확장 가능한 구조 고려
- 유료 전환 가능성은 Mission Logic이 아닌 Metadata / Policy Layer로 분리

현재 최우선 순위는 많은 기능 구현보다 **Product 기획과 Game Design 품질 확보**.

## Product 목표

```text
Git Beginner
   |
   v
Git State 이해
   |
   v
Daily Workflow 수행
   |
   v
실수 복구
   |
   v
안전한 Collaboration
   |
   v
History 관리
   |
   v
Release / Incident 대응
   |
   v
Git Mastery
```

`commit`, `pull`, `push`를 이미 사용하는 개발자에게도 계속 학습 가치가 있는 수준을 목표로 합니다.

## Core Game Loop

```text
Scenario
   |
   v
Repository State 확인
   |
   v
Git Command 선택 / 입력
   |
   v
State Transition 확인
   |
   v
Why 이해
   |
   v
더 복잡한 Scenario 수행
```

잘못된 Command라도 복구 가능한 상황이면 단순 `FAIL` 처리보다 새로운 Recovery Problem으로 연결하는 방향을 우선합니다.

## Curriculum 계획

| Track | 학습 목표 |
|---|---|
| Orientation | Git Mental Model 및 Inspection-first 습관 |
| Foundations | 독립적인 첫 Feature Branch Workflow |
| Daily Workflow | 실제 Multi-file 개발 작업 |
| Recovery Lab | 흔한 Git 실수의 안전한 복구 |
| Collaboration | PR, Merge, Rebase, Conflict, Shared History |
| History Management | Reflog, Cherry-pick, Bisect, Rebase, Tag |
| Release & Incident | Hotfix, Backport, Bad Release, Rollback 판단 |
| Mastery / Assessment | 최소 Hint 기반 복합 Scenario |

장기적으로 약 **185~273개 Core Mission** + Scenario Variation + Assessment 규모를 목표로 설계.

사내 Test 단계에서는 구현된 Track 전체를 공개. 향후 일부 기능을 유료로 전환하더라도 Mission Content 자체를 재작성하지 않도록 구조 분리.

## 현재 MVP

현재 Browser Prototype 기능:

- 한국어 / English 전환
- Terminal 형태 Command 입력
- Repository State Visualization
- Working Tree / Staging / Commit History Feedback
- Mission Progression
- XP 및 Local Progress
- 별도 Build Tool / Backend 없이 실행 가능

Local 실행:

```bash
python -m http.server 8000
```

접속:

```text
http://localhost:8000
```

## Product 기획 문서

구현 확장 전 Product 기획을 Repository 내부 문서로 우선 고정.

- [Product Vision](docs/product-vision.md)
- [Game Design](docs/game-design.md)
- [Curriculum Roadmap](docs/curriculum-roadmap.md)
- [Level Design](docs/level-design.md)
- [Experience Design](docs/experience-design.md)
- [Visual Design Direction](docs/design-direction.md)
- [Mission Schema](docs/mission-schema.md)
- [Product Phase Gates](docs/product-phase-gates.md)
- [Content Guideline](docs/content-guideline.md)
- [Internal Test Plan](docs/internal-test-plan.md)
- [Product Packaging and Future Monetization](docs/product-monetization.md)
- [Service Architecture](docs/service-architecture.md)
- [References and Product Research](docs/references.md)

## Figma Product Design

Core Product Screen:

https://www.figma.com/design/4u02b7msrNYjPDQbITbnGi

현재 Design Set:

- Track Map
- Core Mission
- Recovery Incident

Figma는 단순 Mockup이 아니라 Visual Grammar와 Learning Hierarchy 기준으로 사용. 실제 구현에서는 화면 크기는 조정 가능하지만 Product Logic은 동일하게 유지.

## Design Principle

1. Realism보다 Learning Clarity 우선
2. Command Memorization보다 Repository State 이해 우선
3. Efficiency보다 Safe Git Habit 우선
4. Trivia보다 실제 개발 Scenario 우선
5. Beginner에서 Expert까지 연속적인 Progression
6. 가능한 경우 실수를 Recovery Learning으로 활용
7. Basic Tool 제한 기반 Fake Difficulty 금지
8. 한국어 / English를 동일한 1st-class Content로 관리
9. Content = Data, Curriculum을 Engine Code에 Hardcoding 금지
10. 현재 Paywall 없이 Future Commercial Scale 대응 구조 확보

## Visual Direction

UI 목표:

```text
Developer Tool
+
Puzzle Game
+
Repository Map
+
Editorial Typography
```

Generic SaaS Dashboard, 의미 없는 Glass Card, Random Gradient, Git State 학습과 무관한 Animation 등 AI 생성형 UI에서 자주 보이는 Pattern 지양.

## Product Research

VIM Adventures, VIM Master 및 해당 도구에 대한 Community Feedback에서 학습 Interaction, Progression, Game UX, Pricing 반응 등을 참고.

단, 구현 Code, Scenario, Visual Identity, Git Learning Model은 독립적으로 설계.

상세: [References and Product Research](docs/references.md)

## 향후 유료화

지금 유료 기능을 제한하는 것이 목적이 아님.

현재 사내 Test:

```text
구현된 Content -> 전체 Access
```

향후 실제 사용 결과에 따라 다음 영역을 Product Package로 구분 가능:

- Advanced Individual Practice
- Assessment
- Cloud Progress
- Specialized Scenario Pack
- Team Onboarding / Analytics
- Company-specific Git Policy Mission

Subscription / One-time Purchase / Team License 등 Pricing Model은 현재 결정하지 않고 실제 사용 Pattern을 확인한 뒤 결정.

## Immediate Roadmap

1. Product Vision / Core Game Loop 검증
2. Figma 기반 Repository Board / Mission / Recovery Visual Grammar 검증
3. Versioned Mission Schema 기반 고품질 Prototype Mission 5~10개 제작
4. Beginner / Basic / Experienced Git User 대상 사내 Usability Test
5. Content 수량 확장 전 Learning / UX Problem 수정
6. Foundations 20~30개 Mission 확장
7. Daily Workflow / Recovery Vertical Slice 추가
8. Content 자동 Validation 및 Golden Scenario Test 추가
9. Accessibility / Bilingual Behavior Review
10. 실제 사용 결과 기반 다음 Service Architecture 결정

## License

MIT. [LICENSE](LICENSE) 참고.
