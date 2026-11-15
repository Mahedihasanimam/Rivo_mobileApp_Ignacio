import { AppText } from "@/components/ui/app-text"
import tw from "@/lib/tailwind"
import { useAppTheme } from "@/theme/theme-provider"
import { router } from "expo-router"
import {
  Pressable,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native"
import { SvgXml } from "react-native-svg"

const pawIconTeal = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="7" cy="3" r="1.5" fill="#2F9C8F"/>
  <circle cx="12.5" cy="5" r="1.5" fill="#2F9C8F"/>
  <circle cx="14" cy="10.5" r="1.5" fill="#2F9C8F"/>
  <path d="M5.5 6.5C7.5 6.5 9 8 9 10C9 12 7.5 13.5 5.5 13.5C3.5 13.5 2 12 2 10C2 8 3.5 6.5 5.5 6.5Z" fill="#2F9C8F"/>
</svg>`

const chevronRightTeal = `<svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M1 1L6 6L1 11" stroke="#2F9C8F" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`

export interface AccountHeaderCardProps {
  title?: string
  name?: string
  email?: string
  plan?: string
  initials?: string
  petName?: string
  petBreed?: string
  onEditProfile?: () => void
  onPetPress?: () => void
  style?: StyleProp<ViewStyle>
}

export function AccountHeaderCard({
  title = "Your Account",
  name = "Chris",
  email = "chris@example.com",
  plan = "Free",
  initials = "CH",
  petName = "Pedro",
  petBreed = "Golden Retriever",
  onEditProfile,
  onPetPress,
  style,
}: AccountHeaderCardProps) {
  const { resolvedTheme, colors } = useAppTheme()
  const isDark = resolvedTheme === "dark"

  const handleEditProfile = () => {
    if (onEditProfile) {
      onEditProfile()
    } else {
      router.push("/(pet-profile)" as any)
    }
  }

  return (
    <View style={[tw`w-full rounded-2xl shadow-sm overflow-visible`, style]}>
      {/* Top Teal Account Info */}
      <View style={tw`w-full px-5 pt-5 pb-9 bg-primary rounded-t-2xl`}>
        <View style={tw`w-full flex-row justify-between items-start`}>
          <View style={tw`flex-1 mr-3 flex-col justify-start items-start`}>
            <View style={tw`w-full flex-col justify-start items-start`}>
              <AppText
                variant="caption"
                tone="textWhite"
                style={tw`text-white/70 text-xs font-inter-bold uppercase tracking-wider`}
              >
                {title}
              </AppText>
            </View>
            <View style={tw`pt-1.5 flex-col justify-start items-start`}>
              <AppText
                variant="subtitle"
                tone="textWhite"
                style={tw`text-white text-xl font-inter-semibold leading-7`}
              >
                {name}
              </AppText>
            </View>
            <View style={tw`pt-0.5 flex-col justify-start items-start`}>
              <AppText
                variant="body"
                tone="textWhite"
                style={tw`text-white/75 text-base font-inter-regular leading-5`}
              >
                {email}
              </AppText>
            </View>
          </View>

          <View
            style={tw`px-2.5 py-1 bg-white/20 rounded-full items-center justify-center`}
          >
            <AppText
              variant="caption"
              tone="textWhite"
              style={tw`text-white text-xs font-inter-black uppercase tracking-wider`}
            >
              {plan}
            </AppText>
          </View>
        </View>
      </View>

      {/* Bottom Pet & Profile Row */}
      <View
        style={[
          tw`w-full px-5 py-3.5 flex-row items-center justify-between rounded-b-2xl border-t border-black/5`,
          { backgroundColor: isDark ? colors.surface : "#FFFFFF" },
        ]}
      >
        {/* Floating Avatar (CH) */}
        <View style={tw`w-14 h-5 relative justify-start items-start`}>
          <View
            style={[
              tw`w-14 h-14 absolute left-0 -top-9 rounded-full bg-primary items-center justify-center overflow-hidden`,
              {
                borderWidth: 3,
                borderColor: isDark ? colors.surface : "#FFFFFF",
                boxShadow: "0px 0px 0px 4px rgba(47, 156, 143, 0.25)",
              },
            ]}
          >
            <AppText
              variant="subtitle"
              tone="textWhite"
              style={tw`text-white text-xl font-inter-semibold leading-6`}
            >
              {initials}
            </AppText>
          </View>
        </View>

        {/* Pet Info */}
        <Pressable
          onPress={onPetPress}
          style={({ pressed }) => [
            tw`flex-row items-center gap-2 flex-1 ml-3`,
            pressed && tw`opacity-70`,
          ]}
        >
          <View
            style={tw`w-9 h-9 bg-teal-600/10 rounded-2xl items-center justify-center`}
          >
            <SvgXml xml={pawIconTeal} width={18} height={18} />
          </View>
          <View style={tw`flex-col justify-start`}>
            <AppText
              variant="body"
              tone="blackish"
              style={tw`font-inter-semibold text-base leading-5`}
            >
              {petName}
            </AppText>
            <AppText
              variant="caption"
              tone="gray"
              style={tw`font-inter-regular text-xs leading-4`}
            >
              {petBreed}
            </AppText>
          </View>
        </Pressable>

        {/* Edit Profile Action */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleEditProfile}
          style={tw`flex-row items-center gap-1.5 pl-2`}
        >
          <AppText
            variant="body"
            tone="primary"
            style={tw`font-inter-medium text-sm leading-5`}
          >
            Edit Profile
          </AppText>
          <SvgXml xml={chevronRightTeal} width={7} height={12} />
        </TouchableOpacity>
      </View>
    </View>
  )
}
