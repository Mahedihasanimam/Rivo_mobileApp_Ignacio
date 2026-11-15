import { trainIcon } from "@/assets/icons/icons"
import { AppText } from "@/components/ui/app-text"
import tw from "@/lib/tailwind"
import { View } from "react-native"
import { SvgXml } from "react-native-svg"

export const TrainHeader = () => {
  return (
    <View>
      <View style={tw`flex-row items-center gap-2`}>
        <View
          style={tw`h-10 w-10 items-center justify-center rounded-2xl bg-teal-600/10 border border-teal-600/20`}
        >
          <SvgXml xml={trainIcon} />
        </View>

        <AppText
          variant="title"
          tone="blackish"
          style={tw`font-inter-bold text-3xl`}
        >
          Train
        </AppText>
      </View>

      <AppText
        variant="body"
        tone="grayish"
        style={tw`mt-1 text-base font-inter-regular`}
      >
        Guided lessons personalized for Pedro
      </AppText>
    </View>
  )
}
