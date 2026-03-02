import Link from 'next/link'

const highlights = [
  { title: '검증된 파트너', desc: '사업자/포트폴리오 검증을 통과한 조경업체만 연결합니다.' },
  { title: '투명한 견적 비교', desc: '조건/금액/메모를 한 화면에서 비교해 빠르게 선택합니다.' },
  { title: '안심 진행 프로세스', desc: '요청부터 계약 전 단계까지 진행상태를 명확하게 안내합니다.' },
]

const quickLinks = [
  { title: '포트폴리오 탐색', path: '/portfolio', desc: '지역/예산/스타일 기반 사례 탐색' },
  { title: '견적 요청하기', path: '/request-quote', desc: '3분 만에 조건 등록하고 견적 받기' },
  { title: '마이페이지', path: '/my-page', desc: '내 요청/받은 견적/진행 상태 확인' },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f6f7f5] text-slate-900">
      <section className="mx-auto max-w-6xl px-6 pb-12 pt-16 md:pt-24">
        <div className="rounded-3xl bg-gradient-to-br from-[#1f4d2f] to-[#2f6d42] p-8 text-white md:p-12">
          <p className="text-sm font-medium text-emerald-100">조경홈 GardenHOME</p>
          <h1 className="mt-3 text-3xl font-bold leading-tight md:text-5xl">
            조경 시공, 믿을 수 있게
            <br className="hidden md:block" />
            견적부터 비교까지 한 번에.
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-emerald-50 md:text-base">
            오늘의집/집닥처럼 익숙한 탐색 경험에, 조경 특화 견적 흐름을 결합한 매칭 플랫폼입니다.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/request-quote" className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#1f4d2f]">견적 요청 시작</Link>
            <Link href="/portfolio" className="rounded-xl border border-white/40 px-5 py-3 text-sm font-semibold text-white">포트폴리오 보기</Link>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {highlights.map((item) => (
            <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-semibold text-[#1f4d2f]">{item.title}</h2>
              <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
            </article>
          ))}
        </div>

        <section className="mt-10">
          <div className="mb-4 flex items-end justify-between">
            <h2 className="text-2xl font-bold">빠른 시작</h2>
            <p className="text-sm text-slate-500">핵심 기능 바로가기</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {quickLinks.map((card) => (
              <Link key={card.title} href={card.path} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <h3 className="text-lg font-semibold">{card.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{card.desc}</p>
              </Link>
            ))}
          </div>
        </section>
      </section>
    </main>
  )
}
