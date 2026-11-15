import { ActivityIndicator, View } from "react-native"

import { useAppTheme } from "@/theme/theme-provider"

type LoadingIndicatorProps = {
  label?: string
}

export function LoadingIndicator({ label }: LoadingIndicatorProps) {
  const { colors, spacing } = useAppTheme()

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        gap: spacing.sm,
        padding: spacing.lg,
        flex: 1,
      }}
    >
      <ActivityIndicator size={"large"} color={colors.primary} />
      {/* {label ? (
        <AppText variant="caption" tone="textMute">
          {label}
        </AppText>
      ) : null} */}
    </View>
  )
}
