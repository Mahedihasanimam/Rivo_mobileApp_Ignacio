import { PET_ID } from "@/constants/pet-id"
import { appToast } from "@/lib/toast/app-toast"
import { router } from "expo-router"
import { useCallback, useState } from "react"
import {
  CreateAppointmentPayload,
  useCreateAppointmentMutation,
} from "../api/appts-api"
import {
  formatToApiDateTime,
  mergeSelectedDate,
  mergeSelectedTime,
} from "../helper"
import { NewAppointmentFormValues } from "../schema"

export const initialAppointmentValues: NewAppointmentFormValues = {
  title: "",
  type: "",
  vet_name: "",
  location: "",
  latitude: "",
  longitude: "",
  datetime: "",
  reminder: "1_day",
}

export type UseCreateAppointmentOptions = {
  onSuccess?: () => void
  onError?: (error: any) => void
}

export function useCreateAppointment(options?: UseCreateAppointmentOptions) {
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showTimePicker, setShowTimePicker] = useState(false)

  const [createAppointmentMutation, { isLoading: isCreating }] =
    useCreateAppointmentMutation()

  const handleCreateAppointment = useCallback(
    async (values: NewAppointmentFormValues) => {
      try {
        const dateObj = new Date(values.datetime)
        const formattedDateTime = !isNaN(dateObj.getTime())
          ? formatToApiDateTime(dateObj)
          : values.datetime

        const payload: CreateAppointmentPayload = {
          pet_id: PET_ID,
          title: values.title.trim(),
          type: values.type.trim(),
          datetime: formattedDateTime,
          reminder: values.reminder || "none",
          ...(values.vet_name?.trim()
            ? { vet_name: values.vet_name.trim() }
            : {}),
          ...(values.location?.trim()
            ? { location: values.location.trim() }
            : {}),
          ...(values.latitude ? { latitude: Number(values.latitude) } : {}),
          ...(values.longitude ? { longitude: Number(values.longitude) } : {}),
        }

        const res = await createAppointmentMutation(payload).unwrap()

        if (res?.message) {
          appToast.success(res.message)
        } else {
          appToast.success("Appointment scheduled successfully!")
        }

        options?.onSuccess?.()
        router.back()
        return res
      } catch (error: any) {
        console.error("Failed to schedule appointment:", error)
        const errorMsg =
          error?.data?.message ||
          error?.data?.error ||
          error?.message ||
          "Failed to schedule appointment"
        appToast.error(errorMsg)
        options?.onError?.(error)
        throw error
      }
    },
    [createAppointmentMutation, options]
  )

  const onDateChange = useCallback(
    (
      selectedDate: Date | undefined,
      currentDateTime: string,
      setFieldValue: (field: string, value: any) => void
    ) => {
      setShowDatePicker(false)
      if (!selectedDate) return
      const updatedIso = mergeSelectedDate(selectedDate, currentDateTime)
      setFieldValue("datetime", updatedIso)
    },
    []
  )

  const onTimeChange = useCallback(
    (
      selectedTime: Date | undefined,
      currentDateTime: string,
      setFieldValue: (field: string, value: any) => void
    ) => {
      setShowTimePicker(false)
      if (!selectedTime) return
      const updatedIso = mergeSelectedTime(selectedTime, currentDateTime)
      setFieldValue("datetime", updatedIso)
    },
    []
  )

  return {
    initialValues: initialAppointmentValues,
    isCreating,
    showDatePicker,
    setShowDatePicker,
    showTimePicker,
    setShowTimePicker,
    handleCreateAppointment,
    onDateChange,
    onTimeChange,
  }
}
