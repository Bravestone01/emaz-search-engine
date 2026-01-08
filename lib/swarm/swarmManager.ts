import {
  duckDuckGoMockResults,
  githubMockResults,
  googleMockResults,
  newsApiMockResults,
  wikipediaMockResults,
  type SwarmResult,
} from './mockData'

const WIKIPEDIA_URL =
  'https://en.wikipedia.org/w/api.php?action=opensearch&search=%QUERY%&limit=9&namespace=0&format=json&origin=*'
const DUCKDUCKGO_URL = 'https://api.duckduckgo.com/?q=%QUERY%&format=json&no_redirect=1&no_html=1'
const TIMEOUT_MS = 5000

type DuckDuckGoTopic = {
  Text?: string
  FirstURL?: string
  Topics?: DuckDuckGoTopic[]
}

function withTimeout<T>(promise: Promise<T>, timeoutMs: number) {
  let timeoutId: NodeJS.Timeout
  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => reject(new Error('Request timed out')), timeoutMs)
  })

  return Promise.race([promise, timeoutPromise]).finally(() => clearTimeout(timeoutId))
}

async function fetchJsonWithTimeout(url: string) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS)

  try {
    return await withTimeout(
      fetch(url, {
        signal: controller.signal,
        cache: 'no-store',
      }),
      TIMEOUT_MS,
    )
  } finally {
    clearTimeout(timeoutId)
  }
}

async function fetchWikipedia(query: string): Promise<SwarmResult[]> {
  try {
    const url = WIKIPEDIA_URL.replace('%QUERY%', encodeURIComponent(query))
    const response = await fetchJsonWithTimeout(url)

    if (!response.ok) {
      return []
    }

    const data = (await response.json()) as [string, string[], string[], string[]]
    const titles = data[1] ?? []
    const descriptions = data[2] ?? []
    const urls = data[3] ?? []

    return titles.map((title, index) => ({
      title,
      description: descriptions[index] ?? '',
      url: urls[index] ?? '',
      source: 'Wikipedia',
    }))
  } catch (error) {
    console.warn('Wikipedia fetch failed:', error)
    return []
  }
}

function flattenDuckDuckGoTopics(topics: DuckDuckGoTopic[]): DuckDuckGoTopic[] {
  return topics.flatMap((topic) => {
    if (topic.Topics?.length) {
      return flattenDuckDuckGoTopics(topic.Topics)
    }

    return [topic]
  })
}

async function fetchDuckDuckGo(query: string): Promise<SwarmResult[]> {
  try {
    const url = DUCKDUCKGO_URL.replace('%QUERY%', encodeURIComponent(query))
    const response = await fetchJsonWithTimeout(url)

    if (!response.ok) {
      return []
    }

    const data = (await response.json()) as { RelatedTopics?: DuckDuckGoTopic[] }
    const topics = flattenDuckDuckGoTopics(data.RelatedTopics ?? [])

    return topics
      .map((topic) => ({
        title: topic.Text?.split(' - ')[0] ?? '',
        description: topic.Text ?? '',
        url: topic.FirstURL ?? '',
        source: 'DuckDuckGo',
      }))
      .filter((result) => result.title && result.url)
      .slice(0, 9)
  } catch (error) {
    console.warn('DuckDuckGo fetch failed:', error)
    return []
  }
}

async function fetchGoogleMock(query: string): Promise<SwarmResult[]> {
  return googleMockResults.map((result) => ({
    ...result,
    description: `${result.description} (Query: ${query})`,
  }))
}

async function fetchNewsMock(query: string): Promise<SwarmResult[]> {
  return newsApiMockResults.map((result) => ({
    ...result,
    description: `${result.description} (Query: ${query})`,
  }))
}

async function fetchGithubMock(query: string): Promise<SwarmResult[]> {
  return githubMockResults.map((result) => ({
    ...result,
    description: `${result.description} (Query: ${query})`,
  }))
}

export async function fetchFromAllAPIs(query: string): Promise<SwarmResult[]> {
  const responses = await Promise.all([
    fetchWikipedia(query),
    fetchGoogleMock(query),
    fetchDuckDuckGo(query),
    fetchNewsMock(query),
    fetchGithubMock(query),
  ])

  return responses.flat().slice(0, 45)
}

export { type SwarmResult }
