import { useCallback, useState } from "react"

import { Image, Pressable, ScrollView, TextInput, View } from "react-native"

import { downArrow } from "@/assets/icons/icons"
import { AppText } from "@/components/ui/app-text"
import { Card } from "@/components/ui/card"
import TopHandler from "@/components/ui/top-handler"
import tw from "@/lib/tailwind"
import { useAppTheme } from "@/theme/theme-provider"
import * as ImagePicker from "expo-image-picker"
import { router } from "expo-router"
import { SvgXml } from "react-native-svg"

type PrivacyType = "public" | "private"

export default function CreatePost() {
  const [content, setContent] = useState("")
  const [privacy, setPrivacy] = useState<PrivacyType>("public")

  const { colors } = useAppTheme()

  const [image, setImage] = useState<string | null>(null)

  const [isSubmitting, setIsSubmitting] = useState(false)

  const pickImage = useCallback(async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (!permission.granted) {
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 0.8,
    })

    if (result.canceled) return

    const selectedImage = result.assets[0]

    setImage(selectedImage.uri)
  }, [])

  const handlePost = useCallback(async () => {
    if (!content.trim()) return

    setIsSubmitting(true)

    try {
      setContent("")
      setImage(null)
      setPrivacy("public")

      if (router.canGoBack()) {
        router.back()
      }
    } finally {
      setIsSubmitting(false)
    }
  }, [content])

  const isPostDisabled = !content.trim() || isSubmitting

  return (
    <View style={tw`flex-1`}>
      <TopHandler />
      {/* Header */}
      <View style={tw`flex-row items-center justify-between pb-4`}>
        {/* Back */}
        <Pressable
          // onPress={handleBack}
          style={({ pressed }) => [
            tw`items-center justify-center rounded-full p-2`,
            pressed && tw`opacity-60`,
          ]}
        >
          {/* <Ionicons
            name="close"
            size={24}
            color="#1F2937"
          /> */}
        </Pressable>

        {/* Title */}
        <View style={tw`flex-1 items-center`}>
          <AppText
            variant="subtitle"
            tone="text"
            style={tw`font-inter-semibold`}
          >
            Create Post
          </AppText>
        </View>

        {/* Post Button */}
        <Pressable
          onPress={handlePost}
          disabled={isPostDisabled}
          style={({ pressed }) => [
            tw`rounded-full bg-neutral-800 px-5 py-2`,
            isPostDisabled && tw`opacity-40`,
            pressed && !isPostDisabled && tw`opacity-80`,
          ]}
        >
          <AppText
            variant="caption"
            tone="textWhite"
            style={tw`font-inter-bold`}
          >
            {isSubmitting ? "Posting..." : "Post"}
          </AppText>
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`pb-6`}
      >
        {/* Post Composer Card */}
        <Card radius="md" style={tw`p-4 gap-4`}>
          {/* User + Privacy */}
          <View style={tw`flex-row items-center justify-between`}>
            <View style={tw`flex-row items-center gap-3`}>
              {/* Avatar */}
              <View
                style={tw`overflow-hidden rounded-full border-2 border-teal-600`}
              >
                <Image
                  source={{
                    uri: "https://i.pravatar.cc/200",
                  }}
                  style={tw`w-12 h-12`}
                />
              </View>

              {/* Name */}
              <AppText
                variant="subtitle"
                tone="text"
                style={tw`font-inter-bold`}
              >
                Buddy
              </AppText>
            </View>

            {/* Privacy Dropdown */}
            <Pressable
              style={({ pressed }) => [
                tw`flex-row items-center gap-2 rounded-full border border-gray-200 px-3 py-2`,
                pressed && tw`opacity-70`,
              ]}
            >
              <AppText
                variant="caption"
                tone="gray"
                style={tw`font-inter-regular capitalize`}
              >
                {privacy}
              </AppText>
              <SvgXml xml={downArrow} />
            </Pressable>
          </View>

          {/* Text Input */}
          <TextInput
            value={content}
            onChangeText={setContent}
            placeholder="What's on your mind?"
            placeholderTextColor="#9CA3AF"
            multiline
            textAlignVertical="top"
            style={tw`min-h-24 text-base border border-[${colors.border}] rounded-lg py-2 px-4 leading-6 text-gray-800 font-inter-regular`}
          />

          {/* Image Preview / Picker */}
          {image ? (
            <View style={tw`overflow-hidden rounded-2xl bg-gray`}>
              <Image
                source={{ uri: image }}
                resizeMode="cover"
                style={tw`w-full aspect-square`}
              />

              <View style={tw`flex-row justify-between px-3 py-3`}>
                <Pressable
                  onPress={pickImage}
                  style={tw`flex-row items-center gap-2 rounded-full bg-white px-4 py-2`}
                >
                  {/* <Ionicons
                    name="images-outline"
                    size={18}
                    color="#1F2937"
                  /> */}

                  <AppText
                    variant="caption"
                    tone="text"
                    style={tw`font-inter-medium`}
                  >
                    Change Image
                  </AppText>
                </Pressable>

                <Pressable
                  onPress={() => setImage(null)}
                  style={tw`items-center justify-center rounded-full bg-white p-2`}
                >
                  {/* <Ionicons
                    name="trash-outline"
                    size={18}
                    color="#EF4444"
                  /> */}
                </Pressable>
              </View>
            </View>
          ) : (
            <Pressable
              onPress={pickImage}
              style={({ pressed }) => [
                tw`items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-5 py-3`,
                pressed && tw`opacity-70`,
              ]}
            >
              {/* <Ionicons
                name="image-outline"
                size={34}
                color="#6B7280"
              /> */}

              <View style={tw`h-3`} />

              <AppText
                variant="body"
                tone="gray"
                style={tw`font-inter-semibold`}
              >
                Add Photo
              </AppText>

              <AppText
                variant="caption"
                tone="grayish"
                style={tw`font-inter-regular`}
              >
                Choose an image from your gallery
              </AppText>
            </Pressable>
          )}
        </Card>
      </ScrollView>
    </View>
  )
}
