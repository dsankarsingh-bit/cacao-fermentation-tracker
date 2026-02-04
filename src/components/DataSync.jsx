import { useRef } from 'react'
import { useBatchContext } from '../App'

export default function DataSync() {
  const { exportData, importBatches } = useBatchContext()
  const fileInputRef = useRef(null)

  const handleImport = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = async (ev) => {
      const result = await importBatches(ev.target.result)
      if (!result) alert('Invalid file — expected a JSON array of batches.')
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={exportData}
        className="bg-white border border-amber-300 hover:bg-amber-50 text-amber-800 text-sm font-medium px-3 py-1.5 rounded-lg transition-colors"
      >
        Export
      </button>
      <button
        onClick={() => fileInputRef.current.click()}
        className="bg-white border border-amber-300 hover:bg-amber-50 text-amber-800 text-sm font-medium px-3 py-1.5 rounded-lg transition-colors"
      >
        Import
      </button>
      <input ref={fileInputRef} type="file" accept=".json" onChange={handleImport} className="hidden" />
    </div>
  )
}
