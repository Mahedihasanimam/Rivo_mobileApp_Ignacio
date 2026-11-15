import { Button } from "@/components/ui/button"
import { router } from "expo-router"

import { UpdateTopBarPluseLogo } from "@/components/ui/app-top-bar"
import tw from "@/lib/tailwind"
import { spacing } from "@/theme/spacing"
import { ScrollView, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import {
  DailyInsightCard,
  EmergencyCard,
  HomeHeader,
  PetProfileCard,
  QuickActions,
  StreaksCard,
  TodaysCare,
  UpcomingReminders,
} from "../components"

export default function HomeScreen() {
  // const { user } = useSession()
  // const { modules } = useWorkspaceStore()
  // const { readyModules, plannedModules } = useHomeSummary(modules)
  // const { locale, t } = useI18n()
  // const { resolvedTheme } = useAppTheme()
  const insets = useSafeAreaInsets()

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        // paddingBottom: Math.max(insets.bottom + 150),
      }}
    >
      <View
        style={{
          gap: spacing.lg,
          padding: spacing.px,
          paddingTop: Math.max(insets.top),
        }}
      >
        <UpdateTopBarPluseLogo message={true} />
        <HomeHeader />
        <PetProfileCard />
        <DailyInsightCard
          petName="Butch"
          onRefresh={() => {
            console.log("Refresh insight")
          }}
          onPress={() => {
            console.log("Insight pressed")
          }}
        />
        <TodaysCare />
        <Button
          onPress={() => router.push("/(walk-mode)")}
          label="Start Walk"
        />
        <StreaksCard />
        {/* <RivoCareAIInsight /> */}
        <UpcomingReminders />
        <QuickActions />
      </View>
      <View
        style={[
          tw`w-full h-80 mt-4 bg-black/95 rounded-t-2xl`,
          {
            padding: spacing.px,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: -4,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4.2,
            elevation: 10,
          },
        ]}
      >
        <EmergencyCard />
      </View>
    </ScrollView>
  )
}
