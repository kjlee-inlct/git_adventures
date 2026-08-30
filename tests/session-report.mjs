import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const storage = new Map();
const localStorage = {
  getItem:key => storage.has(key) ? storage.get(key) : null,
  setItem:(key,value) => storage.set(key,String(value)),
  removeItem:key => storage.delete(key)
};
const context = { window:{}, localStorage, console, Math, Date };
vm.createContext(context);
vm.runInContext(fs.readFileSync(new URL('../session-report.js',import.meta.url),'utf8'),context,{filename:'session-report.js'});
const reporter = context.window.GIT_ADVENTURES_SESSION_REPORT;
assert.ok(reporter,'Session report API must be exposed');
assert.deepEqual([...reporter.TESTER_GROUPS],['Beginner','Basic','Experienced']);
assert.equal(reporter.classifyCommand('git status'),'inspection');
assert.equal(reporter.classifyCommand('git log --oneline'),'inspection');
assert.equal(reporter.classifyCommand('git push --force'),'unsafe');
assert.equal(reporter.classifyCommand('git cherry-pick 1234abc'),'mutation');
assert.throws(()=>reporter.createSession({testerGroup:'Unknown',locale:'ko',curriculumVersion:1,missionCount:44}));

let session = reporter.createSession({testerGroup:'Basic',locale:'ko',curriculumVersion:1,missionCount:44});
assert.equal(session.schemaVersion,1);
assert.equal(session.testerGroup,'Basic');
assert.equal(session.privacy.piiCollected,false);
assert.equal(session.attempts.length,0);

const guided={id:'foundations.inspect.001',number:1,track:'Foundations',difficulty:1,assessment:false};
reporter.startMission(session,guided,'ko');
session=reporter.loadSession();
reporter.recordCommand(session,'git status');
reporter.recordHint(session);
session=reporter.loadSession();
reporter.finishMission(session,guided,{mastery:90,safety:100,hints:1,detours:0,wrong:0,inspections:1},{mastery:90,safety:100},{branch:'main',head:'a41c92e Initial device controller',workingCount:1,stagedCount:0,conflictCount:0,stashCount:0,remote:{tracking:'origin/main',ahead:0,behind:0,rejected:null},tags:[],publishedTags:[]});
session=reporter.loadSession();
assert.equal(session.attempts[0].commandTrace[0].category,'inspection');
assert.ok(session.attempts[0].commandTrace[0].atMs>=0);
assert.equal(session.attempts[0].hintCount,1);
assert.equal(session.attempts[0].guidedScore.mastery,90);
assert.equal(session.attempts[0].assessmentScore,null);
assert.equal(session.attempts[0].finalState.branch,'main');

const assessment={id:'assessment.release-closure.001',number:44,track:'Assessment',difficulty:5,assessment:true};
reporter.startMission(session,assessment,'en');
session=reporter.loadSession();
reporter.recordCommand(session,'git status');
reporter.recordCommand(session,'git log --oneline');
session=reporter.loadSession();
const assessmentScore={axes:{judgment:100,safety:100,evidence:100,efficiency:100},total:100,passed:true};
reporter.finishMission(session,assessment,{mastery:100,safety:100,hints:0,detours:0,wrong:0,inspections:2},{assessment:assessmentScore},{branch:'main',head:'2200e20 Propagate stable reconnect recovery',workingCount:0,stagedCount:0,conflictCount:0,stashCount:0,remote:{tracking:'origin/main',ahead:0,behind:0,rejected:null},tags:['v1.4.4@1440c21'],publishedTags:['v1.4.4@1440c21']});
session=reporter.loadSession();
assert.deepEqual(JSON.parse(JSON.stringify(session.attempts[1].assessmentScore)),assessmentScore);
assert.equal(session.attempts[1].guidedScore,null);

reporter.endSession(session);
session=reporter.loadSession();
const report=reporter.buildReport(session);
assert.ok(report.endedAt);
assert.ok(report.generatedAt);
assert.equal(report.summary.attempts,2);
assert.equal(report.summary.completed,2);
assert.equal(report.summary.abandoned,0);
assert.equal(report.summary.hints,1);
assert.equal(report.summary.inspections,3);
assert.equal(report.summary.assessmentAverage,100);
assert.ok(report.attempts.every(a=>!Object.hasOwn(a,'startedEpochMs')),'Report must not expose internal epoch bookkeeping');
const serialized=JSON.stringify(report);
for(const forbidden of ['"testerName"','"email"','"accountId"','"employeeId"'])assert.ok(!serialized.includes(forbidden),`Report must not collect PII field ${forbidden}`);

reporter.clearSession();
assert.equal(reporter.loadSession(),null);
console.log('Local usability session report validation passed.');
