const translations = {
  en: {
    languageButton: "한국어", resetButton: "Reset", trackButton: "Track Map", closeTrackButton: "Close",
    heroKicker: "REPOSITORY PUZZLES", heroTitle: "Learn Git by changing repository state, not by memorizing commands.",
    heroDescription: "Inspect local and remote state, choose a safe action, and observe the consequences.",
    objectiveLabel: "Objective", hintLabel: "Hint", hintButton: "Reveal hint", previousButton: "Previous", nextButton: "Next mission",
    stateLabel: "REPOSITORY STATE", workingTreeLabel: "Working Tree", stagingLabel: "Staging Area", historyLabel: "Commit History", remoteLabel: "Remote / Tracking", stashLabel: "Stash",
    conceptLabel: "WHY THIS MATTERS", masteryLabel: "Mastery", safetyLabel: "Safety", debriefLabel: "MISSION DEBRIEF",
    debriefMasteryLabel: "Mastery", debriefSafetyLabel: "Safety", debriefHintsLabel: "Hints", debriefDetoursLabel: "Detours",
    trackMapTitle: "Choose the next skill, not the next command.", clean: "clean", dirty: "changes", staged: "staged", empty: "Nothing here",
    success: "Mission complete. You reached the intended repository state.", stepComplete: "Good. Continue from the new repository state.",
    wrong: "That action does not solve the current objective yet. Inspect the state before trying another command.", unknown: "This command is not simulated in the current prototype.",
    resetDone: "Course reset. Mission 1 restored.", detour: "The repository changed, but the action created extra recovery work.",
    dangerous: "Blocked in this training mission: this command can destroy work or rewrite shared history.",
    progress: (n, total) => `Mission ${n} / ${total}`, missionNumber: mission => `${mission.track.toUpperCase()} / ${String(mission.number).padStart(2, "0")}`,
    terminalTitle: "practice-repo / terminal", hintIntro: "Think about which repository state must change.", hintExact: "Command shape",
    debriefTitle: "Repository state restored with intent.", debriefBody: mission => `${mission.concept.body.en} Your score reflects hint use, unsafe choices, and unnecessary detours — not typing speed.`,
    missionReady: "Inspect the situation and repository state, then enter a Git command."
  },
  ko: {
    languageButton: "English", resetButton: "처음부터", trackButton: "Track Map", closeTrackButton: "닫기",
    heroKicker: "REPOSITORY PUZZLES", heroTitle: "Command 암기보다 Repository State 변화로 Git을 학습합니다.",
    heroDescription: "Local / Remote State를 확인하고 안전한 행동을 선택한 뒤 결과를 직접 확인합니다.",
    objectiveLabel: "목표", hintLabel: "Hint", hintButton: "Hint 보기", previousButton: "이전", nextButton: "다음 Mission",
    stateLabel: "REPOSITORY STATE", workingTreeLabel: "Working Tree", stagingLabel: "Staging Area", historyLabel: "Commit History", remoteLabel: "Remote / Tracking", stashLabel: "Stash",
    conceptLabel: "WHY THIS MATTERS", masteryLabel: "Mastery", safetyLabel: "Safety", debriefLabel: "MISSION DEBRIEF",
    debriefMasteryLabel: "Mastery", debriefSafetyLabel: "Safety", debriefHintsLabel: "Hints", debriefDetoursLabel: "Detours",
    trackMapTitle: "다음 Command가 아니라 다음 Skill을 선택합니다.", clean: "clean", dirty: "changes", staged: "staged", empty: "비어 있음",
    success: "Mission 완료. 의도한 Repository State에 도달했습니다.", stepComplete: "좋습니다. 변경된 Repository State에서 다음 판단을 진행합니다.",
    wrong: "현재 목표를 해결하지 못했습니다. 다음 Command 전에 Repository State를 다시 확인하세요.", unknown: "현재 Prototype에서 Simulation하지 않는 Command입니다.",
    resetDone: "Course Reset 완료. Mission 1 상태로 복원했습니다.", detour: "Repository State는 변경됐지만 추가 Recovery가 필요한 상황이 됐습니다.",
    dangerous: "Training에서 차단: 이 Command는 작업을 삭제하거나 Shared History를 Rewrite할 수 있습니다.",
    progress: (n, total) => `Mission ${n} / ${total}`, missionNumber: mission => `${mission.track.toUpperCase()} / ${String(mission.number).padStart(2, "0")}`,
    terminalTitle: "practice-repo / terminal", hintIntro: "어느 Repository State가 바뀌어야 하는지 먼저 생각하세요.", hintExact: "Command 형태",
    debriefTitle: "의도를 유지하며 Repository State를 해결했습니다.", debriefBody: mission => `${mission.concept.body.ko} 점수는 속도가 아니라 Hint 사용, 위험한 선택, 불필요한 Detour를 반영합니다.`,
    missionReady: "상황과 Repository State를 확인한 뒤 필요한 Git Command를 입력하세요."
  }
};

const { missions, references: refs } = window.GIT_ADVENTURES_CONTENT;
let language = localStorage.getItem("gitAdventuresLanguage") || "ko";
let currentMission = Math.min(Number(localStorage.getItem("gitAdventuresMission") || 0), missions.length - 1);
let completed = new Set(JSON.parse(localStorage.getItem("gitAdventuresCompleted") || "[]"));
let results = JSON.parse(localStorage.getItem("gitAdventuresResults") || "{}");
let state = {}, stepIndex = 0, attempt = null;

const $ = id => document.getElementById(id);
const clone = value => JSON.parse(JSON.stringify(value));
const t = key => translations[language][key];
const normalize = raw => raw.trim().replace(/\s+/g, " ");
const clamp = value => Math.max(0, Math.min(100, value));

function normalizeState(value) {
  value.working ||= []; value.staged ||= []; value.commits ||= []; value.stashes ||= [];
  value.remote ||= { name: "origin", tracking: null, knownHead: null, actualHead: null, ahead: 0, behind: 0, fetched: false };
  return value;
}
function persist() {
  localStorage.setItem("gitAdventuresLanguage", language);
  localStorage.setItem("gitAdventuresMission", String(currentMission));
  localStorage.setItem("gitAdventuresCompleted", JSON.stringify([...completed]));
  localStorage.setItem("gitAdventuresResults", JSON.stringify(results));
}
function terminalLine(text, kind = "system") { const p = document.createElement("p"); p.className = `terminal-line ${kind}`; p.textContent = text; $("terminalOutput").appendChild(p); $("terminalOutput").scrollTop = $("terminalOutput").scrollHeight; }
function resetAttempt() { attempt = { mastery: 100, safety: 100, hints: 0, detours: 0, wrong: 0, inspections: 0 }; updateScores(); }
function resetMissionState() { state = normalizeState(clone(missions[currentMission].initial)); stepIndex = 0; resetAttempt(); }
function updateScores() { if (!attempt) return; $("masteryScore").textContent = clamp(attempt.mastery); $("safetyScore").textContent = clamp(attempt.safety); }
function findFile(list, name) { return list.find(file => file.name === name); }
function moveFiles(sourceKey, targetKey, names) { names.forEach(name => { const source = state[sourceKey]; const index = source.findIndex(file => file.name === name); if (index < 0) return; const [file] = source.splice(index, 1); if (!findFile(state[targetKey], name)) state[targetKey].push(file); }); }
function applyAction(action) {
  switch (action.type) {
    case "stage": moveFiles("working", "staged", action.files); break;
    case "unstage": moveFiles("staged", "working", action.files); break;
    case "stageAll": moveFiles("working", "staged", state.working.map(file => file.name)); break;
    case "commit": state.staged = []; state.commits.unshift(`${action.sha} ${action.message}`); state.remote.ahead = (state.remote.ahead || 0) + 1; break;
    case "branch": case "switchBranch": state.branch = action.name; break;
    case "prependCommit": state.commits.unshift(action.value); break;
    case "fetch": state.remote.fetched = true; state.remote.knownHead = state.remote.actualHead; break;
    case "pull": state.remote.fetched = true; state.remote.knownHead = state.remote.actualHead; state.remote.behind = 0; if (!state.commits.includes(action.commit)) state.commits.unshift(action.commit); break;
    case "pushUpstream": state.remote.tracking = `origin/${action.branch}`; state.remote.knownHead = state.commits[0]?.split(" ")[0] || null; state.remote.actualHead = state.remote.knownHead; state.remote.ahead = 0; state.remote.behind = 0; state.remote.fetched = true; break;
    case "stashPush": state.stashes.unshift({ message: action.message, working: clone(state.working), staged: clone(state.staged) }); state.working = []; state.staged = []; break;
    case "stashPop": { const stash = state.stashes.shift(); if (stash) { state.working = [...stash.working, ...state.working]; state.staged = [...stash.staged, ...state.staged]; } break; }
  }
}
function applyActions(actions = []) { actions.forEach(applyAction); }
function stateFingerprint(value) {
  const v = normalizeState(clone(value));
  return JSON.stringify({ branch: v.branch, working: v.working.map(f => [f.name, f.status]).sort(), staged: v.staged.map(f => [f.name, f.status]).sort(), commits: v.commits, remote: v.remote, stashes: v.stashes.map(s => [s.message, s.working.map(f => f.name).sort(), s.staged.map(f => f.name).sort()]) });
}
function singleStepTarget(mission) { if (mission.steps.length !== 1 || !mission.steps[0].actions?.length) return null; const saved = state; state = normalizeState(clone(mission.initial)); applyActions(mission.steps[0].actions); const target = clone(state); state = saved; return target; }
function missionStateReached(mission) { const target = singleStepTarget(mission); return target && stateFingerprint(target) === stateFingerprint(state); }

function renderFiles(id, files) {
  const root = $(id); root.innerHTML = "";
  if (!files.length) { const empty = document.createElement("div"); empty.className = "file-item empty"; empty.textContent = t("empty"); root.appendChild(empty); return; }
  files.forEach(file => { const div = document.createElement("div"); div.className = "file-item"; const name = document.createElement("span"); name.textContent = file.name; const status = document.createElement("span"); status.className = "file-status"; status.textContent = `${file.status}${file.delta ? ` · ${file.delta}` : ""}`; div.append(name, status); root.appendChild(div); });
}
function renderRemote() {
  const r = state.remote; const root = $("remoteState"); root.innerHTML = "";
  const rows = [
    ["tracking", r.tracking || "—"], ["remote HEAD", r.knownHead || "unknown"], ["sync", `ahead ${r.ahead || 0} / behind ${r.behind || 0}`], ["fetched", r.fetched ? "yes" : "no"]
  ];
  rows.forEach(([k,v]) => { const row = document.createElement("div"); row.className = "kv-row"; const key = document.createElement("span"); key.textContent = k; const val = document.createElement("code"); val.textContent = v; row.append(key,val); root.appendChild(row); });
}
function renderStash() {
  const root = $("stashState"); root.innerHTML = "";
  if (!state.stashes.length) { const empty = document.createElement("div"); empty.className = "file-item empty"; empty.textContent = t("empty"); root.appendChild(empty); return; }
  state.stashes.forEach((stash,i) => { const div = document.createElement("div"); div.className = "file-item"; const name = document.createElement("span"); name.textContent = `stash@{${i}}`; const status = document.createElement("span"); status.className = "file-status"; status.textContent = stash.message; div.append(name,status); root.appendChild(div); });
}
function renderState() {
  $("branchName").textContent = state.branch; $("stateBadge").textContent = t(state.staged.length ? "staged" : state.working.length ? "dirty" : "clean");
  renderFiles("workingTree", state.working); renderFiles("stagingArea", state.staged); renderRemote(); renderStash(); $("commitGraph").innerHTML = "";
  state.commits.forEach(commit => { const div = document.createElement("div"); div.className = "commit-item"; div.textContent = commit; $("commitGraph").appendChild(div); });
}
function renderReference() { $("commandReference").innerHTML = ""; refs.forEach(([command, description]) => { const div = document.createElement("div"); div.className = "command-chip"; const code = document.createElement("code"); code.textContent = command; const span = document.createElement("span"); span.textContent = description[language]; div.append(code, span); $("commandReference").appendChild(div); }); }
function renderTrackMap() {
  const groups = [...new Set(missions.map(m => m.track))]; $("trackList").innerHTML = "";
  groups.forEach(track => { const ms = missions.filter(m => m.track === track), done = ms.filter(m => completed.has(m.id)).length; const card = document.createElement("article"); card.className = `track-card${track === missions[currentMission].track ? " active" : ""}`; const e = document.createElement("p"); e.className = "eyebrow"; e.textContent = track.toUpperCase(); const title = document.createElement("h3"); title.textContent = track === "Foundations" ? (language === "ko" ? "Git State를 읽고 변경을 구성" : "Read state and assemble changes") : track === "Daily Workflow" ? (language === "ko" ? "Local / Remote를 포함한 실제 Workflow" : "Work across local and remote state") : (language === "ko" ? "실수를 안전한 복구 경험으로 전환" : "Turn mistakes into safe recovery practice"); const desc = document.createElement("p"); desc.textContent = `Difficulty ${Math.min(...ms.map(m => m.difficulty))}–${Math.max(...ms.map(m => m.difficulty))}`; const progress = document.createElement("span"); progress.className = "track-progress"; progress.textContent = `${done} / ${ms.length} missions`; card.append(e,title,desc,progress); $("trackList").appendChild(card); });
}
function commandShape(mission) {
  const samples = {
    "foundations.inspect.001":"git status", "foundations.diff.001":"git diff", "foundations.stage.001":"git add <file>", "foundations.commit.001":"git commit -m \"<message>\"",
    "workflow.branch.001":"git switch -c <branch>", "workflow.atomic.001": stepIndex === 0 ? "git add <related files>" : stepIndex === 1 ? "git diff --staged" : "git commit -m \"<message>\"",
    "recovery.unstage.001":"git restore --staged <file>", "recovery.shared.001":"git revert <commit>",
    "workflow.fetch.001":"git fetch origin", "workflow.pull.001":"git pull", "workflow.push.001":"git push -u origin <branch>",
    "workflow.stash.001": stepIndex === 0 ? "git stash push -m \"<message>\"" : "git switch <branch>", "recovery.stash.001":"git stash pop"
  }; return samples[mission.id] || "git <command>";
}
function revealHint() { const mission = missions[currentMission]; if (attempt.hints >= 3 || completed.has(mission.id)) return; attempt.hints += 1; attempt.mastery -= 10; const text = attempt.hints === 1 ? t("hintIntro") : attempt.hints === 2 ? mission.hint[language] : `${t("hintExact")}: ${commandShape(mission)}`; $("missionHint").textContent = text; $("hintDepth").textContent = `${attempt.hints} / 3`; if (attempt.hints >= 3) $("hintButton").disabled = true; updateScores(); }
function renderMission() {
  const mission = missions[currentMission]; resetMissionState(); $("terminalOutput").innerHTML = ""; $("debriefPanel").hidden = true;
  $("missionNumber").textContent = t("missionNumber")(mission); $("missionTitle").textContent = mission.title[language]; $("missionStory").textContent = mission.story[language]; $("missionObjective").textContent = mission.objective[language];
  $("missionHint").textContent = language === "ko" ? "필요할 때 단계별 Hint를 사용하세요." : "Use progressive hints only when needed."; $("hintDepth").textContent = "0 / 3"; $("hintButton").disabled = false;
  $("conceptTitle").textContent = mission.concept.title[language]; $("conceptBody").textContent = mission.concept.body[language]; $("progressText").textContent = t("progress")(mission.number, missions.length); $("xpText").textContent = `${completed.size * 100} XP`; $("progressBar").style.width = `${(completed.size / missions.length) * 100}%`;
  $("previousButton").disabled = currentMission === 0; $("nextButton").disabled = !completed.has(mission.id) || currentMission === missions.length - 1; terminalLine(t("missionReady")); renderState(); renderTrackMap(); persist();
}
function applyLanguage() { ["languageButton","resetButton","trackButton","closeTrackButton","heroKicker","heroTitle","heroDescription","objectiveLabel","hintLabel","hintButton","previousButton","nextButton","stateLabel","workingTreeLabel","stagingLabel","historyLabel","remoteLabel","stashLabel","conceptLabel","masteryLabel","safetyLabel","debriefLabel","debriefMasteryLabel","debriefSafetyLabel","debriefHintsLabel","debriefDetoursLabel","trackMapTitle","terminalTitle"].forEach(id => { if ($(id)) $(id).textContent = t(id); }); renderReference(); renderMission(); }

function statusOutput() {
  const lines = [`On branch ${state.branch}`]; if (state.remote.tracking) lines.push(`Your branch is ahead ${state.remote.ahead || 0}, behind ${state.remote.behind || 0} of '${state.remote.tracking}'.`);
  if (state.staged.length) { lines.push("Changes to be committed:"); state.staged.forEach(f => lines.push(`  ${f.status}: ${f.name}`)); }
  if (state.working.length) { lines.push("Changes not staged / untracked:"); state.working.forEach(f => lines.push(`  ${f.status}: ${f.name}`)); }
  if (!state.staged.length && !state.working.length) lines.push("nothing to commit, working tree clean"); return lines.join("\n");
}
function diffOutput(files, label) { return files.length ? files.map(file => `${file.name}  ${file.delta || file.status}`).join("\n") : `${label}: no changes`; }
function inspectCommand(cmd) { if (/^git\s+status$/.test(cmd)) return statusOutput(); if (/^git\s+diff$/.test(cmd)) return diffOutput(state.working,"unstaged"); if (/^git\s+diff\s+(--staged|--cached)$/.test(cmd)) return diffOutput(state.staged,"staged"); if (/^git\s+log\s+--oneline$/.test(cmd)) return state.commits.join("\n"); if (/^git\s+stash\s+list$/.test(cmd)) return state.stashes.length ? state.stashes.map((s,i)=>`stash@{${i}}: ${s.message}`).join("\n") : "No stash entries"; return null; }
function dangerousCommand(cmd) { return /^git\s+(reset\s+--hard|clean\s+-fd|push\s+--force(?:\s|$))/.test(cmd); }
function genericMutation(cmd) {
  if (/^git\s+add\s+\.$/.test(cmd)) { applyAction({type:"stageAll"}); return {message:t("detour")}; }
  const add = cmd.match(/^git\s+add\s+(.+)$/); if (add) { const known = add[1].split(" ").filter(name => findFile(state.working,name)); if (known.length) { applyAction({type:"stage",files:known}); return {message: language === "ko" ? `${known.join(", ")} Staging 완료.` : `Staged: ${known.join(", ")}`}; } }
  const restore = cmd.match(/^git\s+restore\s+--staged\s+(.+)$/); if (restore) { const known = restore[1].split(" ").filter(name => findFile(state.staged,name)); if (known.length) { applyAction({type:"unstage",files:known}); return {message: language === "ko" ? `${known.join(", ")} Unstage 완료.` : `Unstaged: ${known.join(", ")}`}; } }
  return null;
}
function matches(step, cmd) { return step.accept.some(pattern => new RegExp(pattern).test(cmd)); }
function showDebrief(mission) { results[mission.id] = {mastery:clamp(attempt.mastery),safety:clamp(attempt.safety),hints:attempt.hints,detours:attempt.detours,wrong:attempt.wrong}; $("debriefTitle").textContent=t("debriefTitle"); $("debriefBody").textContent=t("debriefBody")(mission); $("debriefMastery").textContent=results[mission.id].mastery; $("debriefSafety").textContent=results[mission.id].safety; $("debriefHints").textContent=results[mission.id].hints; $("debriefDetours").textContent=results[mission.id].detours; $("debriefPanel").hidden=false; persist(); }
function completeMission(mission) { if (completed.has(mission.id)) return; completed.add(mission.id); terminalLine(t("success"),"success"); $("nextButton").disabled=currentMission===missions.length-1; $("xpText").textContent=`${completed.size*100} XP`; $("progressBar").style.width=`${(completed.size/missions.length)*100}%`; showDebrief(mission); renderTrackMap(); persist(); }
function advanceStep(mission, step) { applyActions(step.actions); terminalLine(step.output[language],"success"); stepIndex += 1; renderState(); if (stepIndex >= mission.steps.length) completeMission(mission); else terminalLine(t("stepComplete")); }
function runCommand(raw) {
  const cmd=normalize(raw); if(!cmd)return; const mission=missions[currentMission], step=mission.steps[stepIndex]; terminalLine(`$ ${cmd}`,"command");
  if(dangerousCommand(cmd)){attempt.safety-=25;attempt.mastery-=5;attempt.wrong+=1;terminalLine(t("dangerous"),"warning");updateScores();return;}
  if(step&&matches(step,cmd)){const inspection=inspectCommand(cmd);if(inspection){attempt.inspections+=1;terminalLine(inspection);}advanceStep(mission,step);return;}
  const inspection=inspectCommand(cmd);if(inspection!==null){attempt.inspections+=1;terminalLine(inspection);return;}
  const mutation=genericMutation(cmd);if(mutation){attempt.detours+=1;attempt.mastery-=7;if(/^git\s+add\s+\.$/.test(cmd))attempt.safety-=5;terminalLine(mutation.message,"warning");renderState();updateScores();if(!completed.has(mission.id)&&missionStateReached(mission))completeMission(mission);return;}
  attempt.wrong+=1;attempt.mastery-=4;terminalLine(/^git\s+/.test(cmd)?t("wrong"):t("unknown"),"error");updateScores();
}

$("commandForm").addEventListener("submit",e=>{e.preventDefault();const input=$("commandInput");runCommand(input.value);input.value="";input.focus();});
$("hintButton").addEventListener("click",revealHint); $("trackButton").addEventListener("click",()=>{renderTrackMap();$("trackMap").hidden=false;}); $("closeTrackButton").addEventListener("click",()=>{$("trackMap").hidden=true;});
$("languageButton").addEventListener("click",()=>{language=language==="ko"?"en":"ko";applyLanguage();}); $("resetButton").addEventListener("click",()=>{completed=new Set();results={};currentMission=0;localStorage.removeItem("gitAdventuresCompleted");localStorage.removeItem("gitAdventuresResults");localStorage.removeItem("gitAdventuresMission");renderMission();terminalLine(t("resetDone"));});
$("previousButton").addEventListener("click",()=>{if(currentMission>0)currentMission-=1;renderMission();}); $("nextButton").addEventListener("click",()=>{if(currentMission<missions.length-1&&completed.has(missions[currentMission].id))currentMission+=1;renderMission();});
applyLanguage();
