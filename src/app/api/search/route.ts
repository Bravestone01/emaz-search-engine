import { load } from 'cheerio'
import { NextResponse } from 'next/server'

const DUCKDUCKGO_URL = 'https://duckduckgo.com/html/'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = (searchParams.get('q') ?? '').trim()

  if (!query) {
    return NextResponse.json({ query, results: [] })
  }

  const response = await fetch(DUCKDUCKGO_URL, {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'user-agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36',
    },
    body: new URLSearchParams({ q: query }).toString(),
    cache: 'no-store',
  })

  if (!response.ok) {
    return NextResponse.json({ query, results: [] }, { status: 502 })
  }

  const html = await response.text()
  const $ = load(html)
  const results = $('.result')
    .map((_, element) => {
      const title = $(element).find('.result__a').text().trim()
      const link = $(element).find('.result__a').attr('href')?.trim() ?? ''
      const snippet = $(element).find('.result__snippet').text().trim()

      if (!title || !link) {
        return null
      }

      return { title, link, snippet }
    })
    .get()
    .slice(0, 9)

  return NextResponse.json({ query, results })
}
