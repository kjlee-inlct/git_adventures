import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const context={window:{}};vm.createContext(context);
for(const file of [
  '../content/missions.js','../content/missions-daily.js','../content/missions-collaboration.js',
  '../content/missions-conflicts.js','../content/missions-advanced.js','../content/missions-release.js',
  '../content/missions-incidents.js','../content/missions-governance.js','../content/missions-assessment.js',
  '../assessment-scoring.js'
]){
  vm.runInContext(fs.readFileSync(new URL(file,import.meta.url),'utf8'),context,{filename:file});
}

const content=context.window.GIT_ADVENTURES_CONTENT;
const score=context.window.GIT_ADVENTURES_ASSESSMENT_SCORING?.scoreAssessment;
assert.equal(typeof score,'function','Assessment scoring function must be exported');
const assessments=content.missions.filter(m=>m.assessment);
assert.equal(assessments.length,4,'Expected four assessment missions');

for(const mission of assessments){
  const r=mission.assessmentRubric;
  assert.ok(r,`${mission.id}: assessmentRubric required`);
  assert.equal(Object.values(r.weights).reduce((a,b)=>a+b,0),100,`${mission.id}: rubric weights must total 100`);
  for(const axis of ['judgment','safety','evidence','efficiency'])assert.ok(Number.isFinite(r.weights[axis]),`${mission.id}: ${axis} weight required`);
  assert.ok(r.passScore>=0&&r.passScore<=100,`${mission.id}: passScore must be 0..100`);
  assert.ok(r.criticalSafetyFloor>=0&&r.criticalSafetyFloor<=100,`${mission.id}: safety floor must be 0..100`);
  assert.ok(r.rationale?.en&&r.rationale?.ko,`${mission.id}: bilingual rubric rationale required`);
}

const byId=Object.fromEntries(assessments.map(m=>[m.id,m]));

{
  const m=byId['assessment.recovery-decision.001'];
  const result=score(m,['git revert 1430f01']);
  assert.equal(result.total,100,'Correct recovery decision should score 100');
  assert.equal(result.passed,true,'Correct recovery decision must pass');
  assert.equal(result.axes.safety,100);
}
{
  const m=byId['assessment.recovery-decision.001'];
  const result=score(m,['git push --force','git revert 1430f01']);
  assert.ok(result.axes.safety<100,'Unsafe history rewrite attempt must reduce Safety');
  assert.equal(result.passed,false,'Critical unsafe attempt must fail the safety floor');
}
{
  const m=byId['assessment.release-closure.001'];
  const complete=score(m,['git status','git log --oneline']);
  const incomplete=score(m,['git log --oneline']);
  assert.equal(complete.axes.evidence,100,'Complete closure inspection must earn full Evidence');
  assert.equal(complete.total,100,'Complete closure assessment should score 100');
  assert.equal(incomplete.axes.evidence,50,'Missing one required inspection must halve Evidence');
  assert.ok(incomplete.total<complete.total,'Missing evidence must reduce total score');
}
{
  const m=byId['assessment.merge-policy.001'];
  const result=score(m,['git status','git merge --no-ff hotfix/1.4.4']);
  assert.equal(result.axes.efficiency,100,'Useful inspection must not reduce Efficiency');
  assert.equal(result.passed,true);
}
{
  const m=byId['assessment.release-line.001'];
  const result=score(m,['git status','git log --oneline','git cherry-pick 8cf4300']);
  assert.equal(result.axes.efficiency,100,'Evidence gathering should not be treated as inefficiency');
  assert.equal(result.axes.judgment,100);
}

const engineSource=fs.readFileSync(new URL('../engine-assessment.js',import.meta.url),'utf8');
assert.ok(engineSource.includes('Judgment'),'Assessment Debrief must expose Judgment axis');
assert.ok(engineSource.includes('Efficiency'),'Assessment Debrief must expose Efficiency axis');
assert.ok(engineSource.includes('scoreAssessment'),'Assessment UI must use shared scoring function');
console.log('Assessment scoring rubric validation passed.');
