import Link from 'next/link'
const companies = [{ id: 'company-1', name: '그린아틀리에', email: 'green@example.com' }]
export default function CompaniesPage() {
  return <main className="mx-auto max-w-5xl px-6 py-12"><h1 className="text-3xl font-bold">조경회사</h1><div className="mt-6 grid gap-4 md:grid-cols-2">{companies.map((c)=><Link key={c.id} href={`/companies/${c.id}`} className="rounded-xl border p-5"><h2 className="font-semibold">{c.name}</h2><p className="text-sm text-slate-600">{c.email}</p></Link>)}</div></main>
}
