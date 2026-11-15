import { closeIcon, rightArrow } from "@/assets/icons/icons"
import { AppText } from "@/components/ui/app-text"
import TopHandler from "@/components/ui/top-handler"
import tw from "@/lib/tailwind"
import Slider from "@react-native-community/slider"
import { useCallback, useState } from "react"
import { Pressable, ScrollView, View } from "react-native"
import { SvgXml } from "react-native-svg"

type MarketplaceFilterModalProps = {
  onClose?: () => void
  onSave?: (filters: {
    price: number
    category: string
    brand: string
    productFor: string
  }) => void
}

const PRODUCT_FOR_OPTIONS = ["Dog", "Cat", "Both"]

export default function MarketplaceFilterModal({
  onClose,
  onSave,
}: MarketplaceFilterModalProps) {
  const [price, setPrice] = useState(200)
  const [category, setCategory] = useState("Any Breed")
  const [brand, setBrand] = useState("Any Brand")
  const [productFor, setProductFor] = useState("Cat")

  const handleSave = useCallback(() => {
    onSave?.({
      price,
      category,
      brand,
      productFor,
    })
    onClose?.()
  }, [price, category, brand, productFor, onSave, onClose])

  return (
    <View style={tw`flex-1 bg-white  pt-3 pb-6`}>
      <TopHandler />

      {/* Modal Header */}
      <View style={tw`flex-row items-center justify-between py-2`}>
        <AppText
          variant="subtitle"
          tone="text"
          style={tw`font-inter-medium text-xl text-gray-900`}
        >
          Filters
        </AppText>

        <Pressable
          onPress={onClose}
          hitSlop={8}
          style={({ pressed }) => [
            tw`items-center justify-center rounded-full p-2`,
            pressed && tw`bg-gray-100 opacity-70`,
          ]}
        >
          <SvgXml xml={closeIcon} width={20} height={20} />
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`gap-6 pt-4 pb-6`}
      >
        {/* Price Range Section with Slider */}
        <View style={tw`gap-3`}>
          <View style={tw`flex-row items-center justify-between`}>
            <AppText
              variant="body"
              tone="text"
              style={tw`font-inter-regular text-base text-gray-800`}
            >
              Price Range
            </AppText>

            <AppText
              variant="body"
              tone="gray"
              style={tw`font-inter-regular text-sm text-gray-500`}
            >
              0 - {price}$
            </AppText>
          </View>

          <Slider
            minimumValue={0}
            maximumValue={500}
            step={5}
            value={price}
            onValueChange={setPrice}
            minimumTrackTintColor="#0D9488"
            maximumTrackTintColor="#E5E7EB"
            thumbTintColor="#0D9488"
            style={{ width: "100%", height: 40 }}
          />
        </View>

        {/* Category Filter */}
        <Pressable
          style={({ pressed }) => [
            tw`flex-row items-center justify-between border-b border-gray-100 pb-4`,
            pressed && tw`opacity-70`,
          ]}
        >
          <AppText
            variant="body"
            tone="text"
            style={tw`font-inter-regular text-base text-gray-800`}
          >
            Category
          </AppText>

          <View style={tw`flex-row items-center gap-1`}>
            <AppText
              variant="body"
              tone="gray"
              style={tw`font-inter-regular text-sm text-gray-500`}
            >
              {category}
            </AppText>
            <SvgXml xml={rightArrow} width={16} height={16} />
          </View>
        </Pressable>

        {/* Brand Filter */}
        <Pressable
          style={({ pressed }) => [
            tw`flex-row items-center justify-between border-b border-gray-100 pb-4`,
            pressed && tw`opacity-70`,
          ]}
        >
          <AppText
            variant="body"
            tone="text"
            style={tw`font-inter-regular text-base text-gray-800`}
          >
            Brand
          </AppText>

          <View style={tw`flex-row items-center gap-1`}>
            <AppText
              variant="body"
              tone="gray"
              style={tw`font-inter-regular text-sm text-gray-500`}
            >
              {brand}
            </AppText>
            <SvgXml xml={rightArrow} width={16} height={16} />
          </View>
        </Pressable>

        {/* Product For Section */}
        <View style={tw`gap-3`}>
          <AppText
            variant="body"
            tone="text"
            style={tw`font-inter-regular text-base text-gray-800`}
          >
            Product For
          </AppText>

          <View style={tw`flex-row items-center gap-3`}>
            {PRODUCT_FOR_OPTIONS.map((option) => {
              const isSelected = productFor === option

              return (
                <Pressable
                  key={option}
                  onPress={() => setProductFor(option)}
                  style={({ pressed }) => [
                    tw`rounded-full px-8 py-2.5`,
                    isSelected
                      ? tw`bg-teal-600 shadow-sm`
                      : tw`border border-gray-200 bg-white`,
                    pressed && tw`opacity-70`,
                  ]}
                >
                  <AppText
                    variant="body"
                    tone={isSelected ? "textWhite" : "text"}
                    style={[
                      tw`text-center font-inter-regular text-sm`,
                      isSelected ? tw`text-white` : tw`text-gray-700`,
                    ]}
                  >
                    {option}
                  </AppText>
                </Pressable>
              )
            })}
          </View>
        </View>

        {/* Save Filter Button */}
        <View style={tw`pt-6 pb-4`}>
          <Pressable
            onPress={handleSave}
            style={({ pressed }) => [
              tw`items-center justify-center rounded-full bg-teal-600 px-5 py-4 shadow-md`,
              pressed && tw`opacity-80`,
            ]}
          >
            <AppText
              variant="body"
              tone="textWhite"
              style={tw`font-inter-semibold text-base text-white`}
            >
              Save Filter
            </AppText>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  )
}
