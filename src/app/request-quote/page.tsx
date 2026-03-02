import { requireUser } from '@/lib/auth'
import { createQuoteRequest, getMyQuoteRequests } from '@/actions/quote'

export default async function RequestQuotePage() {
  const user = await requireUser()
  const items = await getMyQuoteRequests()

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-2xl font-bold text-[#2E5C31]">견적 요청</h1>
      <p className="mt-1 text-sm text-gray-600">로그인 사용자: {user.email}</p>

      <form action={createQuoteRequest} className="mt-4 space-y-3 rounded-xl border bg-white p-4">
        <input name="propertyType" required className="w-full rounded-lg border px-3 py-2" placeholder="공간 유형 (예: 전원주택)" />
        <input name="areaSize" required type="number" className="w-full rounded-lg border px-3 py-2" placeholder="면적 (평)" />
        <input name="budget" required type="number" className="w-full rounded-lg border px-3 py-2" placeholder="예산 (원)" />
        <button className="rounded-lg bg-[#2E5C31] px-4 py-2 text-white">견적 요청 저장</button>
      </form>

      <section className="mt-6">
        <h2 className="font-semibold">내 요청 내역</h2>
        <div className="mt-2 space-y-2">
          {items.length === 0 ? (
            <p className="text-sm text-gray-500">아직 요청이 없습니다.</p>
          ) : (
            items.map((item: { id: string; propertyType: string; areaSize: number; budget: number; status: string }) => (
              <article key={item.id} className="rounded-lg border bg-white p-3 text-sm">
                {item.propertyType} / {item.areaSize}평 / {item.budget.toLocaleString()}원 / {item.status}
              </article>
            ))
          )}
        </div>
      </section>
    </main>
  )
}
