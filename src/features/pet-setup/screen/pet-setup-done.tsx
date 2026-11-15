import { AppText } from "@/components/ui/app-text"
import TopBackButton from "@/components/ui/app-top-bar"
import { Button } from "@/components/ui/button"
import { Screen } from "@/components/ui/screen"
import tw from "@/lib/tailwind"
import { Image } from "expo-image"
import { router } from "expo-router"
import { View } from "react-native"
import { scale, verticalScale } from "react-native-size-matters"

export default function PetSetupCompleteScreen() {
  const handleContinue = () => {
    router.push("/(main)/(tabs)")
  }

  return (
    <Screen>
      <TopBackButton hidden={true} newTopBarExtra={false} />

      {/* Content */}
      <View style={tw`flex-1 items-center justify-center`}>
        <View style={tw`w-full items-center `}>
          {/* Title */}
          <AppText
            variant="subtitle"
            tone="blackish"
            style={tw` font-inter-bold text-center`}
          >
            🎉 All set!
          </AppText>

          {/* Description */}
          <View style={tw`w-full items-center gap-2.5 pt-5`}>
            <AppText
              variant="subtitle"
              tone="blackish"
              style={tw`  font-inter-bold text-center`}
            >
              Profile Basics: 100% Complete
            </AppText>

            <AppText
              variant="body"
              tone="gray"
              style={tw`  font-inter-medium `}
            >
              <AppText
                variant="body"
                tone="blackish"
                style={tw` font-inter-bold `}
              >
                Pedro
              </AppText>{" "}
              is ready to explore, play, and shine! ✨
            </AppText>
          </View>
        </View>
        <Image
          source={require("@/assets/pet-setup-image/pet-image.png")}
          contentFit="contain"
          style={{
            height: verticalScale(300),
            width: scale(300),
          }}
        />
        <Button
          label="Continue with full setup"
          onPress={handleContinue}
          fullWidth
        />
      </View>
    </Screen>
  )
}
