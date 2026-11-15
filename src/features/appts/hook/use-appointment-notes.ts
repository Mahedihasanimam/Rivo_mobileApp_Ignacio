import { appToast } from "@/lib/toast/app-toast"
import { ApiResponse } from "@/types/api-response/api-response"
import { useCallback } from "react"
import { useAppointmentNotesMutation } from "../api/appts-api"

export type AppointmentNoteCallbacks = {
  onSuccess?: (response: ApiResponse<any>) => void
  onError?: (error: unknown) => void
}

export type AppointmentNoteOptions = AppointmentNoteCallbacks

export const useAppointmentNotes = (options?: AppointmentNoteOptions) => {
  const [addNoteMutation, { isLoading, isSuccess, isError, error }] =
    useAppointmentNotesMutation()

  const addNote = useCallback(
    async (
      id: string | number,
      note: string,
      callbacks?: AppointmentNoteCallbacks
    ) => {
      const trimmed = note.trim()
      if (!trimmed) {
        appToast.error("Please enter a note")
        return
      }

      try {
        const response = await addNoteMutation({
          id,
          note: trimmed,
        }).unwrap()

        const message = response?.message || "Note saved successfully"
        appToast.success(message)

        callbacks?.onSuccess?.(response)
        options?.onSuccess?.(response)

        return response
      } catch (err: any) {
        console.error("Failed to add appointment note:", err)
        const errorMessage =
          err?.data?.message ||
          err?.data?.error ||
          err?.message ||
          "Failed to save note"
        appToast.error(errorMessage)

        callbacks?.onError?.(err)
        options?.onError?.(err)

        throw err
      }
    },
    [addNoteMutation, options]
  )

  return {
    addNote,
    saveNote: addNote,
    addAppointmentNote: addNote,
    isSavingNote: isLoading,
    isLoading,
    isSuccess,
    isError,
    error,
  }
}
