import {
  best,
  comment,
  commentDark,
  Level,
  whiteCup,
} from "@/assets/icons/icons"
import { AppText } from "@/components/ui/app-text"
import { Card } from "@/components/ui/card"
import tw from "@/lib/tailwind"
import { useAppTheme } from "@/theme/theme-provider"
import { router } from "expo-router"
import { Image, Pressable, TouchableOpacity, View } from "react-native"
import { SvgXml } from "react-native-svg"
import type { ActivityItem, ActivityType } from "../types"

type ActivityCardProps = {
  item: ActivityItem
}

export const ActivityCard = ({ item }: ActivityCardProps) => {
  const isWalk = item.type === "walk"
  const { colors, resolvedTheme } = useAppTheme()
  const isDark = resolvedTheme === "dark"

  const getBadgeDetails = (type: ActivityType) => {
    switch (type) {
      case "walk":
        return {
          label: "Walk",
          color: "#30B0C7",
          style: tw`border-[#30B0C725] bg-[#30B0C71C]`,
        }
      case "achievement":
        return {
          label: "Achievement",
          color: "#FF9F0A",
          style: tw`border-[#FF9F0A1C] bg-[#FF9F0A25]`,
        }
      case "training":
        return {
          label: "Training",
          color: "#34C759",
          style: tw`border-[#34C75925] bg-[#34C7591C]`,
        }
      case "milestone":
        return {
          label: "Milestone",
          color: "#AF52DE",
          style: tw`border-[#AF52DE25] bg-[#AF52DE1C]`,
        }
      default:
        return {
          label: "Activity",
          color: "#30B0C7",
          style: tw`border-[#30B0C725] bg-[#30B0C71C]`,
        }
    }
  }

  const badge = getBadgeDetails(item.type)

  return (
    <Card radius="md" style={tw`mb-5 p-0 overflow-hidden`}>
      {/* Banner */}
      {isWalk ? (
        <View style={tw`h-36 w-full relative bg-slate-800 overflow-hidden`}>
          {item.routeImage ? (
            <Image
              source={{
                uri: item.routeImage,
              }}
              resizeMode="cover"
              style={tw`h-full w-full`}
            />
          ) : null}

          <View
            style={tw`absolute top-3 left-3 flex-row items-center gap-1.5 rounded-full border border-white/20 bg-black/50 px-3 py-1.5`}
          >
            <AppText
              variant="caption"
              tone="textWhite"
              style={tw`font-inter-bold`}
            >
              Route
            </AppText>
          </View>
        </View>
      ) : (
        <View
          style={[
            tw`items-center justify-center gap-4 border-b bg-[#FF9F0A18] px-5 py-5`,
            {
              borderColor: colors.border,
            },
          ]}
        >
          <View style={tw`flex-row items-center gap-3`}>
            <SvgXml xml={Level} />

            <View style={tw`items-center`}>
              <AppText
                variant="caption"
                tone="warning"
                style={tw`font-inter-semibold uppercase tracking-wider text-center`}
              >
                +200 XP
              </AppText>

              <AppText
                variant="subtitle"
                tone="blackish"
                style={tw`font-inter-black text-center`}
              >
                Level 2
              </AppText>
            </View>
          </View>
        </View>
      )}

      {/* Content */}
      <View style={tw`px-4 py-4`}>
        {/* Header */}
        <View style={tw`flex-row items-center justify-between`}>
          <TouchableOpacity
            onPress={() => router.push("/(pet-profile)")}
            style={tw`flex-1 flex-row items-center gap-3`}
          >
            <View style={tw`relative`}>
              <Image
                source={{
                  uri: item.avatar,
                }}
                resizeMode="cover"
                style={tw`aspect-square w-11 rounded-full`}
              />
              <View
                style={tw`absolute -bottom-0.5 -right-1.5 w-5 h-5 items-center justify-center bg-[#FF9F0A] rounded-full border-2 border-white`}
              >
                <SvgXml xml={whiteCup} />
              </View>
            </View>

            <View style={tw`flex-1`}>
              <AppText
                variant="body"
                tone="blackish"
                style={tw`font-inter-bold`}
              >
                {item.petName}
              </AppText>

              <AppText
                variant="caption"
                tone="textMute"
                style={tw`font-inter-regular`}
              >
                {item.owner} · {item.time}
              </AppText>
            </View>
          </TouchableOpacity>

          <View
            style={[
              tw`flex-row items-center gap-1.5 rounded-full border px-3 py-1.5`,
              badge.style,
            ]}
          >
            <SvgXml xml={best} />

            <AppText
              variant="caption"
              style={[
                tw`font-inter-semibold`,
                {
                  color: badge.color,
                },
              ]}
            >
              {badge.label}
            </AppText>
          </View>
        </View>

        {/* Description */}
        <View style={tw`mt-4`}>
          <AppText variant="body" tone="blackish" style={tw`font-inter-bold`}>
            {item.title}
          </AppText>

          <AppText
            variant="caption"
            tone="textMute"
            style={tw`font-inter-regular mt-1`}
          >
            {item.description}
          </AppText>
        </View>

        {/* Stats */}
        <View
          style={tw`mt-4 flex-row rounded-full border border-[${colors.border}] bg-[${colors.backButtonBg}] px-3 py-3`}
        >
          {item.stats.map((stat) => (
            <View
              key={`${item.id}-${stat.label}`}
              style={tw`flex-1 items-center`}
            >
              <AppText
                variant="body"
                tone="blackish"
                style={tw`font-inter-black`}
              >
                {stat.value}
              </AppText>

              <AppText
                variant="caption"
                tone="textMute"
                style={tw`font-inter-regular mt-0.5 text-center uppercase`}
              >
                {stat.label}
              </AppText>
            </View>
          ))}
        </View>

        {/* Actions */}
        <View
          style={tw`mt-4 flex-row items-center gap-2 border-t border-black/10 pt-3`}
        >
          <ReactionButton emoji="🐾" value={item.reactions.paws} />
          <ReactionButton emoji="🔥" value={item.reactions.fire} />

          <View style={tw`flex-1`} />

          <Pressable
            style={({ pressed }) => [
              tw`rounded-full border  border-[${colors.border}] bg-[${colors.backButtonBg}] p-2.5`,
              pressed && tw`opacity-60`,
            ]}
          >
            <SvgXml xml={isDark ? commentDark : comment} />
          </Pressable>
        </View>
      </View>
    </Card>
  )
}

type ReactionButtonProps = {
  emoji: string
  value: number
}

const ReactionButton = ({ emoji, value }: ReactionButtonProps) => {
  const { colors } = useAppTheme()
  return (
    <Pressable
      style={({ pressed }) => [
        tw`flex-row items-center gap-1.5 rounded-full border border-[${colors.border}] bg-[${colors.backButtonBg}] px-3 py-2`,
        pressed && tw`opacity-60`,
      ]}
    >
      <AppText variant="caption">{emoji}</AppText>
      <AppText
        variant="caption"
        tone="textMute"
        style={tw`font-inter-semibold`}
      >
        {value}
      </AppText>
    </Pressable>
  )
}
