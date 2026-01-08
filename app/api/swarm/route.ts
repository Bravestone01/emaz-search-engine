import { NextResponse } from 'next/server'

import { fetchFromAllAPIs } from '@/lib/swarm/swarmManager'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = (searchParams.get('q') ?? '').trim()

  if (!query) {
    return NextResponse.json({ query, results: [] })
  }

  const results = await fetchFromAllAPIs(query)

  return NextResponse.json({ query, results })
}
