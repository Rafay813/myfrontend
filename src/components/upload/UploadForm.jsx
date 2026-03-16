import { useState } from 'react'
import Button from '../ui/Button'

const UploadForm = ({ onSubmit, loading }) => {
  const [link, setLink] = useState('')
  const [touched, setTouched] = useState(false)

  const isValidLink = (url) => {
    return url.startsWith('http://') || url.startsWith('https://')
  }

  const getSourceLabel = (url) => {
    if (url.includes('drive.google.com')) return '🟢 Google Drive'
    if (url.includes('dropbox.com')) return '🔵 Dropbox'
    if (url.includes('onedrive.live.com') || url.includes('1drv.ms')) return '🔷 OneDrive'
    if (url.includes('mediafire.com')) return '🟠 MediaFire'
    if (isValidLink(url)) return '🔗 Direct Link'
    return null
  }

  const hasError = touched && link && !isValidLink(link)
  const sourceLabel = link && isValidLink(link) ? getSourceLabel(link) : null

  const handleSubmit = (e) => {
    e.preventDefault()
    setTouched(true)
    if (!link.trim() || !isValidLink(link)) return
    onSubmit(link.trim())
  }

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText()
      setLink(text)
      setTouched(false)
    } catch {
      // clipboard access denied
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-400">
          Download Link
        </label>

        {/* Input Row */}
        <div className={`flex items-center gap-2 p-1.5 rounded-2xl border transition-all duration-200 bg-white/5 backdrop-blur-sm ${
          hasError
            ? 'border-red-500/50'
            : link && isValidLink(link)
            ? 'border-green-500/50'
            : 'border-white/10 focus-within:border-violet-500/50'
        }`}>

          {/* Link Icon */}
          <div className="pl-3 flex-shrink-0">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </div>

          {/* Input */}
          <input
            type="url"
            value={link}
            onChange={(e) => { setLink(e.target.value); setTouched(false) }}
            onBlur={() => setTouched(true)}
            placeholder="Paste any download link — Google Drive, Dropbox, OneDrive..."
            disabled={loading}
            className="flex-1 bg-transparent py-3 px-2 text-white placeholder-gray-600 text-sm outline-none disabled:opacity-50"
          />

          {/* Clear Button */}
          {link && !loading && (
            <button
              type="button"
              onClick={() => { setLink(''); setTouched(false) }}
              className="p-2 text-gray-500 hover:text-gray-300 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}

          {/* Paste Button */}
          {!link && (
            <button
              type="button"
              onClick={handlePaste}
              className="flex-shrink-0 mr-1 px-3 py-2 rounded-xl text-xs font-medium text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 transition-all border border-white/10"
            >
              Paste
            </button>
          )}
        </div>

        {/* Error Message */}
        {hasError && (
          <p className="text-red-400 text-xs flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Please enter a valid URL starting with http:// or https://
          </p>
        )}

        {/* Source Detected */}
        {sourceLabel && !hasError && (
          <p className="text-green-400 text-xs flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {sourceLabel} detected
          </p>
        )}
      </div>

      {/* Supported Sources */}
      <div className="flex flex-wrap gap-2">
        {['Google Drive', 'Dropbox', 'OneDrive', 'MediaFire', 'Direct URL'].map((source) => (
          <span
            key={source}
            className="px-2.5 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-gray-500"
          >
            {source}
          </span>
        ))}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        loading={loading}
        disabled={loading || !link}
        className="w-full"
        icon={
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        }
      >
        {loading ? 'Transferring File...' : 'Transfer File'}
      </Button>

      {/* Helper Text */}
      <p className="text-center text-gray-600 text-xs">
        Supports Google Drive, Dropbox, OneDrive, MediaFire and any direct download link
      </p>
    </form>
  )
}

export default UploadForm