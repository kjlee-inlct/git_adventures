(() => {
  const baseNormalizeState = normalizeState;
  const baseApplyAction = applyAction;
  const baseFingerprint = stateFingerprint;
  const baseStatusOutput = statusOutput;
  const baseCommandShape = commandShape;

  normalizeState = function(value) {
    const stateValue = baseNormalizeState(value);
    if (stateValue.operation === undefined) stateValue.operation = null;
    if (stateValue.blockedSwitch === undefined) stateValue.blockedSwitch = null;
    return stateValue;
  };

  function snapshotOperation(type) {
    return {
      type,
      snapshot: {
        branch: state.branch,
        working: clone(state.working),
        staged: clone(state.staged),
        conflicts: clone(state.conflicts),
        commits: clone(state.commits),
        remote: clone(state.remote),
        blockedSwitch: state.blockedSwitch
      }
    };
  }

  function addConflict(file) {
    state.working = state.working.filter(item => item.name !== file);
    state.staged = state.staged.filter(item => item.name !== file);
    state.working.push({ name: file, status: "unmerged", delta: "both modified" });
    if (!state.conflicts.includes(file)) state.conflicts.push(file);
  }

  function addConflicts(action) {
    const files = action.files || (action.file ? [action.file] : []);
    files.forEach(addConflict);
  }

  function restoreSnapshot(expectedType) {
    if (!state.operation || state.operation.type !== expectedType) return;
    const snapshot = state.operation.snapshot;
    state.branch = snapshot.branch;
    state.working = clone(snapshot.working);
    state.staged = clone(snapshot.staged);
    state.conflicts = clone(snapshot.conflicts);
    state.commits = clone(snapshot.commits);
    state.remote = clone(snapshot.remote);
    state.blockedSwitch = snapshot.blockedSwitch || null;
    state.operation = null;
  }

  applyAction = function(action) {
    switch (action.type) {
      case "switchBlocked":
        state.blockedSwitch = { target: action.target, file: action.file };
        return;
      case "clearBlockedSwitch":
        state.blockedSwitch = null;
        return;
      case "startRebaseConflict":
        state.operation = snapshotOperation("rebase");
        state.operation.base = action.base;
        state.conflicts = [];
        addConflicts(action);
        return;
      case "continueRebase": {
        if (state.conflicts.length) return;
        const snapshot = state.operation?.snapshot;
        const originalTail = snapshot?.commits?.slice(1) || state.commits.slice(1);
        state.commits = [action.rewritten, action.base, ...originalTail];
        state.staged = [];
        state.conflicts = [];
        state.remote.knownHead = state.remote.actualHead;
        state.remote.behind = 0;
        state.remote.ahead = 1;
        state.remote.fetched = true;
        state.operation = null;
        return;
      }
      case "skipRebase": {
        const snapshot = state.operation?.snapshot;
        const originalTail = snapshot?.commits?.slice(1) || state.commits.slice(1);
        state.commits = [action.base, ...originalTail];
        state.working = [];
        state.staged = [];
        state.conflicts = [];
        state.remote.knownHead = state.remote.actualHead;
        state.remote.behind = 0;
        state.remote.ahead = 0;
        state.remote.fetched = true;
        state.operation = null;
        return;
      }
      case "startMergeConflict":
        state.operation = snapshotOperation("merge");
        state.operation.remoteCommit = action.remoteCommit;
        state.conflicts = [];
        addConflicts(action);
        return;
      case "continueMerge": {
        if (state.conflicts.length) return;
        const snapshot = state.operation?.snapshot;
        const localHead = snapshot?.commits?.[0] || state.commits[0];
        const rest = snapshot?.commits?.slice(1) || state.commits.slice(1);
        state.commits = [action.mergeCommit, localHead, action.remoteCommit, ...rest];
        state.staged = [];
        state.conflicts = [];
        state.remote.knownHead = state.remote.actualHead;
        state.remote.behind = 0;
        state.remote.ahead = 1;
        state.remote.fetched = true;
        state.operation = null;
        return;
      }
      case "abortOperation":
        restoreSnapshot(action.operation);
        return;
      case "forcePushWithLease":
        if (state.remote.knownHead !== state.remote.actualHead) {
          state.remote.rejected = "lease-mismatch";
          return;
        }
        state.remote.knownHead = state.commits[0]?.split(" ")[0] || null;
        state.remote.actualHead = state.remote.knownHead;
        state.remote.ahead = 0;
        state.remote.behind = 0;
        state.remote.fetched = true;
        state.remote.rejected = null;
        return;
      default:
        baseApplyAction(action);
    }
  };

  stateFingerprint = function(value) {
    const normalized = normalizeState(clone(value));
    const base = JSON.parse(baseFingerprint(normalized));
    base.operation = normalized.operation ? normalized.operation.type : null;
    base.blockedSwitch = normalized.blockedSwitch || null;
    return JSON.stringify(base);
  };

  statusOutput = function() {
    const base = baseStatusOutput();
    const lines = [base];
    if (state.operation?.type === "rebase") lines.push("rebase in progress");
    if (state.operation?.type === "merge") lines.push("merge in progress");
    if (state.conflicts.length) lines.push(`unmerged paths: ${state.conflicts.join(", ")}`);
    if (state.blockedSwitch) lines.push(`last switch blocked: ${state.blockedSwitch.file} -> ${state.blockedSwitch.target}`);
    return lines.join("\n");
  };

  commandShape = function(mission) {
    const shapes = {
      "collaboration.rebase-conflict.001": ["git rebase <upstream>", "git status", "git add <resolved-file>", "git rebase --continue"],
      "recovery.rebase-abort.001": ["git rebase <upstream>", "git status", "git rebase --abort"],
      "collaboration.merge-conflict.001": ["git merge <upstream>", "git status", "git add <resolved-file>", "git commit -m \"<merge-message>\""],
      "recovery.merge-abort.001": ["git merge <upstream>", "git status", "git merge --abort"],
      "collaboration.force-with-lease.001": ["git status", "git push --force-with-lease"],
      "workflow.switch-blocked.001": ["git switch <branch>", "git stash push -m \"<message>\"", "git switch <branch>"],
      "collaboration.rebase-multifile.001": ["git rebase <upstream>", "git status", "git add <resolved-file>", "git add <resolved-file>", "git rebase --continue"],
      "collaboration.rebase-skip.001": ["git rebase <upstream>", "git status", "git rebase --skip"]
    };
    return shapes[mission.id]?.[stepIndex] || baseCommandShape(mission);
  };
})();
