import { redHeard } from "@/assets/icons/icons"
import { AppText } from "@/components/ui/app-text"
import tw from "@/lib/tailwind"
import { LinearGradient } from "expo-linear-gradient"
import { useMemo } from "react"
import { View } from "react-native"
import { SvgXml } from "react-native-svg"

type HealthScoreCardProps = {
  healthScore?: number
  outOf?: number
  status?: string
  lastUpdated?: string
}

export function HealthScoreCard({
  healthScore = 92,
  outOf = 100,
  status,
  lastUpdated,
}: HealthScoreCardProps) {
  const scoreLabel = useMemo(() => {
    if (status) return status
    if (healthScore >= 80) return "Healthy"
    if (healthScore >= 60) return "Needs Attention"
    return "Needs Care"
  }, [healthScore, status])

  const scoreTone = useMemo(() => {
    if (status) {
      const lower = status.toLowerCase()
      if (lower.includes("healthy")) return "success"
      if (lower.includes("attention")) return "warning"
      return "danger"
    }
    if (healthScore >= 80) return "success"
    if (healthScore >= 60) return "warning"
    return "danger"
  }, [healthScore, status])

  return (
    <View style={tw`rounded-2xl bg-[#2F9C8F13] p-5`}>
      <View style={tw`flex-row items-center justify-between gap-4`}>
        <View style={tw`flex-1 gap-1`}>
          <AppText variant="caption" tone="text" style={tw`font-inter-bold`}>
            Overall Health Score
          </AppText>

          <View style={tw`flex-row items-end`}>
            <AppText
              variant="hero"
              tone="primary"
              style={tw`font-inter-medium`}
            >
              {healthScore}
            </AppText>

            <AppText
              variant="subtitle"
              tone="primary"
              style={tw`font-inter-medium`}
            >
              %
            </AppText>
          </View>

          <AppText
            variant="caption"
            tone={scoreTone}
            style={tw`font-inter-semibold`}
          >
            {scoreLabel}
          </AppText>

          <AppText
            variant="caption"
            tone="grayish"
            style={tw`font-inter-regular`}
          >
            {lastUpdated
              ? `Last updated ${lastUpdated}`
              : "Last updated 2 days ago"}
          </AppText>
        </View>

        {/* Health Score Full Circle Indicator with Linear Gradient */}
        <LinearGradient
          colors={["#bfd8d5", "#0e8d80"]}
          locations={[0, 1]}
          start={{ x: 0.1, y: 0.1 }}
          end={{ x: 0.9, y: 0.9 }}
          style={tw`w-28 h-28 rounded-full p-[7px] items-center justify-center`}
        >
          <View
            style={tw`w-full h-full rounded-full bg-white items-center justify-center p-2`}
          >
            <AppText
              variant="caption"
              tone="text"
              style={tw`font-inter-medium text-center`}
            >
              {healthScore}/{outOf}
            </AppText>

            <View style={tw`flex-row items-center gap-1 mt-0.5`}>
              <SvgXml xml={redHeard} />

              <AppText
                variant="caption"
                tone="gray"
                style={tw`font-inter-medium text-[10px]`}
              >
                {status || "Healthy Today"}
              </AppText>
            </View>
          </View>
        </LinearGradient>
      </View>
    </View>
  )
}
