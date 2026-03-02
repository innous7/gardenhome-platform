export default async function CompanyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <main className="mx-auto max-w-4xl px-6 py-12"><h1 className="text-3xl font-bold">조경회사 상세</h1><p className="mt-2 text-slate-600">회사 ID: {id}</p></main>
}
