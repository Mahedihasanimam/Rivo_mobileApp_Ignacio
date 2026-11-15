import { clander, time } from "@/assets/icons/icons"
import { AppText } from "@/components/ui/app-text"
import { Button } from "@/components/ui/button"
import { Divider } from "@/components/ui/divider"
import MainInput from "@/components/ui/main-input"
import TopHandler from "@/components/ui/top-handler"
import tw from "@/lib/tailwind"
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker"
import { router } from "expo-router"
import { Formik } from "formik"
import { useCallback, useState } from "react"
import { Platform, Pressable, ScrollView, View } from "react-native"
import { SvgXml } from "react-native-svg"
import { formatDateDisplay, formatTimeDisplay } from "../helper"
import { useCreateAppointment } from "../hook"
import { newAppointmentSchema } from "../schema"

export default function NewAppointmentModal() {
  const {
    initialValues,
    isCreating,
    showDatePicker,
    setShowDatePicker,
    showTimePicker,
    setShowTimePicker,
    handleCreateAppointment,
    onDateChange,
    onTimeChange,
  } = useCreateAppointment()

  return (
    <View style={tw`flex-1 bg-white`}>
      <TopHandler />
      <View style={tw`flex-col gap-1`}>
        <AppText variant="subtitle" tone="blackish">
          New Appointment
        </AppText>
        <AppText variant="body" tone="gray">
          Schedule a care event for your pet
        </AppText>
      </View>
      <View style={tw`py-3`}>
        <Divider />
      </View>
      <Formik
        initialValues={initialValues}
        validationSchema={newAppointmentSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await handleCreateAppointment(values)
          } finally {
            setSubmitting(false)
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
          isSubmitting,
        }) => (
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={tw`pb-10`}
          >
            {/* 🔹 Input Fields */}
            <View style={tw`flex-col gap-1`}>
              {/* Title */}
              <MainInput
                label="Title"
                placeholder="e.g., Annual Vet Checkup"
                value={values.title}
                onChangeText={handleChange("title")}
                onBlur={() => handleBlur("title")}
                error={errors.title}
                touched={touched.title}
                containerStyle={tw`rounded-xl bg-[#F0F4F3] border border-[#0000001A]`}
                labelStyle={tw`uppercase font-inter-semibold`}
              />

              {/* Type */}
              <MainInput
                label="Type"
                placeholder="e.g., vaccination, vet_visit, grooming, surgery"
                value={values.type}
                onChangeText={handleChange("type")}
                onBlur={() => handleBlur("type")}
                error={errors.type}
                touched={touched.type}
                containerStyle={tw`rounded-xl bg-[#F0F4F3] border border-[#0000001A]`}
                labelStyle={tw`uppercase font-inter-semibold`}
              />

              {/* Date & Time Picker */}
              <View style={tw`w-full mb-1`}>
                <AppText
                  variant="caption"
                  tone="blackish"
                  style={tw`uppercase font-inter-semibold text-xs mb-1`}
                >
                  Date & Time
                </AppText>

                <View style={tw`flex-row gap-2`}>
                  {/* Date Selector */}
                  <Pressable
                    onPress={() => setShowDatePicker(true)}
                    style={[
                      tw`flex-1 flex-row items-center justify-between rounded-xl bg-[#F0F4F3] border border-[#0000001A] px-3.5 py-3`,
                      touched.datetime && errors.datetime
                        ? tw`border-red-500`
                        : null,
                    ]}
                  >
                    <AppText
                      variant="body"
                      style={tw`font-inter-regular text-sm ${
                        values.datetime ? "text-blackish" : "text-gray-400"
                      }`}
                    >
                      {formatDateDisplay(values.datetime) || "Select Date"}
                    </AppText>
                    <SvgXml xml={clander} width={18} height={18} />
                  </Pressable>

                  {/* Time Selector */}
                  <Pressable
                    onPress={() => setShowTimePicker(true)}
                    style={[
                      tw`flex-1 flex-row items-center justify-between rounded-xl bg-[#F0F4F3] border border-[#0000001A] px-3.5 py-3`,
                      touched.datetime && errors.datetime
                        ? tw`border-red-500`
                        : null,
                    ]}
                  >
                    <AppText
                      variant="body"
                      style={tw`font-inter-regular text-sm ${
                        values.datetime ? "text-blackish" : "text-gray-400"
                      }`}
                    >
                      {formatTimeDisplay(values.datetime) || "Select Time"}
                    </AppText>
                    <SvgXml xml={time} width={18} height={18} />
                  </Pressable>
                </View>

                {touched.datetime && errors.datetime && (
                  <AppText style={tw`text-xs text-red-500 mt-1`}>
                    {errors.datetime}
                  </AppText>
                )}
              </View>

              {showDatePicker && (
                <DateTimePicker
                  value={
                    values.datetime &&
                    !isNaN(new Date(values.datetime).getTime())
                      ? new Date(values.datetime)
                      : new Date()
                  }
                  mode="date"
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  onChange={(
                    event: DateTimePickerEvent,
                    selectedDate?: Date
                  ) => {
                    if (event.type === "dismissed") {
                      setShowDatePicker(false)
                    } else {
                      onDateChange(selectedDate, values.datetime, setFieldValue)
                    }
                  }}
                />
              )}

              {showTimePicker && (
                <DateTimePicker
                  value={
                    values.datetime &&
                    !isNaN(new Date(values.datetime).getTime())
                      ? new Date(values.datetime)
                      : new Date()
                  }
                  mode="time"
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  onChange={(
                    event: DateTimePickerEvent,
                    selectedTime?: Date
                  ) => {
                    if (event.type === "dismissed") {
                      setShowTimePicker(false)
                    } else {
                      onTimeChange(selectedTime, values.datetime, setFieldValue)
                    }
                  }}
                />
              )}

              {/* Vet Name */}
              <MainInput
                label="Vet / Doctor Name (optional)"
                placeholder="e.g., Dr. Sarah Chen"
                value={values.vet_name ?? ""}
                onChangeText={handleChange("vet_name")}
                onBlur={() => handleBlur("vet_name")}
                error={errors.vet_name}
                touched={touched.vet_name}
                containerStyle={tw`rounded-xl bg-[#F0F4F3] border border-[#0000001A]`}
                labelStyle={tw`uppercase font-inter-semibold`}
              />

              {/* Location */}
              <MainInput
                label="Location (optional)"
                placeholder="Clinic name or address"
                value={values.location ?? ""}
                onChangeText={handleChange("location")}
                onBlur={() => handleBlur("location")}
                error={errors.location}
                touched={touched.location}
                containerStyle={tw`rounded-xl bg-[#F0F4F3] border border-[#0000001A]`}
                labelStyle={tw`uppercase font-inter-semibold`}
              />

              {/* Latitude & Longitude */}
              <View style={tw`flex-row gap-2`}>
                <View style={tw`flex-1`}>
                  <MainInput
                    label="Latitude (optional)"
                    placeholder="e.g., 23.8103"
                    value={values.latitude ?? ""}
                    onChangeText={handleChange("latitude")}
                    onBlur={() => handleBlur("latitude")}
                    keyboardType="numeric"
                    error={errors.latitude}
                    touched={touched.latitude}
                    containerStyle={tw`rounded-xl bg-[#F0F4F3] border border-[#0000001A]`}
                    labelStyle={tw`uppercase font-inter-semibold`}
                  />
                </View>
                <View style={tw`flex-1`}>
                  <MainInput
                    label="Longitude (optional)"
                    placeholder="e.g., 90.4125"
                    value={values.longitude ?? ""}
                    onChangeText={handleChange("longitude")}
                    onBlur={() => handleBlur("longitude")}
                    keyboardType="numeric"
                    error={errors.longitude}
                    touched={touched.longitude}
                    containerStyle={tw`rounded-xl bg-[#F0F4F3] border border-[#0000001A]`}
                    labelStyle={tw`uppercase font-inter-semibold`}
                  />
                </View>
              </View>

              {/* Reminder Selector */}
              <ReminderSelector
                value={values.reminder as ReminderOption}
                onChange={(val) => setFieldValue("reminder", val)}
              />
            </View>

            {/* 🔹 Action Buttons */}
            <View style={tw`mt-4 flex-row gap-2`}>
              <View style={tw`flex-1`}>
                <Button
                  onPress={() => router.back()}
                  variant="ghost"
                  label="Cancel"
                />
              </View>
              <View style={tw`flex-1`}>
                <Button
                  onPress={() => handleSubmit()}
                  label="Schedule"
                  loading={isSubmitting || isCreating}
                />
              </View>
            </View>
          </ScrollView>
        )}
      </Formik>
    </View>
  )
}

type ReminderOption = "1_hour" | "1_day" | "1_week" | "none"

type ReminderTab = {
  id: ReminderOption
  label: string
}

const REMINDER_TABS: ReminderTab[] = [
  {
    id: "1_hour",
    label: "1 hour before",
  },
  {
    id: "1_day",
    label: "1 day before",
  },
  {
    id: "1_week",
    label: "1 week before",
  },
]

type ReminderSelectorProps = {
  value?: ReminderOption
  onChange?: (value: ReminderOption) => void
  defaultValue?: ReminderOption
}

function ReminderSelector({
  value,
  onChange,
  defaultValue = "1_day",
}: ReminderSelectorProps) {
  const [internalValue, setInternalValue] =
    useState<ReminderOption>(defaultValue)

  const selectedValue = value ?? internalValue

  const handleSelect = useCallback(
    (tab: ReminderOption) => {
      if (value === undefined) {
        setInternalValue(tab)
      }

      onChange?.(tab)
    },
    [onChange, value]
  )

  return (
    <View style={tw`w-full flex-col  pb-4`}>
      <AppText
        variant="caption"
        tone="textMute"
        style={tw`text-blackish uppercase font-inter-medium text-sm mb-1`}
      >
        Reminder
      </AppText>

      <View style={tw`flex-row gap-2 pt-1.5`}>
        {REMINDER_TABS.map((tab) => {
          const isActive = selectedValue === tab.id

          return (
            <Pressable
              key={tab.id}
              onPress={() => handleSelect(tab.id)}
              accessibilityRole="button"
              accessibilityState={{ selected: isActive }}
              style={[
                tw`flex-1 items-center justify-center rounded-full px-3 py-[7px]`,
                isActive ? tw`bg-primary` : tw`bg-[#F0F4F3]`,
              ]}
            >
              <AppText
                variant="caption"
                style={[
                  tw`text-center font-inter-semibold`,
                  isActive ? tw`text-white` : tw`text-black/60`,
                ]}
              >
                {tab.label}
              </AppText>
            </Pressable>
          )
        })}
      </View>
    </View>
  )
}
