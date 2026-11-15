import { AppText } from "@/components/ui/app-text"
import TopHandler from "@/components/ui/top-handler"
import tw from "@/lib/tailwind"
import Slider from "@react-native-community/slider"
import { Checkbox } from "expo-checkbox"
import { useCallback, useState } from "react"
import { Pressable, ScrollView, View } from "react-native"
import { SvgXml } from "react-native-svg"

const chevronDownXml = `<svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M1 1L5 5L9 1" stroke="#0D9488" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`

const chevronUpXml = `<svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M9 5L5 1L1 1" stroke="#0D9488" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`

const CATEGORY_OPTIONS = [
  "Food",
  "Treats",
  "Toys",
  "Health",
  "Grooming",
  "Accessories",
]

const PET_OPTIONS = ["Dog", "Cat"]

const INITIAL_BRANDS = ["Purina Pro Plan", "Royal Canin", "Hill's Science Diet"]
const ADDITIONAL_BRANDS = ["Blue Buffalo", "Iams", "Orijen", "Wellness"]

type ProductSearchModalProps = {
  onClose?: () => void
  onApplyFilters?: (filters: {
    category: string
    pet: string
    priceRange: [number, number]
    brands: string[]
  }) => void
}

export default function ProductSearchModal({
  onClose,
  onApplyFilters,
}: ProductSearchModalProps) {
  const [selectedCategory, setSelectedCategory] = useState("Food")
  const [selectedPet, setSelectedPet] = useState("Dog")
  const [minPrice, setMinPrice] = useState(15)
  const [maxPrice, setMaxPrice] = useState(80)
  const [selectedBrands, setSelectedBrands] = useState<string[]>([
    "Purina Pro Plan",
    "Hill's Science Diet",
  ])
  const [showAllBrands, setShowAllBrands] = useState(false)

  const toggleBrand = useCallback((brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    )
  }, [])

  const displayedBrands = showAllBrands
    ? [...INITIAL_BRANDS, ...ADDITIONAL_BRANDS]
    : INITIAL_BRANDS

  return (
    <View style={tw`flex-1 bg-white`}>
      <TopHandler />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`gap-8 pt-4 pb-12`}
      >
        {/* Category Section */}
        <View style={tw`gap-3`}>
          <AppText
            variant="subtitle"
            tone="text"
            style={tw`font-inter-semibold text-lg text-zinc-900`}
          >
            Category
          </AppText>

          <View style={tw`flex-row flex-wrap gap-2.5`}>
            {CATEGORY_OPTIONS.map((cat) => {
              const isSelected = selectedCategory === cat
              return (
                <Pressable
                  key={cat}
                  onPress={() => setSelectedCategory(cat)}
                  style={({ pressed }) => [
                    tw`px-4 py-3 rounded-full justify-center items-center`,
                    isSelected ? tw`bg-teal-600 shadow-sm` : tw`bg-zinc-200`,
                    pressed && tw`opacity-70`,
                  ]}
                >
                  <AppText
                    variant="body"
                    style={[
                      tw`font-inter-semibold text-sm tracking-tight text-center`,
                      isSelected ? tw`text-white` : tw`text-zinc-700`,
                    ]}
                  >
                    {cat}
                  </AppText>
                </Pressable>
              )
            })}
          </View>
        </View>

        {/* Pet Section (Active/Inactive Tabs) */}
        <View style={tw`gap-3`}>
          <AppText
            variant="subtitle"
            tone="text"
            style={tw`font-inter-semibold text-lg text-zinc-900`}
          >
            Pet
          </AppText>

          <View style={tw`flex-row flex-wrap gap-2.5`}>
            {PET_OPTIONS.map((pet) => {
              const isSelected = selectedPet === pet
              return (
                <Pressable
                  key={pet}
                  onPress={() => setSelectedPet(pet)}
                  style={({ pressed }) => [
                    tw`px-5 py-3 rounded-full justify-center items-center`,
                    isSelected ? tw`bg-teal-600 shadow-sm` : tw`bg-zinc-200`,
                    pressed && tw`opacity-70`,
                  ]}
                >
                  <AppText
                    variant="body"
                    style={[
                      tw`font-inter-semibold text-sm tracking-tight text-center`,
                      isSelected ? tw`text-white` : tw`text-zinc-700`,
                    ]}
                  >
                    {pet}
                  </AppText>
                </Pressable>
              )
            })}
          </View>
        </View>

        {/* Price Range Section */}
        <View style={tw`gap-3`}>
          <View style={tw`flex-row justify-between items-center`}>
            <AppText
              variant="subtitle"
              tone="text"
              style={tw`font-inter-semibold text-lg text-zinc-900`}
            >
              Price Range
            </AppText>

            <AppText
              variant="body"
              style={tw`font-inter-semibold text-sm text-teal-600 tracking-tight`}
            >
              ${minPrice} - ${maxPrice}
            </AppText>
          </View>

          {/* Slider */}
          <View style={tw``}>
            <Slider
              minimumValue={0}
              maximumValue={200}
              step={5}
              value={maxPrice}
              onValueChange={setMaxPrice}
              minimumTrackTintColor="#0D9488"
              maximumTrackTintColor="#E5E7EB"
              thumbTintColor="#0D9488"
              style={{ width: "100%" }}
            />
          </View>
        </View>

        {/* Brand Section */}
        <View style={tw`gap-3`}>
          <AppText
            variant="subtitle"
            tone="text"
            style={tw`font-inter-semibold text-lg text-zinc-900`}
          >
            Brand
          </AppText>

          <View style={tw`gap-3`}>
            {displayedBrands.map((brand) => {
              const isChecked = selectedBrands.includes(brand)

              return (
                <Pressable
                  key={brand}
                  onPress={() => toggleBrand(brand)}
                  style={({ pressed }) => [
                    tw`flex-row items-center gap-3 py-1.5 rounded-lg`,
                    pressed && tw`opacity-70`,
                  ]}
                >
                  <Checkbox
                    value={isChecked}
                    onValueChange={() => toggleBrand(brand)}
                    color={isChecked ? "#0D9488" : undefined}
                    style={tw`w-6 h-6 rounded-md`}
                  />

                  <AppText
                    variant="body"
                    tone="text"
                    style={tw`font-inter-regular text-base text-zinc-900`}
                  >
                    {brand}
                  </AppText>
                </Pressable>
              )
            })}

            {/* See all brands */}
            <Pressable
              onPress={() => setShowAllBrands((prev) => !prev)}
              style={({ pressed }) => [
                tw`flex-row items-center gap-2 pt-2 py-1`,
                pressed && tw`opacity-70`,
              ]}
            >
              <AppText
                variant="body"
                style={tw`font-inter-semibold text-sm text-teal-600 tracking-tight`}
              >
                {showAllBrands ? "Show less" : "See all brands"}
              </AppText>
              <SvgXml
                xml={showAllBrands ? chevronUpXml : chevronDownXml}
                width={10}
                height={6}
              />
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}
