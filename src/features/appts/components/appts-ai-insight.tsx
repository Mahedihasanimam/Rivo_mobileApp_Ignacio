import { planePlusButton } from "@/assets/icons/icons"
import { AppText } from "@/components/ui/app-text"
import tw from "@/lib/tailwind"
import { View } from "react-native"
import { SvgXml } from "react-native-svg"

export const ApptsAiInsight = () => {
  return (
    <View
      style={tw`mt-5 rounded-[18px] border border-primary/20 bg-primary/10 p-4`}
    >
      <View style={tw`flex-row items-start`}>
        <View
          style={tw`h-9 w-9 items-center justify-center rounded-xl bg-primary`}
        >
          <SvgXml xml={planePlusButton} />
        </View>

        <View style={tw`ml-3 flex-1`}>
          <AppText variant="eyebrow" style={tw`text-primary`}>
            RivoCare AI
          </AppText>

          <AppText variant="body" style={tw`mt-1`}>
            {"Pedro's"} vet visit is tomorrow - make sure{" they've"} eaten
            lightly. 🐾
          </AppText>
        </View>
      </View>
    </View>
  )
}
