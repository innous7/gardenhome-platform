export const runtime = 'edge'

import { requireRole } from '@/lib/auth'
import { createPartnerQuote, getPendingQuoteRequests } from '@/actions/quote'
import { createSupabaseServerClient } from '@/lib/supabase/server'

export default async function PartnerDashboardPage() {
  const { user } = await requireRole(['PARTNER', 'ADMIN'])
  const requests = await getPendingQuoteRequests()
  const supabase = await createSupabaseServerClient()
  const { data: me } = await supabase.from('Users').select('partnerStatus').eq('id', user.id).single()

  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="text-2xl font-bold text-[#2E5C31]">파트너 대시보드</h1>
      <p className="mt-1 text-sm text-gray-600">접속 계정: {user.email}</p>

      <div className="mt-4 rounded-xl border bg-white p-4">
        <h2 className="font-semibold">신규 견적 요청</h2>
        <p className="mt-1 text-xs text-gray-500">파트너 승인 상태: {me?.partnerStatus || 'PENDING'}</p>
        <div className="mt-2 space-y-3 text-sm text-gray-700">
          {requests.length === 0 ? (
            <p>현재 대기 요청이 없습니다.</p>
          ) : (
            requests.map((r: { id: string; propertyType: string; areaSize: number; budget: number; status: string }) => (
              <article key={r.id} className="rounded-lg border p-3">
                <p>
                  {r.propertyType} / {r.areaSize}평 / {r.budget.toLocaleString()}원 / {r.status}
                </p>
                <form action={createPartnerQuote} className="mt-2 grid gap-2 md:grid-cols-3">
                  <input type="hidden" name="requestId" value={r.id} />
                  <input name="totalPrice" type="number" required placeholder="제안 금액(원)" className="rounded border px-2 py-1" />
                  <input name="note" placeholder="견적 메모" className="rounded border px-2 py-1" />
                  <button disabled={me?.partnerStatus !== 'APPROVED'} className="rounded bg-[#2E5C31] px-3 py-1 text-white disabled:cursor-not-allowed disabled:opacity-50">견적 발송</button>
                </form>
              </article>
            ))
          )}
        </div>
      </div>
    </main>
  )
}
