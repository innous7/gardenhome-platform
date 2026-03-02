import Link from 'next/link'
const posts = [{ id: 'sample-1', title: '샘플 커뮤니티 글', summary: '무료 배포 모드 샘플 데이터입니다.' }]
export default function BlogPage() {
  return <main className="mx-auto max-w-5xl px-6 py-12"><h1 className="text-3xl font-bold">블로그</h1><div className="mt-6 grid gap-4 md:grid-cols-2">{posts.map((p)=><Link key={p.id} href={`/blog/${p.id}`} className="rounded-xl border p-4"><h2 className="font-semibold">{p.title}</h2><p className="text-sm text-slate-600">{p.summary}</p></Link>)}</div></main>
}
