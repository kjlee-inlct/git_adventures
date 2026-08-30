(() => {
  const clamp = value => Math.max(0, Math.min(100, Math.round(value)));
  const normalize = command => String(command || "").trim().replace(/\s+/g, " ");

  function matchesPattern(command, pattern) {
    try { return new RegExp(pattern).test(command); }
    catch { return false; }
  }

  function matchesAny(command, patterns = []) {
    return patterns.some(pattern => {
      if (pattern.startsWith("^")) return matchesPattern(command, pattern);
      return command.includes(pattern);
    });
  }

  function scoreAssessment(mission, trace = []) {
    const rubric = mission?.assessmentRubric;
    if (!mission?.assessment || !rubric) return null;

    const commands = trace.map(entry => normalize(typeof entry === "string" ? entry : entry.command));
    const expectedPatterns = mission.steps.flatMap(step => step.accept || []);
    const evidenceCommands = (rubric.evidenceCommands || []).map(normalize);
    const unsafePatterns = rubric.unsafePatterns || [];

    const expectedSeen = expectedPatterns.filter(pattern => commands.some(command => matchesPattern(command, pattern))).length;
    const judgment = clamp((expectedSeen / Math.max(1, expectedPatterns.length)) * 100);

    const unsafeCount = commands.filter(command => matchesAny(command, unsafePatterns)).length;
    const safety = clamp(100 - unsafeCount * 40);

    const evidenceSeen = evidenceCommands.filter(required => commands.includes(required)).length;
    const evidence = evidenceCommands.length ? clamp((evidenceSeen / evidenceCommands.length) * 100) : 100;

    const inspections = commands.filter(command => /^git\s+(status|log\s+--oneline|diff(?:\s|$))/.test(command));
    const useful = new Set([...evidenceCommands, ...(rubric.preferredCommands || []).map(normalize)]);
    const unnecessary = commands.filter(command => !useful.has(command) && !inspections.includes(command) && !expectedPatterns.some(pattern => matchesPattern(command, pattern))).length;
    const efficiency = clamp(100 - unnecessary * 15);

    const axes = { judgment, safety, evidence, efficiency };
    const weights = rubric.weights;
    const total = clamp(
      axes.judgment * weights.judgment / 100 +
      axes.safety * weights.safety / 100 +
      axes.evidence * weights.evidence / 100 +
      axes.efficiency * weights.efficiency / 100
    );
    const passed = total >= rubric.passScore && safety >= rubric.criticalSafetyFloor;

    return {
      axes,
      weights: { ...weights },
      total,
      passed,
      passScore: rubric.passScore,
      criticalSafetyFloor: rubric.criticalSafetyFloor,
      unsafeCount,
      unnecessary,
      rationale: rubric.rationale
    };
  }

  window.GIT_ADVENTURES_ASSESSMENT_SCORING = { scoreAssessment };
})();
