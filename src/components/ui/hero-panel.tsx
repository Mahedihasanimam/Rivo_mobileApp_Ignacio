import { View } from "react-native"

import { AppText } from "@/components/ui/app-text"
import tw from "@/lib/tailwind"
import { useAppTheme } from "@/theme/theme-provider"
import { Image } from "expo-image"

type HeroPanelProps = {
  title: string
  body: string
  meta?: string
  rivo?: boolean
}

export function HeroPanel({ title, body, meta, rivo = false }: HeroPanelProps) {
  const { colors, radius, spacing } = useAppTheme()

  return (
    <View style={{ alignItems: "center" }}>
      <View style={{ alignItems: "center", gap: spacing.xl }}>
        {rivo ? (
          <Image
            source={require("../../../assets/auth-image/rivo.png")}
            style={{
              width: 111,
              height: 46,
              backgroundColor: colors.background,
            }}
            contentFit="contain"
            accessibilityLabel="Rivo logo"
          />
        ) : null}
        <View
          style={{
            gap: spacing.xs,
            alignItems: "center",
          }}
        >
          <AppText tone="blackish" variant="title">
            {title}
          </AppText>

          <AppText variant="body" tone="gray" style={tw`text-center`}>
            {body}
          </AppText>
        </View>
      </View>

      {meta ? (
        <View
          style={{
            alignSelf: "flex-start",
            borderRadius: radius.pill,
            paddingHorizontal: spacing.md,
            paddingVertical: spacing.sm,
            backgroundColor: colors.primarySoft,
          }}
        >
          <AppText
            variant="caption"
            tone="primary"
            style={{ fontWeight: "900" }}
          >
            {meta}
          </AppText>
        </View>
      ) : null}
    </View>
  )
}
