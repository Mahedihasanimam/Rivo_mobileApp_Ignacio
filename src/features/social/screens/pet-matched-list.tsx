import TopBackButton from "@/components/ui/app-top-bar"
import { Screen } from "@/components/ui/screen"

import { Image, Pressable, View } from "react-native"
import { SvgXml } from "react-native-svg"

import { AppText } from "@/components/ui/app-text"
import tw from "@/lib/tailwind"

import {
  clockIcon,
  commentPrimary,
  locationIcon,
  topArrow,
} from "@/assets/icons/icons"

export default function PetMatchedList() {
  return (
    <Screen>
      <TopBackButton friend={true} title="Matched List" />
      <MatchCard
        name="Luna"
        age={3}
        breed="Golden Retriever"
        distance="2.3 km"
        image="https://images.unsplash.com/photo-1558788353-f76d92427f16"
        matchPercentage={95}
        isVerified
        isOnline
        onMessage={() => {
          console.log("Message Luna")
        }}
        onViewProfile={() => {
          console.log("View Luna Profile")
        }}
      />
      <MatchCard
        name="Luna"
        age={3}
        breed="Golden Retriever"
        distance="2.3 km"
        image="https://images.unsplash.com/photo-1558788353-f76d92427f16"
        matchPercentage={95}
        isVerified
        isOnline
        onMessage={() => {
          console.log("Message Luna")
        }}
        onViewProfile={() => {
          console.log("View Luna Profile")
        }}
      />
      <MatchCard
        name="Luna"
        age={3}
        breed="Golden Retriever"
        distance="2.3 km"
        image="https://images.unsplash.com/photo-1558788353-f76d92427f16"
        matchPercentage={95}
        isVerified
        isOnline
        onMessage={() => {
          console.log("Message Luna")
        }}
        onViewProfile={() => {
          console.log("View Luna Profile")
        }}
      />
    </Screen>
  )
}

type MatchCardProps = {
  name: string
  age: number
  breed: string
  distance: string
  image: string

  matchPercentage?: number
  isVerified?: boolean
  isOnline?: boolean

  onMessage?: () => void
  onViewProfile?: () => void
}

function MatchCard({
  name,
  age,
  breed,
  distance,
  image,

  matchPercentage = 95,
  isVerified = true,
  isOnline = true,

  onMessage,
  onViewProfile,
}: MatchCardProps) {
  return (
    <View style={tw`w-full`}>
      <View
        style={[tw`rounded-2xl border border-black/10 bg-white px-4 py-[15px]`]}
      >
        {/* ================= Main Content ================= */}
        <View style={tw`flex-row items-center gap-3`}>
          {/* Pet Image */}
          <View style={tw`relative h-14 w-14 overflow-hidden rounded-2xl`}>
            <Image
              source={{ uri: image }}
              style={tw`h-full w-full`}
              resizeMode="cover"
            />

            {/* Online Indicator */}
            {isOnline && (
              <View
                style={[
                  tw`absolute bottom-0.5 right-0.5 h-3 w-3 rounded-full border border-white bg-[#00C950]`,
                ]}
              />
            )}
          </View>

          {/* ================= Pet Info ================= */}
          <View style={tw`flex-1`}>
            {/* Name + Gender */}
            <View style={tw`flex-row items-center gap-2`}>
              <AppText
                variant="body"
                tone="blackish"
                style={tw`font-inter-bold `}
              >
                {name}
              </AppText>

              <AppText style={tw`font-inter-regular `}>♀</AppText>
            </View>

            {/* Breed */}
            <AppText
              variant="caption"
              tone="grayish"
              style={tw`mt-0.5 font-inter-regular `}
            >
              {breed} · {age} yrs
            </AppText>

            {/* Distance + Match Time */}
            <View style={tw`mt-1 flex-row items-center gap-3`}>
              <View style={tw`flex-row items-center gap-1`}>
                <SvgXml xml={locationIcon} width={11} height={11} />

                <AppText
                  variant="caption"
                  tone="grayish"
                  style={tw`font-inter-regular`}
                >
                  {distance}
                </AppText>
              </View>

              <View style={tw`flex-row items-center gap-1`}>
                <SvgXml xml={clockIcon} width={11} height={11} />

                <AppText
                  variant="caption"
                  tone="grayish"
                  style={tw`font-inter-regular`}
                >
                  Just matched
                </AppText>
              </View>
            </View>
          </View>

          {/* ================= Actions ================= */}
          <View style={tw`gap-1.5`}>
            {/* Message */}
            <Pressable
              onPress={onMessage}
              style={({ pressed }) => [
                tw`h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-[#F7FAF9]`,
                pressed && tw`opacity-70`,
              ]}
            >
              <SvgXml xml={topArrow} width={14} height={14} />
            </Pressable>

            <Pressable
              onPress={onViewProfile}
              style={({ pressed }) => [
                tw`h-9 w-9 items-center justify-center rounded-full bg-[#2F9C8F1F]`,
                pressed && tw`opacity-70`,
              ]}
            >
              <SvgXml xml={commentPrimary} width={16} height={16} />
            </Pressable>
          </View>
        </View>

        {/* ================= Bottom Divider ================= */}
        <View style={tw`mt-3 border-t border-black/10 pt-3`}>
          <View style={tw`flex-row items-center gap-2`}>
            {/* Match */}
            <View style={tw`rounded-full bg-[#2F9C8F1F] px-2.5 py-1`}>
              <AppText
                variant="caption"
                tone="primary"
                style={tw`font-inter-bold`}
              >
                {matchPercentage}% Match
              </AppText>
            </View>

            {/* Verified */}
            {isVerified && (
              <View style={tw`rounded-full bg-[#22C55E1F] px-2.5 py-1`}>
                <AppText
                  variant="caption"
                  //   tone="primary"
                  style={tw`font-inter-semibold text-[#22C55E]`}
                >
                  ✓ Verified
                </AppText>
              </View>
            )}

            {/* Online */}
            {isOnline && (
              <View style={tw`ml-auto`}>
                <AppText
                  variant="caption"
                  tone="grayish"
                  style={tw`font-inter-regular`}
                >
                  ● Online
                </AppText>
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  )
}
