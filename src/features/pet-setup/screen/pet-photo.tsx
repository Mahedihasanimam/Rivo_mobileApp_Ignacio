import { galleryImage, takeAphoto } from "@/assets/icons/icons"
import { AppText } from "@/components/ui/app-text"
import TopBackButton from "@/components/ui/app-top-bar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { HeroPanel } from "@/components/ui/hero-panel"
import { Screen } from "@/components/ui/screen"
import tw from "@/lib/tailwind"
import { Image } from "expo-image"
import * as ImagePicker from "expo-image-picker"
import { useLocalSearchParams } from "expo-router"
import { useCallback, useState } from "react"
import { Alert, Pressable, View } from "react-native"
import { SvgXml } from "react-native-svg"
import { useRegisterPet } from "../hook"

const options = [
  {
    id: "camera",
    title: "Take a Photo",
    description: "Capture a new pic right now",
    // image: require("@/assets/pet-setup-image/camera.png"),
    icon: takeAphoto,
  },
  {
    id: "gallery",
    title: "Choose from Gallery",
    description: "Pick from your saved photos",
    icon: galleryImage,
    // image: require("@/assets/pet-setup-image/gallery.png"),
  },
]
export default function PetPhotoScreen() {
  return (
    <Screen>
      <TopBackButton hidden={true} newTopBarExtra={false} />

      <HeroPanel
        title="Add a photo of Butch"
        body="Help others recognize Butch on Rivo (optional)"
      />
      <PetPhotoOptions />
    </Screen>
  )
}

function PetPhotoOptions() {
  const [image, setImage] = useState<string | null>(null)

  const { handleRegisterPet, isLoading } = useRegisterPet()

  const { pet, pet_name, selectedBreed, age, breed, weight, gender } =
    useLocalSearchParams<{
      pet: string
      pet_name: string
      selectedBreed: string
      age: string
      weight: string
      breed: string
      gender: string
    }>()

  const handleProfileCompleted = useCallback(() => {
    handleRegisterPet({
      pet,
      pet_name,
      selectedBreed,
      age,
      weight,
      gender,
      image,
    })
  }, [
    handleRegisterPet,
    pet,
    pet_name,
    selectedBreed,
    age,
    weight,
    gender,
    image,
  ])

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library.
    // Manually request permissions for videos on iOS when `allowsEditing` is set to `false`
    // and `videoExportPreset` is `'Passthrough'` (the default), ideally before launching the picker
    // so the app users aren't surprised by a system dialog after picking a video.
    // See "Invoke permissions for videos" sub section for more details.
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission required",
        "Permission to access the media library is required."
      )
      return
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    // console.log(result)

    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
  }

  const takePhoto = async () => {
    // Camera access always requires the user's permission.
    // Taking a photo also requires a device with a camera. The iOS Simulator
    // does not have one, so use a physical device to test this button.
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync()

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission required",
        "Permission to access the camera is required."
      )
      return
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    console.log(result)

    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
  }

  const removePhoto = () => {
    setImage(null)
  }

  return (
    <View style={tw`w-full flex-col items-center gap-5`}>
      {image ? (
        /* ================= SELECTED IMAGE ================= */
        <View style={tw`w-full items-center gap-3`}>
          <View
            style={tw`h-32 w-32 rounded-full border-2 border-dashed border-primary`}
          >
            <Image
              source={{ uri: image }}
              contentFit="cover"
              style={tw`h-32 w-32 rounded-full`}
            />
          </View>

          {/* Remove Photo */}
          <Pressable onPress={removePhoto}>
            <AppText
              variant="body"
              tone="primary"
              style={tw`underline font-inter-semibold text-center`}
            >
              Remove Photo
            </AppText>
          </Pressable>
        </View>
      ) : (
        /* ================= CAMERA / GALLERY ================= */
        <View style={tw`w-full flex-row items-center gap-2`}>
          {options.map((option) => (
            <Pressable
              key={option.id}
              onPress={() => {
                if (option.id === "camera") {
                  takePhoto()
                } else if (option.id === "gallery") {
                  pickImage()
                }
              }}
              style={tw`flex-1`}
            >
              <Card
                radius="md"
                style={tw`items-center px-3 py-4 gap-1 flex-col`}
              >
                <SvgXml xml={option.icon} />

                <View
                  style={tw`w-full flex-col gap-1 items-center justify-center`}
                >
                  <AppText
                    variant="caption"
                    tone="blackish"
                    style={tw`font-inter-bold`}
                  >
                    {option.title}
                  </AppText>

                  <AppText
                    variant="caption"
                    tone="gray"
                    style={tw`font-inter-medium text-center`}
                  >
                    {option.description}
                  </AppText>
                </View>
              </Card>
            </Pressable>
          ))}
        </View>
      )}

      <Card radius="md" style={tw`w-full flex-col px-3 `}>
        <View style={tw`flex-row items-center gap-2.5`}>
          {/* Pet Image */}
          <Image
            source={image ? image : require("@/assets/pet-setup-image/dog.png")}
            contentFit="cover"
            style={tw`h-[61px] w-[61px] rounded-full`}
          />

          {/* Pet Info */}
          <View style={tw`flex-1 gap-1.5`}>
            {/* Name + Breed */}
            <View style={tw`flex-row items-center gap-2.5`}>
              <AppText variant="subtitle" tone="primary">
                {pet_name}
              </AppText>

              <View style={tw`rounded-full bg-[#2F9C8F] px-1.5 py-0.5`}>
                <AppText
                  variant="caption"
                  style={{
                    fontFamily: "Inter-Regular",
                    fontSize: 8,
                    lineHeight: 16,
                    letterSpacing: 0.4,
                    color: "#FFFFFF",
                    textTransform: "uppercase",
                  }}
                >
                  {selectedBreed}
                </AppText>
              </View>
            </View>

            {/* Details */}
            <AppText
              variant="caption"
              style={{
                fontFamily: "PlusJakartaSans-Regular",
                fontSize: 12,
                lineHeight: 12,
                color: "#585D65",
              }}
            >
              {age} years • {weight} kg • {gender}
            </AppText>
          </View>
        </View>
      </Card>

      <Button
        loading={isLoading}
        label="Continue"
        onPress={handleProfileCompleted}
      />
      {/* <Button label="Continue" onPress={() => router.push("/pet-setup-done")} /> */}

      <AppText variant="caption" tone="gray">
        You can add a photo later in settings
      </AppText>
    </View>
  )
}
