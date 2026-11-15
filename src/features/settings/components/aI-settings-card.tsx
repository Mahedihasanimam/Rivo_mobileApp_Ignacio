import {
  activity,
  ai,
  recommendations,
  thorPrimaryIcons,
} from "@/assets/icons/icons"
import { AppText } from "@/components/ui/app-text"
import tw from "@/lib/tailwind"
import { Host } from "@expo/ui"
import { Switch } from "@expo/ui/jetpack-compose"
import { memo, useCallback, useState } from "react"

import { FlatList, View } from "react-native"
import { SvgXml } from "react-native-svg"

type AISetting = {
  id: string
  title: string
  description: string
  icon: string
  enabled: boolean
}

const INITIAL_SETTINGS: AISetting[] = [
  {
    id: "ai-vet",
    title: "AI Vet Assistant",
    description: "Smart health analysis and advice",
    icon: ai,
    enabled: true,
  },
  {
    id: "recommendations",
    title: "Smart Recommendations",
    description: "Personalised product & activity picks",
    icon: recommendations,
    enabled: true,
  },
  {
    id: "activity-insights",
    title: "Activity Insights",
    description: "Weekly trends and patterns",
    icon: activity,
    enabled: true,
  },
  {
    id: "smart-reminders",
    title: "Smart Reminders",
    description: "AI-timed nudges based on habits",
    icon: thorPrimaryIcons,
    enabled: false,
  },
]

type AISettingsItemProps = {
  item: AISetting
  isLast: boolean
  onToggle: (id: string) => void
}

const AISettingsItem = memo(
  ({ item, isLast, onToggle }: AISettingsItemProps) => {
    const handleToggle = useCallback(() => {
      onToggle(item.id)
    }, [item.id, onToggle])

    return (
      <View>
        <View style={tw`flex-row items-center gap-3.5 px-4 py-2.5`}>
          {/* Icon */}
          <View
            style={tw`items-center justify-center rounded-xl bg-teal-600/10 p-2`}
          >
            <SvgXml xml={item?.icon} />
          </View>

          {/* Content */}
          <View style={tw`flex-1 gap-0.5`}>
            <AppText variant="body" tone="text" style={tw`font-inter-medium`}>
              {item.title}
            </AppText>

            <AppText
              variant="caption"
              tone="gray"
              style={tw`font-inter-regular`}
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

        {!isLast && <View style={tw`ml-16 mr-4 border-b border-black/10`} />}
      </View>
    )
  }
)

AISettingsItem.displayName = "AISettingsItem"

export function AISettingsCard() {
  const [settings, setSettings] = useState<AISetting[]>(INITIAL_SETTINGS)

  const handleToggle = useCallback((id: string) => {
    setSettings((previousSettings) =>
      previousSettings.map((item) =>
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
    ({ item, index }: { item: AISetting; index: number }) => (
      <AISettingsItem
        item={item}
        isLast={index === settings.length - 1}
        onToggle={handleToggle}
      />
    ),
    [handleToggle, settings.length]
  )

  const keyExtractor = useCallback((item: AISetting) => item.id, [])

  return (
    <View style={tw`pt-2.5`}>
      <View style={tw`overflow-hidden rounded-2xl bg-white shadow-sm`}>
        <FlatList
          data={settings}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={false}
        />
      </View>
    </View>
  )
}
