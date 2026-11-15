import { AppText } from "@/components/ui/app-text"
import { Button } from "@/components/ui/button"
import TopHandler from "@/components/ui/top-handler"
import tw from "@/lib/tailwind"
import { useAppTheme } from "@/theme/theme-provider"
import { Image } from "expo-image"
import { router } from "expo-router"
import React from "react"
import { TouchableOpacity, View } from "react-native"
import { OtpInput } from "react-native-otp-entry"

export default function OtpVerificationModal() {
  const [, setOtpVerify] = React.useState<string>("")
  const [isVerifying, setIsVerifying] = React.useState<boolean>(false)
  const { colors, resolvedTheme } = useAppTheme()
  const isDarkMode = resolvedTheme === "dark"

  return (
    <View style={tw`flex-1 pt-2`}>
      <TopHandler />
      <View style={tw`flex-col gap-8`}>
        <View style={tw`flex-col gap-4`}>
          {isVerifying && (
            <Image
              source={require("../../../../assets/auth-image/success-icons.png")}
              style={{
                height: 100.44,
                width: "100%",
              }}
              contentFit="contain"
              accessibilityLabel="Success icon"
            />
          )}

          <AppText style={tw`text-center`} variant="title" tone="blackish">
            {isVerifying ? "Verification complete!" : "Verify Phone Number"}
          </AppText>

          <AppText style={tw`text-center`} variant="body" tone="gray">
            {isVerifying
              ? "We’ll sent a 6 digit verification code to your phone Number Please enter the number below to confirm your number and resent your account."
              : " We'll send a 6-digit verification code to your phone number. Please enter the number below to confirm your number and reset your account."}
          </AppText>

          {!isVerifying && (
            <OtpInput
              focusColor={isDarkMode ? colors.text : "#000000"}
              placeholder="000000"
              autoFocus={false}
              numberOfDigits={6}
              type="numeric"
              onFilled={(text: string) => setOtpVerify(text)}
              textInputProps={{
                accessibilityLabel: "One-Time Password",
              }}
              textProps={{
                accessibilityRole: "text",
                accessibilityLabel: "OTP digit",
                allowFontScaling: false,
              }}
              theme={{
                pinCodeTextStyle: {
                  color: isDarkMode ? colors.text : "#757575",
                  fontSize: 20,
                  fontFamily: "InterBold",
                },
                pinCodeContainerStyle: {
                  borderColor: isDarkMode ? colors.border : "#757575",
                  borderWidth: 1,
                  borderRadius: 100,
                  width: 50,
                  height: 50,
                },
              }}
            />
          )}

          {!isVerifying && (
            <View style={tw`w-full flex-row items-center justify-center gap-1`}>
              <AppText variant="caption" tone="gray">
                Didn’t receive the code?
              </AppText>
              <TouchableOpacity onPress={() => router.push("/(auth)/signup")}>
                <AppText
                  variant="caption"
                  tone="blackish"
                  style={tw`font-bold`}
                >
                  Resend
                </AppText>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <Button
          label={isVerifying ? "Go to Home" : "Verify"}
          onPress={() => {
            setIsVerifying((prev) => !prev)
            if (isVerifying) {
              router.back()
              router.push("/(auth)/choose-plane")
            }
          }}
        />
      </View>
    </View>
  )
}
