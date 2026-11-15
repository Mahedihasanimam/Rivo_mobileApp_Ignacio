import {
  blackShareIcon,
  blueTick,
  shareIcon,
  streakIcon,
  xpIcon,
} from "@/assets/icons/icons"
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

export default function EndWalkScreen() {
  return (
    <Screen>
      <TopBackButton title="End Walk" />

      <EndWalk />
    </Screen>
  )
}

const stats = [
  {
    value: "2.35",
    label: "Distance (km)",
  },
  {
    value: "6.2",
    label: "Avg. Speed\n(km/h)",
  },
  {
    value: "00:24:18",
    label: "Duration",
    bordered: true,
    smallValue: true,
  },
  {
    value: "210",
    label: "Calories (kcal)",
  },
]

const rewards = [
  {
    label: "XP",
    value: "+120",
    icon: xpIcon,
  },
  {
    label: "Streak",
    value: "5",
    suffix: " days",
    icon: streakIcon,
  },
]

const EndWalk = () => {
  const { colors, resolvedTheme } = useAppTheme()

  const isDarkMode = resolvedTheme === "dark"

  return (
    <View style={tw`w-full gap-6`}>
      {/* Header */}
      <View style={tw`w-full`}>
        <View style={tw`w-full items-center`}>
          <Image
            source={require("@/assets/auth-image/success-icons.png")}
            style={{
              height: 100.44,
              width: "100%",
            }}
            contentFit="contain"
            accessibilityLabel="Success icon"
          />
        </View>

        <View style={tw`w-full items-center`}>
          <AppText
            variant="title"
            tone="blackish"
            style={tw`font-inter-bold text-center`}
          >
            Walk complete!
          </AppText>

          <AppText
            variant="body"
            tone="gray"
            style={tw`pt-1 font-inter-regular text-center`}
          >
            Great job, Pedro.
          </AppText>
        </View>
      </View>

      {/* XP & Streak */}
      <View style={tw`w-full items-center pt-4`}>
        <View style={tw`flex-row gap-3`}>
          {rewards.map((reward) => (
            <Card
              radius="lg"
              key={reward.label}
              style={[
                tw`w-40 items-center p-3`,
                {
                  borderWidth: 0.73,
                  borderColor: colors.border,
                },
              ]}
            >
              <View style={tw`flex-row items-center gap-1.5`}>
                <SvgXml xml={reward.icon} width={16} height={16} />

                <AppText
                  variant="caption"
                  tone="gray"
                  style={tw`font-inter-bold uppercase`}
                >
                  {reward.label}
                </AppText>
              </View>

              <View style={tw`pt-1`}>
                <AppText
                  variant="subtitle"
                  tone="blackish"
                  style={tw`font-inter-semibold`}
                >
                  {reward.value}

                  {reward.suffix && (
                    <AppText
                      variant="body"
                      tone="gray"
                      style={tw`font-inter-medium`}
                    >
                      {reward.suffix}
                    </AppText>
                  )}
                </AppText>
              </View>
            </Card>
          ))}
        </View>
      </View>

      {/* Walk Statistics */}
      <View style={tw`w-full flex-row items-center gap-4`}>
        {stats.map((stat) => (
          <View
            key={stat.label}
            style={[
              tw`flex-1 items-center`,
              stat.bordered && tw`border-l border-r border-gray-100`,
            ]}
          >
            <AppText
              variant="title"
              tone="blackish"
              style={[
                tw`font-inter-bold text-center`,
                stat.smallValue && tw`text-xl`,
              ]}
            >
              {stat.value}
            </AppText>

            <AppText
              variant="caption"
              style={tw`pt-1 text-[#94A3B8] font-inter-medium text-center`}
            >
              {stat.label}
            </AppText>
          </View>
        ))}
      </View>

      {/* Today's Goal */}
      <Card
        radius="xl"
        border={false}
        style={tw`w-full flex-row items-center justify-between  px-5 pb-5 pt-7 ${
          isDarkMode ? "" : "bg-[#F0F7F4] border-[#F0F7F4] border"
        }`}
      >
        <View style={tw`gap-2`}>
          <View style={tw`flex-row items-center gap-2`}>
            <AppText
              variant="body"
              tone="blackish"
              style={tw`font-inter-semibold`}
            >
              {"Today's Goal"}
            </AppText>

            <View
              style={tw`h-5 w-5 items-center justify-center rounded-full bg-teal-100`}
            >
              <SvgXml xml={blueTick} width={8} height={6} />
            </View>
          </View>

          <View style={tw`flex-row items-center gap-3`}>
            {/* Goal Indicator */}
            <View
              style={tw`h-12 w-8 items-center justify-center gap-1 rounded-full border border-teal-100 bg-teal-50`}
            >
              <View style={tw`h-1.5 w-1.5 rounded-full bg-teal-600`} />

              <View style={tw`h-2 w-0.5 bg-teal-200`} />

              <View
                style={tw`h-1.5 w-1.5 items-center justify-center rounded-full bg-teal-600`}
              >
                <View style={tw`h-0.5 w-0.5 rounded-full bg-white`} />
              </View>
            </View>

            <View>
              <AppText
                variant="caption"
                tone="gray"
                style={tw`font-inter-medium`}
              >
                Distance
              </AppText>

              <AppText
                variant="subtitle"
                tone="blackish"
                style={tw`font-inter-bold`}
              >
                2.5 km
              </AppText>
            </View>
          </View>
        </View>

        {/* Completed */}
        <View style={tw`items-end gap-1`}>
          <AppText variant="caption" tone="gray" style={tw`font-inter-medium`}>
            Completed
          </AppText>

          <AppText variant="title" tone="blackish" style={tw`font-inter-bold`}>
            100%
          </AppText>
        </View>
      </Card>

      {/* XP Result */}
      <Card
        radius="md"
        style={[
          tw`w-full flex-row items-center justify-between  p-4`,
          {
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.1,
            shadowRadius: 3,
            elevation: 2,
            borderWidth: 1,
            borderColor: colors.border,
          },
        ]}
      >
        <View style={tw`gap-1`}>
          <AppText
            variant="subtitle"
            tone="blackish"
            style={tw`font-inter-bold`}
          >
            +120 XP
          </AppText>

          <AppText variant="body" tone="gray" style={tw`font-inter-regular`}>
            <AppText style={tw`font-inter-bold`}>Level 2</AppText> Awesome
            effort!
          </AppText>
        </View>

        <Image
          source={require("@/assets/auth-image/home-icon.png")}
          contentFit="cover"
          style={tw`h-[61px] w-[61px] rounded-full`}
        />
      </Card>

      {/* Actions */}
      <View style={tw`w-full gap-3`}>
        <Button
          onPress={() => router.push("/walk-history")}
          label="Save Walk"
        />
        <Button
          leftIcon={isDarkMode ? blackShareIcon : shareIcon}
          variant="ghost"
          label="   Share to Social Feed"
        />
      </View>
    </View>
  )
}
