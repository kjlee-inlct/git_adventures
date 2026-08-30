(() => {
  const baseCommandShape = commandShape;
  const baseRunCommand = runCommand;
  const baseRenderMission = renderMission;
  const baseShowDebrief = showDebrief;
  let assessmentTrace = [];

  function currentAssessment() {
    return missions[currentMission]?.assessment ? missions[currentMission] : null;
  }

  commandShape = function(mission) {
    if (mission?.assessment) {
      return language === "ko"
        ? "Assessment: Repository Evidence와 Policy를 바탕으로 직접 판단하세요."
        : "Assessment: infer the command from repository evidence and policy.";
    }
    return baseCommandShape(mission);
  };

  renderMission = function() {
    assessmentTrace = [];
    baseRenderMission();
    const mission = currentAssessment();
    if (!mission) return;
    $("hintDepth").textContent = "0 / 2";
    $("missionHint").textContent = language === "ko"
      ? "Assessment에서는 Command 형태 Hint를 제공하지 않습니다."
      : "Assessment does not reveal command-shape hints.";
  };

  runCommand = function(raw) {
    const mission = currentAssessment();
    if (mission) {
      const command = normalize(raw);
      if (command) assessmentTrace.push({ command });
    }
    return baseRunCommand(raw);
  };

  showDebrief = function(mission) {
    baseShowDebrief(mission);
    if (!mission?.assessment) return;

    const scorer = window.GIT_ADVENTURES_ASSESSMENT_SCORING?.scoreAssessment;
    if (!scorer) return;
    const score = scorer(mission, assessmentTrace);
    if (!score) return;

    results[mission.id].assessment = score;
    $("debriefMasteryLabel").textContent = "Judgment";
    $("debriefSafetyLabel").textContent = "Safety";
    $("debriefHintsLabel").textContent = "Evidence";
    $("debriefDetoursLabel").textContent = "Efficiency";
    $("debriefMastery").textContent = score.axes.judgment;
    $("debriefSafety").textContent = score.axes.safety;
    $("debriefHints").textContent = score.axes.evidence;
    $("debriefDetours").textContent = score.axes.efficiency;

    const rationale = score.rationale?.[language] || mission.concept.body[language];
    const verdict = score.passed
      ? (language === "ko" ? `PASS · 총점 ${score.total}` : `PASS · total ${score.total}`)
      : (language === "ko" ? `REVIEW · 총점 ${score.total}` : `REVIEW · total ${score.total}`);
    $("debriefTitle").textContent = language === "ko" ? "ASSESSMENT RESULT" : "ASSESSMENT RESULT";
    $("debriefBody").textContent = `${verdict} — ${rationale}`;
    persist();
  };
})();
