(() => {
  const content = window.GIT_ADVENTURES_CONTENT;
  if (!content) throw new Error('Base mission content must load first');

  content.references.push(
    ["git fetch origin", { en: "Refresh remote-tracking information", ko: "Remote Tracking 정보 갱신" }],
    ["git pull", { en: "Fetch and integrate the configured upstream", ko: "Upstream Fetch 후 현재 Branch에 통합" }],
    ["git push -u origin <branch>", { en: "Publish a branch and configure upstream", ko: "Branch Publish 및 Upstream 설정" }],
    ["git stash push -m \"...\"", { en: "Temporarily preserve unfinished work", ko: "미완성 작업 임시 보관" }],
    ["git stash pop", { en: "Restore the latest stash", ko: "최근 Stash 복원" }],
    ["git switch <branch>", { en: "Switch to an existing branch", ko: "기존 Branch로 이동" }]
  );

  content.missions.push(
    {
      id: "workflow.fetch.001",
      number: 9,
      track: "Daily Workflow",
      difficulty: 2,
      title: { en: "Refresh remote facts before deciding", ko: "판단 전 Remote 정보 갱신" },
      story: {
        en: "A teammate says main changed on the server. Your working tree is clean, but your local remote-tracking information may be stale.",
        ko: "동료가 Server의 main이 변경됐다고 알려왔습니다. Working Tree는 Clean하지만 Local Remote-Tracking 정보가 오래됐을 수 있습니다."
      },
      objective: { en: "Refresh origin information without changing your current branch.", ko: "현재 Branch를 변경하지 않고 origin 정보 갱신" },
      hint: { en: "Separate learning about the remote from integrating its commits.", ko: "Remote 정보 확인과 Commit 통합을 분리해서 생각" },
      concept: {
        title: { en: "Fetch updates knowledge, not your working branch", ko: "Fetch는 Branch가 아니라 Remote 정보 갱신" },
        body: {
          en: "Fetching first lets you inspect remote changes before choosing merge, rebase, or another integration policy.",
          ko: "Fetch를 먼저 수행하면 Merge, Rebase 등 Integration Policy를 결정하기 전에 Remote 변경을 확인할 수 있습니다."
        }
      },
      initial: {
        branch: "main", working: [], staged: [], commits: ["c182bb7 Fix serial timeout handling"], stashes: [],
        remote: { name: "origin", tracking: "origin/main", knownHead: "c182bb7", actualHead: "d901c42", ahead: 0, behind: 1, fetched: false }
      },
      steps: [{
        accept: ["^git\\s+fetch\\s+origin$", "^git\\s+fetch$"],
        actions: [{ type: "fetch" }],
        output: { en: "origin/main now points to d901c42. Your local main is unchanged.", ko: "origin/main이 d901c42로 갱신됐고 Local main은 변경되지 않았습니다." }
      }]
    },
    {
      id: "workflow.pull.001",
      number: 10,
      track: "Daily Workflow",
      difficulty: 3,
      title: { en: "Integrate a clean upstream update", ko: "Clean 상태에서 Upstream 변경 통합" },
      story: {
        en: "Your clean main is one commit behind origin/main. Team policy allows a normal pull for this fast-forward update.",
        ko: "Clean 상태의 main이 origin/main보다 한 Commit 뒤에 있습니다. Team Policy상 Fast-forward Update는 일반 Pull을 허용합니다."
      },
      objective: { en: "Bring local main up to the configured upstream.", ko: "Local main을 설정된 Upstream과 동기화" },
      hint: { en: "This scenario explicitly permits fetch + configured integration in one command.", ko: "이 Scenario에서는 Fetch + 설정된 Integration을 한 Command로 수행 가능" },
      concept: {
        title: { en: "Pull is fetch plus an integration policy", ko: "Pull = Fetch + Integration Policy" },
        body: {
          en: "Treat pull as a compound operation. In more complex histories, inspect and choose the integration method deliberately.",
          ko: "Pull은 복합 작업입니다. History가 복잡할수록 먼저 상태를 확인하고 Integration 방식을 의도적으로 선택해야 합니다."
        }
      },
      initial: {
        branch: "main", working: [], staged: [], commits: ["c182bb7 Fix serial timeout handling"], stashes: [],
        remote: { name: "origin", tracking: "origin/main", knownHead: "d901c42", actualHead: "d901c42", ahead: 0, behind: 1, fetched: true }
      },
      steps: [{
        accept: ["^git\\s+pull$", "^git\\s+pull\\s+origin\\s+main$"],
        actions: [{ type: "pull", commit: "d901c42 Update provisioning defaults" }],
        output: { en: "Local main fast-forwarded to d901c42.", ko: "Local main이 d901c42까지 Fast-forward됐습니다." }
      }]
    },
    {
      id: "workflow.push.001",
      number: 11,
      track: "Daily Workflow",
      difficulty: 2,
      title: { en: "Publish work for review", ko: "Review를 위해 Branch Publish" },
      story: {
        en: "Your feature branch has two reviewed local commits but no upstream branch yet. Publish it without touching main.",
        ko: "Feature Branch에 Review 준비가 된 Local Commit 두 개가 있지만 아직 Upstream Branch가 없습니다. main을 건드리지 않고 Publish합니다."
      },
      objective: { en: "Push feature/firmware-download to origin and set upstream tracking.", ko: "feature/firmware-download를 origin에 Push하고 Upstream Tracking 설정" },
      hint: { en: "The first publish should configure the tracking relationship for later push/pull commands.", ko: "최초 Publish 시 이후 Push/Pull을 위한 Tracking 관계도 설정" },
      concept: {
        title: { en: "Push publishes committed history", ko: "Push는 Commit된 History를 Publish" },
        body: {
          en: "Working Tree changes are not uploaded by push. Publishing a feature branch creates a reviewable remote history without destabilizing main.",
          ko: "Push는 Working Tree 변경을 업로드하지 않습니다. Feature Branch Publish는 main을 불안정하게 하지 않고 Review 가능한 Remote History를 만듭니다."
        }
      },
      initial: {
        branch: "feature/firmware-download", working: [], staged: [],
        commits: ["8bf210c Add firmware block transfer", "72a1d11 Add firmware validation"], stashes: [],
        remote: { name: "origin", tracking: null, knownHead: null, actualHead: null, ahead: 2, behind: 0, fetched: true }
      },
      steps: [{
        accept: ["^git\\s+push\\s+-u\\s+origin\\s+feature/firmware-download$", "^git\\s+push\\s+--set-upstream\\s+origin\\s+feature/firmware-download$"],
        actions: [{ type: "pushUpstream", branch: "feature/firmware-download" }],
        output: { en: "The feature branch is published and now tracks origin/feature/firmware-download.", ko: "Feature Branch가 Publish되고 origin/feature/firmware-download를 Tracking합니다." }
      }]
    },
    {
      id: "workflow.stash.001",
      number: 12,
      track: "Daily Workflow",
      difficulty: 3,
      title: { en: "Protect WIP before an urgent branch switch", ko: "긴급 Branch 전환 전 WIP 보호" },
      story: {
        en: "You are halfway through a feature when an urgent production fix arrives. The unfinished changes are not ready to commit.",
        ko: "Feature 작업 중 긴급 Production Fix 요청이 들어왔습니다. 현재 미완성 변경은 아직 Commit할 상태가 아닙니다."
      },
      objective: { en: "Temporarily preserve the WIP, then switch to main.", ko: "WIP를 임시 보관한 뒤 main으로 이동" },
      hint: { en: "Preserve unfinished work without inventing a fake commit, then switch branches.", ko: "의미 없는 임시 Commit 대신 미완성 작업을 보관한 뒤 Branch 이동" },
      concept: {
        title: { en: "Stash is temporary workspace storage, not history", ko: "Stash는 History가 아닌 임시 Workspace 보관" },
        body: {
          en: "Use stash when unfinished work must be moved aside briefly. Important durable work still belongs in meaningful commits.",
          ko: "잠시 작업을 치워야 할 때 Stash를 사용합니다. 장기 보존할 중요한 작업은 여전히 의미 있는 Commit으로 남겨야 합니다."
        }
      },
      initial: {
        branch: "feature/power-check", working: [
          { name: "src/power.py", status: "modified", delta: "+37 -5" },
          { name: "tests/test_power.py", status: "modified", delta: "+22 -1" }
        ], staged: [], commits: ["a77d901 Add power supply interface"], stashes: [],
        remote: { name: "origin", tracking: "origin/feature/power-check", knownHead: "a77d901", actualHead: "a77d901", ahead: 0, behind: 0, fetched: true }
      },
      steps: [
        {
          accept: ["^git\\s+stash\\s+push\\s+-m\\s+[\"']WIP power check[\"']$", "^git\\s+stash\\s+-m\\s+[\"']WIP power check[\"']$"],
          actions: [{ type: "stashPush", message: "WIP power check" }],
          output: { en: "The unfinished power-check files are preserved in stash and the Working Tree is clean.", ko: "미완성 Power Check 변경을 Stash에 보관해 Working Tree가 Clean 상태가 됐습니다." }
        },
        {
          accept: ["^git\\s+switch\\s+main$"],
          actions: [{ type: "switchBranch", name: "main" }],
          output: { en: "You switched to main with the WIP safely stored.", ko: "WIP를 안전하게 보관한 상태로 main으로 이동했습니다." }
        }
      ]
    },
    {
      id: "recovery.stash.001",
      number: 13,
      track: "Recovery Lab",
      difficulty: 3,
      title: { en: "Return to preserved work", ko: "보관한 작업으로 복귀" },
      story: {
        en: "The urgent fix is finished. You are back on feature/power-check and need the preserved WIP again.",
        ko: "긴급 Fix 작업이 끝났습니다. feature/power-check로 돌아왔고 보관했던 WIP를 다시 적용해야 합니다."
      },
      objective: { en: "Restore the most recent stash and remove that stash entry.", ko: "가장 최근 Stash를 복원하고 해당 Stash Entry 제거" },
      hint: { en: "Use the stash operation that applies and removes the top entry.", ko: "최상단 Stash를 적용하면서 Entry도 제거하는 Operation 사용" },
      concept: {
        title: { en: "Pop restores state and consumes the stash entry", ko: "Pop은 State 복원과 Stash Entry 제거를 함께 수행" },
        body: {
          en: "Always inspect the resulting Working Tree after restoring stashed work because conflicts are possible in real repositories.",
          ko: "실제 Repository에서는 Conflict 가능성이 있으므로 Stash 복원 후 Working Tree 상태를 반드시 확인해야 합니다."
        }
      },
      initial: {
        branch: "feature/power-check", working: [], staged: [], commits: ["a77d901 Add power supply interface"],
        stashes: [{ message: "WIP power check", working: [
          { name: "src/power.py", status: "modified", delta: "+37 -5" },
          { name: "tests/test_power.py", status: "modified", delta: "+22 -1" }
        ], staged: [] }],
        remote: { name: "origin", tracking: "origin/feature/power-check", knownHead: "a77d901", actualHead: "a77d901", ahead: 0, behind: 0, fetched: true }
      },
      steps: [{
        accept: ["^git\\s+stash\\s+pop$"],
        actions: [{ type: "stashPop" }],
        output: { en: "The power-check WIP is back in the Working Tree and the stash entry is removed.", ko: "Power Check WIP가 Working Tree에 복원되고 Stash Entry가 제거됐습니다." }
      }]
    }
  );
})();
