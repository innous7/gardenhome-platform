'use client'

import { FormEvent, useState } from 'react'
import { createSupabaseBrowserClient } from '@/lib/supabase/client'

export default function AuthPage() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const supabase = createSupabaseBrowserClient()
    const redirectTo = `${window.location.origin}/my-page`

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: redirectTo },
    })

    if (error) setMessage(`오류: ${error.message}`)
    else setMessage('로그인 메일을 발송했습니다. 메일 링크를 확인해주세요.')
    setLoading(false)
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md items-center px-6">
      <form onSubmit={onSubmit} className="w-full space-y-4 rounded-xl border bg-white p-6">
        <h1 className="text-2xl font-bold text-[#2E5C31]">조경홈 로그인</h1>
        <p className="text-sm text-gray-600">대표/팀원 공용 매직링크 로그인</p>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          className="w-full rounded-lg border px-3 py-2"
        />
        <button disabled={loading} className="w-full rounded-lg bg-[#2E5C31] px-3 py-2 text-white disabled:opacity-60">
          {loading ? '발송 중...' : '매직링크 받기'}
        </button>
        {message && <p className="text-sm text-gray-700">{message}</p>}
      </form>
    </main>
  )
}
