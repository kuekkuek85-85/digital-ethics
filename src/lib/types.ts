// 앱 전반에서 쓰는 도메인 타입 정의.
// 태스크 1(UI)에서는 목업 데이터로만 사용하고, 태스크 3에서 Firestore 구조와 맞춘다.

/** 서술형 작성 단계 */
export type Stage = "analysis" | "solution" | "empathy";

/** 교사가 개설하는 활동 */
export interface Activity {
  id: string;
  title: string;
  scenarioText: string; // 사이버 폭력 상황 제시문
  accessCode: string; // 학생 접속 코드
  status: "open" | "closed";
  feedbackVisibility: "immediate" | "after_review"; // 학생 공개 시점
  createdAt: string;
}

/** 학생이 작성한 세 단계 답안 */
export interface Answers {
  analysis: string;
  solution: string;
  empathy: string;
}

/** AI 또는 교사의 단계별 피드백 */
export interface Feedback {
  analysis: string;
  solution: string;
  empathy: string;
  overall: string;
}

/** 위기 신호 플래그 */
export interface SafetyFlag {
  flagged: boolean;
  severity: "low" | "high";
  reason: string;
  resolved: boolean;
}

/** 학생 제출물(답안 + 피드백 + 상태) */
export interface Submission {
  id: string;
  activityId: string;
  studentLabel: string; // "1반 3번" 등 (실명 지양)
  status: "draft" | "submitted";
  answers: Answers;
  aiFeedback: Feedback | null;
  teacherFeedback: Feedback | null;
  confirmed: boolean;
  releasedToStudent: boolean;
  safetyFlag: SafetyFlag | null;
  createdAt: string;
  updatedAt: string;
}

/** 단계 메타(라벨·안내 문구) */
export const STAGES: { key: Stage; label: string; prompt: string }[] = [
  {
    key: "analysis",
    label: "분석하기",
    prompt: "무슨 일이 일어났나요? 누가 어떤 잘못을 했는지 써 보세요.",
  },
  {
    key: "solution",
    label: "해결 방안",
    prompt:
      "피해자·주변 친구·가해자 입장에서 할 수 있는 행동을 한 가지씩 써 보세요.",
  },
  {
    key: "empathy",
    label: "공감하기",
    prompt: "피해를 입은 친구는 어떤 마음일까요? 그 감정을 상상해서 써 보세요.",
  },
];
