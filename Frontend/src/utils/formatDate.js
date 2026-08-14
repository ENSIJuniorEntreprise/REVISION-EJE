const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export function toIsoDate(dateInput) {
  return new Date(dateInput).toISOString().slice(0, 10)
}

// e.g. "2 Sep 2025"
export function toShortDate(dateInput) {
  const date = new Date(dateInput)
  return `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`
}
