import { useState, useEffect, useCallback } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'
import {
  addBatch as storageAddBatch,
  deleteBatch as storageDeleteBatch,
  updateBatch as storageUpdateBatch,
  addTemperatureReading,
  addTurningLog,
  updateTemperatureReadings,
  updateTurningLog,
  completeBatch as storageCompleteBatch,
  exportData,
  importData as storageImportData,
} from '../utils/storage'

export default function useBatches() {
  const [batches, setBatches] = useState([])
  const [loading, setLoading] = useState(true)

  // Real-time listener — updates automatically when any device writes.
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'batches'), (snapshot) => {
      setBatches(snapshot.docs.map(d => ({ id: d.id, ...d.data() })))
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  const addBatch = useCallback((batchData) => storageAddBatch(batchData), [])

  const removeBatch = useCallback((id) => storageDeleteBatch(id), [])

  const editBatch = useCallback((id, updates) => storageUpdateBatch(id, updates), [])

  const getBatchById = useCallback((id) => {
    return batches.find(b => b.id === id) || null
  }, [batches])

  const addReading = useCallback((batchId, day, temp) => {
    addTemperatureReading(batchId, day, temp)
  }, [])

  const addTurning = useCallback((batchId, day) => {
    addTurningLog(batchId, day)
  }, [])

  const setReadings = useCallback((batchId, readings) => updateTemperatureReadings(batchId, readings), [])

  const setTurningLog = useCallback((batchId, entries) => updateTurningLog(batchId, entries), [])

  const markComplete = useCallback((id) => storageCompleteBatch(id), [])

  const handleExport = useCallback(() => exportData(batches), [batches])

  const importBatches = useCallback((jsonString) => storageImportData(jsonString), [])

  return {
    batches,
    loading,
    addBatch,
    removeBatch,
    editBatch,
    getBatchById,
    addReading,
    addTurning,
    setReadings,
    setTurningLog,
    markComplete,
    exportData: handleExport,
    importBatches,
  }
}
