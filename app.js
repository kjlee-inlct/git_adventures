const translations = {
  en: {
    languageButton: "한국어",
    resetButton: "Reset",
    heroKicker: "MISSION-BASED LEARNING",
    heroTitle: "Learn Git by changing repository state, not by memorizing commands.",
    heroDescription: "Each mission gives you a realistic repository state and an objective. Use Git commands to reach the target state.",
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
    success: "Mission complete. Repository state reached the target.",
    wrong: "That command did not complete this mission. Inspect the repository state and try again.",
    unknown: "This command is not simulated in the current mission.",
    resetDone: "Course reset. Mission 1 restored.",
    progress: (n, total) => `Mission ${n} / ${total}`,
    missionNumber: n => `MISSION ${String(n).padStart(2, "0")}`,
    terminalTitle: "practice-repo — terminal"
  },
  ko: {
    languageButton: "English",
    resetButton: "처음부터",
    heroKicker: "MISSION-BASED LEARNING",
    heroTitle: "Command 암기보다 Repository 상태 변경을 통해 Git을 학습합니다.",
    heroDescription: "각 Mission은 실제 개발 상황과 Repository 상태를 제공합니다. Git Command를 사용해 목표 상태에 도달합니다.",
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
    success: "Mission 완료. Repository 상태가 목표에 도달했습니다.",
    wrong: "현재 Command만으로는 Mission이 완료되지 않습니다. Repository 상태 확인 후 다시 시도하세요.",
    unknown: "현재 Mission에서 Simulation하지 않는 Command입니다.",
    resetDone: "Course Reset 완료. Mission 1 상태로 복원했습니다.",
    progress: (n, total) => `Mission ${n} / ${total}`,
    missionNumber: n => `MISSION ${String(n).padStart(2, "0")}`,
    terminalTitle: "practice-repo — terminal"
  }
};

const missions = [
  {
    id: 1,
    tier: "free",
    title: { en: "Inspect before you act", ko: "변경 전 상태 확인" },
    story: {
      en: "A teammate says the repository has local changes. Before touching anything, inspect the current state.",
      ko: "동료가 Local 변경이 있다고 알려왔습니다. 어떤 작업도 수행하기 전에 현재 상태부터 확인합니다."
    },
    objective: { en: "Display the current repository status.", ko: "현재 Repository 상태 출력" },
    hint: { en: "Use the command that reports working tree state.", ko: "Working Tree 상태를 출력하는 Command 사용" },
    concept: {
      title: { en: "State inspection comes first", ko: "State Inspection 우선" },
      body: { en: "Most Git mistakes become worse when users execute recovery commands before understanding the current branch and file state.", ko: "현재 Branch와 File 상태 확인 전 Recovery Command를 실행하면 대부분의 Git 실수가 더 커질 수 있습니다." }
    },
    initial: { branch: "main", working: [{ name: "src/device.py", status: "modified" }], staged: [], commits: ["a41c92e Initial device controller"] },
    expected: cmd => /^git\s+status\s*$/.test(cmd),
    output: { en: "On branch main\nChanges not staged for commit:\n  modified: src/device.py", ko: "On branch main\nChanges not staged for commit:\n  modified: src/device.py" }
  },
  {
    id: 2,
    tier: "free",
    title: { en: "Stage only what belongs", ko: "필요한 변경만 Stage" },
    story: { en: "You fixed the timeout handling. Only src/device.py belongs in this commit.", ko: "Timeout Handling 수정 완료. 이번 Commit에는 src/device.py만 포함해야 합니다." },
    objective: { en: "Stage src/device.py.", ko: "src/device.py Staging" },
    hint: { en: "Avoid staging every file when the commit scope is narrow.", ko: "Commit Scope가 좁다면 모든 File Staging 지양" },
    concept: {
      title: { en: "The staging area defines commit scope", ko: "Staging Area = Commit Scope" },
      body: { en: "Selective staging is the foundation of atomic commits and readable history.", ko: "선택적 Staging은 Atomic Commit과 읽기 쉬운 History의 기본입니다." }
    },
    initial: { branch: "main", working: [{ name: "src/device.py", status: "modified" }, { name: "notes.txt", status: "modified" }], staged: [], commits: ["a41c92e Initial device controller"] },
    expected: cmd => /^git\s+add\s+src\/device\.py\s*$/.test(cmd),
    mutate: state => { state.working = state.working.filter(f => f.name !== "src/device.py"); state.staged.push({ name: "src/device.py", status: "modified" }); },
    output: { en: "src/device.py added to the staging area.", ko: "src/device.py Staging 완료." }
  },
  {
    id: 3,
    tier: "free",
    title: { en: "Create a meaningful commit", ko: "의미 있는 Commit 생성" },
    story: { en: "The timeout fix is staged. Record one logical change in history.", ko: "Timeout Fix가 Staging 완료됐습니다. 하나의 논리적 변경 단위로 History에 기록합니다." },
    objective: { en: "Commit the staged change with: Fix serial timeout handling", ko: "`Fix serial timeout handling` Message로 Commit 생성" },
    hint: { en: "Use an imperative commit title that explains the intent.", ko: "변경 의도를 설명하는 명령형 Commit Title 사용" },
    concept: {
      title: { en: "One commit, one change intent", ko: "One Commit = One Change Intent" },
      body: { en: "Atomic commits improve review, revert, bisect, and cherry-pick workflows.", ko: "Atomic Commit은 Review, Revert, Bisect, Cherry-pick 효율 향상에 직접 연결됩니다." }
    },
    initial: { branch: "main", working: [], staged: [{ name: "src/device.py", status: "modified" }], commits: ["a41c92e Initial device controller"] },
    expected: cmd => /^git\s+commit\s+-m\s+["']Fix serial timeout handling["']\s*$/.test(cmd),
    mutate: state => { state.staged = []; state.commits.unshift("c182bb7 Fix serial timeout handling"); },
    output: { en: "[main c182bb7] Fix serial timeout handling", ko: "[main c182bb7] Fix serial timeout handling" }
  },
  {
    id: 4,
    tier: "free",
    title: { en: "Isolate a new feature", ko: "신규 Feature 작업 격리" },
    story: { en: "A new firmware download feature starts today. Keep unfinished work away from main.", ko: "Firmware Download Feature 개발 시작. 미완성 작업을 main과 분리합니다." },
    objective: { en: "Create and switch to feature/firmware-download.", ko: "feature/firmware-download Branch 생성 및 이동" },
    hint: { en: "Use switch with the create option.", ko: "`switch`의 Branch 생성 Option 활용" },
    concept: {
      title: { en: "Branches isolate work", ko: "Branch 기반 Work Isolation" },
      body: { en: "Feature branches keep main stable while allowing reviewable, independent development.", ko: "Feature Branch는 main 안정성을 유지하면서 독립적인 개발 및 Review 단위를 제공합니다." }
    },
    initial: { branch: "main", working: [], staged: [], commits: ["c182bb7 Fix serial timeout handling", "a41c92e Initial device controller"] },
    expected: cmd => /^git\s+switch\s+-c\s+feature\/firmware-download\s*$/.test(cmd),
    mutate: state => { state.branch = "feature/firmware-download"; },
    output: { en: "Switched to a new branch 'feature/firmware-download'", ko: "Switched to a new branch 'feature/firmware-download'" }
  },
  {
    id: 5,
    tier: "free",
    title: { en: "Read the history", ko: "History 확인" },
    story: { en: "A regression appeared. Before guessing, inspect recent history in a compact form.", ko: "Regression 발생. 원인을 추측하기 전에 최근 History를 간결하게 확인합니다." },
    objective: { en: "Show commit history in one-line format.", ko: "Commit History를 One-Line Format으로 출력" },
    hint: { en: "Use log with a compact option.", ko: "`log`의 Compact Option 활용" },
    concept: {
      title: { en: "History is a debugging tool", ko: "History = Debugging Tool" },
      body: { en: "Readable commit history shortens root-cause analysis and supports bisect and revert decisions.", ko: "읽기 쉬운 Commit History는 Root Cause Analysis, Bisect, Revert 판단 시간을 줄입니다." }
    },
    initial: { branch: "feature/firmware-download", working: [], staged: [], commits: ["72a1d11 Add firmware validation", "c182bb7 Fix serial timeout handling", "a41c92e Initial device controller"] },
    expected: cmd => /^git\s+log\s+--oneline\s*$/.test(cmd),
    output: { en: "72a1d11 Add firmware validation\nc182bb7 Fix serial timeout handling\na41c92e Initial device controller", ko: "72a1d11 Add firmware validation\nc182bb7 Fix serial timeout handling\na41c92e Initial device controller" }
  },
  {
    id: 6,
    tier: "free",
    title: { en: "Publish your branch", ko: "Remote Branch Publish" },
    story: { en: "Your feature is ready for review. Publish the local branch and establish upstream tracking.", ko: "Feature가 Review 가능한 상태입니다. Local Branch를 Remote에 Publish하고 Upstream Tracking을 설정합니다." },
    objective: { en: "Push feature/firmware-download to origin and set upstream.", ko: "feature/firmware-download를 origin에 Push 및 Upstream 설정" },
    hint: { en: "Use push with -u on the first publish.", ko: "최초 Push 시 `-u` Option 활용" },
    concept: {
      title: { en: "Push shares commits, not working files", ko: "Push = Commit 공유" },
      body: { en: "Only committed history is published. Uncommitted working tree changes stay local.", ko: "Push는 Commit된 History만 Remote에 전달하며 Working Tree의 미Commit 변경은 Local에 유지됩니다." }
    },
    initial: { branch: "feature/firmware-download", working: [], staged: [], commits: ["72a1d11 Add firmware validation", "c182bb7 Fix serial timeout handling"] },
    expected: cmd => /^git\s+push\s+-u\s+origin\s+feature\/firmware-download\s*$/.test(cmd),
    output: { en: "branch 'feature/firmware-download' set up to track 'origin/feature/firmware-download'.", ko: "branch 'feature/firmware-download' set up to track 'origin/feature/firmware-download'." }
  },
  {
    id: 7,
    tier: "free",
    title: { en: "Recover safely", ko: "안전한 Shared History 복구" },
    story: { en: "A bad commit has already been shared with the team. Undo it without rewriting shared history.", ko: "잘못된 Commit이 이미 팀에 공유됐습니다. Shared History를 Rewrite하지 않고 되돌립니다." },
    objective: { en: "Revert commit bad1234.", ko: "bad1234 Commit Revert" },
    hint: { en: "Shared history usually prefers a new inverse commit over reset.", ko: "Shared History에서는 Reset보다 반대 변경을 새 Commit으로 기록하는 방식 우선" },
    concept: {
      title: { en: "Prefer revert on shared history", ko: "Shared History는 Revert 우선" },
      body: { en: "Revert preserves published history and records recovery as a new auditable change.", ko: "Revert는 공개된 History를 유지하면서 Recovery 자체를 새로운 추적 가능한 변경으로 기록합니다." }
    },
    initial: { branch: "main", working: [], staged: [], commits: ["bad1234 Break production config", "9f111ab Release v1.4.0"] },
    expected: cmd => /^git\s+revert\s+bad1234\s*$/.test(cmd),
    mutate: state => { state.commits.unshift("f0e91aa Revert 'Break production config'"); },
    output: { en: "[main f0e91aa] Revert 'Break production config'", ko: "[main f0e91aa] Revert 'Break production config'" }
  }
];

const refs = [
  ["git status", { en: "Inspect repository state", ko: "Repository 상태 확인" }],
  ["git diff", { en: "Inspect unstaged changes", ko: "Unstaged 변경 확인" }],
  ["git add <file>", { en: "Stage selected changes", ko: "선택 변경 Staging" }],
  ["git commit", { en: "Record staged changes", ko: "Staged 변경 History 기록" }],
  ["git switch -c", { en: "Create and switch branch", ko: "Branch 생성 및 이동" }],
  ["git log --oneline", { en: "Read compact history", ko: "Compact History 확인" }],
  ["git push -u", { en: "Publish and track branch", ko: "Branch Publish 및 Tracking" }],
  ["git revert", { en: "Undo with a new commit", ko: "새 Commit 기반 안전한 복구" }]
];

let language = localStorage.getItem("gitAdventuresLanguage") || "ko";
let currentMission = Number(localStorage.getItem("gitAdventuresMission") || 0);
let completed = new Set(JSON.parse(localStorage.getItem("gitAdventuresCompleted") || "[]"));
let state = {};

const $ = id => document.getElementById(id);
const clone = value => JSON.parse(JSON.stringify(value));
const t = key => translations[language][key];

function persist() {
  localStorage.setItem("gitAdventuresLanguage", language);
  localStorage.setItem("gitAdventuresMission", String(currentMission));
  localStorage.setItem("gitAdventuresCompleted", JSON.stringify([...completed]));
}

function resetMissionState() {
  state = clone(missions[currentMission].initial);
}

function terminalLine(text, kind = "system") {
  const p = document.createElement("p");
  p.className = `terminal-line ${kind}`;
  p.textContent = text;
  $("terminalOutput").appendChild(p);
  $("terminalOutput").scrollTop = $("terminalOutput").scrollHeight;
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
    div.innerHTML = `<span>${file.name}</span><span class="file-status">${file.status}</span>`;
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
  $("missionNumber").textContent = t("missionNumber")(mission.id);
  $("missionTitle").textContent = mission.title[language];
  $("missionStory").textContent = mission.story[language];
  $("missionObjective").textContent = mission.objective[language];
  $("missionHint").textContent = mission.hint[language];
  $("conceptTitle").textContent = mission.concept.title[language];
  $("conceptBody").textContent = mission.concept.body[language];
  $("progressText").textContent = t("progress")(mission.id, missions.length);
  $("xpText").textContent = `${completed.size * 100} XP`;
  $("progressBar").style.width = `${(completed.size / missions.length) * 100}%`;
  $("previousButton").disabled = currentMission === 0;
  $("nextButton").disabled = !completed.has(mission.id) || currentMission === missions.length - 1;
  terminalLine(language === "ko" ? "현재 Mission 목표를 확인하고 Git Command를 입력하세요." : "Read the mission objective and enter a Git command.");
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

function runCommand(raw) {
  const cmd = raw.trim().replace(/\s+/g, " ");
  if (!cmd) return;
  const mission = missions[currentMission];
  terminalLine(`$ ${cmd}`, "command");

  if (mission.expected(cmd)) {
    if (mission.mutate) mission.mutate(state);
    terminalLine(mission.output[language], "success");
    terminalLine(t("success"), "success");
    completed.add(mission.id);
    $("nextButton").disabled = currentMission === missions.length - 1;
    $("xpText").textContent = `${completed.size * 100} XP`;
    $("progressBar").style.width = `${(completed.size / missions.length) * 100}%`;
    renderState();
    persist();
    return;
  }

  const known = /^git\s+/.test(cmd);
  terminalLine(known ? t("wrong") : t("unknown"), "error");
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
