export interface Filters {
  yearStart?: number
  yearEnd?: number
  articleType?: string
}

export async function search(query: string, filters: Filters) {
  const res = await fetch('/search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, filters })
  })
  return res.json()
}
