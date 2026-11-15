import TopBackButton from "@/components/ui/app-top-bar"
import { LoadingIndicator } from "@/components/ui/loading-indicator"
import { Screen } from "@/components/ui/screen"
import tw from "@/lib/tailwind"
import { router } from "expo-router"
import { View } from "react-native"
import {
  AIHealthInsightCard,
  HealthCardItem,
  HealthScoreCard,
} from "../components"
import { useHealthVault } from "../hook"

export default function HealthDashboardScreen() {
  const { healthCards, healthScore, aiInsight, isLoading } = useHealthVault("1")

  return (
    <Screen>
      {/* <TopLogo /> */}

      <TopBackButton title="Health Vault" />

      {isLoading && !healthScore ? (
        <LoadingIndicator label="Loading health dashboard..." />
      ) : (
        <>
          {/* Overall Health Score */}
          <HealthScoreCard
            healthScore={healthScore?.score}
            outOf={healthScore?.out_of}
            status={healthScore?.status}
            lastUpdated={healthScore?.last_updated}
          />

          {/* Vaccination & Weight */}
          <View style={tw`flex-row gap-3`}>
            {healthCards.slice(0, 2).map((item) => (
              <HealthCardItem
                key={item.id}
                item={item}
                onPress={() => router.push(item.route as never)}
              />
            ))}
          </View>

          {/* Health Documents */}
          {healthCards[2] && (
            <HealthCardItem
              item={healthCards[2]}
              fullWidth
              onPress={() => router.push(healthCards[2].route as never)}
            />
          )}

          {/* AI Health Insights */}
          <AIHealthInsightCard insight={aiInsight} />

          {/* Care */}
          {healthCards[3] && (
            <HealthCardItem
              item={healthCards[3]}
              fullWidth
              onPress={() => router.push(healthCards[3].route as never)}
            />
          )}
        </>
      )}
    </Screen>
  )
}
