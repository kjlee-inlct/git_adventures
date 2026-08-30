import assert from 'node:assert/strict';
import fs from 'node:fs';
import { loadContent } from './test-helpers.mjs';

const content = loadContent();
const appSource = fs.readFileSync(new URL('../app.js', import.meta.url), 'utf8');

const coverage = [
  { command: 'git status', mode: 'inspect', evidence: /\^git\\s\+status\$/ },
  { command: 'git diff', mode: 'inspect', evidence: /\^git\\s\+diff\$/ },
  { command: 'git diff --staged', mode: 'inspect', evidence: /--staged/ },
  { command: 'git log --oneline', mode: 'inspect', evidence: /log\\s\+--oneline/ },
  { command: 'git add <file>', mode: 'mutate', evidence: /addMatch/ },
  { command: 'git add .', mode: 'mutate-detour', evidence: /add\\s\+\\\./ },
  { command: 'git restore --staged <file>', mode: 'mutate-recovery', evidence: /restoreStageMatch/ },
  { command: 'git switch -c <branch>', mode: 'mission-step', evidence: /switch/ },
  { command: 'git commit -m "..."', mode: 'mission-step', evidence: /commit/ },
  { command: 'git revert <sha>', mode: 'mission-step', evidence: /revert/ },
  { command: 'git reset --hard', mode: 'blocked-danger', evidence: /reset\\s+--hard/ },
  { command: 'git clean -fd', mode: 'blocked-danger', evidence: /clean\\s+-fd/ },
  { command: 'git push --force', mode: 'blocked-danger', evidence: /push\\s+--force/ }
];

for (const row of coverage) {
  assert.match(appSource, row.evidence, `${row.command}: simulator implementation evidence missing`);
}

const references = content.references.map(([command]) => command);
for (const command of references) {
  assert.ok(
    coverage.some(row => row.command === command),
    `Reference command is exposed to learners but absent from coverage matrix: ${command}`
  );
}

const acceptedPatterns = content.missions.flatMap(mission => mission.steps.flatMap(step => step.accept));
for (const pattern of acceptedPatterns) {
  const represented = coverage.some(row => {
    const tokens = row.command.replace(/[<>".]/g, '').split(/\s+/).filter(Boolean);
    return tokens.slice(0, 2).every(token => pattern.toLowerCase().includes(token.toLowerCase().replace('-', '\\-')) || pattern.toLowerCase().includes(token.toLowerCase()));
  });
  assert.ok(represented, `Mission accepted command pattern has no coverage category: ${pattern}`);
}

console.log(`Validated simulator coverage for ${coverage.length} command categories.`);
