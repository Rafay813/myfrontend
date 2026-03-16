import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { fetchHistory, clearHistoryDB } from '../services/api'
import { formatDate, truncateFilename } from '../utils/formatSize'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'

const History = () => {
  const [history, setHistory] = useState([])
  const [copied, setCopied] = useState(null)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    loadHistory()
  }, [])

  const loadHistory = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await fetchHistory()
      setHistory(data.data || [])
      setTotal(data.total || 0)
    } catch (err) {
      setError('Failed to load history from server')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleClear = async () => {
    try {
      await clearHistoryDB()
      setHistory([])
      setTotal(0)
      setShowConfirm(false)
    } catch (err) {
      setError('Failed to clear history')
    }
  }

  const copyLink = async (link, id) => {
    try {
      await navigator.clipboard.writeText(link)
      setCopied(id)
      setTimeout(() => setCopied(null), 2000)
    } catch {
      const el = document.createElement('textarea')
      el.value = link
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(id)
      setTimeout(() => setCopied(null), 2000)
    }
  }

  // Build links array from MongoDB data
  const getLinks = (entry) => {
    const links = []
    if (entry.gofileLink) {
      links.push({ service: 'Gofile', downloadLink: entry.gofileLink })
    }
    if (entry.pixeldrainLink) {
      links.push({ service: 'PixelDrain', downloadLink: entry.pixeldrainLink })
    }
    return links
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-black text-white">Transfer History</h1>
            <p className="text-gray-500 text-sm">
              {loading ? 'Loading...' : total > 0
                ? `${total} transfer${total !== 1 ? 's' : ''} saved in database`
                : 'No transfers yet'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Refresh Button */}
            <Button variant="ghost" size="sm" onClick={loadHistory}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </Button>

            {history.length > 0 && (
              showConfirm ? (
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 text-sm">Are you sure?</span>
                  <Button variant="danger" size="sm" onClick={handleClear}>
                    Yes, Clear All
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setShowConfirm(false)}>
                    Cancel
                  </Button>
                </div>
              ) : (
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => setShowConfirm(true)}
                  icon={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  }
                >
                  Clear All
                </Button>
              )
            )}
          </div>
        </div>

        {/* ── Database Notice ── */}
        <div className="flex items-start gap-3 p-4 rounded-2xl bg-violet-500/10 border border-violet-500/20">
          <svg className="w-5 h-5 text-violet-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582 4 8 4" />
          </svg>
          <p className="text-violet-300/80 text-sm">
            History is stored in MongoDB database. All transfers are saved permanently with their download links.
          </p>
        </div>

        {/* ── Error State ── */}
        {error && (
          <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* ── Loading State ── */}
        {loading && (
          <Card className="text-center py-16">
            <div className="space-y-4">
              <div className="w-16 h-16 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center mx-auto">
                <svg className="animate-spin w-7 h-7 text-violet-400" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              </div>
              <p className="text-gray-500">Loading history from database...</p>
            </div>
          </Card>
        )}

        {/* ── Empty State ── */}
        {!loading && history.length === 0 && (
          <Card className="text-center py-16">
            <div className="space-y-4">
              <div className="w-20 h-20 rounded-2xl bg-gray-800 flex items-center justify-center mx-auto">
                <svg className="w-9 h-9 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">No History Yet</h3>
                <p className="text-gray-500 text-sm mt-1">
                  Your transfer history will appear here after your first upload
                </p>
              </div>
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                🚀 Transfer Your First File
              </Link>
            </div>
          </Card>
        )}

        {/* ── History List ── */}
        {!loading && history.length > 0 && (
          <div className="space-y-4">
            {history.map((entry) => {
              const links = getLinks(entry)
              return (
                <Card
                  key={entry._id}
                  className="hover:border-violet-500/20 transition-all duration-200"
                >
                  <div className="space-y-4">

                    {/* ── File Header ── */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600/20 to-cyan-600/20 border border-violet-500/30 flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div className="min-w-0">
                          <p className="text-white font-semibold truncate">
                            {truncateFilename(entry.filename)}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-gray-500 text-xs">{entry.fileSize}</span>
                            <span className="text-gray-700">•</span>
                            <span className="text-gray-500 text-xs">{formatDate(entry.createdAt)}</span>
                            <span className="text-gray-700">•</span>
                            <span className="text-gray-600 text-xs capitalize">{entry.source}</span>
                          </div>
                        </div>
                      </div>
                      <Badge variant="success">Uploaded</Badge>
                    </div>

                    {/* ── Links ── */}
                    <div className="space-y-2">
                      {links.length === 0 ? (
                        <p className="text-gray-600 text-xs">No links available</p>
                      ) : (
                        links.map((link, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5"
                          >
                            <span className="text-sm flex-shrink-0">
                              {link.service === 'Gofile' ? '🌐' : '⚡'}
                            </span>
                            <span className="text-gray-500 text-xs font-medium w-20 flex-shrink-0">
                              {link.service}
                            </span>
                            <p className="text-gray-400 text-xs truncate flex-1 font-mono">
                              {link.downloadLink}
                            </p>
                            <div className="flex items-center gap-1 flex-shrink-0">
                              <button
                                onClick={() => copyLink(link.downloadLink, `${entry._id}-${i}`)}
                                className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-all"
                                title="Copy link"
                              >
                                {copied === `${entry._id}-${i}` ? (
                                  <svg className="w-3.5 h-3.5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                ) : (
                                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                  </svg>
                                )}
                              </button>
                              <a
                                href={link.downloadLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 rounded-lg text-gray-500 hover:text-violet-400 hover:bg-violet-500/10 transition-all"
                                title="Open link"
                              >
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                              </a>
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                  </div>
                </Card>
              )
            })}
          </div>
        )}

      </div>
    </div>
  )
}

export default History