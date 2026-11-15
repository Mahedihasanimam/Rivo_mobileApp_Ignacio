import * as Updates from "expo-updates"

/**
 * Checks if a new OTA update is available on the current channel.
 * Returns true if an update was found and downloaded successfully.
 */
export async function checkForUpdate(): Promise<boolean> {
  try {
    if (__DEV__) {
      console.log("Skipping OTA check in development")
      return false
    }

    const result = await Updates.checkForUpdateAsync()

    return result.isAvailable
  } catch (error) {
    console.error("[UpdateService] checkForUpdate error:", error)
    return false
  }
}

/**
 * Downloads the available update.
 * Calls onProgress with a value between 0 and 1.
 * Returns true if download succeeded.
 */
export async function downloadUpdate(
  onProgress?: (progress: number) => void
): Promise<boolean> {
  try {
    // Simulate incremental progress since expo-updates doesn't expose granular progress
    onProgress?.(0.1)
    await Updates.fetchUpdateAsync()
    onProgress?.(1)
    return true
  } catch {
    // console.error("[UpdateService] downloadUpdate error:", error)
    return false
  }
}

/**
 * Reloads the app to apply the downloaded update.
 */
export async function applyUpdate(): Promise<void> {
  await Updates.reloadAsync()
}
