export default function TurningLog({ entries, onDelete }) {
  if (entries.length === 0) {
    return (
      <p className="text-amber-500 text-sm italic">No turning events logged yet</p>
    )
  }

  const sorted = [...entries].reverse()

  return (
    <div className="space-y-2">
      {sorted.map((entry, i) => {
        const originalIndex = entries.length - 1 - i
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
                {onDelete && (
                  <button
                    onClick={() => onDelete(originalIndex)}
                    className="text-red-400 hover:text-red-600 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Delete
                  </button>
                )}
              </div>
              <p className="text-xs text-amber-500">
                {new Date(entry.timestamp).toLocaleString()}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
