import { AppText } from "@/components/ui/app-text"
import tw from "@/lib/tailwind"
import DateTimePicker from "@react-native-community/datetimepicker"
import React, { useState } from "react"
import { Platform, Pressable, View } from "react-native"
import { SvgXml } from "react-native-svg"

const calendarIcon = `
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6B7280" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
  <line x1="16" y1="2" x2="16" y2="6"/>
  <line x1="8" y1="2" x2="8" y2="6"/>
  <line x1="3" y1="10" x2="21" y2="10"/>
</svg>
`

const clockIcon = `
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6B7280" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="10"/>
  <polyline points="12 6 12 12 16 14"/>
</svg>
`

interface DateTimePickerSectionProps {
  date: Date
  onChangeDate: (newDate: Date) => void
}

export function DateTimePickerSection({
  date,
  onChangeDate,
}: DateTimePickerSectionProps) {
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showTimePicker, setShowTimePicker] = useState(false)

  const formatDate = (d: Date) => {
    return d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
  }

  const formatTime = (d: Date) => {
    return d.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  }

  return (
    <View style={tw`gap-1.5`}>
      <AppText
        variant="caption"
        tone="gray"
        style={tw`font-inter-medium text-sm`}
      >
        Date / Time
      </AppText>

      <View style={tw`flex-row gap-3`}>
        {/* Date Button */}
        <Pressable
          onPress={() => setShowDatePicker(true)}
          style={({ pressed }) => [
            tw`flex-1 bg-white rounded-xl border border-gray-300 px-4 py-3.5 flex-row items-center justify-between`,
            pressed && tw`opacity-70 bg-gray-50`,
          ]}
        >
          <AppText
            variant="body"
            tone="blackish"
            style={tw`font-inter-regular text-base`}
          >
            {formatDate(date)}
          </AppText>
          <SvgXml xml={calendarIcon} width={20} height={20} />
        </Pressable>

        {/* Time Button */}
        <Pressable
          onPress={() => setShowTimePicker(true)}
          style={({ pressed }) => [
            tw`flex-1 bg-white rounded-xl border border-gray-300 px-4 py-3.5 flex-row items-center justify-between`,
            pressed && tw`opacity-70 bg-gray-50`,
          ]}
        >
          <AppText
            variant="body"
            tone="blackish"
            style={tw`font-inter-regular text-base`}
          >
            {formatTime(date)}
          </AppText>
          <SvgXml xml={clockIcon} width={20} height={20} />
        </Pressable>
      </View>

      {/* Date Picker Modal/Popup */}
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(_, selectedDate) => {
            setShowDatePicker(false)
            if (selectedDate) {
              const updated = new Date(date)
              updated.setFullYear(
                selectedDate.getFullYear(),
                selectedDate.getMonth(),
                selectedDate.getDate()
              )
              onChangeDate(updated)
            }
          }}
        />
      )}

      {/* Time Picker Modal/Popup */}
      {showTimePicker && (
        <DateTimePicker
          value={date}
          mode="time"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(_, selectedTime) => {
            setShowTimePicker(false)
            if (selectedTime) {
              const updated = new Date(date)
              updated.setHours(
                selectedTime.getHours(),
                selectedTime.getMinutes()
              )
              onChangeDate(updated)
            }
          }}
        />
      )}
    </View>
  )
}
