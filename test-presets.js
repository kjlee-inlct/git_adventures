(() => {
  const presets = {
    Beginner: {
      id: "beginner-core-mental-model",
      title: { en: "Beginner · Core Mental Model", ko: "Beginner · Core Mental Model" },
      targetMinutes: 25,
      hypothesis: {
        en: "Can a new learner read Working Tree / Staging / History and adopt inspection-first habits without facilitator instruction?",
        ko: "초보자가 Facilitator 설명 없이 Working Tree / Staging / History를 읽고 Inspection-first 습관을 형성할 수 있는가?"
      },
      missionNumbers: [1,2,3,4,7,9,12,24],
      observe: {
        en: ["time to first command", "Working Tree vs Staging confusion", "Hint dependency", "broad staging habits", "reaction to blocked Branch switch"],
        ko: ["첫 Command까지 시간", "Working Tree / Staging 혼동", "Hint 의존", "광범위 Staging 습관", "Blocked Branch Switch에 대한 반응"]
      },
      stopSignals: {
        en: ["cannot explain Working Tree vs Staging after Mission 4", "requires facilitator to interpret Repository State", "repeatedly guesses exact commands without inspecting state"],
        ko: ["Mission 4 이후에도 Working Tree / Staging을 설명하지 못함", "Repository State 해석에 Facilitator 설명이 계속 필요", "State 확인 없이 Command 문자열 추측을 반복"]
      }
    },
    Basic: {
      id: "basic-workflow-recovery",
      title: { en: "Basic · Workflow and Recovery", ko: "Basic · Workflow / Recovery" },
      targetMinutes: 30,
      hypothesis: {
        en: "Can a routine Git user move from command habits to safe Local / Remote / Recovery decisions?",
        ko: "일상적으로 Git을 쓰는 사용자가 Command 습관에서 Local / Remote / Recovery 판단으로 넘어갈 수 있는가?"
      },
      missionNumbers: [3,5,6,7,9,12,14,15,17,20,24,41],
      observe: {
        en: ["selective staging behavior", "Fetch vs Pull mental model", "unsafe recovery tendency", "Stash as temporary workspace", "Published History recovery judgment"],
        ko: ["Selective Staging 행동", "Fetch / Pull Mental Model", "위험한 Recovery 선택 경향", "Stash를 Temporary Workspace로 이해하는지", "Published History Recovery 판단"]
      },
      stopSignals: {
        en: ["treats Fetch and Pull as equivalent", "chooses destructive recovery despite visible safer state", "Assessment failure comes from unclear scenario wording rather than Git judgment"],
        ko: ["Fetch와 Pull을 같은 동작으로 이해", "더 안전한 State가 보이는데도 파괴적 Recovery를 선택", "Assessment 실패 원인이 Git 판단이 아니라 Scenario 문구 모호성"]
      }
    },
    Experienced: {
      id: "experienced-history-release",
      title: { en: "Experienced · History, Release and Assessment", ko: "Experienced · History / Release / Assessment" },
      targetMinutes: 35,
      hypothesis: {
        en: "Do advanced scenarios feel technically credible and require meaningful policy / history judgment rather than trivia?",
        ko: "Advanced Scenario가 기술적으로 신뢰할 만하고 Trivia가 아니라 Policy / History 판단을 실제로 요구하는가?"
      },
      missionNumbers: [14,16,18,19,23,27,29,34,36,37,41,43,44],
      observe: {
        en: ["whether consequences feel Git-realistic", "Merge vs Rebase policy reasoning", "Conflict lifecycle credibility", "Release identity decisions", "Assessment alternate-solution objections"],
        ko: ["Consequence가 실제 Git처럼 느껴지는지", "Merge / Rebase Policy 판단", "Conflict Lifecycle 신뢰도", "Release Identity 판단", "Assessment Alternate Solution 이의 제기"]
      },
      stopSignals: {
        en: ["experienced tester calls scenario technically wrong", "a safe equivalent solution is rejected without product reason", "Assessment is solved from wording pattern rather than repository evidence"],
        ko: ["Experienced Tester가 Scenario를 기술적으로 잘못됐다고 판단", "안전한 Equivalent Solution이 Product 이유 없이 거부됨", "Repository Evidence가 아니라 문구 패턴만 보고 Assessment 해결"]
      }
    }
  };

  window.GIT_ADVENTURES_TEST_PRESETS = {
    version: 1,
    groups: ["Beginner", "Basic", "Experienced"],
    presets
  };
})();
