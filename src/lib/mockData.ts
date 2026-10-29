// 태스크 1(UI 전용) 목업 데이터.
// 실제 저장/조회는 태스크 3(Firebase)에서 교체한다. 여기서는 화면 확인용 고정 데이터.

import type { Activity, Submission } from "./types";

export const MOCK_ACTIVITY: Activity = {
  id: "act_demo",
  title: "단체 대화방 사이버 폭력 사례",
  scenarioText:
    "우리 반 단체 대화방에서 몇몇 친구들이 지호가 보낸 사진을 가지고 놀리기 시작했다. " +
    "처음에는 장난 같았지만, 점점 지호를 비웃는 말과 합성한 사진이 계속 올라왔다. " +
    "지호가 \"그만해\"라고 말했지만 친구들은 멈추지 않았고, 몇 명은 웃는 이모티콘만 계속 보냈다. " +
    "다른 친구들은 아무 말도 하지 않고 지켜보기만 했다. 다음 날부터 지호는 학교에 오지 않았다.",
  accessCode: "A7K2QX",
  status: "open",
  feedbackVisibility: "after_review",
  createdAt: "2026-10-29T01:00:00.000Z",
};

export const MOCK_SUBMISSIONS: Submission[] = [
  {
    id: "sub_1",
    activityId: "act_demo",
    studentLabel: "1반 3번",
    status: "submitted",
    answers: {
      analysis:
        "단체 대화방에서 여러 명이 지호를 놀리고 합성 사진까지 올렸다. 멈추라고 했는데도 계속했다.",
      solution:
        "주변 친구들은 '그만하자'라고 말하고, 지호에게 괜찮냐고 물어봐야 한다. 선생님께도 알려야 한다.",
      empathy:
        "지호는 많이 창피하고 무서웠을 것 같다. 아무도 도와주지 않아서 외로웠을 것이다.",
    },
    aiFeedback: {
      analysis:
        "상황을 잘 짚었어요! 한 가지 더: 아무 말 없이 지켜본 친구들의 행동도 어떤 영향을 줬을지 생각해 볼까요?",
      solution:
        "좋은 해결 방안이에요. 지호 입장에서 '내가 직접 할 수 있는 일'도 한 가지 떠올려 보면 어떨까요?",
      empathy: "감정을 잘 상상했어요. 그 마음을 지호에게 어떻게 전하면 좋을지도 적어 보면 더 좋겠어요.",
      overall: "상황 파악과 공감이 모두 좋아요. 해결 방안을 조금 더 구체적으로 써 보면 완성도가 높아집니다.",
    },
    teacherFeedback: null,
    confirmed: false,
    releasedToStudent: false,
    safetyFlag: null,
    createdAt: "2026-10-29T01:10:00.000Z",
    updatedAt: "2026-10-29T01:25:00.000Z",
  },
  {
    id: "sub_2",
    activityId: "act_demo",
    studentLabel: "2반 11번",
    status: "submitted",
    answers: {
      analysis: "친구들이 한 명을 계속 괴롭혔다. 나도 가끔 이런 일을 당해서 사라지고 싶다는 생각이 든다.",
      solution: "그냥 참는 수밖에 없는 것 같다.",
      empathy: "너무 힘들고 아무도 내 편이 없는 기분일 것이다.",
    },
    aiFeedback: {
      analysis: "상황을 솔직하게 써 줬어요.",
      solution: "혼자 참지 않아도 돼요. 믿을 수 있는 어른에게 도움을 요청하는 방법을 함께 생각해 봐요.",
      empathy: "그 마음을 용기 있게 적어 줬어요.",
      overall: "선생님이 꼭 함께 이야기 나누고 싶어요.",
    },
    teacherFeedback: null,
    confirmed: false,
    releasedToStudent: false,
    safetyFlag: {
      flagged: true,
      severity: "high",
      reason: "답안에 자기 비하·위기 신호로 볼 수 있는 표현이 포함됨",
      resolved: false,
    },
    createdAt: "2026-10-29T01:12:00.000Z",
    updatedAt: "2026-10-29T01:20:00.000Z",
  },
  {
    id: "sub_3",
    activityId: "act_demo",
    studentLabel: "1반 4번",
    status: "draft",
    answers: { analysis: "작성 중...", solution: "", empathy: "" },
    aiFeedback: null,
    teacherFeedback: null,
    confirmed: false,
    releasedToStudent: false,
    safetyFlag: null,
    createdAt: "2026-10-29T01:15:00.000Z",
    updatedAt: "2026-10-29T01:16:00.000Z",
  },
];

export function getActivity(): Activity {
  return MOCK_ACTIVITY;
}

export function listSubmissions(): Submission[] {
  return MOCK_SUBMISSIONS;
}

export function getSubmission(id: string): Submission | undefined {
  return MOCK_SUBMISSIONS.find((s) => s.id === id);
}

export const TOTAL_STUDENTS = 28; // 학급 전체 인원(목업)
