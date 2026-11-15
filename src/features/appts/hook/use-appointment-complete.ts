import { appToast } from "@/lib/toast/app-toast"
import { ApiResponse } from "@/types/api-response/api-response"
import { useCallback } from "react"
import { useAppointmentCompleteMutation } from "../api/appts-api"

export type AppointmentCompleteCallbacks = {
  onSuccess?: (response: ApiResponse<any>) => void
  onError?: (error: unknown) => void
}

export type AppointmentCompleteOptions = AppointmentCompleteCallbacks

export const useAppointmentComplete = (
  options?: AppointmentCompleteOptions
) => {
  const [completeMutation, { isLoading, isSuccess, isError, error }] =
    useAppointmentCompleteMutation()

  const completeAppointment = useCallback(
    async (
      id: string | number,
      callbacks?: AppointmentCompleteCallbacks
    ) => {
      try {
        const response = await completeMutation({
          id,
          status: "completed",
        }).unwrap()

        const message =
          response?.message || "Appointment marked as completed"
        appToast.success(message)

        callbacks?.onSuccess?.(response)
        options?.onSuccess?.(response)

        return response
      } catch (err: any) {
        console.error("Failed to complete appointment:", err)
        const errorMessage =
          err?.data?.message ||
          err?.message ||
          "Failed to update appointment status"
        appToast.error(errorMessage)

        callbacks?.onError?.(err)
        options?.onError?.(err)

        throw err
      }
    },
    [completeMutation, options]
  )

  return {
    completeAppointment,
    isCompleting: isLoading,
    isLoading,
    isSuccess,
    isError,
    error,
  }
}
