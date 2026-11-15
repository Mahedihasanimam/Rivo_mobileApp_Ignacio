import { add, singleLag } from "@/assets/icons/icons"
import { UpdateTopBarPluseLogo } from "@/components/ui/app-top-bar"
import { Screen } from "@/components/ui/screen"
import tw from "@/lib/tailwind"
import { router } from "expo-router"
import { Activity, useMemo, useState } from "react"
import { TouchableOpacity, View } from "react-native"
import { SvgXml } from "react-native-svg"
import { FeedTab } from "../components/feed-tab"
import { MatchTab } from "../components/match-tab"
import { MessagesTab } from "../components/messages-tab"
import { SocialHeader } from "../components/social-header"
import { ACTIVITIES } from "../data/social-data"
import type { Filter, Tab } from "../types"

export default function SocialScreen() {
  const [activeTab, setActiveTab] = useState<Tab>("Feed")
  const [searchText, setSearchText] = useState("")
  const [activeFilter, setActiveFilter] = useState<Filter>("All")

  const filteredActivities = useMemo(() => {
    let result = ACTIVITIES

    if (activeFilter === "Walks") {
      result = result.filter((item) => item.type === "walk")
    } else if (activeFilter === "Achievements") {
      result = result.filter((item) => item.type === "achievement")
    } else if (activeFilter === "Training") {
      result = result.filter((item) => item.type === "training")
    } else if (activeFilter === "Milestones") {
      result = result.filter((item) => item.type === "milestone")
    }

    if (searchText.trim()) {
      const query = searchText.toLowerCase().trim()
      result = result.filter(
        (item) =>
          item.petName.toLowerCase().includes(query) ||
          item.owner.toLowerCase().includes(query) ||
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query)
      )
    }

    return result
  }, [activeFilter, searchText])

  return (
    <View style={tw`flex-1 relative`}>
      <Screen scroll={true}>
        <UpdateTopBarPluseLogo friend={true} />
        {/* <TopLogo /> */}
        <SocialHeader
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          searchText={searchText}
          setSearchText={setSearchText}
        />

        <View style={tw`mt-4`}>
          {/* Feed Tab */}
          <Activity mode={activeTab === "Feed" ? "visible" : "hidden"}>
            <FeedTab
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
              filteredActivities={filteredActivities}
            />
          </Activity>

          {/* Match Tab */}
          <Activity mode={activeTab === "Match" ? "visible" : "hidden"}>
            <MatchTab />
          </Activity>

          {/* Messages Tab */}
          <Activity mode={activeTab === "Messages" ? "visible" : "hidden"}>
            <MessagesTab />
          </Activity>
        </View>
      </Screen>

      {/* Bottom Floating Action Buttons */}
      <TouchableOpacity
        onPress={() => router.push("/(modal)/create-post-modal")}
        style={tw`absolute rounded-full w-6 h-6 shadow-sm items-center justify-center bg-[#FB923C] bottom-29 right-5 z-20`}
      >
        <SvgXml xml={singleLag} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/(modal)/create-post-modal")}
        style={tw`absolute rounded-full w-14 h-14 shadow-sm items-center justify-center bg-primary bottom-30 right-6 z-10`}
      >
        <SvgXml height={25} width={25} xml={add} />
      </TouchableOpacity>
    </View>
  )
}
