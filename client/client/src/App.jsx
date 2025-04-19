import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-blue-600 text-white p-6">
      <div className="flex justify-center items-center space-x-4 mb-8">
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo w-16 h-16 hover:scale-110 transition-transform" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react w-16 h-16 hover:scale-110 transition-transform" alt="React logo" />
        </a>
      </div>
      <h1 className="text-4xl font-bold text-center text-yellow-300 hover:text-yellow-400 transition-colors">
        Vite + React
      </h1>
      <div className="card p-4 bg-white text-black shadow-md rounded-lg text-center mt-6">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 active:scale-95 transition-transform"
          onClick={() => setCount((count) => count + 1)}
        >
          cunt is {count}
        </button>
        <p className="mt-4 text-gray-700">
          Edit <code className="bg-gray-200 px-1 py-0.5 rounded">src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs text-center mt-6 text-blue-100">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
