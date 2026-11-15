import { api } from "@/api/base-api/api"
import { ApiResponse } from "@/types/api-response/api-response"
import { tagTypes } from "@/types/rtk-tag-type"
import {
  ICreateEmergencyContactPayload,
  IEmergencyVetHelp,
  IUpdateEmergencyContactPayload,
} from "../type"


export const apptsApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAllEmergencyContacts: builder.query<ApiResponse<IEmergencyVetHelp[]>, void>({
      query: () => ({
        url: `emergency-contacts`,
      }),
      providesTags: [tagTypes.emergency_contacts],
    }),
    deleteEmergencyContact: builder.mutation<ApiResponse<any>, string | number>({
      query: (id) => ({
        url: `emergency-contacts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.emergency_contacts],
    }),
    createEmergencyContact: builder.mutation<ApiResponse<IEmergencyVetHelp>, ICreateEmergencyContactPayload>({
      query: (data) => ({
        url: `emergency-contacts`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.emergency_contacts],
    }),
    updateEmergencyContact: builder.mutation<ApiResponse<IEmergencyVetHelp>, IUpdateEmergencyContactPayload>({
      query: ({ id, ...data }) => ({
        url: `emergency-contacts/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [tagTypes.emergency_contacts],
    }),
  }),
})
export const {
  useGetAllEmergencyContactsQuery,
  useDeleteEmergencyContactMutation,
  useCreateEmergencyContactMutation,
  useUpdateEmergencyContactMutation,
} = apptsApi
