'use server'

import { createSupabaseServerClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

type PartnerStatus = 'PENDING' | 'APPROVED' | 'REJECTED'

export async function getPartners() {
  const supabase = await createSupabaseServerClient()
  const { data } = await supabase
    .from('Users')
    .select('id,email,name,role,partnerStatus,createdAt')
    .eq('role', 'PARTNER')
    .order('createdAt', { ascending: false })

  return data || []
}

export async function updatePartnerStatus(formData: FormData) {
  const supabase = await createSupabaseServerClient()
  const partnerId = String(formData.get('partnerId') || '')
  const partnerStatus = String(formData.get('partnerStatus') || 'PENDING') as PartnerStatus

  if (!partnerId) return

  await supabase.from('Users').update({ partnerStatus }).eq('id', partnerId)
  revalidatePath('/admin/dashboard')
}
