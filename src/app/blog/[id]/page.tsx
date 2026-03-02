export default async function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <main className="mx-auto max-w-4xl px-6 py-12"><h1 className="text-3xl font-bold">커뮤니티 글 상세</h1><p className="mt-3 text-slate-600">글 ID: {id}</p></main>
}
