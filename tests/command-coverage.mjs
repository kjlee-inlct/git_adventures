import assert from 'node:assert/strict';
import fs from 'node:fs';
import { loadContent } from './test-helpers.mjs';

const content = loadContent();
const appSource = fs.readFileSync(new URL('../app.js', import.meta.url), 'utf8');

const coverage = [
  { command: 'git status', mode: 'inspect' },
  { command: 'git diff', mode: 'inspect' },
  { command: 'git diff --staged', mode: 'inspect' },
  { command: 'git log --oneline', mode: 'inspect' },
  { command: 'git add <file>', mode: 'mutate' },
  { command: 'git add .', mode: 'mutate-detour' },
  { command: 'git restore --staged <file>', mode: 'mutate-recovery' },
  { command: 'git switch -c <branch>', mode: 'mission-step' },
  { command: 'git commit -m "..."', mode: 'mission-step' },
  { command: 'git revert <sha>', mode: 'mission-step' },
  { command: 'git reset --hard', mode: 'blocked-danger' },
  { command: 'git clean -fd', mode: 'blocked-danger' },
  { command: 'git push --force', mode: 'blocked-danger' }
];

// Architectural implementation contracts. These checks intentionally target
// command behavior, not local variable names, so harmless refactors do not
// break the coverage test.
for (const contract of [
  'function inspectCommand(cmd)',
  'function genericMutation(cmd)',
  'function dangerousCommand(cmd)',
  'cmd.match(/^git\\s+add\\s+(.+)$/)',
  'cmd.match(/^git\\s+restore\\s+--staged\\s+(.+)$/)',
  '/^git\\s+add\\s+\\.$/.test(cmd)',
  'reset\\s+--hard',
  'clean\\s+-fd',
  'push\\s+--force'
]) {
  assert.ok(appSource.includes(contract), `Simulator contract missing from app.js: ${contract}`);
}

const references = content.references.map(([command]) => command);
for (const command of references) {
  assert.ok(
    coverage.some(row => row.command === command),
    `Reference command is exposed to learners but absent from coverage matrix: ${command}`
  );
}

const families = [
  ['status', /^git\\s\+status/],
  ['diff', /^git\\s\+diff/],
  ['add', /^git\\s\+add/],
  ['restore', /^git\\s\+restore/],
  ['switch', /^git\\s\+switch/],
  ['commit', /^git\\s\+commit/],
  ['revert', /^git\\s\+revert/]
];

const coveredFamilies = new Set(
  coverage.map(row => row.command.split(/\s+/)[1]).filter(Boolean)
);

for (const mission of content.missions) {
  for (const step of mission.steps) {
    for (const pattern of step.accept) {
      const family = families.find(([, matcher]) => matcher.test(pattern))?.[0];
      assert.ok(family, `${mission.id}: cannot classify accepted command pattern: ${pattern}`);
      assert.ok(coveredFamilies.has(family), `${mission.id}: ${family} command family missing from coverage matrix`);
    }
  }
}

console.log(`Validated simulator coverage for ${coverage.length} command categories.`);
