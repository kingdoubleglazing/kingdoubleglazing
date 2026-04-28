'use server'
import { z } from 'zod'
import { eq } from 'drizzle-orm'
import { randomUUID } from 'crypto'
import { getDb } from '@/db'
import { quotes } from '@/db/schema'
import { calculateQuote, type OptionKey, type WindowRow } from '@/data/pricing'
import { sendQuoteNotification, sendQuoteConfirmation } from '@/lib/email'
import { client as sanityClient } from '@/sanity/lib/client'
import type { PricingOption } from '@/sanity/types'

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
  suburb:      z.string().max(100).optional(),
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
    const { name, email, phone, suburb, option, windows, total, windowCount } = parsed.data

    // Fetch pricing option from Sanity to validate and get display data
    const opt = await sanityClient.fetch<PricingOption>(
      `*[_type == "pricingOption" && optionKey == $key][0]`,
      { key: option },
    )
    if (!opt) return { status: 'error', message: 'Invalid option selected.' }

    // Revalidate total server-side using Sanity pricePerSqm
    const serverTotal = Math.round(calculateQuote(opt.pricePerSqm, windows as WindowRow[]) / 10) * 10
    if (Math.abs(serverTotal - total) > total * 0.05) {
      return { status: 'error', message: 'Quote total mismatch — please recalculate and try again.' }
    }

    const confirmToken = randomUUID()

    const db = getDb()
    const [quote] = await db.insert(quotes).values({
      name,
      email,
      phone,
      windowCount,
      glassType:   option,
      estimateLow: serverTotal,
      estimateHigh: serverTotal,
      confirmToken,
      status: 'pending',
    }).returning()

    await sendQuoteNotification({
      name,
      email,
      phone,
      suburb,
      glassOption:    option,
      glassLabel:     opt.label,
      glassSubLabel:  opt.sublabel,
      glassSpec:      opt.spec,
      noisePct:       opt.noisePct,
      heatPct:        opt.heatPct,
      windows:        windows as WindowRow[],
      windowCount,
      total:          serverTotal,
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
