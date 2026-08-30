import assert from 'node:assert/strict';
import { loadContent, clone, normalizeState, applyAction, fingerprint, simulateDirectMission } from './test-helpers.mjs';
const {missions}=loadContent();const byId=Object.fromEntries(missions.map(m=>[m.id,m]));
{
 const m=byId['foundations.stage.001'],direct=simulateDirectMission(m).state,alt=normalizeState(clone(m.initial));applyAction(alt,{type:'stageAll'});applyAction(alt,{type:'unstage',files:['debug.log']});assert.equal(fingerprint(alt),fingerprint(direct),'Selective staging detour should converge');
}
{
 const m=byId['workflow.atomic.001'],state=normalizeState(clone(m.initial));applyAction(state,{type:'stage',files:['tests/test_transfer.py','src/transfer.py']});applyAction(state,{type:'commit',sha:'8bf210c',message:'Add firmware block transfer'});assert.equal(fingerprint(state),fingerprint(simulateDirectMission(m).state),'Atomic commit filename order should not matter');
}
{
 const m=byId['recovery.unstage.001'],state=normalizeState(clone(m.initial)),before=state.staged.find(f=>f.name==='debug.log');applyAction(state,{type:'unstage',files:['debug.log']});const after=state.working.find(f=>f.name==='debug.log');assert.ok(before&&after);assert.equal(after.status,before.status,'Unstage must preserve file metadata');
}
{
 const m=byId['workflow.fetch.001'],state=normalizeState(clone(m.initial)),head=state.commits[0],branch=state.branch;applyAction(state,{type:'fetch'});assert.equal(state.commits[0],head,'Fetch must not move local HEAD');assert.equal(state.branch,branch,'Fetch must not switch branch');assert.equal(state.remote.knownHead,state.remote.actualHead,'Fetch must refresh remote-tracking head');
}
{
 const m=byId['workflow.stash.001'],state=normalizeState(clone(m.initial)),files=state.working.map(f=>f.name).sort();applyAction(state,{type:'stashPush',message:'WIP power check'});assert.equal(state.working.length,0);assert.equal(state.stashes.length,1);applyAction(state,{type:'stashPop'});assert.deepEqual(state.working.map(f=>f.name).sort(),files,'stash push/pop must restore WIP');assert.equal(state.stashes.length,0,'stash pop must consume top entry');
}
{
 const m=byId['recovery.stash-conflict.001'],state=normalizeState(clone(m.initial)),stashCount=state.stashes.length;applyAction(state,{type:'stashConflict',file:'src/power.py'});assert.equal(state.stashes.length,stashCount,'Conflicted stash pop must retain stash entry');assert.ok(state.conflicts.includes('src/power.py'),'Conflict must be explicit');applyAction(state,{type:'resolveConflict',file:'src/power.py'});assert.equal(state.conflicts.length,0,'Resolved file must leave conflict state');assert.ok(state.staged.some(f=>f.name==='src/power.py'),'Resolved conflict must be staged');
}
{
 const rebase=simulateDirectMission(byId['collaboration.rebase.001']).state,merge=simulateDirectMission(byId['collaboration.merge-policy.001']).state;assert.match(rebase.commits[0],/^a31bc77 /,'Rebase must rewrite local commit identity');assert.match(merge.commits[0],/^7bd1010 Merge /,'Merge policy must create merge commit');assert.notEqual(rebase.commits[0],merge.commits[0],'Merge and rebase must create visibly different history');
}
console.log('Alternate solution and repository invariant tests passed.');
