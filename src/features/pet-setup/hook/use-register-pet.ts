import { ApiResponse } from "@/types/api-response/"
import { useRouter } from "expo-router"
import { useCallback } from "react"
import { Alert } from "react-native"
import { useRegisterPetMutation } from "../api/pet-set-up-api"
import { PetSetupResponse } from "../type"

export interface RegisterPetPayload {
  pet?: string
  pet_name?: string
  selectedBreed?: string
  age?: string
  weight?: string
  gender?: string
  image?: string | null
}

export const useRegisterPet = () => {
  const router = useRouter()
  const [registerPet, { isLoading, isSuccess, isError, error }] =
    useRegisterPetMutation()

  const handleRegisterPet = useCallback(
    async (
      data: RegisterPetPayload
    ): Promise<ApiResponse<PetSetupResponse> | undefined> => {
      const form = new FormData()

      form.append("type", data.pet === "cat" ? "Cat" : "Dog")
      form.append("name", data.pet_name || "")
      form.append("breed", data.selectedBreed || "")
      form.append("age_years", data.age || "")
      form.append("weight", data.weight || "")
      form.append("gender", data.gender === "female" ? "Female" : "Male")

      if (data.image) {
        form.append("photo", {
          uri: data.image,
          type: "image/jpeg",
          name: "profile-image.jpg",
        } as any)
      }

      try {
        const response = await registerPet(form).unwrap()
        console.log("Pet registered successfully:", response)
        router.push("/pet-setup-done")
        return response
      } catch (err) {
        console.log("Error registering pet:", err)
        Alert.alert("Error", JSON.stringify(err))
        throw err
      }
    },
    [registerPet, router]
  )

  return {
    handleRegisterPet,
    registerPet,
    isLoading,
    isSuccess,
    isError,
    error,
  }
}
