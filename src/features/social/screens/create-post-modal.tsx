import {
  photoIcon,
  rightArrow,
  rightArrowDark,
  trainingIcons,
  videoIcon,
  walkSummaryIcon,
} from "@/assets/icons/icons"

import { AppText } from "@/components/ui/app-text"
import { Card } from "@/components/ui/card"
import TopHandler from "@/components/ui/top-handler"

import tw from "@/lib/tailwind"
import { useAppTheme } from "@/theme/theme-provider"
import { router } from "expo-router"

import { Pressable, View } from "react-native"
import { SvgXml } from "react-native-svg"

type ShareOption = {
  id: string
  title: string
  description: string
  icon: string
  iconBackground: string
}

const SHARE_OPTIONS: ShareOption[] = [
  {
    id: "photo",
    title: "Photo",
    description: "Share a pet photo",
    icon: photoIcon,
    iconBackground: "#DCFCE7",
  },
  {
    id: "video",
    title: "Video",
    description: "Share a pet video",
    icon: videoIcon,
    iconBackground: "#F3E8FF",
  },
  {
    id: "walk",
    title: "Walk Summary",
    description: "Share your walk stats",
    icon: walkSummaryIcon,
    iconBackground: "#CCFBF1",
  },
  {
    id: "training",
    title: "Training Achievement",
    description: "Share training progress",
    icon: trainingIcons,
    iconBackground: "#FFEDD5",
  },
]

type ShareOptionCardProps = {
  item: ShareOption
  onPress?: () => void
}

const ShareOptionCard = ({ item, onPress }: ShareOptionCardProps) => {
  const { colors, resolvedTheme } = useAppTheme()
  const isDark = resolvedTheme === "dark"
  return (
    <Card radius="md" style={tw`p-0 overflow-hidden`}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          tw`flex-row items-center justify-between p-4`,
          pressed && tw`opacity-70`,
        ]}
      >
        {/* Left Content */}
        <View style={tw`flex-1 flex-row items-center gap-4`}>
          {/* Icon */}
          <View
            style={[
              tw`aspect-square  items-center justify-center rounded-full`,
              {
                backgroundColor: item.iconBackground,
              },
            ]}
          >
            <SvgXml xml={item.icon} />
          </View>

          {/* Text */}
          <View style={tw`flex-1`}>
            <AppText
              variant="body"
              tone="blackish"
              style={tw`font-inter-semibold`}
            >
              {item.title}
            </AppText>

            <AppText
              variant="caption"
              tone="subTitle"
              style={tw`font-inter-regular`}
            >
              {item.description}
            </AppText>
          </View>
        </View>

        {/* Arrow */}
        <View style={tw`ml-4`}>
          <SvgXml
            xml={isDark ? rightArrowDark : rightArrow}
            width={20}
            height={20}
          />
        </View>
      </Pressable>
    </Card>
  )
}

export default function CreatePostModal() {
  const handleOptionPress = (item: ShareOption) => {
    console.log("Selected:", item.id)

    if (item.id === "walk") {
      return router.push("/walk-summary")
    } else if (item.id === "photo") {
      return router.push("/(modal)/upload-post-modal")
    }

    // Navigation / Action এখানে করবেন
    // router.push(...)
  }

  return (
    <View style={tw`gap-3`}>
      <TopHandler />

      {SHARE_OPTIONS.map((item) => (
        <ShareOptionCard
          key={item.id}
          item={item}
          onPress={() => handleOptionPress(item)}
        />
      ))}
    </View>
  )
}
