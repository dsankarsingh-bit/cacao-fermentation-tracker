export default function TurningLog({ events }) {
  if (events.length === 0) {
    return (
      <p className="text-amber-500 text-sm italic">No turning events logged yet</p>
    )
  }

  const sorted = [...events].reverse()

  return (
    <div className="space-y-2">
      {sorted.map((event, i) => (
        <div key={i} className="flex gap-3 items-start">
          <div className="flex flex-col items-center">
            <div className="w-3 h-3 rounded-full bg-amber-600 mt-1.5 shrink-0" />
            {i < sorted.length - 1 && <div className="w-0.5 h-full bg-amber-200 mt-1" />}
          </div>
          <div className="pb-4">
            <p className="text-sm font-medium text-amber-900">
              Turn #{events.length - i}
            </p>
            <p className="text-xs text-amber-500">
              {new Date(event.timestamp).toLocaleString()}
            </p>
            {event.notes && (
              <p className="text-sm text-amber-700 mt-1">{event.notes}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
