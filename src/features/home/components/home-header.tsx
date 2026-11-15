import { AppText } from "@/components/ui/app-text"
import tw from "@/lib/tailwind"
import { View } from "react-native"

export const HomeHeader = () => {
  return (
    <View style={tw`flex-row items-center justify-between w-full`}>
      {/* Left Content */}
      <View style={tw`flex-1`}>
        <AppText variant="caption" tone="gray" style={tw`font-semibold`}>
          Good morning, Sarah! 👋
        </AppText>

        <AppText variant="title" tone="blackish" style={tw`mt-1`}>
          Today with Butch
        </AppText>
      </View>

      {/* Right Actions */}
      <View style={tw`flex-row items-center gap-2`}>
        {/* Message Button */}
        {/* <View
          style={tw`w-9 h-9 rounded-full overflow-hidden items-center justify-center relative`}
        >
          <View style={tw`absolute inset-0 bg-primary/80`} />

          <SvgXml xml={message} />
        </View> */}

        {/* Notification Button */}
        {/* <View
          style={tw`w-9 h-9 rounded-full overflow-hidden items-center justify-center relative`}
        >
          <View style={tw`absolute inset-0 bg-primary/80`} />

          <SvgXml xml={notification} />

          <View
            style={tw`absolute w-1 h-1 rounded-full bg-white top-2 right-2`}
          />
        </View> */}
      </View>
    </View>
  )
}
