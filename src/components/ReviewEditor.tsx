"use client";

import Link from "next/link";
import { useState } from "react";
import { Badge, btnPrimary, btnSecondary, Card } from "@/components/ui";
import { STAGES, type Feedback, type Submission } from "@/lib/types";

const EMPTY: Feedback = { analysis: "", solution: "", empathy: "", overall: "" };

export default function ReviewEditor({ submission }: { submission: Submission }) {
  // 초기 피드백: 교사 수정본 > AI 초안 > 빈 값
  const [feedback, setFeedback] = useState<Feedback>(
    submission.teacherFeedback ?? submission.aiFeedback ?? EMPTY
  );
  const [confirmed, setConfirmed] = useState(submission.confirmed);
  const [notice, setNotice] = useState("");

  function set(key: keyof Feedback, value: string) {
    setFeedback((prev) => ({ ...prev, [key]: value }));
    setConfirmed(false);
  }

  // 태스크 1(UI): 저장/확정은 화면 상태만 변경. 실제 저장은 태스크 3에서 연결.
  function handleSave() {
    setNotice("저장되었습니다. (데모 — 아직 DB에 저장되지 않습니다)");
  }
  function handleConfirm() {
    setConfirmed(true);
    setNotice("확정·공개했습니다. (데모) 학생 화면에 피드백이 보이게 됩니다.");
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/teacher" className="text-sm text-slate-500 hover:underline">
            ← 대시보드
          </Link>
          <h1 className="text-xl font-bold text-slate-900">{submission.studentLabel}</h1>
          {confirmed && <Badge tone="green">확정됨</Badge>}
        </div>
      </div>

      {submission.safetyFlag?.flagged && (
        <div className="mb-4 rounded-xl bg-red-50 p-4 ring-1 ring-red-200">
          <p className="text-sm font-bold text-red-700">⚠ 위기 플래그</p>
          <p className="mt-1 text-sm text-red-700">{submission.safetyFlag.reason}</p>
          <p className="mt-1 text-xs text-red-500">
            심각도: {submission.safetyFlag.severity === "high" ? "높음" : "낮음"} · 학교의 안전
            처리 절차에 따라 조치해 주세요.
          </p>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {STAGES.map((stage) => (
          <div key={stage.key} className="contents">
            <Card>
              <p className="mb-1 text-xs font-semibold text-slate-400">학생 답안</p>
              <h3 className="mb-2 text-sm font-bold text-slate-700">{stage.label}</h3>
              <p className="whitespace-pre-line text-sm leading-7 text-slate-700">
                {submission.answers[stage.key] || "(작성 안 함)"}
              </p>
            </Card>
            <Card>
              <p className="mb-1 text-xs font-semibold text-indigo-500">
                AI 1차 피드백 (수정 가능)
              </p>
              <h3 className="mb-2 text-sm font-bold text-slate-700">{stage.label}</h3>
              <textarea
                value={feedback[stage.key]}
                onChange={(e) => set(stage.key, e.target.value)}
                rows={5}
                className="w-full resize-none rounded-xl border border-slate-300 p-3 text-sm leading-7 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />
            </Card>
          </div>
        ))}
      </div>

      <Card className="mt-4">
        <label className="mb-1 block text-xs font-semibold text-indigo-500">
          종합 피드백 (수정 가능)
        </label>
        <textarea
          value={feedback.overall}
          onChange={(e) => set("overall", e.target.value)}
          rows={3}
          className="w-full resize-none rounded-xl border border-slate-300 p-3 text-sm leading-7 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
        />
      </Card>

      {notice && (
        <p className="mt-4 rounded-lg bg-slate-100 px-3 py-2 text-sm text-slate-600">
          {notice}
        </p>
      )}

      <div className="mt-5 flex flex-wrap justify-end gap-2">
        <button
          type="button"
          className={btnSecondary}
          onClick={() => setNotice("AI 피드백을 다시 생성합니다. (데모 — 태스크 2에서 연결)")}
        >
          다시 생성
        </button>
        <button type="button" className={btnSecondary} onClick={handleSave}>
          저장
        </button>
        <button type="button" className={btnPrimary} onClick={handleConfirm}>
          확정·공개
        </button>
      </div>
    </main>
  );
}
