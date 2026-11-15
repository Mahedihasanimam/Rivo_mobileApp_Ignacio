import { AppText } from "@/components/ui/app-text"
import TopBackButton from "@/components/ui/app-top-bar"
import { Screen } from "@/components/ui/screen"
import tw from "@/lib/tailwind"
import { View } from "react-native"

export default function PrivacyPolicyScreen() {
  return (
    <Screen>
      <TopBackButton title="Privacy Policy" />

      <View
        style={tw`bg-white rounded-2xl p-5 border border-gray-100 shadow-sm gap-4 mt-2`}
      >
        <AppText variant="subtitle" tone="blackish" style={tw`font-inter-bold`}>
          Privacy Policy
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
            1. Information We Collect
          </AppText>
          <AppText
            variant="body"
            tone="gray"
            style={tw`font-inter-regular leading-6`}
          >
            We collect personal details such as your name, email, location data
            for walk tracking, and details regarding your pet&apos;s health,
            diet, and routines.
          </AppText>

          <AppText
            variant="body"
            tone="blackish"
            style={tw`font-inter-semibold pt-2`}
          >
            2. How We Use Your Data
          </AppText>
          <AppText
            variant="body"
            tone="gray"
            style={tw`font-inter-regular leading-6`}
          >
            Your data is utilized to personalize pet care insights, facilitate
            lost mode alerts, provide AI assistant features, and improve app
            functionality.
          </AppText>

          <AppText
            variant="body"
            tone="blackish"
            style={tw`font-inter-semibold pt-2`}
          >
            3. Data Sharing & Security
          </AppText>
          <AppText
            variant="body"
            tone="gray"
            style={tw`font-inter-regular leading-6`}
          >
            We employ industry-standard encryption to safeguard your data. We do
            not sell your personal or pet information to third parties.
          </AppText>

          <AppText
            variant="body"
            tone="blackish"
            style={tw`font-inter-semibold pt-2`}
          >
            4. Your Rights
          </AppText>
          <AppText
            variant="body"
            tone="gray"
            style={tw`font-inter-regular leading-6`}
          >
            You can request access, corrections, or deletion of your personal
            account data at any time via support settings.
          </AppText>
        </View>
      </View>
    </Screen>
  )
}
