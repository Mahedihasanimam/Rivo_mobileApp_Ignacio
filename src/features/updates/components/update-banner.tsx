import { useOTAUpdate } from "@/features/updates/hooks/use-ota-update"
import { useAppTheme } from "@/theme/theme-provider"
import { useEffect, useState } from "react"
import { Animated, Pressable, StyleSheet, Text, View } from "react-native"

/**
 * UpdateBanner
 *
 * A thin, animated banner that slides down from the top of the screen
 * when an OTA update is available. Tapping it opens the UpdateModal.
 * The ✕ button dismisses it silently.
 */
export function UpdateBanner() {
  const { colors, spacing, radius, typography } = useAppTheme()
  const { isBannerVisible, status, openModal, dismissBanner } = useOTAUpdate()

  const [slideAnim] = useState(() => new Animated.Value(-80))
  const [opacityAnim] = useState(() => new Animated.Value(0))

  useEffect(() => {
    if (isBannerVisible && status === "available") {
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: true,
          tension: 60,
          friction: 10,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start()
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -80,
          duration: 220,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start()
    }
  }, [isBannerVisible, status, slideAnim, opacityAnim])

  if (!isBannerVisible && status !== "available") return null

  const styles = createStyles(colors, spacing, radius, typography)

  return (
    <Animated.View
      style={[
        styles.container,
        { transform: [{ translateY: slideAnim }], opacity: opacityAnim },
      ]}
    >
      <Pressable
        style={styles.content}
        onPress={openModal}
        android_ripple={{ color: "rgba(255,255,255,0.15)" }}
      >
        {/* Left icon */}
        <View style={styles.iconWrapper}>
          <Text style={styles.icon}>🔄</Text>
        </View>

        {/* Text */}
        <View style={styles.textWrapper}>
          <Text style={styles.title}>Update Available</Text>
          <Text style={styles.subtitle}>Tap to see what&apos;s new</Text>
        </View>

        {/* Install CTA */}
        <View style={styles.cta}>
          <Text style={styles.ctaText}>Install</Text>
        </View>
      </Pressable>

      {/* Dismiss */}
      <Pressable style={styles.dismissBtn} onPress={dismissBanner} hitSlop={8}>
        <Text style={styles.dismissIcon}>✕</Text>
      </Pressable>
    </Animated.View>
  )
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

function createStyles(
  colors: ReturnType<typeof useAppTheme>["colors"],
  spacing: ReturnType<typeof useAppTheme>["spacing"],
  radius: ReturnType<typeof useAppTheme>["radius"],
  typography: ReturnType<typeof useAppTheme>["typography"]
) {
  return StyleSheet.create({
    container: {
      position: "absolute",
      top: 56,
      left: spacing.lg,
      right: spacing.lg,
      zIndex: 9999,
      backgroundColor: colors.primary,
      borderRadius: radius.lg,
      flexDirection: "row",
      alignItems: "center",
      overflow: "hidden",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 12,
      elevation: 8,
    },
    content: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: spacing.md,
      paddingLeft: spacing.md,
      paddingRight: spacing.sm,
      gap: spacing.md,
    },
    iconWrapper: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: colors.primarySoft,
      alignItems: "center",
      justifyContent: "center",
    },
    icon: {
      fontSize: 16,
    },
    textWrapper: {
      flex: 1,
    },
    title: {
      fontSize: typography.body,
      fontWeight: "700",
      color: colors.primaryForeground,
      letterSpacing: 0.1,
    },
    subtitle: {
      fontSize: typography.caption,
      color: colors.primaryForeground,
      opacity: 0.75,
      marginTop: 1,
    },
    cta: {
      backgroundColor: colors.accent,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.xs + 2,
      borderRadius: radius.sm,
    },
    ctaText: {
      fontSize: typography.caption,
      fontWeight: "700",
      color: colors.accentForeground,
    },
    dismissBtn: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.md,
      alignSelf: "stretch",
      justifyContent: "center",
    },
    dismissIcon: {
      fontSize: 12,
      color: colors.primaryForeground,
      opacity: 0.6,
    },
  })
}
