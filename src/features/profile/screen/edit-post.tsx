import { Host } from "@expo/ui"
import { Switch } from "@expo/ui/jetpack-compose"
import { router } from "expo-router"
import { useState } from "react"
import { Image, Pressable, TextInput, View } from "react-native"
import { SvgXml } from "react-native-svg"

import { deleteIcons, rightArrow } from "@/assets/icons/icons"
import { AppText } from "@/components/ui/app-text"
import TopBackButton from "@/components/ui/app-top-bar"
import { Button } from "@/components/ui/button"
import { Screen } from "@/components/ui/screen"
import tw from "@/lib/tailwind"

const MAX_CAPTION_LENGTH = 500

export default function EditPostScreen() {
  const [caption, setCaption] = useState(
    "Beautiful day for a walk in the park! 🐶💚"
  )

  const [location, setLocation] = useState("Lima Dog Park")
  const [visibility, setVisibility] = useState("Public")

  const [hideLikeCount, setHideLikeCount] = useState(true)
  const [hideShareCount, setHideShareCount] = useState(true)
  const [commentingEnabled, setCommentingEnabled] = useState(false)

  const handleDeleteImage = () => {
    console.log("Delete image")
  }

  const handleLocationPress = () => {
    setLocation("Lima Dog Park")
  }

  const handleVisibilityPress = () => {
    setVisibility(visibility === "Public" ? "Followers" : "Public")
  }

  const handleSave = () => {
    console.log("Saved post changes")
    router.back()
  }

  return (
    <Screen>
      {/* Header */}
      <TopBackButton title="Edit Post" />

      <View style={tw`gap-4 pt-2`}>
        {/* Caption Card */}
        <View
          style={tw`flex-row gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm`}
        >
          {/* Image */}
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1500534623283-312aade485b7",
            }}
            style={tw`w-20 h-20 rounded-xl border border-gray-100`}
          />

          {/* Caption Input */}
          <View style={tw`flex-1 gap-1`}>
            <AppText
              variant="caption"
              tone="blackish"
              style={tw`font-inter-bold`}
            >
              Edit Caption
            </AppText>

            <TextInput
              value={caption}
              onChangeText={(text) =>
                setCaption(text.slice(0, MAX_CAPTION_LENGTH))
              }
              placeholder="Write a caption..."
              placeholderTextColor="#9CA3AF"
              multiline
              textAlignVertical="top"
              style={tw`min-h-[80px] font-inter-regular text-sm leading-5 text-gray-800`}
            />

            <AppText
              variant="caption"
              tone="grayish"
              style={tw`self-end font-inter-regular`}
            >
              {caption.length}/{MAX_CAPTION_LENGTH}
            </AppText>
          </View>

          {/* Delete Image Button */}
          <Pressable onPress={() => router.push("/post-delete-modal")}>
            <SvgXml xml={deleteIcons} />
          </Pressable>
        </View>

        {/* Location Row */}
        <Pressable
          onPress={handleLocationPress}
          style={({ pressed }) => [
            tw`flex-row items-center justify-between rounded-2xl border border-gray-100 bg-white px-4 py-4 shadow-sm`,
            pressed && tw`opacity-70`,
          ]}
        >
          <AppText variant="body" tone="blackish" style={tw`font-inter-bold`}>
            Edit Location
          </AppText>

          <View style={tw`flex-row items-center gap-2`}>
            <AppText
              variant="caption"
              tone="primary"
              style={tw`font-inter-semibold`}
            >
              {location}
            </AppText>
            <SvgXml xml={rightArrow} />
          </View>
        </Pressable>

        {/* Visibility Row */}
        <Pressable
          onPress={handleVisibilityPress}
          style={({ pressed }) => [
            tw`flex-row items-center justify-between rounded-2xl border border-gray-100 bg-white px-4 py-4 shadow-sm`,
            pressed && tw`opacity-70`,
          ]}
        >
          <AppText variant="body" tone="blackish" style={tw`font-inter-bold`}>
            Edit Visibility
          </AppText>

          <View style={tw`flex-row items-center gap-2`}>
            <AppText
              variant="caption"
              tone="primary"
              style={tw`font-inter-semibold`}
            >
              {visibility}
            </AppText>
            <SvgXml xml={rightArrow} />
          </View>
        </Pressable>

        {/* Settings Toggles */}
        <View style={tw`gap-3`}>
          <EditToggle
            title="Hide Like count"
            value={hideLikeCount}
            onValueChange={setHideLikeCount}
          />

          <EditToggle
            title="Hide Share count"
            value={hideShareCount}
            onValueChange={setHideShareCount}
          />

          <EditToggle
            title="Turn off commenting"
            value={!commentingEnabled}
            onValueChange={(val) => setCommentingEnabled(!val)}
          />
        </View>

        {/* Save Changes Button */}
        <View style={tw`pt-4`}>
          <Button label="Save Changes" onPress={handleSave} />
        </View>
      </View>
    </Screen>
  )
}

type EditToggleProps = {
  title: string
  value: boolean
  onValueChange: (value: boolean) => void
}

function EditToggle({ title, value, onValueChange }: EditToggleProps) {
  return (
    <View
      style={tw`flex-row items-center justify-between rounded-2xl border border-gray-100 bg-white px-4 py-2 shadow-sm`}
    >
      <AppText variant="body" tone="blackish" style={tw`font-inter-bold`}>
        {title}
      </AppText>

      <Host matchContents>
        <Switch
          value={value}
          onCheckedChange={onValueChange}
          colors={{
            checkedTrackColor: "#0D9488",
            checkedThumbColor: "#FFFFFF",
            uncheckedTrackColor: "#E5E7EB",
            uncheckedThumbColor: "#FFFFFF",
          }}
        />
      </Host>
    </View>
  )
}
