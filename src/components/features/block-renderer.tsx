export type ContentBlock = { type: 'paragraph' | 'heading' | 'image' | 'video'; text?: string; url?: string; bold?: boolean }

export default function BlockRenderer({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="space-y-4">
      {blocks.map((b, i) => {
        if (b.type === 'heading') return <h3 key={i} className={`text-2xl ${b.bold ? 'font-bold' : 'font-semibold'}`}>{b.text}</h3>
        if (b.type === 'paragraph') return <p key={i} className={`${b.bold ? 'font-semibold' : 'font-normal'} leading-7 text-slate-700`}>{b.text}</p>
        // eslint-disable-next-line @next/next/no-img-element
        if (b.type === 'image') return <img key={i} src={b.url} alt="content" className="w-full rounded-xl border" />
        if (b.type === 'video') return <iframe key={i} src={b.url} className="aspect-video w-full rounded-xl border" allowFullScreen />
        return null
      })}
    </div>
  )
}
