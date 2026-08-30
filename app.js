const translations = {
  en: {
    languageButton: "한국어",
    resetButton: "Reset",
    heroKicker: "REPOSITORY PUZZLES",
    heroTitle: "Learn Git by changing repository state, not by memorizing commands.",
    heroDescription: "Inspect the repository, choose a safe action, and watch Working Tree, Staging Area, and History change.",
    objectiveLabel: "Objective",
    hintLabel: "Hint",
    previousButton: "Previous",
    nextButton: "Next mission",
    stateLabel: "REPOSITORY STATE",
    workingTreeLabel: "Working Tree",
    stagingLabel: "Staging Area",
    historyLabel: "Commit History",
    conceptLabel: "WHY THIS MATTERS",
    clean: "clean",
    dirty: "changes",
    staged: "staged",
    empty: "Nothing here",
    success: "Mission complete. You reached the intended repository state.",
    stepComplete: "Good. Continue from the new repository state.",
    wrong: "Valid Git syntax, but it does not solve the current objective yet.",
    unknown: "This command is not simulated in the current prototype.",
    resetDone: "Course reset. Mission 1 restored.",
    detour: "The command changed the repository, but created extra recovery work. Inspect the new state.",
    progress: (n, total) => `Mission ${n} / ${total}`,
    missionNumber: (mission) => `${mission.track.toUpperCase()} / ${String(mission.number).padStart(2, "0")}`,
    terminalTitle: "practice-repo / terminal"
  },
  ko: {
    languageButton: "English",
    resetButton: "처음부터",
    heroKicker: "REPOSITORY PUZZLES",
    heroTitle: "Command 암기보다 Repository State 변화로 Git을 학습합니다.",
    heroDescription: "Repository를 확인하고 안전한 행동을 선택한 뒤 Working Tree, Staging Area, History 변화를 직접 확인합니다.",
    objectiveLabel: "목표",
    hintLabel: "Hint",
    previousButton: "이전",
    nextButton: "다음 Mission",
    stateLabel: "REPOSITORY STATE",
    workingTreeLabel: "Working Tree",
    stagingLabel: "Staging Area",
    historyLabel: "Commit History",
    conceptLabel: "WHY THIS MATTERS",
    clean: "clean",
    dirty: "changes",
    staged: "staged",
    empty: "비어 있음",
    success: "Mission 완료. 의도한 Repository State에 도달했습니다.",
    stepComplete: "좋습니다. 변경된 Repository State에서 다음 판단을 진행합니다.",
    wrong: "유효한 Git 형태지만 현재 목표를 아직 해결하지 못했습니다.",
    unknown: "현재 Prototype에서 Simulation하지 않는 Command입니다.",
    resetDone: "Course Reset 완료. Mission 1 상태로 복원했습니다.",
    detour: "Repository 상태는 변경됐지만 추가 Recovery가 필요한 상황이 됐습니다. 새 상태를 확인하세요.",
    progress: (n, total) => `Mission ${n} / ${total}`,
    missionNumber: (mission) => `${mission.track.toUpperCase()} / ${String(mission.number).padStart(2, "0")}`,
    terminalTitle: "practice-repo / terminal"
  }
};

const { missions, references: refs } = window.GIT_ADVENTURES_CONTENT;

let language = localStorage.getItem("gitAdventuresLanguage") || "ko";
let currentMission = Number(localStorage.getItem("gitAdventuresMission") || 0);
let completed = new Set(JSON.parse(localStorage.getItem("gitAdventuresCompleted") || "[]"));
let state = {};
let stepIndex = 0;

const $ = id => document.getElementById(id);
const clone = value => JSON.parse(JSON.stringify(value));
const t = key => translations[language][key];
const normalize = raw => raw.trim().replace(/\s+/g, " ");

function persist() {
  localStorage.setItem("gitAdventuresLanguage", language);
  localStorage.setItem("gitAdventuresMission", String(currentMission));
  localStorage.setItem("gitAdventuresCompleted", JSON.stringify([...completed]));
}

function terminalLine(text, kind = "system") {
  const p = document.createElement("p");
  p.className = `terminal-line ${kind}`;
  p.textContent = text;
  $("terminalOutput").appendChild(p);
  $("terminalOutput").scrollTop = $("terminalOutput").scrollHeight;
}

function resetMissionState() {
  state = clone(missions[currentMission].initial);
  stepIndex = 0;
}

function findFile(list, name) {
  return list.find(file => file.name === name);
}

function moveFiles(sourceKey, targetKey, names) {
  names.forEach(name => {
    const source = state[sourceKey];
    const index = source.findIndex(file => file.name === name);
    if (index < 0) return;
    const [file] = source.splice(index, 1);
    if (!findFile(state[targetKey], name)) state[targetKey].push(file);
  });
}

function applyAction(action) {
  switch (action.type) {
    case "stage":
      moveFiles("working", "staged", action.files);
      break;
    case "unstage":
      moveFiles("staged", "working", action.files);
      break;
    case "stageAll":
      moveFiles("working", "staged", state.working.map(file => file.name));
      break;
    case "commit":
      state.staged = [];
      state.commits.unshift(`${action.sha} ${action.message}`);
      break;
    case "branch":
      state.branch = action.name;
      break;
    case "prependCommit":
      state.commits.unshift(action.value);
      break;
  }
}

function applyActions(actions = []) {
  actions.forEach(applyAction);
}

function stateFingerprint(value) {
  return JSON.stringify({
    branch: value.branch,
    working: value.working.map(f => [f.name, f.status]).sort(),
    staged: value.staged.map(f => [f.name, f.status]).sort(),
    commits: value.commits
  });
}

function singleStepTarget(mission) {
  if (mission.steps.length !== 1 || !mission.steps[0].actions?.length) return null;
  const saved = state;
  state = clone(mission.initial);
  applyActions(mission.steps[0].actions);
  const target = clone(state);
  state = saved;
  return target;
}

function missionStateReached(mission) {
  const target = singleStepTarget(mission);
  return target && stateFingerprint(target) === stateFingerprint(state);
}

function renderState() {
  $("branchName").textContent = state.branch;
  const stateKind = state.staged.length ? "staged" : state.working.length ? "dirty" : "clean";
  $("stateBadge").textContent = t(stateKind);
  renderFiles("workingTree", state.working);
  renderFiles("stagingArea", state.staged);
  $("commitGraph").innerHTML = "";
  state.commits.forEach(commit => {
    const div = document.createElement("div");
    div.className = "commit-item";
    div.textContent = commit;
    $("commitGraph").appendChild(div);
  });
}

function renderFiles(id, files) {
  const root = $(id);
  root.innerHTML = "";
  if (!files.length) {
    const empty = document.createElement("div");
    empty.className = "file-item empty";
    empty.textContent = t("empty");
    root.appendChild(empty);
    return;
  }
  files.forEach(file => {
    const div = document.createElement("div");
    div.className = "file-item";
    div.innerHTML = `<span>${file.name}</span><span class="file-status">${file.status}${file.delta ? ` · ${file.delta}` : ""}</span>`;
    root.appendChild(div);
  });
}

function renderReference() {
  $("commandReference").innerHTML = "";
  refs.forEach(([command, description]) => {
    const div = document.createElement("div");
    div.className = "command-chip";
    div.innerHTML = `<code>${command}</code><span>${description[language]}</span>`;
    $("commandReference").appendChild(div);
  });
}

function renderMission() {
  const mission = missions[currentMission];
  resetMissionState();
  $("terminalOutput").innerHTML = "";
  $("missionNumber").textContent = t("missionNumber")(mission);
  $("missionTitle").textContent = mission.title[language];
  $("missionStory").textContent = mission.story[language];
  $("missionObjective").textContent = mission.objective[language];
  $("missionHint").textContent = mission.hint[language];
  $("conceptTitle").textContent = mission.concept.title[language];
  $("conceptBody").textContent = mission.concept.body[language];
  $("progressText").textContent = t("progress")(mission.number, missions.length);
  $("xpText").textContent = `${completed.size * 100} XP`;
  $("progressBar").style.width = `${(completed.size / missions.length) * 100}%`;
  $("previousButton").disabled = currentMission === 0;
  $("nextButton").disabled = !completed.has(mission.id) || currentMission === missions.length - 1;
  terminalLine(language === "ko" ? "상황과 Repository State를 확인한 뒤 필요한 Git Command를 입력하세요." : "Inspect the situation and repository state, then enter a Git command.");
  renderState();
  persist();
}

function applyLanguage() {
  ["languageButton","resetButton","heroKicker","heroTitle","heroDescription","objectiveLabel","hintLabel","previousButton","nextButton","stateLabel","workingTreeLabel","stagingLabel","historyLabel","conceptLabel","terminalTitle"].forEach(id => {
    $(id).textContent = t(id);
  });
  renderReference();
  renderMission();
}

function statusOutput() {
  const lines = [`On branch ${state.branch}`];
  if (state.staged.length) {
    lines.push("Changes to be committed:");
    state.staged.forEach(f => lines.push(`  ${f.status}: ${f.name}`));
  }
  if (state.working.length) {
    lines.push("Changes not staged / untracked:");
    state.working.forEach(f => lines.push(`  ${f.status}: ${f.name}`));
  }
  if (!state.staged.length && !state.working.length) lines.push("nothing to commit, working tree clean");
  return lines.join("\n");
}

function diffOutput(files, label) {
  if (!files.length) return `${label}: no changes`;
  return files.map(file => `${file.name}  ${file.delta || file.status}`).join("\n");
}

function inspectCommand(cmd) {
  if (/^git\s+status$/.test(cmd)) return statusOutput();
  if (/^git\s+diff$/.test(cmd)) return diffOutput(state.working, "unstaged");
  if (/^git\s+diff\s+(--staged|--cached)$/.test(cmd)) return diffOutput(state.staged, "staged");
  if (/^git\s+log\s+--oneline$/.test(cmd)) return state.commits.join("\n");
  return null;
}

function genericMutation(cmd) {
  if (/^git\s+add\s+\.$/.test(cmd)) {
    applyAction({ type: "stageAll" });
    return { changed: true, message: t("detour") };
  }

  const addMatch = cmd.match(/^git\s+add\s+(.+)$/);
  if (addMatch) {
    const names = addMatch[1].split(" ").filter(Boolean);
    const known = names.filter(name => findFile(state.working, name));
    if (known.length) {
      applyAction({ type: "stage", files: known });
      return { changed: true, message: language === "ko" ? `${known.join(", ")} Staging 완료.` : `Staged: ${known.join(", ")}` };
    }
  }

  const restoreStageMatch = cmd.match(/^git\s+restore\s+--staged\s+(.+)$/);
  if (restoreStageMatch) {
    const names = restoreStageMatch[1].split(" ").filter(Boolean);
    const known = names.filter(name => findFile(state.staged, name));
    if (known.length) {
      applyAction({ type: "unstage", files: known });
      return { changed: true, message: language === "ko" ? `${known.join(", ")} Unstage 완료. Working Tree 변경은 유지됩니다.` : `Unstaged ${known.join(", ")}; working changes are preserved.` };
    }
  }
  return null;
}

function matches(step, cmd) {
  return step.accept.some(pattern => new RegExp(pattern).test(cmd));
}

function completeMission(mission) {
  completed.add(mission.id);
  terminalLine(t("success"), "success");
  $("nextButton").disabled = currentMission === missions.length - 1;
  $("xpText").textContent = `${completed.size * 100} XP`;
  $("progressBar").style.width = `${(completed.size / missions.length) * 100}%`;
  persist();
}

function advanceStep(mission, step) {
  applyActions(step.actions);
  terminalLine(step.output[language], "success");
  stepIndex += 1;
  renderState();
  if (stepIndex >= mission.steps.length) completeMission(mission);
  else terminalLine(t("stepComplete"), "system");
}

function runCommand(raw) {
  const cmd = normalize(raw);
  if (!cmd) return;
  const mission = missions[currentMission];
  const step = mission.steps[stepIndex];
  terminalLine(`$ ${cmd}`, "command");

  if (step && matches(step, cmd)) {
    const inspection = inspectCommand(cmd);
    if (inspection) terminalLine(inspection, "system");
    advanceStep(mission, step);
    return;
  }

  const inspection = inspectCommand(cmd);
  if (inspection !== null) {
    terminalLine(inspection, "system");
    return;
  }

  const mutation = genericMutation(cmd);
  if (mutation) {
    terminalLine(mutation.message, "system");
    renderState();
    if (!completed.has(mission.id) && missionStateReached(mission)) completeMission(mission);
    return;
  }

  terminalLine(/^git\s+/.test(cmd) ? t("wrong") : t("unknown"), "error");
}

$("commandForm").addEventListener("submit", event => {
  event.preventDefault();
  const input = $("commandInput");
  runCommand(input.value);
  input.value = "";
  input.focus();
});

$("languageButton").addEventListener("click", () => {
  language = language === "ko" ? "en" : "ko";
  applyLanguage();
});

$("resetButton").addEventListener("click", () => {
  completed = new Set();
  currentMission = 0;
  localStorage.removeItem("gitAdventuresCompleted");
  localStorage.removeItem("gitAdventuresMission");
  renderMission();
  terminalLine(t("resetDone"), "system");
});

$("previousButton").addEventListener("click", () => {
  if (currentMission > 0) currentMission -= 1;
  renderMission();
});

$("nextButton").addEventListener("click", () => {
  if (currentMission < missions.length - 1 && completed.has(missions[currentMission].id)) currentMission += 1;
  renderMission();
});

applyLanguage();
