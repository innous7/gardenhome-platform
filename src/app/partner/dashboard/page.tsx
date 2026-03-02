import { requireRole } from '@/lib/auth'

export default async function PartnerDashboardPage() {
  const { user } = await requireRole(['PARTNER', 'ADMIN'])

  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="text-2xl font-bold text-[#2E5C31]">파트너 대시보드</h1>
      <p className="mt-1 text-sm text-gray-600">접속 계정: {user.email}</p>
      <div className="mt-4 rounded-xl border bg-white p-4">
        <h2 className="font-semibold">신규 견적 요청</h2>
        <ul className="mt-2 list-disc pl-5 text-sm text-gray-700">
          <li>용인 단독주택 30평 (예산 1,500만원)</li>
          <li>성수 카페 옥상정원 (예산 2,000만원)</li>
        </ul>
      </div>
    </main>
  )
}
