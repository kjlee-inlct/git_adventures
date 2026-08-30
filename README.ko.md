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

## Core Learning Loop

```text
Scenario
   |
Repository State 확인
   |
Git Command 선택 / 입력
   |
State Transition 확인
   |
Why 이해
   |
필요 시 실수 복구
   |
더 복잡한 Scenario 수행
```

유효하지만 좋지 않은 선택은 단순 Fail 대신 실제 Repository Consequence를 만들 수 있습니다.

## 첫 Playable Vertical Slice

현재 8개 Mission이 세 단계에 걸쳐 구성되어 있습니다.

```text
Foundations
  1. Repository Status 확인
  2. Unstaged Diff 읽기
  3. Selective Staging
  4. Atomic Commit

Daily Workflow
  5. Feature Branch 격리
  6. 복잡한 Workspace에서 Atomic Commit 구성

Recovery Lab
  7. 작업 삭제 없이 Unstage
  8. Shared History를 Revert로 안전하게 복구
```

`git status`, `git diff`, `git diff --staged`, `git log --oneline` 같은 Inspection Command는 점수 Penalty 없이 사용할 수 있습니다.

`git add .`처럼 State를 불필요하게 넓히는 선택도 실제 State 변화로 반영하고, 사용자가 이후 Recovery로 목표 State에 도달하면 Mission을 완료할 수 있습니다.

## Learning Feedback

현재 Prototype은 네 가지 학습 Signal을 제공합니다.

```text
Mastery = 도움 없이 문제를 해결한 정도 / 불필요한 Detour
Safety  = 작업과 Shared History를 보호한 정도
Hints   = 단계별 도움 사용량
Debrief = Mission 완료 후 Why + 결과 설명
```

Inspection Command는 비효율로 간주하지 않습니다.

일반 Mission에서는 `reset --hard`, `clean -fd`, `push --force` 같은 파괴 가능 Command를 차단하고 Safety에 반영합니다. 추후 전용 Recovery Lab에서는 명시적인 Consequence Simulation과 함께 학습 가능하도록 확장합니다.

상세: [Learning Feedback System](docs/learning-feedback-system.md)

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

사내 Test 단계에서는 구현된 Track 전체를 공개하며, 향후 유료 Packaging을 적용하더라도 Mission Content 자체를 재작성하지 않도록 구조를 분리합니다.

## 현재 MVP

- 한국어 / English 전환
- Terminal 형태 Command 입력
- Repository State Visualization
- Working Tree / Staging / Commit History Feedback
- Track Map
- 3단계 Progressive Hint
- Mastery / Safety Feedback
- Mission Debrief
- Local Progress
- 별도 Backend / Build Framework 없이 실행 가능

Local 실행:

```bash
python -m http.server 8000
```

접속:

```text
http://localhost:8000
```

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
- [Content Guideline](docs/content-guideline.md)
- [Internal Test Plan](docs/internal-test-plan.md)
- [Product Packaging and Future Monetization](docs/product-monetization.md)
- [Service Architecture](docs/service-architecture.md)
- [Product Roadmap](docs/product-roadmap.md)
- [References and Product Research](docs/references.md)

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

## Figma

Core Experience Design:

https://www.figma.com/design/4u02b7msrNYjPDQbITbnGi

현재 Screen:

- Track Map
- Core Mission
- Recovery Incident

## Product Research

VIM Adventures, VIM Master, Community Discussion, Git Workflow 자료를 학습 Interaction과 Product Risk 참고자료로 활용합니다.

단, 구현 Code, Scenario, Visual Identity, Git Learning Model은 독립적으로 설계합니다.

상세: [References and Product Research](docs/references.md)

## Immediate Roadmap

1. 8개 Mission Vertical Slice 사내 Test
2. 실제 사용자 행동 기반 Hint / Mastery / Safety 조정
3. Target-state Golden Test 및 Alternate-path Regression Test 추가
4. Simulator Command Coverage 확장
5. 첫 Slice 검증 후 Foundations를 20~30개 고품질 Mission으로 확장
6. Daily Workflow / Recovery 깊이 확장
7. Track Map / Debrief 실제 사용성 검증
8. 실제 사용 결과 기반 Account / Analytics / 향후 Packaging 결정

## License

MIT. [LICENSE](LICENSE) 참고.
