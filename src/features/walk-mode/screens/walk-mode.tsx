import TopBackButton from "@/components/ui/app-top-bar"
import { Screen } from "@/components/ui/screen"
import { Image, View } from "react-native"

import {
  resetButton,
  rightArrow,
  rightArrowDarkMode,
} from "@/assets/icons/icons"
import { AppText } from "@/components/ui/app-text"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import tw from "@/lib/tailwind"
import { useAppTheme } from "@/theme/theme-provider"
import { router } from "expo-router"
import { SvgXml } from "react-native-svg"

export default function WalkModeScreen() {
  const { colors, resolvedTheme } = useAppTheme()
  const isDark = resolvedTheme === "dark"
  return (
    <Screen>
      <TopBackButton title="Walk Mode" />
      <ReminderItem3 image={true} isDark={isDark} />
      <Container />
      <Tracking />

      <Button
        onPress={() => router.push("/walk-rewards")}
        variant="primary"
        label="Start Walk"
        style={{
          elevation: 4,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.25,
          shadowRadius: 4,
        }}
      />
      <Button
        onPress={() => router.push("/walk-rewards")}
        variant="ghost"
        label="Walk Rewards"
        style={{
          elevation: 4,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.25,
          shadowRadius: 4,
        }}
      />
    </Screen>
  )
}

type ReminderItem3Props = {
  petName?: string
  image?: boolean
  isDark?: boolean
}

function ReminderItem3({
  petName = "Butch",
  image,
  isDark,
}: ReminderItem3Props) {
  return (
    <Card
      radius="md"
      style={tw` ${isDark ? "" : "bg-[#F5FDFB] border-[#F3F4F6] border"}`}
    >
      <View style={tw`w-full flex-row items-center gap-3`}>
        {/* Pet Image */}
        {image ? (
          <Image
            source={require("@/assets/auth-image/home-icon.png")}
            resizeMode="cover"
            style={tw`h-[61px] w-[61px] rounded-full`}
          />
        ) : (
          <View style={tw`h-[61px] w-[61px] rounded-full bg-gray-200`} />
        )}

        {/* Content */}
        <View style={tw`flex-1 items-start`}>
          <AppText variant="body" tone="blackish" style={tw`font-inter-medium`}>
            Ready for a walk?
          </AppText>

          <AppText variant="caption" tone="textMute">
            Make sure {petName} is ready and {"you're"} good to go!
          </AppText>
        </View>
      </View>
    </Card>
  )
}

const Container = ({ isDark }: { isDark?: boolean }) => {
  return (
    <Card radius="md" border={false}>
      {/* Header */}
      <View style={tw`w-full items-start`}>
        <AppText variant="caption" tone="blackish" style={tw`font-inter-bold`}>
          {"Today's Goal"}
        </AppText>
      </View>

      {/* Statistics */}
      <View style={tw`w-full flex-row pt-3.5`}>
        {/* Steps */}
        <View style={tw`flex-1 items-center`}>
          <AppText variant="body" tone="blackish" style={tw`font-inter-black`}>
            1,200
          </AppText>

          <AppText
            variant="caption"
            tone="gray"
            style={tw`font-inter-semibold `}
          >
            Steps
          </AppText>
        </View>

        {/* Distance */}
        <View style={tw`flex-1 items-center`}>
          <AppText variant="body" tone="blackish" style={tw`font-inter-black `}>
            0.9 km
          </AppText>

          <AppText
            variant="caption"
            tone="grayish"
            style={tw`font-inter-semibold `}
          >
            Distance
          </AppText>
        </View>

        {/* Calories */}
        <View style={tw`flex-1 items-center`}>
          <AppText variant="body" tone="blackish" style={tw`font-inter-black`}>
            128
          </AppText>

          <AppText
            variant="caption"
            tone="grayish"
            style={tw`font-inter-semibold `}
          >
            Calories
          </AppText>
        </View>
      </View>
    </Card>
  )
}

const Tracking = () => {
  const { colors, resolvedTheme } = useAppTheme()
  const isDark = resolvedTheme === "dark"
  return (
    <Card
      radius="md"
      style={tw`w-full flex-row items-center justify-between p-3`}
    >
      {/* Left Content */}
      <View style={tw`flex-row items-center gap-3`}>
        {/* Icon */}
        <View
          style={[
            tw`h-9 w-9 items-center justify-center rounded-full`,
            {
              backgroundColor: "rgba(47,156,143,0.12)",
            },
          ]}
        >
          <SvgXml xml={resetButton} />
        </View>

        {/* Text */}
        <View style={tw`items-start`}>
          <AppText
            variant="body"
            tone="blackish"
            style={tw`font-inter-semibold`}
          >
            Walk History
          </AppText>

          <AppText variant="caption" tone="gray" style={tw`font-inter-regular`}>
            18.4 km · 6 walks this week
          </AppText>
        </View>
      </View>

      {/* Arrow */}
      <SvgXml xml={isDark ? rightArrowDarkMode : rightArrow} />
    </Card>
  )
}
