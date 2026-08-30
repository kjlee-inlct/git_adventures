(() => {
  const SUPPORTED_SCHEMA = 1;
  const GROUPS = ["Beginner", "Basic", "Experienced"];

  const round = value => Number.isFinite(value) ? Math.round(value * 10) / 10 : null;
  const average = values => values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : null;
  const median = values => {
    if (!values.length) return null;
    const sorted = [...values].sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);
    return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
  };
  const percentile = (values, p) => {
    if (!values.length) return null;
    const sorted = [...values].sort((a, b) => a - b);
    const index = Math.min(sorted.length - 1, Math.max(0, Math.ceil((p / 100) * sorted.length) - 1));
    return sorted[index];
  };

  function validateReport(report) {
    const errors = [];
    if (!report || typeof report !== "object") errors.push("Report must be an object");
    if (report?.schemaVersion !== SUPPORTED_SCHEMA) errors.push(`Unsupported schemaVersion: ${report?.schemaVersion}`);
    if (!GROUPS.includes(report?.testerGroup)) errors.push(`Unsupported testerGroup: ${report?.testerGroup}`);
    if (report?.privacy?.piiCollected !== false) errors.push("privacy.piiCollected must be false");
    if (!Array.isArray(report?.attempts)) errors.push("attempts must be an array");
    return { valid: errors.length === 0, errors };
  }

  function firstCommandMs(attempt) {
    const first = attempt?.commandTrace?.find(entry => Number.isFinite(entry.atMs));
    return first ? first.atMs : null;
  }

  function assessmentAxis(attempt, axis) {
    const value = attempt?.assessmentScore?.axes?.[axis];
    return Number.isFinite(value) ? value : null;
  }

  function groupMetrics(reports) {
    const attempts = reports.flatMap(report => report.attempts || []);
    const completed = attempts.filter(attempt => attempt.completedAt);
    const firstCommands = attempts.map(firstCommandMs).filter(Number.isFinite);
    const durations = completed.map(attempt => attempt.durationMs).filter(Number.isFinite);
    const assessment = completed.filter(attempt => attempt.assessment && attempt.assessmentScore);
    const totalCommands = attempts.reduce((sum, attempt) => sum + (attempt.commandTrace?.length || 0), 0);
    const totalHints = attempts.reduce((sum, attempt) => sum + (attempt.hintCount || 0), 0);
    const totalInspections = attempts.reduce((sum, attempt) => sum + (attempt.inspections || 0), 0);
    const totalUnsafe = attempts.reduce((sum, attempt) => sum + (attempt.unsafeAttempts || 0), 0);
    const totalDetours = attempts.reduce((sum, attempt) => sum + (attempt.detours || 0), 0);
    const totalWrong = attempts.reduce((sum, attempt) => sum + (attempt.wrongAttempts || 0), 0);
    const assessmentTotals = assessment.map(attempt => attempt.assessmentScore.total).filter(Number.isFinite);
    const assessmentPass = assessment.filter(attempt => attempt.assessmentScore.passed).length;

    const axes = {};
    for (const axis of ["judgment", "safety", "evidence", "efficiency"]) {
      const values = assessment.map(attempt => assessmentAxis(attempt, axis)).filter(Number.isFinite);
      axes[axis] = { average: round(average(values)), median: round(median(values)), count: values.length };
    }

    return {
      sessions: reports.length,
      attempts: attempts.length,
      completed: completed.length,
      abandoned: attempts.filter(attempt => attempt.abandonedAt && !attempt.completedAt).length,
      completionRate: attempts.length ? round((completed.length / attempts.length) * 100) : null,
      timeToFirstCommandMs: {
        average: round(average(firstCommands)),
        median: round(median(firstCommands)),
        p75: round(percentile(firstCommands, 75)),
        count: firstCommands.length
      },
      durationMs: {
        average: round(average(durations)),
        median: round(median(durations)),
        p75: round(percentile(durations, 75)),
        count: durations.length
      },
      perAttempt: {
        commands: attempts.length ? round(totalCommands / attempts.length) : null,
        hints: attempts.length ? round(totalHints / attempts.length) : null,
        inspections: attempts.length ? round(totalInspections / attempts.length) : null,
        unsafe: attempts.length ? round(totalUnsafe / attempts.length) : null,
        detours: attempts.length ? round(totalDetours / attempts.length) : null,
        wrong: attempts.length ? round(totalWrong / attempts.length) : null
      },
      unsafeSessions: reports.filter(report => (report.attempts || []).some(attempt => (attempt.unsafeAttempts || 0) > 0)).length,
      assessment: {
        count: assessment.length,
        averageTotal: round(average(assessmentTotals)),
        passRate: assessment.length ? round((assessmentPass / assessment.length) * 100) : null,
        axes
      }
    };
  }

  function missionMetrics(reports) {
    const rows = new Map();
    for (const report of reports) {
      for (const attempt of report.attempts || []) {
        if (!rows.has(attempt.missionId)) rows.set(attempt.missionId, []);
        rows.get(attempt.missionId).push({ ...attempt, testerGroup: report.testerGroup });
      }
    }
    return [...rows.entries()].map(([missionId, attempts]) => {
      const completed = attempts.filter(attempt => attempt.completedAt);
      const firstCommands = attempts.map(firstCommandMs).filter(Number.isFinite);
      return {
        missionId,
        track: attempts[0]?.track || null,
        assessment: Boolean(attempts[0]?.assessment),
        attempts: attempts.length,
        completionRate: round((completed.length / attempts.length) * 100),
        averageDurationMs: round(average(completed.map(attempt => attempt.durationMs).filter(Number.isFinite))),
        medianFirstCommandMs: round(median(firstCommands)),
        hintsPerAttempt: round(attempts.reduce((s, a) => s + (a.hintCount || 0), 0) / attempts.length),
        unsafePerAttempt: round(attempts.reduce((s, a) => s + (a.unsafeAttempts || 0), 0) / attempts.length),
        wrongPerAttempt: round(attempts.reduce((s, a) => s + (a.wrongAttempts || 0), 0) / attempts.length),
        assessmentAverage: round(average(completed.map(a => a.assessmentScore?.total).filter(Number.isFinite)))
      };
    }).sort((a, b) => a.missionId.localeCompare(b.missionId));
  }

  function aggregateReports(inputReports) {
    const accepted = [];
    const rejected = [];
    for (const report of inputReports || []) {
      const validation = validateReport(report);
      if (validation.valid) accepted.push(report);
      else rejected.push({ sessionId: report?.sessionId || null, errors: validation.errors });
    }

    const byGroup = {};
    for (const group of GROUPS) byGroup[group] = groupMetrics(accepted.filter(report => report.testerGroup === group));
    return {
      schemaVersion: 1,
      generatedAt: new Date().toISOString(),
      sourceReportSchemaVersion: SUPPORTED_SCHEMA,
      acceptedReports: accepted.length,
      rejectedReports: rejected,
      privacy: { piiExpected: false, aggregationLevel: "testerGroup" },
      groups: byGroup,
      missions: missionMetrics(accepted)
    };
  }

  window.GIT_ADVENTURES_REPORT_AGGREGATOR = { GROUPS, validateReport, aggregateReports, groupMetrics, missionMetrics };
})();
