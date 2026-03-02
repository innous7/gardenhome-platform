import { createSupabaseServerClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function requireUser() {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/auth')
  return user
}

export async function requireRole(allowedRoles: string[]) {
  const user = await requireUser()
  const role = (user.user_metadata?.role as string | undefined)?.toUpperCase() || 'USER'

  if (!allowedRoles.includes(role)) redirect('/')
  return { user, role }
}
