import { UpdateProgress } from "@/features/updates/components/update-progress"
import { useOTAUpdate } from "@/features/updates/hooks/use-ota-update"
import { useAppTheme } from "@/theme/theme-provider"
import { Modal, Pressable, StyleSheet, Text, View } from "react-native"

/**
 * UpdateModal
 *
 * Full-screen bottom-sheet style modal shown when the user taps the UpdateBanner.
 * Displays update info and an "Install Now" button.
 * Also shows an inline UpdateProgress bar while downloading.
 */
export function UpdateModal() {
  const { colors, spacing, radius, typography } = useAppTheme()
  const {
    isModalVisible,
    status,
    downloadProgress,
    closeModal,
    installUpdate,
    dismissBanner,
  } = useOTAUpdate()

  const isDownloading = status === "downloading"
  const styles = createStyles(colors, spacing, radius, typography)

  function handleDismiss() {
    closeModal()
    dismissBanner()
  }

  return (
    <Modal
      visible={isModalVisible}
      transparent
      animationType="slide"
      statusBarTranslucent
      onRequestClose={closeModal}
    >
      {/* Backdrop */}
      <Pressable style={styles.backdrop} onPress={closeModal} />

      {/* Sheet */}
      <View style={styles.sheet}>
        {/* Handle */}
        <View style={styles.handle} />

        {/* Icon */}
        <View style={styles.iconContainer}>
          <Text style={styles.iconEmoji}>🚀</Text>
        </View>

        {/* Heading */}
        <Text style={styles.heading}>App Update Ready</Text>
        <Text style={styles.body}>
          A new version of the app is available with improvements and bug fixes.
          Install it now — it only takes a few seconds.
        </Text>

        {/* Progress bar (visible while downloading) */}
        {isDownloading && (
          <View style={styles.progressWrapper}>
            <UpdateProgress progress={downloadProgress} />
            <Text style={styles.progressLabel}>
              Downloading… {Math.round(downloadProgress * 100)}%
            </Text>
          </View>
        )}

        {/* Actions */}
        {!isDownloading && (
          <View style={styles.actions}>
            <Pressable
              style={({ pressed }) => [
                styles.installBtn,
                pressed && styles.installBtnPressed,
              ]}
              onPress={installUpdate}
            >
              <Text style={styles.installBtnText}>Install Now</Text>
            </Pressable>

            <Pressable style={styles.laterBtn} onPress={handleDismiss}>
              <Text style={styles.laterBtnText}>Remind Me Later</Text>
            </Pressable>
          </View>
        )}
      </View>
    </Modal>
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
    backdrop: {
      ...StyleSheet.absoluteFill,
      backgroundColor: "rgba(0,0,0,0.55)",
    },
    sheet: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: colors.surface,
      borderTopLeftRadius: radius.xl,
      borderTopRightRadius: radius.xl,
      paddingHorizontal: spacing.xl,
      paddingBottom: spacing.xxl + spacing.lg,
      paddingTop: spacing.md,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: -4 },
      shadowOpacity: 0.2,
      shadowRadius: 20,
      elevation: 16,
    },
    handle: {
      width: 40,
      height: 4,
      borderRadius: radius.pill,
      backgroundColor: colors.border,
      marginBottom: spacing.xl,
    },
    iconContainer: {
      width: 72,
      height: 72,
      borderRadius: radius.xl,
      backgroundColor: colors.primarySoft,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: spacing.lg,
    },
    iconEmoji: {
      fontSize: 32,
    },
    heading: {
      fontSize: typography.subtitle,
      fontWeight: "700",
      color: colors.text,
      textAlign: "center",
      marginBottom: spacing.sm,
    },
    body: {
      fontSize: typography.body,
      color: colors.texttextMute,
      textAlign: "center",
      lineHeight: typography.body * 1.55,
      marginBottom: spacing.xl,
    },
    progressWrapper: {
      width: "100%",
      marginBottom: spacing.xl,
      gap: spacing.sm,
    },
    progressLabel: {
      fontSize: typography.caption,
      color: colors.texttextMute,
      textAlign: "center",
    },
    actions: {
      width: "100%",
      gap: spacing.md,
    },
    installBtn: {
      backgroundColor: colors.primary,
      paddingVertical: spacing.lg,
      borderRadius: radius.md,
      alignItems: "center",
    },
    installBtnPressed: {
      opacity: 0.85,
    },
    installBtnText: {
      fontSize: typography.body,
      fontWeight: "700",
      color: colors.primaryForeground,
      letterSpacing: 0.3,
    },
    laterBtn: {
      paddingVertical: spacing.md,
      alignItems: "center",
    },
    laterBtnText: {
      fontSize: typography.body,
      color: colors.texttextMute,
    },
  })
}
