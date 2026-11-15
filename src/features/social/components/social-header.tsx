import {
  feedActive,
  feedInactive,
  feedInactiveDark,
  MatchActive,
  MatchInactive,
  MatchInactiveDark,
  MessagesActive,
  messagesIcon,
  MessagesInactive,
  MessagesInactiveDark,
} from "@/assets/icons/icons"
import { AppText } from "@/components/ui/app-text"
import { Card } from "@/components/ui/card"
import SearchBar from "@/components/ui/search-bar"
import tw from "@/lib/tailwind"
import { useAppTheme } from "@/theme/theme-provider"
import { router } from "expo-router"
import { Pressable, View } from "react-native"
import { SvgXml } from "react-native-svg"
import { TABS } from "../data/social-data"
import type { Tab } from "../types"
import { MessageHeader } from "./message-header"

type SocialHeaderProps = {
  activeTab: Tab
  setActiveTab: (tab: Tab) => void
  searchText: string
  setSearchText: (text: string) => void
}

export const SocialHeader = ({
  activeTab,
  setActiveTab,
  searchText,
  setSearchText,
}: SocialHeaderProps) => {
  const { colors, resolvedTheme } = useAppTheme()

  // theme is light when resolvedTheme is dark and vice versa
  const isDark = resolvedTheme === "dark"

  const getTabIcon = (tab: Tab, active: boolean) => {
    switch (tab) {
      case "Feed":
        return active ? feedActive : isDark ? feedInactiveDark : feedInactive
      case "Match":
        return active ? MatchActive : isDark ? MatchInactiveDark : MatchInactive
      case "Messages":
        return active
          ? MessagesActive
          : isDark
            ? MessagesInactiveDark
            : MessagesInactive
      default:
        return feedInactive
    }
  }

  return (
    <View style={tw`gap-4`}>
      {/* Header Title */}

      {/* Tabs */}
      <Card radius="md" style={tw`flex-row p-1 gap-1`}>
        {TABS.map((tab) => {
          const active = activeTab === tab
          const icon = getTabIcon(tab, active)
          const isMatchActive = tab === "Match" && active

          return (
            <Pressable
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={({ pressed }) => [
                tw`flex-1 flex-row items-center justify-center gap-2 rounded-full px-2 py-2.5`,

                // Normal Active Tab
                active &&
                  !isMatchActive &&
                  tw`${isDark ? `bg-[${colors.cardOverLay}]` : "bg-white"} shadow`,

                // Match Active Design
                isMatchActive && {
                  backgroundColor: "#FF3B5C",
                  elevation: 18,
                  shadowColor: "#FF3B5C",
                  shadowOffset: {
                    width: 0,
                    height: 4,
                  },
                  shadowOpacity: 0.4,
                  shadowRadius: 18,
                },

                pressed && tw`opacity-70`,
              ]}
            >
              <SvgXml xml={icon} />

              <AppText
                variant="caption"
                tone={
                  isMatchActive ? "textWhite" : active ? "blackish" : "textMute"
                }
                style={
                  isMatchActive || active
                    ? tw`font-inter-bold`
                    : tw`font-inter-medium`
                }
              >
                {tab}
              </AppText>
            </Pressable>
          )
        })}
      </Card>

      {activeTab === "Messages" && (
        <MessageHeader
          unreadCount={3}
          onPressMessages={() => {
            console.log("Messages pressed")
          }}
          icon={<SvgXml xml={messagesIcon} />}
        />
      )}

      {activeTab !== "Feed" && (
        <SearchBar
          placeholder="Search for Pedro…"
          value={searchText}
          onClear={() => setSearchText("")}
          onChangeText={setSearchText}
          navigation={() => router.push("/(modal)/match-filter-modal")}
          filter={activeTab === "Match" && true}
        />
      )}
    </View>
  )
}
