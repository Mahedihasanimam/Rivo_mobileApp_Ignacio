import { danger, redRightArrow } from "@/assets/icons/icons"
import { AppText } from "@/components/ui/app-text"
import tw from "@/lib/tailwind"
import { router } from "expo-router"
import { Pressable, View } from "react-native"
import { SvgXml } from "react-native-svg"

export const EmergencyCard = () => {
  return (
    <Pressable
      onPress={() => router.push("/(emergency-vet-help)")}
      style={tw`w-full h-20 mt-6 px-5 py-4 bg-red-500/5 rounded-2xl border border-red-500/20 flex-row items-center gap-4`}
    >
      <View
        style={tw`w-10 h-10 bg-red-500/10 rounded-xl items-center justify-center`}
      >
        <SvgXml xml={danger} />
      </View>

      <View style={tw`flex-1`}>
        <AppText
          variant="body"
          tone="danger"
          style={tw`text-base font-bold leading-4`}
        >
          Emergency Mode
        </AppText>

        <AppText variant="caption" style={tw`mt-1 text-red-600/60 leading-5`}>
          Urgent help, from trusted vet & first aid steps
        </AppText>
      </View>

      <SvgXml xml={redRightArrow} />
    </Pressable>
  )
}
