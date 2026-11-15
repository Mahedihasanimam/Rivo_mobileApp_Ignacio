import TopBackButton from "@/components/ui/app-top-bar"
import { AppText } from "@/components/ui/app-text"
import { Button } from "@/components/ui/button"
import { Screen } from "@/components/ui/screen"
import tw from "@/lib/tailwind"
import React from "react"
import { Pressable, View } from "react-native"

export default function SupportScreen() {
  const faqs = [
    {
      q: "How do I reset my password?",
      a: "Go to Settings > Account > Privacy & Security to reset your password.",
    },
    {
      q: "How does Lost Mode work?",
      a: "Activating Lost Mode generates a shareable poster and alerts nearby pet owners in the Rivo community.",
    },
    {
      q: "Can I manage multiple pets?",
      a: "Yes, you can add and switch between multiple pet profiles from the Pet Setup section.",
    },
  ]

  return (
    <Screen>
      <TopBackButton title="Support & Help" />

      <View style={tw`gap-6 mt-2`}>
        {/* Contact Support Banner */}
        <View
          style={tw`bg-[#0F9C8F]/10 rounded-2xl p-5 border border-[#0F9C8F]/20 gap-3`}
        >
          <AppText
            variant="subtitle"
            tone="blackish"
            style={tw`font-inter-bold`}
          >
            Need Help?
          </AppText>
          <AppText
            variant="body"
            tone="gray"
            style={tw`font-inter-regular leading-6`}
          >
            Our team is available to assist you with any questions or issues
            with your Rivo account.
          </AppText>
          <Button label="Contact Support" onPress={() => {}} style={tw`mt-1`} />
        </View>

        {/* FAQs */}
        <View style={tw`gap-3`}>
          <AppText
            variant="caption"
            tone="grayish"
            style={tw`font-inter-semibold uppercase px-1`}
          >
            Frequently Asked Questions
          </AppText>

          <View
            style={tw`bg-white rounded-2xl p-4 border border-gray-100 shadow-sm gap-4`}
          >
            {faqs.map((faq, index) => (
              <View
                key={index}
                style={tw`gap-1 border-b border-gray-100 pb-3 last:border-b-0 last:pb-0`}
              >
                <AppText
                  variant="body"
                  tone="blackish"
                  style={tw`font-inter-semibold`}
                >
                  {faq.q}
                </AppText>
                <AppText
                  variant="caption"
                  tone="grayish"
                  style={tw`font-inter-regular leading-5`}
                >
                  {faq.a}
                </AppText>
              </View>
            ))}
          </View>
        </View>
      </View>
    </Screen>
  )
}
