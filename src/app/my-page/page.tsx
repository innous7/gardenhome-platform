export const runtime = 'edge'

import { requireUser } from '@/lib/auth'
import LogoutButton from '@/components/common/logout-button'
import { getMyReceivedQuotes } from '@/actions/quote'

export default async function MyPage() {
  const user = await requireUser()
  const quotes = (await getMyReceivedQuotes()) as Array<{
    id: string
    requestId: string
    totalPrice: number
    status: string
    companyId: string
    details?: { note?: string }
    company?: { id: string; name: string | null; email: string } | null
  }>

  return (
    <main className="min-h-screen bg-[#f6f7f5]">
      <section className="mx-auto max-w-5xl px-6 py-10">
        <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-6">
          <div>
            <h1 className="text-2xl font-bold text-[#1f4d2f]">마이페이지</h1>
            <p className="mt-1 text-sm text-slate-600">{user.email} · {(user.user_metadata?.role as string) || 'USER'}</p>
          </div>
          <LogoutButton />
        </div>

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold">받은 견적</h2>
          <div className="mt-3 grid gap-3">
            {quotes.length === 0 ? (
              <p className="text-sm text-slate-500">아직 받은 견적이 없습니다.</p>
            ) : (
              quotes.map((q) => (
                <article key={q.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-semibold">요청 ID: {q.requestId}</p>
                    <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-800">{q.status}</span>
                  </div>
                  <p className="mt-2 text-base font-bold text-[#1f4d2f]">{q.totalPrice.toLocaleString()}원</p>
                  <p className="mt-1 text-slate-600">파트너: {q.company?.name || q.company?.email || q.companyId}</p>
                  <p className="text-slate-600">메모: {q.details?.note || '-'}</p>
                </article>
              ))
            )}
          </div>
        </section>
      </section>
    </main>
  )
}
