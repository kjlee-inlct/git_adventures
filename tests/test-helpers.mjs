import fs from 'node:fs';
import vm from 'node:vm';

export function loadContent(){
  const context={window:{}};vm.createContext(context);
  for(const file of ['../content/missions.js','../content/missions-daily.js','../content/missions-collaboration.js','../content/missions-conflicts.js']){
    const source=fs.readFileSync(new URL(file,import.meta.url),'utf8');vm.runInContext(source,context,{filename:file});
  }
  return context.window.GIT_ADVENTURES_CONTENT;
}
export const clone=value=>JSON.parse(JSON.stringify(value));
export function normalizeState(state){state.working||=[];state.staged||=[];state.commits||=[];state.stashes||=[];state.conflicts||=[];if(state.operation===undefined)state.operation=null;state.remote||={name:'origin',tracking:null,knownHead:null,actualHead:null,ahead:0,behind:0,fetched:false,rejected:null};if(state.remote.rejected===undefined)state.remote.rejected=null;return state;}
function findFile(list,name){return list.find(file=>file.name===name);}
function moveFiles(state,sourceKey,targetKey,names){for(const name of names){const i=state[sourceKey].findIndex(file=>file.name===name);if(i<0)continue;const[file]=state[sourceKey].splice(i,1);if(!findFile(state[targetKey],name))state[targetKey].push(file);}}
function operationSnapshot(state,type){return{type,snapshot:{branch:state.branch,working:clone(state.working),staged:clone(state.staged),conflicts:clone(state.conflicts),commits:clone(state.commits),remote:clone(state.remote)}};}
function addConflict(state,file){state.conflicts=[file];state.working=state.working.filter(item=>item.name!==file);state.staged=state.staged.filter(item=>item.name!==file);state.working.push({name:file,status:'unmerged',delta:'both modified'});}
export function applyAction(state,action){normalizeState(state);switch(action.type){
  case 'stage':moveFiles(state,'working','staged',action.files);break;
  case 'unstage':moveFiles(state,'staged','working',action.files);break;
  case 'stageAll':moveFiles(state,'working','staged',state.working.map(f=>f.name));break;
  case 'commit':state.staged=[];state.commits.unshift(`${action.sha} ${action.message}`);state.remote.ahead=(state.remote.ahead||0)+1;break;
  case 'branch':case 'switchBranch':state.branch=action.name;break;
  case 'prependCommit':state.commits.unshift(action.value);break;
  case 'fetch':state.remote.fetched=true;state.remote.knownHead=state.remote.actualHead;state.remote.rejected=null;break;
  case 'pull':state.remote.fetched=true;state.remote.knownHead=state.remote.actualHead;state.remote.behind=0;if(!state.commits.includes(action.commit))state.commits.unshift(action.commit);break;
  case 'pushUpstream':state.remote.tracking=`origin/${action.branch}`;state.remote.knownHead=state.commits[0]?.split(' ')[0]||null;state.remote.actualHead=state.remote.knownHead;state.remote.ahead=0;state.remote.behind=0;state.remote.fetched=true;state.remote.rejected=null;break;
  case 'pushRejected':state.remote.rejected=action.reason||'non-fast-forward';break;
  case 'push':state.remote.knownHead=state.commits[0]?.split(' ')[0]||null;state.remote.actualHead=state.remote.knownHead;state.remote.ahead=0;state.remote.behind=0;state.remote.fetched=true;state.remote.rejected=null;break;
  case 'rebase':{const tail=state.commits.slice(1);state.commits=[action.rewritten,action.base,...tail];state.remote.knownHead=state.remote.actualHead;state.remote.behind=0;state.remote.ahead=1;state.remote.fetched=true;break;}
  case 'merge':{const local=state.commits[0],rest=state.commits.slice(1);state.commits=[action.mergeCommit,local,action.remoteCommit,...rest];state.remote.knownHead=state.remote.actualHead;state.remote.behind=0;state.remote.ahead=1;state.remote.fetched=true;break;}
  case 'stashPush':state.stashes.unshift({message:action.message,working:clone(state.working),staged:clone(state.staged)});state.working=[];state.staged=[];break;
  case 'stashPop':{const stash=state.stashes.shift();if(stash){state.working=[...stash.working,...state.working];state.staged=[...stash.staged,...state.staged];}break;}
  case 'stashConflict':{const stash=state.stashes[0];if(stash){const src=stash.working.find(file=>file.name===action.file)||{name:action.file,status:'modified'};if(!findFile(state.working,action.file))state.working.push({...src,status:'unmerged'});if(!state.conflicts.includes(action.file))state.conflicts.push(action.file);}break;}
  case 'resolveConflict':{state.conflicts=state.conflicts.filter(name=>name!==action.file);const i=state.working.findIndex(file=>file.name===action.file);if(i>=0){const[file]=state.working.splice(i,1);state.staged.push({...file,status:'modified'});}break;}
  case 'stashDrop':state.stashes.shift();break;
  case 'startRebaseConflict':state.operation=operationSnapshot(state,'rebase');state.operation.base=action.base;addConflict(state,action.file);break;
  case 'continueRebase':{const snap=state.operation?.snapshot;const tail=snap?.commits?.slice(1)||state.commits.slice(1);state.commits=[action.rewritten,action.base,...tail];state.staged=[];state.conflicts=[];state.remote.knownHead=state.remote.actualHead;state.remote.behind=0;state.remote.ahead=1;state.remote.fetched=true;state.operation=null;break;}
  case 'startMergeConflict':state.operation=operationSnapshot(state,'merge');state.operation.remoteCommit=action.remoteCommit;addConflict(state,action.file);break;
  case 'continueMerge':{const snap=state.operation?.snapshot;const local=snap?.commits?.[0]||state.commits[0];const rest=snap?.commits?.slice(1)||state.commits.slice(1);state.commits=[action.mergeCommit,local,action.remoteCommit,...rest];state.staged=[];state.conflicts=[];state.remote.knownHead=state.remote.actualHead;state.remote.behind=0;state.remote.ahead=1;state.remote.fetched=true;state.operation=null;break;}
  case 'abortOperation':{if(state.operation?.type===action.operation){const snap=state.operation.snapshot;state.branch=snap.branch;state.working=clone(snap.working);state.staged=clone(snap.staged);state.conflicts=clone(snap.conflicts);state.commits=clone(snap.commits);state.remote=clone(snap.remote);state.operation=null;}break;}
  case 'forcePushWithLease':if(state.remote.knownHead===state.remote.actualHead){state.remote.knownHead=state.commits[0]?.split(' ')[0]||null;state.remote.actualHead=state.remote.knownHead;state.remote.ahead=0;state.remote.behind=0;state.remote.fetched=true;state.remote.rejected=null;}else state.remote.rejected='lease-mismatch';break;
  default:throw new Error(`Unsupported action type in test helper: ${action.type}`);
}}
export function applyActions(state,actions=[]){for(const action of actions)applyAction(state,action);}
export function fingerprint(value){const s=normalizeState(clone(value));return JSON.stringify({branch:s.branch,working:s.working.map(f=>[f.name,f.status]).sort(),staged:s.staged.map(f=>[f.name,f.status]).sort(),commits:s.commits,remote:s.remote,stashes:s.stashes.map(x=>[x.message,x.working.map(f=>f.name).sort(),x.staged.map(f=>f.name).sort()]),conflicts:[...s.conflicts].sort(),operation:s.operation?s.operation.type:null});}
export function firstAcceptedCommand(step){const pattern=step.accept?.[0];if(!pattern)throw new Error('Step has no accepted command pattern');const known=new Map([
['^git\\s+status$','git status'],['^git\\s+diff$','git diff'],['^git\\s+add\\s+README\\.md$','git add README.md'],
['^git\\s+commit\\s+-m\\s+[\"\']Fix serial timeout handling[\"\']$','git commit -m "Fix serial timeout handling"'],['^git\\s+switch\\s+-c\\s+feature/firmware-download$','git switch -c feature/firmware-download'],
['^git\\s+add\\s+src/transfer\\.py\\s+tests/test_transfer\\.py$','git add src/transfer.py tests/test_transfer.py'],['^git\\s+diff\\s+--staged$','git diff --staged'],['^git\\s+commit\\s+-m\\s+[\"\']Add firmware block transfer[\"\']$','git commit -m "Add firmware block transfer"'],
['^git\\s+restore\\s+--staged\\s+debug\\.log$','git restore --staged debug.log'],['^git\\s+revert\\s+bad1234$','git revert bad1234'],['^git\\s+fetch\\s+origin$','git fetch origin'],['^git\\s+pull$','git pull'],
['^git\\s+push\\s+-u\\s+origin\\s+feature/firmware-download$','git push -u origin feature/firmware-download'],['^git\\s+stash\\s+push\\s+-m\\s+[\"\']WIP power check[\"\']$','git stash push -m "WIP power check"'],['^git\\s+switch\\s+main$','git switch main'],['^git\\s+stash\\s+pop$','git stash pop'],
['^git\\s+push$','git push'],['^git\\s+pull\\s+--rebase$','git pull --rebase'],['^git\\s+add\\s+src/power\\.py$','git add src/power.py'],['^git\\s+stash\\s+drop$','git stash drop'],['^git\\s+pull\\s+--no-rebase$','git pull --no-rebase'],
['^git\\s+rebase\\s+origin/feature/protocol-retry$','git rebase origin/feature/protocol-retry'],['^git\\s+add\\s+src/protocol\\.py$','git add src/protocol.py'],['^git\\s+rebase\\s+--continue$','git rebase --continue'],
['^git\\s+rebase\\s+origin/feature/calibration$','git rebase origin/feature/calibration'],['^git\\s+rebase\\s+--abort$','git rebase --abort'],
['^git\\s+merge\\s+origin/integration/device$','git merge origin/integration/device'],['^git\\s+add\\s+src/device_alarm\\.py$','git add src/device_alarm.py'],['^git\\s+commit\\s+-m\\s+[\"\']Merge origin/integration/device[\"\']$','git commit -m "Merge origin/integration/device"'],
['^git\\s+merge\\s+origin/integration/power$','git merge origin/integration/power'],['^git\\s+merge\\s+--abort$','git merge --abort'],['^git\\s+push\\s+--force-with-lease$','git push --force-with-lease']
]);const command=known.get(pattern);if(!command)throw new Error(`No golden command fixture for pattern: ${pattern}`);return command;}
export function commandMatches(step,command){return step.accept.some(pattern=>new RegExp(pattern).test(command));}
export function simulateDirectMission(mission){const state=normalizeState(clone(mission.initial)),commands=[];for(const step of mission.steps){const command=firstAcceptedCommand(step);if(!commandMatches(step,command))throw new Error(`${mission.id}: golden command does not match step: ${command}`);commands.push(command);applyActions(state,step.actions);}return{state,commands};}
