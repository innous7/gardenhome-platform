import { requireRole } from '@/lib/auth'

export default async function AdminDashboardPage() {
  await requireRole(['ADMIN'])

  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="text-2xl font-bold text-[#2E5C31]">관리자 대시보드</h1>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <article className="rounded-xl border bg-white p-4">
          <p className="text-sm text-gray-600">오늘 견적 요청</p>
          <p className="text-2xl font-bold">12</p>
        </article>
        <article className="rounded-xl border bg-white p-4">
          <p className="text-sm text-gray-600">파트너 승인 대기</p>
          <p className="text-2xl font-bold">4</p>
        </article>
        <article className="rounded-xl border bg-white p-4">
          <p className="text-sm text-gray-600">상담 전환율</p>
          <p className="text-2xl font-bold">28%</p>
        </article>
      </div>
    </main>
  )
}
