import assert from 'node:assert/strict';
import { loadContent, clone, normalizeState, applyAction, simulateDirectMission } from './test-helpers.mjs';

const { missions } = loadContent();
const byId = Object.fromEntries(missions.map(mission => [mission.id, mission]));

{
  const mission = byId['release.approved-merge.001'];
  const state = normalizeState(clone(mission.initial));
  state.reviewGate = { approved: false, evidence: true };
  const before = state.commits[0];
  applyAction(state, { type: 'mergeApprovedHotfix', hotfixCommit: '1440b11 Restore stable reconnect behavior', mergeCommit: '1440c21 Merge hotfix/1.4.4' });
  assert.equal(state.commits[0], before, 'Hotfix merge must not proceed without approval');
}

{
  const mission = byId['release.publish-tag.001'];
  const state = normalizeState(clone(mission.initial));
  assert.ok(state.tags.includes('v1.4.4@1440c21'), 'v1.4.4 must exist locally before publication');
  assert.ok(!state.publishedTags.includes('v1.4.4@1440c21'), 'Local tag must not imply remote publication');
  applyAction(state, { type: 'publishTag', tag: 'v1.4.4' });
  assert.ok(state.publishedTags.includes('v1.4.4@1440c21'), 'Explicit tag push must publish the release identity');
  assert.ok(state.publishedTags.includes('v1.4.3@1430f01'), 'Publishing v1.4.4 must not move or remove v1.4.3');
}

{
  const state = simulateDirectMission(byId['release.propagate-main.001']).state;
  assert.match(state.commits[0], /^2200e20 /, 'Final incident recovery must be propagated to main');
  assert.equal(state.branch, 'main', 'Propagation mission must finish on main');
}

{
  const state = simulateDirectMission(byId['release.review-evidence.001']).state;
  assert.deepEqual(state.reviewGate, { evidence: true, approved: true }, 'Review evidence must satisfy the scenario approval gate');
}

{
  const state = simulateDirectMission(byId['release.closure-check.001']).state;
  assert.ok(state.publishedTags.includes('v1.4.4@1440c21'), 'Incident closure requires the recovery tag to be published');
  assert.ok(state.commits.some(commit => commit.startsWith('2200e20 ')), 'Incident closure requires recovery on main');
}

console.log('Release governance invariant tests passed.');
