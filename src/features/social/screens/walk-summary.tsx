import { AppText } from "@/components/ui/app-text"
import TopBackButton from "@/components/ui/app-top-bar"
import { Screen } from "@/components/ui/screen"
import tw from "@/lib/tailwind"
import { useCallback, useMemo } from "react"
import { FlatList, View } from "react-native"

export default function WalkSummaryScreen() {
  const data = useMemo(() => WALK_DATA, [])

  const renderItem = useCallback(({ item }: { item: WalkItem }) => {
    return <WalkCard item={item} />
  }, [])

  const keyExtractor = useCallback((item: WalkItem) => item.id, [])
  return (
    <Screen>
      <TopBackButton title="Walk History" />

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={tw`gap-5`}
        showsVerticalScrollIndicator={false}
        initialNumToRender={5}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews
        scrollEnabled={false}
      />
    </Screen>
  )
}

type WalkStatus = "completed" | "progress" | "missed"

type WalkItem = {
  id: string
  date: string
  title: string
  distance: string
  duration: string
  calories: string
  status: WalkStatus
  statusText: string
}

const WALK_DATA: WalkItem[] = [
  {
    id: "1",
    date: "Today",
    title: "Morning Walk",
    distance: "2.5 km",
    duration: "00:35:20",
    calories: "190 kcal",
    status: "completed",
    statusText: "Goal Completed",
  },
  {
    id: "2",
    date: "Yesterday",
    title: "Evening Walk",
    distance: "1.8 km",
    duration: "00:24:10",
    calories: "160 kcal",
    status: "progress",
    statusText: "72% of Goal",
  },
  {
    id: "3",
    date: "May 18, 2026",
    title: "Morning Walk",
    distance: "2.1 km",
    duration: "00:28:05",
    calories: "180 kcal",
    status: "missed",
    statusText: "Goal Missed",
  },
]

const STATUS_STYLES = {
  completed: {
    container: tw`bg-[#E6F4F4]`,
    textTone: "success",
  },
  progress: {
    container: tw`bg-[#FEF3C7]`,
    textTone: "warning",
  },
  missed: {
    container: tw`bg-[#FEE2E2]`,
    textTone: "danger",
  },
} as const

type WalkCardProps = {
  item: WalkItem
}

const WalkCard = ({ item }: WalkCardProps) => {
  const statusStyle = STATUS_STYLES[item.status]

  return (
    <View style={tw`gap-3`}>
      {/* Date */}
      <AppText variant="body" tone="text" style={tw`font-inter-bold`}>
        {item.date}
      </AppText>

      {/* Card */}
      <View style={tw`bg-white rounded-2xl border border-black/10 px-4 py-4`}>
        <View style={tw`flex-row items-center justify-between gap-3`}>
          {/* Walk Information */}
          <View style={tw`flex-1 gap-1`}>
            <AppText variant="body" tone="text" style={tw`font-inter-bold`}>
              {item.title}
            </AppText>

            <AppText
              variant="caption"
              tone="grayish"
              style={tw`font-inter-medium`}
            >
              {item.distance} • {item.duration} • {item.calories}
            </AppText>
          </View>

          {/* Status Badge */}
          <View style={[tw`px-3 py-1.5 rounded-full`, statusStyle.container]}>
            <AppText
              variant="caption"
              tone={statusStyle.textTone}
              style={tw`font-inter-bold`}
              numberOfLines={1}
            >
              {item.statusText}
            </AppText>
          </View>
        </View>
      </View>
    </View>
  )
}
