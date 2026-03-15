import { Link } from 'react-router-dom'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'

const values = [
  {
    icon: '🔒',
    title: 'Privacy First',
    description: 'We never store your files. Everything is streamed directly from Google Drive to hosting services.',
  },
  {
    icon: '⚡',
    title: 'Performance',
    description: 'Built with streaming architecture — files never fully load into memory, keeping everything fast.',
  },
  {
    icon: '🆓',
    title: 'Always Free',
    description: 'DriveTransfer is completely free to use. No hidden fees, no subscriptions, no accounts needed.',
  },
  {
    icon: '🛡️',
    title: 'Secure',
    description: 'Rate limiting, input sanitization, file validation and security headers keep you protected.',
  },
]

const limitations = [
  { text: 'Files must be set to public on Google Drive', icon: '⚠️' },
  { text: 'Maximum file size: 500MB per transfer', icon: '📦' },
  { text: 'Gofile links expire after 10 days of inactivity', icon: '⏰' },
  { text: 'PixelDrain free tier: 20GB/month bandwidth', icon: '📊' },
]

const About = () => {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto space-y-20">

        {/* ── Header ── */}
        <div className="text-center space-y-4">
          <Badge variant="cyan">About Us</Badge>
          <h1 className="text-4xl sm:text-5xl font-black text-white">
            About{' '}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              DriveTransfer
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            A simple, fast, and free tool to convert Google Drive links into
            direct download links from reliable hosting services.
          </p>
        </div>

        {/* ── Mission ── */}
        <Card glow className="relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-violet-600/10 rounded-full blur-2xl" />
          <div className="relative space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-600 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h2 className="text-white font-bold text-xl">Our Mission</h2>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Google Drive is great for storing files, but sharing them can be frustrating —
              recipients need a Google account, download quotas get hit, and links expire.
              DriveTransfer solves this by converting your Drive link into a universal
              direct download link that anyone can access, anywhere, without any account.
            </p>
            <p className="text-gray-400 leading-relaxed">
              We built this tool to be fast, reliable, and completely transparent about
              what it does. Your files are never stored on our servers — they stream
              directly from Google Drive to the hosting services in real time.
            </p>
          </div>
        </Card>

        {/* ── Values ── */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white text-center">Our Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {values.map((value) => (
              <Card key={value.title} className="hover:border-violet-500/30 transition-all">
                <div className="space-y-3">
                  <span className="text-3xl">{value.icon}</span>
                  <h3 className="text-white font-bold">{value.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{value.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* ── Services Used ── */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white text-center">Services We Use</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card className="border-blue-500/20">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🌐</span>
                    <h3 className="text-white font-bold">Gofile</h3>
                  </div>
                  <a
                    href="https://gofile.io"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 text-xs hover:underline"
                  >
                    gofile.io ↗
                  </a>
                </div>
                <p className="text-gray-500 text-sm">
                  A free file hosting service with no file size limits and unlimited bandwidth.
                  Perfect for large files and high download traffic.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="cyan">No Size Limit</Badge>
                  <Badge variant="default">Free</Badge>
                  <Badge variant="default">10 Day Expiry</Badge>
                </div>
              </div>
            </Card>

            <Card className="border-violet-500/20">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">⚡</span>
                    <h3 className="text-white font-bold">PixelDrain</h3>
                  </div>
                  <a
                    href="https://pixeldrain.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-violet-400 text-xs hover:underline"
                  >
                    pixeldrain.com ↗
                  </a>
                </div>
                <p className="text-gray-500 text-sm">
                  A reliable file hosting service known for fast download speeds
                  and clean, simple direct download links.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="violet">20GB/file</Badge>
                  <Badge variant="default">Fast CDN</Badge>
                  <Badge variant="default">60 Day Expiry</Badge>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* ── Limitations ── */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white text-center">Known Limitations</h2>
          <Card>
            <div className="space-y-3">
              {limitations.map((item) => (
                <div key={item.text} className="flex items-center gap-3 p-3 rounded-xl bg-yellow-500/5 border border-yellow-500/20">
                  <span className="text-lg flex-shrink-0">{item.icon}</span>
                  <p className="text-gray-400 text-sm">{item.text}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* ── CTA ── */}
        <div className="text-center space-y-4">
          <p className="text-gray-400">Ready to get started?</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-bold text-lg hover:opacity-90 transition-all shadow-lg"
          >
            🚀 Transfer a File Now
          </Link>
        </div>
      </div>
    </div>
  )
}

export default About