(() => {
  const baseCommandShape = commandShape;

  commandShape = function(mission) {
    if (mission?.assessment) {
      return language === "ko"
        ? "Assessment: Repository Evidence와 Policy를 바탕으로 직접 판단하세요."
        : "Assessment: infer the command from repository evidence and policy.";
    }
    return baseCommandShape(mission);
  };
})();
