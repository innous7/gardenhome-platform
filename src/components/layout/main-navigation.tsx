'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const menus = [
  { href: '/', label: '홈' },
  { href: '/portfolio', label: '포트폴리오' },
  { href: '/request-quote', label: '견적요청' },
  { href: '/community', label: '커뮤니티' },
  { href: '/blog', label: '블로그' },
  { href: '/flotren', label: '플로트렌' },
  { href: '/companies', label: '조경회사' },
  { href: '/my-page', label: '마이' },
]

export default function MainNavigation() {
  const pathname = usePathname()

  return (
    <>
      <header className="sticky top-0 z-40 hidden border-b border-slate-200 bg-white/90 backdrop-blur md:block">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link href="/" className="text-lg font-bold text-[#1f4d2f]">조경홈</Link>
          <nav className="flex items-center gap-2">
            {menus.map((menu) => {
              const active = pathname === menu.href
              return (
                <Link
                  key={menu.href}
                  href={menu.href}
                  className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                    active ? 'bg-emerald-100 text-[#1f4d2f]' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {menu.label}
                </Link>
              )
            })}
          </nav>
        </div>
      </header>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white md:hidden">
        <div className="mx-auto grid max-w-md grid-cols-4">
          {menus.slice(0, 4).map((menu) => {
            const active = pathname === menu.href
            return (
              <Link
                key={menu.href}
                href={menu.href}
                className={`flex h-14 items-center justify-center text-sm font-semibold ${
                  active ? 'text-[#1f4d2f]' : 'text-slate-500'
                }`}
              >
                {menu.label}
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}
