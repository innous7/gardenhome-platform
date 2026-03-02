const cards = [
  { title: "고객", path: "/portfolio", desc: "포트폴리오 탐색 / 견적 요청" },
  { title: "파트너", path: "/dashboard", desc: "견적 요청 확인 / 견적 작성" },
  { title: "관리자", path: "/dashboard", desc: "업체 승인 / 기본 운영" },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F9F9F7] p-8">
      <section className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold text-[#2E5C31]">조경홈(GardenHOME) MVP</h1>
        <p className="mt-2 text-gray-600">고객-파트너 매칭 중심 1차 개발 진행 중입니다.</p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {cards.map((card, idx) => (
            <a key={`${card.title}-${idx}`} href={card.path} className="rounded-xl border bg-white p-5 shadow-sm hover:shadow-md">
              <h2 className="text-xl font-semibold">{card.title}</h2>
              <p className="mt-2 text-sm text-gray-600">{card.desc}</p>
            </a>
          ))}
        </div>
      </section>
    </main>
  )
}
