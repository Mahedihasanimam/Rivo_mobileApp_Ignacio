import { heardGreen } from "@/assets/icons/icons"
import { AppText } from "@/components/ui/app-text"
import TopBackButton from "@/components/ui/app-top-bar"
import { Button } from "@/components/ui/button"
import { Screen } from "@/components/ui/screen"
import { PET_ID } from "@/constants/pet-id"
import tw from "@/lib/tailwind"
import { Checkbox } from "expo-checkbox"
import { router } from "expo-router"
import { memo, useCallback, useMemo, useState } from "react"
import { ActivityIndicator, FlatList, Pressable, View } from "react-native"
import Svg, {
  Circle,
  Defs,
  LinearGradient as SvgLinearGradient,
  Stop,
  SvgXml,
} from "react-native-svg"
import { CareTask, useCareTasks } from "../hook"

export default function CareScreen() {
  const {
    tasks,
    completedTasks,
    totalTasks,
    earnedXP,
    progressPercentage,
    streakDays,
    completeTask,
  } = useCareTasks(PET_ID)

  return (
    <Screen>
      <TopBackButton title="Care" />

      <TodaysProgressCard
        completedTasks={completedTasks}
        totalTasks={totalTasks}
        earnedXP={earnedXP}
        progressPercentage={progressPercentage}
      />

      <Pressable
        onPress={() => router.push("/today-care-task")}
        style={tw`flex-row items-start rounded-xl border border-emerald-200 bg-lime-50 p-4`}
      >
        <View style={tw`items-center justify-center pt-0.5`}>
          <SvgXml xml={heardGreen} />
        </View>

        <View style={tw`flex-1 gap-0.5 pl-3`}>
          <AppText variant="body" tone="text" style={tw`font-inter-bold`}>
            {streakDays} Day Care Streak
          </AppText>

          <AppText variant="caption" tone="gray" style={tw`font-inter-regular`}>
            Keep it up! You&apos;re doing great.
          </AppText>
        </View>
      </Pressable>

      <TodaysCare
        tasks={tasks}
        completedCount={completedTasks}
        earnedXP={earnedXP}
        onCompleteTask={completeTask}
        onViewDetails={() => router.push("/today-care-task")}
      />

      <Button
        label="Add Care Task"
        onPress={() => router.push("/add-care-task")}
      />
    </Screen>
  )
}

type TodaysProgressCardProps = {
  completedTasks?: number
  totalTasks?: number
  earnedXP?: number
  progressPercentage?: number
}

function TodaysProgressCard({
  completedTasks = 0,
  totalTasks = 0,
  earnedXP = 0,
  progressPercentage,
}: TodaysProgressCardProps) {
  const progress = useMemo(() => {
    if (progressPercentage !== undefined) return progressPercentage
    if (totalTasks <= 0) return 0
    return Math.min(Math.round((completedTasks / totalTasks) * 100), 100)
  }, [completedTasks, totalTasks, progressPercentage])

  const circleSize = 80
  const strokeWidth = 7
  const radius = (circleSize - strokeWidth) / 2 - 1
  const circumference = 2 * Math.PI * radius
  const progressOffset = circumference - (progress / 100) * circumference

  return (
    <View
      style={tw`flex-row items-center justify-between gap-4 rounded-2xl border border-gray-100 bg-white p-5`}
    >
      {/* Left Content */}
      <View style={tw`flex-1 items-start gap-1`}>
        <AppText variant="body" tone="blackish" style={tw`font-inter-semibold`}>
          Today&apos;s Progress
        </AppText>

        {/* Progress Count */}
        <View style={tw`flex-row items-end gap-1`}>
          <AppText tone="primary" variant="title" style={tw`font-inter-bold`}>
            {completedTasks}
          </AppText>

          <AppText
            tone="grayish"
            variant="caption"
            style={tw`font-inter-regular`}
          >
            / {totalTasks}
          </AppText>
        </View>

        <AppText
          variant="caption"
          tone="grayish"
          style={tw`font-inter-regular pb-2`}
        >
          Tasks Completed
        </AppText>

        {/* XP Badge */}
        <View
          style={tw`flex-row items-center gap-1 rounded-full bg-teal-50 px-2 py-1`}
        >
          <AppText
            variant="caption"
            tone="primary"
            style={tw`font-inter-semibold`}
          >
            ✨
          </AppText>

          <AppText
            variant="caption"
            tone="primary"
            style={tw`font-inter-semibold`}
          >
            +{earnedXP} XP earned today
          </AppText>
        </View>
      </View>

      {/* Dynamic Circular Progress */}
      <View
        style={[
          tw`items-center justify-center relative`,
          { width: circleSize, height: circleSize },
        ]}
      >
        <Svg
          width={circleSize}
          height={circleSize}
          style={tw`absolute inset-0`}
        >
          <Defs>
            <SvgLinearGradient
              id="progressGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <Stop offset="0%" stopColor="#bfd8d5" />
              <Stop offset="100%" stopColor="#0e8d80" />
            </SvgLinearGradient>
          </Defs>

          {/* Background Track Circle */}
          <Circle
            cx={circleSize / 2}
            cy={circleSize / 2}
            r={radius}
            stroke="#E6F4F1"
            strokeWidth={strokeWidth}
            fill="transparent"
          />

          {/* Dynamic Progress Arc */}
          {progress > 0 && (
            <Circle
              cx={circleSize / 2}
              cy={circleSize / 2}
              r={radius}
              stroke="url(#progressGradient)"
              strokeWidth={strokeWidth}
              strokeDasharray={`${circumference} ${circumference}`}
              strokeDashoffset={progressOffset}
              strokeLinecap="round"
              fill="transparent"
              transform={`rotate(-90 ${circleSize / 2} ${circleSize / 2})`}
            />
          )}
        </Svg>

        {/* Percentage Centered */}
        <AppText variant="subtitle" tone="text" style={tw`font-inter-bold`}>
          {progress}%
        </AppText>
      </View>
    </View>
  )
}

type CareTaskItemProps = {
  item: CareTask
  onComplete: (id: string) => void
}

const CareTaskItem = memo(({ item, onComplete }: CareTaskItemProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handlePress = useCallback(async () => {
    if (item.completed || isSubmitting) return
    setIsSubmitting(true)
    try {
      await onComplete(item.id)
    } finally {
      setIsSubmitting(false)
    }
  }, [item.completed, isSubmitting, item.id, onComplete])

  return (
    <Pressable
      onPress={handlePress}
      disabled={item.completed || isSubmitting}
      style={({ pressed }) => [
        tw`flex-row items-center justify-between rounded-2xl px-3 py-3`,
        item.completed ? tw`bg-teal-50/40` : tw`bg-transparent`,
        pressed && !item.completed && !isSubmitting && tw`opacity-70`,
        isSubmitting && tw`opacity-60`,
      ]}
    >
      <View style={tw`flex-1 flex-row items-center gap-3`}>
        {isSubmitting ? (
          <ActivityIndicator size="small" color="#0F766E" style={tw`w-5 h-5`} />
        ) : (
          <Checkbox
            value={item.completed}
            onValueChange={handlePress}
            disabled={item.completed || isSubmitting}
            color={item.completed ? "#0F766E" : undefined}
            style={tw`rounded`}
          />
        )}

        <View style={tw`flex-1`}>
          <AppText
            variant="body"
            tone="text"
            style={[tw`font-inter-semibold`, item.completed && tw`opacity-60`]}
          >
            {item.title}
          </AppText>

          <AppText
            variant="caption"
            tone={item.completed ? "grayish" : "gray"}
            style={[tw`font-inter-regular`, item.completed && tw`opacity-60`]}
          >
            {item.description}
          </AppText>
        </View>
      </View>

      <AppText
        variant="caption"
        tone={item.completed ? "primary" : "grayish"}
        style={tw`font-inter-medium`}
      >
        +{item.xp} XP
      </AppText>
    </Pressable>
  )
})

CareTaskItem.displayName = "CareTaskItem"

type TodaysCareProps = {
  tasks: CareTask[]
  completedCount: number
  earnedXP: number
  onCompleteTask: (id: string) => void
  onViewDetails?: () => void
}

export function TodaysCare({
  tasks,
  completedCount,
  earnedXP,
  onCompleteTask,
  onViewDetails,
}: TodaysCareProps) {
  const renderItem = useCallback(
    ({ item }: { item: CareTask }) => (
      <CareTaskItem item={item} onComplete={onCompleteTask} />
    ),
    [onCompleteTask]
  )

  const keyExtractor = useCallback((item: CareTask) => item.id, [])

  return (
    <View
      style={tw`gap-3 rounded-2xl border border-gray-100 bg-white p-3 shadow-sm`}
    >
      {/* Header */}
      <View style={tw`flex-row items-center justify-between`}>
        <View>
          <AppText variant="body" tone="text" style={tw`font-inter-bold`}>
            Today&apos;s Care
          </AppText>

          <AppText
            variant="caption"
            tone="grayish"
            style={tw`font-inter-regular`}
          >
            {completedCount} of {tasks.length} completed
          </AppText>
        </View>

        <Pressable
          onPress={onViewDetails}
          style={({ pressed }) => [tw`py-1`, pressed && tw`opacity-60`]}
        >
          <AppText
            variant="caption"
            tone="gray"
            style={tw`font-inter-semibold`}
          >
            View details
          </AppText>
        </Pressable>
      </View>

      {/* XP Summary */}
      <View style={tw`self-start rounded-full bg-teal-50 px-2 py-1`}>
        <AppText
          variant="caption"
          tone="primary"
          style={tw`font-inter-semibold`}
        >
          ✨ +{earnedXP} XP earned
        </AppText>
      </View>

      {/* Tasks */}
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`gap-1`}
        removeClippedSubviews={false}
      />
    </View>
  )
}
