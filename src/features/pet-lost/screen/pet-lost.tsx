import { AppText } from "@/components/ui/app-text"
import TopBackButton from "@/components/ui/app-top-bar"
import { Screen } from "@/components/ui/screen"
import tw from "@/lib/tailwind"
import { appToast } from "@/lib/toast/app-toast"
import { router } from "expo-router"
import { useState } from "react"
import { ActivityIndicator, Pressable, View } from "react-native"
import { useLostPetMutation } from "../api/pet-lost-api"
import { DateTimePickerSection } from "../components/date-time-picker-section"
import { LostPetFormInputs } from "../components/lost-pet-form-inputs"
import { PhotoPickerSection } from "../components/photo-picker-section"

export default function PetLostScreen() {
  const [lostPet, { isLoading }] = useLostPetMutation()

  const [date, setDate] = useState<Date>(new Date())
  const [location, setLocation] = useState<string>("Dhanmondi, Dhaka")
  const [additionalInfo, setAdditionalInfo] = useState<string>(
    "Simba was last seen near Dhanmondi Lake. He walked away suddenly."
  )
  const [reward, setReward] = useState<string>("$500")
  const [photos, setPhotos] = useState<string[]>([])

  const handleAddPhoto = (uri: string) => {
    // Single image requirement: replaces or sets the single photo
    setPhotos([uri])
  }

  const handleRemovePhoto = () => {
    setPhotos([])
  }

  const handleSubmit = async () => {
    if (!location.trim()) {
      appToast.error("Please enter the last seen location")
      return
    }

    const formData = new FormData()

    // 1. reward_amount
    const cleanReward = reward.replace(/[^0-9.]/g, "").trim()
    formData.append("reward_amount", cleanReward || reward.trim())

    // 2. last_seen_location
    formData.append("last_seen_location", location.trim())

    // 3. last_seen_date (YYYY-MM-DD) & last_seen_time (HH:mm)
    const pad = (n: number) => String(n).padStart(2, "0")
    const formattedDate = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
    const formattedTime = `${pad(date.getHours())}:${pad(date.getMinutes())}`
    formData.append("last_seen_date", formattedDate)
    formData.append("last_seen_time", formattedTime)

    // 4. additional_info
    formData.append("additional_info", additionalInfo.trim())

    // 5. last_seen_photo (single image)
    if (photos.length > 0 && photos[0]) {
      const uri = photos[0]
      const filename = uri.split("/").pop() || "last_seen_photo.jpg"
      const match = /\.(\w+)$/.exec(filename)
      const ext = match?.[1]?.toLowerCase()
      const type =
        ext === "png"
          ? "image/png"
          : ext === "webp"
            ? "image/webp"
            : ext === "gif"
              ? "image/gif"
              : "image/jpeg"

      formData.append("last_seen_photo", {
        uri,
        name: filename.includes(".") ? filename : `${filename}.jpg`,
        type,
      } as any)
    }

    try {
      const response = await lostPet(formData).unwrap()
      appToast.success(response?.message || "Lost pet report created successfully!")
      router.push("/(pet-lost)/preview-poster" as any)
    } catch (err: any) {
      console.error("Error creating lost pet report:", err)
      let errorMessage =
        err?.data?.message || err?.message || "Failed to create lost pet report"
      if (err?.data?.errors && typeof err.data.errors === "object") {
        const firstErrorKey = Object.keys(err.data.errors)[0]
        const firstErrorMessage = err.data.errors[firstErrorKey]?.[0]
        if (firstErrorMessage) {
          errorMessage = firstErrorMessage
        }
      }
      appToast.error(errorMessage)
    }
  }

  return (
    <Screen>
      <TopBackButton title="Lost Mode" />

      <View style={tw`gap-6 pt-4`}>
        {/* Screen Title */}
        <View>
          <AppText
            variant="title"
            tone="blackish"
            style={tw`font-inter-bold text-2xl leading-8`}
          >
            When & Where{"\n"}did you lose your pet?
          </AppText>
        </View>

        {/* Date / Time Section */}
        <DateTimePickerSection date={date} onChangeDate={setDate} />

        {/* Form Inputs (Location, Additional Info, Reward) */}
        <LostPetFormInputs
          location={location}
          onChangeLocation={setLocation}
          additionalInfo={additionalInfo}
          onChangeAdditionalInfo={setAdditionalInfo}
          reward={reward}
          onChangeReward={setReward}
        />

        {/* Photo Picker Section */}
        <PhotoPickerSection
          photos={photos}
          onAddPhoto={handleAddPhoto}
          onRemovePhoto={handleRemovePhoto}
        />

        {/* Submit Continue Button */}
        <View style={tw`pt-4 pb-6`}>
          <Pressable
            disabled={isLoading}
            onPress={handleSubmit}
            style={({ pressed }) => [
              tw`h-12 bg-teal-600 rounded-full items-center justify-center`,
              pressed && tw`opacity-80`,
              isLoading && tw`opacity-50`,
            ]}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <AppText
                variant="body"
                tone="textWhite"
                style={tw`font-inter-semibold text-base`}
              >
                Continue
              </AppText>
            )}
          </Pressable>
        </View>
      </View>
    </Screen>
  )
}
