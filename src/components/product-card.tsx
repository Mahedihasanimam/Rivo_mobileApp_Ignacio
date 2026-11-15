import tw from "@/lib/tailwind"
import { useAppTheme } from "@/theme/theme-provider"
import { Image } from "expo-image"
import { memo } from "react"
import { Dimensions, Pressable, View } from "react-native"
import { AppText } from "./ui/app-text"

const OUTER_PADDING = 24
const GAP = 12
const SCREEN_WIDTH = Dimensions.get("window").width
const NUM_COLUMNS = SCREEN_WIDTH < 380 ? 1 : 2
const CARD_WIDTH =
  NUM_COLUMNS === 1
    ? SCREEN_WIDTH - OUTER_PADDING * 2
    : (SCREEN_WIDTH - OUTER_PADDING * 2 - GAP) / 2

type ProductCardProps = {
  item: any
  width?: number
  onPress?: () => void
}

export const ProductCard = memo(
  ({ item, width = CARD_WIDTH, onPress }: ProductCardProps) => {
    const { colors } = useAppTheme()

    //   const {
    //     qty,
    //     increaseQty,
    //     decreaseQty,
    //     isLiked,
    //     isAdded,
    //     imageUri,
    //     handleToggleHeart,
    //     handleQuickAdd,
    //   } = useProductActions(item)

    if (!item) return null

    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          tw`rounded-2xl bg-white px-3.5 py-3 shadow-sm`,
          { width },
          pressed && tw`opacity-80`,
        ]}
      >
        <View style={tw`gap-3`}>
          {/* Product Image */}
          <View style={tw`items-center justify-center px-5`}>
            <Image
              source={require("@/assets/marketplace/product.png")}
              contentFit="contain"
              style={tw`w-20 h-24`}
            />
          </View>

          {/* Product Information */}
          <View style={tw`gap-1`}>
            {/* Category */}
            <AppText
              variant="caption"
              tone="gray"
              style={tw`font-inter-medium uppercase tracking-wider`}
            >
              FOOD
            </AppText>

            {/* Product Title */}
            <AppText
              variant="caption"
              tone="grayish"
              numberOfLines={2}
              style={tw`font-inter-medium`}
            >
              Royal Canin Medium Adult Dry Dog Food
            </AppText>

            {/* Price + Rating */}
            <View style={tw`flex-row items-center justify-between gap-2 pt-1`}>
              <AppText
                variant="body"
                tone="blackish"
                style={tw`font-inter-bold`}
              >
                $29.99
              </AppText>

              <View
                style={tw`flex-row items-center gap-1 rounded-2xl bg-amber-400 px-1.5 py-0.5`}
              >
                {/* <Ionicons name="star" size={11} color="#FFFFFF" /> */}

                <AppText
                  variant="caption"
                  tone="textWhite"
                  style={tw`font-inter-regular`}
                >
                  4.8
                </AppText>
              </View>
            </View>
          </View>
        </View>
      </Pressable>
    )
  }
)

ProductCard.displayName = "ProductCard"
