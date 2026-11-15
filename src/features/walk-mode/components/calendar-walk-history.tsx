import { useMemo, useState } from "react"
import { Pressable, TouchableOpacity, View } from "react-native"
import { SvgXml } from "react-native-svg"

import {
  backButton,
  backButtonWhite,
  rightArrow,
  rightArrowDarkMode,
} from "@/assets/icons/icons"
import { AppText } from "@/components/ui/app-text"
import { Card } from "@/components/ui/card"
import tw from "@/lib/tailwind"
import { useAppTheme } from "@/theme/theme-provider"

const CalendarWalkHistory = () => {
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 6, 21))
  const { colors, resolvedTheme } = useAppTheme()
  const isDark = resolvedTheme === "dark"

  const calendarDays = useMemo(() => {
    // Current selectedDate থেকে ওই সপ্তাহের Monday বের করা
    const current = new Date(selectedDate)
    const dayOfWeek = current.getDay()
    const mondayOffset = dayOfWeek === 0 ? 6 : dayOfWeek - 1

    const startOfWeek = new Date(current)
    startOfWeek.setDate(current.getDate() - mondayOffset)

    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(startOfWeek)
      date.setDate(startOfWeek.getDate() + index)

      return {
        date: date.getDate(),
        day: date
          .toLocaleDateString("en-US", {
            weekday: "short",
          })
          .charAt(0),
        fullDate: date,
        isCurrentMonth: date.getMonth() === selectedDate.getMonth(),
      }
    })
  }, [selectedDate])

  const monthName = selectedDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  })

  const handlePreviousDay = () => {
    setSelectedDate((prev) => {
      const d = new Date(prev)
      d.setDate(prev.getDate() - 1)
      return d
    })
  }

  const handleNextDay = () => {
    setSelectedDate((prev) => {
      const d = new Date(prev)
      d.setDate(prev.getDate() + 1)
      return d
    })
  }

  const handleSelectDate = (date: Date) => {
    setSelectedDate(new Date(date))
  }

  return (
    <Card
      radius="lg"
      style={[
        tw`w-full p-4`,
        {
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.06,
          shadowRadius: 8,
          elevation: 3,
        },
      ]}
    >
      {/* Header */}
      <View style={tw`w-full flex-row items-center justify-between`}>
        <AppText variant="body" tone="blackish" style={tw`font-inter-semibold`}>
          {monthName}
        </AppText>

        <View style={tw`flex-row gap-1`}>
          <TouchableOpacity
            style={{
              backgroundColor: colors.backButtonBg,
              padding: 8,
              borderRadius: 100,
            }}
            onPress={handlePreviousDay}
          >
            <SvgXml xml={isDark ? backButtonWhite : backButton} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: colors.backButtonBg,
              padding: 8,
              borderRadius: 100,
            }}
            onPress={handleNextDay}
          >
            <SvgXml xml={isDark ? rightArrowDarkMode : rightArrow} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Days */}
      <View style={tw`mt-3 w-full flex-row`}>
        {calendarDays.map((item, index) => {
          const active =
            item.fullDate.getFullYear() === selectedDate.getFullYear() &&
            item.fullDate.getMonth() === selectedDate.getMonth() &&
            item.fullDate.getDate() === selectedDate.getDate()
          const isActiveLight = active && !isDark

          return (
            <Pressable
              key={`${item.fullDate.toISOString()}-${index}`}
              onPress={() => handleSelectDate(item.fullDate)}
              style={tw`flex-1 items-center`}
            >
              <View
                style={[
                  tw`w-full items-center justify-center rounded-[24px] py-3.5 gap-2`,
                  isActiveLight && {
                    backgroundColor: "#EDF7F5",
                    boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.12)",
                    elevation: 4,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 6 },
                    shadowOpacity: 0.12,
                    shadowRadius: 8,
                  },
                  active && isDark && tw`bg-teal-600/20`,
                ]}
              >
                <AppText
                  variant="caption"
                  tone={isActiveLight ? undefined : "gray"}
                  style={
                    isActiveLight
                      ? {
                          fontSize: 13,
                          lineHeight: 16,
                          fontWeight: "600",
                          fontFamily: "inter-semibold",
                          color: "rgba(0, 0, 0, 0.65)",
                          textAlign: "center",
                        }
                      : tw`font-inter-semibold uppercase text-center`
                  }
                >
                  {item.day}
                </AppText>

                <AppText
                  variant="body"
                  tone={
                    isActiveLight ? undefined : active ? "primary" : "blackish"
                  }
                  style={
                    isActiveLight
                      ? {
                          fontSize: 20,
                          lineHeight: 24,
                          fontWeight: "700",
                          fontFamily: "inter-bold",
                          color: "#2F9C8F",
                          textAlign: "center",
                        }
                      : active
                        ? tw`font-inter-bold text-center text-lg`
                        : tw`font-inter-regular text-center`
                  }
                >
                  {item.date}
                </AppText>
              </View>
            </Pressable>
          )
        })}
      </View>
    </Card>
  )
}

export default CalendarWalkHistory
