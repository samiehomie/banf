export function dateFormatter(dateString?: string) {
  if (!dateString) return ''

  const date = new Date(dateString)
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
  return formattedDate
}
