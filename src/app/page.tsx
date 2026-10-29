import Link from "next/link";
import { Card } from "@/components/ui";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-3xl flex-col justify-center px-4 py-10">
      <div className="mb-8 text-center">
        <p className="mb-2 text-sm font-semibold text-indigo-600">
          중학교 1학년 정보 · 디지털 윤리
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          사이버 폭력, 함께 생각해 보기
        </h1>
        <p className="mt-3 text-slate-600">
          상황을 읽고 분석하고, 해결 방안을 쓰고, 친구의 마음에 공감해 보는 서술형 활동이에요.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link href="/join" className="group">
          <Card className="h-full transition-shadow group-hover:shadow-md">
            <div className="text-2xl">🧑‍🎓</div>
            <h2 className="mt-2 text-lg font-bold text-slate-900">학생 참여</h2>
            <p className="mt-1 text-sm text-slate-600">
              선생님이 알려준 활동 코드로 들어가 활동을 작성해요.
            </p>
            <span className="mt-4 inline-block text-sm font-semibold text-indigo-600">
              들어가기 →
            </span>
          </Card>
        </Link>

        <Link href="/teacher" className="group">
          <Card className="h-full transition-shadow group-hover:shadow-md">
            <div className="text-2xl">🧑‍🏫</div>
            <h2 className="mt-2 text-lg font-bold text-slate-900">교사</h2>
            <p className="mt-1 text-sm text-slate-600">
              활동을 만들고, 학생 답안과 AI 피드백을 검토·확정해요.
            </p>
            <span className="mt-4 inline-block text-sm font-semibold text-indigo-600">
              대시보드 →
            </span>
          </Card>
        </Link>
      </div>

      <p className="mt-8 text-center text-xs text-slate-400">
        * 현재는 화면(UI) 단계입니다. AI 피드백·저장 기능은 다음 단계에서 연결됩니다.
      </p>
    </main>
  );
}
