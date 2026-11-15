import {
  activityIcon,
  aiBot,
  danger,
  redRightArrow,
  vaccination,
} from "@/assets/icons/icons"
import { AppText } from "@/components/ui/app-text"
import TopBackButton from "@/components/ui/app-top-bar"
import { Screen } from "@/components/ui/screen"
import { UpgradeCard } from "@/features/health-vault/screens/health-documents"
import tw from "@/lib/tailwind"
import { router } from "expo-router"
import { memo, useCallback, useMemo } from "react"
import { FlatList, Pressable, View } from "react-native"
import { SvgXml } from "react-native-svg"
import { QuickActions } from "../components/quick-actions"

type SmartAlert = {
  id: string
  title: string
  description: string
  icon: string
  iconColor: string
  iconBackground: string
}

const SMART_ALERTS: SmartAlert[] = [
  {
    id: "activity",
    title: "Activity below average",
    description: "40% fewer steps than usual",
    icon: activityIcon,
    iconColor: "#F59E0B",
    iconBackground: "#FFFBEB",
  },
  {
    id: "vaccination",
    title: "Vaccination due soon",
    description: "Annual booster in 14 days",
    icon: vaccination,
    iconColor: "#0D9488",
    iconBackground: "#F0FDFA",
  },
  {
    id: "hydration",
    title: "Check hydration",
    description: "Low water intake detected",
    icon: vaccination,
    iconColor: "#38BDF8",
    iconBackground: "#F0F9FF",
  },
  {
    id: "heart-rate",
    title: "Heart rate normal",
    description: "Resting BPM within range",
    icon: activityIcon,
    iconColor: "#22C55E",
    iconBackground: "#F0FDF4",
  },
]

type SmartAlertCardProps = {
  item: SmartAlert
  onPress?: (item: SmartAlert) => void
}

type AIVetProps = {
  title?: string
  description?: string
  isOnline?: boolean
  icon: React.ReactNode
}

export default function index() {
  return (
    <Screen>
      <TopBackButton title="RivoCare AI" />

      <AIVet
        icon={""}
        title="RivoCare AI"
        description="24/7 Smart Pet Health Assistant"
        isOnline={true}
      />

      {/* Emergency Section */}
      <Pressable
        onPress={() => router.push("/(emergency-vet-help)")}
        style={tw`w-full h-20 mt-6 px-5 py-4 bg-red-500/5 rounded-2xl border border-red-500/20 flex-row items-center gap-4`}
      >
        <View
          style={tw`w-10 h-10 bg-red-500/10 rounded-xl items-center justify-center`}
        >
          <SvgXml xml={danger} />
        </View>

        <View style={tw`flex-1`}>
          <AppText
            variant="body"
            tone="danger"
            style={tw`text-base font-bold leading-4`}
          >
            Emergency Mode
          </AppText>

          <AppText variant="caption" style={tw`mt-1 text-red-600/60 leading-5`}>
            Urgent help, from trusted vet & first aid steps
          </AppText>
        </View>

        <SvgXml xml={redRightArrow} />
      </Pressable>

      <SmartAlerts
        onAlertPress={(alert) => {
          console.log("Selected alert:", alert.id)
        }}
      />
      <QuickActions
      // onActionPress={(action) => {
      //   // switch (action.id) {
      //   //   case "symptom-checker":
      //   //     router.push("/symptom-checker")
      //   //     break
      //   //   case "ask-question":
      //   //     router.push("/ai-chat")
      //   //     break
      //   //   case "nutrition":
      //   //     router.push("/nutrition")
      //   //     break
      //   //   case "training":
      //   //     router.push("/training")
      //   //     break
      //   // }
      // }}
      />
      <UpgradeCard />
    </Screen>
  )
}

function AIVet({
  title = "RivoCare AI",
  description = "24/7 Smart Pet Health Assistant",
  isOnline = true,
  icon,
}: AIVetProps) {
  return (
    <View style={tw`gap-4 rounded-2xl bg-[#2F9C8F] px-6 py-6 shadow-lg`}>
      <View style={tw`flex-row items-center justify-between gap-4`}>
        {/* Left Content */}
        <View style={tw`flex-1 flex-row items-center gap-3`}>
          {/* AI Icon */}
          <View
            style={tw`items-center justify-center rounded-2xl bg-white/20 p-3`}
          >
            <SvgXml xml={aiBot} />
          </View>

          {/* AI Information */}
          <View style={tw`flex-1`}>
            <AppText
              variant="subtitle"
              tone="textWhite"
              style={tw`font-inter-semibold`}
            >
              {title}
            </AppText>

            <AppText
              variant="caption"
              tone="textWhite"
              style={[tw`font-inter-regular`, { opacity: 0.72 }]}
            >
              {description}
            </AppText>
          </View>
        </View>

        {/* Online Status */}
        <View
          style={tw`flex-row items-center gap-2 self-start rounded-full bg-white/15 px-3 py-1.5`}
        >
          <View
            style={[
              tw`rounded-full p-1`,
              isOnline ? tw`bg-[#4ADE80]` : tw`bg-gray-400`,
            ]}
          />

          <AppText
            variant="caption"
            tone="textWhite"
            style={[tw`font-inter-semibold`, { opacity: 0.9 }]}
          >
            {isOnline ? "Online" : "Offline"}
          </AppText>
        </View>
      </View>
    </View>
  )
}

const SmartAlertCard = memo(({ item, onPress }: SmartAlertCardProps) => {
  const handlePress = useCallback(() => {
    onPress?.(item)
  }, [item, onPress])

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        tw`w-48 rounded-2xl border border-black/10 bg-white p-3.5 shadow-sm`,
        pressed && tw`opacity-70`,
      ]}
    >
      {/* Icon */}
      <View
        style={[
          tw`self-start items-center justify-center rounded-xl p-2`,
          {
            backgroundColor: item.iconBackground,
          },
        ]}
      >
        <SvgXml xml={item.icon} />
      </View>

      {/* Content */}
      <View style={tw`gap-1 pt-3`}>
        <AppText
          variant="body"
          tone="text"
          numberOfLines={2}
          style={tw`font-inter-semibold`}
        >
          {item.title}
        </AppText>

        <AppText
          variant="caption"
          tone="gray"
          numberOfLines={2}
          style={tw`font-inter-regular`}
        >
          {item.description}
        </AppText>
      </View>
    </Pressable>
  )
})

SmartAlertCard.displayName = "SmartAlertCard"

type SmartAlertsProps = {
  alerts?: SmartAlert[]
  onAlertPress?: (alert: SmartAlert) => void
}

export function SmartAlerts({
  alerts = SMART_ALERTS,
  onAlertPress,
}: SmartAlertsProps) {
  const activeAlerts = useMemo(() => alerts.length, [alerts])

  const renderItem = useCallback(
    ({ item }: { item: SmartAlert }) => (
      <SmartAlertCard item={item} onPress={onAlertPress} />
    ),
    [onAlertPress]
  )

  const keyExtractor = useCallback((item: SmartAlert) => item.id, [])

  return (
    <View style={tw`gap-3 pt-5`}>
      {/* Section Header */}
      <View style={tw`flex-row items-center justify-between`}>
        <AppText
          variant="eyebrow"
          tone="default"
          style={tw`font-inter-semibold`}
        >
          Smart Alerts
        </AppText>

        <AppText
          variant="caption"
          tone="primary"
          style={tw`font-inter-semibold`}
        >
          {activeAlerts} active
        </AppText>
      </View>

      {/* Alerts */}
      <FlatList
        horizontal
        data={alerts}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={tw`gap-3 pb-1`}
        initialNumToRender={3}
        maxToRenderPerBatch={3}
        windowSize={3}
        removeClippedSubviews
        getItemLayout={(_, index) => ({
          length: 192,
          offset: 192 + 12,
          index,
        })}
      />
    </View>
  )
}
