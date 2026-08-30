import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { clone, normalizeState, applyActions } from './test-helpers.mjs';

const context={window:{}};vm.createContext(context);
for(const file of [
  '../content/missions.js','../content/missions-daily.js','../content/missions-collaboration.js',
  '../content/missions-conflicts.js','../content/missions-advanced.js','../content/missions-release.js',
  '../content/missions-incidents.js','../content/missions-governance.js','../content/missions-assessment.js'
]){
  vm.runInContext(fs.readFileSync(new URL(file,import.meta.url),'utf8'),context,{filename:file});
}
const content=context.window.GIT_ADVENTURES_CONTENT;
assert.equal(content.missions.length,44,'Playable browser curriculum must contain 44 missions');
const assessments=content.missions.filter(m=>m.track==='Assessment');
assert.equal(assessments.length,4,'Assessment Track must contain 4 missions');
assert.deepEqual(assessments.map(m=>m.number),[41,42,43,44],'Assessment mission numbering must be continuous');
for(const mission of assessments){
  assert.equal(mission.assessment,true,`${mission.id}: assessment flag required`);
  assert.ok(mission.hint?.en&&mission.hint?.ko,`${mission.id}: bilingual minimal hint required`);
  assert.ok(!/\bgit\s+/i.test(mission.hint.en),`${mission.id}: English assessment hint must not reveal a Git command`);
  assert.ok(!/\bgit\s+/i.test(mission.hint.ko),`${mission.id}: Korean assessment hint must not reveal a Git command`);
  assert.equal(mission.difficulty,5,`${mission.id}: assessment difficulty must be 5`);
}
const byId=Object.fromEntries(assessments.map(m=>[m.id,m]));
const commands={
  'assessment.recovery-decision.001':['git revert 1430f01'],
  'assessment.release-line.001':['git cherry-pick 8cf4300'],
  'assessment.merge-policy.001':['git merge --no-ff hotfix/1.4.4'],
  'assessment.release-closure.001':['git status','git log --oneline']
};
for(const [id,sequence] of Object.entries(commands)){
  const mission=byId[id];assert.ok(mission,`${id}: missing assessment mission`);
  assert.equal(sequence.length,mission.steps.length,`${id}: expected command count mismatch`);
  const state=normalizeState(clone(mission.initial));
  mission.steps.forEach((step,i)=>{
    assert.ok(step.accept.some(pattern=>new RegExp(pattern).test(sequence[i])),`${id}: expected command rejected: ${sequence[i]}`);
    applyActions(state,step.actions||[]);
  });
  if(id==='assessment.recovery-decision.001')assert.match(state.commits[0],/^1440a01 Revert /,'Assessment recovery must preserve history through revert');
  if(id==='assessment.release-line.001')assert.match(state.commits[0],/^1430f01 Backport /,'Assessment must backport to supported release line');
  if(id==='assessment.merge-policy.001')assert.match(state.commits[0],/^1440c21 Merge hotfix\/1\.4\.4/,'Assessment must preserve required hotfix merge boundary');
  if(id==='assessment.release-closure.001')assert.equal(state.commits[0],'2200e20 Propagate stable reconnect recovery','Closure assessment must verify durable recovery on main');
}
const assessmentEngine=fs.readFileSync(new URL('../engine-assessment.js',import.meta.url),'utf8');
assert.ok(assessmentEngine.includes('mission?.assessment'),'Assessment engine must explicitly detect assessment missions');
assert.ok(!assessmentEngine.includes('git revert 1430f01'),'Assessment engine must not hardcode answer commands');
console.log('Assessment Track validation passed for 4 missions.');
