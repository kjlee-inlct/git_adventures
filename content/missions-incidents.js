(() => {
  const content = window.GIT_ADVENTURES_CONTENT;
  if (!content) throw new Error('Base mission content must load first');

  content.references.push(
    ["git tag -a <tag> -m \"...\"", { en: "Create an annotated release tag on the current commit", ko: "현재 Commit에 Annotated Release Tag 생성" }]
  );

  content.missions.push(
    {
      id: "release.backport-order.001",
      number: 31,
      track: "Release & Incident",
      difficulty: 4,
      title: { en: "Backport dependencies before the fix", ko: "Fix보다 Dependency를 먼저 Backport" },
      story: {
        en: "A production fix depends on a small parser change that landed one commit earlier on main. The release branch has neither commit.",
        ko: "Production Fix가 main에 한 Commit 먼저 들어간 작은 Parser 변경에 의존합니다. Release Branch에는 두 Commit 모두 없습니다."
      },
      objective: { en: "Backport the dependency first, then the dependent fix.", ko: "Dependency Commit을 먼저, 그 다음 의존하는 Fix Commit을 Backport" },
      hint: { en: "Cherry-pick preserves commit order requirements even when you select only part of a branch.", ko: "일부 Commit만 선택하더라도 Dependency 순서는 보존해야 합니다." },
      concept: {
        title: { en: "Selective backport still has dependency order", ko: "Selective Backport에도 Dependency 순서가 존재" },
        body: {
          en: "Cherry-pick does not infer semantic dependencies. Release engineers must identify prerequisites and apply them in an order that keeps the release branch buildable.",
          ko: "Cherry-pick은 의미적 Dependency를 자동 판단하지 않습니다. Release 담당자는 선행 변경을 식별하고 Release Branch가 Build 가능한 순서로 적용해야 합니다."
        }
      },
      initial: {
        branch: "release/1.4", working: [], staged: [], conflicts: [], stashes: [], operation: null, tags: [],
        commits: ["1400abc Release 1.4 baseline"],
        remote: { name: "origin", tracking: "origin/release/1.4", knownHead: "1400abc", actualHead: "1400abc", ahead: 0, behind: 0, fetched: true, rejected: null }
      },
      steps: [
        {
          accept: ["^git\\s+cherry-pick\\s+6ab1200$"],
          actions: [{ type: "cherryPick", sha: "14bd201", message: "Backport parser bounds helper" }],
          output: { en: "The prerequisite parser change is now on release/1.4.", ko: "선행 Parser 변경을 release/1.4에 먼저 적용했습니다." }
        },
        {
          accept: ["^git\\s+cherry-pick\\s+91ce220$"],
          actions: [{ type: "cherryPick", sha: "14bd202", message: "Backport packet bounds fix" }],
          output: { en: "The dependent production fix is now applied after its prerequisite.", ko: "Dependency 뒤에 Production Fix를 적용했습니다." }
        }
      ]
    },
    {
      id: "release.hotfix-branch.001",
      number: 32,
      track: "Release & Incident",
      difficulty: 3,
      title: { en: "Isolate an emergency hotfix", ko: "긴급 Hotfix 작업 격리" },
      story: {
        en: "Version 1.4.2 is in production. A critical serial reconnect fix is already verified on main, but release work must remain isolated and reviewable.",
        ko: "Version 1.4.2가 Production에 배포돼 있습니다. Serial Reconnect Critical Fix는 main에서 검증됐지만 Release 작업은 격리되고 Review 가능해야 합니다."
      },
      objective: { en: "Create a hotfix branch from the release line and apply only the verified fix.", ko: "Release Line에서 Hotfix Branch를 만들고 검증된 Fix만 적용" },
      hint: { en: "Separate the emergency release change from both main and the stable release branch before publishing it.", ko: "긴급 Release 변경을 main과 Stable Release Branch 양쪽에서 분리" },
      concept: {
        title: { en: "Hotfix branches make emergency scope reviewable", ko: "Hotfix Branch는 긴급 변경 Scope를 Review 가능하게 함" },
        body: {
          en: "An emergency does not remove the need for scope control. A dedicated hotfix branch keeps the release candidate explicit and reviewable.",
          ko: "긴급 상황이어도 Scope Control은 필요합니다. 전용 Hotfix Branch는 Release Candidate를 명확하고 Review 가능하게 유지합니다."
        }
      },
      initial: {
        branch: "release/1.4", working: [], staged: [], conflicts: [], stashes: [], operation: null, tags: ["v1.4.2@1400abc"],
        commits: ["1400abc Release 1.4.2"],
        remote: { name: "origin", tracking: "origin/release/1.4", knownHead: "1400abc", actualHead: "1400abc", ahead: 0, behind: 0, fetched: true, rejected: null }
      },
      steps: [
        {
          accept: ["^git\\s+switch\\s+-c\\s+hotfix/1\\.4\\.3$"],
          actions: [{ type: "branch", name: "hotfix/1.4.3" }],
          output: { en: "The emergency work is isolated on hotfix/1.4.3.", ko: "긴급 작업을 hotfix/1.4.3 Branch로 격리했습니다." }
        },
        {
          accept: ["^git\\s+cherry-pick\\s+8cf4300$"],
          actions: [{ type: "cherryPick", sha: "1430f01", message: "Backport serial reconnect fix" }],
          output: { en: "Only the verified reconnect fix was applied to the hotfix branch.", ko: "검증된 Reconnect Fix만 Hotfix Branch에 적용했습니다." }
        }
      ]
    },
    {
      id: "release.tag.001",
      number: 33,
      track: "Release & Incident",
      difficulty: 3,
      title: { en: "Tag the exact verified release commit", ko: "검증된 Release Commit에 정확히 Tag" },
      story: {
        en: "The hotfix candidate has passed verification. The exact current commit is approved as version 1.4.3.",
        ko: "Hotfix Candidate가 Verification을 통과했습니다. 현재 정확한 Commit이 Version 1.4.3으로 승인됐습니다."
      },
      objective: { en: "Create an annotated v1.4.3 tag on the verified current commit.", ko: "검증된 현재 Commit에 Annotated v1.4.3 Tag 생성" },
      hint: { en: "A release tag should identify the exact immutable commit that passed verification.", ko: "Release Tag는 Verification을 통과한 정확한 Immutable Commit을 가리켜야 합니다." },
      concept: {
        title: { en: "A release tag is an identity, not a moving label", ko: "Release Tag는 이동하는 Label이 아니라 Release Identity" },
        body: {
          en: "Tag the commit that was actually verified. Later fixes should receive a new version rather than silently moving a published release identity.",
          ko: "실제로 검증된 Commit에 Tag해야 합니다. 이후 Fix가 생기면 Published Release Tag를 이동하지 말고 새 Version을 사용해야 합니다."
        }
      },
      initial: {
        branch: "hotfix/1.4.3", working: [], staged: [], conflicts: [], stashes: [], operation: null, tags: ["v1.4.2@1400abc"],
        commits: ["1430f01 Backport serial reconnect fix", "1400abc Release 1.4.2"],
        remote: { name: "origin", tracking: "origin/hotfix/1.4.3", knownHead: "1430f01", actualHead: "1430f01", ahead: 0, behind: 0, fetched: true, rejected: null }
      },
      steps: [{
        accept: ["^git\\s+tag\\s+-a\\s+v1\\.4\\.3\\s+-m\\s+[\"']Release 1\\.4\\.3[\"']$"],
        actions: [{ type: "createTag", tag: "v1.4.3" }],
        output: { en: "v1.4.3 now identifies the exact verified hotfix commit.", ko: "v1.4.3이 검증된 Hotfix Commit을 정확히 식별합니다." }
      }]
    },
    {
      id: "release.bad-release-revert.001",
      number: 34,
      track: "Release & Incident",
      difficulty: 4,
      title: { en: "Reverse a bad release without erasing history", ko: "Bad Release를 History 삭제 없이 되돌리기" },
      story: {
        en: "Version 1.4.3 was published, but field monitoring reveals the reconnect change causes a regression. The release commit and tag are already shared.",
        ko: "Version 1.4.3이 Published됐지만 Field Monitoring에서 Reconnect 변경이 Regression을 일으키는 것이 확인됐습니다. Release Commit과 Tag는 이미 공유됐습니다."
      },
      objective: { en: "Create an explicit revert of the bad release change instead of rewriting published history.", ko: "Published History를 Rewrite하지 않고 Bad Release 변경을 명시적으로 Revert" },
      hint: { en: "The published commit must remain visible; add a new inverse commit.", ko: "Published Commit은 History에 남기고 새로운 Inverse Commit을 추가" },
      concept: {
        title: { en: "Published incidents need auditable recovery", ko: "Published Incident는 추적 가능한 Recovery가 필요" },
        body: {
          en: "Once a release is shared, an explicit revert preserves the evidence of what shipped and how it was corrected.",
          ko: "Release가 공유된 뒤에는 명시적 Revert가 무엇이 배포됐고 어떻게 교정됐는지 Evidence를 보존합니다."
        }
      },
      initial: {
        branch: "release/1.4", working: [], staged: [], conflicts: [], stashes: [], operation: null, tags: ["v1.4.2@1400abc", "v1.4.3@1430f01"],
        commits: ["1430f01 Backport serial reconnect fix", "1400abc Release 1.4.2"],
        remote: { name: "origin", tracking: "origin/release/1.4", knownHead: "1430f01", actualHead: "1430f01", ahead: 0, behind: 0, fetched: true, rejected: null }
      },
      steps: [{
        accept: ["^git\\s+revert\\s+1430f01$"],
        actions: [{ type: "prependCommit", value: "1440a01 Revert 'Backport serial reconnect fix'" }],
        output: { en: "A new revert commit records the rollback while preserving the published release history.", ko: "새 Revert Commit이 Published Release History를 보존하면서 Rollback을 기록합니다." }
      }]
    },
    {
      id: "release.patch-tag.001",
      number: 35,
      track: "Release & Incident",
      difficulty: 4,
      title: { en: "Publish recovery as a new patch version", ko: "Recovery를 새 Patch Version으로 Publish" },
      story: {
        en: "The revert has passed validation. v1.4.3 is already published and must continue to identify the bad release that users may have received.",
        ko: "Revert가 Validation을 통과했습니다. v1.4.3은 이미 Published되어 일부 사용자가 받은 Bad Release를 계속 식별해야 합니다."
      },
      objective: { en: "Create v1.4.4 on the verified recovery commit; do not move v1.4.3.", ko: "v1.4.3을 이동하지 말고 검증된 Recovery Commit에 v1.4.4 생성" },
      hint: { en: "Published release identities are evidence. Recovery gets a new version.", ko: "Published Release Identity는 Evidence입니다. Recovery에는 새 Version을 부여" },
      concept: {
        title: { en: "Never hide a shipped version by moving its tag", ko: "배포된 Version Tag를 이동해 History를 숨기지 않음" },
        body: {
          en: "Keeping v1.4.3 on the bad release and tagging the corrected commit v1.4.4 preserves reproducibility, incident analysis, and support traceability.",
          ko: "v1.4.3을 Bad Release에 유지하고 교정 Commit을 v1.4.4로 Tag하면 재현성, Incident 분석, Support Traceability를 보존할 수 있습니다."
        }
      },
      initial: {
        branch: "release/1.4", working: [], staged: [], conflicts: [], stashes: [], operation: null, tags: ["v1.4.2@1400abc", "v1.4.3@1430f01"],
        commits: ["1440a01 Revert 'Backport serial reconnect fix'", "1430f01 Backport serial reconnect fix", "1400abc Release 1.4.2"],
        remote: { name: "origin", tracking: "origin/release/1.4", knownHead: "1440a01", actualHead: "1440a01", ahead: 0, behind: 0, fetched: true, rejected: null }
      },
      steps: [{
        accept: ["^git\\s+tag\\s+-a\\s+v1\\.4\\.4\\s+-m\\s+[\"']Release 1\\.4\\.4[\"']$"],
        actions: [{ type: "createTag", tag: "v1.4.4" }],
        output: { en: "v1.4.4 identifies the verified recovery while v1.4.3 remains immutable evidence of the prior release.", ko: "v1.4.4가 검증된 Recovery를 식별하고 v1.4.3은 이전 Release의 Immutable Evidence로 유지됩니다." }
      }]
    }
  );
})();
