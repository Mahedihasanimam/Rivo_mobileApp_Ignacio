import { AppText } from "@/components/ui/app-text"
import TopBackButton from "@/components/ui/app-top-bar"
import { Button } from "@/components/ui/button"
import { HeroPanel } from "@/components/ui/hero-panel"
import MainInput from "@/components/ui/main-input"
import { Screen } from "@/components/ui/screen"
import tw from "@/lib/tailwind"
import { router } from "expo-router"
import { useState } from "react"
import { TouchableOpacity, View } from "react-native"
import { ICountry } from "rn-country-select"
import BottomSheetExample from "../components/otp-buttom-sheet"
import { PhoneInput } from "../components/phone-input"
import { SocialLogin } from "../components/social-login"
import { UserTypePicker } from "../components/user-type-picker"

export default function SignupScreen() {
  const [userType, setUserType] = useState<string>("Pet Owner")
  const [showCountryPicker, setShowCountryPicker] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState<ICountry | null>(null)

  const [phoneNumber, setPhoneNumber] = useState("")
  const [isPresented, setIsPresented] = useState(false)
  const [name, setName] = useState("")

  const handleCountrySelect = (country: ICountry) => {
    setSelectedCountry(country)
    setShowCountryPicker(false)
  }

  return (
    <Screen scroll={false}>
      <TopBackButton hidden={true} newTopBarExtra={false} />
      <View style={tw`flex-1 w-full items-center justify-center gap-6 `}>
        <HeroPanel
          title="Register to your Account"
          body="Connect with your furry friends"
          rivo={true}
        />
        <View style={tw`w-full gap-4`}>
          <View style={tw` flex-col gap-3`}>
            {/* Select User Type */}
            <UserTypePicker userType={userType} setUserType={setUserType} />

            <MainInput
              label="Full Name"
              value={name}
              onChangeText={setName}
              placeholder="Enter Name"
              autoCapitalize="words"
              labelStyle={tw` font-inter-regular text-xs mb-0.5`}
              containerStyle={tw`h-14 rounded-[24px] px-4`}
              textInputStyle={tw`text-sm`}
              outerContainerStyle={tw`w-full mb-0`}
            />

            {/* Phone Number */}
            <PhoneInput
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
            />
          </View>

          <AppText variant="caption" tone="gray">
            You will receive an SMS verification that may apply
          </AppText>

          {/* Sign Up Button */}
          <Button label="Create Account" onPress={() => setIsPresented(true)} />

          {/* Social Login */}
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
          <BottomSheetExample
            isPresented={isPresented}
            setIsPresented={setIsPresented}
          />
        </View>
      </View>
    </Screen>
  )
}
