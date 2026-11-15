import { ratingStar } from "@/assets/icons/icons"
import { AppText } from "@/components/ui/app-text"
import { SectionHeader } from "@/components/ui/section-header"
import tw from "@/lib/tailwind"
import { memo, useCallback } from "react"
import { FlatList, View } from "react-native"
import { SvgXml } from "react-native-svg"

export type Review = {
  id: string
  name: string
  timeAgo: string
  rating: number
  comment: string
}

type ReviewItemProps = {
  item: Review
}

const ReviewItem = memo(({ item }: ReviewItemProps) => {
  const initials = item.name
    .split(" ")
    .map((name) => name.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase()

  return (
    <View style={tw`gap-3 rounded-xl bg-white p-4 shadow-sm`}>
      {/* Review Header */}
      <View style={tw`flex-row items-start justify-between gap-3`}>
        {/* Reviewer */}
        <View style={tw`flex-1 flex-row items-center gap-3`}>
          {/* Avatar */}
          <View
            style={tw`items-center justify-center rounded-full border border-neutral-300 bg-zinc-200 p-3`}
          >
            <AppText variant="body" tone="gray" style={tw`font-inter-regular`}>
              {initials}
            </AppText>
          </View>

          {/* Name & Time */}
          <View style={tw`flex-1 gap-1`}>
            <AppText
              variant="caption"
              tone="text"
              style={tw`font-inter-semibold`}
            >
              {item.name}
            </AppText>

            <AppText
              variant="caption"
              tone="gray"
              style={tw`font-inter-medium`}
            >
              {item.timeAgo}
            </AppText>
          </View>
        </View>

        {/* Rating */}
        <View style={tw`flex-row items-center gap-1`}>
          {Array.from({ length: item.rating }).map((_, index) => (
            <SvgXml key={`${item.id}-${index}`} xml={ratingStar} />
          ))}
        </View>
      </View>

      {/* Review Text */}
      <AppText variant="body" tone="gray" style={tw`font-inter-regular`}>
        {item.comment}
      </AppText>
    </View>
  )
})

ReviewItem.displayName = "ReviewItem"

type ReviewsSectionProps = {
  reviews: Review[]
  onViewAll?: () => void
}

export function ReviewsSection({ reviews, onViewAll }: ReviewsSectionProps) {
  const renderItem = useCallback(
    ({ item }: { item: Review }) => <ReviewItem item={item} />,
    []
  )

  const keyExtractor = useCallback((item: Review) => item.id, [])

  return (
    <View style={tw`gap-3.5`}>
      {/* Section Header */}
      <SectionHeader
        title="Review"
        action=" View All"
        onActionPress={onViewAll}
      />

      {/* Reviews */}
      <FlatList
        data={reviews}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`gap-3`}
        initialNumToRender={3}
        maxToRenderPerBatch={5}
        windowSize={5}
        removeClippedSubviews={false}
      />
    </View>
  )
}
