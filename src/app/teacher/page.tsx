import Link from "next/link";
import { Badge, btnPrimary, Card, TopBar } from "@/components/ui";
import { getActivity, listSubmissions, TOTAL_STUDENTS } from "@/lib/mockData";

export default function TeacherDashboard() {
  const activity = getActivity();
  const submissions = listSubmissions();
  const flagged = submissions.filter((s) => s.safetyFlag?.flagged);
  const submittedCount = submissions.filter((s) => s.status === "submitted").length;

  return (
    <>
      <TopBar
        title="교사 대시보드"
        right={
          <Link href="/teacher/new" className={`${btnPrimary} px-4 py-2 text-sm`}>
            + 새 활동
          </Link>
        }
      />

      <main className="mx-auto max-w-5xl px-4 py-6">
        {/* 활동 요약 */}
        <Card className="mb-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-xl font-bold text-slate-900">{activity.title}</h1>
              <p className="mt-1 text-sm text-slate-500">
                접속 코드{" "}
                <span className="rounded bg-slate-100 px-2 py-0.5 font-mono font-semibold tracking-widest text-slate-800">
                  {activity.accessCode}
                </span>
              </p>
            </div>
            <div className="text-right">
              <Badge tone={activity.status === "open" ? "green" : "slate"}>
                {activity.status === "open" ? "열림" : "닫힘"}
              </Badge>
              <p className="mt-1 text-sm text-slate-500">
                제출 {submittedCount} / {TOTAL_STUDENTS}
              </p>
            </div>
          </div>
        </Card>

        {/* 위기 플래그 */}
        {flagged.length > 0 && (
          <Card className="mb-5 ring-2 ring-red-200">
            <h2 className="mb-2 flex items-center gap-2 text-sm font-bold text-red-700">
              ⚠ 위기 플래그 ({flagged.length})
            </h2>
            <ul className="space-y-2">
              {flagged.map((s) => (
                <li
                  key={s.id}
                  className="flex items-center justify-between rounded-lg bg-red-50 px-3 py-2"
                >
                  <span className="text-sm text-slate-700">
                    <span className="font-semibold">{s.studentLabel}</span>
                    {" — "}
                    {s.safetyFlag?.reason}
                  </span>
                  <Link
                    href={`/teacher/review/${s.id}`}
                    className="shrink-0 text-sm font-semibold text-red-700 hover:underline"
                  >
                    검토 →
                  </Link>
                </li>
              ))}
            </ul>
          </Card>
        )}

        {/* 제출 목록 */}
        <Card>
          <h2 className="mb-3 text-sm font-bold text-slate-700">제출 목록</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs text-slate-400">
                <tr className="border-b border-slate-200">
                  <th className="px-2 py-2">학생</th>
                  <th className="px-2 py-2">상태</th>
                  <th className="px-2 py-2">AI 피드백</th>
                  <th className="px-2 py-2">확정</th>
                  <th className="px-2 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((s) => (
                  <tr key={s.id} className="border-b border-slate-100">
                    <td className="px-2 py-3 font-medium text-slate-800">
                      {s.studentLabel}
                      {s.safetyFlag?.flagged && (
                        <span className="ml-1 text-red-600" title={s.safetyFlag.reason}>
                          ⚠
                        </span>
                      )}
                    </td>
                    <td className="px-2 py-3">
                      {s.status === "submitted" ? (
                        <Badge tone="indigo">제출됨</Badge>
                      ) : (
                        <Badge tone="amber">작성 중</Badge>
                      )}
                    </td>
                    <td className="px-2 py-3 text-slate-500">
                      {s.aiFeedback ? "생성됨" : "—"}
                    </td>
                    <td className="px-2 py-3 text-slate-500">
                      {s.confirmed ? (
                        <Badge tone="green">확정</Badge>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="px-2 py-3 text-right">
                      {s.status === "submitted" ? (
                        <Link
                          href={`/teacher/review/${s.id}`}
                          className="font-semibold text-indigo-600 hover:underline"
                        >
                          검토
                        </Link>
                      ) : (
                        <span className="text-slate-300">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </main>
    </>
  );
}
