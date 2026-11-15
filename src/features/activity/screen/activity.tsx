import { fireMyLife, firePrimary, tickPrimary } from "@/assets/icons/icons"
import { AppText } from "@/components/ui/app-text"
import TopBackButton from "@/components/ui/app-top-bar"
import { ProgressBar } from "@/components/ui/progress-bar"
import { Screen } from "@/components/ui/screen"
import tw from "@/lib/tailwind"
import { Image } from "expo-image"
import { View } from "react-native"
import { SvgXml } from "react-native-svg"

const TODAY_ACTIVITIES = [
  {
    id: "1",
    title: "Care completed",
    time: "Just now",
    xp: "+10 XP",
  },
  {
    id: "2",
    title: "Walk completed",
    time: "2 hours ago",
    xp: "+30 XP",
  },
  {
    id: "3",
    title: "Training completed",
    time: "4 hours ago",
    xp: "+40 XP",
  },
]

export default function ActivityScreen() {
  return (
    <Screen>
      <TopBackButton title="Activity" />

      <View style={tw`gap-5`}>
        {/* Level & XP Main Card */}
        <View
          style={tw`p-5 bg-white rounded-2xl shadow-sm border border-black/10 items-center gap-2`}
        >
          {/* Badge Icon */}
          <View style={tw`w-20 h-20 items-center justify-center`}>
            <Image
              source={require("@/assets/activity/level.png")}
              style={tw`w-16 h-16`}
              contentFit="contain"
            />
          </View>

          {/* Level & XP Text */}
          <View style={tw`items-center gap-1`}>
            <AppText
              variant="subtitle"
              tone="primary"
              style={tw`font-inter-semibold `}
            >
              Level 4
            </AppText>
            <AppText
              variant="title"
              tone="blackish"
              style={tw` font-inter-bold`}
            >
              1,240 XP
            </AppText>
          </View>

          {/* XP Progress Bar */}
          <View style={tw`w-full pt-3 gap-1.5`}>
            <View
              style={tw`w-full h-2.5 bg-[#FFF0DA] rounded-full overflow-hidden`}
            >
              <View
                style={[
                  tw`h-full bg-[#FFA82F] rounded-full shadow-sm`,
                  { width: "83.3%" },
                ]}
              />
              <ProgressBar value={56} />
            </View>

            <View style={tw`flex-row justify-between items-center pt-1`}>
              <AppText
                variant="caption"
                tone="gray"
                style={tw`font-inter-regular`}
              >
                Good Companion 🐾
              </AppText>
              <View style={tw`flex-row items-center`}>
                <AppText
                  variant="caption"
                  tone="primary"
                  style={tw`font-inter-bold `}
                >
                  1,250{" "}
                </AppText>
                <AppText
                  variant="caption"
                  tone="primary"
                  style={tw`font-inter-regular`}
                >
                  / 1,500 XP
                </AppText>
              </View>
            </View>
          </View>
        </View>

        {/* Activity Summary Cards */}
        <View style={tw`gap-3`}>
          {/* Card 1: Walk Activity */}
          <View
            style={tw`p-4 bg-white rounded-xl shadow-sm border border-zinc-200 justify-between gap-4`}
          >
            <View style={tw`flex-row justify-between items-center`}>
              <View style={tw`  items-center justify-center`}>
                <Image
                  source={require("@/assets/home-image/walk-streak.png")}
                  style={tw`w-11 h-9`}
                  contentFit="contain"
                />
              </View>
              <View
                style={tw`px-2.5 py-1 bg-gray-100 rounded-full flex-row items-center gap-1.5`}
              >
                <SvgXml xml={firePrimary} />
                <AppText
                  variant="caption"
                  tone="grayish"
                  style={tw`font-inter-medium`}
                >
                  4 Day Streak
                </AppText>
              </View>
            </View>

            <View style={tw`gap-1`}>
              <AppText
                variant="body"
                tone="gray"
                style={tw`font-inter-regular text-sm`}
              >
                Walk Activity
              </AppText>
              <View style={tw`flex-row items-baseline gap-1.5`}>
                <AppText
                  variant="hero"
                  tone="primary"
                  style={tw`text-3xl font-inter-bold text-teal-600`}
                >
                  12.4
                </AppText>
                <AppText
                  variant="body"
                  tone="primary"
                  style={tw`font-inter-semibold text-sm text-teal-600`}
                >
                  km
                </AppText>
              </View>
              <AppText
                variant="caption"
                tone="gray"
                style={tw`font-inter-medium `}
              >
                4 walks this week
              </AppText>
            </View>
          </View>

          {/* Card 2: Training Lessons */}
          <View
            style={tw`p-4 bg-white rounded-xl shadow-sm border border-zinc-200 justify-between gap-4`}
          >
            <View style={tw`flex-row justify-between items-center`}>
              <View style={tw`  items-center justify-center`}>
                <Image
                  source={require("@/assets/home-image/training-streak.png")}
                  style={tw`w-11 h-9`}
                  contentFit="contain"
                />
              </View>
              <View
                style={tw`px-2.5 py-1 bg-gray-100 rounded-full flex-row items-center gap-1.5`}
              >
                <SvgXml xml={firePrimary} />
                <AppText
                  variant="caption"
                  tone="grayish"
                  style={tw`font-inter-medium`}
                >
                  2 Day Streak
                </AppText>
              </View>
            </View>

            <View style={tw`gap-1`}>
              <AppText
                variant="body"
                tone="gray"
                style={tw`font-inter-regular text-sm`}
              >
                Training Lessons
              </AppText>
              <View style={tw`flex-row items-baseline gap-1.5`}>
                <AppText
                  variant="hero"
                  tone="primary"
                  style={tw`text-3xl font-inter-bold text-teal-600`}
                >
                  3
                </AppText>
                <AppText
                  variant="body"
                  tone="primary"
                  style={tw`font-inter-semibold text-sm text-teal-600`}
                >
                  sessions
                </AppText>
              </View>
              <AppText
                variant="caption"
                tone="primary"
                style={tw`font-inter-medium text-xs text-teal-600`}
              >
                +120 XP gained
              </AppText>
            </View>
          </View>

          {/* Card 3: Care Tasks */}
          <View
            style={tw`p-4 bg-white rounded-xl shadow-sm border border-zinc-200 justify-between gap-4`}
          >
            <View style={tw`flex-row justify-between items-center`}>
              <View style={tw`  items-center justify-center`}>
                <Image
                  source={require("@/assets/home-image/care-streak.png")}
                  style={tw`w-11 h-9`}
                  contentFit="contain"
                />
              </View>
              <View
                style={tw`px-2.5 py-1 bg-gray-100 rounded-full flex-row items-center gap-1.5`}
              >
                <SvgXml xml={fireMyLife} />
                <AppText
                  variant="caption"
                  tone="grayish"
                  style={tw`font-inter-medium`}
                >
                  5 Day Streak
                </AppText>
              </View>
            </View>

            <View style={tw`gap-1`}>
              <AppText
                variant="body"
                tone="gray"
                style={tw`font-inter-regular text-sm`}
              >
                Care Tasks
              </AppText>
              <View style={tw`flex-row items-baseline gap-1.5`}>
                <AppText
                  variant="hero"
                  tone="primary"
                  style={tw`text-3xl font-inter-bold text-teal-600`}
                >
                  32
                </AppText>
                <AppText
                  variant="body"
                  tone="primary"
                  style={tw`font-inter-semibold text-sm text-teal-600`}
                >
                  completed
                </AppText>
              </View>
              <AppText
                variant="caption"
                tone="primary"
                style={tw`font-inter-medium text-xs text-teal-600`}
              >
                +280 XP gained
              </AppText>
            </View>
          </View>
        </View>

        {/* Today's Activity Section */}
        <View style={tw`gap-3 pt-2`}>
          <AppText
            variant="subtitle"
            tone="blackish"
            style={tw`font-inter-semibold text-lg`}
          >
            {"Today's Activity"}
          </AppText>

          <View
            style={tw`bg-white rounded-xl shadow-sm border border-zinc-200 overflow-hidden`}
          >
            {TODAY_ACTIVITIES.map((activity, index) => (
              <View
                key={activity.id}
                style={[
                  tw`p-4 flex-row justify-between items-center`,
                  index > 0 && tw`border-t border-zinc-200`,
                ]}
              >
                <View style={tw`flex-row items-center gap-3.5`}>
                  <SvgXml xml={tickPrimary} />

                  <View style={tw`gap-0.5`}>
                    <AppText
                      variant="body"
                      tone="blackish"
                      style={tw`font-inter-semibold `}
                    >
                      {activity.title}
                    </AppText>
                    <AppText
                      variant="caption"
                      tone="gray"
                      style={tw`font-inter-regular `}
                    >
                      {activity.time}
                    </AppText>
                  </View>
                </View>

                <AppText
                  variant="caption"
                  tone="primary"
                  style={tw`font-inter-semibold text-sm text-teal-600`}
                >
                  {activity.xp}
                </AppText>
              </View>
            ))}
          </View>
        </View>
      </View>
    </Screen>
  )
}
