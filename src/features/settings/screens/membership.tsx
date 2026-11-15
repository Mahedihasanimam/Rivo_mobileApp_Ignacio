import TopBackButton from "@/components/ui/app-top-bar"
import { AppText } from "@/components/ui/app-text"
import { Button } from "@/components/ui/button"
import { Screen } from "@/components/ui/screen"
import tw from "@/lib/tailwind"
import React from "react"
import { View } from "react-native"

export default function MembershipScreen() {
  const benefits = [
    "Unlimited RivoCare AI Pet Assistant Access",
    "Priority Emergency Vet Connect",
    "Advanced Health & Vaccination Vault",
    "Custom Activity & Walk Insights",
    "Exclusive Marketplace Discounts & Rewards",
  ]

  return (
    <Screen>
      <TopBackButton title="Membership" />

      <View style={tw`gap-6 mt-2`}>
        {/* Membership Card */}
        <View style={tw`bg-[#0F9C8F] rounded-3xl p-6 shadow-md gap-4`}>
          <View style={tw`flex-row items-center justify-between`}>
            <AppText
              variant="subtitle"
              tone="textWhite"
              style={tw`font-inter-bold text-xl`}
            >
              Rivo Pro
            </AppText>
            <View style={tw`bg-white/20 px-3 py-1 rounded-full`}>
              <AppText
                variant="caption"
                tone="textWhite"
                style={tw`font-inter-semibold`}
              >
                PREMIUM
              </AppText>
            </View>
          </View>

          <AppText
            variant="body"
            tone="textWhite"
            style={tw`font-inter-regular opacity-90 leading-6`}
          >
            Unlock full potential pet care tools, AI advice, and emergency
            features.
          </AppText>

          <View style={tw`pt-2`}>
            <AppText
              variant="title"
              tone="textWhite"
              style={tw`font-inter-bold text-3xl`}
            >
              $9.99{" "}
              <AppText
                variant="body"
                tone="textWhite"
                style={tw`text-base font-inter-regular`}
              >
                / month
              </AppText>
            </AppText>
          </View>
        </View>

        {/* Benefits List */}
        <View
          style={tw`bg-white rounded-2xl p-5 border border-gray-100 shadow-sm gap-4`}
        >
          <AppText variant="body" tone="blackish" style={tw`font-inter-bold`}>
            Pro Membership Includes:
          </AppText>

          <View style={tw`gap-3`}>
            {benefits.map((benefit, index) => (
              <View key={index} style={tw`flex-row items-center gap-3`}>
                <View style={tw`w-2 h-2 rounded-full bg-[#0F9C8F]`} />
                <AppText
                  variant="body"
                  tone="gray"
                  style={tw`font-inter-regular flex-1`}
                >
                  {benefit}
                </AppText>
              </View>
            ))}
          </View>
        </View>

        <Button label="Upgrade to Pro" onPress={() => {}} />
      </View>
    </Screen>
  )
}
