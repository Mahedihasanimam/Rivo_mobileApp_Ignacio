import TopBackButton from "@/components/ui/app-top-bar"
import { AppText } from "@/components/ui/app-text"
import { Screen } from "@/components/ui/screen"
import tw from "@/lib/tailwind"
import React from "react"
import { View } from "react-native"

export default function TermsAndConditionsScreen() {
  return (
    <Screen>
      <TopBackButton title="Terms & Conditions" />

      <View
        style={tw`bg-white rounded-2xl p-5 border border-gray-100 shadow-sm gap-4 mt-2`}
      >
        <AppText variant="subtitle" tone="blackish" style={tw`font-inter-bold`}>
          Terms of Service
        </AppText>
        <AppText
          variant="caption"
          tone="grayish"
          style={tw`font-inter-regular`}
        >
          Last updated: January 2026
        </AppText>

        <View style={tw`gap-3 pt-2`}>
          <AppText
            variant="body"
            tone="blackish"
            style={tw`font-inter-semibold`}
          >
            1. Introduction
          </AppText>
          <AppText
            variant="body"
            tone="gray"
            style={tw`font-inter-regular leading-6`}
          >
            Welcome to Rivo! By downloading, accessing, or using our mobile
            application and services, you agree to be bound by these Terms and
            Conditions.
          </AppText>

          <AppText
            variant="body"
            tone="blackish"
            style={tw`font-inter-semibold pt-2`}
          >
            2. User Responsibilities
          </AppText>
          <AppText
            variant="body"
            tone="gray"
            style={tw`font-inter-regular leading-6`}
          >
            You are responsible for maintaining the confidentiality of your
            account details and ensuring all information regarding your pet care
            is accurate.
          </AppText>

          <AppText
            variant="body"
            tone="blackish"
            style={tw`font-inter-semibold pt-2`}
          >
            3. Veterinary Disclaimer
          </AppText>
          <AppText
            variant="body"
            tone="gray"
            style={tw`font-inter-regular leading-6`}
          >
            Rivo features, including RivoCare AI, are intended for informational
            and record-keeping purposes only and do not replace professional
            veterinary consultation or diagnosis.
          </AppText>

          <AppText
            variant="body"
            tone="blackish"
            style={tw`font-inter-semibold pt-2`}
          >
            4. Service Modifications
          </AppText>
          <AppText
            variant="body"
            tone="gray"
            style={tw`font-inter-regular leading-6`}
          >
            We reserve the right to update, modify, or discontinue any feature
            or service at any time to improve overall user experience and
            platform security.
          </AppText>
        </View>
      </View>
    </Screen>
  )
}
