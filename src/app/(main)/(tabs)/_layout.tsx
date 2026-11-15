import { TAB_LABELS } from "@/constants/constants"
import { closeDrawer, openDrawer, useDrawerState } from "@/lib/drawer-ref"
// import { appStorage } from "@/lib/storage/app-storage"
import tw from "@/lib/tailwind"
import { useAppTheme } from "@/theme/theme-provider"
import { Tabs } from "expo-router"
import { StatusBar } from "expo-status-bar"
import React, { memo } from "react"
import { TouchableOpacity, View } from "react-native"
// import { Gesture, GestureDetector } from "react-native-gesture-handler"
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
  // runOnJS,
  // SharedValue,
  // useAnimatedStyle,
  // useSharedValue,
  // withSpring,
} from "react-native-reanimated"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { SvgXml } from "react-native-svg"

// Icon SVG generator with dynamic stroke color matching Image 2
const getTabIconXml = (name: string, color: string) => {
  switch (name) {
    case "index":
      return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`
    case "train":
      return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`
    case "social":
      return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`
    case "appts":
      return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`
    case "menu":
      return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`
    default:
      return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg>`
  }
}

type TabBarItemProps = {
  isFocused: boolean
  label: string
  iconXml: string
}

const TabBarItem = memo(({ isFocused, label, iconXml }: TabBarItemProps) => {
  return (
    <Animated.View
      layout={LinearTransition.springify().damping(18).stiffness(200)}
      style={[
        tw`flex-row items-center justify-center rounded-full`,
        {
          height: 44,
          paddingHorizontal: isFocused ? 16 : 10,
          backgroundColor: isFocused ? "#2F9C8F" : "transparent",
        },
        isFocused && {
          shadowColor: "#2F9C8F",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.35,
          shadowRadius: 8,
          elevation: 4,
        },
      ]}
    >
      <SvgXml xml={iconXml} width={22} height={22} />
      {isFocused && (
        <Animated.Text
          entering={FadeIn.duration(180)}
          exiting={FadeOut.duration(120)}
          numberOfLines={1}
          style={tw`ml-2 text-[14px] font-semibold text-white`}
        >
          {label}
        </Animated.Text>
      )}
    </Animated.View>
  )
})

TabBarItem.displayName = "TabBarItem"

/*
// ============================================================================
// DRAG AND DROP TAB FEATURE (DISABLED / PRESERVED FOR FUTURE USE)
// ============================================================================

type DraggableTabItemProps = {
  route: { key: string; name: string; params?: object }
  index: number
  totalCount: number
  isFocused: boolean
  label: string
  iconXml: string
  onPress: () => void
  onReorder: (fromIndex: number, toIndex: number) => void
  slotWidthShared: SharedValue<number>
}

function DraggableTabItem({
  route: _route,
  index,
  totalCount,
  isFocused,
  label,
  iconXml,
  onPress,
  onReorder,
  slotWidthShared,
}: DraggableTabItemProps) {
  const dragX = useSharedValue(0)
  const dragY = useSharedValue(0)
  const dragScale = useSharedValue(1)
  const isDragging = useSharedValue(false)

  const panGesture = Gesture.Pan()
    .activateAfterLongPress(200)
    .onStart(() => {
      isDragging.value = true
      dragScale.value = withSpring(1.15, { damping: 14, stiffness: 220 })
      dragY.value = withSpring(-6, { damping: 14, stiffness: 220 })
      dragX.value = 0
    })
    .onUpdate((e) => {
      dragX.value = e.translationX
    })
    .onEnd((e) => {
      const slotW = slotWidthShared.value > 0 ? slotWidthShared.value : 65
      const offsetSlots = Math.round(e.translationX / slotW)
      const targetIndex = Math.max(
        0,
        Math.min(totalCount - 1, index + offsetSlots)
      )

      isDragging.value = false
      dragScale.value = withSpring(1, { damping: 20, stiffness: 220 })
      dragY.value = withSpring(0, { damping: 20, stiffness: 220 })
      dragX.value = withSpring(0, { damping: 20, stiffness: 220 })

      if (targetIndex !== index) {
        runOnJS(onReorder)(index, targetIndex)
      }
    })
    .onFinalize(() => {
      isDragging.value = false
      dragScale.value = withSpring(1)
      dragY.value = withSpring(0)
      dragX.value = 0
    })

  const tapGesture = Gesture.Tap()
    .maxDuration(200)
    .maxDeltaX(10)
    .maxDeltaY(10)
    .runOnJS(true)
    .onEnd(() => {
      onPress()
    })

  const composedGesture = Gesture.Exclusive(panGesture, tapGesture)

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: dragX.value },
        { translateY: dragY.value },
        { scale: dragScale.value },
      ],
      zIndex: isDragging.value ? 100 : 1,
      elevation: isDragging.value ? 16 : 0,
      shadowColor: "#000000",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: isDragging.value ? 0.35 : 0,
      shadowRadius: 12,
      opacity: isDragging.value ? 0.95 : 1,
    }
  })

  return (
    <GestureDetector gesture={composedGesture}>
      <Animated.View
        layout={LinearTransition.springify().damping(18).stiffness(200)}
        style={animatedStyle}
      >
        <TabBarItem isFocused={isFocused} label={label} iconXml={iconXml} />
      </Animated.View>
    </GestureDetector>
  )
}

const TAB_ORDER_STORAGE_KEY = "@rivo_tab_order"
*/

type CustomTabBarProps = {
  state: {
    index: number
    routes: { key: string; name: string; params?: object }[]
  }
  descriptors: Record<string, unknown>
  navigation: {
    emit: (event: {
      type: string
      target: string
      canPreventDefault: boolean
    }) => { defaultPrevented: boolean }
    navigate: (name: string, params?: object) => void
    dispatch: (action: any) => void
  }
}

function CustomTabBar({
  state,
  descriptors: _descriptors,
  navigation,
}: CustomTabBarProps) {
  const insets = useSafeAreaInsets()
  const { colors } = useAppTheme()
  const isDrawerOpen = useDrawerState()

  /*
  // Tab reordering state & persistence (Disabled for now)
  const [containerWidth, setContainerWidth] = useState(0)
  const [tabOrder, setTabOrder] = useState<string[]>(() =>
    state.routes.map((r) => r.name)
  )
  const slotWidthShared = useSharedValue(65)

  // Load saved tab order on mount
  useEffect(() => {
    appStorage.get<string[]>(TAB_ORDER_STORAGE_KEY, []).then((savedOrder) => {
      if (Array.isArray(savedOrder) && savedOrder.length > 0) {
        const routeNames = state.routes.map((r) => r.name)
        const validNames = new Set(routeNames)
        const merged = savedOrder.filter((name) => validNames.has(name))
        routeNames.forEach((name) => {
          if (!merged.includes(name)) {
            merged.push(name)
          }
        })
        if (merged.length === routeNames.length) {
          setTabOrder(merged)
        }
      }
    })
  }, [state.routes])

  // Update slotWidthShared when container layout changes
  useEffect(() => {
    if (containerWidth > 20 && tabOrder.length > 0) {
      slotWidthShared.value = (containerWidth - 20) / tabOrder.length
    }
  }, [containerWidth, tabOrder.length, slotWidthShared])

  const { routes } = state
  const orderedRoutes = useMemo(() => {
    const routeMap = new Map(routes.map((r) => [r.name, r]))
    const result: (typeof routes)[number][] = []

    tabOrder.forEach((name) => {
      const route = routeMap.get(name)
      if (route) {
        result.push(route)
        routeMap.delete(name)
      }
    })

    routeMap.forEach((route) => {
      result.push(route)
    })

    return result
  }, [routes, tabOrder])

  const handleReorder = (fromIndex: number, toIndex: number) => {
    setTabOrder((prev) => {
      const next = [...prev]
      const [moved] = next.splice(fromIndex, 1)
      next.splice(toIndex, 0, moved)
      appStorage.set(TAB_ORDER_STORAGE_KEY, next)
      return next
    })
  }
  */

  const activeRouteName = state.routes[state.index]?.name

  return (
    <View
      style={[
        tw`absolute flex-row items-center justify-between `,
        {
          bottom: Math.max(insets.bottom, 30),
          left: 16,
          right: 16,
          height: 62,
          borderRadius: 35,
          paddingHorizontal: 10,
          elevation: 12,
          shadowColor: "#000000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 16,
          backgroundColor: colors.background,
        },
      ]}
    >
      {state.routes.map(
        (
          route: { key: string; name: string; params?: object },
          _index: number
        ) => {
          const isFocused = isDrawerOpen
            ? route.name === "menu"
            : activeRouteName === route.name
          const label = TAB_LABELS[route.name] || route.name
          const color = isFocused ? "#FFFFFF" : "#64748B"
          const iconXml = getTabIconXml(route.name, color)

          const onPress = () => {
            if (route.name === "menu") {
              if (isDrawerOpen) {
                closeDrawer()
              } else {
                openDrawer()
              }
              return
            }

            if (isDrawerOpen) {
              closeDrawer()
            }

            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            })

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params)
            }
          }

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              activeOpacity={0.8}
            >
              <TabBarItem
                isFocused={isFocused}
                label={label}
                iconXml={iconXml}
              />
            </TouchableOpacity>
          )
        }
      )}
    </View>
  )
}

export default function MenuBar() {
  const { resolvedTheme } = useAppTheme()
  return (
    <>
      <StatusBar style={resolvedTheme === "dark" ? "light" : "dark"} />

      <Tabs
        tabBar={(props: any) => <CustomTabBar {...props} />}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tabs.Screen name="index" />
        <Tabs.Screen name="train" />
        <Tabs.Screen name="social" />
        <Tabs.Screen name="appts" />
        <Tabs.Screen
          name="menu"
          listeners={{
            tabPress: (e) => {
              e.preventDefault()
              openDrawer()
            },
          }}
        />
      </Tabs>
    </>
  )
}
