import { AppText } from "@/components/ui/app-text"
import { SectionHeader } from "@/components/ui/section-header"
import tw from "@/lib/tailwind"
import { Image } from "expo-image"
import { router } from "expo-router"
import { memo, useCallback } from "react"
import { FlatList, Pressable, View } from "react-native"

type Category = {
  id: string
  name: string
  image: any
}

const CATEGORIES: Category[] = [
  {
    id: "food",
    name: "Food",
    image: require("@/assets/health-vault/food.png"),
  },
  {
    id: "treats",
    name: "Treats",
    image: require("@/assets/marketplace/treats.png"),
  },
  {
    id: "toys",
    name: "Toys",
    image: require("@/assets/marketplace/toys.png"),
  },
  {
    id: "beds",
    name: "Beds",
    image: require("@/assets/marketplace/beds.png"),
  },
]

type CategoryItemProps = {
  item: Category
  onPress: (category: Category) => void
}

const CategoryItem = memo(({ item, onPress }: CategoryItemProps) => {
  const handlePress = useCallback(() => {
    onPress(item)
  }, [item, onPress])

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        tw`w-[84px] items-center justify-center gap-2 rounded-2xl bg-white py-3 px-2 shadow-sm`,
        pressed && tw`opacity-70`,
      ]}
    >
      <Image source={item?.image} contentFit="contain" style={tw`w-10 h-10`} />

      <AppText
        variant="caption"
        tone="blackish"
        numberOfLines={1}
        style={tw`text-center font-inter-semibold`}
      >
        {item.name}
      </AppText>
    </Pressable>
  )
})

CategoryItem.displayName = "CategoryItem"

type CategoriesSectionProps = {
  categories?: Category[]
  onPressCategory?: (category: Category) => void
  onPressSeeAll?: () => void
}

export function CategoriesSection({
  categories = CATEGORIES,
  onPressCategory,
  onPressSeeAll,
}: CategoriesSectionProps) {
  const renderItem = useCallback(
    ({ item }: { item: Category }) => (
      <CategoryItem
        item={item}
        onPress={(category) => onPressCategory?.(category)}
      />
    ),
    [onPressCategory]
  )

  const keyExtractor = useCallback((item: Category) => item.id, [])

  return (
    <View style={tw`gap-3 my-2`}>
      {/* Header */}
      <SectionHeader
        title="Categories"
        action="See All"
        onActionPress={() => router.push("/categories")}
      />

      {/* Categories */}
      <FlatList
        horizontal
        data={categories}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={tw`gap-2.5 pb-1`}
        initialNumToRender={4}
        maxToRenderPerBatch={4}
        windowSize={5}
      />
    </View>
  )
}
