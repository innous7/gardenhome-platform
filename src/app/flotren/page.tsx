export default function FlotrenPage() {
  return (
    <main className="min-h-screen bg-[#f4faf8]">
      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="rounded-3xl bg-gradient-to-br from-[#2ea99d] to-[#44c3b3] p-8 text-white">
          <p className="text-sm font-semibold">Flotren</p>
          <h1 className="mt-2 text-3xl font-bold">시공 이후, 정기 관리까지</h1>
          <p className="mt-2 text-sm text-emerald-50">월 구독형 조경 유지관리 서비스입니다.</p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            ['BASIC', '월 79,000원'],
            ['PRO', '월 149,000원'],
            ['VIP', '월 249,000원'],
          ].map(([name, price]) => (
            <article key={name} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-bold">{name}</h2>
              <p className="mt-2 text-2xl font-bold text-[#1f4d2f]">{price}</p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-600">
                <li>정기 방문 관리</li>
                <li>작업 리포트 제공</li>
                <li>긴급 이슈 우선 대응</li>
              </ul>
              <button className="mt-4 rounded-xl bg-[#1f4d2f] px-4 py-2 text-sm font-semibold text-white">신청하기</button>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
