import { requireUser } from '@/lib/auth'

export default async function RequestQuotePage() {
  const user = await requireUser()

  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="text-2xl font-bold text-[#2E5C31]">견적 요청</h1>
      <p className="mt-1 text-sm text-gray-600">로그인 사용자: {user.email}</p>
      <form className="mt-4 space-y-3 rounded-xl border bg-white p-4">
        <input className="w-full rounded-lg border px-3 py-2" placeholder="공간 유형 (예: 전원주택)" />
        <input className="w-full rounded-lg border px-3 py-2" placeholder="면적 (평)" />
        <input className="w-full rounded-lg border px-3 py-2" placeholder="예산 (원)" />
        <textarea className="w-full rounded-lg border px-3 py-2" placeholder="요청 사항" rows={4} />
        <button type="button" className="rounded-lg bg-[#2E5C31] px-4 py-2 text-white">요청서 저장 (다음 단계)</button>
      </form>
    </main>
  )
}
