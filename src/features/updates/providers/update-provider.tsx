import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"
import { AppState, AppStateStatus } from "react-native"

import {
  applyUpdate,
  checkForUpdate,
  downloadUpdate,
} from "@/features/updates/services/updates.service"
import type {
  UpdateContextValue,
  UpdateState,
  UpdateStatus,
} from "@/features/updates/types/update.types"

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

const UpdateContext = createContext<UpdateContextValue | null>(null)

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

const INITIAL_STATE: UpdateState = {
  status: "idle",
  downloadProgress: 0,
  errorMessage: null,
  isBannerVisible: false,
  isModalVisible: false,
}

export function UpdateProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<UpdateState>(INITIAL_STATE)
  const isChecking = useRef(false)

  // ── Helpers ────────────────────────────────────────────────────────────────

  function setStatus(status: UpdateStatus) {
    setState((prev) => ({ ...prev, status }))
  }

  // ── Core Actions ───────────────────────────────────────────────────────────

  const checkNow = useCallback(async () => {
    if (isChecking.current) return
    isChecking.current = true

    setStatus("checking")

    const hasUpdate = await checkForUpdate()

    if (hasUpdate) {
      setState((prev) => ({
        ...prev,
        status: "available",
        isBannerVisible: true,
        errorMessage: null,
      }))
    } else {
      setStatus("up-to-date")
    }

    isChecking.current = false
  }, [])

  const installUpdate = useCallback(async () => {
    setState((prev) => ({
      ...prev,
      status: "downloading",
      downloadProgress: 0,
      isModalVisible: false,
      isBannerVisible: false,
    }))

    const success = await downloadUpdate((progress) => {
      setState((prev) => ({ ...prev, downloadProgress: progress }))
    })

    if (success) {
      setState((prev) => ({ ...prev, status: "ready", downloadProgress: 1 }))
      // Short delay so user sees 100% before reload
      await new Promise((resolve) => setTimeout(resolve, 600))
      await applyUpdate()
    } else {
      setState((prev) => ({
        ...prev,
        status: "error",
        errorMessage: "Download failed. Please try again.",
        isBannerVisible: false,
      }))
    }
  }, [])

  const dismissBanner = useCallback(() => {
    setState((prev) => ({ ...prev, isBannerVisible: false }))
  }, [])

  const openModal = useCallback(() => {
    setState((prev) => ({ ...prev, isModalVisible: true }))
  }, [])

  const closeModal = useCallback(() => {
    setState((prev) => ({ ...prev, isModalVisible: false }))
  }, [])

  // ── AppState listener — check when app comes to foreground ─────────────────

  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      (nextState: AppStateStatus) => {
        if (nextState === "active") {
          void checkNow()
        }
      }
    )

    // Also check immediately on mount (deferred to avoid synchronous setState inside render/effect execution phase)
    const timer = setTimeout(() => {
      void checkNow()
    }, 0)

    return () => {
      subscription.remove()
      clearTimeout(timer)
    }
  }, [checkNow])

  // ── Context value ──────────────────────────────────────────────────────────

  const value: UpdateContextValue = {
    ...state,
    checkNow,
    installUpdate,
    dismissBanner,
    openModal,
    closeModal,
  }

  return (
    <UpdateContext.Provider value={value}>{children}</UpdateContext.Provider>
  )
}

// ---------------------------------------------------------------------------
// Consumer hook
// ---------------------------------------------------------------------------

export function useUpdateContext(): UpdateContextValue {
  const ctx = useContext(UpdateContext)

  if (!ctx) {
    throw new Error("useUpdateContext must be used inside <UpdateProvider>")
  }

  return ctx
}
