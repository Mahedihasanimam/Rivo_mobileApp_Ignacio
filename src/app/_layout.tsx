import { Stack } from "expo-router/stack"
import { StatusBar } from "expo-status-bar"
import { GestureHandlerRootView } from "react-native-gesture-handler"

import { AppToaster } from "@/components/ui/app-toaster"
import { useSession } from "@/features/auth/auth-session"
import { AppProviders } from "@/providers/app-providers"
import { useAppTheme } from "@/theme/theme-provider"

import store from "@/api/store/store"
import CustomDrawerMain from "@/components/ui/custom-drawer-main"
import { useFonts } from "expo-font"
import * as SplashScreen from "expo-splash-screen"
import { useEffect } from "react"
import { Provider } from "react-redux"

SplashScreen.preventAutoHideAsync()

function RootNavigator() {
  const { hasHydrated } = useSession()
  const { resolvedTheme, colors } = useAppTheme()

  // Use `useFonts` only if you can't use the config plugin.
  const [loaded, error] = useFonts({
    "inter-black": require("../../assets/fonts/Inter-Black.ttf"),
    "inter-bold": require("../../assets/fonts/Inter_28pt-Bold.ttf"),
    "inter-light": require("../../assets/fonts/Inter_28pt-Light.ttf"),
    "inter-medium": require("../../assets/fonts/Inter_28pt-Medium.ttf"),
    "inter-regular": require("../../assets/fonts/Inter_28pt-Regular.ttf"),
    "inter-semibold": require("../../assets/fonts/Inter_28pt-SemiBold.ttf"),
    "manrope-bold": require("../../assets/fonts/Manrope-Bold.ttf"),
    "manrope-semibold": require("../../assets/fonts/Manrope-SemiBold.ttf"),
    "manrope-extrabold": require("../../assets/fonts/Manrope-ExtraBold.ttf"),
  })

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync()
    }
  }, [loaded, error])

  if (!loaded && !error) {
    return null
  }

  if (!hasHydrated) {
    return <StatusBar style="auto" />
  }

  return (
    <Provider store={store}>
      <StatusBar style={resolvedTheme === "dark" ? "light" : "dark"} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(pet-setup)" />
        <Stack.Screen name="(main)" />
        <Stack.Screen name="appts-dirrection" />
        <Stack.Screen name="(walk-mode)" />
        <Stack.Screen name="(emergency-vet-help)" />
        <Stack.Screen name="(pet-social)" />
        <Stack.Screen name="(pet-profile)" />
        <Stack.Screen name="(health-vault)" />
        <Stack.Screen name="rivo-care-ai" />
        <Stack.Screen name="(marketplace)" />
        <Stack.Screen name="activity-log" />
        <Stack.Screen name="(pet-lost)" />
        <Stack.Screen name="(settings)" />
        <Stack.Screen name="(train)" />

        <Stack.Screen
          name="(modal)/log-out-modal"
          options={{
            presentation: "formSheet",
            sheetInitialDetentIndex: 0,
            sheetGrabberVisible: true,
            sheetCornerRadius: 24,
            sheetLargestUndimmedDetentIndex: -1,
            sheetAllowedDetents: "fitToContents",
            // sheetAllowedDetents: [0.5, 0.5, 1],
            headerShown: true,
            contentStyle: { backgroundColor: colors.modalBg, padding: 20 },
          }}
        />
        <Stack.Screen
          name="(modal)/delete-account-modal"
          options={{
            presentation: "formSheet",
            sheetInitialDetentIndex: 0,
            sheetGrabberVisible: true,
            sheetCornerRadius: 24,
            sheetLargestUndimmedDetentIndex: -1,
            sheetAllowedDetents: "fitToContents",
            // sheetAllowedDetents: [0.5, 0.5, 1],
            headerShown: true,
            contentStyle: { backgroundColor: colors.modalBg, padding: 20 },
          }}
        />
        <Stack.Screen
          name="(modal)/streaks-modal"
          options={{
            presentation: "formSheet",
            sheetInitialDetentIndex: 0,
            sheetGrabberVisible: true,
            sheetCornerRadius: 24,
            sheetLargestUndimmedDetentIndex: -1,
            sheetAllowedDetents: "fitToContents",
            // sheetAllowedDetents: [0.5, 0.5, 1],
            headerShown: true,
            contentStyle: { backgroundColor: colors.modalBg, padding: 20 },
          }}
        />
        <Stack.Screen
          name="(modal)/basic-commands-modal"
          options={{
            presentation: "formSheet",
            sheetInitialDetentIndex: 0,
            sheetGrabberVisible: true,
            sheetCornerRadius: 24,
            sheetLargestUndimmedDetentIndex: -1,
            sheetAllowedDetents: "fitToContents",
            // sheetAllowedDetents: [0.5, 0.5, 1],
            headerShown: true,
            contentStyle: { backgroundColor: colors.modalBg, padding: 20 },
          }}
        />
        <Stack.Screen
          name="(modal)/new-appointment-modal"
          options={{
            presentation: "formSheet",
            sheetInitialDetentIndex: 0,
            sheetGrabberVisible: true,
            sheetCornerRadius: 24,
            sheetLargestUndimmedDetentIndex: -1,
            sheetAllowedDetents: "fitToContents",
            // headerLargeTitleShadowVisible: true,
            // sheetAllowedDetents: [0.5, 0.5, 1],
            headerShown: true,
            contentStyle: { backgroundColor: colors.modalBg, padding: 20 },
          }}
        />
        <Stack.Screen
          name="(modal)/create-post-modal"
          options={{
            presentation: "formSheet",
            sheetInitialDetentIndex: 0,
            sheetGrabberVisible: true,
            sheetCornerRadius: 24,
            sheetLargestUndimmedDetentIndex: -1,
            sheetAllowedDetents: "fitToContents",
            // headerLargeTitleShadowVisible: true,
            // sheetAllowedDetents: [0.5, 0.5, 1],
            headerShown: true,
            contentStyle: { backgroundColor: colors.modalBg, padding: 20 },
          }}
        />
        <Stack.Screen
          name="(modal)/match-filter-modal"
          options={{
            presentation: "formSheet",
            sheetInitialDetentIndex: 0,
            sheetGrabberVisible: true,
            sheetCornerRadius: 24,
            sheetLargestUndimmedDetentIndex: -1,
            sheetAllowedDetents: "fitToContents",
            // headerLargeTitleShadowVisible: true,
            // sheetAllowedDetents: [0.5, 0.5, 1],
            headerShown: true,
            contentStyle: { backgroundColor: colors.modalBg, padding: 20 },
          }}
        />
        <Stack.Screen
          name="(modal)/upload-post-modal"
          options={{
            presentation: "formSheet",
            sheetInitialDetentIndex: 0,
            sheetGrabberVisible: true,
            sheetCornerRadius: 24,
            sheetLargestUndimmedDetentIndex: -1,
            sheetAllowedDetents: "fitToContents",
            // headerLargeTitleShadowVisible: true,
            // sheetAllowedDetents: [0.5, 0.5, 1],
            headerShown: true,
            contentStyle: { backgroundColor: colors.modalBg, padding: 20 },
          }}
        />
        <Stack.Screen
          name="(modal)/post-delete-modal"
          options={{
            presentation: "formSheet",
            sheetInitialDetentIndex: 0,
            sheetGrabberVisible: true,
            sheetCornerRadius: 24,
            sheetLargestUndimmedDetentIndex: -1,
            sheetAllowedDetents: "fitToContents",
            // headerLargeTitleShadowVisible: true,
            // sheetAllowedDetents: [0.5, 0.5, 1],
            headerShown: true,
            contentStyle: { backgroundColor: colors.modalBg, padding: 20 },
          }}
        />
        <Stack.Screen
          name="(modal)/new-appointment"
          options={{
            presentation: "formSheet",
            sheetInitialDetentIndex: 0,
            sheetGrabberVisible: true,
            sheetCornerRadius: 24,
            sheetLargestUndimmedDetentIndex: -1,
            sheetAllowedDetents: "fitToContents",
            // headerLargeTitleShadowVisible: true,
            // sheetAllowedDetents: [0.5, 0.5, 1],
            headerShown: true,
            contentStyle: { backgroundColor: colors.modalBg, padding: 20 },
          }}
        />
        <Stack.Screen
          name="(modal)/enter-weight-modal"
          options={{
            presentation: "formSheet",
            sheetInitialDetentIndex: 0,
            sheetGrabberVisible: true,
            sheetCornerRadius: 24,
            sheetLargestUndimmedDetentIndex: -1,
            sheetAllowedDetents: "fitToContents",
            // headerLargeTitleShadowVisible: true,
            // sheetAllowedDetents: [0.5, 0.5, 1],
            headerShown: true,
            contentStyle: { backgroundColor: colors.modalBg, padding: 20 },
          }}
        />
        <Stack.Screen
          name="(modal)/add-care-task-modal"
          options={{
            presentation: "formSheet",
            sheetInitialDetentIndex: 0,
            sheetGrabberVisible: true,
            sheetCornerRadius: 24,
            sheetLargestUndimmedDetentIndex: -1,
            sheetAllowedDetents: "fitToContents",
            // headerLargeTitleShadowVisible: true,
            // sheetAllowedDetents: [0.5, 0.5, 1],
            headerShown: true,
            contentStyle: { backgroundColor: colors.modalBg, padding: 20 },
          }}
        />
        <Stack.Screen
          name="(modal)/upload-document-modal"
          options={{
            presentation: "formSheet",
            sheetInitialDetentIndex: 0,
            sheetGrabberVisible: true,
            sheetCornerRadius: 24,
            sheetLargestUndimmedDetentIndex: -1,
            sheetAllowedDetents: "fitToContents",
            headerShown: true,
            contentStyle: { backgroundColor: colors.modalBg, padding: 20 },
          }}
        />
        <Stack.Screen
          name="(modal)/marketplace-filter"
          options={{
            presentation: "formSheet",
            sheetInitialDetentIndex: 0,
            sheetGrabberVisible: true,
            sheetCornerRadius: 24,
            sheetLargestUndimmedDetentIndex: -1,
            sheetAllowedDetents: "fitToContents",
            // headerLargeTitleShadowVisible: true,
            // sheetAllowedDetents: [0.5, 0.5, 1],
            headerShown: true,
            contentStyle: { backgroundColor: colors.modalBg, padding: 20 },
          }}
        />
        <Stack.Screen
          name="(modal)/product-search-modal"
          options={{
            presentation: "formSheet",
            sheetInitialDetentIndex: 0,
            sheetGrabberVisible: true,
            sheetCornerRadius: 24,
            sheetLargestUndimmedDetentIndex: -1,
            sheetAllowedDetents: "fitToContents",
            // headerLargeTitleShadowVisible: true,
            // sheetAllowedDetents: [0.5, 0.5, 1],
            headerShown: true,
            contentStyle: { backgroundColor: colors.modalBg, padding: 20 },
          }}
        />
        <Stack.Screen
          name="(modal)/otp-verification-modal"
          options={{
            presentation: "formSheet",
            sheetInitialDetentIndex: 0,
            sheetGrabberVisible: true,
            sheetCornerRadius: 24,
            sheetLargestUndimmedDetentIndex: -1,
            sheetAllowedDetents: "fitToContents",
            headerShown: true,
            contentStyle: { backgroundColor: colors.modalBg, padding: 20 },
          }}
        />
      </Stack>
    </Provider>
  )
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppProviders>
        <RootNavigator />
        <AppToaster />
        <CustomDrawerMain />
      </AppProviders>
    </GestureHandlerRootView>
  )
}
