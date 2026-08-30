import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const context={window:{}};vm.createContext(context);
vm.runInContext(fs.readFileSync(new URL('../test-presets.js',import.meta.url),'utf8'),context,{filename:'test-presets.js'});
const cfg=context.window.GIT_ADVENTURES_TEST_PRESETS;
assert.ok(cfg,'preset config missing');
assert.equal(cfg.version,1);
assert.equal(JSON.stringify(Array.from(cfg.groups)),JSON.stringify(['Beginner','Basic','Experienced']));
for(const group of cfg.groups){
 const p=cfg.presets[group];assert.ok(p,`${group}: preset missing`);
 assert.ok(p.targetMinutes>=20&&p.targetMinutes<=45,`${group}: unreasonable targetMinutes`);
 assert.ok(p.hypothesis?.en&&p.hypothesis?.ko,`${group}: bilingual hypothesis required`);
 assert.ok(Array.isArray(p.missionNumbers)&&p.missionNumbers.length>=8,`${group}: mission preset too small`);
 assert.equal(new Set(p.missionNumbers).size,p.missionNumbers.length,`${group}: duplicate mission numbers`);
 for(const n of p.missionNumbers)assert.ok(Number.isInteger(n)&&n>=1&&n<=44,`${group}: invalid mission ${n}`);
 assert.ok(p.observe?.en?.length>=4&&p.observe?.ko?.length>=4,`${group}: observe list required`);
 assert.ok(p.stopSignals?.en?.length>=3&&p.stopSignals?.ko?.length>=3,`${group}: stop signals required`);
}
assert.ok(cfg.presets.Basic.missionNumbers.includes(41),'Basic preset should include first judgment assessment');
assert.ok(cfg.presets.Experienced.missionNumbers.includes(43)&&cfg.presets.Experienced.missionNumbers.includes(44),'Experienced preset should include policy and closure assessments');
assert.ok(!cfg.presets.Beginner.missionNumbers.some(n=>n>=41),'Beginner preset should not require Assessment in first calibration pass');
console.log('Internal test preset validation passed.');
