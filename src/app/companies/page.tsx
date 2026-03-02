export const runtime = 'edge'

import Link from 'next/link'
import { getPartnerCompanies } from '@/actions/content'

export default async function CompaniesPage() {
  const companies = await getPartnerCompanies()

  return (
    <main className="min-h-screen bg-[#f6f7f5]">
      <section className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="text-3xl font-bold text-[#1f4d2f]">조경회사</h1>
        <p className="mt-2 text-sm text-slate-600">검증 완료된 조경 파트너를 확인하세요.</p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {companies.length === 0 ? (
            <p className="text-sm text-slate-500">승인된 조경회사가 없습니다.</p>
          ) : (
            companies.map((c: { id: string; name?: string | null; email: string }) => (
              <Link key={c.id} href={`/companies/${c.id}`} className="rounded-2xl border bg-white p-5 shadow-sm">
                <h2 className="font-semibold">{c.name || '업체명 미등록'}</h2>
                <p className="mt-1 text-sm text-slate-600">{c.email}</p>
              </Link>
            ))
          )}
        </div>
      </section>
    </main>
  )
}
