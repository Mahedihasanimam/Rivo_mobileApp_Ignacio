import {
  activityLog,
  activityLogDark,
  cardMemberShipOutline,
  cardMemberShipOutlineDark,
  closeIcon,
  closeIconWhite,
  logout,
  lostOutline,
  medicalOutline,
  medicalOutlineDark,
  pawOutline,
  pawOutlineDark,
  personOutline,
  personOutlineDark,
  rightArrowDark,
  rightArrowDarkMode,
  rightArrowDenger,
  settingIcon,
  settingIconDark,
  shieldOutline,
  shieldOutlineDark,
  sparklesOutline,
  sparklesOutlineDark,
  storefrontOutline,
  storefrontOutlineDark,
  termsAndCondition,
  termsAndConditionDark,
} from "@/assets/icons/icons"
import { AppText } from "@/components/ui/app-text"
import { Card } from "@/components/ui/card"
import {
  closeDrawer,
  openDrawer,
  toggleDrawer,
  useDrawerState,
} from "@/lib/drawer-ref"
import tw from "@/lib/tailwind"
import { useAppTheme } from "@/theme/theme-provider"
import { router } from "expo-router"
import React, { useCallback, useEffect, useState } from "react"
import {
  Animated,
  BackHandler,
  Dimensions,
  Easing,
  Image,
  PanResponder,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { SvgXml } from "react-native-svg"

export { closeDrawer, openDrawer, toggleDrawer }

type MenuItem = {
  title: string
  icon: string
  darkIcon?: string
  route: string
  variant?: "primary" | "danger"
  subtitle?: string
}

const menuItems: MenuItem[] = [
  {
    title: "Pet Profile",
    icon: pawOutline,
    darkIcon: pawOutlineDark,
    route: "/(pet-profile)",
    variant: "primary",
  },
  {
    title: "Profile",
    icon: personOutline,
    darkIcon: personOutlineDark,
    route: "/profile",
    variant: "primary",
  },
  {
    title: "Health Vault",
    icon: medicalOutline,
    darkIcon: medicalOutlineDark,
    route: "/(health-vault)",
  },
  {
    title: "RivoCare AI",
    icon: sparklesOutline,
    darkIcon: sparklesOutlineDark,
    route: "/rivo-care-ai",
  },
  {
    title: "Marketplace",
    icon: storefrontOutline,
    darkIcon: storefrontOutlineDark,
    route: "/(marketplace)",
  },
  {
    title: "Activity Log",
    icon: activityLog,
    darkIcon: activityLogDark,
    route: "/activity-log",
  },
  {
    title: "Settings",
    icon: settingIcon,
    darkIcon: settingIconDark,
    route: "/settings",
  },
  {
    title: "Terms and conditions",
    icon: termsAndCondition,
    darkIcon: termsAndConditionDark,
    route: "/terms-and-conditions",
  },
  {
    title: "Privacy policy",
    icon: shieldOutline,
    darkIcon: shieldOutlineDark,
    route: "/privacy-policy",
  },
  {
    title: "Membership",
    icon: cardMemberShipOutline,
    darkIcon: cardMemberShipOutlineDark,
    route: "/membership",
  },
  {
    title: "Lost Mode",
    subtitle: "Create lost pet poster",
    icon: lostOutline,
    darkIcon: lostOutline,
    route: "/(pet-lost)",
    variant: "danger",
  },
]

type MenuItemCardProps = {
  item: MenuItem
  onPress: () => void
}

function MenuItemCard({ item, onPress }: MenuItemCardProps) {
  const isDanger = item.variant === "danger"
  const isPrimary = item.variant === "primary"
  const { resolvedTheme } = useAppTheme()

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [pressed && tw`opacity-70`]}
    >
      <Card
        radius="md"
        style={tw.style(
          "flex-row items-center justify-between px-4 py-3.5",
          isDanger &&
            (resolvedTheme === "dark"
              ? "bg-[#2D1414] border-[#FF3B304D]"
              : "bg-[#FEF2F2] text-[#DC2626]"),
          isPrimary &&
            "bg-[#0F9C8F]/10 dark:bg-[#0F9C8F]/20 border-[#0F9C8F]/20"
        )}
      >
        <View style={tw`flex-1 flex-row items-center gap-3`}>
          <SvgXml
            xml={
              resolvedTheme === "dark" && item.darkIcon
                ? item.darkIcon
                : item.icon
            }
          />

          <View style={tw`flex-1`}>
            <AppText
              variant="body"
              tone={isDanger ? "danger" : "blackish"}
              style={
                isDanger ? tw`font-inter-semibold` : tw`font-inter-regular`
              }
            >
              {item.title}
            </AppText>

            {item.subtitle && (
              <AppText
                variant="caption"
                tone="grayish"
                style={tw`font-inter-medium`}
              >
                {item.subtitle}
              </AppText>
            )}
          </View>
        </View>

        {isDanger ? (
          <SvgXml
            xml={resolvedTheme === "dark" ? rightArrowDenger : rightArrowDark}
          />
        ) : (
          <SvgXml
            xml={resolvedTheme === "dark" ? rightArrowDarkMode : rightArrowDark}
          />
        )}
      </Card>
    </Pressable>
  )
}

let isClosingFlag = false
let isGesturingFlag = false

export function CustomDrawerMain(_props?: any) {
  const isOpen = useDrawerState()
  const { colors, resolvedTheme } = useAppTheme()
  const insets = useSafeAreaInsets()
  const screenWidth = Dimensions.get("window").width
  const drawerWidth = Math.min(screenWidth * 0.82, 340)

  const [slideAnim] = useState(() => new Animated.Value(-drawerWidth))
  const [fadeAnim] = useState(() => new Animated.Value(0))
  const [isClosing, setIsClosing] = useState(false)
  const isMounted = isOpen || isClosing

  const handleClose = useCallback(() => {
    if (isClosingFlag) return
    isClosingFlag = true
    setIsClosing(true)

    slideAnim.stopAnimation()
    fadeAnim.stopAnimation()

    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: -drawerWidth,
        duration: 270,
        easing: Easing.bezier(0.25, 1, 0.5, 1),
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 250,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      isClosingFlag = false
      if (finished) {
        setIsClosing(false)
        closeDrawer()
      }
    })
  }, [drawerWidth, slideAnim, fadeAnim])

  // Handle hardware back button on Android
  useEffect(() => {
    if (!isOpen) return
    const onBackPress = () => {
      handleClose()
      return true
    }
    const sub = BackHandler.addEventListener("hardwareBackPress", onBackPress)
    return () => sub.remove()
  }, [isOpen, handleClose])

  useEffect(() => {
    if (isOpen) {
      isClosingFlag = false
      slideAnim.setValue(-drawerWidth)
      fadeAnim.setValue(0)
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 280,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start()
    } else {
      if (isClosingFlag || isGesturingFlag) {
        return
      }
      slideAnim.setValue(-drawerWidth)
      fadeAnim.setValue(0)
    }
  }, [isOpen, drawerWidth, fadeAnim, slideAnim])

  const [panResponder] = useState(() =>
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onStartShouldSetPanResponderCapture: () => false,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return (
          gestureState.dx < -8 &&
          Math.abs(gestureState.dx) > Math.abs(gestureState.dy) * 1.2
        )
      },
      onMoveShouldSetPanResponderCapture: (_, gestureState) => {
        return (
          gestureState.dx < -10 &&
          Math.abs(gestureState.dx) > Math.abs(gestureState.dy) * 1.2
        )
      },
      onPanResponderGrant: () => {
        isGesturingFlag = true
        slideAnim.stopAnimation()
        fadeAnim.stopAnimation()
      },
      onPanResponderMove: (_, gestureState) => {
        const clampedDx = Math.min(0, gestureState.dx)
        slideAnim.setValue(clampedDx)
        const progress = Math.max(0, Math.min(1, 1 + clampedDx / drawerWidth))
        fadeAnim.setValue(progress)
      },
      onPanResponderTerminationRequest: () => false,
      onPanResponderRelease: (_, gestureState) => {
        const currentDx = Math.min(0, gestureState.dx)
        const velocity = gestureState.vx
        const shouldClose = currentDx < -drawerWidth * 0.2 || velocity < -0.3

        if (shouldClose) {
          isClosingFlag = true
          setIsClosing(true)
          const remainingDist = Math.max(0, drawerWidth + currentDx)
          const flickDuration =
            velocity < -0.3
              ? Math.max(
                  140,
                  Math.min(
                    260,
                    (remainingDist / Math.abs(velocity * 1000)) * 1000
                  )
                )
              : 240

          Animated.parallel([
            Animated.timing(slideAnim, {
              toValue: -drawerWidth,
              duration: flickDuration,
              easing: Easing.bezier(0.25, 1, 0.5, 1),
              useNativeDriver: true,
            }),
            Animated.timing(fadeAnim, {
              toValue: 0,
              duration: flickDuration,
              easing: Easing.out(Easing.quad),
              useNativeDriver: true,
            }),
          ]).start(({ finished }) => {
            isClosingFlag = false
            if (finished) {
              setIsClosing(false)
              closeDrawer()
              setTimeout(() => {
                isGesturingFlag = false
              }, 50)
            }
          })
        } else {
          isGesturingFlag = false
          Animated.parallel([
            Animated.timing(slideAnim, {
              toValue: 0,
              duration: 220,
              easing: Easing.out(Easing.cubic),
              useNativeDriver: true,
            }),
            Animated.timing(fadeAnim, {
              toValue: 1,
              duration: 220,
              easing: Easing.out(Easing.cubic),
              useNativeDriver: true,
            }),
          ]).start()
        }
      },
      onPanResponderTerminate: () => {
        isGesturingFlag = false
        isClosingFlag = false
        Animated.parallel([
          Animated.timing(slideAnim, {
            toValue: 0,
            duration: 220,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 220,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
        ]).start()
      },
    })
  )

  const navigateToScreen = (route?: string) => {
    handleClose()
    if (route) {
      setTimeout(() => {
        router.push(route as never)
      }, 100)
    }
  }

  const handleLogout = () => {
    handleClose()
    setTimeout(() => {
      router.push("/(modal)/log-out-modal" as never)
    }, 100)
  }

  return (
    <View
      pointerEvents={isOpen && isMounted ? "auto" : "none"}
      {...panResponder.panHandlers}
      style={[
        StyleSheet.absoluteFill,
        {
          zIndex: 99999,
          elevation: 99999,
        },
        !isMounted ? { display: "none" } : null,
      ]}
    >
      {/* Backdrop */}
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            opacity: fadeAnim,
          },
        ]}
      >
        <Pressable style={StyleSheet.absoluteFill} onPress={handleClose} />
      </Animated.View>

      {/* Drawer Panel */}
      <Animated.View
        style={[
          {
            width: drawerWidth,
            height: "100%",
            backgroundColor: colors.background,
            paddingTop: Math.max(insets.top, 16),
            paddingBottom: Math.max(insets.bottom, 16),
            transform: [{ translateX: slideAnim }],
            shadowColor: "#000",
            shadowOffset: { width: 4, height: 0 },
            shadowOpacity: 0.25,
            shadowRadius: 10,
            elevation: 16,
          },
        ]}
      >
        {/* Header */}
        <View style={tw`flex-row items-center justify-between px-5 py-4`}>
          <AppText variant="title" tone="text" style={tw`font-inter-bold`}>
            Menu
          </AppText>

          <Pressable
            onPress={handleClose}
            style={({ pressed }) => [
              tw`items-center justify-center`,
              pressed && tw`opacity-70`,
              {
                backgroundColor: colors.backButtonBg,
                padding: 10,
                borderRadius: 100,
              },
            ]}
          >
            <SvgXml
              xml={resolvedTheme === "dark" ? closeIconWhite : closeIcon}
            />
          </Pressable>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={tw`pb-6`}
        >
          {/* Pet & Owner Info */}
          <View style={tw`flex-row items-center gap-4 px-5`}>
            <View
              style={tw`rounded-full border-2 border-[#0F9C8F] overflow-hidden`}
            >
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1587300003388-59208cc962cb",
                }}
                style={tw`w-20 h-20`}
              />
            </View>

            <View style={tw`flex-1`}>
              <AppText
                variant="title"
                tone="text"
                style={tw`font-inter-semibold`}
              >
                Pedro
              </AppText>

              <AppText
                variant="caption"
                tone="text"
                style={tw`font-inter-bold`}
              >
                {"Rivo"}
              </AppText>

              <AppText
                variant="caption"
                tone="grayish"
                style={tw`font-inter-regular`}
              >
                owner@gmail.com
              </AppText>
            </View>
          </View>

          {/* Menu */}
          <View style={tw`gap-1 px-5 pt-6`}>
            {menuItems.map((item) => (
              <MenuItemCard
                key={item.route}
                item={item}
                onPress={() => navigateToScreen(item.route)}
              />
            ))}
          </View>
        </ScrollView>

        {/* Logout */}
        <View style={tw`px-5 pb-2 pt-3`}>
          <Pressable
            onPress={handleLogout}
            style={({ pressed }) => [
              tw`flex-row items-center justify-center gap-3 rounded-xl ${
                resolvedTheme === "dark"
                  ? "bg-[#FF3B301F] border-[#FF3B304D]"
                  : "bg-red-200"
              } px-4 py-4`,
              pressed && tw`opacity-70`,
            ]}
          >
            <SvgXml xml={logout} />

            <AppText
              variant="body"
              tone="danger"
              style={tw`font-inter-semibold`}
            >
              Log Out
            </AppText>
          </Pressable>
        </View>
      </Animated.View>
    </View>
  )
}

export default CustomDrawerMain
