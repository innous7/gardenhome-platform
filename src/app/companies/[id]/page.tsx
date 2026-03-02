export const runtime = 'edge'

import { getPartnerCompanyById } from '@/actions/content'
import BlockRenderer, { type ContentBlock } from '@/components/features/block-renderer'

export default async function CompanyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { company, portfolios } = await getPartnerCompanyById(id)

  if (!company) return <main className="mx-auto max-w-4xl px-6 py-10">조경회사를 찾을 수 없습니다.</main>

  return (
    <main className="min-h-screen bg-[#f6f7f5]">
      <section className="mx-auto max-w-5xl px-6 py-10">
        <h1 className="text-3xl font-bold text-[#1f4d2f]">{company.name || '업체명 미등록'}</h1>
        <p className="mt-2 text-sm text-slate-600">{company.email}</p>

        <div className="mt-6 space-y-4">
          {portfolios.length === 0 ? (
            <p className="text-sm text-slate-500">등록된 포트폴리오가 없습니다.</p>
          ) : (
            portfolios.map((p: { id: string; title: string; budget?: string; content: ContentBlock[] }) => (
              <article key={p.id} className="rounded-2xl border bg-white p-5 shadow-sm">
                <h2 className="text-xl font-semibold">{p.title}</h2>
                <p className="mt-1 text-sm text-slate-600">예산: {p.budget || '-'}</p>
                <div className="mt-4">
                  <BlockRenderer blocks={p.content || []} />
                </div>
              </article>
            ))
          )}
        </div>
      </section>
    </main>
  )
}
