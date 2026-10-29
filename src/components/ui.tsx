// 공통 UI 요소. 상태(hook)를 쓰지 않는 표현용 컴포넌트.
import Link from "next/link";
import type { ReactNode } from "react";

/** 버튼/링크 공통 클래스 */
export const btnBase =
  "inline-flex items-center justify-center rounded-xl px-5 py-3 text-base font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed";
export const btnPrimary = `${btnBase} bg-indigo-600 text-white hover:bg-indigo-700`;
export const btnSecondary = `${btnBase} bg-white text-slate-700 ring-1 ring-slate-300 hover:bg-slate-50`;
export const btnGhost = `${btnBase} text-slate-600 hover:bg-slate-100`;

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 ${className}`}
    >
      {children}
    </div>
  );
}

type BadgeTone = "slate" | "green" | "amber" | "red" | "indigo";

export function Badge({
  children,
  tone = "slate",
}: {
  children: ReactNode;
  tone?: BadgeTone;
}) {
  const tones: Record<BadgeTone, string> = {
    slate: "bg-slate-100 text-slate-700",
    green: "bg-green-100 text-green-700",
    amber: "bg-amber-100 text-amber-800",
    red: "bg-red-100 text-red-700",
    indigo: "bg-indigo-100 text-indigo-700",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

/** 상단 바 */
export function TopBar({
  title,
  right,
}: {
  title: string;
  right?: ReactNode;
}) {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-sm font-bold text-indigo-700">
          디지털 윤리 수행평가
        </Link>
        <div className="flex items-center gap-3">
          <span className="hidden text-sm text-slate-500 sm:inline">{title}</span>
          {right}
        </div>
      </div>
    </header>
  );
}
