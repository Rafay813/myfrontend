import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

const NotFound = () => {
  const navigate = useNavigate()
  const [countdown, setCountdown] = useState(10)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          navigate('/')
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [navigate])

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center space-y-8 max-w-lg mx-auto">

        {/* 404 Text */}
        <div className="relative">
          <p className="text-[160px] sm:text-[200px] font-black leading-none bg-gradient-to-br from-violet-600/20 to-cyan-600/20 bg-clip-text text-transparent select-none">
            404
          </p>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-2xl bg-gray-900 border border-white/10 flex items-center justify-center shadow-2xl">
              <svg className="w-10 h-10 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="space-y-3">
          <h1 className="text-3xl font-black text-white">Page Not Found</h1>
          <p className="text-gray-500 leading-relaxed">
            The page you are looking for doesn't exist or has been moved.
            You'll be redirected to the home page in{' '}
            <span className="text-violet-400 font-bold">{countdown}</span> seconds.
          </p>
        </div>

        {/* Countdown Bar */}
        <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-violet-600 to-cyan-600 rounded-full transition-all duration-1000"
            style={{ width: `${(countdown / 10) * 100}%` }}
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-bold hover:opacity-90 transition-opacity shadow-lg"
          >
            🏠 Go Home Now
          </Link>
          <button
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-gray-400 hover:text-white font-semibold transition-all hover:bg-white/10"
          >
            ← Go Back
          </button>
        </div>
      </div>
    </div>
  )
}

export default NotFound