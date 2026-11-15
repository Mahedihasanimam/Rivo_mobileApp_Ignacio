import { memo, useCallback } from "react"

import { AppText } from "@/components/ui/app-text"
import tw from "@/lib/tailwind"
import { Image } from "expo-image"
import { FlatList, Pressable, View } from "react-native"

export type PetCategory = {
  id: string
  name: string
  description: string
  image: string
}

const PET_CATEGORIES: PetCategory[] = [
  {
    id: "food",
    name: "Food",
    description: "For Every Pet",
    image: require("@/assets/health-vault/food.png"),
  },
  {
    id: "treats",
    name: "Treats",
    description: "Tasty and healthy",
    image: require("@/assets/marketplace/treats.png"),
  },
  {
    id: "toys",
    name: "Toys",
    description: "Fun & interactive",
    image: require("@/assets/marketplace/toys.png"),
  },
  {
    id: "beds",
    name: "Beds",
    description: "Comfort & sleep",
    image: require("@/assets/marketplace/beds.png"),
  },
  {
    id: "grooming",
    name: "Grooming",
    description: "Clean & Fresh",
    image: require("@/assets/health-vault/food.png"),
  },
  {
    id: "health",
    name: "Health",
    description: "Vitamins & Care",
    image: require("@/assets/marketplace/beds.png"),
  },
  {
    id: "accessories",
    name: "Accessories",
    description: "Collars & More",
    image: require("@/assets/health-vault/food.png"),
  },
]

type CategoryCardProps = {
  item: PetCategory
  onPress: (category: PetCategory) => void
}

const CategoryCard = memo(({ item, onPress }: CategoryCardProps) => {
  const handlePress = useCallback(() => {
    onPress(item)
  }, [item, onPress])

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        tw`flex-1 rounded-3xl bg-white p-3`,
        {
          shadowColor: "#2C78DC",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.08,
          shadowRadius: 12,
          elevation: 2,
        },
        pressed && tw`opacity-70`,
      ]}
    >
      <View style={tw`items-center gap-2`}>
        {/* Category Image */}
        <View style={tw`items-center justify-center`}>
          <Image
            source={item.image}
            contentFit="contain"
            transition={200}
            style={tw`w-12 h-10`}
          />
        </View>

        {/* Category Content */}
        <View style={tw`items-center gap-0.5`}>
          <AppText
            variant="body"
            tone="text"
            style={tw`font-inter-semibold text-center`}
            numberOfLines={1}
          >
            {item.name}
          </AppText>

          <AppText
            variant="caption"
            tone="grayish"
            style={tw`font-inter-regular text-center`}
            numberOfLines={1}
          >
            {item.description}
          </AppText>
        </View>
      </View>
    </Pressable>
  )
})

CategoryCard.displayName = "CategoryCard"

type PetCategoryGridProps = {
  categories?: PetCategory[]
  onPressCategory?: (category: PetCategory) => void
}

export default function PetCategoryGrid({
  categories = PET_CATEGORIES,
  onPressCategory,
}: PetCategoryGridProps) {
  const handlePressCategory = useCallback(
    (category: PetCategory) => {
      onPressCategory?.(category)
    },
    [onPressCategory]
  )

  const renderItem = useCallback(
    ({ item }: { item: PetCategory }) => (
      <CategoryCard item={item} onPress={handlePressCategory} />
    ),
    [handlePressCategory]
  )

  const keyExtractor = useCallback((item: PetCategory) => item.id, [])

  return (
    <FlatList
      data={categories}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      numColumns={2}
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
      columnWrapperStyle={tw`gap-2`}
      contentContainerStyle={tw`gap-2`}
      initialNumToRender={8}
      maxToRenderPerBatch={8}
      windowSize={5}
      removeClippedSubviews={false}
    />
  )
}
