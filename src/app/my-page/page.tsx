import { requireUser } from '@/lib/auth'
import LogoutButton from '@/components/common/logout-button'

export default async function MyPage() {
  const user = await requireUser()

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
    </main>
  )
}
