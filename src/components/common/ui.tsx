import { ReactNode } from 'react'

type CardProps = { title?: string; children: ReactNode; className?: string }

export function UiCard({ title, children, className = '' }: CardProps) {
  return (
    <section className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm ${className}`}>
      {title ? <h2 className="text-lg font-semibold text-slate-900">{title}</h2> : null}
      <div className={title ? 'mt-3' : ''}>{children}</div>
    </section>
  )
}

export function UiBadge({ children }: { children: ReactNode }) {
  return <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-800">{children}</span>
}

export function UiButton({ children, className = '', type = 'button', disabled = false }: { children: ReactNode; className?: string; type?: 'button' | 'submit' | 'reset'; disabled?: boolean }) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`rounded-xl bg-[#1f4d2f] px-4 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  )
}
