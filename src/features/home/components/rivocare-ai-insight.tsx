import { aiplane, rightArrowDarkMode } from "@/assets/icons/icons"
import { AppText } from "@/components/ui/app-text"
import { Card } from "@/components/ui/card"
import tw from "@/lib/tailwind"
import { View } from "react-native"
import { SvgXml } from "react-native-svg"

export const RivoCareAIInsight = () => {
  return (
    <Card
      radius="md"
      style={tw`w-full flex-col border-l-[3px] border-l-[#2F9C8F]`}
    >
      {/* Header */}
      <View style={tw`flex-row items-center gap-2`}>
        <SvgXml xml={aiplane} />

        <AppText
          variant="caption"
          tone="primary"
          style={tw`font-bold uppercase tracking-[0.94px]`}
        >
          RivoCare AI insight
        </AppText>
      </View>

      {/* Insight */}
      <AppText variant="body" tone="blackish" style={tw``}>
        Great day for Butch! Walk and training both done - keep this rhythm
        going.
      </AppText>

      {/* Action */}
      <View style={tw`flex-row items-center gap-2`}>
        <AppText variant="caption" tone="default" style={tw` opacity-60`}>
          Tap to ask RivoCare AI
        </AppText>
        <SvgXml xml={rightArrowDarkMode} />
      </View>
    </Card>
  )
}
