import {
  closeIcon,
  minusBlack,
  plusBlack,
  supperPet,
} from "@/assets/icons/icons"
import { AppText } from "@/components/ui/app-text"
import TopBackButton from "@/components/ui/app-top-bar"
import { Screen } from "@/components/ui/screen"
import tw from "@/lib/tailwind"
import { router } from "expo-router"
import { useCallback, useMemo, useState } from "react"
import { Image, Pressable, TextInput, View } from "react-native"
import { SvgXml } from "react-native-svg"

type CartItem = {
  id: string
  title: string
  price: number
  quantity: number
  image?: any
}

const INITIAL_CART_ITEMS: CartItem[] = [
  {
    id: "1",
    title: "Premium Adult Dry Dog Food",
    price: 89.5,
    quantity: 1,
  },
  {
    id: "2",
    title: "Tough Rubber Chew Toy",
    price: 89.5,
    quantity: 1,
  },
]

export default function CartScreen() {
  const [items, setItems] = useState<CartItem[]>(INITIAL_CART_ITEMS)
  const [promoCode, setPromoCode] = useState("")

  const handleDecreaseQuantity = useCallback((id: string) => {
    setItems((previous) =>
      previous
        .map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 }
          }
          return item
        })
        .filter((item) => item.quantity > 0)
    )
  }, [])

  const handleIncreaseQuantity = useCallback((id: string) => {
    setItems((previous) =>
      previous.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + 1 }
        }
        return item
      })
    )
  }, [])

  const handleRemoveItem = useCallback((id: string) => {
    setItems((previous) => previous.filter((item) => item.id !== id))
  }, [])

  const subtotal = useMemo(
    () =>
      items.reduce(
        (accumulator, item) => accumulator + item.price * item.quantity,
        0
      ),
    [items]
  )

  const tax = useMemo(() => subtotal * 0.08, [subtotal])

  const total = useMemo(() => subtotal + tax, [subtotal, tax])

  const handleApplyPromo = useCallback(() => {
    // optional promo application logic
  }, [])

  const handleCheckout = useCallback(() => {
    router.push("/cart-payment-method" as any)
  }, [])

  return (
    <Screen>
      <TopBackButton title="My Cart" />

      {/* Main Cart Content */}
      <View style={tw`gap-4`}>
        {/* Store Title */}
        <View style={tw`flex-row items-center gap-2 pt-1`}>
          <SvgXml xml={supperPet} />
          <AppText
            variant="title"
            tone="text"
            style={tw`font-inter-bold text-lg`}
          >
            SuperPet
          </AppText>
        </View>

        {/* Cart Items List */}
        <View style={tw`gap-3`}>
          {items.map((item) => (
            <View
              key={item.id}
              style={tw`flex-row items-center gap-4 rounded-xl bg-white p-3 shadow-sm`}
            >
              {/* Product Image */}
              <View
                style={tw`h-20 w-20 items-center justify-center overflow-hidden rounded-lg bg-zinc-100`}
              >
                <Image
                  source={require("@/assets/marketplace/product.png")}
                  resizeMode="contain"
                  style={tw`h-16 w-16`}
                />
              </View>

              {/* Product Details */}
              <View style={tw`flex-1 gap-1`}>
                <AppText
                  variant="body"
                  tone="text"
                  numberOfLines={1}
                  style={tw`font-inter-semibold text-sm`}
                >
                  {item.title}
                </AppText>

                <AppText
                  variant="caption"
                  tone="primary"
                  style={tw`font-inter-bold text-xs text-teal-600`}
                >
                  ${item.price.toFixed(2)}
                </AppText>

                {/* Quantity Stepper & Actions */}
                <View style={tw`flex-row items-center justify-between pt-1`}>
                  {/* Stepper */}
                  <View
                    style={tw`flex-row items-center gap-1.5 rounded-xl border border-black/10 bg-gray-50 px-2 py-1`}
                  >
                    <Pressable
                      onPress={() => handleDecreaseQuantity(item.id)}
                      style={({ pressed }) => [
                        tw`h-5 w-5 items-center justify-center rounded-md bg-gray-50`,
                        pressed && tw`opacity-70`,
                      ]}
                    >
                      <SvgXml xml={minusBlack} width={12} height={12} />
                    </Pressable>

                    <AppText
                      variant="body"
                      tone="text"
                      style={tw`min-w-4 text-center font-inter-semibold `}
                    >
                      {item.quantity}
                    </AppText>

                    <Pressable
                      onPress={() => handleIncreaseQuantity(item.id)}
                      style={({ pressed }) => [
                        tw`h-5 w-5 items-center justify-center rounded-md bg-green-500`,
                        pressed && tw`opacity-70`,
                      ]}
                    >
                      <SvgXml xml={plusBlack} width={12} height={12} />
                    </Pressable>
                  </View>

                  {/* Remove Button */}
                  <Pressable
                    onPress={() => handleRemoveItem(item.id)}
                    hitSlop={8}
                    style={({ pressed }) => [
                      tw`p-1`,
                      pressed && tw`opacity-60`,
                    ]}
                  >
                    <SvgXml xml={closeIcon} width={16} height={16} />
                  </Pressable>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Promo Code Section */}
        <View style={tw`flex-row items-center gap-2 pt-2`}>
          <View
            style={tw`flex-1 rounded-2xl border border-black/10 bg-gray-50 px-4 py-2`}
          >
            <TextInput
              placeholder="Promo code"
              placeholderTextColor="rgba(0,0,0,0.4)"
              value={promoCode}
              onChangeText={setPromoCode}
              style={tw`font-inter-regular text-base text-black`}
            />
          </View>

          <Pressable
            onPress={handleApplyPromo}
            style={({ pressed }) => [
              tw`rounded-2xl border border-black/10 bg-gray-50 px-5 py-3.5`,
              pressed && tw`opacity-70`,
            ]}
          >
            <AppText
              variant="body"
              tone="text"
              style={tw`font-inter-semibold text-base`}
            >
              Apply
            </AppText>
          </Pressable>
        </View>

        {/* Order Summary Card */}
        <View style={tw`gap-3 rounded-xl bg-white p-4 shadow-sm`}>
          <AppText
            variant="subtitle"
            tone="text"
            style={tw`font-inter-semibold text-lg`}
          >
            Order Summary
          </AppText>

          <View style={tw`flex-row items-center justify-between py-1`}>
            <AppText
              variant="body"
              tone="gray"
              style={tw`font-inter-regular text-sm`}
            >
              Subtotal
            </AppText>
            <AppText
              variant="body"
              tone="text"
              style={tw`font-inter-semibold text-sm`}
            >
              ${subtotal.toFixed(2)}
            </AppText>
          </View>

          <View
            style={tw`flex-row items-center justify-between border-b border-zinc-200 py-1 pb-3`}
          >
            <AppText
              variant="body"
              tone="gray"
              style={tw`font-inter-regular text-sm`}
            >
              Delivery Fee
            </AppText>
            <AppText
              variant="body"
              tone="success"
              style={tw`font-inter-semibold text-sm text-emerald-800`}
            >
              Free
            </AppText>
          </View>

          <View
            style={tw`flex-row items-center justify-between border-b border-zinc-200 py-1 pb-3`}
          >
            <AppText
              variant="body"
              tone="gray"
              style={tw`font-inter-regular text-sm`}
            >
              Tax (8%)
            </AppText>
            <AppText
              variant="body"
              tone="text"
              style={tw`font-inter-semibold text-sm`}
            >
              ${tax.toFixed(2)}
            </AppText>
          </View>

          <View style={tw`flex-row items-center justify-between pt-2`}>
            <AppText
              variant="subtitle"
              tone="text"
              style={tw`font-inter-semibold text-base`}
            >
              Total
            </AppText>
            <AppText
              variant="subtitle"
              tone="text"
              style={tw`font-inter-bold text-base`}
            >
              ${total.toFixed(2)}
            </AppText>
          </View>
        </View>

        {/* Proceed to Checkout Button */}
        <Pressable
          onPress={handleCheckout}
          style={({ pressed }) => [
            tw`mt-2 items-center justify-center rounded-full bg-teal-600 py-4 shadow-lg`,
            pressed && tw`opacity-80`,
          ]}
        >
          <AppText
            variant="body"
            tone="textWhite"
            style={tw`font-inter-semibold text-base`}
          >
            Proceed to checkout · ${total.toFixed(2)}
          </AppText>
        </Pressable>
      </View>
    </Screen>
  )
}
