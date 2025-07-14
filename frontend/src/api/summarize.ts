export async function summarize(pmids: string[], fields: string[]) {
  const res = await fetch('/summarize', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pmids, fields })
  })
  return res.json()
}
