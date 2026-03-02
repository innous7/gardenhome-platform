'use client'

import { FormEvent, useState } from 'react'
import { createSupabaseBrowserClient } from '@/lib/supabase/client'

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const supabase = createSupabaseBrowserClient()
    const redirectTo = `${window.location.origin}/auth`
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo })

    setMessage(error ? `오류: ${error.message}` : '비밀번호 재설정 메일을 보냈습니다.')
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-[#f6f7f5] px-6 py-10">
      <section className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-[#1f4d2f]">비밀번호 재설정</h1>
        <p className="mt-1 text-sm text-slate-600">가입한 이메일을 입력하면 재설정 링크를 보내드립니다.</p>
        <form onSubmit={onSubmit} className="mt-4 space-y-3">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="w-full rounded-xl border px-3 py-2 text-sm"
          />
          <button disabled={loading} className="w-full rounded-xl bg-[#1f4d2f] px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60">
            {loading ? '처리 중...' : '재설정 메일 보내기'}
          </button>
        </form>
        {message ? <p className="mt-3 text-sm text-slate-700">{message}</p> : null}
      </section>
    </main>
  )
}
