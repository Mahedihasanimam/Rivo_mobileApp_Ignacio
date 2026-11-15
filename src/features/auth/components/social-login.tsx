import { apple, appleDark, google } from "@/assets/icons/icons"
import { AppText } from "@/components/ui/app-text"
import tw from "@/lib/tailwind"
import { useAppTheme } from "@/theme/theme-provider"
import { View } from "react-native"
import { SvgXml } from "react-native-svg"

export function SocialLogin() {
  const { colors, resolvedTheme } = useAppTheme()
  const isDarkMode = resolvedTheme === "dark"

  return (
    <>
      {/* Or Continue With */}
      <View style={tw`w-full flex-row py-1 items-center gap-5`}>
        {/* Left Line */}
        <View style={tw`h-px flex-1 bg-[${colors.border}]`} />

        {/* Text */}
        <AppText
          variant="caption"
          tone="blackish"
          style={tw`font-inter-regular`}
        >
          Or Continue With
        </AppText>

        {/* Right Line */}
        <View style={tw`h-px flex-1 bg-[${colors.border}]`} />
      </View>

      {/* Social Login */}
      <View style={tw`w-full flex-row items-center gap-4`}>
        {/* Google */}
        <View
          style={tw`flex-1 overflow-hidden rounded-full border border-[${colors.border}] px-4 py-[11px]`}
        >
          <View
            style={tw`h-6 w-full flex-row items-center justify-center gap-2`}
          >
            <SvgXml xml={google} />

            <AppText
              variant="caption"
              tone="subTitle"
              style={tw`font-inter-regular`}
            >
              Google
            </AppText>
          </View>
        </View>

        {/* Apple */}
        <View
          style={tw`flex-1 overflow-hidden rounded-full border border-[${colors.border}] px-4 py-[11px]`}
        >
          <View
            style={tw`h-6 w-full flex-row items-center justify-center gap-2`}
          >
            <SvgXml xml={isDarkMode ? appleDark : apple} />

            <AppText
              variant="caption"
              tone="subTitle"
              style={tw`font-inter-regular`}
            >
              Apple
            </AppText>
          </View>
        </View>
      </View>
    </>
  )
}
