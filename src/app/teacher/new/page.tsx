"use client";

import Link from "next/link";
import { useState } from "react";
import { btnPrimary, btnSecondary, Card, TopBar } from "@/components/ui";

function makeCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // 헷갈리는 0/O/1/I 제외
  let out = "";
  for (let i = 0; i < 6; i++) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
}

export default function NewActivityPage() {
  const [title, setTitle] = useState("");
  const [scenario, setScenario] = useState("");
  const [visibility, setVisibility] = useState<"after_review" | "immediate">(
    "after_review"
  );
  const [createdCode, setCreatedCode] = useState<string | null>(null);
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!title.trim() || !scenario.trim()) {
      setError("제목과 상황 제시문을 모두 입력해 주세요.");
      return;
    }
    // 태스크 1(UI): 코드만 생성해 보여줌. 실제 저장은 태스크 3에서 연결.
    setCreatedCode(makeCode());
  }

  if (createdCode) {
    return (
      <>
        <TopBar title="새 활동" />
        <main className="mx-auto max-w-md px-4 py-10">
          <Card className="text-center">
            <div className="text-4xl">✅</div>
            <h1 className="mt-2 text-xl font-bold text-slate-900">활동이 만들어졌어요</h1>
            <p className="mt-1 text-sm text-slate-600">
              아래 코드를 학생들에게 알려 주세요.
            </p>
            <div className="mt-5 rounded-xl bg-indigo-50 py-5">
              <p className="text-xs text-indigo-500">활동 코드</p>
              <p className="font-mono text-3xl font-bold tracking-widest text-indigo-700">
                {createdCode}
              </p>
            </div>
            <Link href="/teacher" className={`${btnPrimary} mt-6 w-full`}>
              대시보드로 가기
            </Link>
          </Card>
        </main>
      </>
    );
  }

  return (
    <>
      <TopBar title="새 활동" />
      <main className="mx-auto max-w-2xl px-4 py-6">
        <h1 className="mb-4 text-xl font-bold text-slate-900">새 활동 만들기</h1>
        <Card>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="title" className="mb-1 block text-sm font-semibold text-slate-700">
                제목
              </label>
              <input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="예: 단체 대화방 사이버 폭력 사례"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />
            </div>

            <div>
              <label htmlFor="scenario" className="mb-1 block text-sm font-semibold text-slate-700">
                상황 제시문
              </label>
              <textarea
                id="scenario"
                value={scenario}
                onChange={(e) => setScenario(e.target.value)}
                rows={8}
                placeholder="학생들이 읽을 사이버 폭력 상황을 적어 주세요."
                className="w-full resize-none rounded-xl border border-slate-300 p-3 leading-7 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />
            </div>

            <fieldset>
              <legend className="mb-1 block text-sm font-semibold text-slate-700">
                학생에게 피드백 공개
              </legend>
              <div className="flex flex-col gap-2 sm:flex-row">
                <label className="flex flex-1 cursor-pointer items-center gap-2 rounded-xl border border-slate-300 px-4 py-3">
                  <input
                    type="radio"
                    name="visibility"
                    checked={visibility === "after_review"}
                    onChange={() => setVisibility("after_review")}
                  />
                  <span className="text-sm">검토 후 공개 (권장)</span>
                </label>
                <label className="flex flex-1 cursor-pointer items-center gap-2 rounded-xl border border-slate-300 px-4 py-3">
                  <input
                    type="radio"
                    name="visibility"
                    checked={visibility === "immediate"}
                    onChange={() => setVisibility("immediate")}
                  />
                  <span className="text-sm">바로 공개</span>
                </label>
              </div>
            </fieldset>

            {error && (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
            )}

            <div className="flex justify-end gap-2">
              <Link href="/teacher" className={btnSecondary}>
                취소
              </Link>
              <button type="submit" className={btnPrimary}>
                만들기
              </button>
            </div>
          </form>
        </Card>
      </main>
    </>
  );
}
