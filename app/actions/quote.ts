'use server'
import { z } from 'zod'
import { eq } from 'drizzle-orm'
import { randomUUID } from 'crypto'
import { getDb } from '@/db'
import { quotes } from '@/db/schema'
import { calculateEstimate, WINDOW_BAND_MIDPOINT } from '@/data/pricing'
import { sendQuoteNotification, sendQuoteConfirmation } from '@/lib/email'

const schema = z.object({
  name:           z.string().min(2).max(100),
  email:          z.string().email(),
  phone:          z.string().min(8).max(20),
  propertyType:   z.enum(['house', 'apartment', 'townhouse']),
  windowBand:     z.enum(['1-3', '4-7', '8-12', '12+']),
  glassType:      z.enum(['standard', 'lowe', 'acoustic']),
  orientation:    z.enum(['north', 'east', 'west', 'south', 'mixed']),
  storeys:        z.coerce.number().min(1).max(3),
  frameCondition: z.enum(['good', 'needs-work']),
  priority:       z.enum(['noise', 'warmth', 'both']),
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
    const data = parsed.data
    const estimate = calculateEstimate({
      propertyType:   data.propertyType,
      windowBand:     data.windowBand,
      glassType:      data.glassType,
      storeys:        data.storeys as 1 | 2 | 3,
      frameCondition: data.frameCondition,
    })
    const confirmToken = randomUUID()
    const windowCount  = WINDOW_BAND_MIDPOINT[data.windowBand]

    const db = getDb()
    const [quote] = await db.insert(quotes).values({
      name:           data.name,
      email:          data.email,
      phone:          data.phone,
      propertyType:   data.propertyType,
      windowCount,
      glassType:      data.glassType,
      orientation:    data.orientation,
      storeys:        data.storeys,
      frameCondition: data.frameCondition,
      priority:       data.priority,
      estimateLow:    estimate.low,
      estimateHigh:   estimate.high,
      confirmToken,
      status: 'pending',
    }).returning()

    await sendQuoteNotification({
      name:           data.name,
      email:          data.email,
      phone:          data.phone,
      propertyType:   data.propertyType,
      windowBand:     data.windowBand,
      glassType:      data.glassType,
      orientation:    data.orientation,
      storeys:        data.storeys,
      frameCondition: data.frameCondition,
      priority:       data.priority,
      low:            estimate.low,
      mid:            estimate.mid,
      high:           estimate.high,
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
