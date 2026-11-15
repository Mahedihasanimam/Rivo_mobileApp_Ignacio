import { AppText } from "@/components/ui/app-text"
import tw from "@/lib/tailwind"
import { appToast } from "@/lib/toast/app-toast"
import { Image } from "expo-image"
import * as ImagePicker from "expo-image-picker"
import React from "react"
import { Pressable, ScrollView, View } from "react-native"
import { SvgXml } from "react-native-svg"

const plusIcon = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6B7280" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <line x1="12" y1="5" x2="12" y2="19"/>
  <line x1="5" y1="12" x2="19" y2="12"/>
</svg>
`

const closeIcon = `
<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
  <line x1="18" y1="6" x2="6" y2="18"/>
  <line x1="6" y1="6" x2="18" y2="18"/>
</svg>
`

interface PhotoPickerSectionProps {
  photos: string[]
  onAddPhoto: (uri: string) => void
  onRemovePhoto: (index: number) => void
}

export function PhotoPickerSection({
  photos,
  onAddPhoto,
  onRemovePhoto,
}: PhotoPickerSectionProps) {
  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (!permissionResult.granted) {
      appToast.warning("Permission Required", {
        description: "Please allow access to your photos gallery.",
      })
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 0.8,
    })

    if (!result.canceled && result.assets?.[0]?.uri) {
      onAddPhoto(result.assets[0].uri)
    }
  }

  return (
    <View style={tw`gap-2 pt-1`}>
      <View style={tw`flex-row items-center`}>
        <AppText
          variant="caption"
          tone="gray"
          style={tw`font-inter-medium text-sm`}
        >
          Last Seen Photo{" "}
        </AppText>
        <AppText
          variant="caption"
          tone="grayish"
          style={tw`font-inter-medium text-sm`}
        >
          (Optional)
        </AppText>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={tw`flex-row items-center gap-3 py-1`}
      >
        {/* Render Selected Photos */}
        {photos.map((uri, idx) => (
          <View
            key={idx}
            style={tw`relative w-20 h-20 rounded-xl overflow-hidden border border-gray-200`}
          >
            <Image
              source={{ uri }}
              style={tw`w-full h-full`}
              contentFit="cover"
            />
            <Pressable
              onPress={() => onRemovePhoto(idx)}
              style={({ pressed }) => [
                tw`absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-black/60 items-center justify-center`,
                pressed && tw`opacity-70`,
              ]}
            >
              <SvgXml xml={closeIcon} width={10} height={10} />
            </Pressable>
          </View>
        ))}

        {/* Add Photo Button */}
        <Pressable
          onPress={pickImage}
          style={({ pressed }) => [
            tw`w-20 h-20 rounded-xl border border-dashed border-gray-300 bg-white items-center justify-center`,
            pressed && tw`opacity-70 bg-gray-50`,
          ]}
        >
          <SvgXml xml={plusIcon} width={24} height={24} />
        </Pressable>
      </ScrollView>
    </View>
  )
}
