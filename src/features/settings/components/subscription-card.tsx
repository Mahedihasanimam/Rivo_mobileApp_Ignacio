import {
  billingHistory,
  manageSubscription,
  paymentMethods,
  rightArrow,
  rightArrowDarkMode,
  rivoPlush,
} from "@/assets/icons/icons"
import { AppText } from "@/components/ui/app-text"
import { Card } from "@/components/ui/card"
import tw from "@/lib/tailwind"
import { memo, useCallback } from "react"
import { FlatList, Pressable, View } from "react-native"
import { SvgXml } from "react-native-svg"

type SubscriptionItem = {
  id: string
  title: string
  description: string
  icon?: string
  iconColor?: string
  iconBackground?: string
}

const SUBSCRIPTION_DATA: SubscriptionItem[] = [
  {
    id: "rivo-plus",
    title: "Rivo Plus",
    description: "Plans, benefits, and upgrades",
    icon: rivoPlush,
    iconColor: "#FBBF24",
    iconBackground: "bg-amber-400/10",
  },
  {
    id: "manage-subscription",
    title: "Manage Subscription",
    description: "Plans, benefits, and upgrades",
    icon: manageSubscription,
    iconColor: "#FBBF24",
    iconBackground: "bg-amber-400/10",
  },
  {
    id: "payment-methods",
    title: "Payment Methods",
    description: "Cards, Apple Pay, PayPal",
    icon: paymentMethods,
    iconColor: "#F472B6",
    iconBackground: "bg-pink-400/10",
  },
  {
    id: "billing-history",
    title: "Billing History",
    description: "Past invoices and receipts",
    icon: billingHistory,
    iconColor: "#F472B6",
    iconBackground: "bg-pink-400/10",
  },
]

type SubscriptionListItemProps = {
  item: SubscriptionItem
  isLast: boolean
  onPress: (item: SubscriptionItem) => void
  isDark: boolean
}

const SubscriptionListItem = memo(
  ({ item, isLast, onPress, isDark }: SubscriptionListItemProps) => {
    const handlePress = useCallback(() => {
      onPress(item)
    }, [item, onPress])

    return (
      <View>
        <Pressable
          onPress={handlePress}
          style={({ pressed }) => [
            tw`flex-row items-center gap-3.5  py-3`,
            pressed && tw`opacity-70`,
          ]}
        >
          {/* Icon */}
          <View
            style={[
              tw`items-center justify-center rounded-xl p-2`,
              tw.style(item.iconBackground || "bg-amber-400/10"),
            ]}
          >
            {Boolean(item?.icon) ? (
              <SvgXml xml={item.icon!} />
            ) : (
              <View style={tw`w-5 h-5 bg-amber-400/20 rounded-full`} />
            )}
          </View>

          {/* Content */}
          <View style={tw`flex-1 gap-0.5`}>
            <AppText variant="body" tone="text" style={tw`font-inter-regular`}>
              {item.title}
            </AppText>

            <AppText
              variant="caption"
              tone="gray"
              style={tw`font-inter-regular`}
            >
              {item.description}
            </AppText>
          </View>

          {Boolean(rightArrow) && (
            <SvgXml xml={isDark ? rightArrowDarkMode : rightArrow} />
          )}
        </Pressable>

        {!isLast && <View style={tw`ml-16 mr-4 border-b border-black/10`} />}
      </View>
    )
  }
)

SubscriptionListItem.displayName = "SubscriptionListItem"

type SubscriptionCardProps = {
  planName?: string
  renewalDate?: string
  onItemPress?: (item: SubscriptionItem) => void
  isDark: boolean
}

export function SubscriptionCard({
  planName = "Rivo Plus",
  renewalDate = "Renews Aug 21, 2026",
  onItemPress,
  isDark,
}: SubscriptionCardProps) {
  const handleItemPress = useCallback(
    (item: SubscriptionItem) => {
      onItemPress?.(item)
    },
    [onItemPress]
  )

  const renderItem = useCallback(
    ({ item, index }: { item: SubscriptionItem; index: number }) => (
      <SubscriptionListItem
        item={item}
        isLast={index === SUBSCRIPTION_DATA.length - 1}
        onPress={handleItemPress}
        isDark={isDark}
      />
    ),
    [handleItemPress]
  )

  const keyExtractor = useCallback(
    (item: SubscriptionItem, index: number) => `${item.id}-${index}`,
    []
  )

  return (
    <Card radius="md">
      {/* Subscription Menu */}
      <FlatList
        data={SUBSCRIPTION_DATA}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={false}
      />
    </Card>
  )
}
