import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useUpload } from '../hooks/useUpload'
import UploadForm from '../components/upload/UploadForm'
import StatusIndicator from '../components/upload/StatusIndicator'
import DownloadLinks from '../components/upload/DownloadLinks'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'

const stats = [
  { label: 'Files Transferred', value: '10K+' },
  { label: 'Hosting Services', value: '2' },
  { label: 'Max File Size', value: 'Any Size' },
  { label: 'Uptime', value: '99.9%' },
]

const features = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Lightning Fast',
    description: 'Stream files directly without downloading to server memory',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
    title: 'Dual Upload',
    description: 'Simultaneously uploads to Gofile and PixelDrain',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: 'Secure',
    description: 'Rate limited, validated and sanitized for your protection',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
      </svg>
    ),
    title: 'No Signup',
    description: 'Completely free — no account or registration needed',
  },
]

const Home = () => {
  const { status, result, error, progress, upload, reset } = useUpload()
  const uploadRef = useRef(null)

  const scrollToUpload = () => {
    uploadRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen">

      {/* ── Hero Section ── */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">

        {/* Background Blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl" />
          <div className="absolute -top-20 -right-40 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-900/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center space-y-8">

          {/* Badge */}
          <div className="flex justify-center">
            <Badge variant="violet" className="px-4 py-1.5 text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
              Free File Transfer Tool
            </Badge>
          </div>

          {/* Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight">
            <span className="text-white">Transfer Files from</span>
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Google Drive
            </span>
            <br />
            <span className="text-white">Instantly</span>
          </h1>

          {/* Subtitle */}
          <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Paste a Google Drive link and get direct download links from
            <span className="text-violet-400 font-medium"> Gofile </span>
            and
            <span className="text-cyan-400 font-medium"> PixelDrain </span>
            in seconds.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={scrollToUpload}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-bold text-lg hover:opacity-90 transition-all shadow-lg hover:shadow-violet-500/25 hover:-translate-y-0.5"
            >
              🚀 Start Transferring
            </button>
            <Link
              to="/how-it-works"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl glass text-gray-300 font-semibold text-lg hover:text-white hover:bg-white/10 transition-all"
            >
              How It Works →
            </Link>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8">
            {stats.map((stat) => (
              <div key={stat.label} className="glass rounded-2xl p-4 text-center">
                <p className="text-2xl font-black bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="text-gray-500 text-xs mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Upload Section ── */}
      <section ref={uploadRef} className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <Card glow className="relative overflow-hidden">

            {/* Card Glow */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-violet-600/20 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-cyan-600/20 rounded-full blur-2xl pointer-events-none" />

            <div className="relative space-y-6">

              {/* Card Header */}
              {status === 'idle' || status === 'error' ? (
                <div className="space-y-1">
                  <h2 className="text-white font-bold text-xl">Transfer Your File</h2>
                  <p className="text-gray-500 text-sm">Paste a public Google Drive link below</p>
                </div>
              ) : null}

              {/* Error Message */}
              {status === 'error' && (
                <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/30">
                  <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-red-400 font-semibold text-sm">Transfer Failed</p>
                    <p className="text-red-400/80 text-xs mt-0.5">{error}</p>
                  </div>
                </div>
              )}

              {/* Render based on status */}
              {(status === 'idle' || status === 'error') && (
                <UploadForm onSubmit={upload} loading={false} />
              )}

              {status === 'loading' && (
                <StatusIndicator progress={progress} status={status} />
              )}

              {status === 'success' && result && (
                <DownloadLinks result={result} onReset={reset} />
              )}
            </div>
          </Card>
        </div>
      </section>

      {/* ── Features Section ── */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold text-white">Why DriveTransfer?</h2>
            <p className="text-gray-500">Built with performance and security in mind</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature) => (
              <Card key={feature.title} className="hover:border-violet-500/30 transition-all duration-300 hover:-translate-y-1">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600/20 to-cyan-600/20 border border-violet-500/30 flex items-center justify-center text-violet-400">
                    {feature.icon}
                  </div>
                  <h3 className="text-white font-semibold">{feature.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services Section ── */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold text-white">Hosting Services</h2>
            <p className="text-gray-500">Your file is uploaded to both services simultaneously</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            {/* Gofile */}
            <Card className="border-blue-500/20 hover:border-blue-500/40 transition-all">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-xl">
                      🌐
                    </div>
                    <div>
                      <h3 className="text-white font-bold">Gofile</h3>
                      <p className="text-gray-500 text-xs">gofile.io</p>
                    </div>
                  </div>
                  <Badge variant="cyan">Free</Badge>
                </div>
                <ul className="space-y-2">
                  {['No file size limit', 'Unlimited bandwidth', '10 day expiry (free)', 'No account needed'].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-gray-400 text-sm">
                      <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>

            {/* PixelDrain */}
            <Card className="border-violet-500/20 hover:border-violet-500/40 transition-all">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-xl">
                      ⚡
                    </div>
                    <div>
                      <h3 className="text-white font-bold">PixelDrain</h3>
                      <p className="text-gray-500 text-xs">pixeldrain.com</p>
                    </div>
                  </div>
                  <Badge variant="violet">API</Badge>
                </div>
                <ul className="space-y-2">
                  {['Up to 20GB per file', '20GB/month bandwidth', '60 day expiry (free)', 'Fast download speeds'].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-gray-400 text-sm">
                      <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home