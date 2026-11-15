import { threeNextArrow } from "@/assets/icons/icons"
import { AppText } from "@/components/ui/app-text"
import TopBackButton from "@/components/ui/app-top-bar"
import { Button } from "@/components/ui/button"
import { Screen } from "@/components/ui/screen"
import tw from "@/lib/tailwind"
import { useAppTheme } from "@/theme/theme-provider"
import { Image } from "expo-image"
import { LinearGradient } from "expo-linear-gradient"
import { router } from "expo-router"
import { useState } from "react"
import { Pressable, View } from "react-native"

const pets = [
  {
    id: "dog" as const,
    label: "Dog",
    image: require("@/assets/pet-setup-image/dog.png"),
  },
  {
    id: "cat" as const,
    label: "Cat",
    image: require("@/assets/pet-setup-image/cat.png"),
  },
]

export default function AddPetScreen() {
  const [selected, setSelected] = useState<"dog" | "cat">("dog")
  const { resolvedTheme, colors } = useAppTheme()
  const isDarkTheme = resolvedTheme === "dark"

  // console.log(selected)

  return (
    <Screen>
      <TopBackButton hidden={true} newTopBarExtra={false} />

      <View style={tw`flex-1 justify-center items-center`}>
        <View style={tw`w-full items-center justify-center gap-2.5`}>
          <AppText
            variant="title"
            tone="blackish"
            style={tw`text-center font-inter-bold`}
          >
            What type of pet do you have?
          </AppText>

          <AppText variant="body" tone="subTitle">
            A purring cat, a loyal dog?
          </AppText>
        </View>

        <View style={tw`flex-row justify-center items-center gap-4 mb-4`}>
          {pets.map((pet) => {
            const isActive = selected === pet.id

            return (
              <Pressable
                key={pet.id}
                onPress={() => setSelected(pet.id)}
                style={{
                  borderWidth: isActive ? 2 : 1,
                  borderColor: isActive ? "#2F9C8F" : "#1F3230",
                  borderRadius: 12,
                  overflow: "hidden",
                }}
              >
                <LinearGradient
                  colors={
                    isDarkTheme
                      ? ["#1F3230", "#1F3230"]
                      : ["#FFFFFF", "#F9F7FF"]
                  }
                  // colors={["#FFFFFF", "#F9F7FF"]}
                  locations={[0, 1]}
                  start={{ x: 0.5, y: 0 }}
                  end={{ x: 0.5, y: 1 }}
                  style={{
                    width: 120,
                    padding: 10,
                    gap: 8,
                    alignItems: "center",
                  }}
                >
                  {/* Image Container */}
                  <View
                    style={{
                      width: "100%",
                      height: 70,
                      borderRadius: 12,
                      backgroundColor: isDarkTheme ? "transparent" : "#FFFFFF",
                      overflow: "hidden",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={pet.image}
                      style={{
                        width: 70,
                        height: 70,
                      }}
                      contentFit="contain"
                    />
                  </View>

                  {/* Pet Name */}
                  <AppText
                    variant="caption"
                    tone="blackish"
                    style={{
                      textAlign: "center",
                    }}
                  >
                    {pet.label}
                  </AppText>
                </LinearGradient>
              </Pressable>
            )
          })}
        </View>

        <AppText variant="body" tone="gray">
          Other pets coming soon...
        </AppText>

        <Button
          label="Next"
          onPress={() =>
            router.push({
              pathname: "/(pet-setup)/add-pet-name",
              params: { pet: selected },
            })
          }
          rightIcon={threeNextArrow}
        />
      </View>
    </Screen>
  )
}
