const sample = [
  { title: '용인 30평 주택 정원', company: '그린아틀리에', budget: '1,200만원' },
  { title: '제주 펜션 조경 리뉴얼', company: '제주가든랩', budget: '2,500만원' },
]

export default function PortfolioPage() {
  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="text-2xl font-bold text-[#2E5C31]">포트폴리오</h1>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {sample.map((item) => (
          <article key={item.title} className="rounded-xl border bg-white p-4">
            <h2 className="font-semibold">{item.title}</h2>
            <p className="mt-1 text-sm text-gray-600">업체: {item.company}</p>
            <p className="text-sm text-gray-600">예산: {item.budget}</p>
          </article>
        ))}
      </div>
    </main>
  )
}
