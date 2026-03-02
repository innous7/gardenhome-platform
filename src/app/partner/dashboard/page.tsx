import { requireRole } from '@/lib/auth'
import { getPendingQuoteRequests } from '@/actions/quote'

export default async function PartnerDashboardPage() {
  const { user } = await requireRole(['PARTNER', 'ADMIN'])
  const requests = await getPendingQuoteRequests()

  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="text-2xl font-bold text-[#2E5C31]">파트너 대시보드</h1>
      <p className="mt-1 text-sm text-gray-600">접속 계정: {user.email}</p>

      <div className="mt-4 rounded-xl border bg-white p-4">
        <h2 className="font-semibold">신규 견적 요청</h2>
        <div className="mt-2 space-y-2 text-sm text-gray-700">
          {requests.length === 0 ? (
            <p>현재 대기 요청이 없습니다.</p>
          ) : (
            requests.map((r: { id: string; propertyType: string; areaSize: number; budget: number; status: string }) => (
              <article key={r.id} className="rounded-lg border p-2">
                {r.propertyType} / {r.areaSize}평 / {r.budget.toLocaleString()}원 / {r.status}
              </article>
            ))
          )}
        </div>
      </div>
    </main>
  )
}
