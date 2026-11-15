import { Switch } from "@expo/ui/jetpack-compose"
import { memo, useCallback, useState } from "react"
import { FlatList, View } from "react-native"

import {
  activity,
  appointment,
  emailNotifications,
  notifications,
  redHeardOutline,
  trainingReminder,
} from "@/assets/icons/icons"
import { AppText } from "@/components/ui/app-text"
import { Card } from "@/components/ui/card"
import tw from "@/lib/tailwind"
import { Host } from "@expo/ui"
import { SvgXml } from "react-native-svg"

type NotificationItem = {
  id: string
  title: string
  description: string
  enabled: boolean
  icon: string
  iconLibrary?: "ionicons" | "material"
  iconColor: string
  iconBackground: string
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "push",
    title: "Push Notifications",
    description: "Alerts on your device",
    enabled: true,
    icon: notifications,
    iconColor: "#F59E0B",
    iconBackground: "#FEF3C7",
  },
  {
    id: "email",
    title: "Email Notifications",
    description: "Updates via email",
    enabled: false,
    icon: emailNotifications,
    iconColor: "#F59E0B",
    iconBackground: "#FEF3C7",
  },
  {
    id: "activity",
    title: "Activity Reminders",
    description: "Daily walk and exercise nudges",
    enabled: true,
    icon: activity,
    iconColor: "#22C55E",
    iconBackground: "#DCFCE7",
  },
  {
    id: "training",
    title: "Training Reminders",
    description: "Keep sessions consistent",
    enabled: true,
    icon: trainingReminder,
    iconColor: "#22C55E",
    iconBackground: "#DCFCE7",
  },
  {
    id: "appointment",
    title: "Appointment Reminders",
    description: "Vet and grooming alerts",
    enabled: true,
    icon: appointment,
    iconColor: "#22C55E",
    iconBackground: "#DCFCE7",
  },
  {
    id: "health",
    title: "Health Alerts",
    description: "Urgent pet health notifications",
    enabled: true,
    icon: redHeardOutline,
    iconColor: "#EF4444",
    iconBackground: "#FEE2E2",
  },
]

type NotificationRowProps = {
  item: NotificationItem
  isLast: boolean
  onToggle: (id: string) => void
  isDark: boolean
}

const NotificationRow = memo(
  ({ item, isLast, onToggle, isDark }: NotificationRowProps) => {
    const handleToggle = useCallback(() => {
      onToggle(item.id)
    }, [item.id, onToggle])

    return (
      <View>
        <View style={tw`flex-row items-center px-4 py-3`}>
          {/* Icon */}
          <View
            style={[
              tw`w-9 h-9 rounded-[10px] items-center justify-center`,
              {
                backgroundColor: item.iconBackground,
              },
            ]}
          >
            <SvgXml xml={item?.icon} />
          </View>

          {/* Content */}
          <View style={tw`flex-1 ml-3.5 mr-3`}>
            <AppText variant="body" tone="text" style={tw`font-inter-medium`}>
              {item.title}
            </AppText>

            <AppText
              variant="caption"
              tone="textMute"
              numberOfLines={2}
              style={tw`font-inter-regular mt-0.5`}
            >
              {item.description}
            </AppText>
          </View>

          {/* Switch Component from @expo/ui/jetpack-compose */}

          <Host matchContents>
            <Switch
              value={item.enabled}
              onCheckedChange={handleToggle}
              colors={{
                checkedTrackColor: "#0D9488",
                checkedThumbColor: "#FFFFFF",
                uncheckedTrackColor: "#E5E7EB",
                uncheckedThumbColor: "#FFFFFF",
              }}
            />
          </Host>
        </View>

        {!isLast && <View style={tw`ml-16 mr-4 h-px bg-black/10`} />}
      </View>
    )
  }
)

NotificationRow.displayName = "NotificationRow"

export function NotificationSettings({ isDark }: { isDark: boolean }) {
  const [notifications, setNotifications] = useState<NotificationItem[]>(
    INITIAL_NOTIFICATIONS
  )

  const handleToggle = useCallback((id: string) => {
    setNotifications((previous) =>
      previous.map((item) =>
        item.id === id
          ? {
              ...item,
              enabled: !item.enabled,
            }
          : item
      )
    )
  }, [])

  const renderItem = useCallback(
    ({ item, index }: { item: NotificationItem; index: number }) => (
      <NotificationRow
        item={item}
        isLast={index === notifications.length - 1}
        onToggle={handleToggle}
        isDark={isDark}
      />
    ),
    [handleToggle, notifications.length, isDark]
  )

  const keyExtractor = useCallback((item: NotificationItem) => item.id, [])

  return (
    <View style={tw`pt-2.5`}>
      <Card radius="md">
        <FlatList
          data={notifications}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          scrollEnabled={false}
          removeClippedSubviews={false}
          initialNumToRender={6}
          windowSize={5}
        />
      </Card>
    </View>
  )
}
