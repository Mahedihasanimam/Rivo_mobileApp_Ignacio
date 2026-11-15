import {
  bookmarkIcon,
  bookmarkIconWhite,
  circleTick,
  playIcon,
  time,
  timeWhite,
} from "@/assets/icons/icons"
import { AppText } from "@/components/ui/app-text"
import TopBackButton from "@/components/ui/app-top-bar"
import { Screen } from "@/components/ui/screen"
import tw from "@/lib/tailwind"
import { useAppTheme } from "@/theme/theme-provider"
import { router } from "expo-router"
import { useState } from "react"
import { FlatList, Pressable, View } from "react-native"
import { SvgXml } from "react-native-svg"

type TrainingItem = {
  id: number
  icon: string
  title: string
  duration: string
  level: string
  active?: boolean
  completed?: boolean
  isNext?: boolean
}

const trainingItems: TrainingItem[] = [
  {
    id: 1,
    icon: "🎯",
    title: 'Teach "Sit" Command',
    duration: "10 min",
    level: "Beginner",
    completed: true,
  },
  {
    id: 2,
    icon: "🎯",
    title: 'Teach "Down" Command',
    duration: "10 min",
    level: "Beginner",
    isNext: true,
    completed: false,
  },
  {
    id: 3,
    icon: "🧠",
    title: "Crate Training Basics",
    duration: "20 min",
    level: "Beginner",
    completed: false,
  },
  {
    id: 4,
    icon: "💪",
    title: "Fun Fetch Training",
    duration: "15 min",
    level: "Beginner",
    completed: false,
  },
  {
    id: 5,
    icon: "🧩",
    title: "Introduction to Nose Work",
    duration: "15 min",
    level: "Beginner",
    completed: false,
  },
  {
    id: 6,
    icon: "🎯",
    title: "Clicker Basics",
    duration: "10 min",
    level: "Beginner",
    completed: false,
  },
  {
    id: 7,
    icon: "🎯",
    title: "Focus & Attention",
    duration: "10 min",
    level: "Beginner",
    completed: false,
  },
  {
    id: 8,
    icon: "🎯",
    title: "Hand Touch Training",
    duration: "10 min",
    level: "Beginner",
    completed: false,
  },
]

export default function BeginnerTraining() {
  const [activeItem, setActiveItem] = useState<number>(2)
  const { resolvedTheme } = useAppTheme()

  const isDarkMode = resolvedTheme === "dark"

  const handleItemPress = (id: number) => {
    setActiveItem(id)
  }

  const handleActionPress = (id: number) => {
    setActiveItem(id)
    router.push(`/training-tutorial`)
  }

  const renderTrainingItem = ({
    item,
    index,
  }: {
    item: TrainingItem
    index: number
  }) => {
    return (
      <TrainingItemRow
        item={item}
        index={index + 1}
        active={activeItem === item.id}
        onPress={() => handleItemPress(item.id)}
        onActionPress={() => handleActionPress(item.id)}
        isDark={isDarkMode}
      />
    )
  }

  return (
    <Screen scroll={false}>
      <TopBackButton title="Beginner" />

      <FlatList
        data={trainingItems}
        renderItem={renderTrainingItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`gap-[9px]`}
        ItemSeparatorComponent={() => (
          <View style={tw`h-[1px] bg-[#0000001A]`} />
        )}
      />
    </Screen>
  )
}

const TrainingRank = ({
  index,
  completed,
  isDark,
}: {
  index: number
  completed?: boolean
  isDark?: boolean
}) => {
  if (index === 1) {
    return (
      <View
        style={tw`h-7 w-7 items-center justify-center rounded-full bg-[#34C759]`}
      >
        <SvgXml xml={circleTick} />
      </View>
    )
  }

  return (
    <View
      style={[
        tw`h-7 w-7 items-center justify-center rounded-full border`,
        {
          backgroundColor:
            index === 2 ? "#2F9C8F" : `${isDark ? "#2F9C8F26" : "#F0F4F3"}`,
          borderColor: index === 2 ? "#2F9C8F" : "rgba(0,0,0,0.10)",
        },
      ]}
    >
      <AppText
        variant="caption"
        style={[
          tw`font-inter-bold`,
          {
            color:
              index === 2 ? "#FFFFFF" : `${isDark ? "#E7E7E7" : "#00000099"}`,
          },
        ]}
      >
        {index}
      </AppText>
    </View>
  )
}

const TrainingIcon = ({ icon }: { icon: string }) => {
  return (
    <View style={tw`w-7 items-center justify-center`}>
      <AppText style={tw`font-inter-regular text-xl`}>{icon}</AppText>
    </View>
  )
}

const MetaInfo = ({
  duration,
  level,
  isDark,
}: {
  duration: string
  level: string
  isDark?: boolean
}) => {
  return (
    <View style={tw`mt-0.5 flex-row items-center gap-1.5`}>
      {/* Clock icon */}
      <SvgXml xml={isDark ? timeWhite : time} />

      <AppText
        variant="caption"
        tone="blackish"
        style={tw`font-inter-regular `}
      >
        {duration}
      </AppText>

      <AppText variant="caption" style={tw`font-inter-medium text-[#34C759]`}>
        {level}
      </AppText>
    </View>
  )
}

const ActionButton = ({
  active,
  onPress,
  isDark,
}: {
  active: boolean
  onPress: () => void
  isDark: boolean
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        tw`h-[30px] w-[30px] items-center justify-center rounded-lg`,
        {
          backgroundColor: active
            ? "#2F9C8F"
            : isDark
              ? "#2F9C8F26"
              : "#F0F4F3",
          borderWidth: active ? 0 : 1,
          borderColor: "rgba(0,0,0,0.10)",
        },
      ]}
    >
      {active ? (
        <SvgXml xml={playIcon} />
      ) : (
        <SvgXml xml={isDark ? bookmarkIconWhite : bookmarkIcon} />
      )}
    </Pressable>
  )
}

const TrainingItemRow = ({
  item,
  index,
  active,
  onPress,
  onActionPress,
  isDark,
}: {
  item: TrainingItem
  index: number
  active: boolean
  onPress: () => void
  onActionPress: () => void
  isDark: boolean
}) => {
  return (
    <Pressable onPress={onPress} style={tw`flex-row items-center gap-3 py-3`}>
      <TrainingRank index={index} completed={item.completed} isDark={isDark} />

      <TrainingIcon icon={item.icon} />

      <View style={tw`min-w-0 flex-1`}>
        <View style={tw`flex-row items-center gap-1.5`}>
          <AppText
            numberOfLines={1}
            style={[
              tw`font-inter-medium `,
              item.isNext && tw`font-inter-medium`,
            ]}
          >
            {item.title}
          </AppText>

          {item.isNext && (
            <View style={tw`rounded-full bg-[#2F9C8F]/10 px-1.5 py-0.5`}>
              <AppText
                variant="caption"
                style={tw`font-inter-semibold text-primary`}
              >
                NEXT
              </AppText>
            </View>
          )}
        </View>

        <MetaInfo isDark={isDark} duration={item.duration} level={item.level} />
      </View>

      <View style={tw`flex-row items-center gap-1.5`}>
        <ActionButton
          active={item.completed ?? false}
          onPress={onActionPress}
          isDark={isDark}
        />

        {index !== 1 && (
          <ActionButton
            active={active}
            onPress={onActionPress}
            isDark={isDark}
          />
        )}
      </View>
    </Pressable>
  )
}
