(() => {
  const baseNormalizeState = normalizeState;
  const baseApplyAction = applyAction;
  const baseStatusOutput = statusOutput;
  const baseCommandShape = commandShape;

  normalizeState = function(value) {
    const s = baseNormalizeState(value);
    s.publishedTags ||= [];
    if (s.reviewGate === undefined) s.reviewGate = null;
    return s;
  };

  applyAction = function(action) {
    switch (action.type) {
      case "recordReviewEvidence":
        state.reviewGate = { evidence: true, approved: true };
        return;
      case "mergeApprovedHotfix": {
        if (!state.reviewGate?.approved || !state.reviewGate?.evidence) return;
        const localHead = state.commits[0];
        const rest = state.commits.slice(1);
        state.commits = [action.mergeCommit, action.hotfixCommit, localHead, ...rest];
        state.remote.ahead = (state.remote.ahead || 0) + 1;
        return;
      }
      case "publishTag": {
        const local = state.tags.find(item => item.startsWith(`${action.tag}@`));
        if (!local) return;
        if (!state.publishedTags.includes(local)) state.publishedTags.push(local);
        return;
      }
      default:
        baseApplyAction(action);
    }
  };

  statusOutput = function() {
    const lines = [baseStatusOutput()];
    if (state.reviewGate) lines.push(`review gate: evidence ${state.reviewGate.evidence ? "yes" : "no"}, approved ${state.reviewGate.approved ? "yes" : "no"}`);
    if (state.publishedTags.length) lines.push(`published tags: ${state.publishedTags.join(", ")}`);
    return lines.join("\n");
  };

  commandShape = function(mission) {
    const shapes = {
      "release.review-evidence.001": ["git diff <release>...<hotfix>"],
      "release.approved-merge.001": ["git merge --no-ff <approved-hotfix>"],
      "release.publish-tag.001": ["git push origin <tag>"],
      "release.propagate-main.001": ["git cherry-pick <recovery-sha>"],
      "release.closure-check.001": ["git log --oneline"]
    };
    return shapes[mission.id]?.[stepIndex] || baseCommandShape(mission);
  };
})();
