export const runtime = 'edge'

import { requireUser } from '@/lib/auth'
import { createQuoteRequest, getMyQuoteRequests } from '@/actions/quote'

const steps = [
  { title: '공간 정보', desc: '유형/면적 입력' },
  { title: '예산 설정', desc: '희망 예산 입력' },
  { title: '요청 등록', desc: '파트너 매칭 시작' },
]

export default async function RequestQuotePage() {
  const user = await requireUser()
  const items = await getMyQuoteRequests()

  return (
    <main className="min-h-screen bg-[#f6f7f5]">
      <section className="mx-auto max-w-5xl px-6 py-10">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h1 className="text-3xl font-bold text-[#1f4d2f]">견적 요청</h1>
          <p className="mt-2 text-sm text-slate-600">{user.email} 계정으로 요청을 등록합니다. 3분 내 접수 가능합니다.</p>

          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {steps.map((step, i) => (
              <article key={step.title} className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs font-semibold text-[#1f4d2f]">STEP {i + 1}</p>
                <h2 className="mt-1 font-semibold">{step.title}</h2>
                <p className="text-sm text-slate-600">{step.desc}</p>
              </article>
            ))}
          </div>

          <form action={createQuoteRequest} className="mt-6 grid gap-3 md:grid-cols-3">
            <input name="propertyType" required className="rounded-xl border px-3 py-2 text-sm" placeholder="공간 유형 (예: 전원주택)" />
            <input name="areaSize" required type="number" className="rounded-xl border px-3 py-2 text-sm" placeholder="면적 (평)" />
            <input name="budget" required type="number" className="rounded-xl border px-3 py-2 text-sm" placeholder="예산 (원)" />
            <button className="md:col-span-3 rounded-xl bg-[#1f4d2f] px-4 py-3 text-sm font-semibold text-white">견적 요청 등록</button>
          </form>
        </div>

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold">내 요청 내역</h2>
          <div className="mt-3 space-y-2">
            {items.length === 0 ? (
              <p className="text-sm text-slate-500">아직 요청이 없습니다.</p>
            ) : (
              items.map((item: { id: string; propertyType: string; areaSize: number; budget: number; status: string }) => (
                <article key={item.id} className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm">
                  <span className="font-medium">{item.propertyType}</span> · {item.areaSize}평 · {item.budget.toLocaleString()}원
                  <span className="ml-2 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-800">{item.status}</span>
                </article>
              ))
            )}
          </div>
        </section>
      </section>
    </main>
  )
}
