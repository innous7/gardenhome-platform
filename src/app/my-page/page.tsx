import { requireUser } from '@/lib/auth'
import LogoutButton from '@/components/common/logout-button'
import { getMyReceivedQuotes } from '@/actions/quote'

export default async function MyPage() {
  const user = await requireUser()
  const quotes = (await getMyReceivedQuotes()) as Array<{
    id: string
    requestId: string
    totalPrice: number
    status: string
    companyId: string
    details?: { note?: string }
    company?: { id: string; name: string | null; email: string } | null
  }>

  return (
    <main className="mx-auto max-w-3xl p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#2E5C31]">마이페이지</h1>
        <LogoutButton />
      </div>
      <div className="mt-4 rounded-xl border bg-white p-4">
        <p className="text-sm text-gray-700">이메일: {user.email}</p>
        <p className="text-sm text-gray-700">권한(임시): {(user.user_metadata?.role as string) || 'USER'}</p>
      </div>

      <section className="mt-6">
        <h2 className="font-semibold">받은 견적</h2>
        <div className="mt-2 space-y-2">
          {quotes.length === 0 ? (
            <p className="text-sm text-gray-500">아직 받은 견적이 없습니다.</p>
          ) : (
            quotes.map((q) => (
              <article key={q.id} className="rounded-lg border bg-white p-3 text-sm">
                요청ID: {q.requestId} / 제안금액: {q.totalPrice.toLocaleString()}원 / 상태: {q.status}
                <p className="text-gray-600">파트너: {q.company?.name || q.company?.email || q.companyId}</p>
                <p className="text-gray-600">메모: {q.details?.note || '-'}</p>
              </article>
            ))
          )}
        </div>
      </section>
    </main>
  )
}
