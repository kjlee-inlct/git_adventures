(() => {
  const baseNormalizeState = normalizeState;
  const baseApplyAction = applyAction;
  const baseStatusOutput = statusOutput;
  const baseCommandShape = commandShape;

  normalizeState = function(value) {
    const stateValue = baseNormalizeState(value);
    if (stateValue.operation === undefined) stateValue.operation = null;
    return stateValue;
  };

  function snapshotCherryPick(action) {
    return {
      type: "cherry-pick",
      source: action.source,
      message: action.message,
      snapshot: {
        branch: state.branch,
        working: clone(state.working),
        staged: clone(state.staged),
        conflicts: clone(state.conflicts),
        commits: clone(state.commits),
        remote: clone(state.remote),
        blockedSwitch: state.blockedSwitch || null
      }
    };
  }

  function addConflict(file) {
    state.working = state.working.filter(item => item.name !== file);
    state.staged = state.staged.filter(item => item.name !== file);
    state.working.push({ name: file, status: "unmerged", delta: "both modified" });
    if (!state.conflicts.includes(file)) state.conflicts.push(file);
  }

  applyAction = function(action) {
    switch (action.type) {
      case "cherryPick":
        state.commits.unshift(`${action.sha} ${action.message}`);
        state.remote.ahead = (state.remote.ahead || 0) + 1;
        return;
      case "startCherryPickConflict":
        state.operation = snapshotCherryPick(action);
        state.conflicts = [];
        addConflict(action.file);
        return;
      case "continueCherryPick":
        if (state.operation?.type !== "cherry-pick" || state.conflicts.length) return;
        state.commits.unshift(`${action.sha} ${action.message}`);
        state.working = [];
        state.staged = [];
        state.conflicts = [];
        state.remote.ahead = (state.remote.ahead || 0) + 1;
        state.operation = null;
        return;
      default:
        baseApplyAction(action);
    }
  };

  statusOutput = function() {
    const text = baseStatusOutput();
    if (state.operation?.type !== "cherry-pick") return text;
    return `${text}\ncherry-pick in progress`;
  };

  commandShape = function(mission) {
    const shapes = {
      "collaboration.merge-multifile.001": ["git merge <upstream>", "git status", "git add <resolved-file>", "git add <resolved-file>", "git commit -m \"<merge-message>\""],
      "release.cherry-pick.001": ["git cherry-pick <sha>"],
      "release.cherry-pick-conflict.001": ["git cherry-pick <sha>", "git status", "git add <resolved-file>", "git cherry-pick --continue"],
      "release.cherry-pick-abort.001": ["git cherry-pick <sha>", "git status", "git cherry-pick --abort"]
    };
    return shapes[mission.id]?.[stepIndex] || baseCommandShape(mission);
  };
})();
