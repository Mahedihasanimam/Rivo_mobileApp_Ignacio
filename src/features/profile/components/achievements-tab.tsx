import { memo } from "react"
import { View } from "react-native"
import { FlashList } from "@shopify/flash-list"
import { AppText } from "@/components/ui/app-text"
import tw from "@/lib/tailwind"

type AchievementItem = {
  id: string
  icon: string
  title: string
  desc: string
  height: number
}

const ACHIEVEMENTS_DATA: AchievementItem[] = [
  {
    id: "1",
    icon: "🏅",
    title: "Early Bird Walker",
    desc: "Completed 10 morning walks before 8 AM.",
    height: 180,
  },
  {
    id: "2",
    icon: "🦋",
    title: "Social Butterfly",
    desc: "Connected with 15+ pet friends on Rivo.",
    height: 220,
  },
  {
    id: "3",
    icon: "🔥",
    title: "7-Day Streak Master",
    desc: "Logged daily activities 7 days in a row.",
    height: 200,
  },
  {
    id: "4",
    icon: "🎓",
    title: "Trick Master",
    desc: "Mastered 5 basic obedience commands.",
    height: 190,
  },
]

export const AchievementsTab = memo(() => {
  return (
    <View style={tw`pt-2`}>
      <FlashList
        data={ACHIEVEMENTS_DATA}
        numColumns={2}
        masonry
        scrollEnabled={false}
        renderItem={({ item }: { item: AchievementItem }) => (
          <View style={tw`p-1.5`}>
            <View
              style={[
                tw`bg-white rounded-2xl p-4 border border-gray-100 shadow-sm gap-2 justify-between`,
                { height: item.height, borderRadius: 16 },
              ]}
            >
              <View
                style={tw`w-10 h-10 rounded-xl bg-[#0F9C8F]/10 items-center justify-center`}
              >
                <AppText variant="title" style={tw`text-xl`}>
                  {item.icon}
                </AppText>
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
                  style={tw`font-inter-regular text-xs leading-4`}
                >
                  {item.desc}
                </AppText>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  )
})

AchievementsTab.displayName = "AchievementsTab"
