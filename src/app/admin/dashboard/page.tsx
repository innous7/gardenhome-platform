import { requireRole } from '@/lib/auth'
import { getPartners, updatePartnerStatus } from '@/actions/partner'
import { createPartner, deletePartner, getAdminDashboardStats } from '@/actions/admin'

export default async function AdminDashboardPage() {
  await requireRole(['ADMIN'])
  const partners = await getPartners()
  const stats = await getAdminDashboardStats()

  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="text-2xl font-bold text-[#2E5C31]">관리자 대시보드</h1>

      <section className="mt-4 grid gap-4 md:grid-cols-3">
        <article className="rounded-xl border bg-white p-4">
          <p className="text-sm text-gray-600">총 견적 요청</p>
          <p className="text-2xl font-bold">{stats.requestsCount}</p>
        </article>
        <article className="rounded-xl border bg-white p-4">
          <p className="text-sm text-gray-600">파트너 승인 대기</p>
          <p className="text-2xl font-bold">{stats.pendingPartners}</p>
        </article>
        <article className="rounded-xl border bg-white p-4">
          <p className="text-sm text-gray-600">견적 전환율</p>
          <p className="text-2xl font-bold">{stats.conversion}%</p>
        </article>
      </section>

      <section className="mt-4 rounded-xl border bg-white p-4">
        <h2 className="font-semibold">파트너 생성 (기본 Create)</h2>
        <form action={createPartner} className="mt-2 grid gap-2 md:grid-cols-3">
          <input name="email" type="email" required placeholder="partner@company.com" className="rounded border px-2 py-1 text-sm" />
          <input name="name" placeholder="업체명" className="rounded border px-2 py-1 text-sm" />
          <button className="rounded bg-[#2E5C31] px-3 py-1 text-sm text-white">파트너 추가</button>
        </form>
      </section>

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
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <form action={updatePartnerStatus} className="flex items-center gap-2">
                      <input type="hidden" name="partnerId" value={p.id} />
                      <select name="partnerStatus" defaultValue={p.partnerStatus} className="rounded border px-2 py-1 text-sm">
                        <option value="PENDING">PENDING</option>
                        <option value="APPROVED">APPROVED</option>
                        <option value="REJECTED">REJECTED</option>
                      </select>
                      <button className="rounded bg-[#2E5C31] px-3 py-1 text-sm text-white">상태 저장</button>
                    </form>
                    <form action={deletePartner}>
                      <input type="hidden" name="partnerId" value={p.id} />
                      <button className="rounded border border-red-300 px-3 py-1 text-sm text-red-700">삭제</button>
                    </form>
                  </div>
                </article>
              )
            )
          )}
        </div>
      </section>
    </main>
  )
}
