import { memo } from "react"
import { Image, View } from "react-native"
import { FlashList } from "@shopify/flash-list"
import { AppText } from "@/components/ui/app-text"
import tw from "@/lib/tailwind"

type PostItem = {
  id: string
  image: string
  height: number
  caption?: string
  likes?: number
}

const POSTS_DATA: PostItem[] = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1",
    height: 260,
    caption: "Running at the beach 🌊",
    likes: 48,
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e",
    height: 170,
    caption: "Playtime with friend 🐕",
    likes: 35,
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8",
    height: 180,
    caption: "Golden hour pose 🌸",
    likes: 62,
  },
  {
    id: "4",
    image: "https://images.unsplash.com/photo-1517849845537-4d257902454a",
    height: 280,
    caption: "Best buddies nap 😴",
    likes: 89,
  },
  {
    id: "5",
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d",
    height: 220,
    caption: "Agility champion 🏆",
    likes: 54,
  },
  {
    id: "6",
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb",
    height: 200,
    caption: "Park day happiness ☀️",
    likes: 41,
  },
]

export const PostsTab = memo(() => {
  return (
    <View style={tw`pt-2`}>
      <FlashList
        data={POSTS_DATA}
        numColumns={2}
        masonry
        scrollEnabled={false}
        renderItem={({ item }: { item: PostItem }) => (
          <View style={tw`p-1.5`}>
            <View
              style={tw`overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100`}
            >
              <Image
                source={{ uri: item.image }}
                style={{ width: "100%", height: item.height, borderRadius: 16 }}
                resizeMode="cover"
              />
              {item.caption && (
                <View style={tw`p-2 flex-row items-center justify-between`}>
                  <AppText
                    variant="caption"
                    tone="blackish"
                    numberOfLines={1}
                    style={tw`font-inter-medium text-xs flex-1`}
                  >
                    {item.caption}
                  </AppText>
                  <AppText
                    variant="caption"
                    tone="grayish"
                    style={tw`font-inter-regular text-[11px] ml-1`}
                  >
                    ❤️ {item.likes}
                  </AppText>
                </View>
              )}
            </View>
          </View>
        )}
      />
    </View>
  )
})

PostsTab.displayName = "PostsTab"
