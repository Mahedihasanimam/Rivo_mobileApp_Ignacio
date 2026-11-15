import { threeNextArrow } from "@/assets/icons/icons"
import { AppText } from "@/components/ui/app-text"
import TopBackButton from "@/components/ui/app-top-bar"
import { Button } from "@/components/ui/button"
import KeyboardAvoidingWrapper from "@/components/ui/keyboard-avoiding-wrapper"
import MainInput from "@/components/ui/main-input"
import { Screen } from "@/components/ui/screen"
import tw from "@/lib/tailwind"
import { useAppTheme } from "@/theme/theme-provider"
import { router, useLocalSearchParams } from "expo-router"
import { useRef, useState } from "react"
import { Pressable, ScrollView, TextInput, View } from "react-native"

const breeds = [
  "Pug",
  "French Bulldog",
  "Golden Retriever",
  "Beagle",
  "Rottweiler",
  "Dachshund",
  "Bulldog",
  "Cane Corso",
  "Boxer",
  "Poodle",
  "Great Dane",
  "Yorkshire Terrier",
  "German Shepherd",
  "Labrador Retriever",
  "Schnauzer",
  "Chihuahua",
  "Jack Russell Terrier",
  "Border Collie",
  "Bichon Frise",
  "Shih Tzu",
  "Cocker Spaniel",
  "Siberian Husky",
  "Mixed",
  "Other",
]

export default function PetBreedScreen() {
  const [selectedBreed, setSelectedBreed] = useState<string | null>(
    "Golden Retriever"
  )

  console.log(selectedBreed)

  const { pet, pet_name } = useLocalSearchParams<{
    pet: string
    pet_name: string
  }>()

  const { colors, resolvedTheme } = useAppTheme()
  const isDarkMode = resolvedTheme === "dark"

  const [customBreed, setCustomBreed] = useState("")

  const inputRef = useRef<TextInput>(null)

  const handleBreedSelect = (breed: string) => {
    setSelectedBreed(breed)

    if (breed === "Other") {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 150)
    } else {
      setCustomBreed("")
    }
  }

  const handleCustomBreedChange = (value: string) => {
    setCustomBreed(value)

    // Custom breed becomes the actual selected value
    if (value.trim()) {
      setSelectedBreed("Other")
    }
  }

  const handleNext = () => {
    let finalBreed = selectedBreed

    if (selectedBreed === "Other") {
      finalBreed = customBreed.trim()
    }

    if (!finalBreed) {
      return
    }

    console.log("Selected breed:", finalBreed)

    router.push({
      pathname: "/(pet-setup)/pet-about",
      params: { pet, pet_name, selectedBreed },
    })
  }

  const isOtherSelected = selectedBreed === "Other"

  return (
    <KeyboardAvoidingWrapper>
      <Screen>
        <TopBackButton hidden={true} newTopBarExtra={false} />

        {/* Header */}
        <View style={tw`w-full mb-5`}>
          <AppText variant="title" tone="blackish" style={tw`text-center `}>
            {" What's Pedro’s breed?"}
          </AppText>

          <AppText
            variant="body"
            tone="gray"
            style={tw`text-center font-inter-regular`}
          >
            {" We'll use this throughout the app"}
          </AppText>
        </View>

        <View style={tw`flex-1`}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
              paddingBottom: 20,
            }}
          >
            {/* Regular Breeds */}
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                gap: 8,
              }}
            >
              {breeds
                .filter((breed) => breed !== "Mixed" && breed !== "Other")
                .map((breed) => {
                  const isActive = selectedBreed === breed

                  return (
                    <Pressable
                      key={breed}
                      onPress={() => handleBreedSelect(breed)}
                      style={({ pressed }) => ({
                        minHeight: 36,
                        paddingHorizontal: 16,
                        paddingVertical: 8,
                        borderRadius: 36,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: isActive
                          ? colors.primary
                          : isDarkMode
                            ? colors.backgroundHigh
                            : colors.ghostBg,
                        opacity: pressed ? 0.7 : 1,

                        ...(isActive && {
                          shadowColor: "#000",
                          shadowOffset: {
                            width: 0,
                            height: 4,
                          },
                          shadowOpacity: 0.15,
                          shadowRadius: 4,
                          elevation: 3,
                        }),
                      })}
                    >
                      <AppText
                        variant="caption"
                        style={{
                          letterSpacing: -0.05,
                          color: isActive ? "#FFFFFF" : "#606261",
                          textAlign: "center",
                        }}
                      >
                        {breed}
                      </AppText>
                    </Pressable>
                  )
                })}
            </View>

            {/* Mixed */}
            <Pressable
              onPress={() => handleBreedSelect("Mixed")}
              style={({ pressed }) => {
                const isActive = selectedBreed === "Mixed"

                return {
                  width: "100%",
                  height: 38,
                  marginTop: 8,
                  borderRadius: 36,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: isActive
                    ? "#2F9C8F"
                    : isDarkMode
                      ? colors.backgroundHigh
                      : colors.ghostBg,
                  opacity: pressed ? 0.7 : 1,

                  ...(isActive && {
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 4,
                    },
                    shadowOpacity: 0.15,
                    shadowRadius: 4,
                    elevation: 3,
                  }),
                }
              }}
            >
              <AppText
                variant="caption"
                tone="gray"
                style={{
                  color: selectedBreed === "Mixed" ? "#FFFFFF" : "#606261",
                  textAlign: "center",
                }}
              >
                Mixed
              </AppText>
            </Pressable>

            {/* Other */}
            <View
              style={{
                alignItems: "center",
                marginTop: 8,
                marginBottom: 12,
              }}
            >
              <Pressable
                onPress={() => handleBreedSelect("Other")}
                style={({ pressed }) => {
                  const isActive = selectedBreed === "Other"

                  return {
                    minWidth: 120,
                    height: 38,
                    paddingHorizontal: 20,
                    borderRadius: 36,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: isActive ? "#2F9C8F" : "#F0F4F3",
                    opacity: pressed ? 0.7 : 1,

                    ...(isActive && {
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 4,
                      },
                      shadowOpacity: 0.15,
                      shadowRadius: 4,
                      elevation: 3,
                    }),
                  }
                }}
              >
                <AppText
                  variant="caption"
                  style={[
                    tw`font-inter-semibold`,
                    {
                      color: selectedBreed === "Other" ? "#FFFFFF" : "#606261",
                      textAlign: "center",
                    },
                  ]}
                >
                  Other
                </AppText>
              </Pressable>
            </View>

            {/* Custom Breed Input */}
            {isOtherSelected && (
              <MainInput
                ref={inputRef}
                value={customBreed}
                onChangeText={handleCustomBreedChange}
                placeholder="Enter breed name"
                autoCapitalize="words"
                labelStyle={{ marginBottom: 4 }}
              />
            )}
          </ScrollView>

          {/* Next */}
          <View style={tw`pt-4`}>
            <Button
              label="Next"
              rightIcon={threeNextArrow}
              disabled={isOtherSelected && !customBreed.trim()}
              onPress={handleNext}
            />
          </View>
        </View>
      </Screen>
    </KeyboardAvoidingWrapper>
  )
}
