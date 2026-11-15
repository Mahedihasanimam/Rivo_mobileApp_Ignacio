import { leftArrow, rightArrow } from "@/assets/icons/icons"
import { AppText } from "@/components/ui/app-text"
import tw from "@/lib/tailwind"
import { useState } from "react"
import { Pressable, View } from "react-native"
import { SvgXml } from "react-native-svg"

const DAY_NAMES = ["S", "M", "T", "W", "T", "F", "S"]
const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

export type CalendarDay = {
  dateObj: Date
  dayName: string
  dateNumber: string
  monthName: string
  year: number
  fullDateString: string
}

function getWeekDays(startDate: Date): CalendarDay[] {
  const days: CalendarDay[] = []
  for (let i = 0; i < 7; i++) {
    const d = new Date(startDate)
    d.setDate(startDate.getDate() + i)
    days.push({
      dateObj: d,
      dayName: DAY_NAMES[d.getDay()],
      dateNumber: d.getDate().toString(),
      monthName: MONTH_NAMES[d.getMonth()],
      year: d.getFullYear(),
      fullDateString: d.toISOString().split("T")[0],
    })
  }
  return days
}

export type DayItemProps = {
  dayName: string
  dateNumber: string
  active?: boolean
  onPress?: () => void
}

export function DayItem({
  dayName,
  dateNumber,
  active = false,
  onPress,
}: DayItemProps) {
  return (
    <Pressable
      onPress={onPress}
      style={
        active
          ? [
              tw`w-[44px] py-3.5 items-center justify-center rounded-2xl bg-[#EBF5F3]`,
              {
                shadowColor: "#2F9C8F",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.18,
                shadowRadius: 8,
                elevation: 4,
              },
            ]
          : tw`w-[44px] py-3.5 items-center justify-center rounded-[22px]`
      }
    >
      <AppText
        variant="caption"
        style={
          active
            ? tw`text-xs font-semibold text-primary uppercase`
            : tw`text-xs font-medium text-gray-400 uppercase`
        }
      >
        {dayName}
      </AppText>

      <AppText
        variant="body"
        style={
          active
            ? tw`mt-1 text-lg font-bold text-primary`
            : tw`mt-1 text-base font-semibold text-gray-800`
        }
      >
        {dateNumber}
      </AppText>
    </Pressable>
  )
}

export type CalendarCardProps = {
  onSelectDate?: (date: Date) => void
}

export function CalendarCard({ onSelectDate }: CalendarCardProps) {
  // Default start date set to July 21, 2026 (matches reference design)
  const [startDate, setStartDate] = useState(
    () => new Date("2026-07-21T00:00:00")
  )
  const weekDays = getWeekDays(startDate)
  const [selectedDate, setSelectedDate] = useState<string>(
    weekDays[0].fullDateString
  )

  const handleNextWeek = () => {
    setStartDate((prev) => {
      const next = new Date(prev)
      next.setDate(prev.getDate() + 7)
      return next
    })
  }

  const handlePrevWeek = () => {
    setStartDate((prev) => {
      const prevDate = new Date(prev)
      prevDate.setDate(prev.getDate() - 7)
      return prevDate
    })
  }

  const handleDaySelect = (item: CalendarDay) => {
    setSelectedDate(item.fullDateString)
    onSelectDate?.(item.dateObj)
  }

  const monthYearLabel = `${weekDays[0].monthName} ${weekDays[0].year}`

  return (
    <View style={tw`mt-5 rounded-[24px] bg-white p-5 shadow-sm`}>
      {/* Header with Title & Navigation Arrows */}
      <View style={tw`flex-row items-center justify-between`}>
        <AppText
          variant="title"
          tone="blackish"
          style={tw`text-xl font-bold leading-6`}
        >
          {monthYearLabel}
        </AppText>

        <View style={tw`flex-row items-center gap-2`}>
          <Pressable
            onPress={handlePrevWeek}
            hitSlop={8}
            style={({ pressed }) =>
              tw.style(
                "h-9 w-9 items-center justify-center rounded-full bg-[#F0F5F4]",
                pressed && "bg-gray-200"
              )
            }
          >
            <SvgXml xml={leftArrow} width={16} height={16} />
          </Pressable>

          <Pressable
            onPress={handleNextWeek}
            hitSlop={8}
            style={({ pressed }) =>
              tw.style(
                "h-9 w-9 items-center justify-center rounded-full bg-[#F0F5F4]",
                pressed && "bg-gray-200"
              )
            }
          >
            <SvgXml xml={rightArrow} width={16} height={16} />
          </Pressable>
        </View>
      </View>

      {/* 7-Day Horizontal Week Row */}
      <View style={tw`mt-4 flex-row items-center justify-between`}>
        {weekDays.map((item) => {
          const isActive = selectedDate === item.fullDateString

          return (
            <DayItem
              key={item.fullDateString}
              dayName={item.dayName}
              dateNumber={item.dateNumber}
              active={isActive}
              onPress={() => handleDaySelect(item)}
            />
          )
        })}
      </View>
    </View>
  )
}
