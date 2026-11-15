import { AppText } from "@/components/ui/app-text"
import TopBackButton from "@/components/ui/app-top-bar"
import { Screen } from "@/components/ui/screen"
import tw from "@/lib/tailwind"
import { appToast } from "@/lib/toast/app-toast"
import { Image } from "expo-image"
import { router } from "expo-router"
import { Activity, useState } from "react"
import { Pressable, ScrollView, View } from "react-native"

export type OrderStatus = "ongoing" | "completed" | "cancelled"
export type TabType = "all" | OrderStatus

interface OrderItem {
  id: string
  orderNumber: string
  dateText: string
  status: OrderStatus
  statusLabel: string
  productName: string
  storeName: string
  itemsCount: string
  price: string
  originalPrice?: string
  image: string
}

const TABS: { id: TabType; label: string }[] = [
  { id: "all", label: "All Orders" },
  { id: "ongoing", label: "Ongoing" },
  { id: "completed", label: "Completed" },
  { id: "cancelled", label: "Cancelled" },
]

const MOCK_ORDERS: OrderItem[] = [
  {
    id: "1",
    orderNumber: "PC-84729",
    dateText: "Placed on Oct 24, 2023",
    status: "ongoing",
    statusLabel: "Ongoing",
    productName: "Premium Salmon",
    storeName: "Healthy Paws Market",
    itemsCount: "3 Items",
    price: "$84.50",
    image:
      "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=300&auto=format&fit=crop&q=80",
  },
  {
    id: "2",
    orderNumber: "PC-62910",
    dateText: "Delivered Oct 12, 2023",
    status: "completed",
    statusLabel: "Completed",
    productName: "Reflective Harness",
    storeName: "Outback Pet Gear",
    itemsCount: "1 Item",
    price: "$32.00",
    image:
      "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=300&auto=format&fit=crop&q=80",
  },
  {
    id: "3",
    orderNumber: "PC-51822",
    dateText: "Cancelled Sep 28, 2023",
    status: "cancelled",
    statusLabel: "Cancelled",
    productName: "Orthopedic Bed",
    storeName: "Sleepy Paws",
    itemsCount: "1 Item",
    price: "$120.00",
    originalPrice: "$120.00",
    image:
      "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?w=300&auto=format&fit=crop&q=80",
  },
]

export default function MyOrderScreen() {
  const [activeTab, setActiveTab] = useState<TabType>("all")

  const handleTrackOrder = (order: OrderItem) => {
    appToast.info(`Tracking Order #${order.orderNumber}`, {
      description: "Live delivery status update requested.",
    })
  }

  const handleReorder = (order: OrderItem) => {
    appToast.success(`Reordered ${order.productName}!`, {
      description: "Item added to cart successfully.",
    })
  }

  const handleLeaveReview = (order: OrderItem) => {
    appToast.message(`Review for ${order.productName}`, {
      description: "Opening review form...",
    })
  }

  const handleOrderAgain = (order: OrderItem) => {
    appToast.success(`Order Again: ${order.productName}`, {
      description: "Item added to your shopping cart.",
    })
  }

  return (
    <Screen>
      <TopBackButton title="My Orders" onBack={() => router.back()} />

      {/* Filter Tabs */}
      <View style={tw`my-2`}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={tw`flex-row items-center gap-2`}
        >
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id

            return (
              <Pressable
                key={tab.id}
                onPress={() => setActiveTab(tab.id)}
                style={({ pressed }) => [
                  tw`px-4 py-2 rounded-full items-center justify-center`,
                  isActive ? tw`bg-primary shadow-sm` : tw`bg-zinc-100`,
                  pressed && tw`opacity-80`,
                ]}
              >
                <AppText
                  variant="caption"
                  tone={isActive ? "textWhite" : "gray"}
                  style={tw`font-semibold text-sm`}
                >
                  {tab.label}
                </AppText>
              </Pressable>
            )
          })}
        </ScrollView>
      </View>

      {/* Tab Content using React Activity Component */}
      {TABS.map((tab) => {
        const filteredOrders =
          tab.id === "all"
            ? MOCK_ORDERS
            : MOCK_ORDERS.filter((order) => order.status === tab.id)

        return (
          <Activity
            key={tab.id}
            mode={activeTab === tab.id ? "visible" : "hidden"}
          >
            <View style={tw`gap-3`}>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    onTrackOrder={handleTrackOrder}
                    onReorder={handleReorder}
                    onLeaveReview={handleLeaveReview}
                    onOrderAgain={handleOrderAgain}
                  />
                ))
              ) : (
                <View style={tw`py-12 items-center justify-center`}>
                  <AppText
                    variant="body"
                    tone="gray"
                    style={tw`font-inter-medium`}
                  >
                    No orders found in {tab.label}.
                  </AppText>
                </View>
              )}
            </View>
          </Activity>
        )
      })}
    </Screen>
  )
}

interface OrderCardProps {
  order: OrderItem
  onTrackOrder: (order: OrderItem) => void
  onReorder: (order: OrderItem) => void
  onLeaveReview: (order: OrderItem) => void
  onOrderAgain: (order: OrderItem) => void
}

function OrderCard({
  order,
  onTrackOrder,
  onReorder,
  onLeaveReview,
  onOrderAgain,
}: OrderCardProps) {
  const isOngoing = order.status === "ongoing"
  const isCompleted = order.status === "completed"
  const isCancelled = order.status === "cancelled"

  return (
    <View
      style={tw`p-4 bg-white rounded-xl shadow-sm border border-zinc-200 gap-3 ${
        isCancelled ? "opacity-90" : "opacity-100"
      }`}
    >
      {/* Card Header */}
      <View
        style={tw`pb-3 border-b border-zinc-200 flex-row justify-between items-start`}
      >
        <View style={tw`gap-0.5`}>
          <AppText
            variant="caption"
            tone="gray"
            style={tw`font-medium uppercase tracking-wide`}
          >
            ORDER #{order.orderNumber}
          </AppText>
          <AppText variant="body" tone="gray" style={tw`font-normal`}>
            {order.dateText}
          </AppText>
        </View>

        {/* Status Badge */}
        {isOngoing && (
          <View
            style={tw`px-2.5 py-1 bg-emerald-50 rounded-full flex-row items-center gap-1.5`}
          >
            <View style={tw`w-2 h-2 rounded-full bg-emerald-600`} />
            <AppText variant="caption" tone="primary" style={tw`font-medium`}>
              {order.statusLabel}
            </AppText>
          </View>
        )}

        {isCompleted && (
          <View
            style={tw`px-2.5 py-1 bg-zinc-100 rounded-full flex-row items-center gap-1.5`}
          >
            <View style={tw`w-2 h-2 rounded-full bg-zinc-800`} />
            <AppText variant="caption" tone="blackish" style={tw`font-medium`}>
              {order.statusLabel}
            </AppText>
          </View>
        )}

        {isCancelled && (
          <View
            style={tw`px-2.5 py-1 bg-rose-50 rounded-full flex-row items-center gap-1.5`}
          >
            <View style={tw`w-2 h-2 rounded-full bg-red-600`} />
            <AppText variant="caption" tone="danger" style={tw`font-medium`}>
              {order.statusLabel}
            </AppText>
          </View>
        )}
      </View>

      {/* Card Body */}
      <View style={tw`py-1 flex-row items-center gap-4`}>
        <View
          style={tw`w-16 h-16 bg-zinc-100 rounded-lg overflow-hidden items-center justify-center`}
        >
          <Image
            source={{ uri: order.image }}
            style={tw`w-full h-full`}
            contentFit="cover"
          />
        </View>

        <View style={tw`flex-1 gap-0.5`}>
          <AppText
            variant="subtitle"
            tone="blackish"
            style={tw`font-semibold`}
            numberOfLines={1}
          >
            {order.productName}
          </AppText>
          <AppText variant="caption" tone="gray" style={tw`font-normal`}>
            Store: {order.storeName}
          </AppText>
          <AppText variant="caption" tone="grayish" style={tw`font-normal`}>
            {order.itemsCount}
          </AppText>
        </View>

        <View style={tw`items-end`}>
          <AppText
            variant="subtitle"
            tone={isOngoing ? "primary" : isCancelled ? "grayish" : "blackish"}
            style={[tw`font-semibold`, isCancelled && tw`line-through`]}
          >
            {order.price}
          </AppText>
        </View>
      </View>

      {/* Card Footer Actions */}
      <View
        style={tw`pt-3 border-t border-zinc-200 flex-row items-center justify-center gap-3`}
      >
        {isOngoing && (
          <Pressable
            onPress={() => onTrackOrder(order)}
            style={({ pressed }) => [
              tw`flex-1 h-10 px-4 bg-primary rounded-xl items-center justify-center`,
              pressed && tw`opacity-80`,
            ]}
          >
            <AppText
              variant="caption"
              tone="textWhite"
              style={tw`font-semibold text-sm`}
            >
              Track Order
            </AppText>
          </Pressable>
        )}

        {isCompleted && (
          <>
            <Pressable
              onPress={() => onReorder(order)}
              style={({ pressed }) => [
                tw`flex-1 h-10 px-4 rounded-xl border border-primary items-center justify-center`,
                pressed && tw`opacity-80 bg-teal-50/50`,
              ]}
            >
              <AppText
                variant="caption"
                tone="primary"
                style={tw`font-semibold text-sm`}
              >
                Reorder
              </AppText>
            </Pressable>

            <Pressable
              onPress={() => onLeaveReview(order)}
              style={({ pressed }) => [
                tw`flex-1 h-10 px-4 bg-zinc-100 rounded-xl items-center justify-center`,
                pressed && tw`opacity-80`,
              ]}
            >
              <AppText
                variant="caption"
                tone="blackish"
                style={tw`font-semibold text-sm`}
              >
                Leave Review
              </AppText>
            </Pressable>
          </>
        )}

        {isCancelled && (
          <Pressable
            onPress={() => onOrderAgain(order)}
            style={({ pressed }) => [
              tw`flex-1 h-10 px-4 rounded-xl border border-primary items-center justify-center`,
              pressed && tw`opacity-80 bg-teal-50/50`,
            ]}
          >
            <AppText
              variant="caption"
              tone="primary"
              style={tw`font-semibold text-sm`}
            >
              Order Again
            </AppText>
          </Pressable>
        )}
      </View>
    </View>
  )
}
