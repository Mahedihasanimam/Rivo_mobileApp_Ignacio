import { AppText } from "@/components/ui/app-text"
import { Card } from "@/components/ui/card"
import tw from "@/lib/tailwind"
import { useAppTheme } from "@/theme/theme-provider"
import { router } from "expo-router"
import { Pressable, View } from "react-native"
import { SvgXml } from "react-native-svg"

const getCheckCircleXml = (color: string) => `
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="10" />
  <polyline points="16 9 10.5 14.5 8 12" />
</svg>
`

const streaks = [
  {
    id: "walk",
    title: "WALK",
    count: 5,
    accentColor: "#F95721",
    bgColor: "#FFF4EF",
    borderColor: "#FDD7C6",
    iconBgColor: "#FEE7DE",
    iconXml: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F95721" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2c-.5 2.5-2 4.5-4 6.5-1.5 1.5-2.5 3.5-2.5 5.5a6.5 6.5 0 0 0 13 0c0-2-1-4-2.5-5.5-2-2-3.5-4-4-6.5z"/><path d="M12 18a2.5 2.5 0 0 0 2.5-2.5c0-1.5-1-2.5-2.5-3.5-1.5 1-2.5 2-2.5 3.5A2.5 2.5 0 0 0 12 18z"/></svg>`,
  },
  {
    id: "training",
    title: "TRAINING",
    count: 3,
    accentColor: "#2F9C8F",
    bgColor: "#EDF7F6",
    borderColor: "#C8EBE6",
    iconBgColor: "#DAF0ED",
    iconXml: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2F9C8F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  },
  {
    id: "care",
    title: "CARE",
    count: 7,
    accentColor: "#2EB84D",
    bgColor: "#EDF9EE",
    borderColor: "#C8F0CC",
    iconBgColor: "#DAF5DE",
    iconXml: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2EB84D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
  },
]

export const StreaksCard = () => {
  const { resolvedTheme } = useAppTheme()
  const isDark = resolvedTheme === "dark"

  return (
    <Card radius="md" style={tw`w-full flex-col`}>
      {/* Header */}
      <View style={tw`flex-row items-center justify-between`}>
        <AppText
          variant="body"
          tone="blackish"
          style={tw`font-inter-bold uppercase`}
        >
          Streaks
        </AppText>

        <AppText variant="caption" tone="gray">
          Tap a card for details
        </AppText>
      </View>

      {/* Streak Cards */}
      <View style={tw`mt-4 flex-row items-center gap-3`}>
        {streaks.map((streak) => (
          <Pressable
            key={streak.id}
            hitSlop={8}
            onPress={() =>
              router.push({
                pathname: "/(modal)/streaks-modal",
                params: {
                  title: streak.id as "walk" | "training" | "care",
                },
              })
            }
            style={({ pressed }) => [
              tw`flex-1 items-center justify-between rounded-2xl border py-4 px-2`,
              {
                backgroundColor: isDark
                  ? `${streak.accentColor}14`
                  : streak.bgColor,
                borderColor: isDark
                  ? `${streak.accentColor}30`
                  : streak.borderColor,
              },
              pressed && tw`opacity-80 scale-[0.98]`,
            ]}
          >
            {/* Top Icon Squircle */}
            <View
              style={[
                tw`h-11 w-11 items-center justify-center rounded-[14px]`,
                {
                  backgroundColor: isDark
                    ? `${streak.accentColor}25`
                    : streak.iconBgColor,
                },
              ]}
            >
              <SvgXml xml={streak.iconXml} width={20} height={20} />
            </View>

            {/* Streak Count */}
            <View style={tw`mt-2 flex-row items-baseline gap-0.5`}>
              <AppText
                style={[
                  tw`text-2xl font-black leading-none`,
                  { color: streak.accentColor },
                ]}
              >
                {streak.count}
              </AppText>
              <AppText
                style={tw`text-xs font-bold text-[#4B5563] dark:text-gray-300`}
              >
                d
              </AppText>
            </View>

            {/* Title */}
            <AppText
              style={[
                tw`mt-1 text-[11px] font-bold uppercase tracking-wider`,
                { color: streak.accentColor },
              ]}
            >
              {streak.title}
            </AppText>

            {/* Bottom Status Checkmark */}
            <View style={tw`mt-3`}>
              <SvgXml
                xml={getCheckCircleXml(streak.accentColor)}
                width={17}
                height={17}
              />
            </View>
          </Pressable>
        ))}
      </View>
    </Card>
  )
}
