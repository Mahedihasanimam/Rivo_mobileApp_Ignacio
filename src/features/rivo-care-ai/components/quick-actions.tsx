import {
  aiBotGree,
  key,
  nutrition,
  symptomIcon,
  training,
} from "@/assets/icons/icons"
import { AppText } from "@/components/ui/app-text"
import tw from "@/lib/tailwind"
import { memo, useCallback } from "react"
import { FlatList, Pressable, View } from "react-native"
import { SvgXml } from "react-native-svg"

type QuickAction = {
  id: string
  title: string
  description: string
  icon: string
  iconColor: string
  iconBg: string
}

const QUICK_ACTIONS: QuickAction[] = [
  {
    id: "symptom-checker",
    title: "Symptom Checker",
    description: "Step-by-step diagnosis",
    icon: symptomIcon,
    iconColor: "#0D9488",
    iconBg: "#F0FDFA",
  },
  {
    id: "ask-question",
    title: "Ask a Question",
    description: "Chat with RivoCare AI",
    icon: aiBotGree,
    iconColor: "#22C55E",
    iconBg: "#F0FDF4",
  },
  {
    id: "nutrition",
    title: "Nutrition Advice",
    description: "Diet & feeding guidance",
    icon: nutrition,
    iconColor: "#F59E0B",
    iconBg: "#FFFBEB",
  },
  {
    id: "training",
    title: "Training Tips",
    description: "Behaviour & obedience",
    icon: training,
    iconColor: "#A855F7",
    iconBg: "#FAF5FF",
  },
]

type QuickActionItemProps = {
  item: QuickAction
  onPress: (item: QuickAction) => void
}

const QuickActionItem = memo(({ item, onPress }: QuickActionItemProps) => {
  const handlePress = useCallback(() => {
    onPress(item)
  }, [item, onPress])

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        tw`flex-1 rounded-2xl border border-black/10 bg-white p-4 shadow-sm`,
        pressed && tw`opacity-70`,
      ]}
    >
      {/* Icon */}
      <View
        style={[
          tw`mb-3 self-start items-center justify-center rounded-xl p-2.5`,
          {
            backgroundColor: item.iconBg,
          },
        ]}
      >
        <SvgXml xml={item.icon} />
      </View>

      {/* Title */}
      <AppText
        variant="body"
        tone="text"
        numberOfLines={1}
        style={tw`font-inter-semibold`}
      >
        {item.title}
      </AppText>

      {/* Description */}
      <AppText
        variant="caption"
        tone="grayish"
        numberOfLines={2}
        style={tw`font-inter-regular mt-1`}
      >
        {item.description}
      </AppText>
    </Pressable>
  )
})

QuickActionItem.displayName = "QuickActionItem"

type QuickActionsProps = {
  onActionPress?: (action: QuickAction) => void
}

export function QuickActions({ onActionPress }: QuickActionsProps) {
  const handleActionPress = useCallback(
    (action: QuickAction) => {
      onActionPress?.(action)
    },
    [onActionPress]
  )

  const renderItem = useCallback(
    ({ item }: { item: QuickAction }) => (
      <QuickActionItem item={item} onPress={handleActionPress} />
    ),
    [handleActionPress]
  )

  const keyExtractor = useCallback((item: QuickAction) => item.id, [])

  return (
    <View style={tw`pt-3 flex-col gap-3`}>
      {/* Section Header */}
      <View style={tw`mb-1.5 flex-row items-center gap-1.5`}>
        <View style={tw`flex-1`}>
          <AppText
            variant="eyebrow"
            tone="default"
            style={tw`font-inter-semibold`}
          >
            Quick Actions
          </AppText>
        </View>

        <SvgXml xml={key} width={16} height={16} />
      </View>

      {/* Actions Grid */}
      <FlatList
        data={QUICK_ACTIONS}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        numColumns={2}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={tw`gap-3`}
        contentContainerStyle={tw`gap-3`}
        initialNumToRender={4}
        maxToRenderPerBatch={4}
        windowSize={3}
        removeClippedSubviews={false}
      />
    </View>
  )
}
