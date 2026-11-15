import { PET_ID } from "@/constants/pet-id"
import { appToast } from "@/lib/toast/app-toast"
import { ApiResponse } from "@/types/api-response/api-response"
import { router } from "expo-router"
import { useCallback } from "react"
import { useCreateWeightLogsMutation } from "../api/health-vault-api"
import { ICreateWeightLogPayload, IWeightLog } from "../type"

export type CreateWeightLogCallbacks = {
  onSuccess?: (response: ApiResponse<IWeightLog[] | IWeightLog>) => void
  onError?: (error: unknown) => void
}

export type CreateWeightLogOptions = CreateWeightLogCallbacks & {
  petId?: string
}

export const useCreateWeightLog = (options?: CreateWeightLogOptions) => {
  const [createWeightLogsMutation, { isLoading, isSuccess, isError, error }] =
    useCreateWeightLogsMutation()

  const defaultPetId = options?.petId || PET_ID

  const createWeightLog = useCallback(
    async (
      payload: ICreateWeightLogPayload,
      callbacks?: CreateWeightLogCallbacks & { petId?: string }
    ) => {
      const petId = callbacks?.petId || defaultPetId

      try {
        const response = await createWeightLogsMutation({
          data: payload,
          id: petId,
        }).unwrap()

        appToast.success(response?.message || "Weight logged successfully!")

        callbacks?.onSuccess?.(response)
        options?.onSuccess?.(response)

        router.back()
        return response
      } catch (err: any) {
        console.error("Error creating weight log:", err)
        const errorMessage =
          err?.data?.message || err?.message || "Failed to log weight"
        appToast.error(errorMessage)

        callbacks?.onError?.(err)
        options?.onError?.(err)
        throw err
      }
    },
    [createWeightLogsMutation, defaultPetId, options]
  )

  return {
    createWeightLog,
    createWeightLogsMutation,
    isLoading,
    isSuccess,
    isError,
    error,
  }
}
