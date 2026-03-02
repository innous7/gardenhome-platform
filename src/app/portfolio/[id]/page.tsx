import { getPortfolioPostById } from '@/actions/content'
import BlockRenderer, { type ContentBlock } from '@/components/features/block-renderer'

export default async function PortfolioDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const post = await getPortfolioPostById(id)

  if (!post) return <main className="mx-auto max-w-4xl px-6 py-10">포트폴리오를 찾을 수 없습니다.</main>

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="text-3xl font-bold text-[#1f4d2f]">{post.title}</h1>
      <p className="mt-2 text-sm text-slate-600">업체: {post.company || '-'} · 예산: {post.budget || '-'}</p>
      <div className="mt-6">
        <BlockRenderer blocks={(post.content as ContentBlock[]) || []} />
      </div>
    </main>
  )
}
