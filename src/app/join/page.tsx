"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { btnPrimary, Card } from "@/components/ui";
import { MOCK_ACTIVITY } from "@/lib/mockData";

export default function JoinPage() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [label, setLabel] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!code.trim() || !label.trim()) {
      setError("활동 코드와 이름(번호)을 모두 입력해 주세요.");
      return;
    }
    // 태스크 1(UI): 목업 코드와 비교. 실제 검증은 태스크 3에서 서버로 이동.
    if (code.trim().toUpperCase() !== MOCK_ACTIVITY.accessCode) {
      setError("활동 코드를 다시 확인해 주세요.");
      return;
    }
    const params = new URLSearchParams({ label: label.trim() });
    router.push(`/activity?${params.toString()}`);
  }

  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col justify-center px-4 py-10">
      <h1 className="mb-1 text-center text-2xl font-bold text-slate-900">
        디지털 윤리 활동 참여
      </h1>
      <p className="mb-6 text-center text-sm text-slate-500">
        선생님이 알려준 코드로 들어가요.
      </p>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="code" className="mb-1 block text-sm font-semibold text-slate-700">
              활동 코드
            </label>
            <input
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="예: A7K2QX"
              autoComplete="off"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-lg tracking-widest uppercase outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          <div>
            <label htmlFor="label" className="mb-1 block text-sm font-semibold text-slate-700">
              이름 또는 번호
            </label>
            <input
              id="label"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="예: 1반 3번"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-lg outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />
            <p className="mt-1 text-xs text-slate-400">
              실명 대신 학급과 번호를 써도 돼요.
            </p>
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
          )}

          <button type="submit" className={`${btnPrimary} w-full`}>
            들어가기
          </button>
        </form>
      </Card>

      <p className="mt-4 text-center text-xs text-slate-400">데모 코드: A7K2QX</p>
    </main>
  );
}
