const { fetchFromAllAPIs } = require('../lib/swarm/swarmManager')

const createResponse = (data, ok = true, status = 200) => ({
  ok,
  status,
  json: jest.fn().mockResolvedValue(data),
})

describe('fetchFromAllAPIs', () => {
  beforeEach(() => {
    process.env.GOOGLE_API_KEY = 'test-key'
    process.env.GOOGLE_CSE_ID = 'test-cse'
    process.env.NEWSAPI_KEY = 'test-news-key'
    process.env.GITHUB_TOKEN = 'test-token'
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('returns combined results from all sources', async () => {
    jest
      .spyOn(global, 'fetch')
      .mockResolvedValueOnce(
        createResponse(['query', ['Wiki Title'], ['Wiki Desc'], ['https://wiki.example']]),
      )
      .mockResolvedValueOnce(
        createResponse({
          items: [{ title: 'Google Title', snippet: 'Google Desc', link: 'https://google.example' }],
        }),
      )
      .mockResolvedValueOnce(
        createResponse({
          RelatedTopics: [{ Text: 'Duck Title - Duck Desc', FirstURL: 'https://duck.example' }],
        }),
      )
      .mockResolvedValueOnce(
        createResponse({
          articles: [{ title: 'News Title', description: 'News Desc', url: 'https://news.example' }],
        }),
      )
      .mockResolvedValueOnce(
        createResponse({
          items: [
            {
              full_name: 'octo/repo',
              description: 'Repo Desc',
              html_url: 'https://github.example',
              stargazers_count: 101,
            },
          ],
        }),
      )

    const results = await fetchFromAllAPIs('query')

    expect(results).toHaveLength(5)
    expect(results).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ source: 'Wikipedia', title: 'Wiki Title' }),
        expect.objectContaining({ source: 'Google', title: 'Google Title' }),
        expect.objectContaining({ source: 'DuckDuckGo', title: 'Duck Title' }),
        expect.objectContaining({ source: 'NewsAPI', title: 'News Title' }),
        expect.objectContaining({ source: 'GitHub', title: 'octo/repo' }),
      ]),
    )
  })
})
