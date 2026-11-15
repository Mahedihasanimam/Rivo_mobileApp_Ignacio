import TopBackButton from "@/components/ui/app-top-bar"
import tw from "@/lib/tailwind"
import { useAppTheme } from "@/theme/theme-provider"
import { router } from "expo-router"
import { ScrollView, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { CategoriesSection } from "../components/categories-section"
import { ProductsForPedro } from "../components/products-for-pedro"
import { ReviewsSection, type Review } from "../components/reviews-section"
import { StoreProfileCard } from "../components/store-profile-card"

const STORE_REVIEWS: Review[] = [
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

export default function ShopDetailsScreen() {
  const insets = useSafeAreaInsets()
  const { colors, spacing } = useAppTheme()

  return (
    <ScrollView
      style={{
        paddingTop: Math.max(insets.top + spacing.md, spacing.xl),
        backgroundColor: colors.background,
        paddingBottom: Math.max(insets.bottom + 150),
      }}
    >
      <View style={tw`px-[4%]`}>
        <TopBackButton title="Shop details" />
      </View>
      <StoreProfileCard
        name="Paws & Claws"
        rating={4.5}
        reviews="120"
        image={{
          uri: "https://images.unsplash.com/photo-1552053831-71594a27632d",
        }}
        minimumDeliveryAmount={50}
        deliveryTime="1-2 days"
      />
      <View style={tw`flex-1 gap-6 px-[4%] py-4`}>
        {/* <SectionHeader title="Products " action="View All" /> */}
        <ProductsForPedro />

        {/* <SectionHeader title="Browse Categories " /> */}
        <CategoriesSection />

        {/* Reviews Section */}
        <ReviewsSection
          reviews={STORE_REVIEWS}
          onViewAll={() => {
            router.push("/shop-review")
          }}
        />
      </View>
    </ScrollView>
  )
}
