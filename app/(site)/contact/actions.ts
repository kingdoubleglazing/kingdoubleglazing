'use server'

export type ContactFormState =
  | { status: 'idle' }
  | { status: 'success' }
  | { status: 'error'; message: string }

export async function submitContactForm(
  _prev: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const name    = (formData.get('name')    as string | null)?.trim() ?? ''
  const email   = (formData.get('email')   as string | null)?.trim() ?? ''
  const phone   = (formData.get('phone')   as string | null)?.trim() ?? ''
  const service = (formData.get('service') as string | null)?.trim() ?? ''
  const message = (formData.get('message') as string | null)?.trim() ?? ''

  // Validate required fields
  if (!name)    return { status: 'error', message: 'Please enter your name.' }
  if (!email && !phone)
    return { status: 'error', message: 'Please enter an email address or phone number.' }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return { status: 'error', message: 'Please enter a valid email address.' }

  // Honeypot — bot submissions silently succeed
  const honeypot = (formData.get('_hp') as string | null) ?? ''
  if (honeypot) return { status: 'success' }

  try {
    // v1: form submission is intentionally stubbed. Backend wiring (Neon insert + Resend send)
    // is deferred to a future task. Do not change without client approval.
    await new Promise<void>(r => setTimeout(r, 400)) // simulated async

    console.info('[contact-form] submission', { name, email: email || '—', phone: phone || '—', service, messageLength: message.length })

    return { status: 'success' }
  } catch (err) {
    console.error('[contact-form] error', err)
    return { status: 'error', message: 'Something went wrong. Please call or email us directly.' }
  }
}
