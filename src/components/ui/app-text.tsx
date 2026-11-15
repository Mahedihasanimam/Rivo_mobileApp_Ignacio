import { Text, type TextProps } from "react-native"

import { useAppTheme } from "@/theme/theme-provider"
import { moderateScale } from "react-native-size-matters"

type AppTextProps = TextProps & {
  variant?: "hero" | "title" | "subtitle" | "body" | "caption" | "eyebrow"
  tone?:
    | "default"
    | "textMute"
    | "primary"
    | "danger"
    | "blackish"
    | "gray"
    | "grayish"
    | "subscription"
    | "success"
    | "warning"
    | "info"
    | "subTitle"
    | "text"
    | "textWhite"
}

export function AppText({
  variant = "body",
  tone = "default",
  style,
  selectable = true,
  ...props
}: AppTextProps) {
  const { colors, typography } = useAppTheme()
  const variantStyles = {
    hero: {
      fontSize: moderateScale(typography.hero), // 34
      lineHeight: 42,
      fontFamily: "inter-black",
    },
    title: {
      fontSize: moderateScale(typography.title), // 26
      lineHeight: 36,
      fontFamily: "inter-black",
    },
    subtitle: {
      fontSize: moderateScale(typography.subtitle), // 18
      lineHeight: 24,
      fontFamily: "inter-semibold",
    },
    body: {
      fontSize: moderateScale(typography.body), // 15
      lineHeight: 22,
      fontFamily: "inter-regular",
    },
    caption: {
      fontSize: moderateScale(typography.caption), // 12
      lineHeight: 16,
      fontFamily: "inter-regular",
    },
    eyebrow: {
      fontSize: moderateScale(typography.caption), // 12
      lineHeight: 16,
      fontFamily: "inter-bold",
      textTransform: "uppercase",
    },
  } as const
  const toneColors = {
    default: colors.text,
    textMute: colors.texttextMute,
    primary: colors.primary,
    danger: colors.danger,
    blackish: colors.blackish,
    gray: colors.gray,
    subscription: colors.subscription,
    success: colors.success,
    warning: colors.warning,
    info: colors.info,
    subTitle: colors.subTitle,
    text: colors.text,
    grayish: colors.grayish,
    textWhite: colors.textWhite,
  } as const

  return (
    <Text
      selectable={selectable}
      style={[
        variantStyles[variant],
        { color: toneColors[tone], letterSpacing: 0 },
        variant === "eyebrow" ? { color: colors.primary } : null,
        style,
      ]}
      {...props}
    />
  )
}
