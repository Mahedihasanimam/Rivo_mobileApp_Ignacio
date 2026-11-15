import TopBackButton from "@/components/ui/app-top-bar"
import { Screen } from "@/components/ui/screen"
import SearchBar from "@/components/ui/search-bar"
import React from "react"
import SearchSuggestions from "../components/category-search"

export default function SearchScreen() {
  const [searchText, setSearchText] = React.useState("")

  return (
    <Screen>
      <TopBackButton title="Search" search={true} />
      <SearchBar
        placeholder="Search for products, stores or brands"
        value={searchText}
        onChangeText={setSearchText} // (text: string) => void
        onClear={() => setSearchText("")}
        leftIcon={true}
        navigation={() => {
          /* optional navigation action */
        }}
      />
      <SearchSuggestions />
    </Screen>
  )
}
