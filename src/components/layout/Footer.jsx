import { Link } from 'react-router-dom'

const Footer = () => {
  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'How It Works', path: '/how-it-works' },
    { label: 'History', path: '/history' },
    { label: 'About', path: '/about' },
  ]

  const services = [
    { label: 'Gofile.io', url: 'https://gofile.io' },
    { label: 'PixelDrain', url: 'https://pixeldrain.com' },
  ]

  return (
    <footer className="border-t border-white/10 bg-gray-950/80 backdrop-blur-xl mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* ── Brand ── */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-600 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <span className="font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                DriveTransfer
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Convert Google Drive links to direct download links instantly. Fast, free, and reliable.
            </p>
            {/* Status Badge */}
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-green-400 text-xs font-medium">All systems operational</span>
            </div>
          </div>

          {/* ── Navigation ── */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-sm">Navigation</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-500 hover:text-violet-400 text-sm transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-violet-400 transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Services ── */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-sm">Hosting Services</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.url}>
                  <a
                    href={service.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-cyan-400 text-sm transition-colors duration-200 flex items-center gap-1.5"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    {service.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Max file info */}
            <div className="mt-4 p-3 rounded-xl bg-white/5 border border-white/10">
              <p className="text-gray-500 text-xs">Max file size</p>
              <p className="text-white text-sm font-semibold mt-0.5">500 MB per transfer</p>
            </div>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs">
            © {new Date().getFullYear()} DriveTransfer. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 text-gray-600 text-xs">
            <span>Powered by</span>
            <span className="text-violet-500 font-medium">Gofile</span>
            <span>&amp;</span>
            <span className="text-cyan-500 font-medium">PixelDrain</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer