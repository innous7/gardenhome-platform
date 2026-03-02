export const runtime = 'edge'

import { requireRole } from '@/lib/auth'
import { getPartners, updatePartnerStatus } from '@/actions/partner'
import { createPartner, deletePartner, getAdminDashboardStats } from '@/actions/admin'
import { UiBadge, UiButton, UiCard } from '@/components/common/ui'

export default async function AdminDashboardPage() {
  await requireRole(['ADMIN'])
  const partners = await getPartners()
  const stats = await getAdminDashboardStats()

  return (
    <main className="min-h-screen bg-[#f6f7f5]">
      <section className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="text-2xl font-bold text-[#1f4d2f]">관리자 대시보드</h1>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <UiCard>
            <p className="text-sm text-slate-600">총 견적 요청</p>
            <p className="mt-1 text-3xl font-bold">{stats.requestsCount}</p>
          </UiCard>
          <UiCard>
            <p className="text-sm text-slate-600">승인 대기 파트너</p>
            <p className="mt-1 text-3xl font-bold">{stats.pendingPartners}</p>
          </UiCard>
          <UiCard>
            <p className="text-sm text-slate-600">견적 전환율</p>
            <p className="mt-1 text-3xl font-bold">{stats.conversion}%</p>
          </UiCard>
        </div>

        <UiCard title="파트너 생성" className="mt-6">
          <form action={createPartner} className="grid gap-2 md:grid-cols-3">
            <input name="email" type="email" required placeholder="partner@company.com" className="rounded-xl border px-3 py-2 text-sm" />
            <input name="name" placeholder="업체명" className="rounded-xl border px-3 py-2 text-sm" />
            <UiButton type="submit">파트너 추가</UiButton>
          </form>
        </UiCard>

        <UiCard title="파트너 승인 상태 관리" className="mt-6">
          <div className="space-y-3">
            {partners.length === 0 ? (
              <p className="text-sm text-slate-500">파트너 계정이 없습니다.</p>
            ) : (
              partners.map((p: { id: string; email: string; name: string | null; partnerStatus: 'PENDING' | 'APPROVED' | 'REJECTED' }) => (
                <article key={p.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-semibold">{p.name || '-'} ({p.email})</p>
                    <UiBadge>{p.partnerStatus}</UiBadge>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <form action={updatePartnerStatus} className="flex items-center gap-2">
                      <input type="hidden" name="partnerId" value={p.id} />
                      <select name="partnerStatus" defaultValue={p.partnerStatus} className="rounded-xl border px-2 py-2 text-sm">
                        <option value="PENDING">PENDING</option>
                        <option value="APPROVED">APPROVED</option>
                        <option value="REJECTED">REJECTED</option>
                      </select>
                      <UiButton type="submit">상태 저장</UiButton>
                    </form>
                    <form action={deletePartner}>
                      <input type="hidden" name="partnerId" value={p.id} />
                      <button className="rounded-xl border border-red-300 px-4 py-2 text-sm font-semibold text-red-700">삭제</button>
                    </form>
                  </div>
                </article>
              ))
            )}
          </div>
        </UiCard>
      </section>
    </main>
  )
}
