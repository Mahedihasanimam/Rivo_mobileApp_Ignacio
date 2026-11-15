import {
  clanderPrimary,
  lag,
  startGolden,
  thor,
  timeGreenish,
} from "@/assets/icons/icons"
import { AppText } from "@/components/ui/app-text"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import tw from "@/lib/tailwind"
import { View } from "react-native"
import { SvgXml } from "react-native-svg"

type Stat = {
  value: string
  label: string
  icon: string
  iconColor: string
}

type Route = {
  id: number
  name: string
  times: string
  distance: string
  duration: string
  speed: string
  rank: string
  rankColor: string
}

type SuggestedWalk = {
  id: number
  type: string
  name: string
  score: string
  description: string
  duration: string
  distance: string
}

const stats: Stat[] = [
  {
    value: "18.8",
    label: "km this week",
    icon: thor,
    iconColor: "#0D9488",
  },
  {
    value: "39",
    label: "avg minutes",
    icon: timeGreenish,
    iconColor: "#0D9488",
  },
  {
    value: "2",
    label: "saved routes",
    icon: startGolden,
    iconColor: "#F59E0B",
  },
  {
    value: "6",
    label: "walks logged",
    icon: lag,
    iconColor: "#10B981",
  },
]

const favoriteRoutes: Route[] = [
  {
    id: 1,
    name: "Riverside Loop",
    times: "14 times",
    distance: "3.2 km",
    duration: "~38 min",
    speed: "5.1 km/h",
    rank: "#1 Favorite",
    rankColor: "#0D9488",
  },
  {
    id: 2,
    name: "Road Perimeter",
    times: "9 times",
    distance: "2.7 km",
    duration: "~33 min",
    speed: "4.9 km/h",
    rank: "#2 Favorite",
    rankColor: "#10B981",
  },
  {
    id: 3,
    name: "Neighborhood Quick",
    times: "6 times",
    distance: "2.1 km",
    duration: "~26 min",
    speed: "4.8 km/h",
    rank: "#3 Favorite",
    rankColor: "#F59E0B",
  },
]

const suggestedWalks: SuggestedWalk[] = [
  {
    id: 1,
    type: "Best Time Now",
    name: "Riverside Loop",
    score: "94%",
    description: "You usually walk between 7-8 AM - it's perfect right now",
    duration: "35 min",
    distance: "2.8 km",
  },
  {
    id: 2,
    type: "Evening Option",
    name: "Neighborhood Quick",
    score: "78%",
    description:
      "Weather looks great, similar to your last Friday evening walk",
    duration: "25 min",
    distance: "2.1 km",
  },
]

const StatCard = ({ item }: { item: Stat }) => {
  return (
    <Card
      radius="md"
      style={[
        tw`flex-1 p-4`,
        {
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.08,
          shadowRadius: 3,
          elevation: 2,
          borderWidth: 1,
          borderColor: "rgba(0,0,0,0.08)",
        },
      ]}
    >
      <SvgXml xml={item.icon} width={24} height={24} />

      <AppText
        variant="title"
        tone="blackish"
        style={tw`mt-2 font-inter-bold text-2xl`}
      >
        {item.value}
      </AppText>

      <AppText
        variant="caption"
        tone="grayish"
        style={tw`mt-1 font-inter-regular text-xs`}
      >
        {item.label}
      </AppText>
    </Card>
  )
}

const RouteCard = ({ route }: { route: Route }) => {
  return (
    <Card
      radius="md"
      style={[
        tw`overflow-hidden`,
        {
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.08,
          shadowRadius: 3,
          elevation: 2,
          borderWidth: 1,
          borderColor: "rgba(0,0,0,0.08)",
        },
      ]}
    >
      {/* Map Preview */}
      <View style={tw`relative h-28 bg-gray-50`}>
        {/* Replace this View with your actual Map/Image */}
        <View style={tw`flex-1 items-center justify-center`}>
          <View
            style={[
              tw`h-20 w-20 rounded-full`,
              {
                borderWidth: 2,
                borderColor: route.rankColor,
                opacity: 0.25,
              },
            ]}
          />

          <View
            style={[
              tw`absolute h-20 w-20 rounded-full`,
              {
                borderWidth: 2,
                borderColor: route.rankColor,
              },
            ]}
          />

          <View
            style={[
              tw`absolute h-2.5 w-2.5 rounded-full`,
              {
                backgroundColor: "#10B981",
                left: "55%",
                top: "48%",
              },
            ]}
          />

          <View
            style={[
              tw`absolute h-2.5 w-2.5 rounded-full`,
              {
                backgroundColor: "#EF4444",
                left: "48%",
                top: "48%",
              },
            ]}
          />
        </View>

        <View
          style={[
            tw`absolute left-2.5 top-2.5 rounded-full px-2.5 py-1`,
            {
              backgroundColor: route.rankColor,
            },
          ]}
        >
          <AppText
            variant="caption"
            style={tw`font-inter-bold text-[10px] text-white`}
          >
            {route.rank}
          </AppText>
        </View>
      </View>

      {/* Route Information */}
      <View style={tw`p-4`}>
        <View style={tw`flex-row items-start justify-between`}>
          <AppText
            variant="body"
            tone="blackish"
            style={tw`font-inter-semibold`}
          >
            {route.name}
          </AppText>

          <AppText
            variant="caption"
            tone="grayish"
            style={tw`font-inter-regular`}
          >
            {route.times}
          </AppText>
        </View>

        <View style={tw`mt-3 flex-row items-center gap-4`}>
          <RouteMeta icon="location-outline" value={route.distance} />

          <RouteMeta icon="time-outline" value={route.duration} />

          <RouteMeta icon="speedometer-outline" value={route.speed} />
        </View>
      </View>
    </Card>
  )
}

const RouteMeta = ({ icon, value }: { icon?: string; value: string }) => {
  return (
    <View style={tw`flex-row items-center gap-1`}>
      {/*
        Add your icon component here if needed.
        The original design/text is preserved.
      */}

      <AppText
        variant="caption"
        tone="blackish"
        style={tw`font-inter-medium text-xs`}
      >
        {value}
      </AppText>
    </View>
  )
}

const SuggestedWalkCard = ({
  walk,
  onPress,
}: {
  walk: SuggestedWalk
  onPress?: () => void
}) => {
  return (
    <Card
      radius="md"
      style={[
        tw`p-4`,
        {
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.08,
          shadowRadius: 3,
          elevation: 2,
          borderWidth: 1,
          borderColor: "rgba(0,0,0,0.08)",
        },
      ]}
    >
      {/* Header */}
      <View style={tw`flex-row items-start justify-between`}>
        <View style={tw`flex-1 pr-3`}>
          <AppText
            variant="caption"
            tone="primary"
            style={tw`font-inter-semibold text-xs`}
          >
            {walk.type}
          </AppText>

          <AppText
            variant="body"
            tone="blackish"
            style={tw`mt-0.5 font-inter-semibold`}
          >
            {walk.name}
          </AppText>
        </View>

        <View
          style={tw`flex-row items-center rounded-full bg-green-500/10 px-2 py-0.5`}
        >
          <AppText
            variant="caption"
            style={tw`ml-1 font-inter-bold text-[10px] text-green-500`}
          >
            {walk.score}
          </AppText>
        </View>
      </View>

      {/* Description */}
      <AppText
        variant="caption"
        tone="grayish"
        style={tw`mt-3 font-inter-regular leading-5`}
      >
        {walk.description}
      </AppText>

      {/* Meta */}
      <View style={tw`my-3  flex-row items-center gap-3`}>
        <RouteMeta icon="time-outline" value={walk.duration} />

        <View style={tw`h-1 w-1 rounded-full bg-black/10`} />

        <RouteMeta icon="location-outline" value={walk.distance} />
      </View>

      {/* Button */}
      <Button label="Start This Walk" onPress={onPress} />
    </Card>
  )
}

export default function WalkRouteScreen() {
  return (
    <View style={tw`flex-1`}>
      <View>
        {/* Stats */}
        <View style={tw`gap-3`}>
          <View style={tw`flex-row gap-3`}>
            {stats.slice(0, 2).map((item) => (
              <StatCard key={item.label} item={item} />
            ))}
          </View>

          <View style={tw`flex-row gap-3`}>
            {stats.slice(2, 4).map((item) => (
              <StatCard key={item.label} item={item} />
            ))}
          </View>
        </View>

        {/* Favorite Routes */}
        <SectionHeader icon={startGolden} title="Favorite Routes" />

        <View style={tw`mt-3 gap-3`}>
          {favoriteRoutes.map((route) => (
            <RouteCard key={route.id} route={route} />
          ))}
        </View>

        {/* Suggested Walks */}
        <SectionHeader icon={clanderPrimary} title="Suggested Walks" />

        <View style={tw`mt-3 gap-3`}>
          {suggestedWalks.map((walk) => (
            <SuggestedWalkCard
              key={walk.id}
              walk={walk}
              onPress={() => {
                // router.push("/(walk-mode)/walk-start")
              }}
            />
          ))}
        </View>
      </View>
    </View>
  )
}

const SectionHeader = ({ title, icon }: { icon: string; title: string }) => {
  return (
    <View style={tw`mt-5 flex-row items-center gap-2`}>
      <SvgXml xml={icon} width={20} height={20} />

      <AppText variant="body" tone="blackish" style={tw`font-inter-semibold`}>
        {title}
      </AppText>
    </View>
  )
}
