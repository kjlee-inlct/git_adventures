import assert from 'node:assert/strict';
import fs from 'node:fs';
import { loadContent } from './test-helpers.mjs';
const content=loadContent();const appSource=fs.readFileSync(new URL('../app.js',import.meta.url),'utf8');
const coverage=[
['git status','inspect'],['git diff','inspect'],['git diff --staged','inspect'],['git log --oneline','inspect'],['git stash list','inspect'],
['git add <file>','mutate'],['git add .','mutate-detour'],['git restore --staged <file>','mutate-recovery'],
['git switch -c <branch>','mission-step'],['git switch <branch>','mission-step'],['git commit -m "..."','mission-step'],['git revert <sha>','mission-step'],
['git fetch origin','remote-inspect'],['git pull','remote-integrate'],['git push -u origin <branch>','remote-publish'],['git stash push -m "..."','workspace-preserve'],['git stash pop','workspace-restore'],
['git reset --hard','blocked-danger'],['git clean -fd','blocked-danger'],['git push --force','blocked-danger']
].map(([command,mode])=>({command,mode}));
for(const contract of ['function inspectCommand(cmd)','function genericMutation(cmd)','function dangerousCommand(cmd)','case "fetch"','case "pull"','case "pushUpstream"','case "stashPush"','case "stashPop"','cmd.match(/^git\\s+add\\s+(.+)$/)','cmd.match(/^git\\s+restore\\s+--staged\\s+(.+)$/)','reset\\s+--hard','clean\\s+-fd','push\\s+--force'])assert.ok(appSource.includes(contract),`Simulator contract missing: ${contract}`);
const refs=content.references.map(([command])=>command);for(const command of refs)assert.ok(coverage.some(row=>row.command===command),`Reference command missing from coverage matrix: ${command}`);
const familyTokens=['status','diff','add','restore','switch','commit','revert','fetch','pull','push','stash'];const covered=new Set(coverage.map(r=>r.command.split(/\s+/)[1]));
for(const mission of content.missions)for(const step of mission.steps)for(const pattern of step.accept){const family=familyTokens.find(token=>pattern.includes(`git\\s+${token}`));assert.ok(family,`${mission.id}: cannot classify accepted command: ${pattern}`);assert.ok(covered.has(family),`${mission.id}: ${family} missing from coverage`);}
console.log(`Validated simulator coverage for ${coverage.length} command categories.`);
