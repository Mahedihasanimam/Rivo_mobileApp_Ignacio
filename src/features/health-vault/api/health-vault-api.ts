import { api } from "@/api/base-api/api"
import { ApiResponse } from "@/types/api-response/api-response"
import { tagTypes } from "@/types/rtk-tag-type"
import {
  ICareRespose,
  ICreateWeightLogPayload,
  IDocument,
  IHealthVaultData,
  IWeightLog,
} from "../type"
import { AddCareTask } from "../schema/health-vault-schema"

export const healthVaultApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getHealthVaultPlans: builder.query<ApiResponse<IHealthVaultData>, string>({
      query: (id) => ({
        url: `pets/${id}/health-vault/dashboard`,
      }),
      providesTags: [tagTypes.health_vault],
    }),
    getHealthVaultDocuments: builder.query<ApiResponse<IDocument[]>, string>({
      query: (id) => ({
        url: `pets/${id}/health-vault/documents`,
      }),
      providesTags: [tagTypes.health_vault],
    }),
    getHealthVaultWeight: builder.query<ApiResponse<IWeightLog[]>, string>({
      query: (id) => ({
        url: `pets/${id}/health-vault/weight`,
      }),
      providesTags: [tagTypes.health_vault],
    }),
    getHealthVaultDocument: builder.query<ApiResponse<IDocument[]>, string>({
      query: (id) => ({
        url: `pets/${id}/health-vault/documents`,
      }),
      providesTags: [tagTypes.health_vault],
    }),
    createWeightLogs: builder.mutation<
      ApiResponse<IWeightLog[] | IWeightLog>,
      { data: ICreateWeightLogPayload; id: string }
    >({
      query: ({ data, id }) => ({
        method: "POST",
        url: `pets/${id}/health-vault/weight`,
        body: data,
      }),
      invalidatesTags: [tagTypes.health_vault],
    }),
    
    uploadDocuments: builder.mutation<
      ApiResponse<IDocument | IDocument[] | any>,
      { data: FormData; id: string }
    >({
      query: ({ data, id }) => ({
        method: "POST",
        url: `pets/${id}/health-vault/documents`,
        body: data,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
      invalidatesTags: [tagTypes.health_vault],
    }),
    deletedDocuments: builder.mutation<
      ApiResponse<IDocument | IDocument[] | any>,
      { data: FormData; id: string }
    >({
      query: ({ data, id }) => ({
        method: "POST",
        url: `pets/${id}/health-vault/documents`,
        body: data,
      }),
      invalidatesTags: [tagTypes.health_vault],
    }),

    getCareTasks: builder.query<ApiResponse<ICareRespose>, string>({
      query: (id) => ({
        url: `pets/${id}/care-tasks`,
      }),
      providesTags: [tagTypes.health_vault],
    }),
    completeCareTask: builder.mutation<
      ApiResponse<any>,
      { id: string, task_id: string }
    >({
      query: ({ id , task_id}) => ({
        method: "POST",
        url: `pets/${id}/care-tasks/${task_id}/complete`,
      }),
      invalidatesTags: [tagTypes.health_vault],
    }),
    addCareTask: builder.mutation<
      ApiResponse<any>,
      { id: string, data: any }
    >({
      query: ({ data , id }) => ({
        method: "POST",
        url: `pets/${id}/care-tasks`,
        body : data
      }),
      invalidatesTags: [tagTypes.health_vault],
    }),

  }),
})
export const {
  useGetHealthVaultPlansQuery,
  useGetHealthVaultDocumentsQuery,
  useGetHealthVaultWeightQuery,
  useCreateWeightLogsMutation,
  useUploadDocumentsMutation,
  useGetHealthVaultDocumentQuery,
  useGetCareTasksQuery,
  useCompleteCareTaskMutation,
  useAddCareTaskMutation,
} = healthVaultApi
