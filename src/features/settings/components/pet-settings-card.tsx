import {
  eyeOutlineIcon,
  heardGreen,
  managePetsIcons,
  rightArrow,
  rightArrowDarkMode,
} from "@/assets/icons/icons"
import { AppText } from "@/components/ui/app-text"
import { Card } from "@/components/ui/card"
import tw from "@/lib/tailwind"
import { memo, useCallback } from "react"

import { FlatList, Pressable, View } from "react-native"
import { SvgXml } from "react-native-svg"

type SettingsItem = {
  id: string
  title: string
  description: string
  icon: string
  route: string
}

const SETTINGS_DATA: SettingsItem[] = [
  {
    id: "manage-pets",
    title: "Manage Pets",
    description: "Active: Pedro",
    icon: managePetsIcons,
    route: "/manage-pets",
  },
  {
    id: "health-preferences",
    title: "Health Preferences",
    description: "Medical history, dietary needs",
    icon: heardGreen,
    route: "/health-preferences",
  },
  {
    id: "pet-visibility",
    title: "Pet Visibility",
    description: "Control your pet's public profile",
    icon: eyeOutlineIcon,
    route: "/pet-visibility",
  },
]

type SettingsItemProps = {
  item: SettingsItem
  onPress: (item: SettingsItem) => void
  isLast: boolean
  isDark: boolean
}

const SettingsListItem = memo(
  ({ item, onPress, isLast, isDark }: SettingsItemProps) => {
    const handlePress = useCallback(() => {
      onPress(item)
    }, [item, onPress])

    return (
      <View>
        <Pressable
          onPress={handlePress}
          style={({ pressed }) => [
            tw`flex-row items-center gap-3.5  py-3`,
            pressed && tw`opacity-70`,
          ]}
        >
          {/* Icon */}
          <View
            style={tw`items-center justify-center rounded-xl bg-teal-500/10 p-2`}
          >
            <SvgXml xml={item?.icon} />
          </View>

          {/* Content */}
          <View style={tw`flex-1 gap-0.5`}>
            <AppText variant="body" tone="text" style={tw`font-inter-regular`}>
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

          {/* Arrow */}
          <SvgXml xml={isDark ? rightArrowDarkMode : rightArrow} />
        </Pressable>

        {!isLast && <View style={tw`ml-16 mr-4 border-b border-black/10`} />}
      </View>
    )
  }
)

SettingsListItem.displayName = "SettingsListItem"

type PetSettingsCardProps = {
  onItemPress?: (item: SettingsItem) => void
  isDark: boolean
}

export function PetSettingsCard({ onItemPress, isDark }: PetSettingsCardProps) {
  const handleItemPress = useCallback(
    (item: SettingsItem) => {
      onItemPress?.(item)
    },
    [onItemPress]
  )

  const renderItem = useCallback(
    ({ item, index }: { item: SettingsItem; index: number }) => (
      <SettingsListItem
        item={item}
        isLast={index === SETTINGS_DATA.length - 1}
        onPress={handleItemPress}
        isDark={isDark}
      />
    ),
    [handleItemPress]
  )

  const keyExtractor = useCallback((item: SettingsItem) => item.id, [])

  return (
    <View style={tw`pt-2.5`}>
      <Card
        radius="md"
        style={tw`
    
      `}
      >
        <FlatList
          data={SETTINGS_DATA}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={false}
        />
      </Card>
    </View>
  )
}
