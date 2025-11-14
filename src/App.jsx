import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-8">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white/80 backdrop-blur p-8 rounded-2xl shadow-xl max-w-xl w-full text-center"
      >
        <h1 className="text-3xl font-extrabold text-gray-900 mb-3">Property Demo</h1>
        <p className="text-gray-700 mb-6">Click below to open a fully animated property details page with gallery, reviews, video, and map.</p>
        <Link
          to="/property/skyline-vista"
          className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
        >
          Open Property Details
        </Link>
      </motion.div>
    </div>
  )
}

export default App
