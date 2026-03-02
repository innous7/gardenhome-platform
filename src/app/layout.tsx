import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import MainNavigation from '@/components/layout/main-navigation'
import SiteFooter from '@/components/layout/site-footer'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: '조경홈 GardenHOME',
  description: '조경 시공 매칭 및 견적 비교 플랫폼',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-[#f6f7f5] antialiased`}>
        <MainNavigation />
        <div className="pb-16 md:pb-0">{children}</div>
        <SiteFooter />
      </body>
    </html>
  )
}
