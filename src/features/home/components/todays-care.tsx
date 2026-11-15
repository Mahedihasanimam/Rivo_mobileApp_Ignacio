import {
  checkWhite,
  rightArrow,
  rightArrowDarkMode,
} from "@/assets/icons/icons"
import { AppText } from "@/components/ui/app-text"
import { Card } from "@/components/ui/card"
import tw from "@/lib/tailwind"
import { useAppTheme } from "@/theme/theme-provider"
import { useState } from "react"
import { Pressable, View } from "react-native"
import { SvgXml } from "react-native-svg"

type CareItem = {
  id: string
  title: string
  completed: boolean
}

const initialItems: CareItem[] = [
  {
    id: "1",
    title: "Morning Walk",
    completed: true,
  },
  {
    id: "2",
    title: "Breakfast",
    completed: true,
  },
  {
    id: "3",
    title: "Brush Teeth",
    completed: false,
  },
  {
    id: "4",
    title: "Omega-3 Supplement",
    completed: false,
  },
]

export function TodaysCare() {
  const [items, setItems] = useState<CareItem[]>(initialItems)

  const { resolvedTheme, colors } = useAppTheme()

  const completedCount = items.filter((item) => item.completed).length

  const toggleItem = (id: string) => {
    setItems((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              completed: !item.completed,
            }
          : item
      )
    )
  }

  return (
    <Card radius="md" style={tw`w-full flex-col`}>
      {/* Header */}
      <View style={tw`mb-2 flex-row items-center justify-between`}>
        <AppText variant="body" tone="blackish" style={tw`font-bold leading-6`}>
          {"Today's Care"}
        </AppText>

        <AppText variant="caption" tone="gray" style={tw`font-semibold`}>
          {completedCount} of {items.length} completed
        </AppText>
      </View>

      {/* Care Items */}
      <View style={tw`gap-1`}>
        {items.map((item) => {
          const completed = item.completed

          return (
            <Pressable
              key={item.id}
              onPress={() => toggleItem(item.id)}
              style={tw.style(
                "min-h-12 flex-row items-center justify-between rounded-2xl px-3 py-3",
                completed && { backgroundColor: colors.cardOverLay }
              )}
            >
              <View style={tw`flex-1 flex-row items-center gap-3`}>
                <View
                  style={[
                    tw`h-5 w-5 items-center justify-center rounded-full border-2`,
                    completed
                      ? tw`border-primary`
                      : tw`border-[#6B7280] bg-transparent`,
                  ]}
                >
                  {completed && <SvgXml xml={checkWhite} />}
                </View>

                <AppText
                  variant="body"
                  tone={completed ? "primary" : "gray"}
                  style={tw.style(
                    "flex-1",
                    completed ? "font-inter-medium" : "font-normal"
                  )}
                >
                  {item.title}
                </AppText>
              </View>

              {!completed && (
                <SvgXml
                  xml={
                    resolvedTheme === "dark" ? rightArrowDarkMode : rightArrow
                  }
                />
              )}
            </Pressable>
          )
        })}
      </View>
    </Card>
  )
}
