(() => {
  const content = window.GIT_ADVENTURES_CONTENT;
  if (!content) throw new Error('Base mission content must load first');

  content.references.push(
    ["git diff <base>...<head>", { en: "Review the exact branch delta before integration", ko: "Integration 전 Branch 간 정확한 변경 범위 Review" }],
    ["git merge --no-ff <branch>", { en: "Merge an approved hotfix while preserving branch identity", ko: "승인된 Hotfix Branch Identity를 보존하며 Merge" }],
    ["git push origin <tag>", { en: "Publish a local release tag to the remote", ko: "Local Release Tag를 Remote에 Publish" }]
  );

  content.missions.push(
    {
      id: "release.review-evidence.001",
      number: 36,
      track: "Release & Incident",
      difficulty: 4,
      title: { en: "Review the exact hotfix scope before approval", ko: "Approval 전 Hotfix Scope 정확히 Review" },
      story: {
        en: "hotfix/1.4.4 contains the recovery change. Before the release PR can be approved, the team must verify that the branch contains only the intended incident fix.",
        ko: "hotfix/1.4.4에 Recovery 변경이 있습니다. Release PR Approval 전에 Branch가 의도한 Incident Fix만 포함하는지 검증해야 합니다."
      },
      objective: { en: "Inspect the release-to-hotfix delta and establish review evidence for approval.", ko: "Release와 Hotfix 간 Delta를 확인하여 Approval용 Review Evidence 확보" },
      hint: { en: "Review the branch delta itself; approval is a team policy gate, not a Git command.", ko: "Branch Delta 자체를 Review합니다. Approval은 Git Command가 아니라 Team Policy Gate입니다." },
      concept: {
        title: { en: "Approval should follow evidence", ko: "Approval은 Evidence 뒤에 와야 함" },
        body: {
          en: "Git can show what changed; a team decides whether that scope is approved. Keeping those roles separate prevents Git mechanics from being confused with review policy.",
          ko: "Git은 무엇이 바뀌었는지 보여주고 Team은 그 Scope를 승인할지 결정합니다. 두 역할을 분리해야 Git 동작과 Review Policy가 혼동되지 않습니다."
        }
      },
      initial: {
        branch: "hotfix/1.4.4", working: [], staged: [], conflicts: [], stashes: [], operation: null, tags: ["v1.4.3@1430f01"], publishedTags: ["v1.4.3@1430f01"], reviewGate: { approved: false, evidence: false },
        commits: ["1440b11 Restore stable reconnect behavior", "1430f01 Backport serial reconnect fix", "1400abc Release 1.4.2"],
        remote: { name: "origin", tracking: "origin/hotfix/1.4.4", knownHead: "1440b11", actualHead: "1440b11", ahead: 0, behind: 0, fetched: true, rejected: null }
      },
      steps: [{
        accept: ["^git\\s+diff\\s+release/1\\.4\\.\\.\\.hotfix/1\\.4\\.4$"],
        actions: [{ type: "recordReviewEvidence" }],
        output: { en: "Review evidence confirms the hotfix branch contains only the intended recovery scope. The scenario review gate is now approved.", ko: "Hotfix Branch가 의도한 Recovery Scope만 포함함을 확인했습니다. Scenario Review Gate가 승인됐습니다." }
      }]
    },
    {
      id: "release.approved-merge.001",
      number: 37,
      track: "Release & Incident",
      difficulty: 4,
      title: { en: "Merge only after the release gate is satisfied", ko: "Release Gate 충족 후에만 Merge" },
      story: {
        en: "The hotfix scope has been reviewed and approved. release/1.4 is ready to accept the reviewed hotfix branch.",
        ko: "Hotfix Scope Review와 Approval이 완료됐습니다. release/1.4에 검토된 Hotfix Branch를 반영할 준비가 됐습니다."
      },
      objective: { en: "Merge the approved hotfix with a merge commit that preserves the reviewed branch boundary.", ko: "Review된 Branch Boundary를 보존하는 Merge Commit으로 승인된 Hotfix Merge" },
      hint: { en: "The scenario policy requires preserving the hotfix branch identity in release history.", ko: "Scenario Policy는 Release History에 Hotfix Branch Identity 보존을 요구합니다." },
      concept: {
        title: { en: "Release integration is gated, not automatic", ko: "Release Integration은 자동이 아니라 Gate 기반" },
        body: {
          en: "A technically mergeable branch is not automatically release-approved. Integration follows scope review, approval, and then a deliberate history policy.",
          ko: "기술적으로 Merge 가능한 Branch라고 자동으로 Release 승인되는 것은 아닙니다. Scope Review와 Approval 뒤에 명시적인 History Policy에 따라 Integration합니다."
        }
      },
      initial: {
        branch: "release/1.4", working: [], staged: [], conflicts: [], stashes: [], operation: null, tags: ["v1.4.3@1430f01"], publishedTags: ["v1.4.3@1430f01"], reviewGate: { approved: true, evidence: true },
        commits: ["1440a01 Revert 'Backport serial reconnect fix'", "1430f01 Backport serial reconnect fix", "1400abc Release 1.4.2"],
        remote: { name: "origin", tracking: "origin/release/1.4", knownHead: "1440a01", actualHead: "1440a01", ahead: 0, behind: 0, fetched: true, rejected: null }
      },
      steps: [{
        accept: ["^git\\s+merge\\s+--no-ff\\s+hotfix/1\\.4\\.4$"],
        actions: [{ type: "mergeApprovedHotfix", hotfixCommit: "1440b11 Restore stable reconnect behavior", mergeCommit: "1440c21 Merge hotfix/1.4.4" }],
        output: { en: "The approved hotfix is now integrated into release/1.4 with an explicit merge boundary.", ko: "승인된 Hotfix가 명시적 Merge Boundary와 함께 release/1.4에 통합됐습니다." }
      }]
    },
    {
      id: "release.publish-tag.001",
      number: 38,
      track: "Release & Incident",
      difficulty: 3,
      title: { en: "Publish the verified patch tag", ko: "검증된 Patch Tag Publish" },
      story: {
        en: "v1.4.4 exists locally on the verified release commit, but the remote repository does not yet advertise that release identity.",
        ko: "검증된 Release Commit에 v1.4.4 Local Tag가 있지만 Remote Repository에는 아직 해당 Release Identity가 Publish되지 않았습니다."
      },
      objective: { en: "Publish only v1.4.4 to origin.", ko: "v1.4.4 Tag만 origin에 Publish" },
      hint: { en: "Creating a local tag and publishing it to the remote are separate operations.", ko: "Local Tag 생성과 Remote Publish는 서로 다른 Operation입니다." },
      concept: {
        title: { en: "Local tag creation is not release publication", ko: "Local Tag 생성은 Release Publication이 아님" },
        body: {
          en: "A tag becomes a shared release identity only after it is published to the remote used by the team and release tooling.",
          ko: "Tag는 Team과 Release Tooling이 사용하는 Remote에 Publish된 뒤에야 Shared Release Identity가 됩니다."
        }
      },
      initial: {
        branch: "release/1.4", working: [], staged: [], conflicts: [], stashes: [], operation: null, tags: ["v1.4.3@1430f01", "v1.4.4@1440c21"], publishedTags: ["v1.4.3@1430f01"], reviewGate: null,
        commits: ["1440c21 Merge hotfix/1.4.4", "1440a01 Revert 'Backport serial reconnect fix'", "1430f01 Backport serial reconnect fix"],
        remote: { name: "origin", tracking: "origin/release/1.4", knownHead: "1440c21", actualHead: "1440c21", ahead: 0, behind: 0, fetched: true, rejected: null }
      },
      steps: [{
        accept: ["^git\\s+push\\s+origin\\s+v1\\.4\\.4$"],
        actions: [{ type: "publishTag", tag: "v1.4.4" }],
        output: { en: "v1.4.4 is now published as the shared release identity; v1.4.3 remains unchanged.", ko: "v1.4.4가 Shared Release Identity로 Publish됐고 v1.4.3은 그대로 유지됩니다." }
      }]
    },
    {
      id: "release.propagate-main.001",
      number: 39,
      track: "Release & Incident",
      difficulty: 4,
      title: { en: "Propagate the hotfix back to main", ko: "Hotfix를 main에 재반영" },
      story: {
        en: "The release line is fixed, but main still lacks the final recovery change. If left unresolved, a future release could reintroduce the same defect.",
        ko: "Release Line은 복구됐지만 main에는 최종 Recovery 변경이 없습니다. 그대로 두면 향후 Release에서 같은 결함이 다시 나타날 수 있습니다."
      },
      objective: { en: "Apply the final recovery commit to main without pulling unrelated release-only history into main.", ko: "Release 전용 History 전체를 main에 가져오지 않고 최종 Recovery Commit만 main에 적용" },
      hint: { en: "Propagate the fix intent, not the whole release branch history.", ko: "Release Branch 전체 History가 아니라 Fix Intent를 재반영" },
      concept: {
        title: { en: "Incident fixes must converge across maintained lines", ko: "Incident Fix는 유지 Branch 간 다시 수렴해야 함" },
        body: {
          en: "Fixing only the release branch creates future regression risk. The durable resolution also carries the corrected intent back to the main development line.",
          ko: "Release Branch만 고치면 향후 Regression Risk가 남습니다. 지속 가능한 해결은 교정된 Intent를 main Development Line에도 재반영합니다."
        }
      },
      initial: {
        branch: "main", working: [], staged: [], conflicts: [], stashes: [], operation: null, tags: [], publishedTags: [], reviewGate: null,
        commits: ["2200d10 Continue main development", "2100c01 Main baseline"],
        remote: { name: "origin", tracking: "origin/main", knownHead: "2200d10", actualHead: "2200d10", ahead: 0, behind: 0, fetched: true, rejected: null }
      },
      steps: [{
        accept: ["^git\\s+cherry-pick\\s+1440b11$"],
        actions: [{ type: "cherryPick", sha: "2200e20", message: "Propagate stable reconnect recovery" }],
        output: { en: "The recovery intent is now present on main as a main-line commit.", ko: "Recovery Intent가 main Line 전용 Commit으로 반영됐습니다." }
      }]
    },
    {
      id: "release.closure-check.001",
      number: 40,
      track: "Release & Incident",
      difficulty: 4,
      title: { en: "Close the incident only after state converges", ko: "State 수렴 확인 후 Incident 종료" },
      story: {
        en: "The patch tag is published and main has the recovery. Before closing the incident, verify the final repository state rather than assuming the workflow completed correctly.",
        ko: "Patch Tag가 Publish됐고 main에도 Recovery가 반영됐습니다. Incident 종료 전 Workflow가 올바르게 끝났다고 가정하지 말고 최종 Repository State를 확인합니다."
      },
      objective: { en: "Inspect history and confirm the incident closure state.", ko: "History를 확인하여 Incident Closure State 검증" },
      hint: { en: "Closure is verification, not merely the absence of another error message.", ko: "Incident Closure는 Error가 더 없다는 의미가 아니라 Verification입니다." },
      concept: {
        title: { en: "Operational workflows end with verification", ko: "운영 Workflow는 Verification으로 종료" },
        body: {
          en: "Release recovery is complete only when the published release identity, release history, and forward development line all reflect the intended correction.",
          ko: "Published Release Identity, Release History, Forward Development Line이 모두 의도한 교정을 반영했을 때 Release Recovery가 완료됩니다."
        }
      },
      initial: {
        branch: "main", working: [], staged: [], conflicts: [], stashes: [], operation: null, tags: ["v1.4.3@1430f01", "v1.4.4@1440c21"], publishedTags: ["v1.4.3@1430f01", "v1.4.4@1440c21"], reviewGate: { approved: true, evidence: true },
        commits: ["2200e20 Propagate stable reconnect recovery", "2200d10 Continue main development", "2100c01 Main baseline"],
        remote: { name: "origin", tracking: "origin/main", knownHead: "2200e20", actualHead: "2200e20", ahead: 0, behind: 0, fetched: true, rejected: null }
      },
      steps: [{
        accept: ["^git\\s+log\\s+--oneline$"],
        output: { en: "Closure verified: recovery is on main and v1.4.4 remains the published patch identity while v1.4.3 stays immutable evidence.", ko: "Closure 확인 완료: Recovery가 main에 존재하고 v1.4.4는 Published Patch Identity이며 v1.4.3은 Immutable Evidence로 유지됩니다." }
      }]
    }
  );
})();
