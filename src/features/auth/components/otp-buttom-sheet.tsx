import { AppText } from "@/components/ui/app-text"
import tw from "@/lib/tailwind"
import { useAppTheme } from "@/theme/theme-provider"
import { _WIDTH } from "@/utils/utils"
import { BottomSheet, Column, Host, Text } from "@expo/ui"
import { Button } from "@expo/ui/jetpack-compose"
import { height, width } from "@expo/ui/jetpack-compose/modifiers"
import { Image } from "expo-image"
import { router } from "expo-router"
import React from "react"
import { TouchableOpacity, View } from "react-native"
import { OtpInput } from "react-native-otp-entry"

type BottomSheetExampleProps = {
  isPresented: boolean
  setIsPresented: (isPresented: boolean) => void
}

export default function BottomSheetExample({
  isPresented,
  setIsPresented,
}: BottomSheetExampleProps) {
  const [, setOtpVerify] = React.useState<string>("")
  const [isVerifying, setIsVerifying] = React.useState<boolean>(false)
  const { colors, resolvedTheme } = useAppTheme()
  const isDarkMode = resolvedTheme === "dark"

  return (
    <Host style={{ flex: 1 }}>
      <BottomSheet
        isPresented={isPresented}
        onDismiss={() => setIsPresented(false)}
      >
        <Column spacing={isVerifying ? 30 : 15}>
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

            {
              <AppText style={tw`text-center`} variant="body" tone="gray">
                {isVerifying
                  ? "We’ll sent a 6 digit verification code to your phone Number Please enter the number below to confirm your number and resent your account."
                  : " We'll send a 6-digit verification code to your phone number. Please enter the number below to confirm your number and reset your account."}
              </AppText>
            }

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
              <View
                style={tw`w-full flex-row items-center justify-center gap-1`}
              >
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
            onClick={() => {
              setIsVerifying((prev) => !prev)
              if (isVerifying) {
                setIsPresented(false)
                router.push("/(auth)/choose-plane")
              }
            }}
            colors={{ containerColor: "#2F9C8F", contentColor: "#FFFFFF" }}
            modifiers={[width(_WIDTH - 40), height(50)]}
          >
            <Text style={tw`font-inter-light text-base text-white`}>
              {isVerifying ? "Go to Home" : "Verify"}
            </Text>
          </Button>
        </Column>
      </BottomSheet>
    </Host>
  )
}
