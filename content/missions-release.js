(() => {
  const content = window.GIT_ADVENTURES_CONTENT;
  if (!content) throw new Error('Base mission content must load first');

  content.references.push(
    ["git cherry-pick <sha>", { en: "Apply one selected commit onto the current branch", ko: "선택한 하나의 Commit을 현재 Branch에 적용" }],
    ["git cherry-pick --continue", { en: "Continue cherry-pick after resolving conflicts", ko: "Conflict 해결 후 Cherry-pick 계속" }],
    ["git cherry-pick --abort", { en: "Cancel cherry-pick and restore the pre-operation state", ko: "Cherry-pick 취소 및 Operation 이전 State 복원" }]
  );

  content.missions.push(
    {
      id: "collaboration.merge-multifile.001",
      number: 27,
      track: "Collaboration",
      difficulty: 5,
      title: { en: "Resolve a multi-file merge conflict", ko: "Multi-file Merge Conflict 해결" },
      story: {
        en: "The shared integration branch and origin both changed device_alarm.py and its test. Team policy requires a merge that preserves published ancestry.",
        ko: "Shared Integration Branch와 origin이 device_alarm.py 및 Test를 모두 변경했습니다. Team Policy는 Published Ancestry를 보존하는 Merge를 요구합니다."
      },
      objective: { en: "Merge upstream, inspect both conflicts, resolve and stage both paths, then create the merge commit.", ko: "Upstream Merge -> 두 Conflict 확인 -> 두 Path 해결 및 Stage -> Merge Commit 생성" },
      hint: { en: "A merge commit should be created only after every unmerged path has been resolved.", ko: "모든 Unmerged Path를 해결한 뒤에만 Merge Commit 생성" },
      concept: {
        title: { en: "A merge conflict is one integration operation with many paths", ko: "Merge Conflict는 여러 Path를 가진 하나의 Integration Operation" },
        body: {
          en: "Do not treat each conflicted file as an independent merge. The merge operation remains incomplete until the entire conflict set is resolved coherently.",
          ko: "Conflict File 각각을 독립 Merge처럼 다루지 않습니다. 전체 Conflict Set이 일관되게 해결될 때까지 Merge Operation은 완료되지 않습니다."
        }
      },
      initial: {
        branch: "integration/device", working: [], staged: [], conflicts: [], stashes: [], operation: null,
        commits: ["41ac110 Adjust alarm thresholds", "20cd100 Base integration"],
        remote: { name: "origin", tracking: "origin/integration/device", knownHead: "52bd210", actualHead: "52bd210", ahead: 1, behind: 1, fetched: true, rejected: null }
      },
      steps: [
        {
          accept: ["^git\\s+merge\\s+origin/integration/device$"],
          actions: [{ type: "startMergeConflict", files: ["src/device_alarm.py", "tests/test_device_alarm.py"], remoteCommit: "52bd210 Update alarm handling" }],
          output: { en: "Merge stopped with two unmerged paths.", ko: "두 개의 Unmerged Path로 Merge가 중단됐습니다." }
        },
        {
          accept: ["^git\\s+status$"],
          output: { en: "Status shows both conflicted files while merge is in progress.", ko: "Merge 진행 중 두 Conflict File을 확인했습니다." }
        },
        {
          accept: ["^git\\s+add\\s+src/device_alarm\\.py$"],
          actions: [{ type: "resolveConflict", file: "src/device_alarm.py" }],
          output: { en: "device_alarm.py is resolved; one unmerged path remains.", ko: "device_alarm.py는 해결됐지만 Unmerged Path 하나가 남아 있습니다." }
        },
        {
          accept: ["^git\\s+add\\s+tests/test_device_alarm\\.py$"],
          actions: [{ type: "resolveConflict", file: "tests/test_device_alarm.py" }],
          output: { en: "The full merge conflict set is now resolved and staged.", ko: "전체 Merge Conflict Set이 해결 및 Stage됐습니다." }
        },
        {
          accept: ["^git\\s+commit\\s+-m\\s+[\"']Merge origin/integration/device[\"']$"],
          actions: [{ type: "continueMerge", remoteCommit: "52bd210 Update alarm handling", mergeCommit: "63ce310 Merge origin/integration/device" }],
          output: { en: "The merge commit records the completed integration after both paths were resolved.", ko: "두 Path 모두 해결한 뒤 Merge Commit으로 Integration을 완료했습니다." }
        }
      ]
    },
    {
      id: "release.cherry-pick.001",
      number: 28,
      track: "Release & Incident",
      difficulty: 3,
      title: { en: "Backport only the required hotfix", ko: "필요한 Hotfix만 Backport" },
      story: {
        en: "main contains several new features, but release/2.4 needs only the verified serial timeout hotfix. Merging all of main would widen release risk.",
        ko: "main에는 여러 신규 Feature가 있지만 release/2.4에는 검증된 Serial Timeout Hotfix만 필요합니다. main 전체 Merge는 Release Risk를 불필요하게 키웁니다."
      },
      objective: { en: "Apply only commit c182bb7 to release/2.4.", ko: "c182bb7 Commit만 release/2.4에 적용" },
      hint: { en: "Select the exact commit whose change intent belongs in this release.", ko: "이번 Release에 필요한 Change Intent를 가진 정확한 Commit만 선택" },
      concept: {
        title: { en: "Backport by change intent, not branch size", ko: "Branch 전체가 아닌 Change Intent 단위 Backport" },
        body: {
          en: "Cherry-pick is useful when a maintained release branch needs one verified change without absorbing unrelated development history.",
          ko: "유지보수 Release Branch에 검증된 특정 변경만 필요하고 무관한 개발 History는 포함하면 안 될 때 Cherry-pick이 유용합니다."
        }
      },
      initial: {
        branch: "release/2.4", working: [], staged: [], conflicts: [], stashes: [], operation: null,
        commits: ["240aa10 Release 2.4.3", "230bb00 Stabilize release branch"],
        remote: { name: "origin", tracking: "origin/release/2.4", knownHead: "240aa10", actualHead: "240aa10", ahead: 0, behind: 0, fetched: true, rejected: null }
      },
      steps: [{
        accept: ["^git\\s+cherry-pick\\s+c182bb7$"],
        actions: [{ type: "cherryPick", source: "c182bb7", sha: "24cb711", message: "Fix serial timeout handling" }],
        output: { en: "Only the serial timeout fix was added to release/2.4 as a new commit.", ko: "Serial Timeout Fix만 release/2.4에 새로운 Commit으로 적용됐습니다." }
      }]
    },
    {
      id: "release.cherry-pick-conflict.001",
      number: 29,
      track: "Release & Incident",
      difficulty: 5,
      title: { en: "Resolve a backport conflict without widening scope", ko: "Scope를 넓히지 않고 Backport Conflict 해결" },
      story: {
        en: "The main-branch hotfix touches transfer.py, but release/2.4 has older transfer logic. Cherry-picking the verified fix conflicts with the release implementation.",
        ko: "main의 Hotfix가 transfer.py를 수정하지만 release/2.4는 더 오래된 Transfer Logic을 사용합니다. 검증된 Fix Backport 중 Release 구현과 Conflict가 발생합니다."
      },
      objective: { en: "Cherry-pick the hotfix, inspect the conflict, adapt the fix to the release branch, stage it, then continue.", ko: "Hotfix Cherry-pick -> Conflict 확인 -> Release Branch에 맞게 Fix 조정 -> Stage -> Continue" },
      hint: { en: "Preserve the hotfix intent while adapting implementation details to the older release branch.", ko: "Hotfix Intent는 유지하되 오래된 Release Branch 구현에 맞게 세부 구현 조정" },
      concept: {
        title: { en: "A backport preserves intent, not necessarily identical lines", ko: "Backport는 동일 Line이 아니라 Intent를 보존" },
        body: {
          en: "Release branches often differ structurally from main. Conflict resolution should preserve the verified fix intent while respecting the release branch architecture.",
          ko: "Release Branch는 main과 구조가 다를 수 있습니다. Conflict Resolution은 검증된 Fix Intent를 유지하면서 Release Branch 구조를 존중해야 합니다."
        }
      },
      initial: {
        branch: "release/2.4", working: [], staged: [], conflicts: [], stashes: [], operation: null,
        commits: ["240aa10 Release 2.4.3", "230bb00 Stabilize release branch"],
        remote: { name: "origin", tracking: "origin/release/2.4", knownHead: "240aa10", actualHead: "240aa10", ahead: 0, behind: 0, fetched: true, rejected: null }
      },
      steps: [
        {
          accept: ["^git\\s+cherry-pick\\s+8bf210c$"],
          actions: [{ type: "startCherryPickConflict", source: "8bf210c", file: "src/transfer.py", message: "Add firmware block transfer" }],
          output: { en: "Cherry-pick stopped with a conflict in src/transfer.py.", ko: "src/transfer.py Conflict로 Cherry-pick이 중단됐습니다." }
        },
        {
          accept: ["^git\\s+status$"],
          output: { en: "Status shows cherry-pick in progress with one unmerged path.", ko: "Cherry-pick 진행 중이며 하나의 Unmerged Path가 있음을 확인했습니다." }
        },
        {
          accept: ["^git\\s+add\\s+src/transfer\\.py$"],
          actions: [{ type: "resolveConflict", file: "src/transfer.py" }],
          output: { en: "The release-specific adaptation is staged as the resolved backport.", ko: "Release 전용 조정 결과를 해결된 Backport로 Stage했습니다." }
        },
        {
          accept: ["^git\\s+cherry-pick\\s+--continue$"],
          actions: [{ type: "continueCherryPick", sha: "24bc821", message: "Add firmware block transfer" }],
          output: { en: "The hotfix intent is now recorded on release/2.4 with release-specific conflict resolution.", ko: "Release 전용 Conflict Resolution을 포함해 Hotfix Intent가 release/2.4에 기록됐습니다." }
        }
      ]
    },
    {
      id: "release.cherry-pick-abort.001",
      number: 30,
      track: "Release & Incident",
      difficulty: 4,
      title: { en: "Abort the wrong backport before it changes the release", ko: "잘못 선택한 Backport를 Release 변경 전 Abort" },
      story: {
        en: "During an incident, commit 91cc310 was selected by mistake. Its protocol retry feature is not approved for release/2.4, and the cherry-pick stops with a conflict.",
        ko: "Incident 대응 중 91cc310 Commit을 잘못 선택했습니다. Protocol Retry Feature는 release/2.4 승인 대상이 아니며 Cherry-pick도 Conflict로 중단됐습니다."
      },
      objective: { en: "Inspect the stopped cherry-pick and abort it, restoring the exact release branch state.", ko: "중단된 Cherry-pick 확인 후 Abort하여 Release Branch State를 정확히 복원" },
      hint: { en: "Do not resolve a conflict for a change that should never enter this release.", ko: "이번 Release에 들어가면 안 되는 변경의 Conflict를 억지로 해결하지 않음" },
      concept: {
        title: { en: "Abort can be the safest release decision", ko: "Abort는 가장 안전한 Release Decision이 될 수 있음" },
        body: {
          en: "Incident pressure is not a reason to continue the wrong change. If commit intent is out of scope, restore the pre-operation release state and choose the correct backport.",
          ko: "Incident 압박 때문에 잘못된 변경을 계속 진행하면 안 됩니다. Commit Intent가 Release Scope 밖이라면 Operation 이전 State로 복원하고 올바른 Backport를 다시 선택해야 합니다."
        }
      },
      initial: {
        branch: "release/2.4", working: [], staged: [], conflicts: [], stashes: [], operation: null,
        commits: ["240aa10 Release 2.4.3", "230bb00 Stabilize release branch"],
        remote: { name: "origin", tracking: "origin/release/2.4", knownHead: "240aa10", actualHead: "240aa10", ahead: 0, behind: 0, fetched: true, rejected: null }
      },
      steps: [
        {
          accept: ["^git\\s+cherry-pick\\s+91cc310$"],
          actions: [{ type: "startCherryPickConflict", source: "91cc310", file: "src/protocol.py", message: "Add protocol retry" }],
          output: { en: "Cherry-pick stopped. The selected commit is not approved for this release.", ko: "Cherry-pick이 중단됐으며 선택한 Commit은 이번 Release 승인 대상이 아닙니다." }
        },
        {
          accept: ["^git\\s+status$"],
          output: { en: "Status confirms a cherry-pick is in progress on an out-of-scope commit.", ko: "Release Scope 밖 Commit의 Cherry-pick이 진행 중임을 확인했습니다." }
        },
        {
          accept: ["^git\\s+cherry-pick\\s+--abort$"],
          actions: [{ type: "abortOperation", operation: "cherry-pick" }],
          output: { en: "The release branch returned exactly to its pre-cherry-pick state.", ko: "Release Branch가 Cherry-pick 이전 State로 정확히 복원됐습니다." }
        }
      ]
    }
  );
})();
