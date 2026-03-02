export const runtime = 'edge'

import Link from 'next/link'
import { getBlogPosts } from '@/actions/content'

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <main className="min-h-screen bg-[#f6f7f5]">
      <section className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="text-3xl font-bold text-[#1f4d2f]">블로그</h1>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {posts.length === 0 ? (
            <p className="text-sm text-slate-500">아직 게시글이 없습니다.</p>
          ) : (
            posts.map((p: { id: string; title: string; summary?: string }) => (
              <Link key={p.id} href={`/blog/${p.id}`} className="rounded-2xl border bg-white p-5 shadow-sm">
                <h2 className="font-semibold">{p.title}</h2>
                <p className="mt-2 text-sm text-slate-600">{p.summary || '요약 없음'}</p>
              </Link>
            ))
          )}
        </div>
      </section>
    </main>
  )
}
