import { api } from "@/api/base-api/api"
import { ApiResponse } from "@/types/api-response/api-response"
import { tagTypes } from "@/types/rtk-tag-type"

export type AppointmentFilterParams = {
  id: string
  page?: number
  per_page?: number
  sort?: string
  include?: string
  filter?: {
    date?: string
    status?: string
    type?: string
    vet_name?: string
  }
}

export type CreateAppointmentPayload = {
  pet_id?: string | number
  title: string
  type: string
  datetime: string
  vet_name?: string
  location?: string
  latitude?: number | string | null
  longitude?: number | string | null
  reminder?: string
  status?: string
}

export const apptsApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAppointments: builder.query<ApiResponse<any>, AppointmentFilterParams>({
      query: ({
        page = 1,
        per_page = 10,
        filter,
        sort,
        include,
      }) => ({
        url: `appointments`,
        params: {
          page,
          per_page,
          sort,
          include,
          ...(filter?.date && { "filter[date]": filter.date }),
          ...(filter?.status && { "filter[status]": filter.status }),
          ...(filter?.type && { "filter[type]": filter.type }),
          ...(filter?.vet_name && { "filter[vet_name]": filter.vet_name }),
        },
      }),
      providesTags: [tagTypes.appointments],
    }),
    createAppointment: builder.mutation<
      ApiResponse<any>,
      CreateAppointmentPayload
    >({
      query: (body) => ({
        url: `appointments`,
        method: "POST",
        body,
      }),
      invalidatesTags: [tagTypes.appointments],
    }),
    appointmentNotes: builder.mutation<
      ApiResponse<any>,
      { id: string | number; note: string }
    >({
      query: ({ id, note }) => ({
        url: `appointments/${id}/notes`,
        method: "POST",
        body: { note },
      }),
      invalidatesTags: [tagTypes.appointments],
    }),
    appointmentComplete: builder.mutation<
      ApiResponse<any>,
      { id: string | number; status?: string }
    >({
      query: ({ id, status = "completed" }) => ({
        url: `appointments/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: [tagTypes.appointments],
    }),
  }),
})
export const {
  useGetAppointmentsQuery,
  useLazyGetAppointmentsQuery,
  useAppointmentCompleteMutation,
  useCreateAppointmentMutation,
  useAppointmentNotesMutation,
} = apptsApi

