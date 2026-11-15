import { useMemo, useState } from "react"
import { Pressable, View } from "react-native"

import { AppText } from "@/components/ui/app-text"
import { Card } from "@/components/ui/card"
import tw from "@/lib/tailwind"
import { useAppTheme } from "@/theme/theme-provider"
import { LinearGradient } from "expo-linear-gradient"
import CalendarWalkHistory from "./calendar-walk-history"

const chartData = [
  { day: "M", value: 4 },
  { day: "", value: 0 },
  { day: "T", value: 3 },
  { day: "F", value: 4 },
  { day: "S", value: 4 },
  { day: "S", value: 2 },
  { day: "S", value: 2 },
]

const summaryData = [
  {
    value: "5",
    label: "Walks",
  },
  {
    value: "12.4",
    label: "Total km",
  },
  {
    value: "1,250",
    label: "Total kcal",
  },
]

const periods = ["Week", "Month", "Year"]

const StatisticsScreen = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("Week")

  const maxValue = useMemo(
    () => Math.max(...chartData.map((item) => item.value), 6),
    []
  )

  const { colors, resolvedTheme } = useAppTheme()

  const isDark = resolvedTheme === "dark"

  return (
    <View style={tw`w-full gap-6`}>
      {/* ================= DISTANCE ================= */}
      <CalendarWalkHistory />
      <View style={tw`w-full gap-3`}>
        <AppText
          variant="subtitle"
          tone="blackish"
          style={tw`pl-1 font-inter-semibold`}
        >
          Distance (km)
        </AppText>

        <Card
          radius="md"
          style={[
            tw`w-full p-4`,
            {
              height: 192,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 4,
              },
              shadowOpacity: 0.04,
              shadowRadius: 20,
              elevation: 2,
            },
          ]}
        >
          {/* Chart */}
          <View style={tw`flex-1 flex-row`}>
            {/* Y Axis */}
            <View style={tw`w-6 justify-between py-0.5`}>
              {[6, 4, 2, 0].map((value) => (
                <AppText
                  key={value}
                  variant="caption"
                  tone="gray"
                  style={tw`font-inter-medium`}
                >
                  {value}
                </AppText>
              ))}
            </View>

            {/* Chart Area */}
            <View style={tw`flex-1`}>
              {/* Grid */}
              <View
                style={tw`absolute inset-0 justify-between`}
                pointerEvents="none"
              >
                {[0, 1, 2, 3].map((line) => (
                  <View
                    key={line}
                    style={tw`w-full border-b border-neutral-300/30`}
                  />
                ))}
              </View>

              {/* Bars */}
              <View
                style={tw`flex-1 flex-row items-end justify-between px-2 pb-0.5`}
              >
                {chartData.map((item, index) => {
                  const height = `${(item.value / maxValue) * 100}%`

                  return (
                    <View
                      key={`${item.day}-${index}`}
                      style={tw`h-full flex-1 items-center justify-end`}
                    >
                      {item.value > 0 && (
                        <View
                          style={[
                            tw`w-2 rounded-t-sm bg-teal-600`,
                            {
                              height,
                            },
                          ]}
                        />
                      )}
                    </View>
                  )
                })}
              </View>
            </View>
          </View>

          {/* X Axis */}
          <View style={tw`ml-6 mt-2 flex-row`}>
            {chartData.map((item, index) => (
              <View
                key={`${item.day}-label-${index}`}
                style={tw`flex-1 items-center`}
              >
                {item.day ? (
                  <AppText
                    variant="caption"
                    tone="gray"
                    style={tw`font-inter-medium`}
                  >
                    {item.day}
                  </AppText>
                ) : (
                  <View style={tw`h-1.5 w-3 bg-zinc-600`} />
                )}
              </View>
            ))}
          </View>

          {/* Selected Value */}
          <View
            style={[
              tw`absolute rounded-lg bg-primary px-2 py-1`,
              {
                top: 28,
                left: "50%",
                transform: [{ translateX: -20 }],
              },
            ]}
          >
            <AppText
              variant="caption"
              tone="textWhite"
              style={tw`font-inter-medium`}
            >
              4.8 km
            </AppText>
          </View>
        </Card>
      </View>

      {/* ================= SUMMARY ================= */}
      <Card
        radius="md"
        style={[
          tw`w-full flex-row p-4`,
          {
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.04,
            shadowRadius: 20,
            elevation: 2,
          },
        ]}
      >
        {summaryData.map((item, index) => (
          <View
            key={item.label}
            style={[
              tw`flex-1 items-center justify-center`,
              index !== summaryData.length - 1 &&
                tw`border-r border-neutral-300/30`,
            ]}
          >
            <AppText variant="title" tone="primary" style={tw`font-inter-bold`}>
              {item.value}
            </AppText>

            <AppText
              variant="caption"
              tone="gray"
              style={tw`pt-1 font-inter-medium`}
            >
              {item.label}
            </AppText>
          </View>
        ))}
      </Card>

      {/* ================= GOAL PROGRESS ================= */}
      <View style={tw`w-full gap-3`}>
        <AppText
          variant="subtitle"
          tone="blackish"
          style={tw`pl-1 font-inter-semibold`}
        >
          Goal Progress
        </AppText>

        <Card
          radius="md"
          style={[
            tw`w-full flex-row items-center p-6`,
            {
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 4,
              },
              shadowOpacity: 0.04,
              shadowRadius: 20,
              elevation: 2,
            },
          ]}
        >
          {/* Progress Circle */}
          <LinearGradient
            colors={["#bfd8d5", "#0e8d80"]}
            locations={[0, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={tw`h-16 w-16 items-center justify-center rounded-full`}
          >
            <View
              style={tw`h-12 w-12 items-center justify-center rounded-full bg-white`}
            >
              <AppText
                variant="caption"
                tone="primary"
                style={tw`font-inter-semibold`}
              >
                80%
              </AppText>
            </View>
          </LinearGradient>

          {/* Goal Info */}
          <View style={tw`ml-4 flex-1`}>
            <AppText
              variant="title"
              tone="blackish"
              style={tw`font-inter-bold`}
            >
              4 of 5
            </AppText>

            <AppText
              variant="caption"
              tone="gray"
              style={tw`font-inter-medium`}
            >
              Goals Completed
            </AppText>
          </View>
        </Card>
      </View>

      {/* ================= PERIOD TABS ================= */}
      <View
        style={[
          tw`w-full flex-row rounded-xl p-1`,
          {
            backgroundColor: isDark ? colors.surface : "#F3F3F6",
          },
        ]}
      >
        {periods.map((period) => {
          const active = selectedPeriod === period

          return (
            <Pressable
              key={period}
              onPress={() => setSelectedPeriod(period)}
              style={[
                tw`flex-1 items-center justify-center rounded-lg py-2`,
                active && tw`bg-teal-600`,
              ]}
            >
              <AppText
                variant="caption"
                tone={active ? "textWhite" : "gray"}
                style={tw`font-inter-semibold tracking-tight`}
              >
                {period}
              </AppText>
            </Pressable>
          )
        })}
      </View>
    </View>
  )
}

export default StatisticsScreen
