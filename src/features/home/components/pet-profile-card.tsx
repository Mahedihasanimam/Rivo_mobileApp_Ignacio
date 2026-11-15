import { AppText } from "@/components/ui/app-text"
import tw from "@/lib/tailwind"
import { useAppTheme } from "@/theme/theme-provider"
import { Image } from "expo-image"
import { View } from "react-native"

type PetProfileCardProps = {
  name?: string
  breed?: string
  details?: string
  currentXp?: number
  totalXp?: number
  rankTitle?: string
  avatarSource?: any
}

export const PetProfileCard = ({
  name = "Pedro",
  breed = "GOLDEN RETRIEVER",
  details = "2 yrs 3 mo • 11.4 kg • Male",
  currentXp = 1250,
  totalXp = 1500,
  rankTitle = "Good Companion 🐾",
  avatarSource = require("@/assets/auth-image/home-icon.png"),
}: PetProfileCardProps) => {
  const progressPercent = Math.min(
    100,
    Math.max(0, (currentXp / totalXp) * 100)
  )

  const { resolvedTheme, colors } = useAppTheme()

  return (
    <View
      style={[
        tw`w-full rounded-[16px] p-4 shadow-md `,
        {
          backgroundColor: colors.surface,
        },
      ]}
    >
      {/* Pet Info Row */}
      <View style={tw`flex-row items-center gap-3.5`}>
        {/* Avatar with Teal Border */}
        <View style={tw`rounded-full border-2 border-[#2F9C8F] p-[2px]`}>
          <Image
            source={avatarSource}
            contentFit="cover"
            style={tw`h-14 w-14 rounded-full`}
          />
        </View>

        {/* Details */}
        <View style={tw`flex-1 gap-1`}>
          <View style={tw`flex-row items-center gap-2 flex-wrap`}>
            <AppText
              variant="title"
              tone="blackish"
              style={tw`text-xl font-bold leading-6`}
            >
              {name}
            </AppText>

            <View style={tw`rounded-full bg-[#2F9C8F] px-2.5 py-0.5`}>
              <AppText
                variant="caption"
                tone="textWhite"
                style={tw`text-[10px] font-bold uppercase tracking-wider text-white`}
              >
                {breed}
              </AppText>
            </View>
          </View>

          <AppText
            variant="caption"
            tone="gray"
            style={tw`text-xs text-gray-500`}
          >
            {details}
          </AppText>
        </View>
      </View>

      {/* Progress Bar & XP */}
      <View style={tw`mt-4 gap-2`}>
        {/* Track */}
        <View
          style={tw`h-2.5 w-full overflow-hidden rounded-full bg-[#2F9C8F26]`}
        >
          {/* Fill */}
          <View
            style={[
              tw`h-full rounded-full bg-[#2F9C8F]`,
              { width: `${progressPercent}%` },
            ]}
          />
        </View>

        {/* Rank & XP Count */}
        <View style={tw`flex-row items-center justify-between`}>
          <AppText
            variant="caption"
            tone="gray"
            style={tw`text-xs font-medium text-gray-500`}
          >
            {rankTitle}
          </AppText>

          <View style={tw`flex-row items-center`}>
            <AppText variant="body" style={tw`font-bold text-[#2F9C8F]`}>
              {currentXp.toLocaleString()}
            </AppText>
            <AppText variant="body" style={tw`font-semibold text-[#2F9C8F]`}>
              {` / ${totalXp.toLocaleString()} XP`}
            </AppText>
          </View>
        </View>
      </View>
    </View>
  )
}
