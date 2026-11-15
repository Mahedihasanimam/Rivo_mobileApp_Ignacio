/**
 * Formats an ISO date string or Date object for UI display (e.g., 'Wed, May 27, 2026')
 */
export const formatDateDisplay = (dateInput?: string | Date | null): string => {
  if (!dateInput) return ""
  const d = typeof dateInput === "string" ? new Date(dateInput) : dateInput
  if (isNaN(d.getTime())) return ""
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

/**
 * Formats an ISO date string or Date object for time UI display (e.g., '10:00 AM')
 */
export const formatTimeDisplay = (dateInput?: string | Date | null): string => {
  if (!dateInput) return ""
  const d = typeof dateInput === "string" ? new Date(dateInput) : dateInput
  if (isNaN(d.getTime())) return ""
  return d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })
}

/**
 * Formats a Date object to 'YYYY-MM-DD HH:mm:ss' required by the backend API
 */
export const formatToApiDateTime = (dateInput?: string | Date | null): string => {
  if (!dateInput) return ""
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput
  if (isNaN(date.getTime())) return ""

  const pad = (n: number) => String(n).padStart(2, "0")
  const year = date.getFullYear()
  const month = pad(date.getMonth() + 1)
  const day = pad(date.getDate())
  const hours = pad(date.getHours())
  const minutes = pad(date.getMinutes())
  const seconds = pad(date.getSeconds())
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

/**
 * Merges a newly picked date (year, month, day) into an existing ISO datetime string
 */
export const mergeSelectedDate = (
  selectedDate: Date,
  currentIsoString?: string
): string => {
  const current =
    currentIsoString && !isNaN(new Date(currentIsoString).getTime())
      ? new Date(currentIsoString)
      : new Date()

  current.setFullYear(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    selectedDate.getDate()
  )
  return current.toISOString()
}

/**
 * Merges a newly picked time (hours, minutes) into an existing ISO datetime string
 */
export const mergeSelectedTime = (
  selectedTime: Date,
  currentIsoString?: string
): string => {
  const current =
    currentIsoString && !isNaN(new Date(currentIsoString).getTime())
      ? new Date(currentIsoString)
      : new Date()

  current.setHours(selectedTime.getHours(), selectedTime.getMinutes(), 0, 0)
  return current.toISOString()
}
