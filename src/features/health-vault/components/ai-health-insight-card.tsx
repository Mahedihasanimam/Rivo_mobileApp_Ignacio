import { AppText } from "@/components/ui/app-text"
import tw from "@/lib/tailwind"
import { Image } from "expo-image"
import { useRouter } from "expo-router"
import { Pressable, View } from "react-native"

type AIHealthInsightCardProps = {
  insight?: string
}

export function AIHealthInsightCard({ insight }: AIHealthInsightCardProps) {
  const router = useRouter()

  return (
    <View
      style={tw`flex-row items-center justify-between gap-3 rounded-2xl border border-gray-100 bg-white p-3`}
    >
      <View style={tw`flex-1 flex-row items-center gap-3`}>
        <View
          style={tw`rounded-full bg-teal-50 p-2.5 items-center justify-center`}
        >
          <Image
            source={require("@/assets/health-vault/aI-health.png")}
            style={tw`w-6 h-6`}
            contentFit="contain"
          />
        </View>

        <View style={tw`flex-1`}>
          <AppText
            variant="caption"
            tone="text"
            style={tw`font-inter-semibold`}
          >
            AI Health Insights
          </AppText>

          <AppText
            variant="caption"
            tone="grayish"
            style={tw`font-inter-regular`}
          >
            {insight || "Upgrade Plan to Rivo Plus or Pro"}
          </AppText>
        </View>
      </View>

      <Pressable
        onPress={() => router.push("/membership" as never)}
        style={({ pressed }) => [
          tw`rounded-full bg-[#0D9488] px-4 py-2`,
          pressed && tw`opacity-70`,
        ]}
      >
        <AppText variant="caption" tone="textWhite" style={tw`font-inter-bold`}>
          Upgrade
        </AppText>
      </Pressable>
    </View>
  )
}
