'use server'
import { z } from 'zod'
import { getDb } from '@/db'
import { leads } from '@/db/schema'
import { sendContactNotification } from '@/lib/email'

const schema = z.object({
  name:          z.string().min(2, 'Name is required').max(100),
  email:         z.string().email('Enter a valid email'),
  phone:         z.string().min(8, 'Enter a valid phone number').max(20),
  suburb:        z.string().max(100).optional(),
  message:       z.string().max(1000).optional(),
  preferredTime: z.enum(['morning', 'afternoon', 'evening']).optional(),
})

export type ContactState =
  | { status: 'idle' }
  | { status: 'success'; name: string }
  | { status: 'error'; message: string }

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const raw = Object.fromEntries(formData)
  const parsed = schema.safeParse(raw)

  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? 'Please check your details and try again.'
    return { status: 'error', message: firstError }
  }

  try {
    const db = getDb()
    await db.insert(leads).values({ ...parsed.data, source: 'contact_form' })
    await sendContactNotification(parsed.data)
    return { status: 'success', name: parsed.data.name }
  } catch (err) {
    console.error('Contact submit error:', err)
    return { status: 'error', message: 'Something went wrong. Please call us directly.' }
  }
}
