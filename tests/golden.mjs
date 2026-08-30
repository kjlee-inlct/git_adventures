import assert from 'node:assert/strict';
import { loadContent, simulateDirectMission } from './test-helpers.mjs';
const content=loadContent();
const expected={
'foundations.inspect.001':{branch:'main',working:['src/device.py'],staged:[],head:'a41c92e Initial device controller'},
'foundations.diff.001':{branch:'main',working:['src/device.py'],staged:[],head:'a41c92e Initial device controller'},
'foundations.stage.001':{branch:'main',working:['debug.log'],staged:['README.md'],head:'a13f0d2 Add project overview'},
'foundations.commit.001':{branch:'fix/serial-timeout',working:[],staged:[],head:'c182bb7 Fix serial timeout handling'},
'workflow.branch.001':{branch:'feature/firmware-download',working:[],staged:[],head:'c182bb7 Fix serial timeout handling'},
'workflow.atomic.001':{branch:'feature/firmware-download',working:['notes.md'],staged:[],head:'8bf210c Add firmware block transfer'},
'recovery.unstage.001':{branch:'docs/setup-guide',working:['debug.log'],staged:['README.md'],head:'a13f0d2 Add project overview'},
'recovery.shared.001':{branch:'main',working:[],staged:[],head:"f0e91aa Revert 'Break production config'"},
'workflow.fetch.001':{branch:'main',working:[],staged:[],head:'c182bb7 Fix serial timeout handling',remote:{knownHead:'d901c42',behind:1,fetched:true}},
'workflow.pull.001':{branch:'main',working:[],staged:[],head:'d901c42 Update provisioning defaults',remote:{knownHead:'d901c42',behind:0,fetched:true}},
'workflow.push.001':{branch:'feature/firmware-download',working:[],staged:[],head:'8bf210c Add firmware block transfer',remote:{tracking:'origin/feature/firmware-download',ahead:0,behind:0}},
'workflow.stash.001':{branch:'main',working:[],staged:[],head:'a77d901 Add power supply interface',stashCount:1},
'recovery.stash.001':{branch:'feature/power-check',working:['src/power.py','tests/test_power.py'],staged:[],head:'a77d901 Add power supply interface',stashCount:0},
'workflow.push-reject.001':{branch:'feature/firmware-download',working:[],staged:[],head:'f22a010 Fix firmware checksum retry',remote:{knownHead:'9cd991a',ahead:1,behind:1,fetched:true,rejected:null}},
'collaboration.divergence.001':{branch:'feature/firmware-download',working:[],staged:[],head:'f22a010 Fix firmware checksum retry',remote:{ahead:1,behind:1,fetched:true}},
'collaboration.rebase.001':{branch:'feature/firmware-download',working:[],staged:[],head:'a31bc77 Fix firmware checksum retry',remote:{ahead:0,behind:0,actualHead:'a31bc77'}},
'recovery.stash-conflict.001':{branch:'feature/power-check',working:[],staged:['src/power.py'],head:'bb810e2 Adjust power sequencing',stashCount:0,conflictCount:0},
'collaboration.merge-policy.001':{branch:'integration/device',working:[],staged:[],head:'7bd1010 Merge origin/integration/device',remote:{ahead:0,behind:0,actualHead:'7bd1010'}},
'collaboration.rebase-conflict.001':{branch:'feature/protocol-retry',working:[],staged:[],head:'91cc310 Add protocol retry',remote:{ahead:1,behind:0},conflictCount:0,operation:null},
'recovery.rebase-abort.001':{branch:'feature/calibration',working:[],staged:[],head:'aa71001 Adjust calibration defaults',remote:{ahead:1,behind:1},conflictCount:0,operation:null},
'collaboration.merge-conflict.001':{branch:'integration/device',working:[],staged:[],head:'d711010 Merge origin/integration/device',remote:{ahead:1,behind:0},conflictCount:0,operation:null},
'recovery.merge-abort.001':{branch:'integration/power',working:[],staged:[],head:'10ab900 Integrate power telemetry',remote:{ahead:1,behind:1},conflictCount:0,operation:null},
'collaboration.force-with-lease.001':{branch:'feature/private-cleanup',working:[],staged:[],head:'cc91003 Cleanup retry state',remote:{ahead:0,behind:0,actualHead:'cc91003',rejected:null},conflictCount:0,operation:null},
'workflow.switch-blocked.001':{branch:'main',working:[],staged:[],head:'a41c92e Initial device controller',stashCount:1,conflictCount:0,operation:null,blockedSwitch:null},
'collaboration.rebase-multifile.001':{branch:'feature/firmware-download',working:[],staged:[],head:'d55ea31 Fix firmware checksum retry',remote:{ahead:1,behind:0},conflictCount:0,operation:null},
'collaboration.rebase-skip.001':{branch:'feature/default-tuning',working:[],staged:[],head:'cd88120 Finalize team defaults',remote:{ahead:0,behind:0},conflictCount:0,operation:null},
'collaboration.merge-multifile.001':{branch:'integration/device',working:[],staged:[],head:'63ce310 Merge origin/integration/device',remote:{ahead:1,behind:0},conflictCount:0,operation:null},
'release.cherry-pick.001':{branch:'release/2.4',working:[],staged:[],head:'24cb711 Fix serial timeout handling',remote:{ahead:1,behind:0},conflictCount:0,operation:null},
'release.cherry-pick-conflict.001':{branch:'release/2.4',working:[],staged:[],head:'24bc821 Add firmware block transfer',remote:{ahead:1,behind:0},conflictCount:0,operation:null},
'release.cherry-pick-abort.001':{branch:'release/2.4',working:[],staged:[],head:'240aa10 Release 2.4.3',remote:{ahead:0,behind:0},conflictCount:0,operation:null},
'release.backport-order.001':{branch:'release/1.4',working:[],staged:[],head:'14bd202 Backport packet bounds fix',remote:{ahead:2,behind:0}},
'release.hotfix-branch.001':{branch:'hotfix/1.4.3',working:[],staged:[],head:'1430f01 Backport serial reconnect fix',remote:{ahead:1,behind:0}},
'release.tag.001':{branch:'hotfix/1.4.3',working:[],staged:[],head:'1430f01 Backport serial reconnect fix',tags:['v1.4.2@1400abc','v1.4.3@1430f01']},
'release.bad-release-revert.001':{branch:'release/1.4',working:[],staged:[],head:"1440a01 Revert 'Backport serial reconnect fix'",tags:['v1.4.2@1400abc','v1.4.3@1430f01']},
'release.patch-tag.001':{branch:'release/1.4',working:[],staged:[],head:"1440a01 Revert 'Backport serial reconnect fix'",tags:['v1.4.2@1400abc','v1.4.3@1430f01','v1.4.4@1440a01']},
'release.review-evidence.001':{branch:'hotfix/1.4.4',working:[],staged:[],head:'1440b11 Restore stable reconnect behavior',reviewGate:{approved:true,evidence:true}},
'release.approved-merge.001':{branch:'release/1.4',working:[],staged:[],head:'1440c21 Merge hotfix/1.4.4',remote:{ahead:1,behind:0},reviewGate:{approved:true,evidence:true}},
'release.publish-tag.001':{branch:'release/1.4',working:[],staged:[],head:'1440c21 Merge hotfix/1.4.4',tags:['v1.4.3@1430f01','v1.4.4@1440c21'],publishedTags:['v1.4.3@1430f01','v1.4.4@1440c21']},
'release.propagate-main.001':{branch:'main',working:[],staged:[],head:'2200e20 Propagate stable reconnect recovery',remote:{ahead:1,behind:0}},
'release.closure-check.001':{branch:'main',working:[],staged:[],head:'2200e20 Propagate stable reconnect recovery',publishedTags:['v1.4.3@1430f01','v1.4.4@1440c21'],reviewGate:{approved:true,evidence:true}}
};
for(const mission of content.missions){
 const golden=expected[mission.id];assert.ok(golden,`${mission.id}: missing golden expectation`);const {state,commands}=simulateDirectMission(mission);
 assert.equal(state.branch,golden.branch,`${mission.id}: branch mismatch`);
 assert.deepEqual(state.working.map(f=>f.name).sort(),[...golden.working].sort(),`${mission.id}: working tree mismatch`);
 assert.deepEqual(state.staged.map(f=>f.name).sort(),[...golden.staged].sort(),`${mission.id}: staging mismatch`);
 assert.equal(state.commits[0],golden.head,`${mission.id}: HEAD/history mismatch`);
 assert.equal(commands.length,mission.steps.length,`${mission.id}: command count mismatch`);
 if(golden.remote)for(const [k,v] of Object.entries(golden.remote))assert.equal(state.remote[k],v,`${mission.id}: remote.${k} mismatch`);
 if(golden.stashCount!==undefined)assert.equal(state.stashes.length,golden.stashCount,`${mission.id}: stash count mismatch`);
 if(golden.conflictCount!==undefined)assert.equal(state.conflicts.length,golden.conflictCount,`${mission.id}: conflict count mismatch`);
 if(Object.prototype.hasOwnProperty.call(golden,'operation'))assert.equal(state.operation,golden.operation,`${mission.id}: operation mismatch`);
 if(Object.prototype.hasOwnProperty.call(golden,'blockedSwitch'))assert.equal(state.blockedSwitch,golden.blockedSwitch,`${mission.id}: blockedSwitch mismatch`);
 if(golden.tags)assert.deepEqual([...state.tags].sort(),[...golden.tags].sort(),`${mission.id}: tags mismatch`);
 if(golden.publishedTags)assert.deepEqual([...state.publishedTags].sort(),[...golden.publishedTags].sort(),`${mission.id}: publishedTags mismatch`);
 if(golden.reviewGate)assert.deepEqual(state.reviewGate,golden.reviewGate,`${mission.id}: reviewGate mismatch`);
}
console.log(`Golden-tested ${content.missions.length} missions.`);
