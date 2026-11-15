import TopBackButton from "@/components/ui/app-top-bar"
import { Screen } from "@/components/ui/screen"
import { router } from "expo-router"
import PetCategoryGrid from "../components/pet-category-grid"

export default function CategoriesScreen() {
  return (
    <Screen>
      <TopBackButton
        title="Categories"
        search={true}
        rightNavigation={() => router.push("/search")}
      />
      <PetCategoryGrid />
    </Screen>
  )
}
