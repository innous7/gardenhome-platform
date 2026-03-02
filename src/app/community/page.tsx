export const runtime = 'edge'

import Link from 'next/link'
import { getBlogPosts } from '@/actions/content'

export default async function CommunityPage() {
  const posts = await getBlogPosts()

  return (
    <main className="min-h-screen bg-[#f6f7f5]">
      <section className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="text-3xl font-bold text-[#1f4d2f]">조경 커뮤니티</h1>
        <p className="mt-2 text-sm text-slate-600">커뮤니티 카드 클릭 시 글 상세 페이지로 이동합니다.</p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {posts.length === 0 ? (
            <p className="text-sm text-slate-500">아직 게시글이 없습니다.</p>
          ) : (
            posts.map((p: { id: string; title: string; summary?: string }) => (
              <Link key={p.id} href={`/blog/${p.id}`} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h2 className="font-semibold">{p.title}</h2>
                <p className="mt-2 text-sm text-slate-600">{p.summary || '운영팀 아티클'}</p>
              </Link>
            ))
          )}
        </div>
      </section>
    </main>
  )
}
