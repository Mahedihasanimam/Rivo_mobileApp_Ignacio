import {
  beginner,
  beginnerWhite,
  docP,
  docPWht,
  hybrid,
  hybridWhite,
  intermediate,
} from "@/assets/icons/icons"
import { AppText } from "@/components/ui/app-text"
import { Card } from "@/components/ui/card"
import tw from "@/lib/tailwind"
import { useAppTheme } from "@/theme/theme-provider"
import { Pressable, ScrollView, View } from "react-native"
import { SvgXml } from "react-native-svg"

export type FilterItem = {
  label: string
  icon: string
  iconDark: string
}

export const filters: FilterItem[] = [
  { label: "Dog", icon: docP, iconDark: docPWht },
  { label: "Hybrid", icon: hybrid, iconDark: hybridWhite },
  { label: "Beginner", icon: beginner, iconDark: beginnerWhite },
  { label: "Intermediate", icon: intermediate, iconDark: beginnerWhite },
  { label: "Advanced", icon: docP, iconDark: docPWht },
  { label: "Short", icon: hybrid, iconDark: hybridWhite },
  { label: "Medium", icon: beginner, iconDark: beginnerWhite },
]

export const FilterChip = ({ item }: { item: FilterItem }) => {
  const { resolvedTheme } = useAppTheme()
  const isDarkMode = resolvedTheme === "dark"
  return (
    <Card radius="pill" style={tw`mr-2 p-0`}>
      <Pressable style={tw`flex-row items-center gap-1.5 px-3.5 py-2`}>
        <SvgXml xml={isDarkMode ? item?.iconDark : item?.icon} />

        <AppText
          variant="caption"
          tone="blackish"
          style={tw`font-inter-semibold text-sm`}
        >
          {item.label}
        </AppText>
      </Pressable>
    </Card>
  )
}

export const TrainFilters = () => {
  return (
    <View style={tw`mt-2`}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={tw`pr-4`}
      >
        {filters.map((item) => (
          <FilterChip key={item.label} item={item} />
        ))}
      </ScrollView>
    </View>
  )
}
