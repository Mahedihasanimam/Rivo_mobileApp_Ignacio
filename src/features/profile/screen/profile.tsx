import React, { memo, useCallback, useMemo, useState } from "react"
import { FlatList, Image, Pressable, View } from "react-native"

import { levelIcons, manageIcon, plushIcon } from "@/assets/icons/icons"
import { AppText } from "@/components/ui/app-text"
import TopBackButton from "@/components/ui/app-top-bar"
import { Screen } from "@/components/ui/screen"
import tw from "@/lib/tailwind"
import { useAppTheme } from "@/theme/theme-provider"
import { router } from "expo-router"
import { SvgXml } from "react-native-svg"

import { AchievementsTab } from "../components/achievements-tab"
import { AllTab } from "../components/all-tab"
import { PostsTab } from "../components/posts-tab"
import { TrainingTab } from "../components/training-tab"
import { VideosTab } from "../components/videos-tab"

type ProfileTab = "All" | "Posts" | "Training" | "Achievements" | "Videos"

type Achievement = {
  id: string
  title: string
  icon?: string
  selected: boolean
}

const TABS: ProfileTab[] = [
  "All",
  "Posts",
  "Training",
  "Achievements",
  "Videos",
]

const ACHIEVEMENTS: Achievement[] = [
  {
    id: "1",
    title: "No badges\nselected",
    icon: "medal-outline",
    selected: false,
  },
  {
    id: "2",
    title: "No badges\nselected",
    icon: "ribbon-outline",
    selected: false,
  },
  {
    id: "3",
    title: "No badges\nselected",
    icon: "trophy-outline",
    selected: false,
  },
]

type TabItemProps = {
  item: ProfileTab
  activeTab: ProfileTab
  onPress: (tab: ProfileTab) => void
}

const TabItem = memo(({ item, activeTab, onPress }: TabItemProps) => {
  const isActive = item === activeTab

  return (
    <Pressable
      onPress={() => onPress(item)}
      style={({ pressed }) => [
        tw`rounded-full px-4 py-2`,
        isActive ? tw`bg-primary` : tw`bg-transparent`,
        pressed && tw`opacity-70`,
      ]}
    >
      <AppText
        variant="caption"
        tone={isActive ? "textWhite" : "grayish"}
        style={isActive ? tw`font-inter-medium` : tw`font-inter-semibold`}
      >
        {item}
      </AppText>
    </Pressable>
  )
})

TabItem.displayName = "TabItem"

type AchievementCardProps = {
  item: Achievement
}

const AchievementCard = memo(({ item }: AchievementCardProps) => {
  const { colors } = useAppTheme()
  return (
    <View
      style={tw`flex-1 items-center justify-center gap-2 rounded-lg border-2 border-[${colors.border}] px-3 py-4`}
    >
      <SvgXml xml={plushIcon} />

      <AppText
        variant="caption"
        tone="grayish"
        style={tw`text-center font-inter-medium`}
      >
        {item.title}
      </AppText>
    </View>
  )
})

AchievementCard.displayName = "AchievementCard"

// React Activity mode wrapper (uses React 19 Activity if available, with offscreen display fallback)
const ActivityWrapper = memo(
  ({
    mode,
    children,
  }: {
    mode: "visible" | "hidden"
    children: React.ReactNode
  }) => {
    const ReactActivity = (React as any).Activity
    if (ReactActivity) {
      return <ReactActivity mode={mode}>{children}</ReactActivity>
    }
    return (
      <View style={mode === "hidden" ? { display: "none" } : undefined}>
        {children}
      </View>
    )
  }
)

ActivityWrapper.displayName = "ActivityWrapper"

export default function PetProfileScreen() {
  const [activeTab, setActiveTab] = useState<ProfileTab>("All")
  const { colors } = useAppTheme()

  const displayedAchievements = useMemo(
    () => ACHIEVEMENTS.filter((item) => item.selected).length,
    []
  )

  const handleTabChange = useCallback((tab: ProfileTab) => {
    setActiveTab(tab)
  }, [])

  const renderTab = useCallback(
    ({ item }: { item: ProfileTab }) => (
      <TabItem item={item} activeTab={activeTab} onPress={handleTabChange} />
    ),
    [activeTab, handleTabChange]
  )

  const keyExtractor = useCallback((item: ProfileTab) => item, [])

  return (
    <Screen scroll={true}>
      {/* Header */}
      <TopBackButton title=" Pet Profile" />

      {/* Profile Info */}

      <View style={tw`flex-row items-center gap-3`}>
        <View style={tw`overflow-hidden rounded-full`}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1500534623283-312aade485b7",
            }}
            style={tw`w-24 h-24`}
          />
        </View>

        <View style={tw`flex-1 gap-2`}>
          <View style={tw`gap-1`}>
            <View style={tw`flex-row items-center gap-2`}>
              <AppText variant="title" tone="text" style={tw`font-inter-bold`}>
                Pedro
              </AppText>
            </View>

            <View style={tw`flex-row gap-1`}>
              <AppText
                variant="caption"
                tone="grayish"
                style={tw`font-inter-regular`}
              >
                Pet Explorer •
              </AppText>
              <AppText
                variant="caption"
                tone="grayish"
                style={tw`font-inter-bold text-[#F2AD2D]`}
              >
                Gold III
              </AppText>
            </View>
          </View>

          {/* Stats */}

          <View style={tw`flex-row gap-6`}>
            <View>
              <AppText
                variant="subtitle"
                tone="text"
                style={tw`font-inter-bold`}
              >
                28
              </AppText>

              <AppText
                variant="caption"
                tone="grayish"
                style={tw`font-inter-regular`}
              >
                POSTS
              </AppText>
            </View>

            <View>
              <AppText
                variant="subtitle"
                tone="text"
                style={tw`font-inter-bold`}
              >
                19
              </AppText>

              <AppText
                variant="caption"
                tone="grayish"
                style={tw`font-inter-regular`}
              >
                FRIENDS
              </AppText>
            </View>
          </View>
        </View>
        <View
          style={tw` bg-primary rounded-xl p-2 items-center justify-center`}
        >
          <SvgXml xml={levelIcons} />
          <AppText
            variant="body"
            tone="textWhite"
            style={tw`font-inter-semibold`}
          >
            Level 3
          </AppText>
        </View>
      </View>

      {/* Action Buttons */}

      <View style={tw`gap-3`}>
        <Pressable
          onPress={() => router.push("/edit-post")}
          style={({ pressed }) => [
            tw`items-center rounded-xl border border-[${colors.border}] py-3`,
            pressed && tw`opacity-70`,
          ]}
        >
          <AppText variant="body" tone="text" style={tw`font-inter-semibold`}>
            Edit Profile
          </AppText>
        </Pressable>

        <Pressable
          onPress={() => router.push("/saved-posts" as never)}
          style={({ pressed }) => [
            tw`items-center rounded-xl border border-[${colors.border}] py-3`,
            pressed && tw`opacity-70`,
          ]}
        >
          <AppText variant="body" tone="text" style={tw`font-inter-semibold`}>
            Saved Post
          </AppText>
        </Pressable>
      </View>

      {/* Achievements */}

      <View style={tw`gap-4 rounded-xl bg-white p-4 shadow-sm`}>
        <View style={tw`flex-row items-center justify-between`}>
          <AppText
            variant="subtitle"
            tone="text"
            style={tw`font-inter-semibold`}
          >
            Achievements
          </AppText>

          <View style={tw`rounded-full px-3 py-1`}>
            <AppText
              variant="caption"
              tone="primary"
              style={tw`font-inter-medium`}
            >
              {displayedAchievements}/3 Displayed
            </AppText>
          </View>
        </View>

        <View style={tw`flex-row gap-4`}>
          {ACHIEVEMENTS.map((item) => (
            <AchievementCard key={item.id} item={item} />
          ))}
        </View>

        <Pressable
          onPress={() => router.push("/manage-badges")}
          style={({ pressed }) => [
            tw`flex-row items-center justify-center gap-2 rounded-lg border border-[${colors.primary}] px-4 py-3`,
            pressed && tw`opacity-70`,
          ]}
        >
          <SvgXml xml={manageIcon} />

          <AppText
            variant="body"
            tone="primary"
            style={tw`font-inter-semibold`}
          >
            Manage Badges
          </AppText>
        </Pressable>
      </View>

      {/* Tabs Bar */}

      <FlatList
        horizontal
        data={TABS}
        renderItem={renderTab}
        keyExtractor={keyExtractor}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={tw`gap-1`}
      />

      {/* Dynamic Tab Content with React Activity */}

      <View style={tw`pb-5`}>
        <ActivityWrapper mode={activeTab === "All" ? "visible" : "hidden"}>
          <AllTab />
        </ActivityWrapper>

        <ActivityWrapper mode={activeTab === "Posts" ? "visible" : "hidden"}>
          <PostsTab />
        </ActivityWrapper>

        <ActivityWrapper mode={activeTab === "Training" ? "visible" : "hidden"}>
          <TrainingTab />
        </ActivityWrapper>

        <ActivityWrapper
          mode={activeTab === "Achievements" ? "visible" : "hidden"}
        >
          <AchievementsTab />
        </ActivityWrapper>

        <ActivityWrapper mode={activeTab === "Videos" ? "visible" : "hidden"}>
          <VideosTab />
        </ActivityWrapper>
      </View>
    </Screen>
  )
}
