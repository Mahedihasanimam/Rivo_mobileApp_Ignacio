import { Screen } from "@/components/ui/screen"
// import {  } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Image, Pressable, View } from "react-native"
import { SvgXml } from "react-native-svg"

import { AppText } from "@/components/ui/app-text"
import tw from "@/lib/tailwind"

// আপনার নিজের SVG icons এখানে import করবেন
import { aiGolden, helloSay, redHeard, userIcons } from "@/assets/icons/icons"
import TopBackButton from "@/components/ui/app-top-bar"
import { Button } from "@/components/ui/button"
import MaskedView from "@react-native-masked-view/masked-view"

export default function PetMatchScreen() {
  return (
    <Screen>
      <TopBackButton title="Pet Match" />

      <MatchModal
        currentPetImage="https://images.unsplash.com/photo-1558788353-f76d92427f16"
        matchedPetImage="https://images.unsplash.com/photo-1500534623283-312aade485b7"
        matchName="Luna"
        compatibility={95}
        onSayHello={() => {
          console.log("Say Hello")
        }}
        onViewProfile={() => {
          console.log("View Luna Profile")
        }}
        onKeepBrowsing={() => {
          console.log("Keep Browsing")
        }}
      />
    </Screen>
  )
}

type MatchModalProps = {
  currentPetImage: string
  matchedPetImage: string
  matchName?: string
  compatibility?: number
  onSayHello?: () => void
  onViewProfile?: () => void
  onKeepBrowsing?: () => void
}

function MatchModal({
  currentPetImage,
  matchedPetImage,
  matchName = "Luna",
  compatibility = 95,
  onSayHello,
  onViewProfile,
  onKeepBrowsing,
}: MatchModalProps) {
  return (
    <View style={tw`w-full items-center `}>
      {/* Celebration Icon */}
      <View style={tw`h-12 w-9 items-start pb-4`}>
        <SvgXml xml={aiGolden} />
      </View>

      {/* Title */}
      {/* <View style={tw`items-center pb-2`}>
        <AppText
          style={[
            tw`text-center font-inter-black text-[48px] leading-[40px]`,
            { color: "#2F9C8F" },
          ]}
        >
          {"It's a Match!"}
        </AppText>
      </View> */}

      <MaskedView
        style={{
          height: 60,
          width: "100%",
        }}
        maskElement={
          <View style={tw`flex-1 items-center justify-center`}>
            <AppText
              style={tw`text-center font-inter-black text-[48px] leading-[56px] text-black`}
            >
              {" It's a Match!"}
            </AppText>
          </View>
        }
      >
        <LinearGradient
          colors={[
            "#2F9C8F", // 0%
            "#FF6B9D", // 50%
            "#FFD700", // 100%
          ]}
          locations={[0, 0.5, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={tw`flex-1`}
        />
      </MaskedView>

      {/* Subtitle */}
      <View style={tw`items-center pb-8`}>
        <AppText
          variant="body"
          tone="gray"
          style={tw`text-center font-inter-regular`}
        >
          You and Sarah M. both liked each other
        </AppText>
      </View>

      {/* Pet Images */}
      <View style={tw`h-40 w-80 pb-12`}>
        <View style={tw`relative h-36 w-full`}>
          {/* Left Pet */}
          <View
            style={[
              tw`absolute top-0 h-[136px] w-[136px] overflow-hidden rounded-full border-4 border-white`,
              {
                left: 27,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
                elevation: 4,
              },
            ]}
          >
            <Image
              source={{ uri: currentPetImage }}
              style={tw`h-full w-full`}
              resizeMode="cover"
            />
          </View>

          {/* Right Pet */}
          <View
            style={[
              tw`absolute top-0 h-[136px] w-[136px] overflow-hidden rounded-full border-4 border-white`,
              {
                right: 27,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
                elevation: 4,
              },
            ]}
          >
            <Image
              source={{ uri: matchedPetImage }}
              style={tw`h-full w-full`}
              resizeMode="cover"
            />
          </View>

          {/* Heart */}
          <View
            style={[
              tw`absolute left-1/2 top-12 z-10 h-12 w-12 -translate-x-6 items-center justify-center rounded-full bg-white`,
              {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.1,
                shadowRadius: 10,
                elevation: 8,
              },
            ]}
          >
            <SvgXml xml={redHeard} width={28} height={28} />
          </View>
        </View>
      </View>

      {/* Compatibility */}
      <View style={tw`w-full pb-6`}>
        <View
          style={tw`w-full flex-row items-center justify-between rounded-2xl border border-black/10 bg-black/5 p-4`}
        >
          <View style={tw`flex-1 pr-4`}>
            <AppText variant="body" tone="gray" style={tw` font-inter-regular`}>
              Compatibility
            </AppText>

            {/* Progress Bar */}
            <View
              style={tw`mt-2 h-1.5 w-full overflow-hidden rounded-full bg-black/10`}
            >
              <LinearGradient
                colors={["#2F9C8F", "#FB7185"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  width: `${compatibility}%`,
                  height: "100%",
                  borderRadius: 999,
                }}
              />
            </View>
          </View>

          <AppText variant="title" tone="blackish" style={tw` font-inter-bold`}>
            {compatibility}%
          </AppText>
        </View>
      </View>

      {/* Actions */}
      <View style={tw`w-full flex-col gap-3`}>
        {/* Say Hello */}
        <Button label="hello Say" leftIcon={helloSay} />
        <Button variant="ghost" label="View  Profile" leftIcon={userIcons} />
      </View>

      {/* Keep Browsing */}
      <Pressable
        onPress={onKeepBrowsing}
        style={({ pressed }) => [
          tw`mt-5 items-center justify-center`,
          pressed && tw`opacity-60`,
        ]}
      >
        <AppText variant="body" tone="gray" style={tw`font-inter-semibold `}>
          Keep Browsing →
        </AppText>
      </Pressable>
    </View>
  )
}
