import { plusWhite } from "@/assets/icons/icons"
import { AppText } from "@/components/ui/app-text"
import tw from "@/lib/tailwind"
import { router } from "expo-router"
import { Pressable, View } from "react-native"
import { SvgXml } from "react-native-svg"

export const ApptsHeader = () => {
  return (
    <View style={tw`flex-row items-start justify-between pt-2`}>
      <View>
        <AppText variant="title" style={tw`text-[28px] leading-[35px]`}>
          Appointments
        </AppText>

        <AppText variant="caption" tone="gray" style={tw`mt-1`}>
          Tuesday, July 21
        </AppText>
      </View>

      <Pressable
        onPress={() => router.push("/(modal)/new-appointment-modal")}
        style={tw`flex-row items-center rounded-full bg-primary px-[18px] py-[11px]`}
      >
        <SvgXml xml={plusWhite} />

        <AppText variant="caption" tone="textWhite" style={tw`ml-2`}>
          Schedule
        </AppText>
      </Pressable>
    </View>
  )
}
