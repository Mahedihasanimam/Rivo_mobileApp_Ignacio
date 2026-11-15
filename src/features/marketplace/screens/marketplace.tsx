import { cart, downArrow, locationGreen, myOrder } from "@/assets/icons/icons"
import { AppText } from "@/components/ui/app-text"
import TopBackButton from "@/components/ui/app-top-bar"
import { Screen } from "@/components/ui/screen"
import SearchBar from "@/components/ui/search-bar"
import React from "react"

import tw from "@/lib/tailwind"
import { router } from "expo-router"
import { Pressable, View } from "react-native"
import { SvgXml } from "react-native-svg"
import { CategoriesSection } from "../components/categories-section"
import PopularStoreSection from "../components/popular-store-section"
import { ProductsForPedro } from "../components/products-for-pedro"
import PromoBanner from "../components/promo-banner"

type DeliveryHeaderProps = {
  address: string
  cartCount?: number
  onPressAddress?: () => void
  onPressCart?: () => void
  onOrderPress?: () => void
}

export default function MarketplaceScreen() {
  const [searchText, setSearchText] = React.useState("")

  return (
    <Screen>
      <TopBackButton title="Marketplace" />

      <DeliveryHeader
        address="dhaka"
        onPressCart={() => router.push("/card")}
        onOrderPress={() => router.push("/my-order")}
      />
      <SearchBar
        placeholder="Search marketplace..."
        value={searchText}
        onChangeText={setSearchText} // (text: string) => void
        onClear={() => setSearchText("")}
        leftIcon={true}
        navigation={() => router.push("/marketplace-filter")}
      />
      <CategoriesSection />
      <PromoBanner />
      <ProductsForPedro />
      <PopularStoreSection
        // stores={POPULAR_STORES}
        // onPressStore={(store) => {
        //   console.log("Selected store:", store.id)
        // }}
        // onPressViewAll={() => {
        //   router.push("/stores")
        // }}
        onPressStore={() => router.push("/shop-details")}
      />
    </Screen>
  )
}

function DeliveryHeader({
  address,
  cartCount = 2,
  onPressAddress,
  onPressCart,
  onOrderPress,
}: DeliveryHeaderProps) {
  return (
    <View style={tw`flex-row items-center justify-between gap-3`}>
      {/* Delivery Address */}
      <Pressable
        onPress={onPressAddress}
        style={({ pressed }) => [
          tw`flex-1 flex-row items-center gap-3`,
          pressed && tw`opacity-70`,
        ]}
      >
        {/* Location Icon */}
        <View style={tw`items-center justify-center`}>
          <SvgXml xml={locationGreen} />
        </View>

        {/* Address */}
        <View style={tw`flex-1`}>
          <AppText variant="caption" tone="gray" style={tw`font-inter-regular`}>
            Delivering to
          </AppText>

          <View style={tw`flex-row items-center gap-1`}>
            <AppText
              variant="caption"
              tone="blackish"
              numberOfLines={1}
              style={tw`flex-1 font-inter-semibold`}
            >
              {address}
            </AppText>

            <SvgXml xml={downArrow} />
          </View>
        </View>
      </Pressable>
      {/* My Orders */}
      <Pressable
        onPress={onOrderPress}
        style={({ pressed }) => [
          tw`relative items-center justify-center rounded-full border border-neutral-200 bg-white p-2.5 shadow-sm`,
          pressed && tw`opacity-70`,
        ]}
      >
        <SvgXml xml={myOrder} />

        {cartCount > 0 && (
          <View
            style={tw`absolute -top-1 -right-1 items-center justify-center rounded-full bg-[#0D9488] px-1.5 py-0.5 min-w-4 min-h-4`}
          >
            <AppText
              variant="caption"
              tone="textWhite"
              style={tw`font-inter-bold text-[10px] text-center`}
            >
              {cartCount > 99 ? "99+" : cartCount}
            </AppText>
          </View>
        )}
      </Pressable>
      {/* Cart */}
      <Pressable
        onPress={onPressCart}
        style={({ pressed }) => [
          tw`relative items-center justify-center rounded-full border border-neutral-200 bg-white p-2.5 shadow-sm`,
          pressed && tw`opacity-70`,
        ]}
      >
        <SvgXml xml={cart} />

        {cartCount > 0 && (
          <View
            style={tw`absolute -top-1 -right-1 items-center justify-center rounded-full bg-[#0D9488] px-1.5 py-0.5 min-w-4 min-h-4`}
          >
            <AppText
              variant="caption"
              tone="textWhite"
              style={tw`font-inter-bold text-[10px] text-center`}
            >
              {cartCount > 99 ? "99+" : cartCount}
            </AppText>
          </View>
        )}
      </Pressable>
    </View>
  )
}
