import fs from 'node:fs';
import vm from 'node:vm';

export function loadContent() {
  const source = fs.readFileSync(new URL('../content/missions.js', import.meta.url), 'utf8');
  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(source, context, { filename: 'content/missions.js' });
  return context.window.GIT_ADVENTURES_CONTENT;
}

export function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function findFile(list, name) {
  return list.find(file => file.name === name);
}

function moveFiles(state, sourceKey, targetKey, names) {
  for (const name of names) {
    const source = state[sourceKey];
    const index = source.findIndex(file => file.name === name);
    if (index < 0) continue;
    const [file] = source.splice(index, 1);
    if (!findFile(state[targetKey], name)) state[targetKey].push(file);
  }
}

export function applyAction(state, action) {
  switch (action.type) {
    case 'stage':
      moveFiles(state, 'working', 'staged', action.files);
      break;
    case 'unstage':
      moveFiles(state, 'staged', 'working', action.files);
      break;
    case 'stageAll':
      moveFiles(state, 'working', 'staged', state.working.map(file => file.name));
      break;
    case 'commit':
      state.staged = [];
      state.commits.unshift(`${action.sha} ${action.message}`);
      break;
    case 'branch':
      state.branch = action.name;
      break;
    case 'prependCommit':
      state.commits.unshift(action.value);
      break;
    default:
      throw new Error(`Unsupported action type in test helper: ${action.type}`);
  }
}

export function applyActions(state, actions = []) {
  for (const action of actions) applyAction(state, action);
}

export function fingerprint(state) {
  return JSON.stringify({
    branch: state.branch,
    working: state.working.map(file => [file.name, file.status]).sort(),
    staged: state.staged.map(file => [file.name, file.status]).sort(),
    commits: state.commits
  });
}

export function firstAcceptedCommand(step) {
  const pattern = step.accept?.[0];
  if (!pattern) throw new Error('Step has no accepted command pattern');

  const known = new Map([
    ['^git\\s+status$', 'git status'],
    ['^git\\s+diff$', 'git diff'],
    ['^git\\s+add\\s+README\\.md$', 'git add README.md'],
    ['^git\\s+commit\\s+-m\\s+[\"\']Fix serial timeout handling[\"\']$', 'git commit -m "Fix serial timeout handling"'],
    ['^git\\s+switch\\s+-c\\s+feature/firmware-download$', 'git switch -c feature/firmware-download'],
    ['^git\\s+add\\s+src/transfer\\.py\\s+tests/test_transfer\\.py$', 'git add src/transfer.py tests/test_transfer.py'],
    ['^git\\s+diff\\s+--staged$', 'git diff --staged'],
    ['^git\\s+commit\\s+-m\\s+[\"\']Add firmware block transfer[\"\']$', 'git commit -m "Add firmware block transfer"'],
    ['^git\\s+restore\\s+--staged\\s+debug\\.log$', 'git restore --staged debug.log'],
    ['^git\\s+revert\\s+bad1234$', 'git revert bad1234']
  ]);

  const command = known.get(pattern);
  if (!command) throw new Error(`No golden command fixture for pattern: ${pattern}`);
  return command;
}

export function commandMatches(step, command) {
  return step.accept.some(pattern => new RegExp(pattern).test(command));
}

export function simulateDirectMission(mission) {
  const state = clone(mission.initial);
  const commands = [];

  for (const step of mission.steps) {
    const command = firstAcceptedCommand(step);
    if (!commandMatches(step, command)) {
      throw new Error(`${mission.id}: golden command does not match step: ${command}`);
    }
    commands.push(command);
    applyActions(state, step.actions);
  }

  return { state, commands };
}
