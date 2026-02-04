import { useState } from 'react'

export default function ReadingsList({ readings, onEdit, onDelete }) {
  const [editingIndex, setEditingIndex] = useState(null)
  const [editTemp, setEditTemp] = useState('')

  if (readings.length === 0) return null

  const sorted = [...readings]
    .map((r, i) => ({ ...r, originalIndex: i }))
    .sort((a, b) => a.day - b.day || new Date(a.timestamp) - new Date(b.timestamp))

  const handleSave = (originalIndex, currentTemp) => {
    const val = parseFloat(editTemp)
    if (isNaN(val) || val < 0 || val > 60) return
    if (val !== currentTemp) onEdit(originalIndex, val)
    setEditingIndex(null)
  }

  return (
    <div className="flex flex-col gap-0.5">
      {sorted.map((r) => (
        <div
          key={r.originalIndex}
          className="flex items-center justify-between text-sm py-1.5 px-2.5 rounded-lg hover:bg-amber-50 group"
        >
          {editingIndex === r.originalIndex ? (
            <>
              <span className="text-amber-700">Day {r.day} —</span>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={editTemp}
                  onChange={e => setEditTemp(e.target.value)}
                  step="0.1"
                  min="0"
                  max="60"
                  autoFocus
                  className="w-20 border border-amber-300 rounded-lg px-2 py-0.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                  onKeyDown={e => {
                    if (e.key === 'Enter') handleSave(r.originalIndex, r.temp)
                    if (e.key === 'Escape') setEditingIndex(null)
                  }}
                />
                <span className="text-amber-500">°C</span>
                <button
                  onClick={() => handleSave(r.originalIndex, r.temp)}
                  className="text-green-700 hover:text-green-600 text-xs font-medium"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingIndex(null)}
                  className="text-amber-500 hover:text-amber-700 text-xs"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <span className="text-amber-800">
                Day {r.day} — <span className="font-semibold">{r.temp} °C</span>
                <span className="text-amber-400 font-normal ml-2 text-xs">
                  {new Date(r.timestamp).toLocaleString()}
                </span>
              </span>
              {(onEdit || onDelete) && (
                <div className="flex gap-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  {onEdit && (
                    <button
                      onClick={() => { setEditingIndex(r.originalIndex); setEditTemp(String(r.temp)) }}
                      className="text-amber-500 hover:text-amber-700 text-xs font-medium"
                    >
                      Edit
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => onDelete(r.originalIndex)}
                      className="text-red-400 hover:text-red-600 text-xs font-medium"
                    >
                      Delete
                    </button>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  )
}
