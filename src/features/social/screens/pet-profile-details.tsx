import React from "react"
import { Image, Pressable, TouchableOpacity, View } from "react-native"
import { SvgXml } from "react-native-svg"

import { AppText } from "@/components/ui/app-text"
import tw from "@/lib/tailwind"

import {
  advanced,
  locationPrimary,
  matchIcon,
  matchLuna,
  messageIcon,
  redHeard,
  userIcons,
  verifiedIcon,
} from "@/assets/icons/icons"
import TopBackButton from "@/components/ui/app-top-bar"
import { Card } from "@/components/ui/card"
import { Screen } from "@/components/ui/screen"
import { router } from "expo-router"

type PetProfileModalProps = {
  image: string
}

const Tag = ({
  label,
  style,
  textStyle,
  icon,
}: {
  label: string
  style?: any
  textStyle?: any
  icon?: string | undefined
}) => {
  return (
    <View style={[tw`rounded-full flex-row gap-2 border px-3 py-1.5`, style]}>
      {/* @ts-ignore */}
      {icon && <SvgXml xml={icon} width={16} height={16} />}
      <AppText variant="caption" style={[tw`font-inter-semibold`, textStyle]}>
        {label}
      </AppText>
    </View>
  )
}

const StatCard = ({
  icon,
  value,
  label,
  iconStyle,
}: {
  icon?: string
  value: string
  label: string
  iconStyle?: any
}) => {
  return (
    <Card radius="md" style={tw`flex-1 min-w-0 items-center p-3`}>
      <View style={[tw`mb-1 h-4 w-4 items-center justify-center`, iconStyle]}>
        {icon && <SvgXml xml={icon} width={16} height={16} />}
      </View>
      <AppText variant="caption" tone="blackish" style={tw`font-inter-bold`}>
        {value}
      </AppText>
      <AppText variant="caption" tone="subTitle" style={tw`font-inter-regular`}>
        {label}
      </AppText>
    </Card>
  )
}

const Section = ({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) => {
  return (
    <View style={tw`mt-5`}>
      <AppText
        variant="caption"
        tone="subTitle"
        style={tw`font-inter-bold uppercase tracking-wider`}
      >
        {title}
      </AppText>

      <View style={tw`mt-2.5`}>{children}</View>
    </View>
  )
}

export default function PetProfileModal({ image }: PetProfileModalProps) {
  return (
    <Screen>
      <TopBackButton title="Profile detail" friend={true} />
      {/* ================= HEADER IMAGE ================= */}

      <View style={tw`h-80 relative overflow-hidden rounded-t-[32px]`}>
        {/* Image indicator */}
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1558788353-f76d92427f16",
          }}
          resizeMode="cover"
          style={tw`absolute inset-0 h-full w-full`}
        />

        {/* Bottom Gradient */}
        <View
          style={[
            tw`absolute bottom-0 left-0 h-[50%] w-full`,
            {
              experimental_backgroundImage:
                "linear-gradient(0deg, rgba(0, 0, 0, 0.8), transparent)",
            },
          ]}
        />

        {/* Bottom Content */}
        <View
          style={tw`absolute bottom-5 left-5 right-5 flex-row items-end justify-between`}
        >
          <View>
            <View style={tw`flex-row items-center gap-2`}>
              <AppText
                variant="title"
                tone="textWhite"
                style={tw`font-inter-bold `}
              >
                Luna
              </AppText>

              <AppText
                variant="title"
                tone="textMute"
                style={tw`font-inter-semibold `}
              >
                3
              </AppText>

              <AppText
                variant="subtitle"
                tone="textWhite"
                style={tw`font-inter-medium opacity-50`}
              >
                ♀
              </AppText>
            </View>

            <AppText
              variant="body"
              tone="textWhite"
              style={tw`font-inter-medium opacity-50`}
            >
              Golden Retriever
            </AppText>
          </View>

          {/* Match */}
          <View
            style={tw`flex-row items-center gap-1 px-2 py-1 rounded-full bg-primary `}
          >
            <SvgXml xml={matchLuna} />

            <AppText style={tw`font-inter-bold text-[13px] text-white`}>
              95%
            </AppText>
          </View>
        </View>
      </View>

      {/* ================= CONTENT ================= */}

      <View style={tw`py-5`}>
        {/* Stats */}

        <View style={tw`flex-row gap-2`}>
          <StatCard icon={locationPrimary} value="2.3 km" label="Distance" />

          <StatCard
            value="High"
            label="Energy"
            iconStyle={tw`rounded-full bg-red-500`}
          />

          <StatCard icon={advanced} value="Advanced" label="Training" />
        </View>

        {/* ================= HEALTH ================= */}

        <Section title="Health & Verification">
          <View style={tw`flex-row flex-wrap gap-2`}>
            <Tag
              icon={verifiedIcon}
              label="Vaccinated"
              style={tw`border-[#22C55E1F] bg-[#22C55E1F]`}
              textStyle={tw`text-[#22C55E]`}
            />

            <Tag
              icon={matchIcon}
              label="Health Checked"
              style={tw`border-cyan-500/30 bg-cyan-500/10`}
              textStyle={tw`text-cyan-500`}
            />

            <Tag
              icon={messageIcon}

              label="Verified Owner"
              style={tw`border-primary/30 bg-primary/10`}
              textStyle={tw`text-primary`}
            />
          </View>
        </Section>

        {/* ================= TRAITS ================= */}

        <Section title="Traits & Tags">
          <View style={tw`flex-row flex-wrap gap-2`}>
            <Tag
              label="Vaccinated"
              style={tw`border-[#22C55E1F] bg-[#22C55E1F]`}
              textStyle={tw`text-[#22C55E]`}
            />

            <Tag
              label="Friendly"
              style={tw`border-pink-500/20 bg-pink-500/10`}
              textStyle={tw`text-pink-500`}
            />

            <Tag
              label="High Energy"
              style={tw`border-[#F9731615] bg-[#F9731615]`}
              textStyle={tw`text-[#F97316]`}
            />

            <Tag
              label="Verified"
              style={tw`border-primary/20 bg-primary/10`}
              textStyle={tw`text-primary`}
            />
          </View>
        </Section>

        {/* ================= PERSONALITY ================= */}

        <Section title="Personality">
          <View style={tw`flex-row flex-wrap gap-2`}>
            <Tag
              label="Playful"
              style={tw`bg-primary/10 border-[#2F9C8F1F]`}
              textStyle={tw`text-primary`}
            />

            <Tag
              label="Loyal"
              style={tw`bg-pink-500/10 border-[#EC489930]`}
              textStyle={tw`text-pink-500`}
            />

            <Tag
              label="Gentle"
              style={tw`bg-purple-500/10 border-[#A855F71F]`}
              textStyle={tw`text-purple-500`}
            />
          </View>
        </Section>

        {/* ================= ABOUT ================= */}

        <Section title="About Luna">
          <AppText
            variant="body"
            tone="blackish"
            style={tw`font-inter-regular`}
          >
            Friendly and energetic - loves playing fetch, swimming, and long
            walks in the park. Luna is raised in a loving home with a champion
            bloodline.
          </AppText>
        </Section>

        {/* ================= OWNER ================= */}

        <Card radius="md" style={tw`mt-5 flex-row items-center px-4 py-4`}>
          {/* Avatar */}

          <View
            style={tw`h-11 w-11 items-center justify-center rounded-full bg-primary`}
          >
            <AppText style={tw`font-inter-bold text-base text-white`}>
              SM
            </AppText>
          </View>

          {/* Owner Info */}

          <View style={tw`ml-3 flex-1`}>
            <AppText tone="blackish" style={tw`font-inter-bold text-[15px]`}>
              Sarah M.
            </AppText>

            <AppText tone="subTitle" style={tw`font-inter-regular text-xs`}>
              ✓ Verified Owner
            </AppText>
          </View>

          {/* Message */}

          <Pressable
            style={({ pressed }) => [
              tw`h-10 w-10 items-center justify-center`,
              pressed && tw`opacity-70`,
            ]}
          >
            <SvgXml xml={userIcons} width={18} height={18} />
          </Pressable>
        </Card>
        <View style={tw`  py-7 flex-row items-center justify-center gap-6`}>
          <TouchableOpacity
            style={tw`h-14 w-14 items-center justify-center rounded-full border border-black/10 bg-white shadow-md`}
          >
            <AppText style={tw`text-xl text-slate-400`}>✕</AppText>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/pet-match")}
            style={tw`h-14 w-14 items-center justify-center rounded-full border border-black/10 bg-white shadow-md`}
          >
            <SvgXml xml={redHeard} height={30} width={30} />
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  )
}
