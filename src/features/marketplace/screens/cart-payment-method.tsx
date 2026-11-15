import { AppText } from "@/components/ui/app-text"
import TopBackButton from "@/components/ui/app-top-bar"
import { Screen } from "@/components/ui/screen"
import tw from "@/lib/tailwind"
import { router } from "expo-router"
import { useCallback, useState } from "react"
import { Pressable, View } from "react-native"
import { SvgXml } from "react-native-svg"

type PaymentOption = {
  id: string
  name: string
  details?: string
  type: "apple_pay" | "visa" | "mastercard"
}

const PAYMENT_METHODS: PaymentOption[] = [
  {
    id: "apple_pay",
    name: "Apple Pay",
    type: "apple_pay",
  },
  {
    id: "visa",
    name: "Visa",
    details: "•••• 4242",
    type: "visa",
  },
  {
    id: "mastercard",
    name: "Mastercard",
    details: "•••• 5555",
    type: "mastercard",
  },
]

const CHECKMARK_ICON = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.3332 4L5.99984 11.3333L2.6665 8" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`

const LOCATION_PIN_ICON = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#52525b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
<circle cx="12" cy="10" r="3"></circle>
</svg>`

const CREDIT_CARD_ICON = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#18181b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
<line x1="1" y1="10" x2="23" y2="10"></line>
</svg>`

const APPLE_ICON = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#18181b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/>
</svg>`

export default function CartPaymentMethodScreen() {
  const [selectedMethodId, setSelectedMethodId] = useState("mastercard")

  const handlePay = useCallback(() => {
    router.back()
  }, [])

  return (
    <Screen>
      <TopBackButton title="Checkout" />

      <View style={tw`gap-6 pt-2`}>
        {/* Delivery Address & Options Container */}
        <View style={tw`gap-4`}>
          {/* Delivery Address Card */}
          <View style={tw`gap-3 rounded-xl bg-white p-4 shadow-sm`}>
            <View style={tw`flex-row items-center justify-between`}>
              <AppText
                variant="subtitle"
                tone="text"
                style={tw`font-inter-semibold text-lg`}
              >
                Delivery Address
              </AppText>

              <Pressable
                hitSlop={8}
                style={({ pressed }) => [pressed && tw`opacity-60`]}
              >
                <AppText
                  variant="body"
                  tone="primary"
                  style={tw`font-inter-regular text-base text-emerald-700`}
                >
                  Edit
                </AppText>
              </Pressable>
            </View>

            <View style={tw`flex-row items-center gap-3`}>
              <View
                style={tw`items-center justify-center rounded-full bg-zinc-100 p-3`}
              >
                <SvgXml xml={LOCATION_PIN_ICON} width={20} height={20} />
              </View>

              <View style={tw`flex-1`}>
                <AppText
                  variant="body"
                  tone="gray"
                  style={tw`font-inter-regular text-base text-zinc-700`}
                >
                  123 Main Street, Apt 4B{"\n"}New York, NY 10001
                </AppText>
              </View>
            </View>
          </View>

          {/* Delivery Option Card */}
          <View style={tw`gap-3 rounded-xl bg-white p-4 shadow-sm`}>
            <AppText
              variant="subtitle"
              tone="text"
              style={tw`font-inter-semibold text-lg`}
            >
              Delivery Option
            </AppText>

            <View
              style={tw`flex-row items-center justify-between rounded-lg border border-neutral-300 p-3`}
            >
              <View style={tw`flex-1`}>
                <AppText
                  variant="body"
                  tone="text"
                  style={tw`font-inter-regular text-base`}
                >
                  Express Delivery
                </AppText>

                <AppText
                  variant="caption"
                  tone="gray"
                  style={tw`font-inter-regular text-base text-zinc-700`}
                >
                  1-2 business days
                </AppText>
              </View>

              <AppText
                variant="body"
                tone="text"
                style={tw`font-inter-regular text-base`}
              >
                $5.00
              </AppText>
            </View>
          </View>
        </View>

        {/* Payment Method Section */}
        <View style={tw`gap-3 pt-2`}>
          <AppText
            variant="subtitle"
            tone="text"
            style={tw`font-inter-semibold text-base`}
          >
            Payment method
          </AppText>

          {/* Payment Methods List */}
          <View style={tw`gap-3`}>
            {PAYMENT_METHODS.map((method) => {
              const isSelected = selectedMethodId === method.id

              return (
                <Pressable
                  key={method.id}
                  onPress={() => setSelectedMethodId(method.id)}
                  style={({ pressed }) => [
                    tw`flex-row items-center justify-between rounded-2xl bg-white p-4`,
                    isSelected
                      ? tw`border-2 border-teal-600`
                      : tw`border border-transparent`,
                    pressed && tw`opacity-70`,
                  ]}
                >
                  <View style={tw`flex-row items-center gap-3`}>
                    <View
                      style={tw`h-12 w-12 items-center justify-center rounded-full bg-gray-100`}
                    >
                      <SvgXml
                        xml={
                          method.type === "apple_pay"
                            ? APPLE_ICON
                            : CREDIT_CARD_ICON
                        }
                        width={24}
                        height={24}
                      />
                    </View>

                    <View>
                      <AppText
                        variant="body"
                        tone="text"
                        style={tw`font-inter-semibold text-base`}
                      >
                        {method.name}
                      </AppText>

                      {method.details && (
                        <AppText
                          variant="caption"
                          tone="gray"
                          style={tw`font-inter-regular text-sm text-black/60`}
                        >
                          {method.details}
                        </AppText>
                      )}
                    </View>
                  </View>

                  {/* Radio / Selection Indicator */}
                  {isSelected && (
                    <View
                      style={tw`h-6 w-6 items-center justify-center rounded-full bg-teal-600`}
                    >
                      <SvgXml xml={CHECKMARK_ICON} width={14} height={14} />
                    </View>
                  )}
                </Pressable>
              )
            })}
          </View>
        </View>

        {/* Pay CTA Button */}
        <Pressable
          onPress={handlePay}
          style={({ pressed }) => [
            tw`mt-4 items-center justify-center rounded-full bg-teal-600 py-4 shadow-md`,
            pressed && tw`opacity-80`,
          ]}
        >
          <AppText
            variant="body"
            tone="textWhite"
            style={tw`font-inter-semibold text-base text-white`}
          >
            Pay $96.66
          </AppText>
        </Pressable>
      </View>
    </Screen>
  )
}
