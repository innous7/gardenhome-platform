const sample = [
  { title: '용인 단독주택 프라이빗 가든', company: '그린아틀리에', budget: '1,200만원', tags: ['주택', '모던', '잔디'] },
  { title: '제주 펜션 외부공간 리뉴얼', company: '제주가든랩', budget: '2,500만원', tags: ['상업', '리뉴얼', '야간조명'] },
  { title: '성수 루프탑 가든 카페', company: '어반랜드스케이프', budget: '1,800만원', tags: ['루프탑', '카페', '플랜터'] },
]

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-[#f6f7f5]">
      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h1 className="text-3xl font-bold text-[#1f4d2f]">포트폴리오 탐색</h1>
          <p className="mt-2 text-sm text-slate-600">지역/예산/스타일 기준으로 조경 사례를 비교하고, 바로 견적 요청으로 연결하세요.</p>
          <div className="mt-4 grid gap-3 md:grid-cols-4">
            <input className="rounded-xl border px-3 py-2 text-sm" placeholder="지역 (예: 경기 용인)" />
            <input className="rounded-xl border px-3 py-2 text-sm" placeholder="공간 유형" />
            <input className="rounded-xl border px-3 py-2 text-sm" placeholder="예산 범위" />
            <button className="rounded-xl bg-[#1f4d2f] px-3 py-2 text-sm font-semibold text-white">조건 적용</button>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {sample.map((item) => (
            <article key={item.title} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="h-40 bg-gradient-to-br from-[#dceadf] to-[#c8dfcf]" />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="mt-1 text-sm text-slate-600">업체: {item.company}</p>
                <p className="text-sm text-slate-600">예산: {item.budget}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-700">#{tag}</span>
                  ))}
                </div>
                <a href="/request-quote" className="mt-4 inline-block rounded-lg bg-[#1f4d2f] px-3 py-2 text-sm font-semibold text-white">이 스타일로 견적 요청</a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
