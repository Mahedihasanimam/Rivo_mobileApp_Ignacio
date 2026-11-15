export type UpdateStatus =
  | "idle"
  | "checking"
  | "available"
  | "downloading"
  | "ready"
  | "error"
  | "up-to-date"

export interface UpdateState {
  status: UpdateStatus
  downloadProgress: number // 0–1
  errorMessage: string | null
  isBannerVisible: boolean
  isModalVisible: boolean
}

export interface UpdateContextValue extends UpdateState {
  checkNow: () => Promise<void>
  installUpdate: () => Promise<void>
  dismissBanner: () => void
  openModal: () => void
  closeModal: () => void
}
