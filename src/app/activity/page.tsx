"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import { btnGhost, btnPrimary, btnSecondary, Card } from "@/components/ui";
import { MOCK_ACTIVITY } from "@/lib/mockData";
import { STAGES, type Answers, type Stage } from "@/lib/types";

type SaveState = "idle" | "saving" | "saved";

export default function ActivityPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-slate-400">불러오는 중…</div>}>
      <ActivityInner />
    </Suspense>
  );
}

function ActivityInner() {
  const search = useSearchParams();
  const label = search.get("label")?.trim() || "학생";

  // step: 0 상황 읽기, 1~3 작성(분석/해결/공감), 4 제출 완료
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({
    analysis: "",
    solution: "",
    empathy: "",
  });
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 자동 저장(UI 시뮬레이션): 입력이 멈추면 '저장됨'으로 표시.
  // 실제 저장은 태스크 3(Firebase)에서 연결한다.
  useEffect(() => {
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  }, []);

  function updateAnswer(stage: Stage, value: string) {
    setAnswers((prev) => ({ ...prev, [stage]: value }));
    setSaveState("saving");
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => setSaveState("saved"), 800);
  }

  const isWriting = step >= 1 && step <= 3;
  const currentStage = isWriting ? STAGES[step - 1] : null;
  const currentValue = currentStage ? answers[currentStage.key] : "";
  const canAdvance = isWriting ? currentValue.trim().length > 0 : true;

  // ----- 제출 완료 화면 -----
  if (step === 4) {
    return (
      <main className="mx-auto flex min-h-dvh max-w-md flex-col justify-center px-4 py-10">
        <Card className="text-center">
          <div className="text-4xl">🎉</div>
          <h1 className="mt-2 text-2xl font-bold text-slate-900">제출 완료!</h1>
          <p className="mt-2 text-slate-600">
            {label}, 잘했어요. 선생님이 내용을 확인하고 있어요.
          </p>

          <div className="mt-6 rounded-xl bg-indigo-50 p-4 text-left">
            <p className="mb-2 text-sm font-semibold text-indigo-700">
              AI 선생님 피드백 (예시)
            </p>
            <p className="text-sm text-slate-600">
              선생님이 확인한 뒤 공개되면, 여기에서 단계별 피드백을 볼 수 있어요.
            </p>
          </div>

          <Link href="/" className={`${btnSecondary} mt-6 w-full`}>
            처음으로
          </Link>
        </Card>
      </main>
    );
  }

  const totalSteps = 4; // 상황 읽기 + 3단계 작성

  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col px-4 py-6">
      {/* 진행 표시 */}
      <div className="mb-4">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-semibold text-slate-700">
            {step + 1}/{totalSteps + 1}{" "}
            {step === 0 ? "상황 읽기" : currentStage?.label}
          </span>
          {isWriting && (
            <span className="text-xs text-slate-400">
              {saveState === "saving" && "저장 중…"}
              {saveState === "saved" && "✓ 자동 저장됨"}
            </span>
          )}
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-indigo-500 transition-all"
            style={{ width: `${((step + 1) / (totalSteps + 1)) * 100}%` }}
          />
        </div>
      </div>

      {/* 본문 */}
      {step === 0 ? (
        <Card>
          <h2 className="mb-2 text-lg font-bold text-slate-900">{MOCK_ACTIVITY.title}</h2>
          <p className="whitespace-pre-line leading-7 text-slate-700">
            {MOCK_ACTIVITY.scenarioText}
          </p>
        </Card>
      ) : (
        <Card>
          <h2 className="text-lg font-bold text-slate-900">{currentStage?.label}</h2>
          <p className="mt-1 text-sm text-slate-600">{currentStage?.prompt}</p>
          <textarea
            value={currentValue}
            onChange={(e) => updateAnswer(currentStage!.key, e.target.value)}
            rows={8}
            placeholder="여기에 자유롭게 써 보세요."
            className="mt-3 w-full resize-none rounded-xl border border-slate-300 p-3 text-base leading-7 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          />
          <div className="mt-1 text-right text-xs text-slate-400">
            글자 수: {currentValue.length}
          </div>
          {!canAdvance && (
            <p className="text-xs text-amber-600">한 글자 이상 써야 다음으로 넘어갈 수 있어요.</p>
          )}
        </Card>
      )}

      {/* 이동 버튼 */}
      <div className="mt-5 flex items-center justify-between">
        {step > 0 ? (
          <button onClick={() => setStep((s) => s - 1)} className={btnGhost}>
            ← 이전
          </button>
        ) : (
          <Link href="/join" className={btnGhost}>
            ← 나가기
          </Link>
        )}

        <button
          onClick={() => setStep((s) => s + 1)}
          disabled={!canAdvance}
          className={btnPrimary}
        >
          {step === 0 && "다 읽었어요 · 다음"}
          {step >= 1 && step <= 2 && "다음 →"}
          {step === 3 && "제출하기"}
        </button>
      </div>
    </main>
  );
}
