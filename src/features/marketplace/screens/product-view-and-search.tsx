import { ProductGrid } from "@/components/product-grid"
import { AppText } from "@/components/ui/app-text"
import TopBackButton from "@/components/ui/app-top-bar"
import { Screen } from "@/components/ui/screen"
import SearchBar from "@/components/ui/search-bar"
import PopularStoreSection from "@/features/marketplace/components/popular-store-section"
import tw from "@/lib/tailwind"
import { router } from "expo-router"
import React, { Activity } from "react"
import { Pressable, View } from "react-native"

const MOCK_PRODUCTS = [
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
  {
    id: "5",
    title: "Furminator Undercoat Deshedding Tool",
    category: "GROOMING",
    price: 24.99,
    rating: 4.8,
  },
  {
    id: "6",
    title: "Wellness CORE Grain-Free Dry Cat Food",
    category: "FOOD",
    price: 34.5,
    rating: 4.9,
  },
]

type Tab = "stores" | "products"

const TABS: {
  label: string
  value: Tab
}[] = [
  {
    label: "Products",
    value: "products",
  },
  {
    label: "Stores",
    value: "stores",
  },
]

export default function ProductViewAndSearchScreen() {
  const [searchText, setSearchText] = React.useState("")
  const [activeTab, setActiveTab] = React.useState<Tab>("products")

  return (
    <Screen>
      <TopBackButton title="Search" search={true} />
      <SearchBar
        placeholder="Search for products, stores or brands"
        value={searchText}
        onChangeText={setSearchText}
        onClear={() => setSearchText("")}
        leftIcon={true}
        navigation={() => router.push("/product-search-modal")}
      />
      <StoreTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <Activity mode={activeTab === "products" ? "visible" : "hidden"}>
        <ProductGrid
          onPress={() => router.push("/product-details")}
          data={MOCK_PRODUCTS}
          scrollEnabled={false}
        />
      </Activity>

      <Activity mode={activeTab === "stores" ? "visible" : "hidden"}>
        <PopularStoreSection />
      </Activity>
    </Screen>
  )
}

type StoreTabsProps = {
  activeTab: Tab
  onTabChange: (tab: Tab) => void
}

function StoreTabs({ activeTab, onTabChange }: StoreTabsProps) {
  return (
    <View style={tw`flex-row border-b border-gray-200`}>
      {TABS.map((tab) => {
        const isActive = activeTab === tab.value

        return (
          <Pressable
            key={tab.value}
            onPress={() => onTabChange(tab.value)}
            style={({ pressed }) => [
              tw`flex-1 items-center justify-center border-b-2 pb-3`,
              isActive ? tw`border-teal-600` : tw`border-transparent`,
              pressed && tw`opacity-70`,
            ]}
          >
            <AppText
              variant="body"
              tone={isActive ? "primary" : "gray"}
              style={[
                tw`text-center font-inter-semibold`,
                {
                  lineHeight: 16,
                  letterSpacing: -0.2,
                },
              ]}
            >
              {tab.label}
            </AppText>
          </Pressable>
        )
      })}
    </View>
  )
}
