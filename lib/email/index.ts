import { Resend } from 'resend'
import { ContactNotificationEmail } from './templates/ContactNotification'
import { QuoteNotificationEmail } from './templates/QuoteNotification'
import { QuoteConfirmationEmail } from './templates/QuoteConfirmation'

function getResend() {
  return new Resend(process.env.RESEND_API_KEY)
}

// const TAS_EMAIL  = 'tasmarkou1969@gmail.com'
const TAS_EMAIL  = 'clupaio4@gmail.com' // TEMP — revert to Tas before launch
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
  windowCount: number
  glassType: string
  orientation: string
  propertyType: string
  storeys: number
  frameCondition: string
  priority: string
  low: number
  high: number
  mid: number
  quoteId: number
  confirmToken: string
}) {
  const confirmUrl = `${process.env.NEXT_PUBLIC_URL}/api/confirm-quote?token=${data.confirmToken}`
  await getResend().emails.send({
    from:    FROM_EMAIL,
    to:      TAS_EMAIL,
    replyTo: data.email,
    subject: `New quote — ${data.name} · Est. $${data.low.toLocaleString()}–$${data.high.toLocaleString()}`,
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
    subject: 'Your King Double Glazing quote is confirmed',
    react:   QuoteConfirmationEmail(quote),
  })
}
