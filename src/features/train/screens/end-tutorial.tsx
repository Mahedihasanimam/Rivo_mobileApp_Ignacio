import { View } from "react-native"

import {
  fire,
  starBlue,
  starYellow,
  thorPrimaryIcons,
} from "@/assets/icons/icons"
import { AppText } from "@/components/ui/app-text"
import TopBackButton from "@/components/ui/app-top-bar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Screen } from "@/components/ui/screen"
import tw from "@/lib/tailwind"
import { Image } from "expo-image"
import { SvgXml } from "react-native-svg"

export default function TrainingCompleteScreen() {
  return (
    <Screen>
      <TopBackButton title="End Tutorial" />
      <View style={tw`gap-6`}>
        {/* Header */}
        <View>
          <View style={tw`items-center`}>
            {/* Replace with your actual success image */}
            <Image
              source={require("@/assets/auth-image/success-icons.png")}
              style={{
                height: 100.44,
                width: "100%",
              }}
              contentFit="contain"
              accessibilityLabel="Success icon"
            />
          </View>

          <AppText
            tone="blackish"
            variant="hero"
            style={tw`mt-2 text-center  font-inter-bold`}
          >
            Great Job! 🎉
          </AppText>

          <AppText
            tone="gray"
            variant="body"
            style={tw`mt-1 text-center  font-inter-medium`}
          >
            You completed
          </AppText>

          <AppText
            tone="blackish"
            variant="subtitle"
            style={tw`mt-1 text-center  font-inter-medium`}
          >
            Teach “Sit” Command
          </AppText>
        </View>

        {/* XP + Streak */}
        <View style={tw`flex-row gap-3`}>
          {/* XP */}
          <Card radius="lg" style={tw`flex-1 items-center p-3`}>
            <View style={tw`flex-row items-center gap-1`}>
              <SvgXml xml={thorPrimaryIcons} />

              <AppText
                tone="gray"
                variant="body"
                style={tw`mt-1 text-center font-inter-bold`}
              >
                XP
              </AppText>
            </View>

            <AppText
              tone="blackish"
              variant="body"
              style={tw`mt-1 text-center font-inter-semibold`}
            >
              +10
            </AppText>
          </Card>

          {/* Streak */}
          <Card radius="lg" style={tw`flex-1 items-center p-3`}>
            <View style={tw`flex-row items-center `}>
              <SvgXml xml={fire} />

              <AppText
                tone="gray"
                variant="body"
                style={tw`mt-1 text-center font-inter-bold`}
              >
                Streak
              </AppText>
            </View>

            <View style={tw`mt-1 flex-row items-baseline`}>
              <AppText
                tone="blackish"
                variant="body"
                style={tw`mt-1 text-center font-inter-semibold`}
              >
                5
              </AppText>

              <AppText
                tone="gray"
                variant="body"
                style={tw`mt-1 text-center font-inter-medium ml-1`}
              >
                days
              </AppText>
            </View>
          </Card>
        </View>

        {/* Level Card */}
        <Card radius="md" style={tw`flex-row items-center justify-between p-4`}>
          <View>
            <AppText tone="blackish" style={tw`text-lg font-bold leading-7`}>
              +10 XP
            </AppText>

            <View style={tw`mt-0.5 gap-1 flex-row items-center`}>
              <AppText
                tone="gray"
                variant="body"
                style={tw`text-center font-inter-semibold`}
              >
                Level 2
              </AppText>

              <AppText
                tone="gray"
                variant="body"
                style={tw`text-center font-inter-regular`}
              >
                Awesome effort!
              </AppText>
            </View>
          </View>

          <View
            style={tw`relative h-9 w-9 items-center justify-center rounded-full border border-[#BFDBFE] bg-[#DBEAFE]`}
          >
            <SvgXml xml={starBlue} />

            <View
              style={tw`absolute -bottom-1 -right-1 h-4 w-4 items-center justify-center rounded-full border border-white bg-[#FACC15]`}
            >
              <SvgXml xml={starYellow} />
            </View>
          </View>
        </Card>

        {/* Buttons */}
        <View style={tw`gap-3`}>
          <Button label="Practice Again" />
          <Button variant="ghost" label="Back to Lesson" />
        </View>
      </View>
    </Screen>
  )
}
