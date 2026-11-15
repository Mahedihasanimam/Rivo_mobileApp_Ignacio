import { AppText } from "@/components/ui/app-text"
import tw from "@/lib/tailwind"
import { _WIDTH } from "@/utils/utils"
import { BottomSheet, Column, Host, Text } from "@expo/ui"
import { Button } from "@expo/ui/jetpack-compose"
import { height, width } from "@expo/ui/jetpack-compose/modifiers"
import { Image } from "expo-image"
import { View } from "react-native"

type ProfileSetupBottomSheetProps = {
  isPresented: boolean
  setIsPresented: (isPresented: boolean) => void
}

export default function ProfileSetupBottomSheet({
  isPresented,
  setIsPresented,
}: ProfileSetupBottomSheetProps) {
  return (
    <Host style={{ flex: 1 }}>
      <BottomSheet
        isPresented={isPresented}
        onDismiss={() => setIsPresented(false)}
      >
        <Column spacing={20}>
          <View style={tw`flex-col gap-2`}>
            <Image
              source={require("@/assets/auth-image/success-icons.png")}
              style={{
                height: 90.44,
                width: "100%",
              }}
              contentFit="contain"
              accessibilityLabel="Success icon"
            />

            <AppText
              style={{ textAlign: "center" }}
              variant="title"
              tone="blackish"
            >
              🎉 All set!
            </AppText>
            <AppText
              style={{ textAlign: "center" }}
              variant="title"
              tone="blackish"
            >
              Profile setup: 100% Complete
            </AppText>
            <AppText style={{ textAlign: "center" }} variant="body" tone="gray">
              is ready to explore, play, and shine!
            </AppText>
          </View>

          <Button
            onClick={() => setIsPresented(false)}
            colors={{ containerColor: "#2F9C8F", contentColor: "#FFFFFF" }}
            modifiers={[width(_WIDTH - 40), height(50)]}
          >
            <Text style={tw`font-inter-light text-base text-white`}>
              Go to Homepage
            </Text>
          </Button>
        </Column>
      </BottomSheet>
    </Host>
  )
}
