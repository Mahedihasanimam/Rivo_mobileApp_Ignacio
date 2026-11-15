import { View, type ViewProps } from "react-native"

import { useAppTheme } from "@/theme/theme-provider"

export type CardProps = ViewProps & {
  radius?: keyof ReturnType<typeof useAppTheme>["radius"] | number
  border?: boolean
}

export function Card({
  style,
  radius: customRadius,
  border = true,
  ...props
}: CardProps) {
  const { colors, radius, spacing } = useAppTheme()

  const borderRadius =
    typeof customRadius === "number"
      ? customRadius
      : customRadius && customRadius in radius
        ? radius[customRadius as keyof typeof radius]
        : radius.xl

  return (
    <View
      style={[
        {
          gap: spacing.md,
          overflow: "hidden",
          borderWidth: border ? 1 : 0,
          borderColor: border ? colors.border : "transparent",
          borderRadius,
          padding: spacing.lg,
          backgroundColor: colors.surface,
          boxShadow: "0 1px 2px rgba(14, 15, 12, 0.06)",
        },
        style,
      ]}
      {...props}
    />
  )
}
