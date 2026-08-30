import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = path => fs.readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

const requiredDocs = [
  'docs/internal-test-plan.md',
  'docs/first-internal-test-cycle.md',
  'docs/test-session-sheet.md',
  'docs/interview-note-template.md',
  'docs/report-aggregation.md',
  'docs/result-review-decision-framework.md',
  'docs/assessment-scoring.md'
];

for (const path of requiredDocs) {
  assert.ok(fs.existsSync(new URL(`../${path}`, import.meta.url)), `Missing operations document: ${path}`);
}

const runbook = read('docs/first-internal-test-cycle.md');
for (const link of ['test-session-sheet.md','interview-note-template.md','result-review-decision-framework.md']) {
  assert.ok(runbook.includes(link), `Runbook missing operations link: ${link}`);
}

const sessionSheet = read('docs/test-session-sheet.md');
const interview = read('docs/interview-note-template.md');
for (const [name, text] of [['Session Sheet',sessionSheet],['Interview Template',interview]]) {
  assert.ok(!/^\s*(Tester Name|Name|Email|Employee ID|Account ID)\s*:/mi.test(text), `${name} must not introduce a direct identity input field`);
  assert.match(text,/Session ID:/,`${name} must use anonymous Session ID`);
  assert.match(text,/Beginner\s*\/\s*Basic\s*\/\s*Experienced/,`${name} must use coarse tester groups`);
}

const decision = read('docs/result-review-decision-framework.md');
for (const outcome of [
  'FIX NOW','CHANGE MISSION ONLY','CHANGE UI / LEARNING MODEL','ADD ALTERNATE SOLUTION',
  'CHANGE RUBRIC','OBSERVE MORE','KEEP AS-IS','ESCALATE TECHNICAL REVIEW'
]) {
  assert.ok(decision.includes(outcome), `Decision Framework missing outcome: ${outcome}`);
}
assert.ok(decision.includes('Do Not Change'), 'Decision Framework must explicitly preserve a Do Not Change decision');

const aggregation = read('docs/report-aggregation.md');
assert.ok(aggregation.includes('result-review-decision-framework.md'), 'Aggregation doc must hand off to Decision Framework');
assert.ok(aggregation.includes('test-session-sheet.md'), 'Aggregation doc must cross-check Session Sheet');
assert.ok(aggregation.includes('interview-note-template.md'), 'Aggregation doc must cross-check Interview notes');

const scoring = read('docs/assessment-scoring.md');
assert.ok(scoring.includes('result-review-decision-framework.md'), 'Assessment scoring changes must use Decision Framework');
assert.match(scoring,/multiple Assessment Missions/i,'Global Rubric change control must require repeated Assessment evidence');

const facilitator = read('facilitator.html');
for (const path of ['first-internal-test-cycle.md','test-session-sheet.md','interview-note-template.md','result-review-decision-framework.md']) {
  assert.ok(facilitator.includes(path), `Facilitator Console missing operations document: ${path}`);
}

console.log('Internal test operations documentation contract passed.');
