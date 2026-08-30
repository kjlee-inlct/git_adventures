import assert from 'node:assert/strict';
import { loadContent, clone, applyAction, fingerprint, simulateDirectMission } from './test-helpers.mjs';

const { missions } = loadContent();
const byId = Object.fromEntries(missions.map(mission => [mission.id, mission]));

{
  const mission = byId['foundations.stage.001'];
  const direct = simulateDirectMission(mission).state;
  const alternate = clone(mission.initial);

  applyAction(alternate, { type: 'stageAll' });
  applyAction(alternate, { type: 'unstage', files: ['debug.log'] });

  assert.equal(
    fingerprint(alternate),
    fingerprint(direct),
    'Selective staging detour should converge to the same target state'
  );
}

{
  const mission = byId['workflow.atomic.001'];
  const state = clone(mission.initial);

  applyAction(state, { type: 'stage', files: ['tests/test_transfer.py', 'src/transfer.py'] });
  applyAction(state, { type: 'commit', sha: '8bf210c', message: 'Add firmware block transfer' });

  const direct = simulateDirectMission(mission).state;
  assert.equal(
    fingerprint(state),
    fingerprint(direct),
    'Atomic commit should allow either filename order when resulting state is equivalent'
  );
}

{
  const mission = byId['recovery.unstage.001'];
  const initial = clone(mission.initial);
  const debugBefore = initial.staged.find(file => file.name === 'debug.log');
  applyAction(initial, { type: 'unstage', files: ['debug.log'] });
  const debugAfter = initial.working.find(file => file.name === 'debug.log');

  assert.ok(debugBefore, 'Recovery fixture must start with debug.log staged');
  assert.ok(debugAfter, 'Unstage must preserve debug.log in the working tree');
  assert.equal(debugAfter.status, debugBefore.status, 'Unstage must preserve file status/content metadata');
}

console.log('Alternate solution and recovery convergence tests passed.');
