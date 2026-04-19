'use server'
import { z } from 'zod'
import { eq } from 'drizzle-orm'
import { randomUUID } from 'crypto'
import { getDb } from '@/db'
import { quotes } from '@/db/schema'
import { calculateQuote, OPTIONS, type OptionKey, type WindowRow } from '@/data/pricing'
import { sendQuoteNotification, sendQuoteConfirmation } from '@/lib/email'

const windowRowSchema = z.object({
  heightMm:     z.number().min(200).max(3500),
  widthMm:      z.number().min(200).max(3500),
  quantity:     z.number().min(1).max(50),
  secondStorey: z.boolean(),
})

const schema = z.object({
  name:        z.string().min(2).max(100),
  email:       z.string().email(),
  phone:       z.string().min(8).max(20),
  address:     z.string().max(200).optional(),
  option:      z.enum(['A', 'B', 'C', 'D']),
  windows:     z.string().transform(s => JSON.parse(s)).pipe(z.array(windowRowSchema)),
  total:       z.coerce.number().min(0),
  windowCount: z.coerce.number().min(1),
})

export type QuoteState =
  | { status: 'idle' }
  | { status: 'success' }
  | { status: 'error'; message: string }

export async function submitQuote(
  _prev: QuoteState,
  formData: FormData,
): Promise<QuoteState> {
  const raw = Object.fromEntries(formData)
  const parsed = schema.safeParse(raw)

  if (!parsed.success) {
    return { status: 'error', message: 'Please check your details and try again.' }
  }

  try {
    const { name, email, phone, address, option, windows, total, windowCount } = parsed.data
    const opt = OPTIONS[option as OptionKey]

    // Revalidate total server-side
    const serverTotal = Math.round(calculateQuote(option as OptionKey, windows as WindowRow[]) / 10) * 10
    if (Math.abs(serverTotal - total) > total * 0.05) {
      return { status: 'error', message: 'Quote total mismatch — please recalculate and try again.' }
    }

    const confirmToken = randomUUID()

    const db = getDb()
    const [quote] = await db.insert(quotes).values({
      name,
      email,
      phone,
      propertyType:   'residential',
      windowCount,
      glassType:      option,
      orientation:    address ?? 'not provided',
      storeys:        1,
      frameCondition: 'good',
      priority:       'both',
      estimateLow:    serverTotal,
      estimateHigh:   serverTotal,
      confirmToken,
      status: 'pending',
    }).returning()

    // Format window summary for email
    const windowSummary = (windows as WindowRow[])
      .map((r, i) => `Win ${i + 1}: ${r.heightMm}×${r.widthMm}mm qty ${r.quantity}${r.secondStorey ? ' (2nd floor)' : ''}`)
      .join(' | ')

    await sendQuoteNotification({
      name,
      email,
      phone,
      propertyType:   'residential',
      windowBand:     `${windowCount} windows — ${windowSummary}`,
      glassType:      `${opt.label} (${opt.spec})`,
      orientation:    address ?? 'not provided',
      storeys:        1,
      frameCondition: 'good',
      priority:       'both',
      low:            serverTotal,
      mid:            serverTotal,
      high:           serverTotal,
      quoteId:        quote.id,
      confirmToken,
    })

    return { status: 'success' }
  } catch (err) {
    console.error('Quote submit error:', err)
    return { status: 'error', message: 'Something went wrong. Please call us directly.' }
  }
}

export async function confirmQuote(token: string) {
  try {
    const db = getDb()
    const [quote] = await db
      .update(quotes)
      .set({ status: 'confirmed', confirmedAt: new Date() })
      .where(eq(quotes.confirmToken, token))
      .returning()

    if (!quote) return { error: 'Quote not found or already confirmed.' }

    await sendQuoteConfirmation(quote)
    return { success: true, name: quote.name, phone: quote.phone }
  } catch (err) {
    console.error('Confirm quote error:', err)
    return { error: 'Something went wrong.' }
  }
}
