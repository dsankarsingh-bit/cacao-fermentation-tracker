import { useState, useEffect, useCallback } from 'react'
import { loadBatches, saveBatches } from '../utils/storage'

export default function useBatches() {
  const [batches, setBatches] = useState(() => loadBatches())

  useEffect(() => {
    saveBatches(batches)
  }, [batches])

  const addBatch = useCallback((batch) => {
    setBatches(prev => [...prev, batch])
    return batch
  }, [])

  const updateBatch = useCallback((id, updater) => {
    setBatches(prev =>
      prev.map(b => (b.id === id ? (typeof updater === 'function' ? updater(b) : { ...b, ...updater }) : b))
    )
  }, [])

  const removeBatch = useCallback((id) => {
    setBatches(prev => prev.filter(b => b.id !== id))
  }, [])

  const getBatchById = useCallback((id) => {
    return batches.find(b => b.id === id) || null
  }, [batches])

  return { batches, addBatch, updateBatch, removeBatch, getBatchById }
}
