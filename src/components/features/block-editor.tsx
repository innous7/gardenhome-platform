'use client'

import { useState } from 'react'

type Block = { type: 'paragraph' | 'heading' | 'image' | 'video'; value: string; bold?: boolean }

export default function BlockEditor({ name = 'blocks' }: { name?: string }) {
  const [blocks, setBlocks] = useState<Block[]>([{ type: 'paragraph', value: '' }])

  const update = (idx: number, patch: Partial<Block>) => {
    setBlocks((prev) => prev.map((b, i) => (i === idx ? { ...b, ...patch } : b)))
  }

  const add = (type: Block['type']) => setBlocks((prev) => [...prev, { type, value: '', bold: false }])

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={() => add('heading')} className="rounded-lg border px-3 py-1.5 text-sm">제목 블록</button>
        <button type="button" onClick={() => add('paragraph')} className="rounded-lg border px-3 py-1.5 text-sm">본문 블록</button>
        <button type="button" onClick={() => add('image')} className="rounded-lg border px-3 py-1.5 text-sm">이미지</button>
        <button type="button" onClick={() => add('video')} className="rounded-lg border px-3 py-1.5 text-sm">영상</button>
      </div>

      {blocks.map((b, i) => (
        <div key={`${b.type}-${i}`} className="rounded-xl border p-3">
          <div className="mb-2 flex items-center justify-between text-xs text-slate-500">
            <span>{b.type.toUpperCase()}</span>
            {(b.type === 'paragraph' || b.type === 'heading') && (
              <label className="flex items-center gap-1">
                <input type="checkbox" checked={!!b.bold} onChange={(e) => update(i, { bold: e.target.checked })} /> 굵게
              </label>
            )}
          </div>
          <textarea
            value={b.value}
            onChange={(e) => update(i, { value: e.target.value })}
            placeholder={b.type === 'image' || b.type === 'video' ? 'https://...' : '내용 입력'}
            className="min-h-20 w-full rounded-lg border px-3 py-2 text-sm"
          />
        </div>
      ))}

      <input
        type="hidden"
        name={name}
        value={JSON.stringify(
          blocks
            .filter((b) => b.value.trim())
            .map((b) => ({
              type: b.type,
              text: b.type === 'paragraph' || b.type === 'heading' ? b.value : undefined,
              url: b.type === 'image' || b.type === 'video' ? b.value : undefined,
              bold: !!b.bold,
            }))
        )}
      />
    </div>
  )
}
