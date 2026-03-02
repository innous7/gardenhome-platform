import Link from 'next/link'

export default function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-6 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
        <p>© 2026 GardenHOME. All rights reserved.</p>
        <div className="flex flex-wrap gap-3">
          <Link href="/policies/terms" className="hover:text-slate-900">이용약관</Link>
          <Link href="/policies/privacy" className="hover:text-slate-900">개인정보처리방침</Link>
          <Link href="/policies/refund-dispute" className="hover:text-slate-900">환불/분쟁정책</Link>
        </div>
      </div>
    </footer>
  )
}
