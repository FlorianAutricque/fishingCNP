async function parseJson(res) {
  const text = await res.text()
  if (!text) return null
  try {
    return JSON.parse(text)
  } catch {
    return null
  }
}

export async function fetchDashboardSnapshot() {
  const res = await fetch('/api/dashboard/snapshot')
  const json = await parseJson(res)
  if (!res.ok || !json?.ok) {
    throw new Error(json?.error ?? 'load_failed')
  }
  return json.data
}

export async function resetDashboardData() {
  const res = await fetch('/api/dashboard/reset', { method: 'POST' })
  const json = await parseJson(res)
  if (!res.ok || !json?.ok) {
    throw new Error(json?.error ?? 'reset_failed')
  }
}
