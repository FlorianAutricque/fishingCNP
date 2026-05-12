const STORAGE_KEY = 'phish_sim_visitor_id'

export function getVisitorId() {
  try {
    let id = localStorage.getItem(STORAGE_KEY)
    if (!id) {
      id = crypto.randomUUID()
      localStorage.setItem(STORAGE_KEY, id)
    }
    return id
  } catch {
    return `anon_${Math.random().toString(36).slice(2)}`
  }
}
