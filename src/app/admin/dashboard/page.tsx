import { requireRole } from '@/lib/auth'
import { getPartners, updatePartnerStatus } from '@/actions/partner'

export default async function AdminDashboardPage() {
  await requireRole(['ADMIN'])
  const partners = await getPartners()

  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="text-2xl font-bold text-[#2E5C31]">관리자 대시보드</h1>

      <section className="mt-4 rounded-xl border bg-white p-4">
        <h2 className="font-semibold">파트너 승인 상태 관리</h2>
        <div className="mt-3 space-y-2">
          {partners.length === 0 ? (
            <p className="text-sm text-gray-500">파트너 계정이 없습니다.</p>
          ) : (
            partners.map(
              (p: { id: string; email: string; name: string | null; partnerStatus: 'PENDING' | 'APPROVED' | 'REJECTED' }) => (
                <article key={p.id} className="rounded-lg border p-3">
                  <p className="text-sm font-medium">{p.name || '-'} ({p.email})</p>
                  <form action={updatePartnerStatus} className="mt-2 flex items-center gap-2">
                    <input type="hidden" name="partnerId" value={p.id} />
                    <select name="partnerStatus" defaultValue={p.partnerStatus} className="rounded border px-2 py-1 text-sm">
                      <option value="PENDING">PENDING</option>
                      <option value="APPROVED">APPROVED</option>
                      <option value="REJECTED">REJECTED</option>
                    </select>
                    <button className="rounded bg-[#2E5C31] px-3 py-1 text-sm text-white">저장</button>
                  </form>
                </article>
              )
            )
          )}
        </div>
      </section>
    </main>
  )
}
