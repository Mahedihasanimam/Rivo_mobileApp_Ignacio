import { PET_ID } from "@/constants/pet-id"
import { appToast } from "@/lib/toast/app-toast"
import { ApiResponse } from "@/types/api-response/api-response"
import { router } from "expo-router"
import { useCallback } from "react"
import { useUploadDocumentsMutation } from "../api/health-vault-api"
import { IDocument } from "../type"

export type UploadDocumentFile = {
  uri: string
  name: string
  mimeType?: string
  size?: number
}

export type UploadDocumentPayload = {
  title: string
  file: UploadDocumentFile
}

export type UploadDocumentCallbacks = {
  onSuccess?: (response: ApiResponse<IDocument | IDocument[] | any>) => void
  onError?: (error: unknown) => void
}

export type UseUploadDocumentOptions = UploadDocumentCallbacks & {
  petId?: string
}

export const useUploadDocument = (options?: UseUploadDocumentOptions) => {
  const [uploadDocumentsMutation, { isLoading, isSuccess, isError, error }] =
    useUploadDocumentsMutation()

  const defaultPetId = options?.petId || PET_ID

  const uploadDocument = useCallback(
    async (
      payload: UploadDocumentPayload,
      callbacks?: UploadDocumentCallbacks & { petId?: string }
    ) => {
      const petId = callbacks?.petId || defaultPetId

      const formData = new FormData()
      formData.append("title", payload.title.trim())

      const fileExtension = payload.file.name.split(".").pop()?.toLowerCase()
      const fallbackMime =
        fileExtension === "pdf"
          ? "application/pdf"
          : fileExtension === "png"
            ? "image/png"
            : "image/jpeg"

      formData.append("document", {
        uri: payload.file.uri,
        name: payload.file.name,
        type: payload.file.mimeType || fallbackMime,
      } as any)

      try {
        const response = await uploadDocumentsMutation({
          data: formData,
          id: petId,
        }).unwrap()

        appToast.success(response?.message || "Document uploaded successfully!")

        callbacks?.onSuccess?.(response)
        options?.onSuccess?.(response)

        router.back()
        return response
      } catch (err: any) {
        console.error("Error uploading document:", err)
        const errorMessage =
          err?.data?.message || err?.message || "Failed to upload document"
        appToast.error(errorMessage)

        callbacks?.onError?.(err)
        options?.onError?.(err)
        throw err
      }
    },
    [uploadDocumentsMutation, defaultPetId, options]
  )

  return {
    uploadDocument,
    uploadDocumentsMutation,
    isLoading,
    isSuccess,
    isError,
    error,
  }
}
