import { Suspense } from "react";
import { notFound } from "next/navigation";
import { TopBar } from "@/components/ui";
import ReviewEditor from "@/components/ReviewEditor";
import { getSubmission } from "@/lib/mockData";

export default function ReviewPage({
  params,
}: PageProps<"/teacher/review/[id]">) {
  return (
    <>
      <TopBar title="답안 검토" />
      {/* Cache Components(PPR): params 접근은 Suspense 안에서 해야 정적 셸을 먼저 렌더할 수 있다. */}
      <Suspense
        fallback={<div className="p-10 text-center text-slate-400">불러오는 중…</div>}
      >
        <ReviewContent params={params} />
      </Suspense>
    </>
  );
}

async function ReviewContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const submission = getSubmission(id);
  if (!submission) notFound();

  return <ReviewEditor submission={submission} />;
}
