import { useUpdateContext } from "@/features/updates/providers/update-provider"

/**
 * Convenience hook for components that only need a subset of the update state.
 * Returns the full context value — destructure what you need.
 *
 * @example
 * const { status, installUpdate } = useOTAUpdate()
 */
export function useOTAUpdate() {
  return useUpdateContext()
}
