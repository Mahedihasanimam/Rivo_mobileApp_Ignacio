import { logout } from "@/assets/icons/icons"
import { AppText } from "@/components/ui/app-text"
import TopHandler from "@/components/ui/top-handler"
import tw from "@/lib/tailwind"
import { appToast } from "@/lib/toast/app-toast"
import { router } from "expo-router"
import { Pressable, View } from "react-native"
import { SvgXml } from "react-native-svg"

export default function LogOutModal() {
  const handleLogOut = () => {
    appToast.info("Logged out successfully.")
    router.dismissAll()
    router.replace("/(auth)/welcome")
  }

  const handleCancel = () => {
    router.back()
  }

  return (
    <View style={tw`bg-white  pb-6 gap-5`}>
      <TopHandler />

      {/* Header Icon & Title */}
      <View style={tw`items-center gap-2 pt-2`}>
        <View
          style={tw`w-14 h-14 rounded-full bg-red-50 items-center justify-center`}
        >
          <SvgXml xml={logout} width={28} height={28} />
        </View>

        <AppText
          variant="subtitle"
          tone="blackish"
          style={tw`font-inter-semibold text-lg text-center`}
        >
          Log Out
        </AppText>
        <AppText
          variant="caption"
          tone="gray"
          style={tw`font-inter-regular text-center px-4`}
        >
          Are you sure you want to log out? You will need to log back in to
          access your pets and activities.
        </AppText>
      </View>

      {/* Action Buttons */}
      <View style={tw`gap-3 pt-2`}>
        <Pressable
          onPress={handleLogOut}
          style={({ pressed }) => [
            tw`w-full py-3.5 bg-red-600 rounded-2xl items-center justify-center`,
            pressed && tw`opacity-80`,
          ]}
        >
          <AppText
            variant="body"
            tone="textWhite"
            style={tw`font-inter-semibold text-base`}
          >
            Log Out
          </AppText>
        </Pressable>

        <Pressable
          onPress={handleCancel}
          style={({ pressed }) => [
            tw`w-full py-3.5 bg-gray-100 rounded-2xl items-center justify-center`,
            pressed && tw`opacity-80`,
          ]}
        >
          <AppText
            variant="body"
            tone="blackish"
            style={tw`font-inter-medium text-base`}
          >
            Cancel
          </AppText>
        </Pressable>
      </View>
    </View>
  )
}
