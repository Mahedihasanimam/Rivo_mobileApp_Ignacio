import { AppText } from "@/components/ui/app-text"
import TopBackButton from "@/components/ui/app-top-bar"
import { Screen } from "@/components/ui/screen"
import tw from "@/lib/tailwind"
import { LinearGradient } from "expo-linear-gradient"
import { memo, useCallback, useMemo } from "react"
import { FlatList, View } from "react-native"
import { useGetCareTasksQuery } from "../api/health-vault-api"
import { PET_ID } from "@/constants/pet-id"
import { SvgXml } from "react-native-svg"
import { tickGray, tickPrimary } from "@/assets/icons/icons"
import { Task } from "../type"

type LevelProgressCardProps = {
  level?: string
  title?: string
  currentXP?: number
  totalXP?: number
}
type TotalXpSummaryCardProps = {
  totalXP?: number
}

type CareTaskItemProps = {
  item: Task
}

export default function TodayCareTaskScreen() {
  const { data } = useGetCareTasksQuery(PET_ID)

  const renderItem = useCallback(
    ({ item }: { item: Task }) => <CareTaskItem item={item} />,
    []
  )

  const keyExtractor = useCallback((item: Task) => String(item.id), [])

  return (
    <Screen>
      <TopBackButton title="Today Care Task" />

      <TotalXpSummaryCard totalXP={data?.data?.summary?.xp_earned_today} />

      <FlatList
        data={data?.data?.tasks}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`gap-1`}
        removeClippedSubviews={false}
      />

      <LevelProgressCard
        level={data?.data?.summary?.level}
        currentXP={data?.data?.summary?.current_xp}
        totalXP={data?.data?.summary?.next_level_xp}
      />
    </Screen>
  )
}

const CareTaskItem = memo(({ item }: CareTaskItemProps) => {
  return (
    <View
      style={[
        tw`flex-row items-center justify-between rounded-2xl px-3 py-3`,
        item.is_completed_today ? tw`bg-teal-50/40` : tw`bg-transparent`,
      ]}
    >
      <View style={tw`flex-1 flex-row items-center gap-3`}>
        <SvgXml
          xml={item?.is_completed_today ? tickPrimary : tickGray}
          width={24}
          height={24}
        />

        <View style={tw`flex-1`}>
          <AppText
            variant="body"
            tone="text"
            style={[
              tw`font-inter-semibold`,
              item.is_completed_today && tw`opacity-60`,
            ]}
          >
            {item.title}
          </AppText>

          <AppText
            variant="caption"
            tone={item.is_completed_today ? "grayish" : "gray"}
            style={[
              tw`font-inter-regular`,
              item.is_completed_today && tw`opacity-60`,
            ]}
          >
            {item.description}
          </AppText>
        </View>
      </View>

      <AppText
        variant="caption"
        tone={item.is_completed_today ? "primary" : "grayish"}
        style={tw`font-inter-medium`}
      >
        +{item.xp_reward} XP
      </AppText>
    </View>
  )
})

CareTaskItem.displayName = "CareTaskItem"

function TotalXpSummaryCard({ totalXP = 0 }: TotalXpSummaryCardProps) {
  return (
    <View
      style={tw`flex-row items-center rounded-lg justify-between gap-5 border border-slate-100 bg-white px-5 py-5 shadow-sm`}
    >
      {/* Left Content */}
      <View style={tw`flex-1 gap-1`}>
        <AppText variant="body" tone="grayish" style={tw`font-inter-medium`}>
          Today&apos;s Total
        </AppText>

        <AppText
          tone="success"
          style={[
            tw`font-inter-bold`,
            {
              fontSize: 32,
              lineHeight: 40,
            },
          ]}
        >
          {totalXP} XP
        </AppText>
      </View>

      {/* Trophy */}
      <View style={tw`items-center justify-center`}>
        <AppText
          style={[
            tw`font-inter-regular`,
            {
              fontSize: 48,
              lineHeight: 48,
            },
          ]}
        >
          🏆
        </AppText>
      </View>
    </View>
  )
}

function LevelProgressCard({
  level,
  currentXP = 0,
  totalXP = 0,
}: LevelProgressCardProps) {
  const progress = useMemo(() => {
    if (!totalXP || totalXP <= 0) return 0

    return Math.min(Math.max((currentXP / totalXP) * 100, 0), 100)
  }, [currentXP, totalXP])

  const remainingXP = useMemo(() => {
    return Math.max(totalXP - currentXP, 0)
  }, [currentXP, totalXP])


  return (
    <View
      style={tw`gap-2 border rounded-lg border-[#2F9C8F]/15 bg-[#2F9C8F]/8 px-4 py-4 `}
    >
      {/* Level Information */}
      <View style={tw`gap-1 pb-2`}>
        <AppText variant="body" tone="text" style={tw`font-inter-bold`}>
           {level}
        </AppText>

        <AppText
          variant="caption"
          tone="grayish"
          style={tw`font-inter-regular`}
        >
          {currentXP} / {totalXP} XP
        </AppText>
      </View>

      {/* Progress Bar */}
      <View
        style={tw`overflow-hidden rounded-full border  border-[#2F9C8F4D]`}
      >
        <LinearGradient
          colors={["#FFDB0E", "#D4FF17", "#1AEA07"]}
          locations={[0.23, 0.56, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            width: `${progress}%`,
            paddingVertical: 5,
            borderRadius: 9999,
          }}
        />
      </View>

      {/* Remaining XP */}
      <View style={tw`flex-row items-center justify-between`}>
        <AppText variant="caption" tone="grayish" style={tw`font-inter-medium`}>
          {remainingXP} XP to next level
        </AppText>

        <AppText
          variant="caption"
          tone="primary"
          style={tw`font-inter-semibold`}
        >
          {Math.round(progress)}%
        </AppText>
      </View>
    </View>
  )
}
