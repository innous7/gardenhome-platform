import Link from 'next/link'
const items = [{ id: 'sample-p1', title: '용인 단독주택 프라이빗 가든', company: '그린아틀리에', budget: '1,200만원' }]
export default function PortfolioPage() {
  return <main className="mx-auto max-w-5xl px-6 py-12"><h1 className="text-3xl font-bold">포트폴리오 탐색</h1><div className="mt-6 grid gap-4 md:grid-cols-2">{items.map((item)=><Link key={item.id} href={`/portfolio/${item.id}`} className="rounded-xl border p-5"><h2 className="text-xl font-semibold text-slate-900">{item.title}</h2><p className="text-sm text-slate-600">업체: {item.company} · 예산: {item.budget}</p></Link>)}</div></main>
}
