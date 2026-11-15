import { Pressable, View } from "react-native"

import { pedro } from "@/assets/icons/icons"
import { AppText } from "@/components/ui/app-text"
import { SvgXml } from "react-native-svg"

export function SectionHeader({
  title,
  action,
  leftIcon = false,
  onActionPress,
}: {
  title: string
  action?: string
  leftIcon?: boolean
  navigation?: any
  onActionPress?: () => void
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        {leftIcon && <SvgXml xml={pedro} />}
        <AppText variant="subtitle">{title}</AppText>
      </View>
      {action ? (
        <Pressable onPress={onActionPress}>
          <AppText variant="caption" tone="textMute">
            {action}
          </AppText>
        </Pressable>
      ) : null}
    </View>
  )
}
