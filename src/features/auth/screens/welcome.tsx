import { apple, google, rivoWhiteImage } from "@/assets/icons/icons"
import { AppText } from "@/components/ui/app-text"
import { Button } from "@/components/ui/button"
import tw from "@/lib/tailwind"
import { _HEIGHT } from "@/utils/utils"
import { Image } from "expo-image"
import { router } from "expo-router"
import { TouchableOpacity, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { SvgXml } from "react-native-svg"

export default function WelcomeScreen() {
  const { bottom } = useSafeAreaInsets()

  return (
    <View style={tw`flex-1 bg-white`}>
      {/* Image */}
      <View style={tw`w-full flex-1 relative`}>
        <Image
          source={require("@/assets/auth-image/welcome.png")}
          style={tw`w-full h-full`}
          contentFit="cover"
        />

        <View
          style={tw`absolute bottom-6 flex-col gap-2 left-0 right-0 items-center`}
        >
          <AppText variant="title" tone="textWhite">
            Because They Deserve
          </AppText>
          <AppText variant="title" tone="primary">
            The Best Care
          </AppText>
        </View>

        <View
          style={[
            tw`absolute left-0 right-0 items-center justify-center`,
            {
              top: _HEIGHT * 0.1,
            },
          ]}
        >
          <SvgXml xml={rivoWhiteImage} />
          <View style={tw`flex-row items-center justify-center`}>
            <AppText variant="body" tone="textWhite">
              Care
            </AppText>
            <AppText variant="body" tone="textWhite" style={tw`mx-1`}>
              •
            </AppText>
            <AppText variant="body" tone="textWhite">
              Track
            </AppText>
            <AppText variant="body" tone="textWhite" style={tw`mx-1`}>
              •
            </AppText>
            <AppText variant="body" tone="textWhite">
              Love
            </AppText>
          </View>
        </View>
      </View>

      {/* Buttons */}
      <View
        style={[
          tw`w-full bg-wellComeBlack items-center px-10 pt-4`,
          {
            paddingBottom: bottom + 10,
          },
        ]}
      >
        {/* Social + Open Account */}
        <View style={tw`w-full flex-row items-center gap-2`}>
          {/* Google */}
          <View
            style={tw`w-12 h-12 rounded-full bg-white items-center justify-center`}
          >
            <SvgXml xml={google} width={22} height={22} />
          </View>

          {/* Apple */}
          <View
            style={tw`w-12 h-12 rounded-full bg-white items-center justify-center`}
          >
            <SvgXml xml={apple} width={22} height={22} />
          </View>

          {/* Open Account */}
          <View style={tw`flex-1`}>
            <Button
              loading={false}
              size="md"
              label="Open Account"
              // onPress={() => router.push("/basic-commands")}
              // onPress={() => router.push("/login")}
              onPress={() => router.push("/(main)/(tabs)")}
            />
          </View>
        </View>

        {/* Login */}
        <View style={tw`flex-row gap-1 items-center mt-4`}>
          <AppText variant="body" tone="textMute">
            Already have an accounts?
          </AppText>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.push("/signup")}
          >
            <AppText
              variant="body"
              tone="textWhite"
              style={tw`font-inter-bold`}
            >
              Sign in
            </AppText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
