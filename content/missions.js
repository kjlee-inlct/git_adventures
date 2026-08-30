window.GIT_ADVENTURES_CONTENT = {
  version: 1,
  references: [
    ["git status", { en: "Inspect repository state", ko: "Repository 상태 확인" }],
    ["git diff", { en: "Inspect unstaged changes", ko: "Unstaged 변경 확인" }],
    ["git diff --staged", { en: "Inspect staged changes", ko: "Staged 변경 확인" }],
    ["git add <file>", { en: "Stage selected changes", ko: "선택 변경 Staging" }],
    ["git restore --staged <file>", { en: "Unstage without discarding work", ko: "작업을 유지한 채 Unstage" }],
    ["git commit -m \"...\"", { en: "Record one logical change", ko: "논리적 변경 단위 기록" }],
    ["git switch -c <branch>", { en: "Create an isolated branch", ko: "독립 Branch 생성" }],
    ["git revert <sha>", { en: "Undo shared history safely", ko: "Shared History 안전 복구" }]
  ],
  missions: [
    {
      id: "foundations.inspect.001",
      number: 1,
      track: "Foundations",
      difficulty: 1,
      title: { en: "Inspect before you act", ko: "변경 전 상태 확인" },
      story: {
        en: "A teammate says the repository has local changes. Do not guess what changed. Inspect the repository first.",
        ko: "동료가 Local 변경이 있다고 알려왔습니다. 무엇이 바뀌었는지 추측하지 말고 Repository 상태부터 확인합니다."
      },
      objective: { en: "Find the current branch and file state.", ko: "현재 Branch와 File 상태 확인" },
      hint: { en: "Start with the command that summarizes repository state.", ko: "Repository 상태를 요약하는 Command부터 사용" },
      concept: {
        title: { en: "Inspection is the safest first move", ko: "Inspection-first 습관" },
        body: {
          en: "Most Git mistakes get worse when recovery commands are executed before the current branch, staged files, and working changes are understood.",
          ko: "현재 Branch, Staging 상태, Working Tree 변경을 이해하기 전에 Recovery Command부터 실행하면 실수 범위가 커질 수 있습니다."
        }
      },
      initial: {
        branch: "main",
        working: [{ name: "src/device.py", status: "modified", delta: "+18 -4" }],
        staged: [],
        commits: ["a41c92e Initial device controller"]
      },
      steps: [
        {
          accept: ["^git\\s+status$"],
          output: {
            en: "You inspected the repository before modifying it.",
            ko: "변경 전에 Repository 상태를 먼저 확인했습니다."
          }
        }
      ]
    },
    {
      id: "foundations.diff.001",
      number: 2,
      track: "Foundations",
      difficulty: 1,
      title: { en: "Read the change, not just the filename", ko: "File 이름보다 변경 내용 확인" },
      story: {
        en: "device.py is modified. Before deciding whether it belongs in the next commit, inspect the actual unstaged change.",
        ko: "device.py가 수정됐습니다. 다음 Commit에 포함할지 판단하기 전에 실제 Unstaged 변경 내용을 확인합니다."
      },
      objective: { en: "Inspect the unstaged diff.", ko: "Unstaged Diff 확인" },
      hint: { en: "Use the command that shows line-level unstaged changes.", ko: "Line 단위 Unstaged 변경을 보여주는 Command 사용" },
      concept: {
        title: { en: "Status tells where; diff tells what", ko: "Status는 위치, Diff는 내용" },
        body: {
          en: "A clean commit starts by understanding the exact change. Filenames alone are not enough to judge scope.",
          ko: "좋은 Commit은 실제 변경 내용을 이해하는 데서 시작합니다. File 이름만으로 Commit Scope를 판단하지 않습니다."
        }
      },
      initial: {
        branch: "main",
        working: [{ name: "src/device.py", status: "modified", delta: "+18 -4" }],
        staged: [],
        commits: ["a41c92e Initial device controller"]
      },
      steps: [
        {
          accept: ["^git\\s+diff$"],
          output: { en: "The diff shows timeout recovery changes in src/device.py.", ko: "Diff에서 src/device.py의 Timeout Recovery 변경을 확인했습니다." }
        }
      ]
    },
    {
      id: "foundations.stage.001",
      number: 3,
      track: "Foundations",
      difficulty: 2,
      title: { en: "Stage only the story you intend to commit", ko: "Commit할 변경만 Stage" },
      story: {
        en: "README.md documents the new setup flow. debug.log is temporary output from testing. Only the documentation belongs in this commit.",
        ko: "README.md에는 신규 Setup Flow 문서가 있고 debug.log는 Test 중 생성된 임시 출력입니다. 이번 Commit에는 문서 변경만 포함해야 합니다."
      },
      objective: { en: "Stage README.md and leave debug.log out.", ko: "README.md만 Stage하고 debug.log는 제외" },
      hint: { en: "Prefer a file-specific add when the commit scope is narrow.", ko: "Commit Scope가 좁다면 File 지정 Add 사용" },
      concept: {
        title: { en: "The staging area is your commit draft", ko: "Staging Area = Commit Draft" },
        body: {
          en: "Selective staging separates unrelated work and makes review, rollback, bisect, and cherry-pick more reliable.",
          ko: "선택적 Staging은 독립 변경을 분리하고 Review, Rollback, Bisect, Cherry-pick 품질을 높입니다."
        }
      },
      initial: {
        branch: "main",
        working: [
          { name: "README.md", status: "modified", delta: "+12 -2" },
          { name: "debug.log", status: "untracked", delta: "+94" }
        ],
        staged: [],
        commits: ["a13f0d2 Add project overview"]
      },
      steps: [
        {
          accept: ["^git\\s+add\\s+README\\.md$"],
          actions: [{ type: "stage", files: ["README.md"] }],
          output: { en: "README.md is staged. debug.log remains outside the commit draft.", ko: "README.md만 Staging되고 debug.log는 Commit Draft 밖에 유지됩니다." }
        }
      ]
    },
    {
      id: "foundations.commit.001",
      number: 4,
      track: "Foundations",
      difficulty: 2,
      title: { en: "Record one clear change intent", ko: "하나의 명확한 Change Intent 기록" },
      story: {
        en: "The serial timeout fix is staged and verified. Record it as one logical history unit.",
        ko: "Serial Timeout Fix가 Staging 및 Verification 완료됐습니다. 하나의 논리적 History 단위로 기록합니다."
      },
      objective: { en: "Commit with the title: Fix serial timeout handling", ko: "`Fix serial timeout handling` Title로 Commit" },
      hint: { en: "Use an imperative title that describes the change intent.", ko: "변경 의도를 설명하는 명령형 Title 사용" },
      concept: {
        title: { en: "One commit, one change intent", ko: "One Commit = One Change Intent" },
        body: {
          en: "Atomic commits make review and recovery easier because each history unit has one reason to exist.",
          ko: "Atomic Commit은 각 History 단위가 하나의 이유만 가지도록 만들어 Review와 Recovery를 단순화합니다."
        }
      },
      initial: {
        branch: "fix/serial-timeout",
        working: [],
        staged: [{ name: "src/device.py", status: "modified", delta: "+18 -4" }],
        commits: ["a41c92e Initial device controller"]
      },
      steps: [
        {
          accept: ["^git\\s+commit\\s+-m\\s+[\"']Fix serial timeout handling[\"']$"],
          actions: [{ type: "commit", sha: "c182bb7", message: "Fix serial timeout handling" }],
          output: { en: "The staged fix is now a focused history unit.", ko: "Staged Fix가 명확한 하나의 History 단위로 기록됐습니다." }
        }
      ]
    },
    {
      id: "workflow.branch.001",
      number: 5,
      track: "Daily Workflow",
      difficulty: 2,
      title: { en: "Start work without destabilizing main", ko: "main을 불안정하게 만들지 않고 작업 시작" },
      story: {
        en: "Firmware download automation starts today. Create an isolated branch before changing code.",
        ko: "Firmware Download Automation 개발을 시작합니다. Code 변경 전에 독립 Branch를 생성합니다."
      },
      objective: { en: "Create and switch to feature/firmware-download.", ko: "feature/firmware-download Branch 생성 및 이동" },
      hint: { en: "Create and switch in one command.", ko: "하나의 Command로 Branch 생성 및 이동" },
      concept: {
        title: { en: "Branches isolate unfinished work", ko: "Branch 기반 Work Isolation" },
        body: {
          en: "A feature branch gives unfinished work a safe place while main remains an integration point.",
          ko: "Feature Branch는 미완성 작업을 안전하게 격리하고 main을 Integration 기준점으로 유지합니다."
        }
      },
      initial: {
        branch: "main",
        working: [],
        staged: [],
        commits: ["c182bb7 Fix serial timeout handling", "a41c92e Initial device controller"]
      },
      steps: [
        {
          accept: ["^git\\s+switch\\s+-c\\s+feature/firmware-download$"],
          actions: [{ type: "branch", name: "feature/firmware-download" }],
          output: { en: "New work is isolated from main.", ko: "신규 작업이 main에서 격리됐습니다." }
        }
      ]
    },
    {
      id: "workflow.atomic.001",
      number: 6,
      track: "Daily Workflow",
      difficulty: 3,
      title: { en: "Build an atomic commit from a busy workspace", ko: "복잡한 Workspace에서 Atomic Commit 구성" },
      story: {
        en: "The feature work changed transfer.py and its test. notes.md contains unrelated meeting notes. Prepare and commit only the feature change.",
        ko: "Feature 작업으로 transfer.py와 Test가 변경됐습니다. notes.md는 무관한 Meeting Note입니다. Feature 변경만 Commit합니다."
      },
      objective: { en: "Stage the two related files, inspect the staged diff, then commit them as Add firmware block transfer.", ko: "관련 두 File을 Stage하고 Staged Diff 확인 후 `Add firmware block transfer`로 Commit" },
      hint: { en: "Treat staging as a draft: select, review, then record.", ko: "Staging을 Draft로 사용: 선택 -> 검토 -> 기록" },
      concept: {
        title: { en: "A good commit is assembled, not dumped", ko: "Commit은 모아서 Dump하는 것이 아니라 구성" },
        body: {
          en: "Real repositories often contain multiple concurrent changes. Atomic history depends on deliberate staging and review.",
          ko: "실제 Repository에는 여러 변경이 동시에 존재합니다. Atomic History는 의도적인 Staging과 Review에서 만들어집니다."
        }
      },
      initial: {
        branch: "feature/firmware-download",
        working: [
          { name: "src/transfer.py", status: "modified", delta: "+64 -8" },
          { name: "tests/test_transfer.py", status: "modified", delta: "+41 -3" },
          { name: "notes.md", status: "modified", delta: "+6" }
        ],
        staged: [],
        commits: ["72a1d11 Add firmware validation", "c182bb7 Fix serial timeout handling"]
      },
      steps: [
        {
          accept: [
            "^git\\s+add\\s+src/transfer\\.py\\s+tests/test_transfer\\.py$",
            "^git\\s+add\\s+tests/test_transfer\\.py\\s+src/transfer\\.py$"
          ],
          actions: [{ type: "stage", files: ["src/transfer.py", "tests/test_transfer.py"] }],
          output: { en: "The feature implementation and its test are staged together.", ko: "Feature 구현과 Test가 함께 Staging됐습니다." }
        },
        {
          accept: ["^git\\s+diff\\s+--staged$", "^git\\s+diff\\s+--cached$"],
          output: { en: "The staged diff contains only transfer.py and test_transfer.py.", ko: "Staged Diff에 transfer.py와 test_transfer.py만 포함됐습니다." }
        },
        {
          accept: ["^git\\s+commit\\s+-m\\s+[\"']Add firmware block transfer[\"']$"],
          actions: [{ type: "commit", sha: "8bf210c", message: "Add firmware block transfer" }],
          output: { en: "One focused feature commit was added to history. notes.md remains local.", ko: "하나의 Feature Commit이 History에 추가되고 notes.md는 Local 변경으로 유지됩니다." }
        }
      ]
    },
    {
      id: "recovery.unstage.001",
      number: 7,
      track: "Recovery Lab",
      difficulty: 3,
      title: { en: "Undo staging without deleting work", ko: "작업 삭제 없이 Staging 취소" },
      story: {
        en: "You ran git add . and accidentally staged debug.log with README.md. Keep both files, but remove debug.log from the commit draft.",
        ko: "`git add .` 실행으로 README.md와 debug.log가 함께 Staging됐습니다. 두 File은 유지하되 debug.log만 Commit Draft에서 제외합니다."
      },
      objective: { en: "Unstage debug.log without discarding its contents.", ko: "debug.log 내용은 유지하면서 Unstage" },
      hint: { en: "Use restore with the staging-area option, not restore on the working file.", ko: "Working File Restore가 아니라 Staging Area 대상 Restore 사용" },
      concept: {
        title: { en: "Unstage and discard are different operations", ko: "Unstage와 Discard는 다른 작업" },
        body: {
          en: "Recovery starts by naming what must change and what must be preserved. Here only the commit draft is wrong; the file itself is still valuable.",
          ko: "Recovery에서는 무엇을 바꾸고 무엇을 보존할지 먼저 구분합니다. 여기서는 Commit Draft만 잘못됐고 File 자체는 보존해야 합니다."
        }
      },
      initial: {
        branch: "docs/setup-guide",
        working: [],
        staged: [
          { name: "README.md", status: "modified", delta: "+12 -2" },
          { name: "debug.log", status: "new file", delta: "+94" }
        ],
        commits: ["a13f0d2 Add project overview"]
      },
      steps: [
        {
          accept: ["^git\\s+restore\\s+--staged\\s+debug\\.log$"],
          actions: [{ type: "unstage", files: ["debug.log"] }],
          output: { en: "debug.log returned to the Working Tree; README.md remains staged.", ko: "debug.log는 Working Tree로 돌아가고 README.md는 Staging 상태를 유지합니다." }
        }
      ]
    },
    {
      id: "recovery.shared.001",
      number: 8,
      track: "Recovery Lab",
      difficulty: 4,
      title: { en: "Recover shared history without rewriting it", ko: "Shared History Rewrite 없이 복구" },
      story: {
        en: "Commit bad1234 broke the production configuration and has already been pulled by teammates. Restore behavior without deleting published history.",
        ko: "bad1234 Commit이 Production Configuration을 깨뜨렸고 동료들이 이미 Pull했습니다. 공개 History를 삭제하지 않고 동작을 복구합니다."
      },
      objective: { en: "Create a new inverse commit for bad1234.", ko: "bad1234의 반대 변경을 새 Commit으로 생성" },
      hint: { en: "Shared history normally prefers revert over reset.", ko: "Shared History에서는 일반적으로 Reset보다 Revert 우선" },
      concept: {
        title: { en: "Published history is evidence", ko: "Published History는 기록 증거" },
        body: {
          en: "Revert preserves the original failure and the recovery decision, giving the team an auditable sequence instead of rewriting their base.",
          ko: "Revert는 실패와 복구 판단을 모두 History에 남겨, 동료의 Base를 Rewrite하지 않고 추적 가능한 복구 과정을 제공합니다."
        }
      },
      initial: {
        branch: "main",
        working: [],
        staged: [],
        commits: ["bad1234 Break production config", "9f111ab Release v1.4.0"]
      },
      steps: [
        {
          accept: ["^git\\s+revert\\s+bad1234$"],
          actions: [{ type: "prependCommit", value: "f0e91aa Revert 'Break production config'" }],
          output: { en: "The recovery is now a new commit and the published history remains intact.", ko: "Recovery가 새 Commit으로 기록되고 기존 Published History는 유지됩니다." }
        }
      ]
    }
  ]
};
