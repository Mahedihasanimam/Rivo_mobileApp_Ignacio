import { ActivityIndicator, Pressable, type PressableProps } from "react-native"
import { SvgXml } from "react-native-svg"

import { AppText } from "@/components/ui/app-text"
import type { colors as colorTokens } from "@/theme/colors"
import type { spacing as spacingTokens } from "@/theme/spacing"
import { useAppTheme } from "@/theme/theme-provider"

type ButtonProps = PressableProps & {
  label: string
  variant?: ButtonVariant
  size?: ButtonSize

  // Custom SVG icons
  leftIcon?: string
  rightIcon?: string

  loading?: boolean
  fullWidth?: boolean

  iconSize?: number
}

export function Button({
  label,
  variant = "primary",
  size = "md",
  leftIcon,
  rightIcon,
  loading = false,
  fullWidth = true,
  disabled,
  style,
  ...props
}: ButtonProps) {
  const { colors, motion, radius, spacing, resolvedTheme } = useAppTheme()

  const isDark = resolvedTheme === "dark"

  const current = getButtonVariantStyles(colors)[variant]
  const dimensions = getButtonSizeStyles(spacing)[size]

  const isDisabled = disabled || loading

  return (
    <Pressable
      disabled={isDisabled}
      style={(state) => [
        {
          minHeight: dimensions.minHeight,
          alignSelf: fullWidth ? "stretch" : "flex-start",
          flexDirection: "row",
          gap: spacing.sm,
          alignItems: "center",
          justifyContent: "center",
          borderWidth: 1,
          borderColor: current.borderColor,
          borderRadius: radius.pill,
          paddingHorizontal: dimensions.paddingHorizontal,
          backgroundColor: current.backgroundColor,
          opacity: isDisabled
            ? 0.56
            : state.pressed
              ? motion.opacity.pressed
              : 1,
        },
        typeof style === "function" ? style(state) : style,
      ]}
      {...props}
    >
      {/* Left Icon */}
      {loading ? (
        <ActivityIndicator color={current.foreground} />
      ) : leftIcon ? (
        <SvgXml xml={leftIcon} width={16} height={16} />
      ) : null}

      {/* Label */}
      <AppText
        style={{
          color: current.foreground,
          fontWeight: "900",
        }}
      >
        {label}
      </AppText>

      {/* Right Icon */}
      {!loading && rightIcon ? (
        <SvgXml xml={rightIcon} width={16} height={16} />
      ) : null}
    </Pressable>
  )
}

type ThemeColors = (typeof colorTokens)[keyof typeof colorTokens]
type ThemeSpacing = typeof spacingTokens

type ButtonVariant =
  "primary" | "secondary" | "outline" | "ghost" | "danger" | "soft"

type ButtonSize = "sm" | "md" | "lg"

function getButtonVariantStyles(colors: ThemeColors) {
  return {
    primary: {
      backgroundColor: colors.accent,
      borderColor: colors.accent,
      foreground: colors.accentForeground,
    },
    secondary: {
      backgroundColor: colors.secondary,
      borderColor: colors.secondary,
      foreground: colors.secondaryForeground,
    },
    outline: {
      backgroundColor: colors.surface,
      borderColor: colors.border,
      foreground: colors.text,
    },
    ghost: {
      backgroundColor: colors.ghostBg,
      borderColor: "transparent",
      foreground: colors.textMuteForeground,
    },
    danger: {
      backgroundColor: colors.danger,
      borderColor: colors.danger,
      foreground: colors.primaryForeground,
    },
    soft: {
      backgroundColor: "#F0F4F3",
      borderColor: "transparent",
      foreground: colors.text,
    },
  } as const
}

function getButtonSizeStyles(spacing: ThemeSpacing) {
  return {
    sm: {
      minHeight: 40,
      paddingHorizontal: spacing.md,
    },
    md: {
      minHeight: 50,
      paddingHorizontal: spacing.lg,
    },
    lg: {
      minHeight: 58,
      paddingHorizontal: spacing.xl,
    },
  } as const
}
