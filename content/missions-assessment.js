(() => {
  const content = window.GIT_ADVENTURES_CONTENT;
  if (!content) throw new Error('Base mission content must load first');

  const defaultRubric = {
    weights: { judgment: 40, safety: 30, evidence: 20, efficiency: 10 },
    passScore: 75,
    criticalSafetyFloor: 60
  };

  const rubric = overrides => ({
    ...defaultRubric,
    ...overrides,
    weights: { ...defaultRubric.weights, ...(overrides?.weights || {}) }
  });

  content.missions.push(
    {
      id: "assessment.recovery-decision.001",
      number: 41,
      track: "Assessment",
      difficulty: 5,
      assessment: true,
      assessmentRubric: rubric({
        criticalSafetyFloor: 70,
        evidenceCommands: [],
        preferredCommands: ["git revert 1430f01"],
        unsafePatterns: ["git reset --hard", "git push --force"],
        rationale: {
          en: "Published release history must remain auditable. A revert adds a visible correction without erasing shipped history.",
          ko: "Published Release History는 Audit 가능하게 유지해야 합니다. Revert는 배포 History를 지우지 않고 명시적인 교정을 추가합니다."
        }
      }),
      title: { en: "Choose the recovery for a published regression", ko: "Published Regression 복구 방식 판단" },
      story: {
        en: "v1.4.3 is already published. Commit 1430f01 introduced a production regression. Support and incident records must remain able to identify exactly what shipped.",
        ko: "v1.4.3이 이미 Published됐습니다. 1430f01 Commit이 Production Regression을 만들었습니다. Support와 Incident 기록에서 실제 배포 내용을 계속 식별할 수 있어야 합니다."
      },
      objective: { en: "Choose the safest history operation for the shared release line.", ko: "Shared Release Line에 가장 적절한 History Operation 선택" },
      hint: { en: "Preserve the evidence of what shipped.", ko: "실제로 배포된 Evidence를 보존하세요." },
      concept: {
        title: { en: "Assessment: recovery policy", ko: "Assessment: Recovery Policy" },
        body: {
          en: "The decision must preserve published history while adding an auditable correction.",
          ko: "Published History를 보존하면서 추적 가능한 교정 기록을 추가해야 합니다."
        }
      },
      initial: {
        branch: "release/1.4", working: [], staged: [], conflicts: [], stashes: [], operation: null,
        tags: ["v1.4.3@1430f01"], publishedTags: ["v1.4.3@1430f01"], reviewGate: null,
        commits: ["1430f01 Backport serial reconnect fix", "1400abc Release 1.4.2"],
        remote: { name: "origin", tracking: "origin/release/1.4", knownHead: "1430f01", actualHead: "1430f01", ahead: 0, behind: 0, fetched: true, rejected: null }
      },
      steps: [{
        accept: ["^git\\s+revert\\s+1430f01$"],
        actions: [{ type: "prependCommit", value: "1440a01 Revert 'Backport serial reconnect fix'" }],
        output: { en: "Correct. The bad release remains auditable and the recovery is a new shared-history commit.", ko: "정답입니다. Bad Release는 Audit 가능하게 남고 Recovery는 새로운 Shared-History Commit으로 기록됩니다." }
      }]
    },
    {
      id: "assessment.release-line.001",
      number: 42,
      track: "Assessment",
      difficulty: 5,
      assessment: true,
      assessmentRubric: rubric({
        weights: { judgment: 45, safety: 25, evidence: 20, efficiency: 10 },
        evidenceCommands: [],
        preferredCommands: ["git cherry-pick 8cf4300"],
        unsafePatterns: ["release/1.3", "git merge main"],
        rationale: {
          en: "The supported and affected line is release/1.4. EOL branches should not receive normal fixes without an explicit policy exception.",
          ko: "지원 중이며 영향받는 Line은 release/1.4입니다. EOL Branch는 명시적 Policy Exception 없이는 일반 Fix 대상이 아닙니다."
        }
      }),
      title: { en: "Choose the supported release line", ko: "지원 대상 Release Line 판단" },
      story: {
        en: "The reconnect fix is already in main. release/1.4 is still supported and affected. release/1.3 is end-of-life and receives no normal fixes under team policy.",
        ko: "Reconnect Fix는 이미 main에 있습니다. release/1.4는 지원 중이며 문제의 영향을 받습니다. release/1.3은 EOL이며 Team Policy상 일반 Fix 대상이 아닙니다."
      },
      objective: { en: "Apply the verified fix to the maintained affected release line without widening scope.", ko: "지원 중이며 영향받는 Release Line에만 검증된 Fix 적용" },
      hint: { en: "Use support policy and affected scope together.", ko: "Support Policy와 영향 범위를 함께 판단하세요." },
      concept: {
        title: { en: "Assessment: supported lines", ko: "Assessment: Supported Release Lines" },
        body: {
          en: "A fix destination is determined by support policy, affected versions, and risk—not by applying every fix everywhere.",
          ko: "Fix 대상은 모든 Branch에 일괄 적용하는 것이 아니라 Support Policy, 영향 Version, Risk로 결정합니다."
        }
      },
      initial: {
        branch: "release/1.4", working: [], staged: [], conflicts: [], stashes: [], operation: null,
        tags: ["v1.4.2@1400abc"], publishedTags: ["v1.4.2@1400abc"], reviewGate: null,
        commits: ["1400abc Release 1.4.2"],
        remote: { name: "origin", tracking: "origin/release/1.4", knownHead: "1400abc", actualHead: "1400abc", ahead: 0, behind: 0, fetched: true, rejected: null }
      },
      steps: [{
        accept: ["^git\\s+cherry-pick\\s+8cf4300$"],
        actions: [{ type: "cherryPick", sha: "1430f01", message: "Backport serial reconnect fix" }],
        output: { en: "Correct. The verified fix was selectively backported to the supported affected release line.", ko: "정답입니다. 검증된 Fix를 지원 중이며 영향받는 Release Line에 선택적으로 Backport했습니다." }
      }]
    },
    {
      id: "assessment.merge-policy.001",
      number: 43,
      track: "Assessment",
      difficulty: 5,
      assessment: true,
      assessmentRubric: rubric({
        weights: { judgment: 45, safety: 25, evidence: 20, efficiency: 10 },
        evidenceCommands: [],
        preferredCommands: ["git merge --no-ff hotfix/1.4.4"],
        unsafePatterns: ["git rebase", "git push --force"],
        rationale: {
          en: "The review gate is satisfied and policy explicitly requires preserving the hotfix branch boundary in release history.",
          ko: "Review Gate가 충족됐고 Policy가 Release History에 Hotfix Branch Boundary 보존을 명시적으로 요구합니다."
        }
      }),
      title: { en: "Choose the approved release integration strategy", ko: "승인된 Release Integration Strategy 판단" },
      story: {
        en: "hotfix/1.4.4 passed CI and scope review. Team policy requires preserving the reviewed hotfix branch boundary in release history. The approval gate is satisfied.",
        ko: "hotfix/1.4.4가 CI와 Scope Review를 통과했습니다. Team Policy는 Review된 Hotfix Branch Boundary를 Release History에 보존하도록 요구합니다. Approval Gate도 충족됐습니다."
      },
      objective: { en: "Integrate the approved hotfix using the history policy stated by the scenario.", ko: "Scenario에 명시된 History Policy에 따라 승인된 Hotfix 통합" },
      hint: { en: "The required history shape is part of the evidence.", ko: "요구되는 History 형태도 Evidence의 일부입니다." },
      concept: {
        title: { en: "Assessment: integration policy", ko: "Assessment: Integration Policy" },
        body: {
          en: "The correct integration strategy depends on review state and the history policy explicitly required for this release.",
          ko: "올바른 Integration Strategy는 Review 상태와 Release에 명시된 History Policy를 함께 따라야 합니다."
        }
      },
      initial: {
        branch: "release/1.4", working: [], staged: [], conflicts: [], stashes: [], operation: null,
        tags: ["v1.4.3@1430f01"], publishedTags: ["v1.4.3@1430f01"], reviewGate: { approved: true, evidence: true },
        commits: ["1440a01 Revert 'Backport serial reconnect fix'", "1430f01 Backport serial reconnect fix", "1400abc Release 1.4.2"],
        remote: { name: "origin", tracking: "origin/release/1.4", knownHead: "1440a01", actualHead: "1440a01", ahead: 0, behind: 0, fetched: true, rejected: null }
      },
      steps: [{
        accept: ["^git\\s+merge\\s+--no-ff\\s+hotfix/1\\.4\\.4$"],
        actions: [{ type: "mergeApprovedHotfix", hotfixCommit: "1440b11 Restore stable reconnect behavior", mergeCommit: "1440c21 Merge hotfix/1.4.4" }],
        output: { en: "Correct. The approved hotfix was integrated with the required explicit branch boundary.", ko: "정답입니다. 승인된 Hotfix를 요구된 명시적 Branch Boundary와 함께 통합했습니다." }
      }]
    },
    {
      id: "assessment.release-closure.001",
      number: 44,
      track: "Assessment",
      difficulty: 5,
      assessment: true,
      assessmentRubric: rubric({
        weights: { judgment: 25, safety: 20, evidence: 45, efficiency: 10 },
        evidenceCommands: ["git status", "git log --oneline"],
        preferredCommands: ["git status", "git log --oneline"],
        unsafePatterns: ["git reset", "git push --force"],
        rationale: {
          en: "Closure is evidence-driven. Clean state and durable recovery history must both be verified before the incident is accepted as complete.",
          ko: "Closure는 Evidence 기반입니다. Incident 완료 승인 전 Clean State와 Durable Recovery History를 모두 검증해야 합니다."
        }
      }),
      title: { en: "Verify before declaring the incident closed", ko: "Incident 종료 선언 전 Verification" },
      story: {
        en: "The patch is published, the prior bad tag remains immutable, and the recovery is expected on main. You are the final reviewer before incident closure.",
        ko: "Patch는 Publish됐고 이전 Bad Tag는 Immutable하게 유지되며 Recovery가 main에 반영됐어야 합니다. Incident Closure 전 마지막 Reviewer 역할입니다."
      },
      objective: { en: "Inspect repository cleanliness and history before accepting closure.", ko: "Closure 승인 전 Repository Cleanliness와 History 검증" },
      hint: { en: "Verify state; do not infer it from the story alone.", ko: "Story만 믿지 말고 State를 직접 검증하세요." },
      concept: {
        title: { en: "Assessment: operational closure", ko: "Assessment: Operational Closure" },
        body: {
          en: "Operational completion requires direct evidence that the repository and release identities match the intended final state.",
          ko: "운영 완료는 Repository와 Release Identity가 의도한 최종 State인지 직접 확인한 Evidence가 필요합니다."
        }
      },
      initial: {
        branch: "main", working: [], staged: [], conflicts: [], stashes: [], operation: null,
        tags: ["v1.4.3@1430f01", "v1.4.4@1440c21"], publishedTags: ["v1.4.3@1430f01", "v1.4.4@1440c21"], reviewGate: { approved: true, evidence: true },
        commits: ["2200e20 Propagate stable reconnect recovery", "2200d10 Continue main development", "2100c01 Main baseline"],
        remote: { name: "origin", tracking: "origin/main", knownHead: "2200e20", actualHead: "2200e20", ahead: 0, behind: 0, fetched: true, rejected: null }
      },
      steps: [
        { accept: ["^git\\s+status$"], output: { en: "The working state is clean and synchronized.", ko: "Working State가 Clean하고 동기화되어 있음을 확인했습니다." } },
        { accept: ["^git\\s+log\\s+--oneline$"], output: { en: "History confirms the durable recovery is present on main. Closure evidence is complete.", ko: "History에서 Durable Recovery가 main에 있음을 확인했습니다. Closure Evidence가 완성됐습니다." } }
      ]
    }
  );
})();
