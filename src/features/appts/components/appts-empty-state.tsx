import { appointmentEmpty } from "@/assets/icons/icons"
import { AppText } from "@/components/ui/app-text"
import tw from "@/lib/tailwind"
import { Pressable, View } from "react-native"
import { SvgXml } from "react-native-svg"

type ApptsEmptyStateProps = {
  title?: string
  subtitle?: string
  buttonText?: string
  onSchedule?: () => void
}

export function ApptsEmptyState({
  title = "No appointments yet",
  subtitle = "Nothing scheduled on this day",
  buttonText = "Schedule Appointment",
  onSchedule,
}: ApptsEmptyStateProps) {
  return (
    <View
      style={[
        tw`self-stretch px-8 py-12 bg-white rounded-3xl items-center my-3`,
        {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 16,
          elevation: 2,
        },
      ]}
    >
      {/* Calendar Icon Circle */}
      <View
        style={tw`w-16 h-16 rounded-[32px] bg-gray-100 items-center justify-center`}
      >
      <SvgXml xml={appointmentEmpty} />
      </View>

      {/* Title */}
      <AppText
        variant="body"
        style={tw`mt-4 text-center font-inter-semibold text-base text-black/90`}
      >
        {title}
      </AppText>

      {/* Subtitle */}
      <AppText
        variant="caption"
        tone="gray"
        style={tw`mt-1.5 text-center text-sm font-normal text-black/60 font-inter`}
      >
        {subtitle}
      </AppText>

      {/* Schedule Button */}
      <Pressable
        onPress={onSchedule}
        style={({ pressed }) => [
          tw`mt-6 h-11 w-56 items-center justify-center rounded-full bg-teal-600`,
          pressed && tw`opacity-80`,
          {
            shadowColor: "#2F9C8F",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.35,
            shadowRadius: 10,
            elevation: 4,
          },
        ]}
      >
        <AppText style={tw`text-white text-sm font-inter-semibold text-center`}>
          {buttonText}
        </AppText>
      </Pressable>
    </View>
  )
}

