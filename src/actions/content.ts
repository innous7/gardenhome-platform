'use server'

import { createSupabaseServerClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

type Block = { type: 'paragraph' | 'heading' | 'image' | 'video'; text?: string; url?: string; bold?: boolean }

function normalizeVideoUrl(url?: string) {
  if (!url) return url
  if (url.includes('youtube.com/watch?v=')) {
    const id = url.split('v=')[1]?.split('&')[0]
    return id ? `https://www.youtube.com/embed/${id}` : url
  }
  if (url.includes('youtu.be/')) {
    const id = url.split('youtu.be/')[1]?.split('?')[0]
    return id ? `https://www.youtube.com/embed/${id}` : url
  }
  return url
}

function parseBlocks(raw: FormDataEntryValue | null): Block[] {
  if (!raw) return []
  try {
    const parsed = JSON.parse(String(raw))
    if (!Array.isArray(parsed)) return []
    return parsed.map((b) => ({
      ...b,
      url: b.type === 'video' ? normalizeVideoUrl(b.url) : b.url,
    }))
  } catch {
    return []
  }
}

export async function createBlogPost(formData: FormData) {
  const supabase = await createSupabaseServerClient()
  const { data: auth } = await supabase.auth.getUser()
  const title = String(formData.get('title') || '').trim()
  const summary = String(formData.get('summary') || '').trim()
  const status = String(formData.get('status') || 'PUBLISHED').toUpperCase()
  const blocks = parseBlocks(formData.get('blocks'))
  if (!title || blocks.length === 0) return

  await supabase.from('BlogPosts').insert({ authorId: auth.user?.id || null, title, summary: summary || null, content: blocks, status })
  revalidatePath('/blog')
  revalidatePath('/admin/blog')
}

export async function createPortfolioPost(formData: FormData) {
  const supabase = await createSupabaseServerClient()
  const { data: auth } = await supabase.auth.getUser()
  const title = String(formData.get('title') || '').trim()
  const company = String(formData.get('company') || '').trim()
  const budget = String(formData.get('budget') || '').trim()
  const status = String(formData.get('status') || 'PUBLISHED').toUpperCase()
  const blocks = parseBlocks(formData.get('blocks'))
  if (!title || blocks.length === 0) return

  await supabase.from('PortfolioPosts').insert({ authorId: auth.user?.id || null, title, company: company || null, budget: budget || null, content: blocks, status })
  revalidatePath('/portfolio')
  revalidatePath('/admin/blog')
}

export async function getBlogPosts() {
  const supabase = await createSupabaseServerClient()
  const { data } = await supabase.from('BlogPosts').select('*').eq('status', 'PUBLISHED').order('createdAt', { ascending: false })
  return data || []
}

export async function getBlogPostById(id: string) {
  const supabase = await createSupabaseServerClient()
  const { data } = await supabase.from('BlogPosts').select('*').eq('id', id).single()
  return data
}

export async function getPortfolioPosts() {
  const supabase = await createSupabaseServerClient()
  const { data } = await supabase.from('PortfolioPosts').select('*').eq('status', 'PUBLISHED').order('createdAt', { ascending: false })
  return data || []
}

export async function getAdminContentSummary() {
  const supabase = await createSupabaseServerClient()
  const [blog, portfolio] = await Promise.all([
    supabase.from('BlogPosts').select('id,title,status,createdAt').order('createdAt', { ascending: false }).limit(10),
    supabase.from('PortfolioPosts').select('id,title,status,createdAt').order('createdAt', { ascending: false }).limit(10),
  ])

  return {
    blog: blog.data || [],
    portfolio: portfolio.data || [],
  }
}
