import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = path => fs.readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

const requiredDocs = [
  'AGENTS.md',
  'Task.md',
  'docs/internal-test-operations-index.md',
  'docs/internal-test-plan.md',
  'docs/first-internal-test-cycle.md',
  'docs/test-session-sheet.md',
  'docs/interview-note-template.md',
  'docs/usability-session-report.md',
  'docs/report-aggregation.md',
  'docs/first-review-record-workflow.md',
  'docs/review-record-template.md',
  'docs/result-review-decision-framework.md',
  'docs/review-record-to-change-traceability.md',
  'docs/internal-evidence-handling.md',
  'docs/assessment-scoring.md',
  'docs/internal-deployment-options.md',
  'docs/internal-deployment-checklist.md',
  'docs/service-architecture.md'
];

for (const path of requiredDocs) {
  assert.ok(fs.existsSync(new URL(`../${path}`, import.meta.url)), `Missing operations document: ${path}`);
}

const agents = read('AGENTS.md');
for (const invariant of [
  'Learn Git by changing repository state',
  'Do not merge the pull request unless the user explicitly asks',
  'Docker Compose is not required today',
  'criticalSafetyFloor',
  'docs/internal-test-operations-index.md',
  'Do Not Change'
]) {
  assert.ok(agents.includes(invariant), `AGENTS.md missing invariant: ${invariant}`);
}
assert.match(agents,/진행.*continue implementation.*not merge/is,'AGENTS.md must preserve the autonomous 진행 != merge rule');
assert.match(agents,/44 Missions \/ 6 Tracks/i,'AGENTS.md must document the current curriculum baseline');

const tasks = read('Task.md');
for (const invariant of [
  '44 Missions / 6 Tracks',
  'First Internal Test Cycle - MUST DO NEXT',
  'Docker Compose 현재 비필수',
  'Implementation != Closure',
  'Internal Test Server 배포',
  '첫 Review Record 작성'
]) {
  assert.ok(tasks.includes(invariant), `Task.md missing current-plan invariant: ${invariant}`);
}
for (const group of ['Beginner','Basic','Experienced']) {
  assert.match(tasks,new RegExp(`## 8\\.[234] ${group} Group[\\s\\S]*?Target: 3-5 usable sessions\\.`,'i'),`Task.md must preserve 3-5 usable session target for ${group}`);
}
assert.match(tasks,/\[x\].*Root `AGENTS\.md`/i,'Task.md must track AGENTS.md as completed');
assert.match(tasks,/\[ \].*Internal Test Server 배포/i,'Task.md must keep internal deployment as pending');
assert.match(tasks,/대규모 Curriculum Expansion.*우선하지 않습니다/is,'Task.md must preserve validation-before-volume priority');

const index = read('docs/internal-test-operations-index.md');
for (const link of [
  'internal-test-plan.md','first-internal-test-cycle.md','test-session-sheet.md','interview-note-template.md',
  'internal-evidence-handling.md','report-aggregation.md','first-review-record-workflow.md','review-record-template.md',
  'result-review-decision-framework.md','review-record-to-change-traceability.md','internal-deployment-options.md','internal-deployment-checklist.md'
]) {
  assert.ok(index.includes(link), `Operations Index missing link: ${link}`);
}
assert.match(index,/Implementation is not closure/i,'Operations Index must preserve implementation-vs-closure principle');

const runbook = read('docs/first-internal-test-cycle.md');
for (const link of ['test-session-sheet.md','interview-note-template.md','first-review-record-workflow.md','result-review-decision-framework.md','internal-deployment-options.md']) {
  assert.ok(runbook.includes(link), `Runbook missing operations link: ${link}`);
}

const sessionSheet = read('docs/test-session-sheet.md');
const interview = read('docs/interview-note-template.md');
for (const [name, text] of [['Session Sheet',sessionSheet],['Interview Template',interview]]) {
  assert.ok(!/^\s*(Tester Name|Name|Email|Employee ID|Account ID)\s*:/mi.test(text), `${name} must not introduce a direct identity input field`);
  assert.match(text,/Session ID:/,`${name} must use anonymous Session ID`);
  assert.match(text,/Beginner\s*\/\s*Basic\s*\/\s*Experienced/,`${name} must use coarse tester groups`);
}

const evidence = read('docs/internal-evidence-handling.md');
for (const forbidden of ['name','email','employee ID','account ID']) {
  assert.ok(evidence.toLowerCase().includes(forbidden.toLowerCase()), `Evidence handling must state policy for ${forbidden}`);
}
assert.match(evidence,/Do not commit raw internal session evidence/i,'Evidence handling must keep real evidence outside the product repository by default');

const firstReview = read('docs/first-review-record-workflow.md');
for (const link of ['review-record-template.md','internal-evidence-handling.md','review-record-to-change-traceability.md','result-review-decision-framework.md']) {
  assert.ok(firstReview.includes(link), `First Review workflow missing link: ${link}`);
}
assert.match(firstReview,/3-5 usable sessions/i,'First Review workflow must preserve discovery sample guidance');
assert.ok(firstReview.includes('Do Not Change'), 'First Review workflow must preserve a Do Not Change boundary');

const reviewTemplate = read('docs/review-record-template.md');
for (const field of ['Review ID:','Observed Pattern:','Decision:','Evidence Needed After Change:','Do Not Change:','Retest Missions:','Closure Result:']) {
  assert.ok(reviewTemplate.includes(field), `Review template missing field: ${field}`);
}

const decision = read('docs/result-review-decision-framework.md');
for (const outcome of [
  'FIX NOW','CHANGE MISSION ONLY','CHANGE UI / LEARNING MODEL','ADD ALTERNATE SOLUTION',
  'CHANGE RUBRIC','OBSERVE MORE','KEEP AS-IS','ESCALATE TECHNICAL REVIEW'
]) {
  assert.ok(decision.includes(outcome), `Decision Framework missing outcome: ${outcome}`);
}
assert.ok(decision.includes('Do Not Change'), 'Decision Framework must explicitly preserve a Do Not Change decision');
assert.ok(decision.includes('first-review-record-workflow.md'), 'Decision Framework must link the first Review workflow');

const traceability = read('docs/review-record-to-change-traceability.md');
assert.match(traceability,/Review ID/i,'Traceability rules must link changes to Review IDs');
assert.match(traceability,/Implementation is not the end/i,'Traceability rules must require retest/closure after implementation');
assert.match(traceability,/IMPLEMENTED.*CLOSED/s,'Traceability rules must distinguish implementation from closure');

const aggregation = read('docs/report-aggregation.md');
assert.ok(aggregation.includes('result-review-decision-framework.md'), 'Aggregation doc must hand off to Decision Framework');
assert.ok(aggregation.includes('test-session-sheet.md'), 'Aggregation doc must cross-check Session Sheet');
assert.ok(aggregation.includes('interview-note-template.md'), 'Aggregation doc must cross-check Interview notes');

const scoring = read('docs/assessment-scoring.md');
assert.ok(scoring.includes('result-review-decision-framework.md'), 'Assessment scoring changes must use Decision Framework');
assert.match(scoring,/multiple Assessment Missions/i,'Global Rubric change control must require repeated Assessment evidence');

const deployment = read('docs/internal-deployment-options.md');
assert.match(deployment,/Docker Compose is not required today/i,'Deployment doc must explicitly say Compose is not currently required');
assert.match(deployment,/>= 2 coordinated runtime services/i,'Deployment doc must define a Compose adoption trigger');

const deploymentChecklist = read('docs/internal-deployment-checklist.md');
for (const concept of ['CI is green','Session Recorder','Reports page','version boundary','Rollback']) {
  assert.ok(deploymentChecklist.toLowerCase().includes(concept.toLowerCase()), `Deployment checklist missing concept: ${concept}`);
}

const serviceArchitecture = read('docs/service-architecture.md');
assert.ok(serviceArchitecture.includes('internal-deployment-options.md'), 'Service Architecture must link deployment options');
assert.match(serviceArchitecture,/Docker Compose required\?\s+NO/i,'Service Architecture must keep the current no-Compose decision explicit');

const facilitator = read('facilitator.html');
for (const path of [
  'internal-test-operations-index.md','first-internal-test-cycle.md','test-session-sheet.md','interview-note-template.md','internal-evidence-handling.md',
  'first-review-record-workflow.md','review-record-template.md','result-review-decision-framework.md',
  'review-record-to-change-traceability.md','internal-deployment-options.md','internal-deployment-checklist.md'
]) {
  assert.ok(facilitator.includes(path), `Facilitator Console missing operations document: ${path}`);
}

console.log('Internal test operations documentation contract passed.');
