import { useState, useCallback } from 'react'
import { uploadDriveLink } from '../services/api'

const HISTORY_KEY = 'gdrive_transfer_history'

export const useUpload = () => {
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [progress, setProgress] = useState('')

  const upload = useCallback(async (driveLink) => {
    try {
      setStatus('loading')
      setError(null)
      setResult(null)

      // Simulate progress stages
      setProgress('🔍 Validating Google Drive link...')
      await new Promise((r) => setTimeout(r, 800))

      setProgress('📋 Fetching file metadata...')
      await new Promise((r) => setTimeout(r, 600))

      setProgress('⬇️ Streaming file from Google Drive...')

      const data = await uploadDriveLink(driveLink)

      setProgress('✅ Upload complete!')
      setStatus('success')
      setResult(data)

      // Save to localStorage history
      saveToHistory(data)

    } catch (err) {
      setStatus('error')
      setError(err.message)
      setProgress('')
    }
  }, [])

  const reset = useCallback(() => {
    setStatus('idle')
    setResult(null)
    setError(null)
    setProgress('')
  }, [])

  return { status, result, error, progress, upload, reset }
}

/**
 * Save upload result to localStorage
 */
const saveToHistory = (data) => {
  try {
    const existing = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]')
    const entry = {
      id: Date.now(),
      filename: data.filename,
      fileSize: data.fileSize,
      links: data.links,
      uploadedAt: new Date().toISOString(),
    }
    const updated = [entry, ...existing].slice(0, 50) // keep last 50
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated))
  } catch (e) {
    console.error('Failed to save history:', e)
  }
}

export const getHistory = () => {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]')
  } catch {
    return []
  }
}

export const clearHistory = () => {
  localStorage.removeItem(HISTORY_KEY)
}