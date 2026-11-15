export type TabKey = "upcoming" | "completed" | "all"

export type Tab = {
  key: TabKey
  label: string
  count?: number
}

export type Appointment = {
  id: string
  title: string
  type: string
  pet: string
  date: string
  time: string
  clinic: string
  doctor: string
  status: "upcoming" | "completed" | "cancelled"
  daysAgo?: string
  note?: string
  reminder?: string
}

