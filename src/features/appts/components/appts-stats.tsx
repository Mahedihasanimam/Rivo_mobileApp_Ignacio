import { AppText } from "@/components/ui/app-text"
import tw from "@/lib/tailwind"
import { View } from "react-native"

export function StatCard({
  value,
  label,
  valueColor,
}: {
  value: number
  label: string
  valueColor: string
}) {
  return (
    <View
      style={tw`flex-1 flex-col gap-1 items-center rounded-2xl bg-white px-2 py-3.5 shadow-sm`}
    >
      <AppText
        variant="subtitle"
        style={tw`font-inter-semibold text-[${valueColor}]`}
      >
        {value}
      </AppText>

      <AppText variant="caption" tone="gray" style={tw`font-inter-regular`}>
        {label}
      </AppText>
    </View>
  )
}

export function ApptsStats({
  upcomingCount,
  completedCount,
  thisMonthCount,
}: {
  upcomingCount: number
  completedCount: number
  thisMonthCount: number
}) {
  return (
    <View style={tw`mt-5 flex-row gap-3`}>
      <StatCard value={upcomingCount} label="Upcoming" valueColor="#2F9C8F" />

      <StatCard value={completedCount} label="Completed" valueColor="#00C897" />

      <StatCard value={thisMonthCount} label="This Month" valueColor="#A855F7" />
    </View>
  )
}

