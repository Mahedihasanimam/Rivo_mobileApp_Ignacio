import { api } from "@/api/base-api/api"
import { ApiResponse } from "@/types/api-response/"
import { tagTypes } from "@/types/rtk-tag-type"
import { IGetSubcriptionPlansResponse, UserLoginResponse } from "../types"

export const authenticationApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    registerPet: builder.mutation<UserLoginResponse, FormData>({
      query: (form) => ({
        url: "/pets",
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: form,
      }),
      invalidatesTags: [tagTypes.auth],
    }),
    getPlans: builder.query<ApiResponse<IGetSubcriptionPlansResponse[]>, void>({
      query: () => ({
        url: "subscriptions/plans",
      }),
      providesTags: [tagTypes.auth],
    }),
  }),
})
export const { useRegisterPetMutation, useGetPlansQuery } = authenticationApi
