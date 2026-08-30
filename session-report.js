(() => {
  const STORAGE_KEY = "gitAdventuresTestSession";
  const SCHEMA_VERSION = 1;
  const TESTER_GROUPS = ["Beginner", "Basic", "Experienced"];

  const clone = value => JSON.parse(JSON.stringify(value));
  const nowIso = () => new Date().toISOString();
  const makeId = () => globalThis.crypto?.randomUUID?.() || `session-${Date.now()}-${Math.random().toString(16).slice(2)}`;

  function classifyCommand(command) {
    if (/^git\s+(status|log\s+--oneline|diff(?:\s|$)|stash\s+list)/.test(command)) return "inspection";
    if (/^git\s+(reset\s+--hard|clean\s+-fd|push\s+--force(?:\s|$))/.test(command)) return "unsafe";
    return "mutation";
  }

  function loadSession() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  function saveSession(session) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    return session;
  }

  function createSession({ testerGroup, locale, curriculumVersion, missionCount }) {
    if (!TESTER_GROUPS.includes(testerGroup)) throw new Error(`Unsupported tester group: ${testerGroup}`);
    return saveSession({
      schemaVersion: SCHEMA_VERSION,
      sessionId: makeId(),
      testerGroup,
      startedAt: nowIso(),
      endedAt: null,
      locale,
      curriculumVersion,
      missionCount,
      privacy: { piiCollected: false, notes: "No name, email, account id, or free-text tester identity is collected." },
      attempts: []
    });
  }

  function activeAttempt(session) {
    if (!session?.attempts?.length) return null;
    const last = session.attempts[session.attempts.length - 1];
    return last.completedAt ? null : last;
  }

  function startMission(session, mission, locale) {
    if (!session) return null;
    const active = activeAttempt(session);
    if (active) {
      active.abandonedAt = nowIso();
      active.completedAt = null;
      active.durationMs = Date.now() - active.startedEpochMs;
    }
    session.locale = locale;
    session.attempts.push({
      attemptId: `${mission.id}-${Date.now()}`,
      missionId: mission.id,
      missionNumber: mission.number,
      track: mission.track,
      difficulty: mission.difficulty,
      assessment: Boolean(mission.assessment),
      startedAt: nowIso(),
      startedEpochMs: Date.now(),
      completedAt: null,
      durationMs: null,
      commandTrace: [],
      hintCount: 0,
      inspections: 0,
      detours: 0,
      wrongAttempts: 0,
      unsafeAttempts: 0,
      guidedScore: null,
      assessmentScore: null,
      finalState: null
    });
    return saveSession(session);
  }

  function recordCommand(session, command) {
    const attempt = activeAttempt(session);
    if (!attempt || !command) return session;
    const category = classifyCommand(command);
    attempt.commandTrace.push({
      atMs: Math.max(0, Date.now() - attempt.startedEpochMs),
      command,
      category
    });
    if (category === "inspection") attempt.inspections += 1;
    if (category === "unsafe") attempt.unsafeAttempts += 1;
    return saveSession(session);
  }

  function recordHint(session) {
    const attempt = activeAttempt(session);
    if (attempt) attempt.hintCount += 1;
    return session ? saveSession(session) : null;
  }

  function finishMission(session, mission, attemptSummary, result, finalState) {
    const active = activeAttempt(session);
    if (!active || active.missionId !== mission.id) return session;
    active.completedAt = nowIso();
    active.durationMs = Math.max(0, Date.now() - active.startedEpochMs);
    active.detours = Number(attemptSummary?.detours || 0);
    active.wrongAttempts = Number(attemptSummary?.wrong || 0);
    active.inspections = Math.max(active.inspections, Number(attemptSummary?.inspections || 0));
    active.guidedScore = mission.assessment ? null : {
      mastery: Number(result?.mastery ?? attemptSummary?.mastery ?? 0),
      safety: Number(result?.safety ?? attemptSummary?.safety ?? 0)
    };
    active.assessmentScore = mission.assessment ? clone(result?.assessment || null) : null;
    active.finalState = clone(finalState);
    delete active.startedEpochMs;
    return saveSession(session);
  }

  function endSession(session) {
    if (!session) return null;
    const active = activeAttempt(session);
    if (active) {
      active.abandonedAt = nowIso();
      active.durationMs = Math.max(0, Date.now() - active.startedEpochMs);
      delete active.startedEpochMs;
    }
    session.endedAt = nowIso();
    return saveSession(session);
  }

  function summarize(session) {
    const attempts = session?.attempts || [];
    const completed = attempts.filter(a => a.completedAt);
    const assessment = completed.filter(a => a.assessment && a.assessmentScore);
    return {
      attempts: attempts.length,
      completed: completed.length,
      abandoned: attempts.filter(a => a.abandonedAt && !a.completedAt).length,
      averageDurationMs: completed.length ? Math.round(completed.reduce((s,a)=>s+(a.durationMs||0),0)/completed.length) : 0,
      unsafeAttempts: attempts.reduce((s,a)=>s+(a.unsafeAttempts||0),0),
      hints: attempts.reduce((s,a)=>s+(a.hintCount||0),0),
      inspections: attempts.reduce((s,a)=>s+(a.inspections||0),0),
      assessmentAverage: assessment.length ? Math.round(assessment.reduce((s,a)=>s+(a.assessmentScore.total||0),0)/assessment.length) : null
    };
  }

  function buildReport(session) {
    if (!session) return null;
    const report = clone(session);
    report.generatedAt = nowIso();
    report.summary = summarize(report);
    for (const attempt of report.attempts) delete attempt.startedEpochMs;
    return report;
  }

  function clearSession() {
    localStorage.removeItem(STORAGE_KEY);
  }

  window.GIT_ADVENTURES_SESSION_REPORT = {
    SCHEMA_VERSION,
    TESTER_GROUPS,
    classifyCommand,
    loadSession,
    createSession,
    startMission,
    recordCommand,
    recordHint,
    finishMission,
    endSession,
    buildReport,
    summarize,
    clearSession
  };
})();
