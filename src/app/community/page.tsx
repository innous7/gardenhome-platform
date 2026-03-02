export default function CommunityPage() {
  return (
    <main className="min-h-screen bg-[#f6f7f5]">
      <section className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="text-3xl font-bold text-[#1f4d2f]">조경 커뮤니티</h1>
        <p className="mt-2 text-sm text-slate-600">식물 관리 팁, 시공 후기, 계절별 조경 트렌드를 공유합니다.</p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            '초보자를 위한 잔디 관리 7가지',
            '봄철 수목 전정 체크리스트',
            '옥상정원 유지비 현실 가이드',
          ].map((title) => (
            <article key={title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="font-semibold">{title}</h2>
              <p className="mt-2 text-sm text-slate-600">운영팀 아티클 · 읽기 5분</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
