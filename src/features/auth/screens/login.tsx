import { AppText } from "@/components/ui/app-text"
import TopBackButton from "@/components/ui/app-top-bar"
import { Button } from "@/components/ui/button"
import { HeroPanel } from "@/components/ui/hero-panel"
import { Screen } from "@/components/ui/screen"
import tw from "@/lib/tailwind"
import { router } from "expo-router"
import { useState } from "react"
import { TouchableOpacity, View } from "react-native"
import { ICountry } from "rn-country-select"
import { PhoneInput } from "../components/phone-input"
import { SocialLogin } from "../components/social-login"
import { UserTypePicker } from "../components/user-type-picker"

export default function LoginScreen() {
  const [userType, setUserType] = useState<string>("Pet Owner")
  const [selectedCountry, setSelectedCountry] = useState<ICountry | null>(null)

  const [phoneNumber, setPhoneNumber] = useState("")

  return (
    <Screen scroll={false}>
      <TopBackButton hidden={true} newTopBarExtra={false} />
      <View style={tw`flex-1 w-full items-center justify-center gap-6 `}>
        <HeroPanel
          title="Welcome back."
          body="Log in continue with Rivo"
          rivo={true}
        />
        <View style={tw`w-full gap-4`}>
          <View style={tw` flex-col gap-6`}>
            {/* Select User Type */}
            <UserTypePicker userType={userType} setUserType={setUserType} />

            {/* Phone Number */}
            <PhoneInput
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
            />
          </View>

          <AppText variant="caption" tone="gray" style={tw`font-inter-regular`}>
            You will receive an SMS verification that may apply
          </AppText>

          {/* Log In Button */}
          <Button
            label="Log In"
            onPress={() => router.push("/(modal)/otp-verification-modal")}
          />

          <SocialLogin />

          {/* Don't have an account? */}
          <View
            style={tw`w-full flex-row items-center py-2 justify-center gap-1`}
          >
            <AppText variant="caption" tone="gray">
              Don’t have an account?
            </AppText>
            <TouchableOpacity onPress={() => router.push("/(auth)/signup")}>
              <AppText variant="caption" tone="blackish" style={tw`font-bold`}>
                Register
              </AppText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Screen>
  )
}
