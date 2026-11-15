import type {
  ActivityItem,
  Filter,
  MatchProfile,
  MessageItem,
  Tab,
} from "../types"

export const TABS: Tab[] = ["Feed", "Match", "Messages"]

export const FILTERS: Filter[] = [
  "All",
  "Walks",
  "Training",
  "Achievements",
  "Milestones",
]

export const ACTIVITIES: ActivityItem[] = [
  {
    id: "training-1",
    type: "training",
    petName: "Pedro",
    owner: "Alex P.",
    time: "2 hrs ago",
    title: "Pedro mastered 'Sit & Stay'",
    description: "Completed 15 min obedience session with perfect focus! 🐾",
    avatar: "https://images.unsplash.com/photo-1587300003388-59208cc962cb",
    stats: [
      {
        value: "15 min",
        label: "Session",
      },
      {
        value: "100%",
        label: "Accuracy",
      },
      {
        value: "+150 XP",
        label: "XP earned",
      },
    ],
    reactions: {
      paws: 22,
      fire: 11,
    },
  },
  {
    id: "walk-1",
    type: "walk",
    petName: "Luna",
    owner: "Sarah M.",
    time: "18 min ago",
    title: "Luna completed a morning walk",
    description: "Perfect sunrise walk through the park trails 🌅",
    avatar: "https://images.unsplash.com/photo-1558788353-f76d92427f16",
    routeImage: "https://images.unsplash.com/photo-1500534623283-312aade485b7",
    stats: [
      {
        value: "4.2 km",
        label: "Distance",
      },
      {
        value: "52 min",
        label: "Duration",
      },
      {
        value: "12:23 /km",
        label: "Pace",
      },
    ],
    reactions: {
      paws: 14,
      fire: 6,
    },
  },
  {
    id: "walk-2",
    type: "walk",
    petName: "Rocky",
    owner: "Emily R.",
    time: "45 min ago",
    title: "Rocky explored the lake trail",
    description: "Met three friendly pups along the path 🐾",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
    routeImage: "https://images.unsplash.com/photo-1500534623283-312aade485b7",
    stats: [
      {
        value: "5.8 km",
        label: "Distance",
      },
      {
        value: "1 hr 10m",
        label: "Duration",
      },
      {
        value: "11:50 /km",
        label: "Pace",
      },
    ],
    reactions: {
      paws: 28,
      fire: 12,
    },
  },
  {
    id: "achievement-1",
    type: "achievement",
    petName: "Max",
    owner: "James K.",
    time: "1 hr ago",
    title: "Max earned Trail Runner",
    description: "So proud - 50 km of trails completed 🎉",
    avatar: "https://images.unsplash.com/photo-1552053831-71594a27632d",
    stats: [
      {
        value: "58",
        label: "Total walks",
      },
      {
        value: "50 km",
        label: "Distance",
      },
      {
        value: "+200 XP",
        label: "XP earned",
      },
    ],
    reactions: {
      paws: 31,
      fire: 18,
    },
  },
  {
    id: "achievement-2",
    type: "achievement",
    petName: "Milo",
    owner: "Jessica T.",
    time: "3 hrs ago",
    title: "Milo unlocked Speed Demon",
    description: "Record fastest sprint through Central Park! ⚡",
    avatar: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e",
    stats: [
      {
        value: "09:12 /km",
        label: "Best Pace",
      },
      {
        value: "3.5 km",
        label: "Distance",
      },
      {
        value: "+250 XP",
        label: "XP earned",
      },
    ],
    reactions: {
      paws: 42,
      fire: 25,
    },
  },
  {
    id: "training-1",
    type: "training",
    petName: "Pedro",
    owner: "Alex P.",
    time: "2 hrs ago",
    title: "Pedro mastered 'Sit & Stay'",
    description: "Completed 15 min obedience session with perfect focus! 🐾",
    avatar: "https://images.unsplash.com/photo-1587300003388-59208cc962cb",
    stats: [
      {
        value: "15 min",
        label: "Session",
      },
      {
        value: "100%",
        label: "Accuracy",
      },
      {
        value: "+150 XP",
        label: "XP earned",
      },
    ],
    reactions: {
      paws: 22,
      fire: 11,
    },
  },
  {
    id: "training-2",
    type: "training",
    petName: "Luna",
    owner: "Sarah M.",
    time: "5 hrs ago",
    title: "Luna completed Agility Course",
    description: "Zero mistakes on hurdles and weave poles! 🏆",
    avatar: "https://images.unsplash.com/photo-1558788353-f76d92427f16",
    stats: [
      {
        value: "25 min",
        label: "Session",
      },
      {
        value: "Grade A",
        label: "Score",
      },
      {
        value: "+300 XP",
        label: "XP earned",
      },
    ],
    reactions: {
      paws: 38,
      fire: 19,
    },
  },
  {
    id: "milestone-1",
    type: "milestone",
    petName: "Bella",
    owner: "David L.",
    time: "3 hrs ago",
    title: "Bella reached 100 total walks!",
    description:
      "Centurion milestone unlocked! Celebrating with extra treats 🦴",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    stats: [
      {
        value: "100",
        label: "Walks",
      },
      {
        value: "210 km",
        label: "Total Dist",
      },
      {
        value: "+500 XP",
        label: "XP earned",
      },
    ],
    reactions: {
      paws: 45,
      fire: 29,
    },
  },
  {
    id: "milestone-2",
    type: "milestone",
    petName: "Max",
    owner: "James K.",
    time: "1 day ago",
    title: "Max hit 500 km total distance!",
    description:
      "Over 500 kilometers traveled together across all adventures! 🌌",
    avatar: "https://images.unsplash.com/photo-1552053831-71594a27632d",
    stats: [
      {
        value: "500 km",
        label: "Total Dist",
      },
      {
        value: "142",
        label: "Total Walks",
      },
      {
        value: "+1000 XP",
        label: "XP earned",
      },
    ],
    reactions: {
      paws: 64,
      fire: 40,
    },
  },
]

export const MATCH_PROFILES: MatchProfile[] = [
  {
    id: "match-1",
    petName: "Luna",
    breed: "Golden Retriever",
    age: "3",
    gender: "female",
    distance: "2.3 km",
    ownerName: "Sarah M.",
    avatar: "https://images.unsplash.com/photo-1558788353-f76d92427f16",
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d",
    tags: ["Vaccinated", "Friendly", "High Energy", "Verified"],
    bio: "Friendly and energetic - loves playing fetch, park walks, and meeting new furry friends!",
    matchPercentage: 95,
  },
  {
    id: "match-2",
    petName: "Rocky",
    breed: "Labrador Retriever",
    age: "2",
    gender: "male",
    distance: "0.8 km",
    ownerName: "Emily R.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb",
    tags: ["Vaccinated", "Loves Fetch", "Active", "Verified"],
    bio: "Super active pup looking for running partners and weekend park playdates!",
    matchPercentage: 92,
  },
  {
    id: "match-3",
    petName: "Bella",
    breed: "French Bulldog",
    age: "1.5",
    gender: "female",
    distance: "1.2 km",
    ownerName: "David L.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e",
    tags: ["Vaccinated", "Calm", "Social"],
    bio: "Chilled out Frenchie who enjoys cozy park walks and gentle play sessions.",
    matchPercentage: 88,
  },
]

export const MESSAGES: MessageItem[] = [
  {
    id: "msg-1",
    ownerName: "Sarah M.",
    petName: "Luna",
    avatar: "https://images.unsplash.com/photo-1558788353-f76d92427f16",
    lastMessage: "See you at Central Park tomorrow morning! 🐾",
    time: "10:42 AM",
    unreadCount: 2,
    online: true,
  },
  {
    id: "msg-2",
    ownerName: "James K.",
    petName: "Max",
    avatar: "https://images.unsplash.com/photo-1552053831-71594a27632d",
    lastMessage: "Max loved playing with Pedro! Thanks for the walk.",
    time: "Yesterday",
    unreadCount: 0,
    online: false,
  },
]
