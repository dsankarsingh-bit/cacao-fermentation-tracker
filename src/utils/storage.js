const STORAGE_KEY = 'fermentation_batches'

export function loadBatches() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveBatches(batches) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(batches))
  } catch {
    console.error('localStorage write failed')
  }
}

export function deleteBatch(id) {
  saveBatches(loadBatches().filter(b => b.id !== id))
}
