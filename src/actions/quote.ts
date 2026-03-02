'use server'

import { createSupabaseServerClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createQuoteRequest(formData: FormData) {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return

  const propertyType = String(formData.get('propertyType') || '')
  const areaSize = Number(formData.get('areaSize') || 0)
  const budget = Number(formData.get('budget') || 0)

  if (!propertyType || !areaSize || !budget) return

  await supabase.from('Users').upsert({
    id: user.id,
    email: user.email,
    role: ((user.user_metadata?.role as string) || 'USER').toUpperCase(),
    name: user.user_metadata?.name || null,
  })

  await supabase.from('QuoteRequests').insert({
    userId: user.id,
    propertyType,
    areaSize,
    budget,
    status: 'PENDING',
  })

  revalidatePath('/request-quote')
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
