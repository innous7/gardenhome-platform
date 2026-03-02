import { getBlogPostById } from '@/actions/content'
import BlockRenderer, { type ContentBlock } from '@/components/features/block-renderer'

export default async function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const post = await getBlogPostById(id)

  if (!post) {
    return <main className="mx-auto max-w-4xl px-6 py-10">게시글이 없습니다.</main>
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="text-3xl font-bold text-[#1f4d2f]">{post.title}</h1>
      {post.summary ? <p className="mt-2 text-slate-600">{post.summary}</p> : null}
      <div className="mt-6">
        <BlockRenderer blocks={(post.content as ContentBlock[]) || []} />
      </div>
    </main>
  )
}
