import { friendIcons, privateIcons, publicIcons } from "@/assets/icons/icons"
import { AppText } from "@/components/ui/app-text"
import TopBackButton from "@/components/ui/app-top-bar"
import { Screen } from "@/components/ui/screen"
import tw from "@/lib/tailwind"
import { useAppTheme } from "@/theme/theme-provider"
import { memo, useCallback, useState } from "react"
import { Pressable, View } from "react-native"
import { SvgXml } from "react-native-svg"
import { AISettingsCard } from "../components/aI-settings-card"
import { AccountActionsCard } from "../components/account-actions-card"
import { AccountHeaderCard } from "../components/account-header-card"
import { AppPreferences } from "../components/app-preferences"
import { NotificationSettings } from "../components/notification-settings"
import { PetSettingsCard } from "../components/pet-settings-card"
import { SubscriptionCard } from "../components/subscription-card"

type PrivacyType = "public" | "friends" | "private"

type PrivacyOption = {
  id: PrivacyType
  label: string
  icon: string
}

const PRIVACY_OPTIONS: PrivacyOption[] = [
  {
    id: "public",
    label: "Public",
    icon: publicIcons,
  },
  {
    id: "friends",
    label: "Friends",
    icon: friendIcons,
  },
  {
    id: "private",
    label: "Private",
    icon: privateIcons,
  },
]

type PrivacyTabItemProps = {
  item: PrivacyOption
  isActive: boolean
  onPress: (value: PrivacyType) => void
}

export default function SettingsScreen() {
  const { resolvedTheme } = useAppTheme()
  const isDark = resolvedTheme === "dark"

  return (
    <Screen>
      <TopBackButton title="Settings" />

      <AccountHeaderCard />

      <AppText
        variant="caption"
        tone="textMute"
        style={tw`font-inter-bold uppercase `}
      >
        Profile Visibility
      </AppText>

      <PrivacyTabs
        defaultValue="public"
        onChange={(privacy) => {
          console.log("Selected privacy:", privacy)

          // API value:
          // public | friends | private
        }}
      />

      <View style={tw`flex-col gap-1`}>
        <AppText
          variant="caption"
          tone="textMute"
          style={tw`font-inter-bold uppercase`}
        >
          Pets & Profiles
        </AppText>
        <AppText
          variant="caption"
          tone="textMute"
          style={tw`font-inter-regular`}
        >
          1 pet linked to your account
        </AppText>
      </View>

      <PetSettingsCard
        // onItemPress={(item) => {
        //   router.push(item.route as any)
        // }}
        isDark={isDark}
      />

      <View style={tw`flex-col gap-1`}>
        <AppText
          variant="caption"
          tone="textMute"
          style={tw`font-inter-bold uppercase`}
        >
          Pets & Profiles
        </AppText>
        <AppText
          variant="caption"
          tone="textMute"
          style={tw`font-inter-regular`}
        >
          1 pet linked to your account
        </AppText>
      </View>

      <SubscriptionCard
        planName="Rivo Plus"
        renewalDate="Renews Aug 21, 2026"
        // onItemPress={(item) => {
        //   console.log(item.id)

        //   if (item.id === "manage-subscription") {
        //     // Navigate to subscription screen
        //   }

        //   if (item.id === "payment-methods") {
        //     // Navigate to payment methods
        //   }

        //   if (item.id === "billing-history") {
        //     // Navigate to billing history
        //   }
        // }}
        isDark={isDark}
      />

      <View style={tw`flex-col gap-1`}>
        <AppText
          variant="caption"
          tone="textMute"
          style={tw`font-inter-bold uppercase`}
        >
          Membership & Billing
        </AppText>
      </View>

      <NotificationSettings isDark={isDark} />
      <View style={tw`flex-col gap-1`}>
        <AppText
          variant="caption"
          tone="textMute"
          style={tw`font-inter-bold uppercase`}
        >
          Notifications
        </AppText>
        <AppText
          variant="caption"
          tone="textMute"
          style={tw`font-inter-regular`}
        >
          Choose how you receive updates
        </AppText>
      </View>
      <AppPreferences />
      <View style={tw`flex-col gap-0.5`}>
        <AppText
          variant="caption"
          tone="textMute"
          style={tw`font-inter-bold uppercase`}
        >
          AI & Smart Features
        </AppText>
      </View>
      <AISettingsCard />
      <AccountActionsCard />
    </Screen>
  )
}

const PrivacyTabItem = memo(
  ({ item, isActive, onPress }: PrivacyTabItemProps) => {
    const handlePress = useCallback(() => {
      onPress(item.id)
    }, [item.id, onPress])

    return (
      <Pressable
        onPress={handlePress}
        style={({ pressed }) => [
          tw`flex-1 flex-row items-center justify-center gap-1.5 rounded-full px-3 py-2`,
          isActive ? tw`bg-teal-600` : tw`border border-black/10 bg-gray-50`,
          pressed && tw`opacity-70`,
        ]}
      >
        <SvgXml xml={item?.icon} />

        <AppText
          variant="caption"
          tone={isActive ? "textWhite" : "text"}
          style={tw`font-inter-semibold`}
        >
          {item.label}
        </AppText>
      </Pressable>
    )
  }
)

PrivacyTabItem.displayName = "PrivacyTabItem"

type PrivacyTabsProps = {
  defaultValue?: PrivacyType
  onChange?: (value: PrivacyType) => void
}

export function PrivacyTabs({
  defaultValue = "public",
  onChange,
}: PrivacyTabsProps) {
  const [selectedPrivacy, setSelectedPrivacy] =
    useState<PrivacyType>(defaultValue)

  const handleChange = useCallback(
    (value: PrivacyType) => {
      setSelectedPrivacy(value)
      onChange?.(value)
    },
    [onChange]
  )

  return (
    <View style={tw`flex-row items-center gap-2 `}>
      {PRIVACY_OPTIONS.map((item) => (
        <PrivacyTabItem
          key={item.id}
          item={item}
          isActive={selectedPrivacy === item.id}
          onPress={handleChange}
        />
      ))}
    </View>
  )
}
