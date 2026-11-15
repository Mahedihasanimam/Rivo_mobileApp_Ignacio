import { blueTick, walkRewards } from "@/assets/icons/icons"
import { AppText } from "@/components/ui/app-text"
import TopBackButton from "@/components/ui/app-top-bar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Screen } from "@/components/ui/screen"
import tw from "@/lib/tailwind"
import { useAppTheme } from "@/theme/theme-provider"
import { Image } from "expo-image"
import { router } from "expo-router"
import { View } from "react-native"
import { SvgXml } from "react-native-svg"

type ReminderItem3Props = {
  petName?: string
  image?: boolean
  isDark?: boolean
}

export default function WalkRewardsScreen() {
  const { resolvedTheme } = useAppTheme()
  const isDark = resolvedTheme === "dark"
  return (
    <Screen>
      <TopBackButton title="Walk Rewards" />
      <Container />
      <ReminderItem3 image={true} isDark={isDark} />
    </Screen>
  )
}

const Container = () => {
  const rewards = [
    {
      days: "14 Days",
      level: "Level 3",
      xp: "+100 XP",
      icon: blueTick,
      status: "Locked",
    },
    {
      days: "30 Days",
      level: "Level 4",
      xp: "+200 XP",
      icon: blueTick,
      status: "Locked",
    },
    {
      days: "60 Days",
      level: "Level 5",
      xp: "+500 XP",
      icon: blueTick,
      status: "Locked",
    },
  ]

  return (
    <View style={tw`w-full gap-4`}>
      {rewards.map((reward, index) => (
        <Card
          key={`${reward.level}-${index}`}
          radius="md"
          style={[
            tw`w-full flex-row items-center gap-3 px-4 py-4`,
            {
              elevation: 3,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.08,
              shadowRadius: 3,
              borderWidth: 1,
              borderColor: "rgba(0,0,0,0.1)",
            },
          ]}
        >
          {/* Badge */}
          <SvgXml xml={walkRewards} />

          {/* Content */}
          <View style={tw`flex-1 flex-row items-center gap-4`}>
            {/* Level Info */}
            <View style={tw`flex-1 items-start`}>
              <AppText
                variant="caption"
                tone="gray"
                style={tw`font-inter-medium text-[12px]`}
              >
                {reward.days}
              </AppText>

              <AppText
                variant="subtitle"
                tone="blackish"
                style={tw`font-inter-semibold text-[18px]`}
              >
                {reward.level}
              </AppText>

              <AppText
                variant="caption"
                tone="primary"
                style={tw`font-inter-semibold `}
              >
                {reward.xp}
              </AppText>
            </View>

            {/* Status */}
            <View style={tw`w-12 items-center justify-center`}>
              <SvgXml xml={reward.icon} width={23} height={23} />

              {/* <AppText
                variant="caption"
                tone="gray"
                style={tw`font-inter-regular text-[10px] pt-1`}
              >
                {reward.status}
              </AppText> */}
            </View>
          </View>
        </Card>
      ))}
    </View>
  )
}

function ReminderItem3({
  petName = "Butch",
  image,
  isDark,
}: ReminderItem3Props) {
  return (
    <Card
      radius="md"

      style={[
        tw`w-full  px-3 py-3 ${isDark ? "" : "bg-[#F5FDFB] border-[#F3F4F6] border"}`,
        {
          shadowColor: "#2C78DC",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.08,
          shadowRadius: 12,
          elevation: 2,
        },
      ]}
    >
      <View style={tw`w-full flex-row items-start gap-3`}>
        {/* Pet Image */}
        {image ? (
          <Image
            source={require("@/assets/auth-image/home-icon.png")}
            contentFit="cover"
            style={tw`h-[61px] w-[61px] rounded-full`}
          />
        ) : (
          <View style={tw`h-[61px] w-[61px] rounded-full bg-gray-200`} />
        )}

        {/* Content */}
        <View style={tw`flex-1 gap-1  flex-col `}>
          <View style={tw`flex-1 items-start`}>
            <AppText
              variant="body"
              tone="blackish"
              style={tw`font-inter-medium`}
            >
              Ready for a walk?
            </AppText>

            <AppText
              variant="caption"
              tone="textMute"
              style={tw`leading-[18px]`}
            >
              Make sure {petName} is ready and {"you're"} good to go!
            </AppText>
          </View>
          <View style={tw` w-[50%] items-center justify-center`}>
            <Button
              onPress={() => router.push("/(walk-mode)/walk-start")}
              label="Start Walk"
            />
          </View>
        </View>
      </View>
    </Card>
  )
}
