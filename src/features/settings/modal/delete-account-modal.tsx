import { AppText } from "@/components/ui/app-text"
import TopHandler from "@/components/ui/top-handler"
import tw from "@/lib/tailwind"
import { appToast } from "@/lib/toast/app-toast"
import { router } from "expo-router"
import { Pressable, View } from "react-native"
import { SvgXml } from "react-native-svg"

const warningIcon = `
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B91C1C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
  <line x1="12" y1="9" x2="12" y2="13"/>
  <line x1="12" y1="17" x2="12.01" y2="17"/>
</svg>
`

export default function DeleteAccountModal() {
  const handleDelete = () => {
    appToast.error("Account permanently deleted.", {
      description: "All user data has been removed.",
    })
    router.dismissAll()
    router.replace("/(auth)/welcome")
  }

  const handleCancel = () => {
    router.back()
  }

  return (
    <View style={tw`bg-white  pb-6 gap-5`}>
      <TopHandler />

      {/* Header Title */}
      <View style={tw`items-center gap-1`}>
        <AppText
          variant="subtitle"
          tone="danger"
          style={tw`font-inter-semibold text-lg text-center`}
        >
          Delete Account
        </AppText>
        <AppText
          variant="caption"
          tone="gray"
          style={tw`font-inter-regular text-center`}
        >
          Are you sure you want to delete your account?
        </AppText>
      </View>

      {/* Warning Alert Box */}
      <View
        style={tw`p-4 bg-red-500/5 rounded-2xl border border-red-500/20 flex-row items-start gap-3`}
      >
        <View style={tw`pt-0.5`}>
          <SvgXml xml={warningIcon} width={18} height={18} />
        </View>

        <AppText
          variant="caption"
          tone="danger"
          style={tw`flex-1 font-inter-regular text-sm text-red-700 leading-5`}
        >
          All your pets, walks, training history, and data will be permanently
          deleted. Your subscription will be cancelled immediately.
        </AppText>
      </View>

      {/* Action Buttons */}
      <View style={tw`gap-3 pt-1`}>
        <Pressable
          onPress={handleDelete}
          style={({ pressed }) => [
            tw`w-full py-3.5 bg-red-700 rounded-2xl items-center justify-center`,
            pressed && tw`opacity-80`,
          ]}
        >
          <AppText
            variant="body"
            tone="textWhite"
            style={tw`font-inter-semibold text-base`}
          >
            Yes, Permanently Delete
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
