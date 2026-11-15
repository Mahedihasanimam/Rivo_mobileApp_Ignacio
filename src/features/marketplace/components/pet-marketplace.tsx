import { AppText } from "@/components/ui/app-text"
import tw from "@/lib/tailwind"
import { memo, useCallback } from "react"

import { FlatList, Image, Pressable, View } from "react-native"

type Product = {
  id: string
  category: string
  name: string
  price: string
  rating: number
  image: string
}

type Category = {
  id: string
  name: string
  image: string
}

const PRODUCTS: Product[] = [
  {
    id: "1",
    category: "Food",
    name: "Royal Canin Medium Adult Dry Dog Food",
    price: "$29.99",
    rating: 4.8,
    image: "https://placehold.co/200x240",
  },
  {
    id: "2",
    category: "Food",
    name: "Premium Healthy Dog Food",
    price: "$34.99",
    rating: 4.9,
    image: "https://placehold.co/200x240",
  },
]

const CATEGORIES: Category[] = [
  {
    id: "1",
    name: "Food",
    image: "https://placehold.co/100x100",
  },
  {
    id: "2",
    name: "Treats",
    image: "https://placehold.co/100x100",
  },
  {
    id: "3",
    name: "Toys",
    image: "https://placehold.co/100x100",
  },
  {
    id: "4",
    name: "Beds",
    image: "https://placehold.co/100x100",
  },
  {
    id: "5",
    name: "Health",
    image: "https://placehold.co/100x100",
  },
  {
    id: "6",
    name: "Grooming",
    image: "https://placehold.co/100x100",
  },
  {
    id: "7",
    name: "Accessories",
    image: "https://placehold.co/100x100",
  },
  {
    id: "8",
    name: "More",
    image: "https://placehold.co/100x100",
  },
]

type ProductCardProps = {
  item: Product
  onPress: (product: Product) => void
}

const ProductCard = memo(({ item, onPress }: ProductCardProps) => {
  const handlePress = useCallback(() => {
    onPress(item)
  }, [item, onPress])

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        tw`flex-1 rounded-2xl bg-white p-3 shadow`,
        pressed && tw`opacity-70`,
      ]}
    >
      {/* Product Image */}

      <View style={tw`items-center`}>
        <Image
          source={{
            uri: item.image,
          }}
          resizeMode="contain"
          style={tw`w-full aspect-square`}
        />
      </View>

      {/* Product Category */}

      <AppText
        variant="caption"
        tone="gray"
        style={tw`font-inter-medium uppercase tracking-wider`}
      >
        {item.category}
      </AppText>

      {/* Product Name */}

      <AppText
        variant="caption"
        tone="grayish"
        numberOfLines={2}
        style={tw`font-inter-medium`}
      >
        {item.name}
      </AppText>

      {/* Price + Rating */}

      <View style={tw`flex-row items-center justify-between pt-2`}>
        <AppText variant="body" tone="blackish" style={tw`font-inter-bold`}>
          {item.price}
        </AppText>

        <View
          style={tw`flex-row items-center gap-1 rounded-full bg-amber-400 px-2 py-1`}
        >
          {/* <Ionicons
              name="star"
              size={12}
              color="#FFFFFF"
            /> */}

          <AppText
            variant="caption"
            tone="textWhite"
            style={tw`font-inter-medium`}
          >
            {item.rating}
          </AppText>
        </View>
      </View>
    </Pressable>
  )
})

ProductCard.displayName = "ProductCard"

type CategoryCardProps = {
  item: Category
  onPress: (category: Category) => void
}

const CategoryCard = memo(({ item, onPress }: CategoryCardProps) => {
  const handlePress = useCallback(() => {
    onPress(item)
  }, [item, onPress])

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        tw`flex-1 items-center rounded-3xl bg-white p-3 shadow`,
        pressed && tw`opacity-70`,
      ]}
    >
      <Image
        source={{
          uri: item.image,
        }}
        resizeMode="contain"
        style={tw`w-full aspect-square`}
      />

      <AppText
        variant="caption"
        tone="text"
        style={tw`font-inter-semibold mt-2 text-center`}
        numberOfLines={1}
      >
        {item.name}
      </AppText>
    </Pressable>
  )
})

CategoryCard.displayName = "CategoryCard"

type PetMarketplaceProps = {
  onProductPress?: (product: Product) => void
  onCategoryPress?: (category: Category) => void
  onViewAllPress?: () => void
}

export function PetMarketplace({
  onProductPress,
  onCategoryPress,
  onViewAllPress,
}: PetMarketplaceProps) {
  const renderProduct = useCallback(
    ({ item }: { item: Product }) => (
      <ProductCard
        item={item}
        onPress={(product) => onProductPress?.(product)}
      />
    ),
    [onProductPress]
  )

  const renderCategory = useCallback(
    ({ item }: { item: Category }) => (
      <CategoryCard
        item={item}
        onPress={(category) => onCategoryPress?.(category)}
      />
    ),
    [onCategoryPress]
  )

  const productKeyExtractor = useCallback((item: Product) => item.id, [])

  const categoryKeyExtractor = useCallback((item: Category) => item.id, [])

  return (
    <View style={tw`gap-6`}>
      {/* Products Section */}

      <View style={tw`gap-3`}>
        <View style={tw`flex-row items-center justify-between`}>
          <AppText variant="body" tone="text" style={tw`font-inter-bold`}>
            Products
          </AppText>

          <Pressable
            onPress={onViewAllPress}
            style={({ pressed }) => [
              tw`flex-row items-center gap-1`,
              pressed && tw`opacity-60`,
            ]}
          >
            <AppText
              variant="caption"
              tone="primary"
              style={tw`font-inter-medium`}
            >
              View All
            </AppText>

            {/* <Ionicons
              name="chevron-forward"
              size={14}
              color="#155E75"
            /> */}
          </Pressable>
        </View>

        <FlatList
          horizontal
          data={PRODUCTS}
          renderItem={renderProduct}
          keyExtractor={productKeyExtractor}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={tw`gap-3`}
          initialNumToRender={2}
          maxToRenderPerBatch={2}
          windowSize={3}
        />
      </View>

      {/* Categories Section */}

      <View style={tw`gap-3`}>
        <AppText variant="body" tone="text" style={tw`font-inter-bold`}>
          Browse Categories
        </AppText>

        <FlatList
          data={CATEGORIES}
          renderItem={renderCategory}
          keyExtractor={categoryKeyExtractor}
          numColumns={4}
          scrollEnabled={false}
          columnWrapperStyle={tw`gap-2`}
          contentContainerStyle={tw`gap-2`}
          initialNumToRender={8}
          maxToRenderPerBatch={8}
          windowSize={5}
        />
      </View>
    </View>
  )
}
