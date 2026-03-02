'use server'

import { createSupabaseServerClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

type Block = { type: 'paragraph' | 'heading' | 'image' | 'video'; text?: string; url?: string; bold?: boolean }

function parseBlocks(raw: FormDataEntryValue | null): Block[] {
  if (!raw) return []
  try {
    const parsed = JSON.parse(String(raw))
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export async function createBlogPost(formData: FormData) {
  const supabase = await createSupabaseServerClient()
  const { data: auth } = await supabase.auth.getUser()
  const title = String(formData.get('title') || '').trim()
  const summary = String(formData.get('summary') || '').trim()
  const blocks = parseBlocks(formData.get('blocks'))
  if (!title || blocks.length === 0) return

  await supabase.from('BlogPosts').insert({
    authorId: auth.user?.id || null,
    title,
    summary: summary || null,
    content: blocks,
    status: 'PUBLISHED',
  })

  revalidatePath('/blog')
  revalidatePath('/admin/blog')
}

export async function createPortfolioPost(formData: FormData) {
  const supabase = await createSupabaseServerClient()
  const { data: auth } = await supabase.auth.getUser()
  const title = String(formData.get('title') || '').trim()
  const company = String(formData.get('company') || '').trim()
  const budget = String(formData.get('budget') || '').trim()
  const blocks = parseBlocks(formData.get('blocks'))
  if (!title || blocks.length === 0) return

  await supabase.from('PortfolioPosts').insert({
    authorId: auth.user?.id || null,
    title,
    company: company || null,
    budget: budget || null,
    content: blocks,
    status: 'PUBLISHED',
  })

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
