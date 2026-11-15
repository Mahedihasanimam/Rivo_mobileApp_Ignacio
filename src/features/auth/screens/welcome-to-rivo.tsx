import { AppText } from "@/components/ui/app-text"
import TopBackButton from "@/components/ui/app-top-bar"
import { Button } from "@/components/ui/button"
import { Screen } from "@/components/ui/screen"
import tw from "@/lib/tailwind"
import { Image } from "expo-image"
import { router } from "expo-router"
import { View } from "react-native"

export default function welcomeToRivo() {
  return (
    <Screen scroll={true}>
      <TopBackButton hidden={true} newTopBarExtra={false} />
      <View style={tw` flex-1  items-center justify-center `}>
        {/* Illustration */}
        <Image
          source={require("@/assets/auth-image/rivo.png")}
          contentFit="contain"
          accessibilityLabel="Rivo welcome illustration"
          style={tw`aspect-square w-32`}
        />

        {/* Content */}
        <View style={tw`w-full items-center gap-6`}>
          <View style={tw`w-full items-center gap-2.5 px-6`}>
            <AppText variant="title" tone="blackish" style={tw`text-center `}>
              Welcome to Rivo!
            </AppText>

            <AppText variant="body" tone="gray" style={tw`w-full text-center`}>
              Let`&apos`s set up your pet profile - it only takes a minute!
            </AppText>
          </View>

          {/* Start Setup */}
          <Button
            label="Start Set up"
            onPress={() => router.push("/(pet-setup)")}
          />
          {/* Bottom spacing */}
        </View>
      </View>
    </Screen>
  )
}
