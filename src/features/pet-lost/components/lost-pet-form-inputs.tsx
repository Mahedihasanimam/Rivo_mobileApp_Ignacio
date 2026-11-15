import { AppText } from "@/components/ui/app-text"
import tw from "@/lib/tailwind"
import React from "react"
import { TextInput, View } from "react-native"
import { SvgXml } from "react-native-svg"

const locationPinIcon = `
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6B7280" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
  <circle cx="12" cy="10" r="3"/>
</svg>
`

const dollarIcon = `
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6B7280" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <line x1="12" y1="1" x2="12" y2="23"/>
  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
</svg>
`

interface LostPetFormInputsProps {
  location: string
  onChangeLocation: (text: string) => void
  additionalInfo: string
  onChangeAdditionalInfo: (text: string) => void
  reward: string
  onChangeReward: (text: string) => void
}

export function LostPetFormInputs({
  location,
  onChangeLocation,
  additionalInfo,
  onChangeAdditionalInfo,
  reward,
  onChangeReward,
}: LostPetFormInputsProps) {
  return (
    <View style={tw`gap-5`}>
      {/* Last Seen Location Input */}
      <View style={tw`gap-1.5`}>
        <AppText
          variant="caption"
          tone="gray"
          style={tw`font-inter-medium text-sm`}
        >
          Last Seen Location
        </AppText>
        <View
          style={tw`bg-white rounded-xl border border-gray-300 px-4 py-3 flex-row items-center justify-between`}
        >
          <TextInput
            value={location}
            onChangeText={onChangeLocation}
            placeholder="e.g. Dhanmondi, Dhaka"
            placeholderTextColor="#9CA3AF"
            style={tw`flex-1 font-inter-regular text-base text-gray-900 p-0`}
          />
          <SvgXml xml={locationPinIcon} width={20} height={20} />
        </View>
      </View>

      {/* Additional Information Input */}
      <View style={tw`gap-1.5`}>
        <AppText
          variant="caption"
          tone="gray"
          style={tw`font-inter-medium text-sm`}
        >
          Additional Information
        </AppText>
        <View
          style={tw`bg-white rounded-xl border border-gray-300 px-4 py-3 h-24`}
        >
          <TextInput
            value={additionalInfo}
            onChangeText={onChangeAdditionalInfo}
            placeholder="Simba was last seen near Dhanmondi Lake. He walked away suddenly."
            placeholderTextColor="#9CA3AF"
            multiline
            textAlignVertical="top"
            style={tw`flex-1 font-inter-regular text-base text-gray-900 p-0`}
          />
        </View>
      </View>

      {/* Reward Input */}
      <View style={tw`gap-1.5`}>
        <AppText
          variant="caption"
          tone="gray"
          style={tw`font-inter-medium text-sm`}
        >
          Reward (if applicable)
        </AppText>
        <View
          style={tw`bg-white rounded-xl border border-gray-300 px-4 py-3 flex-row items-center justify-between`}
        >
          <TextInput
            value={reward}
            onChangeText={onChangeReward}
            placeholder="$500"
            placeholderTextColor="#9CA3AF"
            keyboardType="default"
            style={tw`flex-1 font-inter-regular text-base text-gray-900 p-0`}
          />
          <SvgXml xml={dollarIcon} width={20} height={20} />
        </View>
      </View>
    </View>
  )
}
