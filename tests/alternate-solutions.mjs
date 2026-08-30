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
{
 const m=byId['recovery.rebase-abort.001'],initial=normalizeState(clone(m.initial)),state=normalizeState(clone(m.initial));applyAction(state,{type:'startRebaseConflict',file:'config/calibration.json',base:'bb82002 Update factory calibration'});assert.equal(state.operation?.type,'rebase');assert.equal(state.conflicts.length,1);applyAction(state,{type:'abortOperation',operation:'rebase'});assert.equal(fingerprint(state),fingerprint(initial),'Rebase abort must restore exact pre-operation state');
}
{
 const m=byId['recovery.merge-abort.001'],initial=normalizeState(clone(m.initial)),state=normalizeState(clone(m.initial));applyAction(state,{type:'startMergeConflict',file:'src/power_state.py',remoteCommit:'20bc901 Update power transitions'});assert.equal(state.operation?.type,'merge');assert.equal(state.conflicts.length,1);applyAction(state,{type:'abortOperation',operation:'merge'});assert.equal(fingerprint(state),fingerprint(initial),'Merge abort must restore exact pre-operation state');
}
{
 const m=byId['collaboration.force-with-lease.001'],state=normalizeState(clone(m.initial));state.remote.actualHead='unexpected999';const before=state.remote.actualHead;applyAction(state,{type:'forcePushWithLease'});assert.equal(state.remote.actualHead,before,'Lease mismatch must not overwrite unexpected remote work');assert.equal(state.remote.rejected,'lease-mismatch','Lease mismatch must be explicit');
}
{
 const m=byId['workflow.switch-blocked.001'],state=normalizeState(clone(m.initial)),before=fingerprint(state);applyAction(state,{type:'switchBlocked',target:'main',file:'src/device.py'});assert.equal(state.branch,m.initial.branch,'Blocked switch must not change branch');assert.equal(JSON.stringify(state.working),JSON.stringify(clone(m.initial.working)),'Blocked switch must preserve WIP');assert.notEqual(fingerprint(state),before,'Blocked switch should record the guardrail event');applyAction(state,{type:'stashPush',message:'WIP device calibration'});applyAction(state,{type:'clearBlockedSwitch'});assert.equal(state.working.length,0,'Stash must clean Working Tree before switch');
}
{
 const m=byId['collaboration.rebase-multifile.001'],state=normalizeState(clone(m.initial));applyAction(state,{type:'startRebaseConflict',files:['src/transfer.py','tests/test_transfer.py'],base:'9cd991a Teammate update'});assert.deepEqual([...state.conflicts].sort(),['src/transfer.py','tests/test_transfer.py'].sort(),'Both conflict paths must be tracked');applyAction(state,{type:'resolveConflict',file:'src/transfer.py'});const head=state.commits[0];applyAction(state,{type:'continueRebase',base:'9cd991a Teammate update',rewritten:'d55ea31 Fix firmware checksum retry'});assert.equal(state.commits[0],head,'Rebase must not continue while any conflict remains');assert.equal(state.operation?.type,'rebase','Rebase operation must remain active until all conflicts resolve');
}
{
 const m=byId['collaboration.rebase-skip.001'],state=normalizeState(clone(m.initial));const dropped=state.commits[0];applyAction(state,{type:'startRebaseConflict',file:'config/defaults.json',base:'cd88120 Finalize team defaults'});applyAction(state,{type:'skipRebase',base:'cd88120 Finalize team defaults'});assert.equal(state.operation,null,'Skip must end the current rebase operation');assert.equal(state.conflicts.length,0,'Skip must clear current conflict state');assert.ok(!state.commits.some(commit=>commit===dropped),'Skipped commit must not remain in rebased history');assert.match(state.commits[0],/^cd88120 /,'Upstream base must become the resulting HEAD after skipping the only local commit');
}
{
 const m=byId['collaboration.merge-multifile.001'],state=normalizeState(clone(m.initial));applyAction(state,{type:'startMergeConflict',files:['src/device_alarm.py','tests/test_device_alarm.py'],remoteCommit:'52bd210 Update alarm handling'});assert.equal(state.conflicts.length,2,'Multi-file merge must track both conflicts');applyAction(state,{type:'resolveConflict',file:'src/device_alarm.py'});const head=state.commits[0];applyAction(state,{type:'continueMerge',remoteCommit:'52bd210 Update alarm handling',mergeCommit:'63ce310 Merge origin/integration/device'});assert.equal(state.commits[0],head,'Merge must not complete while any conflict remains');assert.equal(state.operation?.type,'merge','Merge operation must stay active until all conflicts resolve');
}
{
 const m=byId['release.cherry-pick-abort.001'],initial=normalizeState(clone(m.initial)),state=normalizeState(clone(m.initial));applyAction(state,{type:'startCherryPickConflict',source:'91cc310',file:'src/protocol.py',message:'Add protocol retry'});assert.equal(state.operation?.type,'cherry-pick','Cherry-pick conflict must enter operation state');assert.equal(state.conflicts.length,1,'Cherry-pick conflict must expose unmerged path');applyAction(state,{type:'abortOperation',operation:'cherry-pick'});assert.equal(fingerprint(state),fingerprint(initial),'Cherry-pick abort must restore exact release state');
}
{
 const state=simulateDirectMission(byId['release.backport-order.001']).state;assert.match(state.commits[0],/^14bd202 /,'Dependent fix must be newest backport commit');assert.match(state.commits[1],/^14bd201 /,'Dependency must be applied before dependent fix');
}
{
 const state=simulateDirectMission(byId['release.patch-tag.001']).state;assert.ok(state.tags.includes('v1.4.3@1430f01'),'Published bad-release tag must remain on original release commit');assert.ok(state.tags.includes('v1.4.4@1440a01'),'Recovery must receive a new patch tag');assert.equal(state.tags.filter(tag=>tag.startsWith('v1.4.3@')).length,1,'Published tag identity must not move or duplicate');
}
{
 const state=simulateDirectMission(byId['release.bad-release-revert.001']).state;assert.equal(state.commits[1],'1430f01 Backport serial reconnect fix','Revert must preserve the bad release commit in history for auditability');assert.match(state.commits[0],/^1440a01 Revert /,'Recovery must be represented by a new inverse commit');
}
console.log('Alternate solution and repository invariant tests passed.');
