import { ratingStar } from "@/assets/icons/icons"
import { AppText } from "@/components/ui/app-text"
import TopBackButton from "@/components/ui/app-top-bar"
import { Button } from "@/components/ui/button"
import { Screen } from "@/components/ui/screen"
import tw from "@/lib/tailwind"
import { View } from "react-native"
import { SvgXml } from "react-native-svg"
import { ReviewsSection, type Review } from "../components/reviews-section"

const RATING_BREAKDOWN = [
  { stars: "5 star", percentage: "85%", fillWidth: "85%" },
  { stars: "4 star", percentage: "10%", fillWidth: "10%" },
  { stars: "3 star", percentage: "3%", fillWidth: "3%" },
  { stars: "2 star", percentage: "1%", fillWidth: "1%" },
  { stars: "1 star", percentage: "1%", fillWidth: "1%" },
]

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
  {
    id: "3",
    name: "Alex M.",
    timeAgo: "3 weeks ago",
    rating: 5,
    comment:
      "Super fast delivery and great packaging. Highly recommend this for adult dogs!",
  },
]

export default function ShopReviewScreen() {
  return (
    <Screen>
      <TopBackButton title="Product Review" />

      {/* Rating Summary Card */}
      <View
        style={tw`self-stretch items-center justify-start gap-6 rounded-xl bg-white p-4 shadow-sm`}
      >
        {/* Rating Score & Stars */}
        <View style={tw`min-w-28 items-center justify-center`}>
          <AppText
            variant="title"
            tone="primary"
            style={tw`text-3xl font-bold leading-8 text-primary`}
          >
            4.8
          </AppText>

          {/* Stars */}
          <View style={tw`flex-row items-center gap-1 py-2`}>
            {Array.from({ length: 5 }).map((_, index) => (
              <SvgXml key={index} xml={ratingStar} />
            ))}
          </View>

          <AppText
            variant="caption"
            tone="gray"
            style={tw`font-inter-medium text-zinc-600`}
          >
            Based on 1,245 reviews
          </AppText>
        </View>

        {/* Rating Breakdown Bars */}
        <View style={tw`self-stretch gap-2`}>
          {RATING_BREAKDOWN.map((item) => (
            <View
              key={item.stars}
              style={tw`self-stretch flex-row items-center gap-3`}
            >
              <View style={tw`w-12`}>
                <AppText
                  variant="caption"
                  tone="gray"
                  style={tw`font-inter-medium text-zinc-600`}
                >
                  {item.stars}
                </AppText>
              </View>

              <View
                style={tw`h-2 flex-1 overflow-hidden rounded-full bg-zinc-200`}
              >
                <View
                  style={[
                    tw`h-2 rounded-full bg-teal-600`,
                    { width: item.fillWidth },
                  ]}
                />
              </View>

              <View style={tw`w-8 items-end`}>
                <AppText
                  variant="caption"
                  tone="gray"
                  style={tw`text-right font-inter-medium text-zinc-600`}
                >
                  {item.percentage}
                </AppText>
              </View>
            </View>
          ))}
        </View>
      </View>

      <Button label="Write a Review" />

      {/* Customer Reviews List */}
      <View style={tw`pt-2`}>
        <ReviewsSection reviews={DUMMY_REVIEWS} />
      </View>
    </Screen>
  )
}
