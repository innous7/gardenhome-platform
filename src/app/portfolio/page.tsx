export const runtime = 'edge'

import Link from 'next/link'
import { getPortfolioPosts } from '@/actions/content'

export default async function PortfolioPage() {
  const posts = await getPortfolioPosts()

  return (
    <main className="min-h-screen bg-[#f6f7f5]">
      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h1 className="text-3xl font-bold text-[#1f4d2f]">포트폴리오 탐색</h1>
          <p className="mt-2 text-sm text-slate-600">포트폴리오를 클릭하면 상세 페이지에서 전체 내용을 확인할 수 있습니다.</p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {posts.length === 0 ? (
            <p className="text-sm text-slate-500">아직 포트폴리오 글이 없습니다. 관리자에서 먼저 작성해주세요.</p>
          ) : (
            posts.map((item: { id: string; title: string; company?: string; budget?: string }) => (
              <Link key={item.id} href={`/portfolio/${item.id}`} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-slate-900">{item.title}</h2>
                <p className="mt-1 text-sm text-slate-600">업체: {item.company || '-'} · 예산: {item.budget || '-'}</p>
                <p className="mt-3 text-sm font-semibold text-[#1f4d2f]">상세 보기 →</p>
              </Link>
            ))
          )}
        </div>
      </section>
    </main>
  )
}
