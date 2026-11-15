import { memo, useCallback } from "react"

import { Pressable, View } from "react-native"

import {
  dark,
  eyeOutlineIcon,
  light,
  rightArrow,
  utilsData,
  world,
} from "@/assets/icons/icons"
import { AppText } from "@/components/ui/app-text"
import tw from "@/lib/tailwind"
import { useAppTheme } from "@/theme/theme-provider"
import { SvgXml } from "react-native-svg"

type ThemeMode = "light" | "dark" | "system"

type PreferenceItemProps = {
  title: string
  value: string
  icon: string
  onPress?: () => void
}

const PreferenceItem = memo(
  ({ title, value, icon, onPress }: PreferenceItemProps) => {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          tw`flex-row items-center gap-3.5 px-4 py-3`,
          pressed && tw`opacity-70`,
        ]}
      >
        {/* Icon */}
        <View
          style={tw`items-center justify-center rounded-xl bg-blue-600/10 p-2`}
        >
          <SvgXml xml={icon} />
        </View>

        {/* Title */}
        <View style={tw`flex-1`}>
          <AppText variant="body" tone="text" style={tw`font-inter-regular`}>
            {title}
          </AppText>
        </View>

        {/* Value */}
        <View style={tw`flex-row items-center gap-2`}>
          <AppText variant="body" tone="gray" style={tw`font-inter-semibold`}>
            {value}
          </AppText>

          <SvgXml xml={rightArrow} />
        </View>
      </Pressable>
    )
  }
)

PreferenceItem.displayName = "PreferenceItem"

type ThemeOptionProps = {
  mode: ThemeMode
  label: string
  icon: string
  selected: boolean
  onPress: (mode: ThemeMode) => void
}

const ThemeOption = memo(
  ({ mode, label, icon, selected, onPress }: ThemeOptionProps) => {
    const handlePress = useCallback(() => {
      onPress(mode)
    }, [mode, onPress])

    return (
      <Pressable
        onPress={handlePress}
        style={({ pressed }) => [
          tw`flex-1 items-center gap-2 rounded-2xl border py-3`,
          selected
            ? tw`border-teal-600/30 bg-teal-600/10`
            : tw`border-transparent bg-gray-100`,
          pressed && tw`opacity-70`,
        ]}
      >
        <SvgXml xml={icon} />

        <AppText
          variant="caption"
          tone={selected ? "primary" : "gray"}
          style={[
            tw`font-inter-regular capitalize`,
            selected && tw`font-inter-semibold`,
          ]}
        >
          {label}
        </AppText>

        {selected && <View style={tw`rounded-full bg-teal-600 p-0.5`}></View>}
      </Pressable>
    )
  }
)

ThemeOption.displayName = "ThemeOption"

type AppPreferencesProps = {
  language?: string
  units?: string

  onLanguagePress?: () => void
  onUnitsPress?: () => void

  onThemeChange?: (theme: ThemeMode) => void
}

export function AppPreferences({
  language = "English",
  units = "kg / km",
  onLanguagePress,
  onUnitsPress,
  onThemeChange,
}: AppPreferencesProps) {
  const { colors, mode, setMode } = useAppTheme()

  const handleThemeChange = useCallback(
    (nextMode: ThemeMode) => {
      setMode(nextMode)
      onThemeChange?.(nextMode)
    },
    [setMode, onThemeChange]
  )

  return (
    <View style={tw`pt-2.5`}>
      <View
        style={[
          tw`overflow-hidden rounded-2xl bg-white`,
          {
            shadowColor: "#000",
            shadowOpacity: 0.06,
            shadowRadius: 16,
            shadowOffset: {
              width: 0,
              height: 2,
            },
            elevation: 2,
          },
        ]}
      >
        {/* Theme Section */}
        <View style={tw`px-4 py-3.5`}>
          <AppText variant="body" tone="text" style={tw`font-inter-medium`}>
            Theme
          </AppText>

          <View style={tw`mt-2.5 flex-row gap-2`}>
            <ThemeOption
              mode="light"
              label="Light"
              icon={light}
              selected={mode === "light"}
              onPress={handleThemeChange}
            />

            <ThemeOption
              mode="dark"
              label="Dark"
              icon={dark}
              selected={mode === "dark"}
              onPress={handleThemeChange}
            />

            <ThemeOption
              mode="system"
              label="System"
              icon={eyeOutlineIcon}
              selected={mode === "system"}
              onPress={handleThemeChange}
            />
          </View>
        </View>

        {/* Divider */}
        <View
          style={[
            tw`mx-4 border-b`,
            {
              borderColor: colors.text + "1A",
            },
          ]}
        />

        {/* Language */}
        <PreferenceItem
          title="Language & Region"
          value={language}
          icon={world}
          onPress={onLanguagePress}
        />

        {/* Divider */}
        <View
          style={[
            tw`ml-16 mr-4 border-b`,
            {
              borderColor: colors.text + "1A",
            },
          ]}
        />

        {/* Units */}
        <PreferenceItem
          title="Units"
          value={units}
          icon={utilsData}
          onPress={onUnitsPress}
        />
      </View>
    </View>
  )
}
