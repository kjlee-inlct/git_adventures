# Git Adventures - Task Checklist

## 1. Purpose

이 문서는 Git Adventures 프로젝트의 현재 완료 상태와 다음 작업 우선순위를 관리하는 실행용 Checklist입니다.

표기 규칙:

```text
[x] 완료
[ ] 해야 함
[-] 실제 Test Evidence 이후 판단
[!] 즉시 확인 / Blocking 가능
```

작업 우선순위 원칙:

```text
Technical Correctness
        >
Safe Learning Behavior
        >
Real Internal Usability Evidence
        >
Mission / UI Improvement
        >
Infrastructure Expansion
        >
Raw Content Volume
```

`진행`은 구현 / 검증 계속을 의미하며 PR Merge를 의미하지 않습니다.

---

# 2. Current Baseline

- [x] Browser 기반 Git Learning Game 기본 구조 구현
- [x] Korean / English 지원
- [x] 현재 Playable Curriculum: **44 Missions / 6 Tracks**
- [x] Guided Curriculum: Missions 1-40
- [x] Assessment Track: Missions 41-44
- [x] Internal-server / no-account / no-payment 기본 방향 확정
- [x] Repository State 중심 Product Thesis 확정
- [x] 현재 Feature Branch: `feature/git-adventures-mvp`
- [x] PR #1 생성 및 유지
- [x] PR Merge는 명시 요청 전까지 수행하지 않는 정책 확정

Current Track distribution:

```text
Foundations          4
Daily Workflow       8
Recovery Lab         6
Collaboration        9
Release & Incident  13
Assessment           4
```

---

# 3. Product / Game Design

## 3.1 Core Product Thesis

- [x] `Command 암기`가 아니라 `Repository State 변화` 중심 학습 원칙 정의
- [x] Scenario -> Inspect -> Command -> State Transition -> Why -> Recovery Loop 정의
- [x] Wrong-but-valid Action을 가능한 경우 Consequence / Recovery 학습으로 처리
- [x] Git / GitHub / Team Policy 역할 분리
- [x] Safe Git Habit 우선 원칙 정의
- [x] History Ownership 기반 Rebase / Merge 판단 원칙 정의
- [x] Push Reject를 Force Push 유도 대신 새로운 Repository Evidence로 처리
- [x] Beginner-to-Experienced 연속성 있는 Curriculum 방향 정의
- [x] Future Monetization을 Mission Engine이 아닌 Access Policy 문제로 분리

## 3.2 Design Direction

- [x] `Developer Tool + Training Simulator + Strategy Game` 방향 정의
- [x] Generic SaaS / LMS / AI-generated 느낌 회피 기준 정의
- [x] Figma Core Experience 파일 생성
- [x] Track Map / Core Mission / Recovery Incident 기본 화면 구성
- [ ] Operation / Guardrail / Release State가 Advanced Mission에서 더 명확히 보이는지 실제 Usability Test에서 확인
- [-] 실제 사용자 반응에 따라 UI Information Hierarchy 조정
- [-] 실제 Test에서 `dashboard`, `template`, `AI-generated` 인상이 반복되는지 확인 후 Design Revision 결정

---

# 4. Curriculum / Missions

## 4.1 Guided Curriculum

- [x] Foundations 4 Missions
- [x] Daily Workflow 8 Missions
- [x] Recovery Lab 6 Missions
- [x] Collaboration 9 Missions
- [x] Release & Incident 13 Missions

Implemented concepts include:

- [x] `git status`
- [x] Working Tree Diff
- [x] Selective Staging
- [x] Atomic Commit
- [x] Feature Branch
- [x] Fetch / Pull / Push
- [x] Stash / Stash Conflict
- [x] Push Reject / Divergence
- [x] Rebase / Merge Policy
- [x] Rebase Conflict / Continue / Abort / Skip
- [x] Merge Conflict / Continue / Abort
- [x] Multi-file Conflict
- [x] Blocked Branch Switch Guardrail
- [x] Force-with-Lease constrained scenario
- [x] Cherry-pick / Backport
- [x] Cherry-pick Conflict / Abort
- [x] Backport Dependency Ordering
- [x] Hotfix Branch
- [x] Release Tag
- [x] Published Tag State
- [x] Bad Release Revert
- [x] Recovery Patch Tag
- [x] Hotfix Review Evidence
- [x] Approved Hotfix Merge
- [x] Release Tag Publication
- [x] Hotfix Propagation to main
- [x] Incident Closure Verification

## 4.2 Assessment

- [x] Assessment Track 분리
- [x] `assessment: true` Mission Metadata
- [x] Command Shape Hint 차단
- [x] Mission 41 - Published Regression Recovery Judgment
- [x] Mission 42 - Supported Release Line Judgment
- [x] Mission 43 - Merge Strategy / Policy Judgment
- [x] Mission 44 - Incident Closure Verification
- [ ] 실제 Experienced / Basic 사용자에게 Assessment가 Command Trivia가 아닌 Judgment 문제로 느껴지는지 검증
- [ ] Safe Alternate Solution이 잘못 Reject되는 Assessment가 있는지 실제 Test로 확인
- [-] 실제 Evidence 후 추가 Assessment Scenario 우선순위 결정

Possible future Assessment topics - **현재 즉시 확장 금지 / Evidence 이후 판단**:

- [-] Forward-fix vs Revert vs Rollback
- [-] Multiple Supported Release Lines
- [-] Competing PR Merge Strategy choices
- [-] Cleanup / Remote Branch Policy
- [-] Release Verification Assessment

## 4.3 Curriculum Expansion Boundary

- [x] 장기 185-273 Core Mission 가능성 문서화
- [x] 200+ Mission을 검증 전 Mass-create하지 않는 원칙 확정
- [ ] 첫 Internal Test Cycle 종료 전 대규모 Mission Expansion 보류
- [-] 첫 Review Record 결과를 기반으로 다음 5-10 Mission Batch 선택

---

# 5. Repository State / Simulation Engine

## 5.1 State Model

- [x] Current Branch
- [x] Working Tree
- [x] Staging Area
- [x] Commit History
- [x] Remote / Tracking
- [x] Stash Stack
- [x] Conflict Set
- [x] Operation State
- [x] Guardrail State
- [x] Local Release Tags
- [x] Published Release Tags
- [x] Review Gate

Operation State:

- [x] Rebase
- [x] Merge
- [x] Cherry-pick

## 5.2 Safety / Recovery Semantics

- [x] Rebase Abort exact snapshot restore
- [x] Merge Abort exact snapshot restore
- [x] Partial Conflict Resolution 후 Abort restore 검증
- [x] Rebase Continue 시 unresolved Conflict 존재하면 진행 차단
- [x] Merge Continue 시 unresolved Conflict 존재하면 진행 차단
- [x] Multi-file Conflict Set 지원
- [x] Rebase Skip에서 skipped Commit 제거
- [x] Force-with-Lease mismatch 시 Remote 보존
- [x] Branch Switch blocked 시 Branch / WIP 보존
- [x] Stash Conflict 시 Stash Entry 보존
- [x] Published Release Tag immutable identity 원칙 모델링

## 5.3 Engine Architecture

- [x] Conflict extension 분리
- [x] Release extension 분리
- [x] Governance extension 분리
- [x] Assessment Scoring 분리
- [x] Session Report 분리
- [x] Report Aggregator 분리
- [ ] `app.js` + extension wrapping 구조가 Advanced 기능 증가 시 유지 가능한지 Architecture Review
- [-] 실제 다음 대규모 Engine 확장 전에 `repository-engine.js` 또는 공용 Pure Engine Module 추출 필요성 재평가
- [-] Cherry-pick 이후 Bisect / Reflog / Reset 등 복잡 기능을 추가할 경우 Browser/Test Semantic Duplication 제거 우선

---

# 6. Assessment Scoring

## 6.1 Implemented Rubric

- [x] Judgment
- [x] Safety
- [x] Evidence
- [x] Efficiency

Default weights:

```text
Judgment    40
Safety      30
Evidence    20
Efficiency  10
```

- [x] Mission-specific Weight Override 지원
- [x] `total >= passScore` 조건
- [x] `safety >= criticalSafetyFloor` 조건
- [x] Unsafe Action Safety 감점
- [x] Missing Required Inspection Evidence 감점
- [x] Useful Inspection은 Efficiency Penalty 제외
- [x] Bilingual Rationale
- [x] Browser Debrief에 4축 표시
- [x] Shared Scoring Engine + CI Contract

## 6.2 Calibration Tasks

- [ ] 첫 3-5 usable sessions / group 수행
- [ ] Assessment Score와 Interview Reasoning 비교
- [ ] Experienced 사용자가 안전한 판단을 했지만 Evidence가 과도하게 낮아지는 Pattern 확인
- [ ] Safety Floor가 실제 위험 행동과 잘 맞는지 확인
- [ ] Mission-local Scoring 문제와 Global Rubric 문제 분리
- [-] 여러 Assessment / 여러 Tester에서 반복 mismatch가 확인될 때만 Global Weight 변경 검토
- [-] Hiring / Certification / Employee Evaluation 용도로 사용 여부는 별도 Validation 전까지 금지

---

# 7. Internal Usability Test Tooling

## 7.1 Session Recorder

- [x] Local-only Session Recorder 구현
- [x] Beginner / Basic / Experienced Group
- [x] Anonymous `sessionId`
- [x] Mission Duration
- [x] Relative Command Timing `atMs`
- [x] Command Trace
- [x] Inspection / Mutation / Unsafe Classification
- [x] Hint Count
- [x] Detour / Wrong / Unsafe Counts
- [x] Guided Mastery / Safety 기록
- [x] Assessment 4-axis Score 기록
- [x] Compact Final Repository State
- [x] JSON Export
- [x] PII Non-Collection Contract

## 7.2 Report Aggregator

- [x] `reports.html`
- [x] Multiple Session JSON Load
- [x] Schema Validation
- [x] PII Flag Reject
- [x] Group Comparison
- [x] Completion Rate
- [x] Average / Median / P75 Time-to-First-Command
- [x] Mission Duration Aggregate
- [x] Hint / Inspection / Unsafe / Detour / Wrong rates
- [x] Assessment Total / Pass Rate
- [x] Assessment 4-axis Group Aggregate
- [x] Mission Hotspot Ranking
- [x] Aggregate JSON Export
- [ ] 실제 Session JSON으로 첫 Aggregator 실행
- [ ] Rejected Report Warning이 실제 운영에서 이해하기 쉬운지 확인
- [-] CSV Export 필요성은 첫 실제 Test Cycle 이후 판단
- [-] Trend / Mission Version Comparison 필요성은 실제 운영 후 판단

## 7.3 Facilitator Console

- [x] `facilitator.html`
- [x] Beginner Preset
- [x] Basic Preset
- [x] Experienced Preset
- [x] Preset Mission Jump
- [x] Group Auto Preselect
- [x] Before / During / After Checklist
- [x] Operating Document Links
- [ ] 실제 Facilitator가 Console만 보고 Test를 진행할 수 있는지 확인
- [ ] Facilitator Intervention Rule이 현실적인지 첫 Test에서 확인

---

# 8. First Internal Test Cycle - MUST DO NEXT

현재 Product 단계에서 가장 중요한 실제 작업입니다.

## 8.1 Test Preparation

- [ ] 사내 Test Server URL 확정
- [ ] 배포 Version / Commit SHA 기록
- [ ] Browser Matrix 최소 확인
- [ ] `Game / Facilitator / Reports` 접근 확인
- [ ] Session Recorder Export 확인
- [ ] Session Sheet Template 준비
- [ ] Interview Note Template 준비
- [ ] Evidence 저장용 내부 Folder 생성
- [ ] Raw Evidence를 Public Repository에 저장하지 않는 규칙 공유

## 8.2 Beginner Group

Target: 3-5 usable sessions.

- [ ] Beginner #1
- [ ] Beginner #2
- [ ] Beginner #3
- [ ] Beginner #4 optional
- [ ] Beginner #5 optional
- [ ] 각 Session JSON 확보
- [ ] 각 Session Sheet 확보
- [ ] 각 Interview Note 확보

## 8.3 Basic Group

Target: 3-5 usable sessions.

- [ ] Basic #1
- [ ] Basic #2
- [ ] Basic #3
- [ ] Basic #4 optional
- [ ] Basic #5 optional
- [ ] 각 Session JSON 확보
- [ ] 각 Session Sheet 확보
- [ ] 각 Interview Note 확보

## 8.4 Experienced Group

Target: 3-5 usable sessions.

- [ ] Experienced #1
- [ ] Experienced #2
- [ ] Experienced #3
- [ ] Experienced #4 optional
- [ ] Experienced #5 optional
- [ ] 각 Session JSON 확보
- [ ] 각 Session Sheet 확보
- [ ] 각 Interview Note 확보

## 8.5 First Aggregate

- [ ] `/reports.html`에서 모든 usable Session JSON Load
- [ ] Rejected Report 확인
- [ ] Aggregate JSON Export
- [ ] Beginner / Basic / Experienced Group 비교
- [ ] Unsafe Hotspot 확인
- [ ] Low Completion Mission 확인
- [ ] High Hint Mission 확인
- [ ] Long Time-to-First-Command Mission 확인
- [ ] Assessment Axis mismatch 확인

---

# 9. First Review Record

## 9.1 Evidence Preparation

- [ ] `docs/first-review-record-workflow.md` 기준 Evidence Bundle 정리
- [ ] Session ID / Group / Mission ID Join 확인
- [ ] Caveated / Invalid Session 분리
- [ ] Candidate Pattern List 작성
- [ ] Technical Correctness Objection 우선 검토
- [ ] Safe Alternate Solution Objection 검토

## 9.2 Review Records

- [ ] `docs/review-record-template.md`를 복사하여 첫 Review Record 작성
- [ ] Review ID 부여 (`CYCLE01-RR-001` 등)
- [ ] Observed Pattern 작성
- [ ] Session JSON Evidence 기록
- [ ] Aggregator Evidence 기록
- [ ] Session Sheet / Interview Evidence 기록
- [ ] 필요 시 Technical Review 기록
- [ ] Decision 선택
- [ ] `Do Not Change` 작성
- [ ] Retest Mission 정의
- [ ] Expected Evidence Improvement 정의

Possible decisions:

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

## 9.3 Traceability / Closure

- [ ] Product Change Commit / PR에 Review ID 연결
- [ ] CI Green 확인
- [ ] Retest 수행
- [ ] Review Closure Result 기록

Closure states:

```text
VALIDATED
PARTIALLY_VALIDATED
NOT_REPRODUCED
REGRESSION_FOUND
OBSERVE_MORE
SUPERSEDED
```

- [ ] `Implementation != Closure` 원칙 유지

---

# 10. Documentation

## 10.1 Core Product Docs

- [x] Product Vision
- [x] Game Design
- [x] Curriculum Roadmap
- [x] Level Design
- [x] Experience Design
- [x] Design Direction
- [x] Mission Schema
- [x] Content Guideline
- [x] Command Coverage
- [x] Service Architecture
- [x] Product Roadmap
- [x] Product Monetization / Packaging
- [x] References / Research

## 10.2 Git Learning / Workflow Docs

- [x] Learning Feedback System
- [x] Daily Workflow Expansion
- [x] Collaboration Expansion
- [x] Conflict Lifecycle
- [x] Advanced Rebase / Worktree Safety
- [x] Release / Backport Model
- [x] Release Incident Lifecycle
- [x] Release Governance
- [x] Assessment Track
- [x] Assessment Scoring

## 10.3 Internal Test Operations Docs

- [x] Internal Test Operations Index
- [x] Internal Test Plan
- [x] First Internal Test Cycle Runbook
- [x] Test Session Sheet
- [x] Interview Note Template
- [x] Local Usability Session Report
- [x] Internal Evidence Handling
- [x] Report Aggregation
- [x] First Review Record Workflow
- [x] Review Record Template
- [x] Result Review Decision Framework
- [x] Review Record -> Change Traceability
- [x] Internal Deployment Options
- [x] Internal Deployment Checklist

## 10.4 Repository Agent / Task Docs

- [x] Root `AGENTS.md`
- [x] Root `Task.md`
- [ ] Agent / Task docs가 실제 Project 상태 변경 시 함께 갱신되는지 지속 확인

---

# 11. CI / Automated Validation

## 11.1 Existing Gates

- [x] JavaScript Syntax
- [x] Guided Content Contract
- [x] Golden Mission Tests
- [x] Alternate Solution / Repository Invariants
- [x] Release Governance Invariants
- [x] Assessment Validation
- [x] Assessment Scoring Validation
- [x] Session Report Contract
- [x] Report Aggregator Contract
- [x] Internal Test Preset Contract
- [x] Operations Documentation Contract
- [x] Simulator Command Coverage
- [x] AGENTS.md Contract 포함

## 11.2 Future Validation Tasks

- [ ] Task.md 주요 Baseline이 실제 구현과 어긋나지 않는지 필요 시 Contract 추가 검토
- [-] Mission Content가 JS module에서 JSON/Schema 기반으로 Migration될 때 Schema CI 확장
- [-] Progress Schema 변경 시 Migration Tests 추가
- [-] Real Git/WASM/Server Execution 도입 시 Simulator-vs-Real-Git Contract Tests 설계

---

# 12. Internal Deployment

## 12.1 Current Decision

- [x] 현재 Static Browser App임을 문서화
- [x] Backend API 없음
- [x] Database 없음
- [x] Docker Compose 현재 비필수 결정
- [x] Single Nginx/Caddy static hosting 권장
- [x] Single static-web Container도 가능
- [x] Compose Adoption Trigger 문서화

Current recommendation:

```text
Development / single PC
  python -m http.server 8000

Shared internal server
  Nginx / Caddy
  OR
  one static-web container
```

## 12.2 Must Do for First Shared Internal Test

- [ ] 실제 Internal Server 배포
- [ ] Internal IP / DNS 결정
- [ ] Network Access Scope 확인
- [ ] `Game / Facilitator / Reports` URL 접근 확인
- [ ] Deployment Commit SHA 기록
- [ ] Rollback 방법 확인
- [ ] Test Session 중 배포 변경 금지 또는 Version Boundary 기록

## 12.3 Docker Compose Trigger

다음 중 실제 필요가 생길 때 검토:

- [-] 2개 이상 Coordinated Runtime Services
- [-] Progress / Report API
- [-] Database / Shared Storage
- [-] Reverse Proxy + App + API를 하나의 Stack으로 관리할 필요
- [-] Persistent Volume / Environment Coordination 필요
- [-] Monitoring Stack 통합 필요

현재는 **Compose 추가 작업하지 않음**.

---

# 13. Privacy / Evidence Handling

- [x] Product Test Tool에서 Name 비수집
- [x] Email 비수집
- [x] Employee ID 비수집
- [x] Account ID 비수집
- [x] `privacy.piiCollected = false`
- [x] Session ID / Tester Group / Mission ID Join Key 사용
- [x] Raw Internal Evidence를 Public Product Repository 외부에 저장하는 원칙 문서화
- [x] PII-marked Report Aggregator Reject
- [ ] 실제 Test 운영 Folder가 내부 승인 위치인지 확인
- [ ] 실제 Session 파일명에 Tester Name을 사용하지 않는지 확인
- [ ] 첫 Test Cycle 후 Evidence Retention / Cleanup 운영 확인

---

# 14. Git / PR Management

- [x] Feature Branch 작업 유지
- [x] PR #1 Open
- [x] CI 기반 변경 검증
- [x] PR Body를 Product Scope 변경과 함께 갱신하는 Workflow 사용
- [x] `진행 != merge` 규칙 AGENTS.md에 명시
- [ ] 실제 Merge 필요 시 사용자 명시 요청 확인
- [ ] Merge 전 latest Head SHA 재확인
- [ ] Merge 전 latest CI success 확인
- [ ] Merge 전 Mergeability 확인
- [ ] 명시 요청 시 expected_head_sha 사용 고려

---

# 15. Architecture / Technical Debt - Evidence Before Refactor

아래 항목은 중요하지만 **현재 즉시 대규모 Refactor하지 않음**.

- [-] `app.js`가 계속 커질 경우 Core Engine 추출
- [-] Browser Engine / Test Helper Semantic Duplication 제거
- [-] Mission Content를 Language-neutral JSON + Locale Resource로 분리
- [-] State Model Versioning
- [-] Progress Migration Layer
- [-] Real Git execution 도입 여부
- [-] WASM Git 검토
- [-] Ephemeral Server Repository / Containerized Assessment 검토
- [-] Backend Progress Sync
- [-] Organization / Team Features

Trigger:

```text
실제 Product / Test limitation이 확인됐을 때만 진행
```

---

# 16. Future Product Features - Not Current Priority

다음 항목은 현재 Internal Product Validation보다 우선하지 않습니다.

- [-] Account / Login
- [-] Cloud Progress Sync
- [-] Central Analytics Backend
- [-] Team Dashboard
- [-] Organization Assignments
- [-] Company-specific Git Policy Missions
- [-] Billing / Payment
- [-] Subscription Enforcement
- [-] Public Signup
- [-] Vercel Deployment
- [-] Large-scale Public Hosting
- [-] Certification
- [-] Hiring Assessment
- [-] Leaderboard / Competitive XP System

---

# 17. Immediate Next Actions

현재 가장 우선적으로 해야 할 순서:

```text
1. Internal shared server deployment
2. Deployment checklist 수행
3. Beginner / Basic / Experienced 각각 3-5 Session
4. Session JSON + Session Sheet + Interview Note 확보
5. reports.html Aggregate 생성
6. Candidate Pattern 작성
7. First Review Record 작성
8. Evidence-backed narrow fix
9. Retest
10. Review Record closure
```

Checklist:

- [ ] Internal Test Server 배포
- [ ] 첫 Beginner Session 실행
- [ ] 첫 Basic Session 실행
- [ ] 첫 Experienced Session 실행
- [ ] 최소 3 usable sessions / group 확보
- [ ] First Aggregate JSON 생성
- [ ] 첫 Candidate Pattern List 작성
- [ ] 첫 Review Record 작성
- [ ] 첫 Evidence-backed Fix 구현
- [ ] 첫 Retest 완료
- [ ] 첫 Review Record Closure

---

# 18. Definition of Done - Current Phase

현재 Internal Calibration Phase는 다음이 충족되면 1차 완료로 봅니다.

- [ ] Beginner 3-5 usable sessions
- [ ] Basic 3-5 usable sessions
- [ ] Experienced 3-5 usable sessions
- [ ] 모든 usable session에 JSON / Session Sheet / Interview Note 존재
- [ ] First Aggregate 생성
- [ ] Top Mission Hotspots 검토
- [ ] Technical Credibility Objection 검토
- [ ] Safe Alternate Solution Objection 검토
- [ ] 최소 1개 Evidence-backed Review Record 생성
- [ ] 최소 1개 Change 또는 KEEP AS-IS / OBSERVE MORE 명시 결정
- [ ] 변경한 Review Record는 Retest 수행
- [ ] Review Closure 상태 기록
- [ ] Global Rubric 변경 여부를 Evidence 기반으로 결정
- [ ] 다음 Mission Batch / UI Change / Architecture Work 우선순위 재선정

이 단계가 끝나기 전에는 대규모 Curriculum Expansion이나 불필요한 Infrastructure Expansion을 우선하지 않습니다.
