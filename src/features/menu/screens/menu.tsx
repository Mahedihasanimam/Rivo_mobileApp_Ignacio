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
import tw from "@/lib/tailwind"
import { useAppTheme } from "@/theme/theme-provider"
import { router } from "expo-router"
import { DrawerContentComponentProps } from "expo-router/drawer"
import { useEffect } from "react"
import { Image, Pressable, ScrollView, View } from "react-native"
import { SvgXml } from "react-native-svg"

// Module-level ref — holds the drawer navigation so any component
// can call openDrawer() without importing from @react-navigation/native
let _drawerNav: DrawerContentComponentProps["navigation"] | null = null

export function openDrawer() {
  _drawerNav?.openDrawer()
}

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
  // {
  //   title: "Support",
  //   icon: helpOutline,
  //   darkIcon: helpOutline,
  //   route: "/support",
  // },
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

export function CustomDrawer(props?: Partial<DrawerContentComponentProps>) {
  // Keep the ref up-to-date whenever this component renders
  useEffect(() => {
    if (props?.navigation) {
      _drawerNav = props.navigation
    }
  }, [props?.navigation])

  const navigateToScreen = (route?: string) => {
    // props.navigation.navigate(route as never)
    router.push(route as never)
  }

  const handleLogout = () => {
    // তোমার logout function এখানে
    console.log("Logout")
  }

  const { colors, resolvedTheme } = useAppTheme()

  return (
    <View
      style={[
        tw`flex-1 `,
        {
          backgroundColor: colors.background,
          marginTop: 20,
        },
      ]}
    >
      {/* Header */}
      <View style={tw`flex-row items-center justify-between px-5 py-5`}>
        <AppText variant="title" tone="text" style={tw`font-inter-bold`}>
          Menu
        </AppText>

        <Pressable
          onPress={() =>
            props?.navigation?.closeDrawer
              ? props.navigation.closeDrawer()
              : router.canGoBack()
                ? router.back()
                : undefined
          }
          style={({ pressed }) => [
            tw`items-center justify-center `,
            pressed && tw`opacity-70`,
            {
              backgroundColor: colors.backButtonBg,
              padding: 10,
              borderRadius: 100,
            },
          ]}
        >
          <SvgXml xml={resolvedTheme === "dark" ? closeIconWhite : closeIcon} />
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`pb-6`}
      >
        {/* Pet & Owner Info */}
        <View style={tw`flex-row items-center gap-4 px-5`}>
          {/* Pet Image */}
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

          {/* Information */}
          <View style={tw`flex-1`}>
            <AppText
              variant="title"
              tone="text"
              style={tw`font-inter-semibold`}
            >
              Pedro
            </AppText>

            <AppText variant="caption" tone="text" style={tw`font-inter-bold`}>
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
      <View style={tw` px-5 pb-5 pt-3`}>
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

          <AppText variant="body" tone="danger" style={tw`font-inter-semibold`}>
            Log Out
          </AppText>
        </Pressable>
      </View>
    </View>
  )
}

export default CustomDrawer
