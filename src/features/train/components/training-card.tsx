import {
  beginnerIcon,
  best,
  bookmarkIcon,
  bookmarkIconWhite,
  clockIcon,
  clockIconWhite,
  dogIcon,
  impactIcon,
  impactIconWhite,
  rightArrow,
  rightArrowDarkMode,
  starGreenOutline,
} from "@/assets/icons/icons"
import { AppText } from "@/components/ui/app-text"
import { Card } from "@/components/ui/card"
import tw from "@/lib/tailwind"
import { useAppTheme } from "@/theme/theme-provider"
import { Pressable, View } from "react-native"
import { SvgXml } from "react-native-svg"

type MetaChipProps = {
  icon: string
  label: string
  backgroundColor: string
  textColor: string
}

export const MetaChip = ({
  icon,
  label,
  backgroundColor,
  textColor,
}: MetaChipProps) => {
  return (
    <View
      style={[
        tw`flex-row items-center gap-1 rounded-full px-2 py-1`,
        { backgroundColor },
      ]}
    >
      <SvgXml xml={icon} />

      <AppText
        variant="caption"
        tone="primary"
        style={[
          tw`font-inter-semibold text-[11px] leading-[16.5px]`,
          { color: textColor },
        ]}
      >
        {label}
      </AppText>
    </View>
  )
}

export type TrainingCardProps = {
  onBookmarkPress?: () => void
  onPress?: () => void
}

export const TrainingCard = ({
  onBookmarkPress,
  onPress,
}: TrainingCardProps) => {
  const { resolvedTheme, colors } = useAppTheme()
  const isDark = resolvedTheme === "dark"
  return (
    <Card radius="md" style={tw` w-full`}>
      <Pressable onPress={onPress} style={tw`w-full bg-transparent`}>
        <View style={tw`px-4 p-4`}>
          <View style={tw`flex-row gap-3`}>
            {/* Training Icon */}
            <View
              style={[
                tw`h-12 w-12 items-center justify-center rounded-2xl border`,
                {
                  backgroundColor: "rgba(34,197,94,0.10)",
                  borderColor: "rgba(34,197,94,0.13)",
                },
              ]}
            >
              <SvgXml xml={starGreenOutline} width={24} height={24} />
            </View>

            {/* Content */}
            <View style={tw`flex-1 flex-col gap-1`}>
              {/* Category */}
              <View style={tw`flex-row items-center gap-2`}>
                <AppText
                  variant="body"
                  tone="primary"
                  style={tw`font-inter-bold uppercase`}
                >
                  Training
                </AppText>

                <AppText
                  variant="caption"
                  tone="gray"
                  style={tw`font-inter-semibold`}
                >
                  Short
                </AppText>
              </View>

              {/* Title */}
              <AppText
                variant="body"
                tone="blackish"
                style={tw`font-inter-bold`}
              >
                Teach Sit Command
              </AppText>

              {/* Meta */}
              <View style={tw`mt-2 flex-row flex-wrap gap-2`}>
                <MetaChip
                  icon={dogIcon}
                  label="Dog"
                  backgroundColor="rgba(249,115,22,0.10)"
                  textColor="#F97316"
                />

                <MetaChip
                  icon={beginnerIcon}
                  label="Beginner"
                  backgroundColor="rgba(34,197,94,0.10)"
                  textColor="#22C55E"
                />

                <MetaChip
                  icon={isDark ? clockIconWhite : clockIcon}
                  label="10 min"
                  backgroundColor={isDark ? "transparent" : "#F0F4F3"}
                  textColor={isDark ? "#fff" : "rgba(0,0,0,0.60)"}
                />

                <MetaChip
                  icon={isDark ? impactIconWhite : impactIcon}
                  label="Low impact"
                  backgroundColor={isDark ? "transparent" : "#F0F4F3"}
                  textColor={isDark ? "#fff" : "rgba(0,0,0,0.60)"}
                />
              </View>

              {/* Recommendation */}
              <View
                style={[
                  tw`mt-2 rounded-[36px] border px-3 py-2`,
                  {
                    backgroundColor: "rgba(47,156,143,0.08)",
                    borderColor: "rgba(47,156,143,0.16)",
                  },
                ]}
              >
                <AppText
                  variant="caption"
                  tone="primary"
                  style={tw`font-inter-medium`}
                >
                  A great confidence-builder for Pedro.
                </AppText>
              </View>

              {/* Reward */}
              <View style={tw`mt-2 flex-row items-center gap-1.5`}>
                <SvgXml xml={best} width={14} height={14} />

                <AppText
                  variant="caption"
                  style={tw`font-inter-semibold text-[#D97706]`}
                >
                  Reward: Sit Master
                </AppText>
              </View>
            </View>

            {/* Right Actions */}
            <View style={tw`items-end gap-2`}>
              <Pressable
                onPress={onBookmarkPress}
                style={[
                  tw`h-9 w-9 items-center justify-center rounded-full border`,
                  {
                    backgroundColor: colors.cardOverLay,
                    borderColor: colors.border,
                  },
                ]}
              >
                <SvgXml
                  xml={isDark ? bookmarkIconWhite : bookmarkIcon}
                  // width={16}
                  // height={16}
                />
              </Pressable>

              <SvgXml
                xml={isDark ? rightArrowDarkMode : rightArrow}
                // width={16}
                // height={16}
              />
            </View>
          </View>
        </View>
      </Pressable>
    </Card>
  )
}
