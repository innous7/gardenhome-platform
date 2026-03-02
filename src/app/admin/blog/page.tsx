export const runtime = 'edge'

import { createBlogPost, createPortfolioPost, deleteBlogPost, deletePortfolioPost, getAdminContentSummary, updateContentStatus } from '@/actions/content'
import BlockEditor from '@/components/features/block-editor'

export default async function AdminBlogPage() {
  const summary = await getAdminContentSummary()

  return (
    <main className="min-h-screen bg-[#f6f7f5]">
      <section className="mx-auto max-w-6xl space-y-6 px-6 py-10">
        <h1 className="text-3xl font-bold text-[#1f4d2f]">콘텐츠 작성 센터</h1>

        <article className="rounded-2xl border bg-white p-6">
          <h2 className="text-xl font-semibold">블로그 글 작성</h2>
          <form action={createBlogPost} className="mt-4 space-y-3">
            <input name="title" required placeholder="제목" className="w-full rounded-xl border px-3 py-2 text-sm" />
            <input name="summary" placeholder="요약" className="w-full rounded-xl border px-3 py-2 text-sm" />
            <BlockEditor name="blocks" />
            <div className="flex items-center gap-2">
              <select name="status" className="rounded-xl border px-3 py-2 text-sm">
                <option value="PUBLISHED">즉시 발행</option>
                <option value="DRAFT">임시저장</option>
              </select>
              <button className="rounded-xl bg-[#1f4d2f] px-4 py-2.5 text-sm font-semibold text-white">저장</button>
            </div>
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
            <div className="flex items-center gap-2">
              <select name="status" className="rounded-xl border px-3 py-2 text-sm">
                <option value="PUBLISHED">즉시 발행</option>
                <option value="DRAFT">임시저장</option>
              </select>
              <button className="rounded-xl bg-[#1f4d2f] px-4 py-2.5 text-sm font-semibold text-white">저장</button>
            </div>
          </form>
        </article>

        <article className="rounded-2xl border bg-white p-6">
          <h2 className="text-xl font-semibold">최근 콘텐츠</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="font-semibold">블로그</h3>
              <ul className="mt-2 space-y-2 text-sm">
                {summary.blog.length === 0 ? <li className="text-slate-500">없음</li> : summary.blog.map((b: { id: string; title: string; status: string }) => (
                  <li key={b.id} className="rounded-lg border p-2">
                    <p>{b.title} · {b.status}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <form action={updateContentStatus} className="flex items-center gap-1">
                        <input type="hidden" name="kind" value="blog" />
                        <input type="hidden" name="id" value={b.id} />
                        <select name="status" defaultValue={b.status} className="rounded border px-2 py-1 text-xs">
                          <option value="PUBLISHED">PUBLISHED</option>
                          <option value="DRAFT">DRAFT</option>
                        </select>
                        <button className="rounded border px-2 py-1 text-xs">변경</button>
                      </form>
                      <form action={deleteBlogPost}>
                        <input type="hidden" name="id" value={b.id} />
                        <button className="rounded border border-red-300 px-2 py-1 text-xs text-red-700">삭제</button>
                      </form>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold">포트폴리오</h3>
              <ul className="mt-2 space-y-2 text-sm">
                {summary.portfolio.length === 0 ? <li className="text-slate-500">없음</li> : summary.portfolio.map((p: { id: string; title: string; status: string }) => (
                  <li key={p.id} className="rounded-lg border p-2">
                    <p>{p.title} · {p.status}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <form action={updateContentStatus} className="flex items-center gap-1">
                        <input type="hidden" name="kind" value="portfolio" />
                        <input type="hidden" name="id" value={p.id} />
                        <select name="status" defaultValue={p.status} className="rounded border px-2 py-1 text-xs">
                          <option value="PUBLISHED">PUBLISHED</option>
                          <option value="DRAFT">DRAFT</option>
                        </select>
                        <button className="rounded border px-2 py-1 text-xs">변경</button>
                      </form>
                      <form action={deletePortfolioPost}>
                        <input type="hidden" name="id" value={p.id} />
                        <button className="rounded border border-red-300 px-2 py-1 text-xs text-red-700">삭제</button>
                      </form>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </article>
      </section>
    </main>
  )
}
