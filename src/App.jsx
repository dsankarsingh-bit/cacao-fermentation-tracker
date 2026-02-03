import { createContext, useContext } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import useBatches from './hooks/useBatches'
import Nav from './components/Nav'
import Dashboard from './pages/Dashboard'
import NewBatch from './pages/NewBatch'
import BatchDetail from './pages/BatchDetail'

const BatchContext = createContext(null)

export function useBatchContext() {
  return useContext(BatchContext)
}

export default function App() {
  const batchStore = useBatches()

  return (
    <BatchContext.Provider value={batchStore}>
      <BrowserRouter>
        <div className="min-h-screen bg-amber-50">
          <Nav />
          <main className="max-w-3xl mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/batch/new" element={<NewBatch />} />
              <Route path="/batch/:id" element={<BatchDetail />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </BatchContext.Provider>
  )
}
