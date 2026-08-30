import { loadContent } from './test-helpers.mjs';
const content=loadContent();
if(!content)throw new Error('GIT_ADVENTURES_CONTENT is missing');
if(content.version!==1)throw new Error(`Unexpected content version: ${content.version}`);
if(!Array.isArray(content.missions)||content.missions.length!==26)throw new Error(`Expected 26 missions, got ${content.missions?.length}`);
const ids=new Set(),numbers=new Set(),requiredLocalized=['title','story','objective','hint'];
for(const mission of content.missions){
 if(!mission.id||ids.has(mission.id))throw new Error(`Invalid/duplicate mission id: ${mission.id}`);ids.add(mission.id);
 if(!Number.isInteger(mission.number)||numbers.has(mission.number))throw new Error(`Invalid/duplicate mission number: ${mission.number}`);numbers.add(mission.number);
 if(!mission.track)throw new Error(`${mission.id}: track is required`);
 if(!Number.isInteger(mission.difficulty)||mission.difficulty<1||mission.difficulty>5)throw new Error(`${mission.id}: difficulty must be 1..5`);
 for(const field of requiredLocalized)if(!mission[field]?.en||!mission[field]?.ko)throw new Error(`${mission.id}: ${field} must contain en/ko`);
 if(!mission.concept?.title?.en||!mission.concept?.title?.ko||!mission.concept?.body?.en||!mission.concept?.body?.ko)throw new Error(`${mission.id}: concept must contain en/ko`);
 if(!mission.initial?.branch||!Array.isArray(mission.initial.working)||!Array.isArray(mission.initial.staged)||!Array.isArray(mission.initial.commits))throw new Error(`${mission.id}: invalid initial repository state`);
 if(mission.initial.stashes!==undefined&&!Array.isArray(mission.initial.stashes))throw new Error(`${mission.id}: stashes must be an array`);
 if(mission.initial.conflicts!==undefined&&!Array.isArray(mission.initial.conflicts))throw new Error(`${mission.id}: conflicts must be an array`);
 if(mission.initial.remote!==undefined&&typeof mission.initial.remote!=='object')throw new Error(`${mission.id}: remote must be an object`);
 if(mission.initial.operation!==undefined&&mission.initial.operation!==null&&typeof mission.initial.operation!=='object')throw new Error(`${mission.id}: operation must be object or null`);
 if(!Array.isArray(mission.steps)||!mission.steps.length)throw new Error(`${mission.id}: at least one step required`);
 for(const [i,step] of mission.steps.entries()){if(!Array.isArray(step.accept)||!step.accept.length)throw new Error(`${mission.id} step ${i+1}: accept required`);for(const p of step.accept)new RegExp(p);if(!step.output?.en||!step.output?.ko)throw new Error(`${mission.id} step ${i+1}: bilingual output required`);}
}
const sorted=[...numbers].sort((a,b)=>a-b);for(let i=0;i<sorted.length;i++)if(sorted[i]!==i+1)throw new Error(`Mission numbering must be continuous; got ${sorted.join(', ')}`);
const tracks=content.missions.reduce((a,m)=>{a[m.track]=(a[m.track]||0)+1;return a;},{});
const expected={Foundations:4,'Daily Workflow':8,'Recovery Lab':6,Collaboration:8};for(const [track,count] of Object.entries(expected))if(tracks[track]!==count)throw new Error(`Expected ${count} ${track} missions, got ${tracks[track]||0}`);
console.log(`Validated ${content.missions.length} missions across ${Object.keys(tracks).length} tracks.`);
