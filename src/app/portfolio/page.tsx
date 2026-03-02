import { getPortfolioPosts } from '@/actions/content'
import BlockRenderer, { type ContentBlock } from '@/components/features/block-renderer'

export default async function PortfolioPage() {
  const posts = await getPortfolioPosts()

  return (
    <main className="min-h-screen bg-[#f6f7f5]">
      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h1 className="text-3xl font-bold text-[#1f4d2f]">포트폴리오 탐색</h1>
          <p className="mt-2 text-sm text-slate-600">실제 작성된 포트폴리오 콘텐츠를 확인하고 바로 견적 요청으로 연결하세요.</p>
        </div>

        <div className="mt-6 space-y-5">
          {posts.length === 0 ? (
            <p className="text-sm text-slate-500">아직 포트폴리오 글이 없습니다. 관리자에서 먼저 작성해주세요.</p>
          ) : (
            posts.map((item: { id: string; title: string; company?: string; budget?: string; content: ContentBlock[] }) => (
              <article key={item.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold">{item.title}</h2>
                <p className="mt-1 text-sm text-slate-600">업체: {item.company || '-'} · 예산: {item.budget || '-'}</p>
                <div className="mt-4">
                  <BlockRenderer blocks={item.content || []} />
                </div>
              </article>
            ))
          )}
        </div>
      </section>
    </main>
  )
}
