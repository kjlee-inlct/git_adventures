import assert from 'node:assert/strict';
import { loadContent, simulateDirectMission } from './test-helpers.mjs';

const content = loadContent();

const expected = {
  'foundations.inspect.001': {
    branch: 'main',
    working: ['src/device.py'],
    staged: [],
    head: 'a41c92e Initial device controller'
  },
  'foundations.diff.001': {
    branch: 'main',
    working: ['src/device.py'],
    staged: [],
    head: 'a41c92e Initial device controller'
  },
  'foundations.stage.001': {
    branch: 'main',
    working: ['debug.log'],
    staged: ['README.md'],
    head: 'a13f0d2 Add project overview'
  },
  'foundations.commit.001': {
    branch: 'fix/serial-timeout',
    working: [],
    staged: [],
    head: 'c182bb7 Fix serial timeout handling'
  },
  'workflow.branch.001': {
    branch: 'feature/firmware-download',
    working: [],
    staged: [],
    head: 'c182bb7 Fix serial timeout handling'
  },
  'workflow.atomic.001': {
    branch: 'feature/firmware-download',
    working: ['notes.md'],
    staged: [],
    head: '8bf210c Add firmware block transfer'
  },
  'recovery.unstage.001': {
    branch: 'main',
    working: ['debug.log'],
    staged: ['README.md'],
    head: 'a13f0d2 Add project overview'
  },
  'recovery.shared.001': {
    branch: 'main',
    working: [],
    staged: [],
    head: "f0e91aa Revert 'Break production config'"
  }
};

for (const mission of content.missions) {
  const golden = expected[mission.id];
  assert.ok(golden, `${mission.id}: missing golden expectation`);

  const { state, commands } = simulateDirectMission(mission);
  assert.equal(state.branch, golden.branch, `${mission.id}: branch mismatch`);
  assert.deepEqual(state.working.map(file => file.name).sort(), [...golden.working].sort(), `${mission.id}: working tree mismatch`);
  assert.deepEqual(state.staged.map(file => file.name).sort(), [...golden.staged].sort(), `${mission.id}: staging mismatch`);
  assert.equal(state.commits[0], golden.head, `${mission.id}: HEAD/history mismatch`);
  assert.equal(commands.length, mission.steps.length, `${mission.id}: command count should match step count`);
}

console.log(`Golden-tested ${content.missions.length} missions.`);
