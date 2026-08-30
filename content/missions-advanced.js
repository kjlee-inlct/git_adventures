(() => {
  const content = window.GIT_ADVENTURES_CONTENT;
  if (!content) throw new Error('Base mission content must load first');

  content.references.push(
    ["git rebase --skip", { en: "Drop the current rebased commit and continue", ko: "현재 Rebase 대상 Commit을 제외하고 계속" }]
  );

  content.missions.push(
    {
      id: "workflow.switch-blocked.001",
      number: 24,
      track: "Daily Workflow",
      difficulty: 3,
      title: { en: "Respect a blocked branch switch", ko: "Branch Switch 차단 이유 이해" },
      story: {
        en: "You have unfinished edits in src/device.py. An urgent task requires main, but switching now would overwrite work that differs on the target branch.",
        ko: "src/device.py에 미완성 변경이 있습니다. 긴급 작업을 위해 main으로 이동해야 하지만 Target Branch의 내용과 겹쳐 현재 Switch는 작업을 덮어쓸 수 있습니다."
      },
      objective: { en: "Observe the blocked switch, preserve the WIP, then switch safely to main.", ko: "Switch 차단을 확인하고 WIP를 보존한 뒤 안전하게 main으로 이동" },
      hint: { en: "Git is protecting your working copy. Preserve unfinished work before changing branches.", ko: "Git이 Working Copy를 보호하고 있습니다. Branch 이동 전 미완성 작업을 보존" },
      concept: {
        title: { en: "A blocked switch is data protection", ko: "Switch 차단은 Data Protection" },
        body: {
          en: "When checkout or switch would overwrite local modifications, Git refuses the operation. The correct response is to preserve or finish the work, not bypass the guardrail.",
          ko: "Switch가 Local 변경을 덮어쓸 수 있으면 Git은 작업을 거부합니다. 올바른 대응은 Guardrail 우회가 아니라 작업을 보존하거나 완료하는 것입니다."
        }
      },
      initial: {
        branch: "feature/device-calibration",
        working: [{ name: "src/device.py", status: "modified", delta: "+24 -7" }],
        staged: [], conflicts: [], stashes: [], operation: null, blockedSwitch: null,
        commits: ["a41c92e Initial device controller"],
        remote: { name: "origin", tracking: "origin/feature/device-calibration", knownHead: "a41c92e", actualHead: "a41c92e", ahead: 0, behind: 0, fetched: true, rejected: null }
      },
      steps: [
        {
          accept: ["^git\\s+switch\\s+main$"],
          actions: [{ type: "switchBlocked", target: "main", file: "src/device.py" }],
          output: { en: "Switch blocked: src/device.py would be overwritten by checkout.", ko: "Switch 차단: checkout 시 src/device.py Local 변경이 덮어써질 수 있습니다." }
        },
        {
          accept: ["^git\\s+stash\\s+push\\s+-m\\s+[\"']WIP device calibration[\"']$"],
          actions: [{ type: "stashPush", message: "WIP device calibration" }, { type: "clearBlockedSwitch" }],
          output: { en: "The unfinished calibration work is preserved and the Working Tree is clean.", ko: "미완성 Calibration 작업을 Stash에 보존하여 Working Tree가 Clean해졌습니다." }
        },
        {
          accept: ["^git\\s+switch\\s+main$"],
          actions: [{ type: "switchBranch", name: "main" }],
          output: { en: "You switched to main without losing the unfinished work.", ko: "미완성 작업 손실 없이 main으로 이동했습니다." }
        }
      ]
    },
    {
      id: "collaboration.rebase-multifile.001",
      number: 25,
      track: "Collaboration",
      difficulty: 5,
      title: { en: "Resolve a multi-file rebase conflict", ko: "Multi-file Rebase Conflict 해결" },
      story: {
        en: "A private feature commit touches both transfer.py and its test. Upstream changed both files too, so replaying the commit stops with two conflicts.",
        ko: "Private Feature Commit이 transfer.py와 Test를 함께 수정했습니다. Upstream도 두 File을 변경해 Rebase 중 두 Conflict가 동시에 발생합니다."
      },
      objective: { en: "Inspect both conflicts, resolve and stage both files, then continue the rebase.", ko: "두 Conflict 확인 -> 두 File 모두 해결 및 Stage -> Rebase Continue" },
      hint: { en: "A rebase cannot continue until every unmerged path for the current commit is resolved.", ko: "현재 Commit의 모든 Unmerged Path를 해결해야 Rebase Continue 가능" },
      concept: {
        title: { en: "Conflict resolution is a set, not a single file event", ko: "Conflict Resolution은 전체 Set 기준" },
        body: {
          en: "In real changes, one logical commit can conflict across implementation and tests. Continue only after the full conflict set is resolved and staged coherently.",
          ko: "실제 작업에서는 하나의 논리적 Commit이 구현과 Test 여러 File에서 Conflict날 수 있습니다. 전체 Conflict Set을 일관되게 해결·Stage한 뒤 Continue해야 합니다."
        }
      },
      initial: {
        branch: "feature/firmware-download", working: [], staged: [], conflicts: [], stashes: [], operation: null,
        commits: ["f22a010 Fix firmware checksum retry", "8bf210c Add firmware block transfer"],
        remote: { name: "origin", tracking: "origin/feature/firmware-download", knownHead: "9cd991a", actualHead: "9cd991a", ahead: 1, behind: 1, fetched: true, rejected: null }
      },
      steps: [
        {
          accept: ["^git\\s+rebase\\s+origin/feature/firmware-download$"],
          actions: [{ type: "startRebaseConflict", files: ["src/transfer.py", "tests/test_transfer.py"], base: "9cd991a Teammate update" }],
          output: { en: "Rebase stopped with conflicts in transfer.py and test_transfer.py.", ko: "transfer.py와 test_transfer.py Conflict로 Rebase가 중단됐습니다." }
        },
        {
          accept: ["^git\\s+status$"],
          output: { en: "Status shows two unmerged paths while rebase is in progress.", ko: "Rebase 진행 중 두 개의 Unmerged Path를 확인했습니다." }
        },
        {
          accept: ["^git\\s+add\\s+src/transfer\\.py$"],
          actions: [{ type: "resolveConflict", file: "src/transfer.py" }],
          output: { en: "transfer.py is resolved, but one conflict remains.", ko: "transfer.py는 해결됐지만 Conflict 하나가 남아 있습니다." }
        },
        {
          accept: ["^git\\s+add\\s+tests/test_transfer\\.py$"],
          actions: [{ type: "resolveConflict", file: "tests/test_transfer.py" }],
          output: { en: "All conflict paths for the rebased commit are now resolved and staged.", ko: "현재 Rebase Commit의 모든 Conflict Path가 해결 및 Stage됐습니다." }
        },
        {
          accept: ["^git\\s+rebase\\s+--continue$"],
          actions: [{ type: "continueRebase", base: "9cd991a Teammate update", rewritten: "d55ea31 Fix firmware checksum retry" }],
          output: { en: "Rebase completed after the entire conflict set was resolved.", ko: "전체 Conflict Set 해결 후 Rebase가 완료됐습니다." }
        }
      ]
    },
    {
      id: "collaboration.rebase-skip.001",
      number: 26,
      track: "Collaboration",
      difficulty: 5,
      title: { en: "Skip a commit only when its intent is obsolete", ko: "불필요해진 Commit만 Rebase Skip" },
      story: {
        en: "A local commit changes a default that upstream has already replaced with the final team-approved behavior. Replaying that old commit conflicts, and product review confirms the local commit should no longer exist.",
        ko: "Local Commit이 Default를 수정했지만 Upstream에서 이미 최종 Team-approved 동작으로 대체했습니다. 해당 Commit Rebase 시 Conflict가 발생했고 Review 결과 Local Commit 자체가 더 이상 필요 없습니다."
      },
      objective: { en: "Inspect the stopped rebase, then skip the obsolete commit instead of inventing a meaningless resolution.", ko: "중단된 Rebase 상태 확인 후 의미 없는 Resolution 대신 불필요해진 Commit Skip" },
      hint: { en: "Skip discards the current rebased commit. Use it only because this scenario explicitly confirms that commit intent is obsolete.", ko: "Skip은 현재 Rebase 대상 Commit을 버립니다. 이 Scenario에서는 Commit Intent가 불필요해졌음이 명시적으로 확인됐기 때문에 사용" },
      concept: {
        title: { en: "Rebase skip is a history decision", ko: "Rebase Skip은 History Decision" },
        body: {
          en: "Skipping is not a generic conflict shortcut. It means the current commit will not appear in the rebased history, so its intent must be intentionally obsolete or already represented elsewhere.",
          ko: "Skip은 일반적인 Conflict 우회가 아닙니다. 현재 Commit이 Rebased History에서 사라지므로 Intent가 의도적으로 불필요해졌거나 다른 곳에 이미 반영됐을 때만 사용해야 합니다."
        }
      },
      initial: {
        branch: "feature/default-tuning", working: [], staged: [], conflicts: [], stashes: [], operation: null,
        commits: ["aa90110 Tune legacy default", "8110abc Add tuning framework"],
        remote: { name: "origin", tracking: "origin/feature/default-tuning", knownHead: "cd88120", actualHead: "cd88120", ahead: 1, behind: 1, fetched: true, rejected: null }
      },
      steps: [
        {
          accept: ["^git\\s+rebase\\s+origin/feature/default-tuning$"],
          actions: [{ type: "startRebaseConflict", file: "config/defaults.json", base: "cd88120 Finalize team defaults" }],
          output: { en: "The obsolete local default commit conflicts while being replayed.", ko: "불필요해진 Local Default Commit 재적용 중 Conflict가 발생했습니다." }
        },
        {
          accept: ["^git\\s+status$"],
          output: { en: "Status confirms rebase is stopped on the obsolete commit.", ko: "불필요해진 Commit에서 Rebase가 중단된 상태를 확인했습니다." }
        },
        {
          accept: ["^git\\s+rebase\\s+--skip$"],
          actions: [{ type: "skipRebase", base: "cd88120 Finalize team defaults" }],
          output: { en: "The obsolete commit was omitted and the rebase completed on the upstream history.", ko: "불필요해진 Commit을 제외하고 Upstream History 기준으로 Rebase가 완료됐습니다." }
        }
      ]
    }
  );
})();
