import { minusBlack, plusBlack, ratingStar } from "@/assets/icons/icons"
import { AppText } from "@/components/ui/app-text"
import TopBackButton from "@/components/ui/app-top-bar"
import { Screen } from "@/components/ui/screen"
import tw from "@/lib/tailwind"
import { router } from "expo-router"
import { memo, useCallback, useMemo, useState } from "react"
import { FlatList, Image, Pressable, View } from "react-native"
import { SvgXml } from "react-native-svg"
import { ReviewsSection, type Review } from "../components/reviews-section"

const DUMMY_REVIEWS: Review[] = [
  {
    id: "1",
    name: "Mark D.",
    timeAgo: "1 week ago",
    rating: 5,
    comment:
      "Good quality kibble. The pieces are the right size for my Frenchie, but she seems to get bored of the taste quickly. Might try mixing it with wet food.",
  },
  {
    id: "2",
    name: "Sarah J.",
    timeAgo: "2 weeks ago",
    rating: 4,
    comment:
      "My dog really enjoys this product. Delivery was fast and the packaging was great.",
  },
]

type ProductFlavor = {
  id: string
  name: string
}

type ProductSize = {
  id: string
  label: string
  price: number
  oldPrice: number
}

const FLAVORS: ProductFlavor[] = [
  {
    id: "chicken",
    name: "Chicken & Green Pea",
  },
  {
    id: "duck",
    name: "Duck & Green Pea",
  },
  {
    id: "salmon",
    name: "Salmon & Green Pea",
  },
  {
    id: "turkey",
    name: "Turkey & Pea Chickpea",
  },
]

const SIZES: ProductSize[] = [
  {
    id: "2",
    label: "2",
    price: 18.99,
    oldPrice: 24.99,
  },
  {
    id: "4",
    label: "4",
    price: 21.99,
    oldPrice: 28.99,
  },
  {
    id: "4.5",
    label: "4.5",
    price: 23.99,
    oldPrice: 30.99,
  },
  {
    id: "5",
    label: "5",
    price: 24.99,
    oldPrice: 31.99,
  },
  {
    id: "8",
    label: "8",
    price: 26.99,
    oldPrice: 34.99,
  },
  {
    id: "10",
    label: "10",
    price: 28.99,
    oldPrice: 36.99,
  },
]

const PRODUCT_DESCRIPTION =
  "Royal Canin Medium Adult is specially formulated for medium breed dogs (11–25 kg) aged 1–7 years. It supports healthy digestion, high digestibility and optimal nutrient absorption."

type FlavorItemProps = {
  item: ProductFlavor
  selected: boolean
  onPress: (id: string) => void
}

const FlavorItem = memo(({ item, selected, onPress }: FlavorItemProps) => {
  const handlePress = useCallback(() => {
    onPress(item.id)
  }, [item.id, onPress])

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        tw`rounded-xl border px-4 py-2`,
        selected
          ? tw`border-[#FED7AA] bg-[#FFF7ED]`
          : tw`border-gray-200 bg-white`,
        pressed && tw`opacity-70`,
      ]}
    >
      <AppText
        variant="body"
        style={[
          tw`font-inter-medium`,
          selected ? tw`text-[#EA580C]` : tw`text-gray-600`,
          {
            fontSize: 14,
            lineHeight: 20,
          },
        ]}
      >
        {item.name}
      </AppText>
    </Pressable>
  )
})

FlavorItem.displayName = "FlavorItem"

type SizeItemProps = {
  item: ProductSize
  selected: boolean
  onPress: (item: ProductSize) => void
}

const SizeItem = memo(({ item, selected, onPress }: SizeItemProps) => {
  const handlePress = useCallback(() => {
    onPress(item)
  }, [item, onPress])

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        tw`items-center justify-center rounded-lg border px-3 py-2`,
        selected
          ? tw`border-teal-600 bg-cyan-50`
          : tw`border-gray-200 bg-white`,
        pressed && tw`opacity-70`,
      ]}
    >
      <AppText
        variant="body"
        tone={selected ? "primary" : "text"}
        style={[
          selected ? tw`font-inter-semibold` : tw`font-inter-regular`,
          {
            fontSize: 14,
            lineHeight: 20,
          },
        ]}
      >
        {item.label}
      </AppText>
    </Pressable>
  )
})

SizeItem.displayName = "SizeItem"

type ProductDetailsScreenProps = {
  onBack?: () => void

  onAddToCart?: (data: {
    flavor: ProductFlavor
    size: ProductSize
    quantity: number
    totalPrice: number
  }) => void
}

export default function ProductDetailsScreen({
  onBack,
  onAddToCart,
}: ProductDetailsScreenProps) {
  const [selectedFlavorId, setSelectedFlavorId] = useState("chicken")

  const [selectedSize, setSelectedSize] = useState<ProductSize>(SIZES[5])

  const [quantity, setQuantity] = useState(1)

  const [expanded, setExpanded] = useState(false)

  const selectedFlavor = useMemo(
    () => FLAVORS.find((item) => item.id === selectedFlavorId) ?? FLAVORS[0],
    [selectedFlavorId]
  )

  const totalPrice = useMemo(
    () => selectedSize.price * quantity,
    [quantity, selectedSize.price]
  )

  const totalOldPrice = useMemo(
    () => selectedSize.oldPrice * quantity,
    [quantity, selectedSize.oldPrice]
  )

  const totalSavings = useMemo(
    () => totalOldPrice - totalPrice,
    [totalOldPrice, totalPrice]
  )

  const displayedDescription = useMemo(() => {
    if (expanded) {
      return PRODUCT_DESCRIPTION
    }

    return `${PRODUCT_DESCRIPTION.slice(0, 125)}...`
  }, [expanded])

  const handleSelectFlavor = useCallback((flavorId: string) => {
    setSelectedFlavorId(flavorId)
  }, [])

  const handleSelectSize = useCallback((size: ProductSize) => {
    setSelectedSize(size)
  }, [])

  const handleDecreaseQuantity = useCallback(() => {
    setQuantity((previous) => Math.max(1, previous - 1))
  }, [])

  const handleIncreaseQuantity = useCallback(() => {
    setQuantity((previous) => previous + 1)
  }, [])

  const handleToggleDescription = useCallback(() => {
    setExpanded((previous) => !previous)
  }, [])

  const handleAddToCart = useCallback(() => {
    onAddToCart?.({
      flavor: selectedFlavor,
      size: selectedSize,
      quantity,
      totalPrice,
    })
  }, [onAddToCart, quantity, selectedFlavor, selectedSize, totalPrice])

  const renderFlavor = useCallback(
    ({ item }: { item: ProductFlavor }) => (
      <FlavorItem
        item={item}
        selected={item.id === selectedFlavorId}
        onPress={handleSelectFlavor}
      />
    ),
    [handleSelectFlavor, selectedFlavorId]
  )

  const renderSize = useCallback(
    ({ item }: { item: ProductSize }) => (
      <SizeItem
        item={item}
        selected={item.id === selectedSize.id}
        onPress={handleSelectSize}
      />
    ),
    [handleSelectSize, selectedSize.id]
  )

  return (
    <Screen>
      <TopBackButton title="Product details" />
      {/* Bottom Cart Section */}
      <Image
        source={require("@/assets/marketplace/product.png")}
        resizeMode="contain"
        style={{
          width: "100%",
          // aspectRatio: 1,
        }}
      />

      {/* Product Content */}
      <View style={tw`gap-6 pt-5`}>
        {/* Product Header */}
        <View style={tw`gap-3`}>
          <View style={tw`gap-1.5`}>
            <AppText variant="title" tone="text" style={tw`font-inter-bold`}>
              Chicken & Green Pea Recipe
            </AppText>

            {/* Brand and Rating */}
            <View style={tw`flex-row flex-wrap items-center gap-2`}>
              <AppText
                variant="body"
                tone="grayish"
                style={tw`font-inter-regular`}
              >
                By
              </AppText>

              <Pressable>
                <AppText
                  variant="body"
                  tone="primary"
                  style={tw`font-inter-medium underline`}
                >
                  Natural Balance
                </AppText>
              </Pressable>

              <View style={tw`flex-row items-center gap-1`}>
                <SvgXml xml={ratingStar} />

                <AppText
                  variant="body"
                  tone="text"
                  style={tw`font-inter-semibold`}
                >
                  4.8
                </AppText>

                <AppText
                  variant="body"
                  tone="grayish"
                  style={tw`font-inter-regular`}
                >
                  (2.2k)
                </AppText>
              </View>
            </View>

            {/* Stock */}
            <View style={tw`flex-row items-center gap-2`}>
              <View style={tw`rounded-full bg-[#42A66F] p-1`} />

              <AppText
                variant="caption"
                // tone="success"
                style={tw`font-inter-semibold text-[#42A66F]`}
              >
                In stock
              </AppText>
            </View>
          </View>

          {/* Price */}
          <View style={tw`flex-row items-baseline gap-2`}>
            <AppText variant="title" tone="text" style={tw`font-inter-bold`}>
              ${selectedSize.price.toFixed(2)}
            </AppText>

            <AppText
              variant="body"
              tone="grayish"
              style={tw`font-inter-regular line-through`}
            >
              ${selectedSize.oldPrice.toFixed(2)}
            </AppText>
          </View>
        </View>

        {/* Flavor */}
        <View style={tw`gap-3`}>
          <AppText variant="body" tone="text" style={tw`font-inter-bold`}>
            Flavor
          </AppText>

          <FlatList
            data={FLAVORS}
            renderItem={renderFlavor}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            contentContainerStyle={tw`flex-row flex-wrap gap-2`}
          />
        </View>

        {/* Size */}
        <View style={tw`gap-3`}>
          <AppText variant="body" tone="text" style={tw`font-inter-bold`}>
            Size in Pound
          </AppText>

          <FlatList
            data={SIZES}
            renderItem={renderSize}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={tw`gap-2`}
          />
        </View>

        {/* Product Description */}
        <View style={tw`gap-4`}>
          <AppText
            variant="subtitle"
            tone="text"
            style={tw`font-inter-semibold`}
          >
            Product Description
          </AppText>

          <AppText variant="body" tone="gray" style={tw`font-inter-regular`}>
            {displayedDescription}
          </AppText>

          <Pressable
            onPress={handleToggleDescription}
            style={({ pressed }) => [
              tw`flex-row items-center self-start gap-1`,
              pressed && tw`opacity-60`,
            ]}
          >
            <AppText variant="body" tone="text" style={tw`font-inter-bold`}>
              {expanded ? "Read Less" : "Read More"}
            </AppText>

            {/* <Ionicons
                name={
                  expanded
                    ? "chevron-up"
                    : "chevron-down"
                }
                size={16}
                color="#111111"
              /> */}
          </Pressable>
        </View>

        {/* Reviews Section */}
        <ReviewsSection
          reviews={DUMMY_REVIEWS}
          onViewAll={() => {
            router.push("/product-review" as any)
          }}
        />
      </View>

      <View style={tw`flex-row items-center justify-between gap-4  py-4`}>
        {/* Total Price */}
        <View style={tw`flex-1`}>
          <View style={tw`flex-row items-center gap-2`}>
            <AppText
              variant="subtitle"
              tone="text"
              style={tw`font-inter-semibold`}
            >
              ${totalPrice.toFixed(2)}
            </AppText>

            <AppText
              variant="caption"
              tone="grayish"
              style={tw`font-inter-regular line-through`}
            >
              ${totalOldPrice.toFixed(2)}
            </AppText>
          </View>

          <AppText variant="caption" tone="primary" style={tw`font-inter-bold`}>
            You save ${totalSavings.toFixed(2)}
          </AppText>
        </View>

        {/* Quantity */}
        <View style={tw`flex-row items-center rounded-full bg-stone-200 p-1`}>
          <Pressable
            onPress={handleDecreaseQuantity}
            disabled={quantity === 1}
            style={({ pressed }) => [
              tw`items-center justify-center rounded-full bg-stone-50 w-8 h-8`,
              quantity === 1 && tw`opacity-40`,
              pressed && quantity > 1 && tw`opacity-70`,
            ]}
          >
            <SvgXml xml={minusBlack} />
          </Pressable>

          <AppText variant="body" tone="text" style={tw`px-3 font-inter-bold`}>
            {quantity}
          </AppText>

          <Pressable
            onPress={handleIncreaseQuantity}
            style={({ pressed }) => [
              tw`items-center justify-center rounded-full bg-stone-50 w-8 h-8`,
              pressed && tw`opacity-70`,
            ]}
          >
            <SvgXml xml={plusBlack} />
          </Pressable>
        </View>

        {/* Add To Cart */}
        <Pressable
          onPress={handleAddToCart}
          style={({ pressed }) => [
            tw`items-center justify-center rounded-full bg-primary shadow-[0px_12px_24px_-8px_rgba(0,0,0,0.30)] px-5 py-3`,
            pressed && tw`opacity-80`,
          ]}
        >
          <AppText
            variant="caption"
            tone="textWhite"
            style={tw`font-inter-semibold`}
          >
            Add to Cart
          </AppText>
        </Pressable>
      </View>
    </Screen>
  )
}
