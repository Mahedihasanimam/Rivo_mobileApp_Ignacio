import { useEffect, useState } from "react"

type DrawerListener = (isOpen: boolean) => void

const listeners = new Set<DrawerListener>()
let _isDrawerOpen = false

export function openDrawer() {
  if (!_isDrawerOpen) {
    _isDrawerOpen = true
    listeners.forEach((listener) => listener(true))
  }
}

export function closeDrawer() {
  if (_isDrawerOpen) {
    _isDrawerOpen = false
    listeners.forEach((listener) => listener(false))
  }
}

export function toggleDrawer() {
  if (_isDrawerOpen) {
    closeDrawer()
  } else {
    openDrawer()
  }
}

export function isDrawerOpen() {
  return _isDrawerOpen
}

export function subscribeDrawer(listener: DrawerListener) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export function useDrawerState() {
  const [isOpen, setIsOpen] = useState(_isDrawerOpen)

  useEffect(() => {
    return subscribeDrawer((state) => {
      setIsOpen(state)
    })
  }, [])

  return isOpen
}

// Backward compatibility with previous navigation dispatch setup
export function setDrawerDispatch(_dispatch: unknown) {
  // no-op for backward compatibility
}
