import { useState } from "react"
import { ActivityIndicator, Pressable, View } from "react-native"
import { SvgXml } from "react-native-svg"
import { router, useLocalSearchParams } from "expo-router"

import { AppText } from "@/components/ui/app-text"
import TopBackButton from "@/components/ui/app-top-bar"
import { Screen } from "@/components/ui/screen"
import tw from "@/lib/tailwind"
import { useDeleteEmergencyContactMutation } from "../api/emergency-vet-help-api"
import { appToast } from "@/lib/toast/app-toast"

const trashIcon = `
<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M3 6H21" stroke="#DC2626" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6" stroke="#DC2626" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6" stroke="#DC2626" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
  <line x1="10" y1="11" x2="10" y2="17" stroke="#DC2626" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
  <line x1="14" y1="11" x2="14" y2="17" stroke="#DC2626" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`

export default function DeleteContact() {
  const { id, name, type } = useLocalSearchParams<{
    id?: string
    name?: string
    type?: string
  }>()

  const [deleteContact, { isLoading: isDeleting }] =
    useDeleteEmergencyContactMutation()

  const vetName = name || "Dr. Sarah Williams"
  const vetType = type || "Primary Vet"

  const handleDelete = async () => {
    if (id) {
      try {
        const res = await deleteContact(id).unwrap()
        if (res?.message) {
          appToast.success(res.message)
        }
        router.replace("/(emergency-vet-help)/emergency-help")
      } catch (err: any) {
        const errorMessage =
          err?.data?.message || err?.message || "Failed to delete contact"
        appToast.error(errorMessage)
      }
    } else {
      router.back()
    }
  }

  return (
    <Screen>
      <TopBackButton title="Emergency Vet Help" />

      <View style={tw`flex-1 justify-between pt-12 pb-6 px-1`}>
        {/* Center Content */}
        <View style={tw`items-center`}>
          {/* Icon Circle */}
          <View
            style={tw`mb-6 h-20 w-20 items-center justify-center rounded-full bg-red-100`}
          >
            <SvgXml xml={trashIcon} width={32} height={32} />
          </View>

          {/* Title */}
          <View style={tw`pb-3`}>
            <AppText
              variant="subtitle"
              tone="blackish"
              style={[
                tw`text-center font-inter-semibold text-xl leading-7 text-slate-800`,
              ]}
            >
              Delete Vet Contact?
            </AppText>
          </View>

          {/* Subtitle 1 */}
          <View style={tw`pb-4 px-4`}>
            <AppText
              variant="body"
              style={[
                tw`text-center font-inter-regular text-base leading-6 text-slate-600`,
              ]}
            >
              {`Remove ${vetName} from your\n${vetType}?`}
            </AppText>
          </View>

          {/* Subtitle 2 */}
          <View style={tw`px-4`}>
            <AppText
              variant="caption"
              style={[
                tw`text-center font-inter-regular text-sm leading-5 text-slate-600`,
              ]}
            >
              {"You won't be able to call this contact\nfrom Emergency Mode."}
            </AppText>
          </View>
        </View>

        {/* Buttons */}
        <View style={tw`w-full gap-3 mt-auto`}>
          {/* Delete Button */}
          <Pressable
            onPress={handleDelete}
            disabled={isDeleting}
            style={({ pressed }) => [
              tw`w-full items-center justify-center rounded-full bg-red-700 py-3.5 shadow-sm`,
              pressed && tw`opacity-80`,
              isDeleting && tw`opacity-70`,
            ]}
          >
            {isDeleting ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <AppText
                style={tw`text-center font-inter-medium text-base leading-6 text-white`}
              >
                Delete Contact
              </AppText>
            )}
          </Pressable>

          {/* Cancel Button */}
          <Pressable
            onPress={() => router.back()}
            disabled={isDeleting}
            style={({ pressed }) => [
              tw`w-full items-center justify-center rounded-full border border-gray-200 bg-white py-3.5 shadow-sm`,
              pressed && tw`opacity-80`,
            ]}
          >
            <AppText
              style={tw`text-center font-inter-medium text-base leading-6 text-slate-800`}
            >
              Cancel
            </AppText>
          </Pressable>
        </View>
      </View>
    </Screen>
  )
}
