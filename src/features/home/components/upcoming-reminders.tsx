import { dueIcons, rightArrow, rightArrowDarkMode } from "@/assets/icons/icons"
import { AppText } from "@/components/ui/app-text"
import { Card } from "@/components/ui/card"
import tw from "@/lib/tailwind"
import { useAppTheme } from "@/theme/theme-provider"
import { Pressable, View } from "react-native"
import { SvgXml } from "react-native-svg"

export const UpcomingReminders = () => {
  const { resolvedTheme, colors } = useAppTheme()
  const isDark = resolvedTheme === "dark"

  return (
    <View style={tw`w-full gap-2`}>
      <AppText variant="body" tone="blackish" style={tw`font-inter-bold`}>
        Upcoming Reminders
      </AppText>

      <Pressable style={tw`w-full`}>
        <Card radius="md" style={tw`w-full flex-row items-center gap-3`}>
          {/* Icon Container */}
          <View
            style={{
              backgroundColor: isDark ? colors.cardOverLay : "#FEF2F2",
              padding: 8,
              borderRadius: 12,
            }}
          >
            <SvgXml xml={dueIcons} />
          </View>

          {/* Content */}
          <View style={tw`flex-1`}>
            <AppText
              variant="body"
              tone="blackish"
              style={tw`font-bold leading-5`}
            >
              Vaccination Due
            </AppText>

            <AppText
              variant="caption"
              tone="grayish"
              style={tw`mt-0.5 leading-[16.5px]`}
            >
              Rabies vaccine due in 5 days
            </AppText>
          </View>

          {/* Arrow */}
          <View style={tw`h-5 w-5 items-center justify-center`}>
            <SvgXml
              xml={resolvedTheme === "dark" ? rightArrowDarkMode : rightArrow}
              width={20}
              height={20}
            />
          </View>
        </Card>
      </Pressable>
    </View>
  )
}
