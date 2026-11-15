import { ProductCard } from "@/components/product-card"
import { SectionHeader } from "@/components/ui/section-header"
import tw from "@/lib/tailwind"
import { router } from "expo-router"
import { memo, useCallback } from "react"
import { FlatList, View } from "react-native"

type Product = {
  id: string
  title?: string
  category?: string
  price?: number
  rating?: number
  image?: any
}

const DUMMY_PRODUCTS: Product[] = [
  {
    id: "1",
    title: "Royal Canin Medium Adult Dry Dog Food",
    category: "FOOD",
    price: 29.99,
    rating: 4.8,
  },
  {
    id: "2",
    title: "Pedigree Choice Cuts In Gravy",
    category: "TREATS",
    price: 19.49,
    rating: 4.6,
  },
  {
    id: "3",
    title: "KONG Classic Dog Toy Large",
    category: "TOYS",
    price: 14.99,
    rating: 4.9,
  },
  {
    id: "4",
    title: "Orthopedic Memory Foam Dog Bed",
    category: "BEDS",
    price: 45.0,
    rating: 4.7,
  },
]

type ProductsForPedroProps = {
  title?: string
  products?: Product[]
  onPressSeeAll?: () => void
  onPressProduct?: (product: Product) => void
}

export const ProductsForPedro = memo(
  ({
    title = "Products for Pedro",
    products = DUMMY_PRODUCTS,
    onPressSeeAll,
    onPressProduct,
  }: ProductsForPedroProps) => {
    const renderItem = useCallback(
      ({ item }: { item: Product }) => (
        <ProductCard
          item={item}
          width={160}
          onPress={() => onPressProduct?.(item)}
        />
      ),
      [onPressProduct]
    )

    const keyExtractor = useCallback(
      (item: Product, index: number) => item.id ?? `product-${index}`,
      []
    )

    return (
      <View style={tw`gap-3 my-2`}>
        {/* Section Header */}
        {/* <View style={tw`flex-row items-center justify-between`}>
          <AppText variant="body" tone="text" style={tw`font-inter-bold`}>
            {title}
          </AppText>

          <Pressable
            onPress={onPressSeeAll}
            style={({ pressed }) => [tw`py-1`, pressed && tw`opacity-60`]}
          >
            <AppText
              variant="caption"
              tone="grayish"
              style={tw`font-inter-regular`}
            >
              See All
            </AppText>
          </Pressable>
        </View> */}

        <SectionHeader
          title="Products for Pedro "
          action="View All"
          onActionPress={() => router.push("/product-view-and-search")}
        />

        {/* Horizontal Scrollable Product Row */}
        <FlatList
          horizontal
          data={products}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={tw`gap-3 pb-2`}
          initialNumToRender={4}
          maxToRenderPerBatch={4}
          windowSize={5}
        />
      </View>
    )
  }
)

ProductsForPedro.displayName = "ProductsForPedro"
