import { UpdateTopBarPluseLogo } from "@/components/ui/app-top-bar"
import { Screen } from "@/components/ui/screen"
import SearchBar from "@/components/ui/search-bar"
import { SectionHeader } from "@/components/ui/section-header"
import { router } from "expo-router"
import React from "react"
import {
  AITrainingCoachCard,
  RankProgressCard,
  TrainCategories,
  TrainFilters,
  TrainHeader,
  TrainingCard,
} from "../components"

export default function TrainScreen() {
  const [seachText, setSearchText] = React.useState("")

  return (
    <Screen>
      <UpdateTopBarPluseLogo />
      <TrainHeader />

      <SearchBar
        placeholder="Search for Pedro…"
        value={seachText}
        onClear={() => setSearchText("")}
        onChangeText={setSearchText}
        navigation={() => router.push("/(modal)/basic-commands-modal")}
      />

      <TrainFilters />
      <RankProgressCard />

      <AITrainingCoachCard />
      <TrainCategories />

      <SectionHeader
        title="Recommended for Pedro"
        action="See All"
        leftIcon={true}
        onActionPress={() => router.push("/basic-commands")}
      />

      <TrainingCard />
      <TrainingCard />
    </Screen>
  )
}
