import { api } from "@/api/base-api/api"
import { ApiResponse } from "@/types/api-response/"
import { tagTypes } from "@/types/rtk-tag-type"
import { PetSetupResponse } from "../type"

export const petSetupApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    registerPet: builder.mutation<ApiResponse<PetSetupResponse>, FormData>({
      query: (FormData) => ({
        url: "pets",
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: FormData,
      }),
      invalidatesTags: [tagTypes.auth],
    }),
  }),
})
export const { useRegisterPetMutation } = petSetupApi
