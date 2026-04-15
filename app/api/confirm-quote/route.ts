import { NextRequest, NextResponse } from 'next/server'
import { confirmQuote } from '@/app/actions/quote'

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token')
  if (!token) return NextResponse.redirect(new URL('/confirm-error', req.url))

  const result = await confirmQuote(token)
  if ('error' in result) return NextResponse.redirect(new URL('/confirm-error', req.url))

  return NextResponse.redirect(new URL('/confirm-success', req.url))
}
