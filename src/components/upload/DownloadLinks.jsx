import { useState } from 'react'
import Badge from '../ui/Badge'
import Button from '../ui/Button'

const serviceConfig = {
  Gofile: {
    color: 'from-blue-600 to-blue-400',
    bg: 'bg-blue-500/10 border-blue-500/30',
    badge: 'cyan',
    icon: '🌐',
    description: 'No size limit • 10 day expiry',
  },
  PixelDrain: {
    color: 'from-violet-600 to-violet-400',
    bg: 'bg-violet-500/10 border-violet-500/30',
    badge: 'violet',
    icon: '⚡',
    description: '20GB limit • 60 day expiry',
  },
}

const DownloadLinks = ({ result, onReset }) => {
  const [copied, setCopied] = useState(null)

  const copyToClipboard = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(id)
      setTimeout(() => setCopied(null), 2000)
    } catch {
      // fallback
      const el = document.createElement('textarea')
      el.value = text
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(id)
      setTimeout(() => setCopied(null), 2000)
    }
  }

  return (
    <div className="w-full space-y-6 animate-slide-up">

      {/* Success Header */}
      <div className="text-center space-y-3">
        <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto">
          <svg className="w-7 h-7 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div>
          <h3 className="text-white font-bold text-lg">Upload Complete!</h3>
          <p className="text-gray-500 text-sm mt-1">Your file is ready to download</p>
        </div>
      </div>

      {/* File Info */}
      <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600/30 to-cyan-600/30 flex items-center justify-center flex-shrink-0">
          <svg className="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white text-sm font-medium truncate">{result.filename}</p>
          <p className="text-gray-500 text-xs">{result.fileSize}</p>
        </div>
        <Badge variant="success">Uploaded</Badge>
      </div>

      {/* Download Links */}
      <div className="space-y-3">
        <p className="text-gray-400 text-sm font-medium">Download from:</p>
        {result.links.map((link, index) => {
          const config = serviceConfig[link.service] || {
            color: 'from-gray-600 to-gray-400',
            bg: 'bg-gray-500/10 border-gray-500/30',
            badge: 'default',
            icon: '🔗',
            description: 'File hosting service',
          }

          return (
            <div
              key={index}
              className={`p-4 rounded-2xl border ${config.bg} space-y-3`}
            >
              {/* Service Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{config.icon}</span>
                  <div>
                    <p className="text-white font-semibold text-sm">{link.service}</p>
                    <p className="text-gray-500 text-xs">{config.description}</p>
                  </div>
                </div>
                <Badge variant={config.badge}>Ready</Badge>
              </div>

              {/* Link Row */}
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-black/30 border border-white/5">
                <p className="flex-1 text-gray-400 text-xs truncate font-mono">
                  {link.downloadLink}
                </p>
                <button
                  onClick={() => copyToClipboard(link.downloadLink, `${link.service}-${index}`)}
                  className="flex-shrink-0 p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-all"
                >
                  {copied === `${link.service}-${index}` ? (
                    <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  )}
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <a
                  href={link.downloadLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download
                </a>
                <button
                  onClick={() => copyToClipboard(link.downloadLink, `btn-${link.service}-${index}`)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white text-sm font-medium transition-all hover:bg-white/10"
                >
                  {copied === `btn-${link.service}-${index}` ? '✅ Copied!' : 'Copy Link'}
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Warnings */}
      {result.warnings && result.warnings.length > 0 && (
        <div className="p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/30 space-y-1">
          <p className="text-yellow-400 text-xs font-semibold">⚠️ Some services had issues:</p>
          {result.warnings.map((w, i) => (
            <p key={i} className="text-yellow-500/80 text-xs">{w.service}: {w.error}</p>
          ))}
        </div>
      )}

      {/* Transfer Another */}
      <Button
        variant="secondary"
        size="lg"
        onClick={onReset}
        className="w-full"
        icon={
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        }
      >
        Transfer Another File
      </Button>
    </div>
  )
}

export default DownloadLinks