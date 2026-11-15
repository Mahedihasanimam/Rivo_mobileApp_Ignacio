export type Tab = "Feed" | "Match" | "Messages"

export type Filter =
  "All" | "Walks" | "Training" | "Achievements" | "Milestones"

export type ActivityType = "walk" | "achievement" | "training" | "milestone"

export type ActivityItem = {
  id: string
  type: ActivityType
  petName: string
  owner: string
  time: string
  title: string
  description: string
  avatar: string
  routeImage?: string
  stats: {
    value: string
    label: string
  }[]
  reactions: {
    paws: number
    fire: number
  }
}

export type MatchProfile = {
  id: string
  petName: string
  breed: string
  age: string
  gender?: "female" | "male"
  distance: string
  ownerName: string
  avatar: string
  image: string
  tags: string[]
  bio?: string
  matchPercentage: number
}

export type MessageItem = {
  id: string
  ownerName: string
  petName: string
  avatar: string
  lastMessage: string
  time: string
  unreadCount: number
  online: boolean
}
