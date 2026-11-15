import { threeNextArrow } from "@/assets/icons/icons"
import { AppText } from "@/components/ui/app-text"
import TopBackButton from "@/components/ui/app-top-bar"
import { Button } from "@/components/ui/button"
import MainInput from "@/components/ui/main-input"
import { Screen } from "@/components/ui/screen"
import tw from "@/lib/tailwind"
import { router, useLocalSearchParams } from "expo-router"
import { useState } from "react"
import { View } from "react-native"

export default function AddPetNameScreen() {
  const [name, setName] = useState("")
  const { pet } = useLocalSearchParams<{ pet: string }>()

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
            {" What's your dog's name?"}
          </AppText>

          <AppText variant="body" tone="subTitle">
            {"We'll use this throughout the app?"}
          </AppText>
        </View>
        <View style={tw`w-full`}>
          <MainInput
            label="Pet Name"
            value={name}
            onChangeText={setName}
            placeholder="Enter your pet name e.g Pedro"
            autoCapitalize="words"
            labelStyle={tw`mb-2`}
            containerStyle={tw`h-14 rounded-xl px-4`}
            textInputStyle={tw`text-sm`}
            outerContainerStyle={tw`w-full mb-4`}
          />
        </View>

        <Button
          label="Continue"
          // icon="arrow-right"
          rightIcon={threeNextArrow}
          onPress={() =>
            router.push({
              pathname: "/pet-breed",
              params: { pet, pet_name: name },
            })
          }
        />
      </View>
    </Screen>
  )
}
