import { useAppTheme } from "@/theme/theme-provider"
import { useEffect, useState } from "react"
import { Animated, StyleSheet, View } from "react-native"

interface UpdateProgressProps {
  /** Value between 0 and 1 */
  progress: number
}

/**
 * UpdateProgress
 *
 * Animated horizontal progress bar used inside UpdateModal during download.
 */
export function UpdateProgress({ progress }: UpdateProgressProps) {
  const { colors, radius } = useAppTheme()
  const [widthAnim] = useState(() => new Animated.Value(0))

  useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: progress,
      duration: 300,
      useNativeDriver: false, // width animation requires non-native driver
    }).start()
  }, [progress, widthAnim])

  const styles = createStyles(colors, radius)

  return (
    <View style={styles.track}>
      <Animated.View
        style={[
          styles.fill,
          {
            width: widthAnim.interpolate({
              inputRange: [0, 1],
              outputRange: ["0%", "100%"],
            }),
          },
        ]}
      />
      {/* Shimmer glow at fill edge */}
      <Animated.View
        style={[
          styles.glow,
          {
            left: widthAnim.interpolate({
              inputRange: [0, 1],
              outputRange: ["0%", "96%"],
            }),
          },
        ]}
      />
    </View>
  )
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

function createStyles(
  colors: ReturnType<typeof useAppTheme>["colors"],
  radius: ReturnType<typeof useAppTheme>["radius"]
) {
  return StyleSheet.create({
    track: {
      width: "100%",
      height: 8,
      backgroundColor: colors.textMute,
      borderRadius: radius.pill,
      overflow: "hidden",
      position: "relative",
    },
    fill: {
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      backgroundColor: colors.primary,
      borderRadius: radius.pill,
    },
    glow: {
      position: "absolute",
      top: 0,
      width: 20,
      bottom: 0,
      backgroundColor: colors.accent,
      opacity: 0.6,
      borderRadius: radius.pill,
    },
  })
}
