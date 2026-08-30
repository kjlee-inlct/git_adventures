import fs from 'node:fs';
import vm from 'node:vm';

export function loadContent() {
  const context = { window: {} };
  vm.createContext(context);
  for (const file of ['../content/missions.js', '../content/missions-daily.js']) {
    const source = fs.readFileSync(new URL(file, import.meta.url), 'utf8');
    vm.runInContext(source, context, { filename: file });
  }
  return context.window.GIT_ADVENTURES_CONTENT;
}
export const clone = value => JSON.parse(JSON.stringify(value));
export function normalizeState(state) {
  state.working ||= []; state.staged ||= []; state.commits ||= []; state.stashes ||= [];
  state.remote ||= { name:'origin', tracking:null, knownHead:null, actualHead:null, ahead:0, behind:0, fetched:false };
  return state;
}
function findFile(list, name) { return list.find(file => file.name === name); }
function moveFiles(state, sourceKey, targetKey, names) {
  for (const name of names) { const index = state[sourceKey].findIndex(file => file.name === name); if (index < 0) continue; const [file] = state[sourceKey].splice(index,1); if (!findFile(state[targetKey],name)) state[targetKey].push(file); }
}
export function applyAction(state, action) {
  normalizeState(state);
  switch(action.type) {
    case 'stage': moveFiles(state,'working','staged',action.files); break;
    case 'unstage': moveFiles(state,'staged','working',action.files); break;
    case 'stageAll': moveFiles(state,'working','staged',state.working.map(f=>f.name)); break;
    case 'commit': state.staged=[]; state.commits.unshift(`${action.sha} ${action.message}`); state.remote.ahead=(state.remote.ahead||0)+1; break;
    case 'branch': case 'switchBranch': state.branch=action.name; break;
    case 'prependCommit': state.commits.unshift(action.value); break;
    case 'fetch': state.remote.fetched=true; state.remote.knownHead=state.remote.actualHead; break;
    case 'pull': state.remote.fetched=true; state.remote.knownHead=state.remote.actualHead; state.remote.behind=0; if(!state.commits.includes(action.commit))state.commits.unshift(action.commit); break;
    case 'pushUpstream': state.remote.tracking=`origin/${action.branch}`; state.remote.knownHead=state.commits[0]?.split(' ')[0]||null; state.remote.actualHead=state.remote.knownHead; state.remote.ahead=0; state.remote.behind=0; state.remote.fetched=true; break;
    case 'stashPush': state.stashes.unshift({message:action.message,working:clone(state.working),staged:clone(state.staged)}); state.working=[]; state.staged=[]; break;
    case 'stashPop': { const stash=state.stashes.shift(); if(stash){state.working=[...stash.working,...state.working];state.staged=[...stash.staged,...state.staged];} break; }
    default: throw new Error(`Unsupported action type in test helper: ${action.type}`);
  }
}
export function applyActions(state, actions=[]) { for(const action of actions)applyAction(state,action); }
export function fingerprint(value) {
  const state=normalizeState(clone(value));
  return JSON.stringify({branch:state.branch,working:state.working.map(f=>[f.name,f.status]).sort(),staged:state.staged.map(f=>[f.name,f.status]).sort(),commits:state.commits,remote:state.remote,stashes:state.stashes.map(s=>[s.message,s.working.map(f=>f.name).sort(),s.staged.map(f=>f.name).sort()])});
}
export function firstAcceptedCommand(step) {
  const pattern=step.accept?.[0]; if(!pattern)throw new Error('Step has no accepted command pattern');
  const known=new Map([
    ['^git\\s+status$','git status'],['^git\\s+diff$','git diff'],['^git\\s+add\\s+README\\.md$','git add README.md'],
    ['^git\\s+commit\\s+-m\\s+[\"\']Fix serial timeout handling[\"\']$','git commit -m "Fix serial timeout handling"'],
    ['^git\\s+switch\\s+-c\\s+feature/firmware-download$','git switch -c feature/firmware-download'],
    ['^git\\s+add\\s+src/transfer\\.py\\s+tests/test_transfer\\.py$','git add src/transfer.py tests/test_transfer.py'],
    ['^git\\s+diff\\s+--staged$','git diff --staged'],['^git\\s+commit\\s+-m\\s+[\"\']Add firmware block transfer[\"\']$','git commit -m "Add firmware block transfer"'],
    ['^git\\s+restore\\s+--staged\\s+debug\\.log$','git restore --staged debug.log'],['^git\\s+revert\\s+bad1234$','git revert bad1234'],
    ['^git\\s+fetch\\s+origin$','git fetch origin'],['^git\\s+pull$','git pull'],
    ['^git\\s+push\\s+-u\\s+origin\\s+feature/firmware-download$','git push -u origin feature/firmware-download'],
    ['^git\\s+stash\\s+push\\s+-m\\s+[\"\']WIP power check[\"\']$','git stash push -m "WIP power check"'],
    ['^git\\s+switch\\s+main$','git switch main'],['^git\\s+stash\\s+pop$','git stash pop']
  ]);
  const command=known.get(pattern); if(!command)throw new Error(`No golden command fixture for pattern: ${pattern}`); return command;
}
export function commandMatches(step,command){return step.accept.some(pattern=>new RegExp(pattern).test(command));}
export function simulateDirectMission(mission){const state=normalizeState(clone(mission.initial)),commands=[];for(const step of mission.steps){const command=firstAcceptedCommand(step);if(!commandMatches(step,command))throw new Error(`${mission.id}: golden command does not match step: ${command}`);commands.push(command);applyActions(state,step.actions);}return{state,commands};}
