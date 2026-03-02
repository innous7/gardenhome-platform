'use server'

import { createSupabaseServerClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

type Role = 'USER' | 'PARTNER' | 'ADMIN'
type PartnerStatus = 'PENDING' | 'APPROVED' | 'REJECTED'

export async function getAdminDashboardStats() {
  const supabase = await createSupabaseServerClient()

  const [{ count: requestsCount }, { count: pendingPartners }, { count: quoteCount }] = await Promise.all([
    supabase.from('QuoteRequests').select('*', { count: 'exact', head: true }),
    supabase.from('Users').select('*', { count: 'exact', head: true }).eq('role', 'PARTNER').eq('partnerStatus', 'PENDING'),
    supabase.from('Quotes').select('*', { count: 'exact', head: true }),
  ])

  const conversion = requestsCount && requestsCount > 0 ? Math.round(((quoteCount || 0) / requestsCount) * 100) : 0

  return {
    requestsCount: requestsCount || 0,
    pendingPartners: pendingPartners || 0,
    conversion,
  }
}

export async function createPartner(formData: FormData) {
  const supabase = await createSupabaseServerClient()
  const email = String(formData.get('email') || '').trim()
  const name = String(formData.get('name') || '').trim()
  if (!email) return

  const pseudoId = `partner:${email.toLowerCase()}`
  await supabase.from('Users').upsert({
    id: pseudoId,
    email,
    name: name || null,
    role: 'PARTNER' as Role,
    partnerStatus: 'PENDING' as PartnerStatus,
  })

  revalidatePath('/admin/dashboard')
}

export async function deletePartner(formData: FormData) {
  const supabase = await createSupabaseServerClient()
  const partnerId = String(formData.get('partnerId') || '')
  if (!partnerId) return

  await supabase.from('Users').delete().eq('id', partnerId).eq('role', 'PARTNER')
  revalidatePath('/admin/dashboard')
}
