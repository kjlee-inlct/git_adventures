(() => {
  const content = window.GIT_ADVENTURES_CONTENT;
  if (!content) throw new Error('Base mission content must load first');

  content.references.push(
    ["git push", { en: "Publish commits to an existing upstream", ko: "기존 Upstream에 Commit Publish" }],
    ["git pull --rebase", { en: "Replay local commits on updated upstream", ko: "갱신된 Upstream 위에 Local Commit 재적용" }],
    ["git pull --no-rebase", { en: "Integrate upstream with a merge commit", ko: "Merge Commit으로 Upstream 통합" }],
    ["git stash drop", { en: "Remove a stash entry after verified recovery", ko: "복구 확인 후 Stash Entry 제거" }]
  );

  content.missions.push(
    {
      id: "workflow.push-reject.001",
      number: 14,
      track: "Daily Workflow",
      difficulty: 3,
      title: { en: "Treat a rejected push as new information", ko: "Push Reject를 새로운 정보로 해석" },
      story: {
        en: "You committed a firmware validation fix locally. A teammate pushed to the same branch before you. Your next push cannot fast-forward the remote branch.",
        ko: "Firmware Validation Fix를 Local에 Commit했습니다. 그 사이 동료가 같은 Branch에 Push하여 현재 Push는 Remote를 Fast-forward할 수 없습니다."
      },
      objective: { en: "Experience the rejected push, then refresh origin before deciding how to integrate.", ko: "Push Reject를 확인한 뒤 Integration 판단 전에 origin 정보 갱신" },
      hint: { en: "Do not force push. First learn what changed remotely.", ko: "Force Push하지 말고 먼저 Remote 변경을 확인" },
      concept: {
        title: { en: "A rejected push protects remote history", ko: "Push Reject는 Remote History 보호 장치" },
        body: {
          en: "Non-fast-forward rejection means the remote contains history you do not have locally. The safe next move is investigation, not force.",
          ko: "Non-fast-forward Reject는 Local에 없는 History가 Remote에 있다는 의미입니다. 안전한 다음 행동은 Force가 아니라 Investigation입니다."
        }
      },
      initial: {
        branch: "feature/firmware-download", working: [], staged: [], stashes: [], conflicts: [],
        commits: ["f22a010 Fix firmware checksum retry", "8bf210c Add firmware block transfer"],
        remote: { name: "origin", tracking: "origin/feature/firmware-download", knownHead: "8bf210c", actualHead: "9cd991a", ahead: 1, behind: 1, fetched: false }
      },
      steps: [
        {
          accept: ["^git\\s+push$", "^git\\s+push\\s+origin\\s+feature/firmware-download$"],
          actions: [{ type: "pushRejected", reason: "non-fast-forward" }],
          output: { en: "Push rejected: origin contains commits your local branch does not have.", ko: "Push Reject: Local Branch에 없는 Commit이 origin에 존재합니다." }
        },
        {
          accept: ["^git\\s+fetch\\s+origin$", "^git\\s+fetch$"],
          actions: [{ type: "fetch" }],
          output: { en: "Remote-tracking information is current. The branch is now visibly diverged: ahead 1, behind 1.", ko: "Remote Tracking 정보가 갱신됐습니다. Branch가 ahead 1 / behind 1로 Diverge된 상태가 확인됩니다." }
        }
      ]
    },
    {
      id: "collaboration.divergence.001",
      number: 15,
      track: "Collaboration",
      difficulty: 3,
      title: { en: "Read divergence before choosing a policy", ko: "Policy 선택 전 Divergence 확인" },
      story: {
        en: "After fetch, your feature branch is one commit ahead and one behind its upstream. Before integrating anything, inspect the branch relationship.",
        ko: "Fetch 후 Feature Branch가 Upstream보다 1 Commit Ahead이면서 1 Commit Behind입니다. Integration 전에 Branch 관계부터 확인합니다."
      },
      objective: { en: "Inspect the repository status and identify the ahead/behind relationship.", ko: "Repository Status에서 Ahead/Behind 관계 확인" },
      hint: { en: "The status view should tell you whether the histories have diverged.", ko: "Status에서 History Divergence 여부 확인" },
      concept: {
        title: { en: "Divergence is a decision point", ko: "Divergence는 Integration Decision Point" },
        body: {
          en: "When both sides contain unique commits, Git cannot solve team intent for you. Merge or rebase is a policy decision, not a universal command preference.",
          ko: "양쪽에 고유 Commit이 있으면 Git이 Team Intent까지 결정할 수 없습니다. Merge/Rebase는 절대적인 정답이 아니라 Policy Decision입니다."
        }
      },
      initial: {
        branch: "feature/firmware-download", working: [], staged: [], stashes: [], conflicts: [],
        commits: ["f22a010 Fix firmware checksum retry", "8bf210c Add firmware block transfer"],
        remote: { name: "origin", tracking: "origin/feature/firmware-download", knownHead: "9cd991a", actualHead: "9cd991a", ahead: 1, behind: 1, fetched: true }
      },
      steps: [{
        accept: ["^git\\s+status$"],
        output: { en: "Status confirms the branch and its upstream have diverged: ahead 1, behind 1.", ko: "Status에서 Local과 Upstream이 Diverge되어 Ahead 1 / Behind 1임을 확인했습니다." }
      }]
    },
    {
      id: "collaboration.rebase.001",
      number: 16,
      track: "Collaboration",
      difficulty: 4,
      title: { en: "Follow a rebase policy deliberately", ko: "Rebase Policy를 의도적으로 적용" },
      story: {
        en: "This feature branch is private to you and the team policy requires rebasing local feature commits onto the latest upstream before review.",
        ko: "이 Feature Branch는 개인 작업 Branch이며 Team Policy상 Review 전에 최신 Upstream 위로 Local Commit을 Rebase해야 합니다."
      },
      objective: { en: "Rebase onto the configured upstream, then publish the rebased branch with a normal push.", ko: "Configured Upstream 위로 Rebase한 뒤 일반 Push로 Branch Publish" },
      hint: { en: "The scenario explicitly requires rebase; after a clean local rebase, push the resulting history.", ko: "이 Scenario는 Rebase Policy를 명시합니다. Local Rebase 완료 후 결과 History를 Push" },
      concept: {
        title: { en: "Rebase rewrites local commit identity", ko: "Rebase는 Local Commit Identity를 Rewrite" },
        body: {
          en: "Rebase can create a linear feature history, but it is safest when the rewritten commits are still private or the team explicitly coordinates the rewrite.",
          ko: "Rebase는 Linear History를 만들 수 있지만 Rewrite 대상 Commit이 아직 Private하거나 Team이 명시적으로 Rewrite를 조율할 때 안전합니다."
        }
      },
      initial: {
        branch: "feature/firmware-download", working: [], staged: [], stashes: [], conflicts: [],
        commits: ["f22a010 Fix firmware checksum retry", "8bf210c Add firmware block transfer"],
        remote: { name: "origin", tracking: "origin/feature/firmware-download", knownHead: "9cd991a", actualHead: "9cd991a", ahead: 1, behind: 1, fetched: true }
      },
      steps: [
        {
          accept: ["^git\\s+pull\\s+--rebase$", "^git\\s+rebase\\s+origin/feature/firmware-download$"],
          actions: [{ type: "rebase", base: "9cd991a Teammate update", rewritten: "a31bc77 Fix firmware checksum retry" }],
          output: { en: "The local feature commit was replayed on origin/feature/firmware-download and received a new commit identity.", ko: "Local Feature Commit이 origin/feature/firmware-download 위에 재적용되어 새로운 Commit Identity를 갖게 됐습니다." }
        },
        {
          accept: ["^git\\s+push$", "^git\\s+push\\s+origin\\s+feature/firmware-download$"],
          actions: [{ type: "push" }],
          output: { en: "The rebased feature history is now published and the branch is synchronized.", ko: "Rebase된 Feature History가 Publish되어 Branch가 동기화됐습니다." }
        }
      ]
    },
    {
      id: "recovery.stash-conflict.001",
      number: 17,
      track: "Recovery Lab",
      difficulty: 4,
      title: { en: "Recover when stash pop conflicts", ko: "Stash Pop Conflict 복구" },
      story: {
        en: "While you were away, src/power.py changed on the branch. Restoring your stashed WIP now overlaps the same file and causes a conflict.",
        ko: "작업을 비운 사이 Branch의 src/power.py가 변경됐습니다. Stash WIP도 같은 File을 수정하여 복원 시 Conflict가 발생합니다."
      },
      objective: { en: "Attempt the pop, inspect the conflict, mark the manually resolved file, then remove the retained stash entry.", ko: "Pop 시도 -> Conflict 확인 -> 수동 해결 File Stage -> 남아 있는 Stash Entry 제거" },
      hint: { en: "A conflicted stash pop normally keeps the stash entry so recovery data is not lost.", ko: "Conflict가 발생한 Stash Pop은 Recovery Data 보호를 위해 Stash Entry를 유지" },
      concept: {
        title: { en: "Failed pop keeps the recovery copy", ko: "Conflict 발생 시 Stash Entry 유지" },
        body: {
          en: "When stash pop cannot apply cleanly, Git does not drop the stash. Resolve and verify the working result before manually removing the saved copy.",
          ko: "Stash Pop이 Clean하게 적용되지 않으면 Git은 Stash를 Drop하지 않습니다. Working Result를 해결·검증한 뒤 보관본을 수동 제거해야 합니다."
        }
      },
      initial: {
        branch: "feature/power-check", working: [], staged: [], conflicts: [],
        commits: ["bb810e2 Adjust power sequencing", "a77d901 Add power supply interface"],
        stashes: [{ message: "WIP power check", working: [{ name: "src/power.py", status: "modified", delta: "+37 -5" }], staged: [] }],
        remote: { name: "origin", tracking: "origin/feature/power-check", knownHead: "bb810e2", actualHead: "bb810e2", ahead: 0, behind: 0, fetched: true }
      },
      steps: [
        {
          accept: ["^git\\s+stash\\s+pop$"],
          actions: [{ type: "stashConflict", file: "src/power.py" }],
          output: { en: "Conflict in src/power.py. The stash entry is retained because pop did not complete cleanly.", ko: "src/power.py Conflict 발생. Pop이 Clean하게 완료되지 않아 Stash Entry는 유지됩니다." }
        },
        {
          accept: ["^git\\s+status$"],
          output: { en: "Status shows src/power.py as unmerged while the stash entry still exists.", ko: "Status에서 src/power.py가 Unmerged 상태이고 Stash Entry가 유지되는 것을 확인했습니다." }
        },
        {
          accept: ["^git\\s+add\\s+src/power\\.py$"],
          actions: [{ type: "resolveConflict", file: "src/power.py" }],
          output: { en: "The manually resolved src/power.py is staged as resolved.", ko: "수동 해결한 src/power.py를 Stage하여 Conflict 해결 상태로 표시했습니다." }
        },
        {
          accept: ["^git\\s+stash\\s+drop$", "^git\\s+stash\\s+drop\\s+stash@\\{0\\}$"],
          actions: [{ type: "stashDrop" }],
          output: { en: "After verifying the resolved work, the retained stash copy is removed.", ko: "해결 결과를 확인한 뒤 유지되던 Stash 보관본을 제거했습니다." }
        }
      ]
    },
    {
      id: "collaboration.merge-policy.001",
      number: 18,
      track: "Collaboration",
      difficulty: 4,
      title: { en: "Use merge when shared-history policy requires it", ko: "Shared History Policy에 따라 Merge 사용" },
      story: {
        en: "A shared integration branch has diverged. Team policy forbids rebasing published commits and requires preserving both lines of history with a merge commit.",
        ko: "Shared Integration Branch가 Diverge됐습니다. Team Policy는 Published Commit Rebase를 금지하고 Merge Commit으로 양쪽 History 보존을 요구합니다."
      },
      objective: { en: "Integrate upstream without rebasing published commits, then push the merged history.", ko: "Published Commit을 Rebase하지 않고 Upstream 통합 후 Merge History Push" },
      hint: { en: "This is deliberately the opposite policy of the private feature-branch rebase mission.", ko: "Private Feature Branch Rebase Mission과 반대 Policy를 의도적으로 적용" },
      concept: {
        title: { en: "Workflow policy depends on history ownership", ko: "Workflow Policy는 History Ownership에 따라 달라짐" },
        body: {
          en: "Rebase and merge are tools with different history effects. Shared published history often favors preserving ancestry instead of rewriting it.",
          ko: "Rebase와 Merge는 History Effect가 다른 도구입니다. 공유·Published History에서는 Rewrite보다 Ancestry 보존이 우선될 수 있습니다."
        }
      },
      initial: {
        branch: "integration/device", working: [], staged: [], stashes: [], conflicts: [],
        commits: ["31af010 Integrate device telemetry", "20cd100 Base integration"],
        remote: { name: "origin", tracking: "origin/integration/device", knownHead: "4c821a0", actualHead: "4c821a0", ahead: 1, behind: 1, fetched: true }
      },
      steps: [
        {
          accept: ["^git\\s+pull\\s+--no-rebase$", "^git\\s+merge\\s+origin/integration/device$"],
          actions: [{ type: "merge", remoteCommit: "4c821a0 Update device alarms", mergeCommit: "7bd1010 Merge origin/integration/device" }],
          output: { en: "A merge commit now preserves both the local and remote lines of published history.", ko: "Merge Commit이 Local과 Remote의 Published History 두 흐름을 모두 보존합니다." }
        },
        {
          accept: ["^git\\s+push$", "^git\\s+push\\s+origin\\s+integration/device$"],
          actions: [{ type: "push" }],
          output: { en: "The merged shared history is published without rewriting prior commits.", ko: "기존 Commit Rewrite 없이 Merge된 Shared History를 Publish했습니다." }
        }
      ]
    }
  );
})();
