import { memo, useCallback } from "react"

import {
  ratingStar,
  rightArrow,
  shapingIcons,
  supperPet,
  thorPrimaryIcons,
} from "@/assets/icons/icons"
import { AppText } from "@/components/ui/app-text"
import { SectionHeader } from "@/components/ui/section-header"
import tw from "@/lib/tailwind"
import { Image } from "expo-image"
import { FlatList, Pressable, View } from "react-native"
import { SvgXml } from "react-native-svg"

type Store = {
  id: string
  name: string
  image: string
  rating: number
  deliveryTime: string
  deliveryFee: string
  badge?: string
  verified?: boolean
}

const POPULAR_STORES: Store[] = [
  {
    id: "superpet",
    name: "SuperPet",
    image: "https://images.unsplash.com/photo-1558788353-f76d92427f16",
    rating: 4.8,
    deliveryTime: "14 min",
    deliveryFee: "Free",
    badge: "Most Popular",
    verified: true,
  },
  {
    id: "pet-center",
    name: "Pet Center",
    image: "https://images.unsplash.com/photo-1558788353-f76d92427f16",
    rating: 4.6,
    deliveryTime: "22 min",
    deliveryFee: "Free",
  },
  {
    id: "vet-pharmacy",
    name: "Vet Pharmacy",
    image: "https://images.unsplash.com/photo-1558788353-f76d92427f16",
    rating: 4.9,
    deliveryTime: "25 min",
    deliveryFee: "Free",
    badge: "Top Rated",
    verified: true,
  },
]

type StoreItemProps = {
  item: Store
  onPress: (store: Store) => void
}

const StoreItem = memo(({ item, onPress }: StoreItemProps) => {
  const handlePress = useCallback(() => {
    onPress(item)
  }, [item, onPress])

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        tw`flex-row items-center gap-3 rounded-[20px] border border-black/10 bg-white px-3.5 py-3`,
        pressed && tw`opacity-70`,
      ]}
    >
      {/* Store Image */}
      <View style={tw`overflow-hidden rounded-2xl bg-gray-100`}>
        <Image
          source={item.image}
          contentFit="cover"
          transition={200}
          style={tw`w-12 h-12`}
        />
      </View>

      {/* Store Details */}
      <View style={tw`flex-1 gap-1`}>
        <View style={tw`flex-row flex-wrap items-center gap-1.5`}>
          <AppText
            variant="body"
            tone="text"
            style={tw`font-inter-semibold`}
            numberOfLines={1}
          >
            {item.name}
          </AppText>

          {item.verified && <SvgXml xml={supperPet} />}

          {item.badge && (
            <View style={tw`rounded-full bg-teal-600/10 px-2 py-1`}>
              <AppText
                variant="caption"
                tone="primary"
                style={tw`font-inter-bold`}
              >
                {item.badge}
              </AppText>
            </View>
          )}
        </View>

        {/* Store Meta */}
        <View style={tw`flex-row flex-wrap items-center gap-x-3 gap-y-1`}>
          {/* Rating */}
          <View style={tw`flex-row items-center gap-1`}>
            <SvgXml xml={ratingStar} />

            <AppText
              variant="caption"
              tone="text"
              style={tw`font-inter-semibold`}
            >
              {item.rating}
            </AppText>
          </View>

          {/* Delivery Time */}
          <View style={tw`flex-row items-center gap-1`}>
            <SvgXml xml={thorPrimaryIcons} />

            <AppText
              variant="caption"
              tone="grayish"
              style={tw`font-inter-regular`}
            >
              {item.deliveryTime}
            </AppText>
          </View>

          {/* Delivery Fee */}
          <View style={tw`flex-row items-center gap-1`}>
            <SvgXml xml={shapingIcons} />
            <AppText
              variant="caption"
              tone="success"
              style={tw`font-inter-medium`}
            >
              {item.deliveryFee}
            </AppText>
          </View>
        </View>
      </View>

      {/* Arrow */}
      <SvgXml xml={rightArrow} />
    </Pressable>
  )
})

StoreItem.displayName = "StoreItem"

type PopularStoreSectionProps = {
  stores?: Store[]
  onPressStore?: (store: Store) => void
  onPressViewAll?: () => void
}

export default function PopularStoreSection({
  stores = POPULAR_STORES,
  onPressStore,
  onPressViewAll,
}: PopularStoreSectionProps) {
  const handlePressStore = useCallback(
    (store: Store) => {
      onPressStore?.(store)
    },
    [onPressStore]
  )

  const renderItem = useCallback(
    ({ item }: { item: Store }) => (
      <StoreItem item={item} onPress={handlePressStore} />
    ),
    [handlePressStore]
  )

  const keyExtractor = useCallback((item: Store) => item.id, [])

  return (
    <View style={tw`gap-3 pb-6`}>
      {/* Header */}
      <SectionHeader title="Popular Store" action="View All" />

      {/* Stores */}
      <FlatList
        data={stores}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`gap-3`}
        initialNumToRender={3}
        maxToRenderPerBatch={3}
        windowSize={5}
        removeClippedSubviews={false}
      />
    </View>
  )
}
