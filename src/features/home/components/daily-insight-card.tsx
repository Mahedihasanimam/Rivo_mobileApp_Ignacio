import {
  aiplane,
  refreshDark,
  refreshWhite,
  rightArrow,
  rightArrowWhite,
  time,
  timeWhite,
} from "@/assets/icons/icons"
import { AppText } from "@/components/ui/app-text"
import { Card } from "@/components/ui/card"
import { Divider } from "@/components/ui/divider"
import tw from "@/lib/tailwind"
import { useAppTheme } from "@/theme/theme-provider"
import { Pressable, View } from "react-native"
import { SvgXml } from "react-native-svg"

export type DailyInsightCardProps = {
  petName?: string
  onRefresh?: () => void
  onPress?: () => void
}

export function DailyInsightCard({
  petName = "Butch",
  onRefresh,
  onPress,
}: DailyInsightCardProps) {
  const { resolvedTheme } = useAppTheme()

  return (
    <Pressable onPress={onPress} style={tw`w-full`}>
      <Card radius="md" style={tw`w-full flex-col bg-[#2F9C8F1F]`}>
        {/* Header */}
        <View style={tw`flex-row items-center justify-between`}>
          <View style={tw`flex-row gap-2 items-center flex-1`}>
            <SvgXml xml={aiplane} />

            <AppText
              variant="caption"
              tone="primary"
              style={tw`font-inter-bold`}
            >
              DAILY INSIGHT
            </AppText>
          </View>

          <View style={tw`flex-row items-center gap-3`}>
            <Pressable
              onPress={onRefresh}
              hitSlop={10}
              style={tw`items-center justify-center`}
            >
              <SvgXml
                xml={resolvedTheme === "dark" ? refreshWhite : refreshDark}
              />
            </Pressable>

            <SvgXml
              xml={resolvedTheme === "dark" ? rightArrowWhite : rightArrow}
            />
          </View>
        </View>

        {/* Main Insight */}
        <View style={tw` flex-row`}>
          {/* Pet Icons */}
          {/* <SvgXml xml={Butch} /> */}

          {/* Content */}
          <View style={tw`flex-1`}>
            <AppText
              variant="body"
              tone="blackish"
              numberOfLines={2}
              style={tw`font-inter-semibold`}
            >
              {petName} is in great shape this week
            </AppText>

            <AppText variant="body" tone="grayish">
              Everything looks consistent - walks, meals, and rest are
              well-balanced. Keep up the routine.
            </AppText>
          </View>
        </View>

        {/* Divider */}
        <Divider />

        {/* Footer */}
        <View style={tw` flex-row items-center justify-between`}>
          {/* <View style={tw`flex-row items-center gap-2`}>
            <SvgXml xml={redHeard} />

            <AppText
              variant="caption"
              tone="blackish"
              style={tw`font-inter-semibold`}
            >
              Healthy
            </AppText>
          </View> */}

          <View style={tw`flex-row items-center gap-2`}>
            <SvgXml xml={resolvedTheme === "dark" ? timeWhite : time} />

            <AppText
              variant="caption"
              tone="blackish"
              style={tw`font-inter-regular`}
            >
              Today
            </AppText>
          </View>
        </View>
      </Card>
    </Pressable>
  )
}
