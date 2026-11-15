import tw from "@/lib/tailwind"
import { FlashList } from "@shopify/flash-list"
import { router } from "expo-router"
import { memo } from "react"
import { Image, Pressable, View } from "react-native"

type AllFeedItem = {
  id: string
  image: string
  height: number
  title: string
  type: string
}

const ALL_DATA: AllFeedItem[] = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1500534623283-312aade485b7",
    height: 250,
    title: "Ocean splash 🌊",
    type: "Photo",
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1",
    height: 160,
    title: "Sprint training 🏃‍♂️",
    type: "Training",
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb",
    height: 270,
    title: "Cuddles & naps 💤",
    type: "Story",
  },
  {
    id: "4",
    image: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8",
    height: 190,
    title: "Sunny park 🌻",
    type: "Post",
  },
  {
    id: "5",
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d",
    height: 230,
    title: "Agility run 🏆",
    type: "Video",
  },
  {
    id: "6",
    image: "https://images.unsplash.com/photo-1517849845537-4d257902454a",
    height: 180,
    title: "Puppy eyes 🐶",
    type: "Photo",
  },
]

export const AllTab = memo(() => {
  return (
    <View style={tw`pt-2`}>
      <FlashList
        data={ALL_DATA}
        numColumns={2}
        masonry
        scrollEnabled={false}
        renderItem={({ item }: { item: AllFeedItem }) => (
          <Pressable onPress={() => router.push("/post-view")} style={tw`p-1`}>
            <View
              style={tw`overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100`}
            >
              <Image
                source={{ uri: item.image }}
                style={{ width: "100%", height: item.height, borderRadius: 16 }}
                resizeMode="cover"
              />
              {/* <View style={tw`p-2 flex-row items-center justify-between`}>
                <AppText variant="caption" tone="blackish" numberOfLines={1} style={tw`font-inter-medium text-xs flex-1`}>
                  {item.title}
                </AppText>
                <View style={tw`bg-[#0F9C8F]/10 px-2 py-0.5 rounded-full ml-1`}>
                  <AppText variant="caption" tone="primary" style={tw`font-inter-semibold text-[10px]`}>
                    {item.type}
                  </AppText>
                </View>
              </View> */}
            </View>
          </Pressable>
        )}
      />
    </View>
  )
})

AllTab.displayName = "AllTab"
