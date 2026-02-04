import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBatchContext } from '../App'

export default function NewBatch() {
  const { addBatch } = useBatchContext()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    origin: '',
    quantity: '',
    startDate: new Date().toISOString().slice(0, 16),
    targetDays: 6,
  })

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name.trim()) return

    const batch = await addBatch({
      name: form.name.trim(),
      origin: form.origin.trim(),
      startDate: new Date(form.startDate).toISOString(),
      quantity: form.quantity ? `${form.quantity} kg` : '',
      targetDays: parseInt(form.targetDays, 10) || 6,
    })

    navigate(`/batch/${batch.id}`)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-amber-900 mb-6">New Fermentation Batch</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow border border-amber-200 p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-amber-800 mb-1">Batch Name *</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. Ghana Single Origin"
            className="w-full border border-amber-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-amber-800 mb-1">Origin</label>
          <input
            type="text"
            name="origin"
            value={form.origin}
            onChange={handleChange}
            placeholder="e.g. Ashanti Region, Ghana"
            className="w-full border border-amber-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-amber-800 mb-1">Quantity (kg)</label>
            <input
              type="number"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              min="0"
              step="0.1"
              placeholder="2.5"
              className="w-full border border-amber-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-amber-800 mb-1">Target Days</label>
            <input
              type="number"
              name="targetDays"
              value={form.targetDays}
              onChange={handleChange}
              min="3"
              max="10"
              className="w-full border border-amber-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-amber-800 mb-1">Start Date &amp; Time</label>
          <input
            type="datetime-local"
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
            className="w-full border border-amber-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-amber-700 hover:bg-amber-600 text-white font-medium py-2.5 rounded-lg transition-colors"
        >
          Start Fermentation
        </button>
      </form>
    </div>
  )
}
