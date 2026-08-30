import assert from 'node:assert/strict';
import fs from 'node:fs';
import { loadContent } from './test-helpers.mjs';
const content=loadContent();
const appSource=fs.readFileSync(new URL('../app.js',import.meta.url),'utf8');
const conflictSource=fs.readFileSync(new URL('../engine-conflicts.js',import.meta.url),'utf8');
const releaseSource=fs.readFileSync(new URL('../engine-release.js',import.meta.url),'utf8');
const governanceSource=fs.readFileSync(new URL('../engine-governance.js',import.meta.url),'utf8');
const combinedSource=`${appSource}\n${conflictSource}\n${releaseSource}\n${governanceSource}`;
const coverage=[
['git status','inspect'],['git diff','inspect'],['git diff --staged','inspect'],['git diff <base>...<head>','review-inspect'],['git log --oneline','inspect'],['git stash list','inspect'],
['git add <file>','mutate'],['git add .','mutate-detour'],['git restore --staged <file>','mutate-recovery'],
['git switch -c <branch>','mission-step'],['git switch <branch>','mission-step'],['git commit -m "..."','mission-step'],['git revert <sha>','shared-history-recovery'],
['git fetch origin','remote-inspect'],['git pull','remote-integrate'],['git pull --rebase','remote-rebase'],['git rebase <upstream>','remote-rebase'],['git rebase --continue','conflict-continue'],['git rebase --abort','conflict-abort'],['git rebase --skip','history-drop'],
['git pull --no-rebase','remote-merge'],['git merge <upstream>','remote-merge'],['git merge --no-ff <branch>','approved-release-merge'],['git merge --abort','conflict-abort'],
['git push','remote-publish'],['git push -u origin <branch>','remote-publish'],['git push origin <tag>','release-tag-publish'],['git push --force-with-lease','conditional-rewrite'],
['git stash push -m "..."','workspace-preserve'],['git stash pop','workspace-restore'],['git stash drop','workspace-cleanup'],
['git cherry-pick <sha>','release-backport'],['git cherry-pick --continue','release-conflict-continue'],['git cherry-pick --abort','release-abort'],
['git tag -a <tag> -m "..."','release-identity'],
['git reset --hard','blocked-danger'],['git clean -fd','blocked-danger'],['git push --force','blocked-danger']
].map(([command,mode])=>({command,mode}));
for(const contract of ['function inspectCommand(cmd)','function genericMutation(cmd)','function dangerousCommand(cmd)','case "fetch"','case "pull"','case "pushUpstream"','case "pushRejected"','case "push"','case "rebase"','case "merge"','case "stashPush"','case "stashPop"','case "stashConflict"','case "resolveConflict"','case "stashDrop"','case "switchBlocked"','case "clearBlockedSwitch"','case "startRebaseConflict"','case "continueRebase"','case "skipRebase"','case "startMergeConflict"','case "continueMerge"','case "abortOperation"','case "forcePushWithLease"','case "cherryPick"','case "startCherryPickConflict"','case "continueCherryPick"','case "createTag"','case "recordReviewEvidence"','case "mergeApprovedHotfix"','case "publishTag"','reset\\s+--hard','clean\\s+-fd','push\\s+--force'])assert.ok(combinedSource.includes(contract),`Simulator contract missing: ${contract}`);
const refs=content.references.map(([command])=>command);for(const command of refs)assert.ok(coverage.some(row=>row.command===command),`Reference command missing from coverage matrix: ${command}`);
const familyTokens=['status','diff','add','restore','switch','commit','revert','fetch','pull','push','stash','rebase','merge','cherry-pick','tag'];const covered=new Set(coverage.map(r=>r.command.split(/\s+/)[1]));
for(const mission of content.missions)for(const step of mission.steps)for(const pattern of step.accept){const family=familyTokens.find(token=>pattern.includes(`git\\s+${token}`));assert.ok(family,`${mission.id}: cannot classify accepted command: ${pattern}`);assert.ok(covered.has(family),`${mission.id}: ${family} missing from coverage`);}
console.log(`Validated simulator coverage for ${coverage.length} command categories.`);
