(() => {
  const content = window.GIT_ADVENTURES_CONTENT;
  if (!content) throw new Error('Base mission content must load first');

  content.references.push(
    ["git rebase --continue", { en: "Continue rebase after resolving conflicts", ko: "Conflict 해결 후 Rebase 계속" }],
    ["git rebase --abort", { en: "Return to the pre-rebase state", ko: "Rebase 이전 상태로 복귀" }],
    ["git merge --abort", { en: "Return to the pre-merge state", ko: "Merge 이전 상태로 복귀" }],
    ["git push --force-with-lease", { en: "Rewrite a coordinated private remote branch only if it has not moved", ko: "Remote가 바뀌지 않았을 때만 조율된 Private Branch Rewrite" }]
  );

  content.missions.push(
    {
      id: "collaboration.rebase-conflict.001",
      number: 19,
      track: "Collaboration",
      difficulty: 5,
      title: { en: "Resolve a rebase conflict and continue", ko: "Rebase Conflict 해결 후 Continue" },
      story: {
        en: "Team policy requires rebasing your private feature branch. The upstream and your local commit both changed src/protocol.py, so the rebase stops for manual resolution.",
        ko: "Team Policy에 따라 Private Feature Branch를 Rebase합니다. Upstream과 Local Commit이 모두 src/protocol.py를 변경해 Rebase가 수동 해결을 위해 중단됩니다."
      },
      objective: { en: "Start the rebase, inspect the conflict, resolve and stage the file, then continue the rebase.", ko: "Rebase 시작 -> Conflict 확인 -> File 해결 및 Stage -> Rebase Continue" },
      hint: { en: "A stopped rebase is an operation in progress. Resolve the current commit before continuing.", ko: "중단된 Rebase는 진행 중인 Operation입니다. 현재 Commit Conflict를 해결한 뒤 Continue" },
      concept: {
        title: { en: "Rebase conflicts happen while replaying commits", ko: "Rebase Conflict는 Commit Replay 중 발생" },
        body: {
          en: "Resolve the file for the commit currently being replayed, stage the resolution, and continue. The rewritten commit receives a new identity.",
          ko: "현재 Replay 중인 Commit 기준으로 File을 해결하고 Stage한 뒤 Continue합니다. Rewrite된 Commit은 새로운 Identity를 가집니다."
        }
      },
      initial: {
        branch: "feature/protocol-retry", working: [], staged: [], stashes: [], conflicts: [], operation: null,
        commits: ["4aa1001 Add protocol retry", "1200abc Base protocol"],
        remote: { name: "origin", tracking: "origin/feature/protocol-retry", knownHead: "6bb2002", actualHead: "6bb2002", ahead: 1, behind: 1, fetched: true, rejected: null }
      },
      steps: [
        {
          accept: ["^git\\s+rebase\\s+origin/feature/protocol-retry$", "^git\\s+pull\\s+--rebase$"],
          actions: [{ type: "startRebaseConflict", file: "src/protocol.py", base: "6bb2002 Update protocol timeout" }],
          output: { en: "Rebase stopped: conflict in src/protocol.py.", ko: "Rebase 중단: src/protocol.py Conflict 발생." }
        },
        {
          accept: ["^git\\s+status$"],
          output: { en: "Status shows a rebase in progress and src/protocol.py as unmerged.", ko: "Status에서 Rebase 진행 중이며 src/protocol.py가 Unmerged 상태임을 확인했습니다." }
        },
        {
          accept: ["^git\\s+add\\s+src/protocol\\.py$"],
          actions: [{ type: "resolveConflict", file: "src/protocol.py" }],
          output: { en: "The resolved file is staged for the current replayed commit.", ko: "해결한 File을 현재 Replay Commit의 Resolution으로 Stage했습니다." }
        },
        {
          accept: ["^git\\s+rebase\\s+--continue$"],
          actions: [{ type: "continueRebase", base: "6bb2002 Update protocol timeout", rewritten: "91cc310 Add protocol retry" }],
          output: { en: "Rebase completed with a new commit identity on top of the updated upstream.", ko: "갱신된 Upstream 위에서 새로운 Commit Identity로 Rebase가 완료됐습니다." }
        }
      ]
    },
    {
      id: "recovery.rebase-abort.001",
      number: 20,
      track: "Recovery Lab",
      difficulty: 4,
      title: { en: "Abort a rebase when intent is unclear", ko: "의도가 불명확할 때 Rebase Abort" },
      story: {
        en: "A rebase exposes a conflict whose correct product behavior is unclear. You should not guess a resolution just to finish the operation.",
        ko: "Rebase 중 Conflict가 발생했지만 올바른 Product Behavior가 불명확합니다. Operation 완료를 위해 임의로 해결하면 안 됩니다."
      },
      objective: { en: "Start the rebase, inspect the conflict, then abort and return exactly to the pre-rebase state.", ko: "Rebase 시작 -> Conflict 확인 -> Abort하여 Rebase 이전 State로 정확히 복귀" },
      hint: { en: "Abort is a valid safety decision when the correct resolution is unknown.", ko: "올바른 Resolution을 모를 때 Abort는 정당한 Safety Decision" },
      concept: {
        title: { en: "Abort preserves the option to investigate", ko: "Abort는 조사할 선택지를 보존" },
        body: {
          en: "Stopping safely is better than recording a guessed conflict resolution. Rebase abort should restore the original branch state.",
          ko: "추측한 Conflict Resolution을 기록하는 것보다 안전하게 중단하는 것이 낫습니다. Rebase Abort는 원래 Branch State를 복원해야 합니다."
        }
      },
      initial: {
        branch: "feature/calibration", working: [], staged: [], stashes: [], conflicts: [], operation: null,
        commits: ["aa71001 Adjust calibration defaults", "ab00110 Base calibration"],
        remote: { name: "origin", tracking: "origin/feature/calibration", knownHead: "bb82002", actualHead: "bb82002", ahead: 1, behind: 1, fetched: true, rejected: null }
      },
      steps: [
        {
          accept: ["^git\\s+rebase\\s+origin/feature/calibration$"],
          actions: [{ type: "startRebaseConflict", file: "config/calibration.json", base: "bb82002 Update factory calibration" }],
          output: { en: "Rebase stopped with a conflict in config/calibration.json.", ko: "config/calibration.json Conflict로 Rebase가 중단됐습니다." }
        },
        {
          accept: ["^git\\s+status$"],
          output: { en: "The repository confirms an in-progress rebase with an unresolved file.", ko: "Repository에서 Rebase 진행 중이며 Unresolved File이 있음을 확인했습니다." }
        },
        {
          accept: ["^git\\s+rebase\\s+--abort$"],
          actions: [{ type: "abortOperation", operation: "rebase" }],
          output: { en: "The rebase was aborted and the original feature branch state was restored.", ko: "Rebase가 Abort되고 원래 Feature Branch State가 복원됐습니다." }
        }
      ]
    },
    {
      id: "collaboration.merge-conflict.001",
      number: 21,
      track: "Collaboration",
      difficulty: 5,
      title: { en: "Resolve a shared-history merge conflict", ko: "Shared History Merge Conflict 해결" },
      story: {
        en: "A shared integration branch must preserve published ancestry. Merging origin/integration/device conflicts in src/device_alarm.py.",
        ko: "Shared Integration Branch는 Published Ancestry를 보존해야 합니다. origin/integration/device Merge 중 src/device_alarm.py Conflict가 발생합니다."
      },
      objective: { en: "Start the merge, inspect and resolve the conflict, then create the merge commit.", ko: "Merge 시작 -> Conflict 확인 및 해결 -> Merge Commit 생성" },
      hint: { en: "After resolving a merge conflict, stage the file and record the merge result as a commit.", ko: "Merge Conflict 해결 후 File을 Stage하고 Merge Result를 Commit으로 기록" },
      concept: {
        title: { en: "A merge conflict is resolved in the combined result", ko: "Merge Conflict는 결합 결과에서 해결" },
        body: {
          en: "Unlike rebase replay, a merge resolution produces one combined history node that preserves both parents.",
          ko: "Rebase Replay와 달리 Merge Resolution은 양쪽 Parent를 보존하는 하나의 결합 History Node를 만듭니다."
        }
      },
      initial: {
        branch: "integration/device", working: [], staged: [], stashes: [], conflicts: [], operation: null,
        commits: ["31af010 Integrate device telemetry", "20cd100 Base integration"],
        remote: { name: "origin", tracking: "origin/integration/device", knownHead: "4c821a0", actualHead: "4c821a0", ahead: 1, behind: 1, fetched: true, rejected: null }
      },
      steps: [
        {
          accept: ["^git\\s+merge\\s+origin/integration/device$", "^git\\s+pull\\s+--no-rebase$"],
          actions: [{ type: "startMergeConflict", file: "src/device_alarm.py", remoteCommit: "4c821a0 Update device alarms" }],
          output: { en: "Merge stopped: conflict in src/device_alarm.py.", ko: "Merge 중단: src/device_alarm.py Conflict 발생." }
        },
        {
          accept: ["^git\\s+status$"],
          output: { en: "Status shows a merge in progress with src/device_alarm.py unmerged.", ko: "Status에서 Merge 진행 중이며 src/device_alarm.py가 Unmerged 상태임을 확인했습니다." }
        },
        {
          accept: ["^git\\s+add\\s+src/device_alarm\\.py$"],
          actions: [{ type: "resolveConflict", file: "src/device_alarm.py" }],
          output: { en: "The conflict resolution is staged.", ko: "Conflict Resolution을 Stage했습니다." }
        },
        {
          accept: ["^git\\s+commit\\s+-m\\s+[\"']Merge origin/integration/device[\"']$"],
          actions: [{ type: "continueMerge", mergeCommit: "d711010 Merge origin/integration/device", remoteCommit: "4c821a0 Update device alarms" }],
          output: { en: "The merge commit records the resolved combined history.", ko: "Merge Commit이 해결된 Combined History를 기록했습니다." }
        }
      ]
    },
    {
      id: "recovery.merge-abort.001",
      number: 22,
      track: "Recovery Lab",
      difficulty: 4,
      title: { en: "Abort a merge without leaving partial state", ko: "Partial State 없이 Merge Abort" },
      story: {
        en: "A merge conflict reveals that the upstream change needs design review before integration. Return to the exact pre-merge state.",
        ko: "Merge Conflict를 확인해보니 Upstream 변경은 Integration 전 Design Review가 필요합니다. Merge 이전 State로 정확히 복귀합니다."
      },
      objective: { en: "Start the merge, inspect the conflict, then abort it safely.", ko: "Merge 시작 -> Conflict 확인 -> 안전하게 Abort" },
      hint: { en: "Do not manually delete conflict markers to escape the operation; abort the merge operation itself.", ko: "Operation을 빠져나가기 위해 Conflict Marker를 임의 삭제하지 말고 Merge 자체를 Abort" },
      concept: {
        title: { en: "Abort should remove partial integration state", ko: "Abort는 Partial Integration State 제거" },
        body: {
          en: "A safe abort restores the branch, index, and operation state so investigation can continue from a known baseline.",
          ko: "안전한 Abort는 Branch, Index, Operation State를 복원해 Known Baseline에서 조사를 계속할 수 있게 합니다."
        }
      },
      initial: {
        branch: "integration/power", working: [], staged: [], stashes: [], conflicts: [], operation: null,
        commits: ["10ab900 Integrate power telemetry", "090aa00 Base power integration"],
        remote: { name: "origin", tracking: "origin/integration/power", knownHead: "20bc901", actualHead: "20bc901", ahead: 1, behind: 1, fetched: true, rejected: null }
      },
      steps: [
        {
          accept: ["^git\\s+merge\\s+origin/integration/power$"],
          actions: [{ type: "startMergeConflict", file: "src/power_state.py", remoteCommit: "20bc901 Update power transitions" }],
          output: { en: "Merge stopped with a conflict in src/power_state.py.", ko: "src/power_state.py Conflict로 Merge가 중단됐습니다." }
        },
        {
          accept: ["^git\\s+status$"],
          output: { en: "The repository confirms an in-progress merge and unresolved file.", ko: "Repository에서 Merge 진행 중이며 Unresolved File이 있음을 확인했습니다." }
        },
        {
          accept: ["^git\\s+merge\\s+--abort$"],
          actions: [{ type: "abortOperation", operation: "merge" }],
          output: { en: "The merge was aborted and the original integration branch state was restored.", ko: "Merge가 Abort되고 원래 Integration Branch State가 복원됐습니다." }
        }
      ]
    },
    {
      id: "collaboration.force-with-lease.001",
      number: 23,
      track: "Collaboration",
      difficulty: 5,
      title: { en: "Use force-with-lease only under a verified rewrite contract", ko: "검증된 Rewrite Contract에서만 Force-with-Lease 사용" },
      story: {
        en: "You rebased a private feature branch that only you own. The team explicitly permits rewriting it. You fetched immediately before pushing, and the remote HEAD still matches the value you verified.",
        ko: "본인만 사용하는 Private Feature Branch를 Rebase했고 Team이 Rewrite를 명시적으로 허용합니다. Push 직전에 Fetch했으며 Remote HEAD가 검증한 값과 동일합니다."
      },
      objective: { en: "Publish the rewritten private branch while refusing to overwrite unexpected new remote work.", ko: "예상하지 못한 Remote 변경은 덮어쓰지 않도록 보호하면서 Rewrite된 Private Branch Publish" },
      hint: { en: "Plain force ignores remote movement; lease adds a remote-state precondition.", ko: "일반 Force는 Remote Movement를 무시하지만 Lease는 Remote State Precondition을 추가" },
      concept: {
        title: { en: "Force-with-lease is conditional history replacement", ko: "Force-with-Lease는 조건부 History Replacement" },
        body: {
          en: "This is not a normal push tool. It belongs only in an explicitly coordinated rewrite where the expected remote state has been verified immediately beforehand.",
          ko: "일반 Push 도구가 아닙니다. Expected Remote State를 직전에 검증하고 Rewrite를 명시적으로 조율한 경우에만 사용해야 합니다."
        }
      },
      initial: {
        branch: "feature/private-cleanup", working: [], staged: [], stashes: [], conflicts: [], operation: null,
        commits: ["cc91003 Cleanup retry state", "bb80002 Add retry state"],
        remote: { name: "origin", tracking: "origin/feature/private-cleanup", knownHead: "aa70001", actualHead: "aa70001", ahead: 2, behind: 0, fetched: true, rejected: "rewrite-required" }
      },
      steps: [
        {
          accept: ["^git\\s+status$"],
          output: { en: "The branch is a verified private rewrite candidate and the remote has not moved since fetch.", ko: "Private Rewrite 대상이며 Fetch 이후 Remote가 변경되지 않았음을 확인했습니다." }
        },
        {
          accept: ["^git\\s+push\\s+--force-with-lease$", "^git\\s+push\\s+--force-with-lease\\s+origin\\s+feature/private-cleanup$"],
          actions: [{ type: "forcePushWithLease" }],
          output: { en: "The rewritten branch was published only because the verified remote lease still matched.", ko: "검증한 Remote Lease가 일치했기 때문에 Rewrite된 Branch가 Publish됐습니다." }
        }
      ]
    }
  );
})();
