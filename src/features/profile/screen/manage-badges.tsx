import { memo, useCallback, useMemo, useState } from "react"
import { FlatList, Image, Pressable, View } from "react-native"

import { nonSelectIcons, selectIcons } from "@/assets/icons/icons"
import { AppText } from "@/components/ui/app-text"
import TopBackButton from "@/components/ui/app-top-bar"
import { Button } from "@/components/ui/button"
import { Screen } from "@/components/ui/screen"
import tw from "@/lib/tailwind"
import { router } from "expo-router"
import { SvgXml } from "react-native-svg"

type TabType = "earned" | "locked"

type Badge = {
  id: string
  title: string
  description: string
  image: string
  earned: boolean
}

const BADGES: Badge[] = [
  {
    id: "walk-warrior",
    title: "Walk Warrior",
    description: "Walked 10 km",
    image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1",
    earned: true,
  },
  {
    id: "training-star",
    title: "Training Star",
    description: "Completed 10 lessons",
    image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e",
    earned: true,
  },
  {
    id: "early-bird",
    title: "Early Bird Walker",
    description: "Walked 5 times before 8 AM",
    image: "https://images.unsplash.com/photo-1500534623283-312aade485b7",
    earned: true,
  },
  {
    id: "care-hero",
    title: "Care Hero",
    description: "Completed 7 care days",
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d",
    earned: false,
  },
  {
    id: "social-butterfly",
    title: "Social Butterfly",
    description: "Met 10 pet friends",
    image: "https://images.unsplash.com/photo-1517849845537-4d257902454a",
    earned: false,
  },
]

type BadgeCardProps = {
  item: Badge
  selected: boolean
  onPress: (badge: Badge) => void
}

const BadgeCard = memo(({ item, selected, onPress }: BadgeCardProps) => {
  return (
    <Pressable
      onPress={() => onPress(item)}
      style={({ pressed }) => [
        tw`flex-row items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm`,
        pressed && tw`opacity-70`,
      ]}
    >
      {/* Badge Image */}
      <Image
        source={{
          uri: item.image,
        }}
        resizeMode="cover"
        style={tw`w-12 h-12 rounded-xl`}
      />

      {/* Badge Information */}
      <View style={tw`flex-1 gap-0.5`}>
        <AppText
          variant="caption"
          tone="text"
          style={tw`font-inter-semibold text-sm`}
        >
          {item.title}
        </AppText>

        <AppText
          variant="caption"
          tone="grayish"
          style={tw`font-inter-regular`}
        >
          {item.description}
        </AppText>
      </View>

      {/* Selection Indicator */}
      <View
        style={[
          tw`w-6 h-6 items-center justify-center rounded-full`,
          selected ? tw`bg-primary` : tw`border-2 border-gray-300`,
        ]}
      >
        {selected ? (
          <SvgXml xml={selectIcons} />
        ) : (
          <SvgXml xml={nonSelectIcons} />
        )}
      </View>
    </Pressable>
  )
})

BadgeCard.displayName = "BadgeCard"

export default function BadgeSelectionScreen() {
  const [activeTab, setActiveTab] = useState<TabType>("earned")

  const [selectedBadges, setSelectedBadges] = useState<string[]>([
    "walk-warrior",
  ])

  const selectedCount = selectedBadges.length

  const filteredBadges = useMemo(() => {
    return BADGES.filter((badge) =>
      activeTab === "earned" ? badge.earned : !badge.earned
    )
  }, [activeTab])

  const handleBadgePress = useCallback((badge: Badge) => {
    setSelectedBadges((previous) => {
      const alreadySelected = previous.includes(badge.id)

      if (alreadySelected) {
        return previous.filter((id) => id !== badge.id)
      }

      if (previous.length >= 3) {
        return previous
      }

      return [...previous, badge.id]
    })
  }, [])

  const renderItem = useCallback(
    ({ item }: { item: Badge }) => (
      <BadgeCard
        item={item}
        selected={selectedBadges.includes(item.id)}
        onPress={handleBadgePress}
      />
    ),
    [handleBadgePress, selectedBadges]
  )

  const handleSave = useCallback(() => {
    console.log("Selected badges:", selectedBadges)
    router.back()
  }, [selectedBadges])

  return (
    <Screen scroll={false}>
      <View style={tw`flex-1 gap-5`}>
        {/* Top Navigation */}
        <TopBackButton title="Manage Badges" />

        {/* Pet Info & Counter Header */}
        <View style={tw`flex-row items-center justify-between`}>
          <View
            style={tw`flex-row items-center gap-2 rounded-full border border-gray-100 bg-gray-50 py-1 pl-1 pr-4`}
          >
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1500534623283-312aade485b7",
              }}
              style={tw`w-8 h-8 rounded-full`}
            />

            <AppText
              variant="caption"
              tone="text"
              style={tw`font-inter-semibold`}
            >
              Pedro
            </AppText>
          </View>

          <AppText
            variant="caption"
            tone="primary"
            style={tw`font-inter-semibold`}
          >
            Selected {selectedCount}/3
          </AppText>
        </View>

        {/* Tabs */}
        <View
          style={tw`flex-row rounded-full border border-gray-100 bg-gray-50 p-1`}
        >
          <Pressable
            onPress={() => setActiveTab("earned")}
            style={[
              tw`flex-1 items-center rounded-full py-2`,
              activeTab === "earned" && tw`bg-primary`,
            ]}
          >
            <AppText
              variant="caption"
              tone={activeTab === "earned" ? "textWhite" : "grayish"}
              style={
                activeTab === "earned"
                  ? tw`font-inter-semibold`
                  : tw`font-inter-medium`
              }
            >
              Earned
            </AppText>
          </Pressable>

          <Pressable
            onPress={() => setActiveTab("locked")}
            style={[
              tw`flex-1 items-center rounded-full py-2`,
              activeTab === "locked" && tw`bg-primary`,
            ]}
          >
            <AppText
              variant="caption"
              tone={activeTab === "locked" ? "textWhite" : "grayish"}
              style={
                activeTab === "locked"
                  ? tw`font-inter-semibold`
                  : tw`font-inter-medium`
              }
            >
              Locked
            </AppText>
          </Pressable>
        </View>

        {/* Badge List */}
        <FlatList
          data={filteredBadges}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={tw`gap-3 pb-6`}
          initialNumToRender={6}
          maxToRenderPerBatch={10}
          windowSize={5}
        />
      </View>

      {/* Save Button */}
      <Button label="  Save selections" />
    </Screen>
  )
}
