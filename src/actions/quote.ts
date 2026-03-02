'use server'

import { createSupabaseServerClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

async function ensureCurrentUserRow() {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  await supabase.from('Users').upsert({
    id: user.id,
    email: user.email,
    role: ((user.user_metadata?.role as string) || 'USER').toUpperCase(),
    name: user.user_metadata?.name || null,
  })

  return user
}

export async function createQuoteRequest(formData: FormData) {
  const supabase = await createSupabaseServerClient()
  const user = await ensureCurrentUserRow()
  if (!user) return

  const propertyType = String(formData.get('propertyType') || '')
  const areaSize = Number(formData.get('areaSize') || 0)
  const budget = Number(formData.get('budget') || 0)
  if (!propertyType || !areaSize || !budget) return

  await supabase.from('QuoteRequests').insert({
    userId: user.id,
    propertyType,
    areaSize,
    budget,
    status: 'PENDING',
  })

  revalidatePath('/request-quote')
  revalidatePath('/partner/dashboard')
}

export async function createPartnerQuote(formData: FormData) {
  const supabase = await createSupabaseServerClient()
  const user = await ensureCurrentUserRow()
  if (!user) return

  const { data: me } = await supabase.from('Users').select('role,partnerStatus').eq('id', user.id).single()
  if (!me || me.role !== 'PARTNER' || me.partnerStatus !== 'APPROVED') return

  const requestId = String(formData.get('requestId') || '')
  const totalPrice = Number(formData.get('totalPrice') || 0)
  const note = String(formData.get('note') || '')

  if (!requestId || !totalPrice) return

  await supabase.from('Quotes').insert({
    requestId,
    companyId: user.id,
    totalPrice,
    details: { note },
    status: 'SENT',
  })

  await supabase.from('QuoteRequests').update({ status: 'QUOTED' }).eq('id', requestId)

  revalidatePath('/partner/dashboard')
  revalidatePath('/my-page')
}

export async function getMyQuoteRequests() {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return []

  const { data } = await supabase
    .from('QuoteRequests')
    .select('*')
    .eq('userId', user.id)
    .order('createdAt', { ascending: false })

  return data || []
}

export async function getPendingQuoteRequests() {
  const supabase = await createSupabaseServerClient()
  const { data } = await supabase
    .from('QuoteRequests')
    .select('*')
    .eq('status', 'PENDING')
    .order('createdAt', { ascending: false })
    .limit(20)

  return data || []
}

export async function getMyReceivedQuotes() {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return []

  const { data: requests } = await supabase.from('QuoteRequests').select('id').eq('userId', user.id)
  const requestIds = (requests || []).map((r: { id: string }) => r.id)
  if (requestIds.length === 0) return []

  const { data: quotes } = await supabase
    .from('Quotes')
    .select('id,requestId,totalPrice,status,createdAt,companyId,details')
    .in('requestId', requestIds)
    .order('createdAt', { ascending: false })

  const companyIds = Array.from(new Set((quotes || []).map((q: { companyId: string }) => q.companyId)))
  const { data: companies } = await supabase.from('Users').select('id,name,email').in('id', companyIds)
  const companyMap = new Map((companies || []).map((c: { id: string; name: string | null; email: string }) => [c.id, c]))

  return (quotes || []).map((q: { companyId: string } & Record<string, unknown>) => ({
    ...q,
    company: companyMap.get(q.companyId) || null,
  }))
}
