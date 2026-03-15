/**
 * Formats bytes into human readable string
 */
export const formatSize = (bytes) => {
  if (!bytes || bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
}

/**
 * Formats date to readable string
 */
export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

/**
 * Truncates long filenames
 */
export const truncateFilename = (filename, maxLength = 30) => {
  if (!filename) return 'Unknown File'
  if (filename.length <= maxLength) return filename
  const ext = filename.split('.').pop()
  const name = filename.slice(0, maxLength - ext.length - 4)
  return `${name}...${ext}`
}