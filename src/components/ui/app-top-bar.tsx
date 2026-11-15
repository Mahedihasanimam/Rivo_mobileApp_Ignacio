import {
  backButton,
  backButtonWhite,
  friendTopIcons,
  homeButton,
  menuButton,
  messageIcons,
  rivoWhiteImage,
  searchIconsPrimary,
} from "@/assets/icons/icons"
import { openDrawer } from "@/lib/drawer-ref"
import { useAppTheme } from "@/theme/theme-provider"
import { router } from "expo-router"
import React from "react"
import { StyleSheet, TouchableOpacity, View } from "react-native"
import { SvgXml } from "react-native-svg"
import tw from "./../../lib/tailwind"
import { AppText } from "./app-text"

interface AuthHeadingProps {
  icon?: boolean // SVG XML string
  onBack?: () => void
  title?: string
  subtitle?: string
  titleStyle?: string // Tailwind class string
  subtitleStyle?: string // Tailwind class string
  containerStyle?: string // Tailwind class string
  gap?: string // Tailwind spacing class
  route?: () => void
  addIiocns?: boolean
  deleteICons?: boolean
  threeDot?: boolean
  id?: string | number
  call?: boolean
  search?: boolean
  rightNavigation?: () => void
  hidden?: boolean
  newTopBarExtra?: boolean
  friend?: boolean
}

export type TopBarRightIconType = "home" | "message" | "friend" | (string & {})

export interface UpdateTopBarPluseLogoProps {
  message?: boolean
  friend?: boolean
  type?: TopBarRightIconType
  icon?: TopBarRightIconType
  onPressRight?: () => void
}

export const UpdateTopBarPluseLogo = ({
  message,
  friend,
  type,
  icon,
  onPressRight,
}: UpdateTopBarPluseLogoProps = {}) => {
  // const navigation =
  //   useNavigation<DrawerNavigationProp<Record<string, undefined>>>()

  const getRightIcon = () => {
    const activeType =
      icon || type || (message ? "message" : friend ? "friend" : "home")

    switch (activeType) {
      case "message":
        return messageIcons
      case "friend":
        return friendTopIcons
      case "home":
        return homeButton
      default:
        return activeType?.startsWith("<svg") ? activeType : homeButton
    }
  }

  return (
    <View style={[tw``, styles.barContainer]}>
      {/* Left — menu button opens drawer */}
      <TouchableOpacity onPress={openDrawer}>
        <SvgXml xml={menuButton} />
      </TouchableOpacity>

      {/* Center — Rivo logo */}
      <View style={styles.logoCenter}>
        <SvgXml xml={rivoWhiteImage} width={120} height={34} />
      </View>

      {/* Right — dynamic button */}
      <TouchableOpacity
        onPress={onPressRight || (() => router.push("/(main)/(tabs)"))}
      >
        <SvgXml xml={getRightIcon()} />
      </TouchableOpacity>
    </View>
  )
}

const TopBackButton: React.FC<AuthHeadingProps> = ({
  icon = backButton,
  onBack = () => router.back(),
  title = "",
  search = false,
  rightNavigation,
  hidden = false,
  containerStyle,
  titleStyle,
  newTopBarExtra = true,
  friend = false,
}) => {
  const { resolvedTheme, colors } = useAppTheme()

  return (
    <>
      {newTopBarExtra && <UpdateTopBarPluseLogo friend={friend} />}
      <View
        style={[
          tw`w-full flex-row items-center justify-between`,
          containerStyle ? tw`${containerStyle}` : null,
        ]}
      >
        <View style={tw`flex-row items-center gap-3 flex-1 mr-2`}>
          {/* Back Button */}
          {icon && (
            <TouchableOpacity
              style={[
                {
                  backgroundColor: colors.backButtonBg,
                  padding: 8,
                  borderRadius: 100,
                },
                tw`flex-shrink-0`,
              ]}
              onPress={onBack}
            >
              <SvgXml
                xml={resolvedTheme === "dark" ? backButtonWhite : backButton}
              />
            </TouchableOpacity>
          )}

          {/* Title */}
          <AppText
            tone="blackish"
            selectable={false}
            numberOfLines={1}
            style={[
              tw`font-manrope-extrabold text-xl`,
              titleStyle ? tw`${titleStyle}` : null,
            ]}
          >
            {title}
          </AppText>
        </View>

        {/* Right Actions */}
        <View style={tw`flex-row items-center gap-2 flex-shrink-0`}>
          {search && (
            <TouchableOpacity onPress={rightNavigation}>
              <SvgXml xml={searchIconsPrimary} />
            </TouchableOpacity>
          )}
          {/* {!hidden && !search && (
            // <TouchableOpacity onPress={() => router.push("/(main)/(tabs)")}>
            //   <SvgXml xml={homeIcon} />
            // </TouchableOpacity>
          )} */}
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  // Frame2147242878 — teal pill top bar
  barContainer: {
    width: "100%",
    backgroundColor: "#2f9c8f",
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // padding: 8,
    paddingTop: 8,
    paddingHorizontal: 6,
    paddingBottom: 6,
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    elevation: 4,
    // No elevation here — shadow extends above the view and gets clipped
    // by Screen's safe-area paddingTop on Android
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "rgba(228, 239, 237, 0.22)",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    elevation: 4,
    // No elevation — Android clips elevated children at parent's borderRadius
    // causing the "cut" visual bug seen in the screenshot
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
  },
  logoCenter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
})

export default TopBackButton
