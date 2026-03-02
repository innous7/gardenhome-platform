export default async function PortfolioDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <main className="mx-auto max-w-4xl px-6 py-12"><h1 className="text-3xl font-bold text-slate-900">포트폴리오 상세</h1><p className="mt-2 text-slate-600">포트폴리오 ID: {id}</p></main>
}
