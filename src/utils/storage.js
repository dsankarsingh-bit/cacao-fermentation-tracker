import { collection, addDoc, doc, updateDoc, deleteDoc, getDocs, arrayUnion } from 'firebase/firestore'
import { db } from '../firebase'

const BATCHES = 'batches'

export async function addBatch(batchData) {
  const newBatch = {
    ...batchData,
    temperatureReadings: [],
    turningLog: [],
    status: 'active',
  }
  const ref = await addDoc(collection(db, BATCHES), newBatch)
  return { id: ref.id, ...newBatch }
}

export async function updateBatch(id, updates) {
  await updateDoc(doc(db, BATCHES, id), updates)
}

export async function deleteBatch(id) {
  await deleteDoc(doc(db, BATCHES, id))
}

export async function addTemperatureReading(batchId, day, temp) {
  await updateDoc(doc(db, BATCHES, batchId), {
    temperatureReadings: arrayUnion({ day, temp, timestamp: new Date().toISOString() }),
  })
}

export async function addTurningLog(batchId, day) {
  await updateDoc(doc(db, BATCHES, batchId), {
    turningLog: arrayUnion({ day, turned: true, timestamp: new Date().toISOString() }),
  })
}

export async function updateTemperatureReadings(batchId, readings) {
  await updateDoc(doc(db, BATCHES, batchId), { temperatureReadings: readings })
}

export async function updateTurningLog(batchId, entries) {
  await updateDoc(doc(db, BATCHES, batchId), { turningLog: entries })
}

export async function completeBatch(id) {
  await updateBatch(id, { status: 'completed' })
}

// Downloads the current batches (passed in from React state) as a JSON file.
export function exportData(batches) {
  const blob = new Blob([JSON.stringify(batches, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `fermentation-data-${new Date().toISOString().split('T')[0]}.json`
  link.click()
  URL.revokeObjectURL(url)
}

// Replaces all Firestore batches with the ones in the JSON string.
export async function importData(jsonString) {
  try {
    const batches = JSON.parse(jsonString)
    if (!Array.isArray(batches)) return null

    // Delete existing
    const snapshot = await getDocs(collection(db, BATCHES))
    await Promise.all(snapshot.docs.map(d => deleteDoc(d.ref)))

    // Write imported (strip any old id field so Firestore generates new ones)
    await Promise.all(
      batches.map(({ id, ...data }) => addDoc(collection(db, BATCHES), data))
    )

    return batches
  } catch (error) {
    console.error('Invalid JSON:', error)
    return null
  }
}
