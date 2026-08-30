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
'collaboration.merge-policy.001':{branch:'integration/device',working:[],staged:[],head:'7bd1010 Merge origin/integration/device',remote:{ahead:0,behind:0,actualHead:'7bd1010'}}
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
}
console.log(`Golden-tested ${content.missions.length} missions.`);
