(() => {
  const reporter = window.GIT_ADVENTURES_SESSION_REPORT;
  if (!reporter) return;

  const baseRenderMission = renderMission;
  const baseRunCommand = runCommand;
  const baseRevealHint = revealHint;
  const baseShowDebrief = showDebrief;
  const baseApplyLanguage = applyLanguage;
  let session = reporter.loadSession();

  function activeSession() {
    return session && !session.endedAt;
  }

  function finalStateSummary() {
    return {
      branch: state.branch,
      head: state.commits?.[0] || null,
      workingCount: state.working?.length || 0,
      stagedCount: state.staged?.length || 0,
      conflictCount: state.conflicts?.length || 0,
      stashCount: state.stashes?.length || 0,
      remote: state.remote ? {
        tracking: state.remote.tracking || null,
        ahead: state.remote.ahead || 0,
        behind: state.remote.behind || 0,
        rejected: state.remote.rejected || null
      } : null,
      tags: [...(state.tags || [])],
      publishedTags: [...(state.publishedTags || [])]
    };
  }

  function labels() {
    return language === "ko"
      ? { placeholder:"Test Group", start:"Session 시작", end:"Session 종료", export:"JSON 내보내기", active:"기록 중", none:"Session 없음" }
      : { placeholder:"Test group", start:"Start session", end:"End session", export:"Export JSON", active:"Recording", none:"No session" };
  }

  function injectStyles() {
    if (document.getElementById("sessionRecorderStyle")) return;
    const style = document.createElement("style");
    style.id = "sessionRecorderStyle";
    style.textContent = `
      .session-controls{display:flex;gap:8px;align-items:center;flex-wrap:wrap}
      .session-controls select{background:#0d1117;color:inherit;border:1px solid rgba(255,255,255,.18);border-radius:4px;padding:8px 10px;font:inherit}
      .session-indicator{font-family:var(--font-mono,monospace);font-size:11px;opacity:.75;white-space:nowrap}
      .session-indicator.active{opacity:1}
    `;
    document.head.appendChild(style);
  }

  function injectControls() {
    if ($("sessionControls")) return;
    injectStyles();
    const host = document.querySelector(".topbar-actions");
    if (!host) return;
    const root = document.createElement("div");
    root.id = "sessionControls";
    root.className = "session-controls";

    const select = document.createElement("select");
    select.id = "testerGroupSelect";
    const empty = document.createElement("option"); empty.value=""; select.appendChild(empty);
    for (const group of reporter.TESTER_GROUPS) {
      const option = document.createElement("option"); option.value=group; option.textContent=group; select.appendChild(option);
    }

    const toggle = document.createElement("button");
    toggle.id = "sessionToggleButton"; toggle.type="button"; toggle.className="button secondary";
    const exportButton = document.createElement("button");
    exportButton.id = "sessionExportButton"; exportButton.type="button"; exportButton.className="button secondary";
    const indicator = document.createElement("span"); indicator.id="sessionIndicator"; indicator.className="session-indicator";
    root.append(select,toggle,exportButton,indicator);
    host.prepend(root);

    toggle.addEventListener("click",()=>{
      if (activeSession()) {
        session = reporter.endSession(session);
        terminalLine(language === "ko" ? "Test Session 기록을 종료했습니다." : "Test session recording ended.", "system");
      } else {
        const testerGroup = select.value;
        if (!testerGroup) {
          terminalLine(language === "ko" ? "먼저 Test Group을 선택하세요." : "Choose a test group first.", "warning");
          return;
        }
        session = reporter.createSession({
          testerGroup,
          locale: language,
          curriculumVersion: window.GIT_ADVENTURES_CONTENT?.version || 1,
          missionCount: missions.length
        });
        reporter.startMission(session, missions[currentMission], language);
        session = reporter.loadSession();
        terminalLine(language === "ko" ? `${testerGroup} Test Session 기록을 시작했습니다.` : `Started ${testerGroup} test session recording.`, "system");
      }
      renderControls();
    });

    exportButton.addEventListener("click",()=>{
      const saved = reporter.loadSession();
      if (!saved) {
        terminalLine(language === "ko" ? "내보낼 Test Session이 없습니다." : "No test session to export.", "warning");
        return;
      }
      const report = reporter.buildReport(saved);
      const json = JSON.stringify(report,null,2);
      const blob = new Blob([json],{type:"application/json"});
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href=url;
      a.download=`git-adventures-session-${report.sessionId}.json`;
      document.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(url);
      terminalLine(language === "ko" ? "익명 Test Session JSON을 내보냈습니다." : "Exported anonymous test session JSON.", "system");
    });
  }

  function renderControls() {
    injectControls();
    const copy = labels();
    const select = $("testerGroupSelect");
    if (!select) return;
    select.options[0].textContent = copy.placeholder;
    const saved = reporter.loadSession();
    session = saved;
    if (saved?.testerGroup) select.value = saved.testerGroup;
    select.disabled = Boolean(activeSession());
    $("sessionToggleButton").textContent = activeSession() ? copy.end : copy.start;
    $("sessionExportButton").textContent = copy.export;
    $("sessionExportButton").disabled = !saved;
    $("sessionIndicator").textContent = activeSession() ? `${copy.active} · ${saved.testerGroup}` : (saved ? `${saved.testerGroup} · ${saved.endedAt ? "ended" : copy.none}` : copy.none);
    $("sessionIndicator").classList.toggle("active",Boolean(activeSession()));
  }

  renderMission = function() {
    baseRenderMission();
    if (activeSession()) {
      reporter.startMission(session, missions[currentMission], language);
      session = reporter.loadSession();
    }
    renderControls();
  };

  runCommand = function(raw) {
    const command = normalize(raw);
    if (activeSession() && command) {
      reporter.recordCommand(session, command);
      session = reporter.loadSession();
    }
    return baseRunCommand(raw);
  };

  revealHint = function() {
    const before = attempt?.hints || 0;
    const result = baseRevealHint();
    if (activeSession() && (attempt?.hints || 0) > before) {
      reporter.recordHint(session);
      session = reporter.loadSession();
    }
    return result;
  };

  showDebrief = function(mission) {
    baseShowDebrief(mission);
    if (activeSession()) {
      reporter.finishMission(session, mission, attempt, results[mission.id], finalStateSummary());
      session = reporter.loadSession();
      renderControls();
    }
  };

  applyLanguage = function() {
    const result = baseApplyLanguage();
    renderControls();
    return result;
  };

  injectControls();
  renderControls();
  if (activeSession()) {
    const last = session.attempts?.[session.attempts.length-1];
    if (!last || last.completedAt || last.missionId !== missions[currentMission].id) {
      reporter.startMission(session, missions[currentMission], language);
      session = reporter.loadSession();
    }
  }
})();
