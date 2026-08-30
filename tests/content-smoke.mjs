import fs from 'node:fs';
import vm from 'node:vm';

const source = fs.readFileSync(new URL('../content/missions.js', import.meta.url), 'utf8');
const context = { window: {} };
vm.createContext(context);
vm.runInContext(source, context, { filename: 'content/missions.js' });

const content = context.window.GIT_ADVENTURES_CONTENT;
if (!content) throw new Error('GIT_ADVENTURES_CONTENT is missing');
if (content.version !== 1) throw new Error(`Unexpected content version: ${content.version}`);
if (!Array.isArray(content.missions) || content.missions.length !== 8) {
  throw new Error(`Expected 8 vertical-slice missions, got ${content.missions?.length}`);
}

const ids = new Set();
const numbers = new Set();
const requiredLocalized = ['title', 'story', 'objective', 'hint'];

for (const mission of content.missions) {
  if (!mission.id || ids.has(mission.id)) throw new Error(`Invalid/duplicate mission id: ${mission.id}`);
  ids.add(mission.id);

  if (!Number.isInteger(mission.number) || numbers.has(mission.number)) {
    throw new Error(`Invalid/duplicate mission number: ${mission.number}`);
  }
  numbers.add(mission.number);

  if (!mission.track) throw new Error(`${mission.id}: track is required`);
  if (!Number.isInteger(mission.difficulty) || mission.difficulty < 1 || mission.difficulty > 5) {
    throw new Error(`${mission.id}: difficulty must be 1..5`);
  }

  for (const field of requiredLocalized) {
    if (!mission[field]?.en || !mission[field]?.ko) throw new Error(`${mission.id}: ${field} must contain en/ko`);
  }
  if (!mission.concept?.title?.en || !mission.concept?.title?.ko || !mission.concept?.body?.en || !mission.concept?.body?.ko) {
    throw new Error(`${mission.id}: concept title/body must contain en/ko`);
  }

  if (!mission.initial?.branch || !Array.isArray(mission.initial.working) || !Array.isArray(mission.initial.staged) || !Array.isArray(mission.initial.commits)) {
    throw new Error(`${mission.id}: invalid initial repository state`);
  }

  if (!Array.isArray(mission.steps) || mission.steps.length === 0) throw new Error(`${mission.id}: at least one step is required`);
  for (const [index, step] of mission.steps.entries()) {
    if (!Array.isArray(step.accept) || step.accept.length === 0) throw new Error(`${mission.id} step ${index + 1}: accept patterns required`);
    for (const pattern of step.accept) new RegExp(pattern);
    if (!step.output?.en || !step.output?.ko) throw new Error(`${mission.id} step ${index + 1}: bilingual output required`);
  }
}

const sorted = [...numbers].sort((a, b) => a - b);
for (let i = 0; i < sorted.length; i += 1) {
  if (sorted[i] !== i + 1) throw new Error(`Mission numbering must be continuous from 1; got ${sorted.join(', ')}`);
}

const tracks = content.missions.reduce((acc, mission) => {
  acc[mission.track] = (acc[mission.track] || 0) + 1;
  return acc;
}, {});

const expectedTracks = { Foundations: 4, 'Daily Workflow': 2, 'Recovery Lab': 2 };
for (const [track, count] of Object.entries(expectedTracks)) {
  if (tracks[track] !== count) throw new Error(`Expected ${count} ${track} missions, got ${tracks[track] || 0}`);
}

console.log(`Validated ${content.missions.length} missions across ${Object.keys(tracks).length} tracks.`);
