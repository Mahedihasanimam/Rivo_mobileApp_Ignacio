import { View } from "react-native"
import { SvgXml } from "react-native-svg"

import { AppText } from "@/components/ui/app-text"

import { fireIcon, locationIcon, time, weatherIcon } from "@/assets/icons/icons"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import tw from "@/lib/tailwind"
import { router } from "expo-router"
import CalendarWalkHistory from "../components/calendar-walk-history"

const suggestedWalks = [
  {
    type: "Best Time Now",
    title: "Riverside Loop",
    score: "94%",
    description: "You usually walk between 7-8 AM - it's perfect right now",
    duration: "35 min",
    distance: "2.8 km",
  },
  {
    type: "Evening Option",
    title: "Neighborhood Quick",
    score: "78%",
    description:
      "Weather looks great, similar to your last Friday evening walk",
    duration: "25 min",
    distance: "2.1 km",
  },
]

const historyGroups = [
  {
    title: "Today",
    walks: [
      {
        name: "Morning Walk",
        details: "2.5 km • 00:35:20 • 190 kcal",
        status: "Goal Completed",
        statusType: "success",
      },
    ],
  },
  {
    title: "Yesterday",
    walks: [
      {
        name: "Evening Walk",
        details: "1.8 km • 00:24:10 • 160 kcal",
        status: "72% of Goal",
        statusType: "warning",
      },
    ],
  },
  {
    title: "May 18, 2026",
    walks: [
      {
        name: "Morning Walk",
        details: "2.1 km • 00:28:05 • 180 kcal",
        status: "Goal Missed",
        statusType: "danger",
      },
    ],
  },
]

const statusStyles = {
  success: {
    container: "bg-[#E6F4F4]",
    text: "text-[#047B72]",
  },
  warning: {
    container: "bg-[#FEF3C7]",
    text: "text-[#F59E0B]",
  },
  danger: {
    container: "bg-[#FEE2E2]",
    text: "text-[#EF4444]",
  },
} as const

export default function History() {
  return (
    <View style={tw`w-full gap-4`}>
      {/* Calendar */}
      <CalendarWalkHistory />

      {/* Suggested */}
      <View style={tw`w-full`}>
        <View style={tw`mb-3 flex-row items-center gap-2`}>
          <SvgXml xml={fireIcon} width={16} height={16} />

          <AppText
            variant="body"
            tone="blackish"
            style={tw`font-inter-semibold`}
          >
            Suggested for Butch
          </AppText>
        </View>

        <View style={tw`gap-3`}>
          {suggestedWalks.map((walk) => (
            <SuggestedWalkCard key={walk.title} {...walk} />
          ))}
        </View>
      </View>

      {/* History */}
      <View style={tw`w-full gap-3`}>
        {historyGroups.map((group) => (
          <View key={group.title} style={tw`w-full gap-3`}>
            <AppText variant="body" tone="blackish" style={tw`font-inter-bold`}>
              {group.title}
            </AppText>

            {group?.walks.map((walk) => (
              <HistoryCard key={`${group.title}-${walk?.name}`} {...walk} />
            ))}
          </View>
        ))}
      </View>
    </View>
  )
}

type SuggestedWalkCardProps = {
  type: string
  title: string
  score: string
  description: string
  duration: string
  distance: string
}

function SuggestedWalkCard({
  type,
  title,
  score,
  description,
  duration,
  distance,
}: SuggestedWalkCardProps) {
  return (
    <Card
      radius="md"
      style={[
        tw`w-full p-4`,
        {
          borderWidth: 0.73,
          borderColor: "rgba(0,0,0,0.1)",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.08,
          shadowRadius: 3,
          elevation: 2,
        },
      ]}
    >
      {/* Header */}
      <View style={tw`flex-row items-start justify-between`}>
        <View style={tw`flex-1`}>
          <AppText
            variant="caption"
            tone="primary"
            style={tw`font-inter-semibold`}
          >
            {type}
          </AppText>

          <AppText
            variant="body"
            tone="blackish"
            style={tw`font-inter-semibold`}
          >
            {title}
          </AppText>
        </View>

        {/* Score */}
        <View
          style={[
            tw`flex-row items-center gap-1 rounded-full px-2 py-0.5`,
            {
              backgroundColor: "rgba(34,197,94,0.1)",
              borderWidth: 0.73,
              borderColor: "rgba(34,197,94,0.2)",
            },
          ]}
        >
          <SvgXml xml={weatherIcon} width={12} height={12} />

          <AppText variant="caption" tone="success" style={tw`font-inter-bold`}>
            {score}
          </AppText>
        </View>
      </View>

      {/* Description */}
      <AppText
        variant="caption"
        tone="gray"
        style={tw`mt-3 font-inter-regular leading-5`}
      >
        {description}
      </AppText>

      {/* Meta */}
      <View style={tw`mt-3 flex-row items-center gap-3`}>
        <View style={tw`flex-row items-center gap-1`}>
          <SvgXml xml={time} width={12} height={12} />

          <AppText
            variant="caption"
            tone="blackish"
            style={tw`font-inter-medium`}
          >
            {duration}
          </AppText>
        </View>

        <View style={tw`h-2 w-2 rounded-full bg-black/10`} />

        <View style={tw`flex-row items-center gap-1`}>
          <SvgXml xml={locationIcon} width={12} height={12} />

          <AppText
            variant="caption"
            tone="blackish"
            style={tw`font-inter-medium`}
          >
            {distance}
          </AppText>
        </View>
      </View>

      {/* Action */}
      {type === "Best Time Now" && (
        <View style={tw`mt-4`}>
          <Button
            onPress={() => router.push("/walk-details")}
            label="Start This Walk"
          />
        </View>
      )}
    </Card>
  )
}

type HistoryCardProps = {
  name: string
  details: string
  status: string
  statusType: keyof typeof statusStyles
}

function HistoryCard({ name, details, status, statusType }: HistoryCardProps) {
  const colors = statusStyles[statusType]

  return (
    <Card
      radius="md"
      style={[
        tw`w-full flex-row items-center p-4`,
        {
          borderWidth: 0.73,
          borderColor: "rgba(0,0,0,0.1)",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.08,
          shadowRadius: 3,
          elevation: 2,
        },
      ]}
    >
      <View style={tw`flex-1`}>
        <AppText variant="body" tone="blackish" style={tw`font-inter-bold`}>
          {name}
        </AppText>

        <AppText
          variant="caption"
          tone="gray"
          style={tw`mt-1 font-inter-medium`}
        >
          {details}
        </AppText>
      </View>

      <View style={tw`ml-2`}>
        <View style={tw`${colors.container} rounded-full px-3 py-1.5`}>
          <AppText variant="caption" style={tw`${colors.text} font-inter-bold`}>
            {status}
          </AppText>
        </View>
      </View>
    </Card>
  )
}
