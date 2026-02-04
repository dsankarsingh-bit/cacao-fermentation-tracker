import { useState } from 'react'

export default function TurningLog({ entries, onEdit, onDelete }) {
  const [editingIndex, setEditingIndex] = useState(null)
  const [editTimestamp, setEditTimestamp] = useState('')

  if (entries.length === 0) {
    return (
      <p className="text-amber-500 text-sm italic">No turning events logged yet</p>
    )
  }

  const sorted = [...entries].reverse()

  const handleSave = (originalIndex) => {
    if (!editTimestamp) return
    onEdit(originalIndex, new Date(editTimestamp).toISOString())
    setEditingIndex(null)
  }

  return (
    <div className="space-y-2">
      {sorted.map((entry, i) => {
        const originalIndex = entries.length - 1 - i
        const isEditing = editingIndex === originalIndex

        return (
          <div key={i} className="flex gap-3 items-start group">
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 rounded-full bg-amber-600 mt-1.5 shrink-0" />
              {i < sorted.length - 1 && <div className="w-0.5 h-full bg-amber-200 mt-1" />}
            </div>
            <div className="pb-4 flex-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-amber-900">
                  Turn #{entries.length - i} <span className="text-amber-500 font-normal">— Day {entry.day}</span>
                </p>
                {!isEditing && (onEdit || onDelete) && (
                  <div className="flex gap-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    {onEdit && (
                      <button
                        onClick={() => {
                          setEditingIndex(originalIndex)
                          setEditTimestamp(new Date(entry.timestamp).toISOString().slice(0, 16))
                        }}
                        className="text-amber-500 hover:text-amber-700 text-xs font-medium"
                      >
                        Edit
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => onDelete(originalIndex)}
                        className="text-red-400 hover:text-red-600 text-xs font-medium"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                )}
              </div>
              {isEditing ? (
                <div className="flex items-center gap-2 mt-1">
                  <input
                    type="datetime-local"
                    value={editTimestamp}
                    onChange={e => setEditTimestamp(e.target.value)}
                    autoFocus
                    className="border border-amber-300 rounded-lg px-2 py-0.5 text-xs focus:outline-none focus:ring-2 focus:ring-amber-400"
                    onKeyDown={e => {
                      if (e.key === 'Enter') handleSave(originalIndex)
                      if (e.key === 'Escape') setEditingIndex(null)
                    }}
                  />
                  <button
                    onClick={() => handleSave(originalIndex)}
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
              ) : (
                <p className="text-xs text-amber-500">
                  {new Date(entry.timestamp).toLocaleString()}
                </p>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
