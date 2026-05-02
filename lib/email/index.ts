import { Resend } from 'resend'
import { ContactNotificationEmail } from './templates/ContactNotification'
import { QuoteNotificationEmail } from './templates/QuoteNotification'
import { QuoteConfirmationEmail } from './templates/QuoteConfirmation'

function getResend() {
  return new Resend(process.env.RESEND_API_KEY)
}

import { siteConfig } from '@/data/site'
const TAS_EMAIL = siteConfig.notificationEmail
const FROM_EMAIL = 'King Double Glazing <noreply@kingdoubleglazing.com.au>'

export async function sendContactNotification(data: {
  name: string
  email: string
  phone: string
  suburb?: string
  message?: string
  preferredTime?: string
}) {
  await getResend().emails.send({
    from:    FROM_EMAIL,
    to:      TAS_EMAIL,
    replyTo: data.email,
    subject: `New enquiry — ${data.name}${data.suburb ? ` · ${data.suburb}` : ''}`,
    react:   ContactNotificationEmail(data),
  })
}

export async function sendQuoteNotification(data: {
  name: string
  email: string
  phone: string
  suburb?: string
  glassOption: string
  glassLabel: string
  glassSubLabel: string
  glassSpec: string
  noisePct: number
  heatPct: number
  windows: { heightMm: number; widthMm: number; quantity: number; secondStorey: boolean }[]
  windowCount: number
  total: number
  quoteId: number
  confirmToken: string
}) {
  const confirmUrl = `${process.env.NEXT_PUBLIC_URL}/api/confirm-quote?token=${data.confirmToken}`
  await getResend().emails.send({
    from:    FROM_EMAIL,
    to:      TAS_EMAIL,
    replyTo: data.email,
    subject: `New quote — ${data.name} · $${data.total.toLocaleString()} · Option ${data.glassOption}`,
    react:   QuoteNotificationEmail({ ...data, confirmUrl }),
  })
}

export async function sendQuoteConfirmation(quote: {
  name: string
  email: string
  estimateLow: number | null
  estimateHigh: number | null
  windowCount: number | null
  glassType: string | null
}) {
  await getResend().emails.send({
    from:    FROM_EMAIL,
    to:      quote.email,
    subject: siteConfig.emailCopy?.quoteConfirmSubject ?? 'Your King Double Glazing quote is confirmed',
    react:   QuoteConfirmationEmail({ ...quote, windowBand: null }),
  })
}
