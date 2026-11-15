import { AppText } from "@/components/ui/app-text"
import tw from "@/lib/tailwind"
import { Image } from "expo-image"
import { Pressable, View } from "react-native"
import type { HealthCard } from "./types"

type HealthCardProps = {
  item: HealthCard
  onPress: () => void
  fullWidth?: boolean
}

export function HealthCardItem({
  item,
  onPress,
  fullWidth = false,
}: HealthCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        tw`rounded-2xl bg-white p-4`,
        fullWidth ? tw`w-full` : tw`flex-1`,
        pressed && tw`opacity-70`,
      ]}
    >
      <View style={tw`flex-row items-start justify-between`}>
        <View style={tw`rounded-xl bg-teal-50 p-2 items-center justify-center`}>
          <Image source={item?.icon} style={tw`w-7 h-7`} contentFit="contain" />
        </View>
      </View>

      <View style={tw`mt-2 gap-1`}>
        <AppText variant="caption" tone="text" style={tw`font-inter-semibold`}>
          {item.title}
        </AppText>

        <View style={tw`flex-row items-center gap-1`}>
          <AppText
            variant="caption"
            tone={item.tone}
            style={tw`font-inter-regular`}
          >
            {item.subtitle}
          </AppText>
        </View>
      </View>
    </Pressable>
  )
}
