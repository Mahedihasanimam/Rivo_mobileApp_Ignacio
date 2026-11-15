import { memo } from "react"
import { View } from "react-native"
import { FlashList } from "@shopify/flash-list"
import { AppText } from "@/components/ui/app-text"
import tw from "@/lib/tailwind"

type TrainingItem = {
  id: string
  title: string
  level: string
  progress: string
  status: string
  height: number
}

const TRAINING_DATA: TrainingItem[] = [
  {
    id: "1",
    title: "Sit & Stay",
    level: "Basic Commands",
    progress: "100%",
    status: "Mastered 🏆",
    height: 190,
  },
  {
    id: "2",
    title: "Paw Shake",
    level: "Intermediate Commands",
    progress: "80%",
    status: "In Progress ⚡",
    height: 230,
  },
  {
    id: "3",
    title: "Heel Walk",
    level: "Advanced Obedience",
    progress: "60%",
    status: "Learning 📖",
    height: 200,
  },
  {
    id: "4",
    title: "Leave It",
    level: "Safety Commands",
    progress: "95%",
    status: "Mastered 🏆",
    height: 210,
  },
]

export const TrainingTab = memo(() => {
  return (
    <View style={tw`pt-2`}>
      <FlashList
        data={TRAINING_DATA}
        numColumns={2}
        masonry
        scrollEnabled={false}
        renderItem={({ item }: { item: TrainingItem }) => (
          <View style={tw`p-1.5`}>
            <View
              style={[
                tw`bg-white rounded-2xl p-4 border border-gray-100 shadow-sm gap-2 justify-between`,
                { height: item.height, borderRadius: 16 },
              ]}
            >
              <View style={tw`flex-row items-center justify-between`}>
                <View style={tw`bg-[#0F9C8F]/10 px-2 py-0.5 rounded-full`}>
                  <AppText
                    variant="caption"
                    tone="primary"
                    style={tw`font-inter-semibold text-[10px]`}
                  >
                    {item.status}
                  </AppText>
                </View>
              </View>

              <View style={tw`gap-1`}>
                <AppText
                  variant="body"
                  tone="blackish"
                  style={tw`font-inter-bold text-sm`}
                >
                  {item.title}
                </AppText>
                <AppText
                  variant="caption"
                  tone="grayish"
                  style={tw`font-inter-regular text-xs`}
                >
                  {item.level}
                </AppText>
              </View>

              <View style={tw`gap-1`}>
                <View
                  style={tw`w-full bg-gray-100 h-1.5 rounded-full overflow-hidden`}
                >
                  <View
                    style={[
                      tw`bg-[#0F9C8F] h-full rounded-full`,
                      { width: item.progress as any },
                    ]}
                  />
                </View>
                <AppText
                  variant="caption"
                  tone="grayish"
                  style={tw`font-inter-medium text-[10px] text-right`}
                >
                  {item.progress}
                </AppText>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  )
})

TrainingTab.displayName = "TrainingTab"
