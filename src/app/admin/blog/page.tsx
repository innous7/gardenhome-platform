export const runtime = 'edge'

import { createBlogPost, createPortfolioPost } from '@/actions/content'
import BlockEditor from '@/components/features/block-editor'

export default function AdminBlogPage() {
  return (
    <main className="min-h-screen bg-[#f6f7f5]">
      <section className="mx-auto max-w-6xl px-6 py-10 space-y-6">
        <h1 className="text-3xl font-bold text-[#1f4d2f]">콘텐츠 작성 센터</h1>

        <article className="rounded-2xl border bg-white p-6">
          <h2 className="text-xl font-semibold">블로그 글 작성</h2>
          <form action={createBlogPost} className="mt-4 space-y-3">
            <input name="title" required placeholder="제목" className="w-full rounded-xl border px-3 py-2 text-sm" />
            <input name="summary" placeholder="요약" className="w-full rounded-xl border px-3 py-2 text-sm" />
            <BlockEditor name="blocks" />
            <button className="rounded-xl bg-[#1f4d2f] px-4 py-2.5 text-sm font-semibold text-white">블로그 발행</button>
          </form>
        </article>

        <article className="rounded-2xl border bg-white p-6">
          <h2 className="text-xl font-semibold">포트폴리오 글 작성</h2>
          <form action={createPortfolioPost} className="mt-4 space-y-3">
            <input name="title" required placeholder="프로젝트 제목" className="w-full rounded-xl border px-3 py-2 text-sm" />
            <div className="grid gap-3 md:grid-cols-2">
              <input name="company" placeholder="업체명" className="rounded-xl border px-3 py-2 text-sm" />
              <input name="budget" placeholder="예산 (예: 1,500만원)" className="rounded-xl border px-3 py-2 text-sm" />
            </div>
            <BlockEditor name="blocks" />
            <button className="rounded-xl bg-[#1f4d2f] px-4 py-2.5 text-sm font-semibold text-white">포트폴리오 발행</button>
          </form>
        </article>
      </section>
    </main>
  )
}
