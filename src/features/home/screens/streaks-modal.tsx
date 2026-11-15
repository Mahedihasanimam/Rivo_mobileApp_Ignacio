import {
  best,
  careStreak,
  clander,
  clanderWhite,
  closeIcon,
  completedGreen,
  completedWhite,
  trainingStreak,
  walkStreak,
} from "@/assets/icons/icons"
import { AppText } from "@/components/ui/app-text"
import TopHandler from "@/components/ui/top-handler"
import tw from "@/lib/tailwind"
import { useAppTheme } from "@/theme/theme-provider"
import { router, useLocalSearchParams } from "expo-router"
import { Pressable, View } from "react-native"
import { SvgXml } from "react-native-svg"

const weekData = [
  { id: "1", day: "W", completed: false },
  { id: "2", day: "T", completed: false },
  { id: "3", day: "F", completed: false },
  { id: "4", day: "S", completed: false },
  { id: "5", day: "S", completed: true },
  { id: "6", day: "M", completed: true },
  { id: "7", day: "T", completed: true },
]

export default function StreaksCountModal() {
  const { title } = useLocalSearchParams<{
    title: "walk" | "training" | "care"
  }>()

  const { resolvedTheme } = useAppTheme()
  const isDark = resolvedTheme === "dark"

  const streakIcons = {
    walk: walkStreak,
    training: trainingStreak,
    care: careStreak,
  }

  const streakBgColors = {
    walk: isDark ? "bg-[#2F9C8F1A]" : " bg-[#FF9F0A]/10",
    training: isDark ? "bg-[#2F9C8F1A]" : "bg-[#2F9C8F]/10",
    care: isDark ? "bg-[#2F9C8F1A]" : "bg-[#34C7591A]",
  }

  const streakBorderColors = {
    walk: isDark ? "border-[#2F9C8F22]" : " border-[#FF9F0A]/20",
    training: isDark ? "border-[#2F9C8F22]" : "border-[#2F9C8F]/20",
    care: isDark ? "border-[#2F9C8F22]" : "border-[#34C75914]/20",
  }

  const borderColor =
    streakBorderColors[title ?? "walk"] ?? streakBorderColors.walk
  const icon = streakIcons[title ?? "walk"] ?? walkStreak
  const bgColor = streakBgColors[title ?? "walk"] ?? "bg-[#2F9C8F]/10"
  const streakTitleColor = {
    walk: isDark ? "#FFFFFF" : "#FF6B35",
    training: isDark ? "#FFFFFF" : "#2F9C8F",
    care: isDark ? "#FFFFFF" : "#34C759",
  }[title ?? "walk"]

  const completedCellColor = {
    walk: isDark ? "#FF6B35" : "#FF6B35",
    training: isDark ? "#2F9C8F" : "#2F9C8F",
    care: isDark ? "#34C759" : "#34C759",
  }[title ?? "walk"]

  return (
    <View style={tw`flex-1`}>
      {/* Header */}
      <TopHandler />
      <View style={tw`flex-row items-center justify-between`}>
        <View style={tw`flex-row items-center gap-3`}>
          <View
            style={tw`h-12 w-12 items-center justify-center rounded-2xl ${bgColor}`}
          >
            <SvgXml xml={icon} />
          </View>

          <View>
            <AppText
              variant="caption"
              style={[
                tw`font-semibold uppercase tracking-[0.6px]`,
                { color: streakTitleColor },
              ]}
            >
              {title === "walk"
                ? "Walk Streak"
                : title === "training"
                  ? "Training Streak"
                  : "Care Streak"}
            </AppText>

            <AppText variant="caption" tone="grayish" style={tw`mt-0.5`}>
              Consistency tracker
            </AppText>
          </View>
        </View>

        <Pressable
          onPress={() => router.back()}
          style={tw`h-9 w-9 items-center justify-center rounded-full`}
        >
          <SvgXml xml={closeIcon} />
        </Pressable>
      </View>

      {/* Current / Best */}
      <View style={tw`mt-6 flex-row gap-4`}>
        {/* Current */}
        <View
          style={tw`flex-1 items-center rounded-xl border ${borderColor} ${bgColor} px-4 py-5`}
        >
          <AppText
            variant="caption"
            style={[tw`font-semibold uppercase`, { color: streakTitleColor }]}
          >
            Current
          </AppText>

          <View style={tw`flex-row items-center gap-1 my-1`}>
            <AppText
              variant="title"
              style={[tw`font-inter-black`, { color: streakTitleColor }]}
            >
              3
            </AppText>

            <AppText
              variant="caption"
              tone="primary"
              style={[tw`font-inter-medium`, { color: streakTitleColor }]}
            >
              days
            </AppText>
          </View>
          <SvgXml xml={icon} />
        </View>

        {/* Best */}
        <View
          style={tw.style(
            "flex-1 items-center rounded-xl border px-4 py-5",
            isDark
              ? "border-[#2F9C8F22] bg-[#2F9C8F1A]"
              : "border-black/10 bg-[#F0F4F3]"
          )}
        >
          <AppText
            variant="caption"
            tone="grayish"
            style={tw`font-semibold uppercase tracking-[0.56px]`}
          >
            Best
          </AppText>

          <View style={tw`flex-row items-center gap-1 my-1`}>
            <AppText variant="title" tone="blackish" style={tw`font-extrabold`}>
              9
            </AppText>

            <AppText variant="caption" tone="grayish" style={tw`font-medium`}>
              days
            </AppText>
          </View>
          <SvgXml xml={best} />
        </View>
      </View>

      {/* Last Completed */}
      <View
        style={tw.style(
          "mt-6 flex-row items-center justify-between rounded-[14px] border px-4 py-3",
          isDark
            ? "border-[#2F9C8F22] bg-[#2F9C8F1A]"
            : "border-black/10 bg-[#F0F4F3]"
        )}
      >
        <View style={tw`flex-row items-center gap-2`}>
          <SvgXml xml={isDark ? clanderWhite : clander} />
          <AppText variant="caption" tone="grayish">
            Last completed
          </AppText>
        </View>

        <AppText variant="caption" tone="blackish" style={tw`font-semibold`}>
          Jul 21
        </AppText>
      </View>

      {/* Last 7 Days */}
      <View style={tw`mt-6`}>
        <AppText
          variant="caption"
          tone="grayish"
          style={tw`font-semibold uppercase tracking-[0.5px]`}
        >
          Last 7 Days
        </AppText>

        <View style={tw`mt-3 flex-row items-center gap-1`}>
          {weekData.map((item) => (
            <View key={item.id} style={tw`items-center flex-col gap-1.5`}>
              <AppText variant="caption" tone="grayish">
                {item.day}
              </AppText>

              <View
                style={[
                  tw`h-8 w-8 items-center justify-center rounded-lg`,
                  item.completed
                    ? { backgroundColor: completedCellColor }
                    : isDark
                      ? { backgroundColor: "#2F9C8F1A" }
                      : { backgroundColor: "#F0F4F3" },
                ]}
              >
                {item.completed && <SvgXml xml={completedWhite} />}
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Success Message */}
      <View
        style={tw.style(
          "mt-6 self-start rounded-[14px] border px-4 py-3",
          isDark
            ? "border-[#2F9C8F22] bg-[#2F9C8F1A]"
            : "border-[#34C75940] bg-[#34C75914] "
        )}
      >
        <View style={tw`flex-row items-center gap-2`}>
          <SvgXml xml={completedGreen} />
          <AppText
            variant="caption"
            style={tw`font-inter-medium text-[#34C759]`}
          >
            Completed today - streak continues!
          </AppText>
        </View>
      </View>
    </View>
  )
}
