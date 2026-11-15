import { key, keyWhite } from "@/assets/icons/icons"
import { AppText } from "@/components/ui/app-text"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import tw from "@/lib/tailwind"
import { useAppTheme } from "@/theme/theme-provider"
import { View } from "react-native"
import { SvgXml } from "react-native-svg"

export const AITrainingCoachCard = () => {
  const { colors, resolvedTheme } = useAppTheme()
  const isDark = resolvedTheme === "dark"
  return (
    <Card
      radius="xl"
      style={[
        tw`w-full flex-col gap-3 p-3`,
        {
          shadowColor: "#2C78DC",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.08,
          shadowRadius: 12,
          elevation: 3,
        },
      ]}
    >
      {/* Header */}
      <View style={tw`flex-row items-start gap-3`}>
        {/* Icon */}
        <View
          style={[
            tw`h-12 w-12 items-center justify-center rounded-full `,
            {
              backgroundColor: colors.cardOverLay,
            },
          ]}
        >
          <SvgXml xml={isDark ? keyWhite : key} />
        </View>

        {/* Content */}
        <View style={tw`flex-1`}>
          <AppText variant="caption" tone="primary" style={tw`font-inter-bold`}>
            AI Training Coach
          </AppText>

          <View style={tw`pt-[3px]`}>
            <AppText
              variant="caption"
              tone="grayish"
              style={tw`font-inter-regular`}
            >
              Locked for Free users. Upgrade to unlock all categories.
            </AppText>
          </View>
        </View>
      </View>

      {/* Upgrade Button */}
      <Button label="Upgrade " />
    </Card>
  )
}
