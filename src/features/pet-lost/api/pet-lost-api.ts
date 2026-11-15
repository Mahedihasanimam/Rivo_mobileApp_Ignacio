import { api } from "@/api/base-api/api"
import { tagTypes } from "@/types/rtk-tag-type"

export interface LostPetUser {
  id: number
  name: string
  email: string
}

export interface ActiveLostPetReport {
  id: number
  status: string
  last_seen_date: string
  last_seen_time: string
  last_seen_location: string
  latitude: number
  longitude: number
  additional_info: string
  reward_amount: number | string
  last_seen_photo_url: string | null
  created_at: string
  user?: LostPetUser
}

export interface ActiveLostPetResponse {
  ok: boolean
  message: string
  data: ActiveLostPetReport
}

export const petLostApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    lostPet: builder.mutation<any, FormData>({
      query: (form) => ({
        url: "/pets/1/lost-reports",
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: form,
      }),
      invalidatesTags: [tagTypes.auth],
    }),

    getLostPets: builder.query<ActiveLostPetResponse, { petId: string }>({
      query: ({ petId }) => ({
        url: `pets/${petId}/lost-reports/active`,
        method: "GET",
      }),
    }),
  }),
})
export const { useLostPetMutation, useGetLostPetsQuery } = petLostApi
