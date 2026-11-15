import { AppText } from "@/components/ui/app-text"
import tw from "@/lib/tailwind"
import { LinearGradient } from "expo-linear-gradient"

import { Image, Pressable, View } from "react-native"

type PromoBannerProps = {
  title?: string
  description?: string
  buttonText?: string
  onPressUpdate?: () => void
}

export default function PromoBanner({
  title = "Free Delivery!",
  description = "Get free delivery on selected orders\nwith Rivo Pro.",
  buttonText = "Update",
  onPressUpdate,
}: PromoBannerProps) {
  return (
    <LinearGradient
      colors={["#006863", "#4BADA5"]}
      locations={[0, 1]}
      style={tw`w-full rounded-lg flex-row items-center justify-between overflow-hidden p-4 shadow-lg`}
    >
      {/* Left Content */}
      <View style={tw`flex-1 gap-3`}>
        <View style={tw`gap-1`}>
          <AppText
            variant="subtitle"
            tone="textWhite"
            style={tw`font-inter-bold`}
          >
            {title}
          </AppText>

          <AppText
            variant="body"
            tone="textWhite"
            style={tw`font-inter-regular`}
          >
            {description}
          </AppText>
        </View>

        <Pressable
          onPress={onPressUpdate}
          style={({ pressed }) => [
            tw`self-start items-center justify-center rounded-full bg-white px-4 py-2 shadow-sm`,
            pressed && tw`opacity-80`,
          ]}
        >
          <AppText
            variant="body"
            tone="primary"
            style={tw`font-inter-semibold`}
          >
            {buttonText}
          </AppText>
        </Pressable>
      </View>

      {/* Right Image */}
      <View style={tw`ml-3 flex-1 items-end justify-center`}>
        <Image
          source={require("@/assets/marketplace/promo-banner.png")}
          resizeMode="contain"
          style={tw`w-32 h-28`}
        />
      </View>
    </LinearGradient>
  )
}
