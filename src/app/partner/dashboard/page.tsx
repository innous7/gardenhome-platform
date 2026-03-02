export const runtime = 'edge'

import { requireRole } from '@/lib/auth'
import { createPartnerQuote, getPendingQuoteRequests } from '@/actions/quote'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { UiBadge, UiButton, UiCard } from '@/components/common/ui'

export default async function PartnerDashboardPage() {
  const { user } = await requireRole(['PARTNER', 'ADMIN'])
  const requests = await getPendingQuoteRequests()
  const supabase = await createSupabaseServerClient()
  const { data: me } = await supabase.from('Users').select('partnerStatus').eq('id', user.id).single()

  return (
    <main className="min-h-screen bg-[#f6f7f5]">
      <section className="mx-auto max-w-6xl px-6 py-10">
        <UiCard>
          <h1 className="text-2xl font-bold text-[#1f4d2f]">파트너 대시보드</h1>
          <p className="mt-1 text-sm text-slate-600">{user.email}</p>
          <div className="mt-3">
            <UiBadge>승인 상태: {me?.partnerStatus || 'PENDING'}</UiBadge>
          </div>
        </UiCard>

        <UiCard title="신규 견적 요청" className="mt-6">
          <div className="space-y-3">
            {requests.length === 0 ? (
              <p className="text-sm text-slate-500">현재 대기 요청이 없습니다.</p>
            ) : (
              requests.map((r: { id: string; propertyType: string; areaSize: number; budget: number; status: string }) => (
                <article key={r.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold">{r.propertyType}</p>
                    <UiBadge>{r.status}</UiBadge>
                  </div>
                  <p className="mt-1 text-sm text-slate-600">면적 {r.areaSize}평 · 예산 {r.budget.toLocaleString()}원</p>
                  <form action={createPartnerQuote} className="mt-3 grid gap-2 md:grid-cols-3">
                    <input type="hidden" name="requestId" value={r.id} />
                    <input name="totalPrice" type="number" required placeholder="제안 금액(원)" className="rounded-xl border px-3 py-2 text-sm" />
                    <input name="note" placeholder="견적 메모" className="rounded-xl border px-3 py-2 text-sm" />
                    <UiButton type="submit" disabled={me?.partnerStatus !== 'APPROVED'}>견적 발송</UiButton>
                  </form>
                </article>
              ))
            )}
          </div>
        </UiCard>
      </section>
    </main>
  )
}
