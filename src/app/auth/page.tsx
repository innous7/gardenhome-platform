'use client'

import { FormEvent, useState } from 'react'
import Link from 'next/link'
import { createSupabaseBrowserClient } from '@/lib/supabase/client'

type Mode = 'login' | 'signup'

export default function AuthPage() {
  const [mode, setMode] = useState<Mode>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const getNextPath = () => {
    if (typeof window === 'undefined') return '/my-page'
    const params = new URLSearchParams(window.location.search)
    return params.get('next') || '/my-page'
  }

  const onEmailLogin = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const supabase = createSupabaseBrowserClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) setMessage(`오류: ${error.message}`)
    else window.location.href = getNextPath()
    setLoading(false)
  }

  const onEmailSignup = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const supabase = createSupabaseBrowserClient()
    const redirectTo = `${window.location.origin}${getNextPath()}`
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: redirectTo },
    })

    setMessage(error ? `오류: ${error.message}` : '회원가입 완료. 메일 인증 후 로그인해주세요.')
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-[#f6f7f5] px-6 py-10">
      <section className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-[#1f4d2f]">조경홈 로그인</h1>
        <p className="mt-1 text-sm text-slate-700">이메일/비밀번호로 로그인 또는 회원가입하세요.</p>

        <div className="mt-4 grid grid-cols-2 gap-2 rounded-xl bg-slate-100 p-1">
          <button onClick={() => setMode('login')} className={`rounded-lg py-2 text-sm font-semibold ${mode === 'login' ? 'bg-white text-[#1f4d2f]' : 'text-slate-600'}`}>로그인</button>
          <button onClick={() => setMode('signup')} className={`rounded-lg py-2 text-sm font-semibold ${mode === 'signup' ? 'bg-white text-[#1f4d2f]' : 'text-slate-600'}`}>회원가입</button>
        </div>

        <form onSubmit={mode === 'login' ? onEmailLogin : onEmailSignup} className="mt-4 space-y-3">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400"
          />

          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400"
          />

          <button disabled={loading} className="w-full rounded-xl bg-[#1f4d2f] px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60">
            {loading ? '처리 중...' : mode === 'login' ? '로그인' : '회원가입'}
          </button>
        </form>

        <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
          <Link href="/reset-password" className="hover:text-slate-700">비밀번호를 잊으셨나요?</Link>
          <span>보안 로그인 지원</span>
        </div>

        {message ? <p className="mt-3 text-sm text-slate-700">{message}</p> : null}
      </section>
    </main>
  )
}
