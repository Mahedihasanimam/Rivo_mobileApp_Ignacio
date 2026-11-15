import { memo } from "react"
import { Image, View } from "react-native"
import { FlashList } from "@shopify/flash-list"
import { AppText } from "@/components/ui/app-text"
import tw from "@/lib/tailwind"

type VideoItem = {
  id: string
  image: string
  height: number
  title: string
  duration: string
}

const VIDEOS_DATA: VideoItem[] = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d",
    height: 240,
    title: "Agility Obstacle Run 🏃‍♂️",
    duration: "1:20",
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1",
    height: 170,
    title: "Beach Swimming 🌊",
    duration: "2:45",
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb",
    height: 260,
    title: "Learning New Tricks 📹",
    duration: "0:55",
  },
  {
    id: "4",
    image: "https://images.unsplash.com/photo-1517849845537-4d257902454a",
    height: 190,
    title: "Park Sprint 🎾",
    duration: "1:05",
  },
]

export const VideosTab = memo(() => {
  return (
    <View style={tw`pt-2`}>
      <FlashList
        data={VIDEOS_DATA}
        numColumns={2}
        masonry
        scrollEnabled={false}
        renderItem={({ item }: { item: VideoItem }) => (
          <View style={tw`p-1.5`}>
            <View
              style={tw`overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100 relative`}
            >
              <Image
                source={{ uri: item.image }}
                style={{ width: "100%", height: item.height, borderRadius: 16 }}
                resizeMode="cover"
              />
              {/* Play Button Overlay */}
              <View
                style={tw`absolute inset-0 items-center justify-center bg-black/20 rounded-2xl`}
              >
                <View
                  style={tw`w-10 h-10 rounded-full bg-white/90 items-center justify-center shadow-md`}
                >
                  <AppText
                    variant="body"
                    tone="primary"
                    style={tw`font-inter-bold text-base`}
                  >
                    ▶
                  </AppText>
                </View>
              </View>
              {/* Duration Badge */}
              <View
                style={tw`absolute top-3 right-3 bg-black/70 px-2 py-0.5 rounded-md`}
              >
                <AppText
                  variant="caption"
                  tone="textWhite"
                  style={tw`font-inter-medium text-[11px]`}
                >
                  {item.duration}
                </AppText>
              </View>
              <View style={tw`p-2 bg-white`}>
                <AppText
                  variant="caption"
                  tone="blackish"
                  numberOfLines={1}
                  style={tw`font-inter-semibold text-xs`}
                >
                  {item.title}
                </AppText>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  )
})

VideosTab.displayName = "VideosTab"
