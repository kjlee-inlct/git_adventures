# Git Adventures

[English](README.md)

Git Adventures는 Git Command를 암기하는 대신 **Repository 상태를 직접 변화시키며 학습하는 Mission 기반 Git 학습 서비스**입니다.

사용자는 실제 개발 상황에 가까운 Scenario, 현재 Repository 상태, 목표 상태를 받고 Git Command를 직접 입력합니다. 입력 결과에 따라 Working Tree, Staging Area, Branch, Commit History가 어떻게 바뀌는지 즉시 확인합니다.

## Product 방향

Git Adventures는 단발성 Tutorial이 아니라 다수 사용자가 지속적으로 이용할 수 있는 서비스 구조를 목표로 합니다.

```text
Free Core
   |
   +--- Git Mental Model
   +--- status / diff / add / commit
   +--- branch / switch / log / push
   +--- 기본 Safe Recovery
   |
   v
Pro Learning
   |
   +--- Merge / Rebase / Conflict
   +--- Cherry-pick / Reflog / Bisect
   +--- 실무 Incident Scenario
   +--- Guided Assessment
   |
   v
Team / Business
   |
   +--- Team Progress
   +--- Assigned Learning Path
   +--- 사내 Git Policy Mission
   +--- Assessment / Certification
   +--- Admin Analytics
```

현재 Repository에는 Free Core 경험을 위한 Browser-only MVP와 향후 Account, Payment, Progress, Team 기능 확장을 위한 Product Architecture를 포함합니다.

## 현재 MVP

- 한국어 / English Language Switch
- Terminal 형태 Git Command 입력
- Repository State Visualization
- Working Tree / Staging Area / Commit History 시각화
- Mission Progress 및 XP
- Local Progress 저장
- 7개 Free Core Mission
- 별도 Build Tool / Backend 불필요

Local 실행:

```bash
python -m http.server 8000
```

접속:

```text
http://localhost:8000
```

대부분의 최신 Browser에서는 `index.html` 직접 실행도 가능.

## Learning Model

핵심 학습 Loop:

```text
Scenario
   |
   v
Repository State 확인
   |
   v
Git Command 선택
   |
   v
State Transition 확인
   |
   v
Why / How 설명
   |
   v
더 어려운 Context에서 반복
```

단순 Command 반복보다 **상태를 읽고 판단하는 능력** 학습을 우선합니다.

## Content Track

| Track | 대상 | Commercial Tier |
|---|---|---|
| Foundations | Git 최초 사용자 | Free |
| Daily Workflow | 일반 개발자 | Free / Pro |
| Recovery Lab | Git 실수 복구 필요 개발자 | Pro |
| Collaboration | PR, Merge, Rebase, Conflict | Pro |
| Advanced Git | Bisect, Reflog, Cherry-pick, Tag | Pro |
| Release & Hotfix | Production Workflow | Pro |
| Team Policy | 사내 Git 운영 규칙 | Business |
| Assessment | Skill Validation | Pro / Business |

상세 Level 구성: [Level Design](docs/level-design.md)

## Service Architecture

현재 MVP는 Static Application이지만 Domain Model은 향후 Platform Service와 분리합니다.

```text
Browser Game
   |
   +--- Mission Engine
   +--- Git State Simulator
   +--- i18n Content
   +--- Local Progress

Future Platform API
   |
   +--- Authentication
   +--- Cloud Progress
   +--- Entitlements
   +--- Payments
   +--- Team / Organization
   +--- Analytics
   +--- Content Delivery
```

상세: [Service Architecture](docs/service-architecture.md)

## Monetization 원칙

Free Tier만으로 Git의 핵심 Workflow를 충분히 학습할 수 있어야 합니다. 결제는 기본 지식을 인위적으로 차단하기보다 **깊이 있는 Scenario, 실무 연습, 평가, Team 관리 기능**에서 가치를 제공합니다.

예상 Tier:

- Free: Foundations + Daily Workflow 핵심 Mission
- Pro: 전체 개인 Curriculum, Advanced Scenario, Assessment, Cloud Progress
- Team: Assignment, Team Dashboard, Private Learning Path, Policy-specific Mission

상세: [Product and Monetization](docs/product-monetization.md)

## 참고자료에서 반영한 핵심

VIM Master의 Content Platform Architecture처럼 Mission을 Application Code와 분리하는 방향을 채택합니다. HN Feedback에서는 초기 Login 강제와 이른 Paywall에 대한 반감, Advanced Level 부족, 더 많은 Level 요구가 반복적으로 확인됩니다.

따라서 Git Adventures 기준:

- 첫 학습 Session 대상 Login 강제 없음
- Free Core 완료 전 Paywall 노출 최소화
- Free Core 자체 완결성 보장
- Advanced / Recovery / Collaboration을 장기 Retention 핵심으로 설계
- Account는 Cloud Sync, Device 이동, Pro/Team 기능에서 자연스럽게 요청

## Project 구조

```text
.
|--- index.html
|--- styles.css
|--- app.js
|--- README.md
|--- README.ko.md
|--- docs/
     |--- level-design.md
     |--- product-monetization.md
     |--- service-architecture.md
     |--- content-guideline.md
```

## Design Principles

- Repository State Transition 기반 학습
- Command 복잡도보다 Why 선행
- 실제 Engineering Scenario 활용
- 초기 Mission Short Feedback Loop 유지
- Destructive Command는 Safe Recovery Context에서만 도입
- Git 기능과 Company Policy 구분
- 한국어 / English를 동일 Content Model에서 지원
- Free Core의 실질적 학습 가치 보장
- Mission 추가 시 UI Code 수정이 필요 없는 Data-driven Architecture 목표
- Guest-first Experience 및 Login Friction 최소화

## Status

현재 단계: Free Core MVP + 확장 가능한 Product Foundation.

다음 구현 우선순위:

1. Mission을 JavaScript Constant에서 Versioned Content File로 분리
2. Mission Prerequisite 및 Track Map 추가
3. Command Alternative / Partial Credit / Scenario Scoring 추가
4. Account / Cloud Progress Backend 추가
5. Payment 이전 Entitlement Layer 추가
6. Pro Content 및 Team Domain Model 추가
7. Hosted Deployment + Product Analytics 추가

## License

MIT. [LICENSE](LICENSE) 참고.
