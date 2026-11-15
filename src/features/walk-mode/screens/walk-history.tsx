import { Pressable, View } from "react-native"

import { AppText } from "@/components/ui/app-text"

import TopBackButton from "@/components/ui/app-top-bar"
import { Screen } from "@/components/ui/screen"
import tw from "@/lib/tailwind"
import { useAppTheme } from "@/theme/theme-provider"
import { useState } from "react"
import HeatmapScreen from "../components/heatmap"
import History from "../components/history"
import StatisticsScreen from "../components/statistics"
import WalkRouteScreen from "../components/walk-routes"

const tabs = ["History", "Statistic", "Heatmap", "Routes"]

export default function WalkHistoryScreen() {
  const [activeTab, setActiveTab] = useState<string>("History")
  const { colors, resolvedTheme } = useAppTheme()
  const isDark = resolvedTheme === "dark"

  return (
    <Screen scroll={true}>
      <TopBackButton title="Walk History" />
      <View style={tw`w-full flex-1`}>
        <View style={tw`w-full gap-6`}>
          {/* Tabs */}
          <View style={tw`w-full flex-row gap-1 p-2`}>
            {tabs.map((tab) => {
              const active = activeTab === tab

              return (
                <Pressable
                  key={tab}
                  onPress={() => setActiveTab(tab)}
                  style={[
                    tw`flex-1 items-center justify-center rounded-full`,
                    active
                      ? tw`bg-primary py-2.5`
                      : tw` ${isDark ? `bg-[${colors.surface}]` : "bg-[#F0F4F3]"} py-2.5`,
                  ]}
                >
                  <AppText
                    variant="caption"
                    tone={active ? "textWhite" : "gray"}
                    numberOfLines={1}
                    style={tw`font-inter-semibold`}
                  >
                    {tab}
                  </AppText>
                </Pressable>
              )
            })}
          </View>

          {/* Content */}
          {activeTab === "History" && <History />}
          {activeTab === "Statistic" && <StatisticsScreen />}
          {activeTab === "Heatmap" && <HeatmapScreen />}
          {activeTab === "Routes" && <WalkRouteScreen />}
        </View>
      </View>
    </Screen>
  )
}
