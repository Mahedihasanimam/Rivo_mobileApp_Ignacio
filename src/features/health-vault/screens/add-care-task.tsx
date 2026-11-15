import { add } from "@/assets/icons/icons"
import { AppText } from "@/components/ui/app-text"
import TopBackButton from "@/components/ui/app-top-bar"
import { Button } from "@/components/ui/button"
import { Screen } from "@/components/ui/screen"
import tw from "@/lib/tailwind"
import { Image } from "expo-image"
import { router } from "expo-router"
import { memo, useCallback, useState } from "react"
import { FlatList, Pressable, View } from "react-native"
import { SvgXml } from "react-native-svg"

type CareType = {
  id: string
  title: string
  description: string
  image?: string
}

const CARE_TYPES: CareType[] = [
  {
    id: "food",
    title: "Food",
    description: "How many meals per day?",
    image: require("@/assets/health-vault/food.png"),
  },
  {
    id: "water",
    title: "Water",
    description: "How many cups of water?",
    image: require("@/assets/health-vault/water.png"),
  },
  {
    id: "sleep",
    title: "Sleep",
    description: "Total hours of sleep",
    image: require("@/assets/health-vault/sleep.png"),
  },
  {
    id: "medication",
    title: "Medication",
    description: "Add daily medication",
    image: require("@/assets/health-vault/medication.png"),
  },
]

type CareTypeItemProps = {
  item: CareType
  selected: boolean
  onPress: (item: CareType) => void
}

export default function AddCareTaskScreen() {


 
  

  return (
    <Screen>
      <TopBackButton title="Add Care Task" />
      <CareTypeSelector
        onAddCareTask={(task) => {
          if (!task) return

          router.push({
            pathname: "/add-care-task-modal",
            params: {
              type: task.title,
            },
          })
        }}
      />
    </Screen>
  )
}

const CareTypeItem = memo(({ item, selected, onPress }: CareTypeItemProps) => {
  const handlePress = useCallback(() => {
    onPress(item)
  }, [item, onPress])

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        tw`flex-row items-center justify-between rounded-2xl border border-slate-100 bg-white p-4 shadow-sm`,
        selected && tw`border-teal-600 bg-teal-50/40`,
        pressed && tw`opacity-70`,
      ]}
    >
      <View style={tw`flex-1 flex-row items-center gap-3`}>
        {/* Icon */}
        <View style={tw`rounded-xl   items-center justify-center`}>
          <Image source={item.image} style={tw`w-6 h-6`} contentFit="contain" />
        </View>

        {/* Content */}
        <View style={tw`flex-1 gap-0.5`}>
          <AppText variant="body" tone="text" style={tw`font-inter-bold`}>
            {item.title}
          </AppText>

          <AppText
            variant="caption"
            tone="grayish"
            style={tw`font-inter-medium`}
          >
            {item.description}
          </AppText>
        </View>
      </View>

      {/* Selection Icon */}
      <View
        style={tw`bg-primary w-8 h-8 items-center justify-center rounded-full`}
      >
        <SvgXml xml={add} />
      </View>
    </Pressable>
  )
})

CareTypeItem.displayName = "CareTypeItem"

type CareTypeSelectorProps = {
  onAddCareTask?: (selectedTask: CareType | null) => void
}

export function CareTypeSelector({ onAddCareTask }: CareTypeSelectorProps) {
  const [selectedTask, setSelectedTask] = useState<CareType | null>(
    CARE_TYPES[0]
  )

  const handleSelectTask = useCallback((task: CareType) => {
    setSelectedTask(task)
  }, [])

  const handleAddCareTask = useCallback(() => {
    const task = selectedTask || CARE_TYPES[0]
    onAddCareTask?.(task)
  }, [onAddCareTask, selectedTask])

  const renderItem = useCallback(
    ({ item }: { item: CareType }) => (
      <CareTypeItem
        item={item}
        selected={selectedTask?.id === item.id}
        onPress={handleSelectTask}
      />
    ),
    [handleSelectTask, selectedTask?.id]
  )

  const keyExtractor = useCallback((item: CareType) => item.id, [])

  return (
    <View style={tw` flex-col justify-between gap-4 py-2`}>
      <FlatList
        data={CARE_TYPES}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        scrollEnabled={false}
        contentContainerStyle={tw`gap-3`}
        showsVerticalScrollIndicator={false}
        initialNumToRender={4}
        maxToRenderPerBatch={4}
        windowSize={5}
      />

      <Button
        label="Add Care"
        onPress={handleAddCareTask}
      />
    </View>
  )
}
