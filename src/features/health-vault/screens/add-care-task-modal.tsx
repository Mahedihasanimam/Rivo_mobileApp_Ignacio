import { downArrow, time } from "@/assets/icons/icons"
import { AppText } from "@/components/ui/app-text"
import { Button } from "@/components/ui/button"
import { Divider } from "@/components/ui/divider"
import MainInput from "@/components/ui/main-input"
import TopHandler from "@/components/ui/top-handler"
import { PET_ID } from "@/constants/pet-id"
import { appToast } from "@/lib/toast/app-toast"
import tw from "@/lib/tailwind"
import { Formik } from "formik"

import { memo, useCallback, useMemo, useState } from "react"

import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker"
import { FlatList, Platform, Pressable, Switch, View } from "react-native"
import { SvgXml } from "react-native-svg"
import { router, useLocalSearchParams } from "expo-router"
import { useAddCareTaskMutation } from "../api/health-vault-api"
import { addCareTaskSchema } from "../schema/health-vault-schema"

type CareSettingsProps = {
  initialFrequency?: string
  initialTime?: string
  initialReminderEnabled?: boolean
  onFrequencyPress?: () => void
  onTimePress?: () => void
  onTimeChange?: (time: string) => void
  onReminderChange?: (enabled: boolean) => void
}

type SettingType = "frequency" | "time" | "reminder"

type CareSetting = {
  id: SettingType
  label: string
  value?: string
}

const formatTime24 = (d: Date): string => {
  const hours = String(d.getHours()).padStart(2, "0")
  const minutes = String(d.getMinutes()).padStart(2, "0")
  return `${hours}:${minutes}`
}

const getCurrentTime24 = (): string => formatTime24(new Date())

const getBackendTaskType = (rawType: string): string => {
  const normalized = rawType.toLowerCase().trim()
  if (normalized === "medication" || normalized === "medicine") {
    return "medicine"
  }
  return normalized
}

const parseTimeString = (timeStr: string): Date => {
  const d = new Date()
  if (!timeStr) return d

  // 24-hour format: "19:00", "08:30"
  const match24 = timeStr.match(/^(\d{1,2}):(\d{2})$/)
  if (match24) {
    const hours = parseInt(match24[1], 10)
    const minutes = parseInt(match24[2], 10)
    d.setHours(hours, minutes, 0, 0)
    return d
  }

  // 12-hour format fallback: "07:00 PM"
  const match12 = timeStr.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/i)
  if (match12) {
    let hours = parseInt(match12[1], 10)
    const minutes = parseInt(match12[2], 10)
    const meridian = match12[3]?.toUpperCase()
    if (meridian === "PM" && hours < 12) hours += 12
    if (meridian === "AM" && hours === 12) hours = 0
    d.setHours(hours, minutes, 0, 0)
    return d
  }

  return d
}

const stripMeridianOrFormat24 = (timeStr: string): string => {
  const match24 = timeStr.match(/^(\d{1,2}):(\d{2})$/)
  if (match24) {
    const h = String(parseInt(match24[1], 10)).padStart(2, "0")
    const m = match24[2]
    return `${h}:${m}`
  }
  const parsed = parseTimeString(timeStr)
  return formatTime24(parsed)
}

const SETTINGS: CareSetting[] = [
  {
    id: "frequency",
    label: "Frequency",
    value: "Every Day",
  },
  {
    id: "time",
    label: "Preferred Time",
  },
  {
    id: "reminder",
    label: "Reminder",
  },
]

type CareSettingItemProps = {
  item: CareSetting
  frequency: string
  preferredTime: string
  reminderEnabled: boolean
  onPressFrequency: () => void
  onPressTime: () => void
  onReminderChange: (value: boolean) => void
}

export default function AddCareTaskModal() {
  const initialCurrentTime = useMemo(() => getCurrentTime24(), [])
  const [addCareTask, { isLoading }] = useAddCareTaskMutation()

  const { type, petId: paramPetId } = useLocalSearchParams<{
    type?: string
    petId?: string
  }>()

  const selectedType = (Array.isArray(type) ? type[0] : type) || "Food"
  const petId =
    (Array.isArray(paramPetId) ? paramPetId[0] : paramPetId) || PET_ID

  return (
    <View>
      <TopHandler />

      <AppText variant="title" tone="blackish" style={tw`font-inter-semibold`}>
        {selectedType}
      </AppText>
      <AppText variant="body" tone="gray" style={tw`font-inter-regular`}>
        Add {selectedType.toUpperCase()}
      </AppText>

      <View style={tw`py-3`}>
        <Divider />
      </View>

      <Formik
        initialValues={{
          title: "",
          description: "",
          frequency: "Every Day",
          preferred_time: initialCurrentTime,
          reminder_enabled: true,
        }}
        validationSchema={addCareTaskSchema}
        onSubmit={async (values) => {
          try {
            const payload = {
              type: getBackendTaskType(selectedType),
              title: values.title.trim(),
              description: values.description?.trim() || "",
              frequency: values.frequency,
              preferred_time: values.preferred_time,
              is_reminder_on: Boolean(values.reminder_enabled),
            }

            const res = await addCareTask({
              id: petId,
              data: payload,
            }).unwrap()

            appToast.success(res?.message || "Care task added successfully!")
            router.back()
          } catch (err: any) {
            const errorMessage =
              err?.data?.message || err?.message || "Failed to add care task"
            appToast.error(errorMessage)
          }
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          values,
          errors,
          touched,
        }) => (
          <View style={tw`flex-col  justify-between `}>
            {/* 🔹 Input Fields */}
            <View style={tw` `}>
              <MainInput
                label="Title"
                placeholder="e.g., Annual Vet Checkup"
                value={values.title}
                onChangeText={handleChange("title")}
                onBlur={() => handleBlur("title")}
                error={errors.title}
                touched={touched.title}
                containerStyle={tw`rounded-xl bg-[#F0F4F3]  border border-[#0000001A]`}
                labelStyle={tw` uppercase font-inter-semibold`}
              />

              <MainInput
                label="Description "
                placeholder="Enter Your Age"
                value={values.description}
                onChangeText={handleChange("description")}
                onBlur={() => handleBlur("description")}
                error={errors.description}
                touched={touched.description}
                containerStyle={tw`rounded-xl bg-[#F0F4F3] h-30 items-start  border border-[#0000001A]`}
              />
            </View>

            <CareSettings
              initialFrequency="Every Day"
              initialTime={initialCurrentTime}
              initialReminderEnabled
              onFrequencyPress={() => {
                // Open frequency bottom sheet
              }}
              onTimeChange={(time) => {
                setFieldValue("preferred_time", time)
              }}
              onReminderChange={(enabled) => {
                setFieldValue("reminder_enabled", enabled)
              }}
            />

            <View style={tw`flex-row items-center justify-between gap-3 mt-6`}>
              <View style={tw`flex-1`}>
                <Button
                  style={tw`rounded-xl`}
                  label={"Cancel"}
                  onPress={() => router.back()}
                  variant="ghost"
                  disabled={isLoading}
                />
              </View>
              <View style={tw`flex-1`}>
                <Button
                  style={tw`rounded-xl`}
                  label={"Save Changes"}
                  loading={isLoading}
                  disabled={isLoading}
                  onPress={() => handleSubmit()}
                />
              </View>
            </View>
          </View>
        )}
      </Formik>
    </View>
  )
}

const CareSettingItem = memo(
  ({
    item,
    frequency,
    preferredTime,
    reminderEnabled,
    onPressFrequency,
    onPressTime,
    onReminderChange,
  }: CareSettingItemProps) => {
    const handleReminderChange = useCallback(
      (value: boolean) => {
        onReminderChange(value)
      },
      [onReminderChange]
    )

    const renderRightContent = () => {
      switch (item.id) {
        case "frequency":
          return (
            <Pressable
              onPress={onPressFrequency}
              style={({ pressed }) => [
                tw`flex-row items-center gap-2 py-2`,
                pressed && tw`opacity-60`,
              ]}
            >
              <AppText variant="body" tone="gray" style={tw`font-inter-medium`}>
                {frequency}
              </AppText>

              <SvgXml xml={downArrow} />
            </Pressable>
          )

        case "time":
          return (
            <Pressable
              onPress={onPressTime}
              style={({ pressed }) => [
                tw`flex-row items-center gap-2 py-2`,
                pressed && tw`opacity-60`,
              ]}
            >
              <AppText variant="body" tone="gray" style={tw`font-inter-medium`}>
                {preferredTime}
              </AppText>

              <SvgXml xml={time} width={15} height={15} />
            </Pressable>
          )

        case "reminder":
          return (
            <Switch
              value={reminderEnabled}
              onValueChange={handleReminderChange}
              trackColor={{
                false: "#D1D5DB",
                true: "#047857",
              }}
              thumbColor="#FFFFFF"
            />
          )

        default:
          return null
      }
    }

    return (
      <View style={tw`flex-row items-center justify-between  pb-4`}>
        <AppText variant="body" tone="text" style={tw`font-inter-semibold`}>
          {item.label}
        </AppText>

        {renderRightContent()}
      </View>
    )
  }
)

function CareSettings({
  initialFrequency = "Every Day",
  initialTime,
  initialReminderEnabled = true,
  onFrequencyPress,
  onTimePress,
  onTimeChange,
  onReminderChange,
}: CareSettingsProps) {
  const [frequency] = useState(initialFrequency)

  const [preferredTime, setPreferredTime] = useState(() =>
    stripMeridianOrFormat24(initialTime || getCurrentTime24())
  )
  const [showTimePicker, setShowTimePicker] = useState(false)

  const [reminderEnabled, setReminderEnabled] = useState(initialReminderEnabled)

  const handleReminderChange = useCallback(
    (value: boolean) => {
      setReminderEnabled(value)
      onReminderChange?.(value)
    },
    [onReminderChange]
  )

  const handleFrequencyPress = useCallback(() => {
    onFrequencyPress?.()
  }, [onFrequencyPress])

  const handleTimePress = useCallback(() => {
    setShowTimePicker(true)
    onTimePress?.()
  }, [onTimePress])

  const handleTimeChange = useCallback(
    (event: DateTimePickerEvent, selectedDate?: Date) => {
      setShowTimePicker(false)
      if (selectedDate && event.type !== "dismissed") {
        const formatted = formatTime24(selectedDate)
        setPreferredTime(formatted)
        onTimeChange?.(formatted)
      }
    },
    [onTimeChange]
  )

  const renderItem = useCallback(
    ({ item }: { item: CareSetting }) => (
      <CareSettingItem
        item={item}
        frequency={frequency}
        preferredTime={preferredTime}
        reminderEnabled={reminderEnabled}
        onPressFrequency={handleFrequencyPress}
        onPressTime={handleTimePress}
        onReminderChange={handleReminderChange}
      />
    ),
    [
      frequency,
      preferredTime,
      reminderEnabled,
      handleFrequencyPress,
      handleTimePress,
      handleReminderChange,
    ]
  )

  const keyExtractor = useCallback((item: CareSetting) => item.id, [])

  return (
    <View style={tw`gap-3`}>
      <FlatList
        data={SETTINGS}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`gap-3`}
        initialNumToRender={3}
        maxToRenderPerBatch={3}
        windowSize={3}
        ItemSeparatorComponent={() => <Divider />}
      />

      {showTimePicker && (
        <DateTimePicker
          value={parseTimeString(preferredTime)}
          mode="time"
          is24Hour={true}
          locale="en_GB"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleTimeChange}
        />
      )}
    </View>
  )
}
