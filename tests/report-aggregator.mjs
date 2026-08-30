import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const context={window:{},Date};vm.createContext(context);
vm.runInContext(fs.readFileSync(new URL('../report-aggregator.js',import.meta.url),'utf8'),context,{filename:'report-aggregator.js'});
const api=context.window.GIT_ADVENTURES_REPORT_AGGREGATOR;
assert.ok(api,'aggregator API missing');

function report(group,id,attempts){return{schemaVersion:1,sessionId:id,testerGroup:group,privacy:{piiCollected:false},attempts};}
function guided(id,{duration=10000,first=1000,hints=0,inspections=1,unsafe=0,detours=0,wrong=0,completed=true}={}){return{
 missionId:id,track:'Foundations',assessment:false,completedAt:completed?'2026-08-30T00:00:10Z':null,abandonedAt:completed?null:'2026-08-30T00:00:10Z',durationMs:duration,hintCount:hints,inspections,unsafeAttempts:unsafe,detours,wrongAttempts:wrong,
 commandTrace:[{atMs:first,command:'git status',category:'inspection'}],guidedScore:completed?{mastery:90,safety:100}:null,assessmentScore:null
};}
function assessment(id,total,axes,passed=true){return{
 missionId:id,track:'Assessment',assessment:true,completedAt:'2026-08-30T00:00:20Z',abandonedAt:null,durationMs:20000,hintCount:0,inspections:2,unsafeAttempts:0,detours:0,wrongAttempts:0,
 commandTrace:[{atMs:2000,command:'git status',category:'inspection'},{atMs:4000,command:'git log --oneline',category:'inspection'}],guidedScore:null,assessmentScore:{total,axes,passed}
};}

const inputs=[
 report('Beginner','b1',[guided('foundations.inspect.001',{duration:12000,first:3000,hints:1}),guided('foundations.diff.001',{duration:18000,first:5000,unsafe:1,wrong:1}),assessment('assessment.release-closure.001',78,{judgment:80,safety:90,evidence:70,efficiency:70},true)]),
 report('Beginner','b2',[guided('foundations.inspect.001',{duration:8000,first:1000}),guided('foundations.diff.001',{duration:10000,first:2000,completed:false})]),
 report('Basic','m1',[guided('foundations.inspect.001',{duration:6000,first:800}),assessment('assessment.release-closure.001',92,{judgment:95,safety:100,evidence:90,efficiency:80},true)]),
 report('Experienced','e1',[guided('foundations.inspect.001',{duration:4000,first:500}),assessment('assessment.release-closure.001',98,{judgment:100,safety:100,evidence:95,efficiency:95},true)]),
 {schemaVersion:99,sessionId:'bad-schema',testerGroup:'Beginner',privacy:{piiCollected:false},attempts:[]},
 {schemaVersion:1,sessionId:'bad-privacy',testerGroup:'Basic',privacy:{piiCollected:true},attempts:[]}
];

const aggregate=api.aggregateReports(inputs);
assert.equal(aggregate.acceptedReports,4,'valid reports must be accepted');
assert.equal(aggregate.rejectedReports.length,2,'invalid reports must be rejected');
assert.equal(aggregate.groups.Beginner.sessions,2);
assert.equal(aggregate.groups.Basic.sessions,1);
assert.equal(aggregate.groups.Experienced.sessions,1);
assert.equal(aggregate.groups.Beginner.attempts,5);
assert.equal(aggregate.groups.Beginner.completed,4);
assert.equal(aggregate.groups.Beginner.completionRate,80);
assert.equal(aggregate.groups.Beginner.timeToFirstCommandMs.median,3000);
assert.equal(aggregate.groups.Beginner.timeToFirstCommandMs.p75,5000);
assert.equal(aggregate.groups.Beginner.unsafeSessions,1);
assert.equal(aggregate.groups.Beginner.assessment.averageTotal,78);
assert.equal(aggregate.groups.Basic.assessment.axes.judgment.average,95);
assert.equal(aggregate.groups.Experienced.assessment.axes.evidence.average,95);
assert.equal(aggregate.groups.Experienced.assessment.passRate,100);

const mission=aggregate.missions.find(row=>row.missionId==='foundations.inspect.001');
assert.ok(mission,'mission aggregate missing');
assert.equal(mission.attempts,4);
assert.equal(mission.completionRate,100);
assert.equal(mission.medianFirstCommandMs,900);

const invalid=api.validateReport({schemaVersion:1,testerGroup:'Beginner',privacy:{piiCollected:true},attempts:[]});
assert.equal(invalid.valid,false,'PII-marked report must be rejected');
assert.ok(invalid.errors.some(error=>error.includes('piiCollected')));
assert.equal(aggregate.privacy.aggregationLevel,'testerGroup');
console.log('Local report aggregator validation passed.');
