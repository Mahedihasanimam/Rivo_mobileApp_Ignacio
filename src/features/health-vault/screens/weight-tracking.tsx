import { time } from "@/assets/icons/icons"
import { AppText } from "@/components/ui/app-text"
import TopBackButton from "@/components/ui/app-top-bar"
import { Button } from "@/components/ui/button"
import { LoadingIndicator } from "@/components/ui/loading-indicator"
import { Screen } from "@/components/ui/screen"
import { PET_ID } from "@/constants/pet-id"
import tw from "@/lib/tailwind"
import { _WIDTH } from "@/utils/utils"
import { Image } from "expo-image"
import { router } from "expo-router"
import { useMemo } from "react"
import { Pressable, View } from "react-native"
import { LineChart } from "react-native-gifted-charts"
import { SvgXml } from "react-native-svg"
import { useGetHealthVaultWeightQuery } from "../api/health-vault-api"
import { useHealthVault } from "../hook"
import { IWeightLog } from "../type"

export default function WeightTrackingScreen() {
  const CHART_HEIGHT = 200
  const { data, isLoading, error } = useGetHealthVaultWeightQuery(PET_ID)
  const { weightTracking } = useHealthVault(PET_ID)

  const weightLogs = data?.data ?? []

  const lineData = useMemo(() => {
    if (!weightLogs || weightLogs.length === 0) {
      return []
    }

    return weightLogs.map((item: IWeightLog) => {
      let label = ""
      if (item.logged_at) {
        const parts = item.logged_at.trim().split(" ")
        // Format e.g. "01 Mar 2026", parts[1] is "Mar"
        label = parts[1] || parts[0] || ""
      } else if (item.logged_at_iso) {
        const d = new Date(item.logged_at_iso)
        if (!isNaN(d.getTime())) {
          label = d.toLocaleDateString("en-US", { month: "short" })
        }
      }

      return {
        value: Number(item.weight_kg) || 0,
        label,
        dataPointText: `${item.weight_kg}`,
      }
    })
  }, [weightLogs])

  const { maxValue, noOfSections, stepValue } = useMemo(() => {
    if (lineData.length === 0) {
      return { maxValue: 30, noOfSections: 3, stepValue: 10 }
    }
    const maxVal = Math.max(...lineData.map((d) => d.value), 20)
    const calculatedMax = Math.max(Math.ceil((maxVal + 2) / 5) * 5, 25)
    const step = calculatedMax <= 30 ? 5 : 10
    const sections = Math.ceil(calculatedMax / step)
    return {
      maxValue: sections * step,
      noOfSections: sections,
      stepValue: step,
    }
  }, [lineData])

  const chartSpacing = useMemo(() => {
    if (lineData.length <= 1) return 40
    return (_WIDTH - 140) / (lineData.length - 1)
  }, [lineData.length])

  const latestLog = useMemo(() => {
    if (weightLogs.length === 0) return null
    return weightLogs[weightLogs.length - 1]
  }, [weightLogs])

  const currentWeightDisplay = latestLog
    ? `${latestLog.weight_kg} kg`
    : weightTracking?.current_weight_kg
      ? `${weightTracking.current_weight_kg} kg`
      : "20.4 kg"

  const lastUpdatedDisplay = latestLog?.logged_at
    ? `Logged on ${latestLog.logged_at}`
    : weightTracking?.last_updated
      ? `Last updated ${weightTracking.last_updated}`
      : "Today"

  return (
    <Screen>
      <TopBackButton title="Weight Track" />

      {isLoading && !data ? (
        <LoadingIndicator label="Loading weight records..." />
      ) : (
        <>
          <CurrentWeightCard
            weight={currentWeightDisplay}
            updatedAt={lastUpdatedDisplay}
          />

          {/* AI Health Insights */}
          <View
            style={tw`flex-row items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm`}
          >
            <View style={tw`flex-1 flex-row items-center gap-3`}>
              <View
                style={tw`rounded-full bg-teal-50 p-2.5 items-center justify-center`}
              >
                <Image
                  source={require("@/assets/health-vault/aI-health.png")}
                  style={tw`w-6 h-6`}
                  contentFit="contain"
                />
              </View>

              <View style={tw`flex-1 flex-col gap-1`}>
                <AppText
                  variant="caption"
                  tone="text"
                  style={tw`font-inter-semibold`}
                >
                  {"Track Pedro's weight over time"}
                </AppText>

                <AppText
                  variant="caption"
                  tone="gray"
                  style={tw`font-inter-regular`}
                >
                  {
                    "Monitor progress and stay informed about your pet's health."
                  }
                </AppText>
              </View>
            </View>

            <Pressable
              onPress={() => router.push("/membership" as never)}
              style={({ pressed }) => [
                tw`rounded-full bg-[#0D9488] px-4 py-2`,
                pressed && tw`opacity-70`,
              ]}
            >
              <AppText
                variant="caption"
                tone="textWhite"
                style={tw`font-inter-bold`}
              >
                Upgrade
              </AppText>
            </Pressable>
          </View>

          {/* Chart Card */}
          <View style={tw`w-full rounded-2xl pt-6 pb-4 relative`}>
            {lineData.length > 0 ? (
              <LineChart
                data={lineData}
                width={_WIDTH - 96}
                height={CHART_HEIGHT}
                initialSpacing={20}
                endSpacing={20}
                spacing={chartSpacing}
                curved
                isAnimated
                thickness={3}
                color="#0D9488"
                maxValue={maxValue}
                noOfSections={noOfSections}
                stepValue={stepValue}
                yAxisLabelSuffix=" kg"
                yAxisTextStyle={{
                  color: "#6B7280",
                  fontSize: 11,
                }}
                xAxisLabelTextStyle={{
                  color: "#6B7280",
                  fontSize: 11,
                }}
                yAxisColor="transparent"
                xAxisColor="#E5E7EB"
                rulesColor="#F3F4F6"
                rulesType="solid"
                dataPointsColor="#34D399"
                dataPointsRadius={6}
                areaChart
                startFillColor="#A7F3D0"
                endFillColor="rgba(13, 148, 136, 0)"
                startOpacity={0.4}
                endOpacity={0}
                hideRules={false}
                showVerticalLines={false}
              />
            ) : (
              <View style={tw`h-[200px] items-center justify-center`}>
                <AppText
                  variant="caption"
                  tone="gray"
                  style={tw`font-inter-medium`}
                >
                  No weight records found
                </AppText>
              </View>
            )}
          </View>

          <View style={tw`items-center py-2`}>
            <Button
              onPress={() => router.push("/enter-weight-modal")}
              label="Enter Weight"
            />
          </View>
        </>
      )}
    </Screen>
  )
}

type CurrentWeightCardProps = {
  weight?: string
  updatedAt?: string
  image?: string
}

function CurrentWeightCard({
  weight = "20.4 kg",
  updatedAt = "Today 8 AM",
}: CurrentWeightCardProps) {
  return (
    <View
      style={tw`self-stretch overflow-hidden rounded-2xl border border-slate-100 bg-white p-5 shadow-sm`}
    >
      <View style={tw`flex-row items-center justify-between gap-4`}>
        {/* Content */}
        <View style={tw`flex-1 gap-2`}>
          {/* Title */}
          <AppText variant="body" tone="gray" style={tw`font-inter-bold`}>
            Current Weight
          </AppText>

          {/* Weight */}
          <AppText variant="title" tone="text" style={tw`font-inter-bold`}>
            {weight}
          </AppText>

          {/* Updated Time */}
          <View style={tw`flex-row items-center gap-1.5 pt-1`}>
            <SvgXml xml={time} />

            <AppText
              variant="caption"
              tone="grayish"
              style={tw`font-inter-medium`}
            >
              {updatedAt}
            </AppText>
          </View>
        </View>

        {/* Image */}
        <Image
          source={require("@/assets/health-vault/weight-tracking.png")}
          contentFit="contain"
          style={tw`w-24 h-24`}
        />
      </View>
    </View>
  )
}
