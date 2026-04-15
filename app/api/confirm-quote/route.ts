import { NextRequest, NextResponse } from 'next/server'
import { confirmQuote } from '@/app/actions/quote'

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token')
  if (!token) return NextResponse.redirect(new URL('/confirm-error', req.url))

  const result = await confirmQuote(token)
  if ('error' in result) return NextResponse.redirect(new URL('/confirm-error', req.url))

  const dest = new URL('/confirm-success', req.url)
  dest.searchParams.set('name', result.name)
  dest.searchParams.set('phone', result.phone)
  return NextResponse.redirect(dest)
}
