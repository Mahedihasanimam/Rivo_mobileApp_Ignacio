import TopHandler from "@/components/ui/top-handler"
import React, { useMemo, useState } from "react"
import { Pressable, ScrollView, View } from "react-native"

import { AppText } from "@/components/ui/app-text"
import { Button } from "@/components/ui/button"
import tw from "@/lib/tailwind"
import { useAppTheme } from "@/theme/theme-provider"

type Species = "Dog" | "Cat"

type Difficulty = "Beginner" | "Intermediate" | "Advanced"

type Duration = "5 min" | "10 min" | "20 min" | "30+ min"

type Category =
  "All" | "Basic Commands" | "Walking" | "Behavior" | "Tricks" | "Safety"

type FilterState = {
  species: Species
  difficulty: Difficulty
  duration: Duration
  category: Category
}

const SPECIES: Species[] = ["Dog", "Cat"]

const DIFFICULTIES: Difficulty[] = ["Beginner", "Intermediate", "Advanced"]

const DURATIONS: Duration[] = ["5 min", "10 min", "20 min", "30+ min"]

const CATEGORIES: Category[] = [
  "All",
  "Basic Commands",
  "Walking",
  "Behavior",
  "Tricks",
  "Safety",
]

const DEFAULT_FILTERS: FilterState = {
  species: "Dog",
  difficulty: "Beginner",
  duration: "10 min",
  category: "All",
}

export default function basicCommandsModal() {
  return (
    <View>
      <TopHandler />

      <FilterBottomSheet />
    </View>
  )
}

const FilterBottomSheet = () => {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS)

  const updateSpecies = (species: Species) => {
    setFilters((previous) => ({
      ...previous,
      species,
    }))
  }

  const updateDifficulty = (difficulty: Difficulty) => {
    setFilters((previous) => ({
      ...previous,
      difficulty,
    }))
  }

  const updateDuration = (duration: Duration) => {
    setFilters((previous) => ({
      ...previous,
      duration,
    }))
  }

  const updateCategory = (category: Category) => {
    setFilters((previous) => ({
      ...previous,
      category,
    }))
  }

  const handleSearch = () => {
    console.log("Search Filters:", filters)
  }

  const selectedFilterCount = useMemo(() => {
    return Object.values(filters).filter(Boolean).length
  }, [filters])

  return (
    <View
      style={tw` flex-1 overflow-hidden
      `}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw``}
      >
        <View style={tw`gap-8`}>
          {/* Filter Header */}
          <View>
            <View
              style={tw` flex-row items-center justify-between border-b border-gray-100 py-4
              `}
            >
              <AppText
                variant="body"
                // tone="blackish"
                style={tw`
                  font-inter-regular
                 
                `}
              >
                Filters
              </AppText>

              <AppText
                variant="caption"
                style={tw`
                  font-inter-regular
                 
                `}
              >
                12 Lessons Found
              </AppText>
            </View>

            {/* Species */}
            <FilterSection title="Species" containerStyle="mt-3">
              <SegmentedControl
                items={SPECIES}
                value={filters.species}
                onChange={updateSpecies}
              />
            </FilterSection>

            {/* Difficulty */}
            <FilterSection title="Difficulty" containerStyle="mt-2">
              <TabRow
                items={DIFFICULTIES}
                value={filters.difficulty}
                onChange={updateDifficulty}
              />
            </FilterSection>

            {/* Duration */}
            <FilterSection title="Duration" containerStyle="mt-2">
              <TabRow
                items={DURATIONS}
                value={filters.duration}
                onChange={updateDuration}
              />
            </FilterSection>

            {/* Category */}
            <FilterSection title="Category" containerStyle="mt-2">
              <CategoryTabs
                items={CATEGORIES}
                value={filters.category}
                onChange={updateCategory}
              />
            </FilterSection>
          </View>

          {/* Search Button */}
          <View>
            <Button label="Search" />
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

type FilterSectionProps = {
  title: string
  children: React.ReactNode
  containerStyle?: string
}

const FilterSection = ({
  title,
  children,
  containerStyle = "",
}: FilterSectionProps) => {
  return (
    <View style={tw`${containerStyle}`}>
      <View style={tw`mb-3`}>
        <AppText
          variant="body"
          style={tw`
            font-inter-regular
          `}
        >
          {title}
        </AppText>
      </View>

      {children}
    </View>
  )
}

type SegmentedControlProps<T extends string> = {
  items: T[]
  value: T
  onChange: (value: T) => void
}

const SegmentedControl = <T extends string>({
  items,
  value,
  onChange,
}: SegmentedControlProps<T>) => {
  const { colors, resolvedTheme } = useAppTheme()

  const isDarkMode = resolvedTheme === "dark"

  return (
    <View
      style={tw`
        flex-row
        overflow-hidden
        rounded-full
        ${isDarkMode ? "border-none" : "border-primary         border"}
      `}
    >
      {items.map((item) => {
        const isActive = item === value

        return (
          <Pressable
            key={item}
            onPress={() => onChange(item)}
            style={({ pressed }) => [
              tw`
                flex-1
                items-center
                justify-center
                px-3
                py-2
              `,
              isActive ? tw`bg-[#2F9C8F]` : tw`bg-[${colors.backButtonBg}]`,
              pressed && tw`opacity-80`,
            ]}
          >
            <AppText
              variant="caption"
              style={[
                tw`
                  font-inter-regular
                  text-sm
                  leading-5
                `,
                isActive
                  ? tw`text-white`
                  : tw`${isDarkMode ? "text-white" : "text-gray-700"}`,
              ]}
            >
              {item}
            </AppText>
          </Pressable>
        )
      })}
    </View>
  )
}

const TabRow = <T extends string>({
  items,
  value,
  onChange,
}: SegmentedControlProps<T>) => {
  const { colors, resolvedTheme } = useAppTheme()
  const isDarkMode = resolvedTheme === "dark"

  return (
    <View style={tw`flex-row`}>
      {items.map((item, index) => {
        const isActive = item === value

        return (
          <View key={item} style={[tw`flex-1`, index !== 0 && tw`ml-2`]}>
            <Pressable
              onPress={() => onChange(item)}
              style={({ pressed }) => [
                tw`
                  items-center
                  justify-center
                  rounded-[10px]
                  px-3
                  py-2
                `,
                isActive ? tw`bg-[#2F9C8F]` : tw`bg-[${colors.backButtonBg}]`,
                isActive && {
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.05,
                  shadowRadius: 2,
                  elevation: 1,
                },
                pressed && tw`opacity-80`,
              ]}
            >
              <AppText
                variant="caption"
                style={[
                  tw`
                    font-inter-regular
                    text-sm
                    leading-5
                  `,
                  isActive
                    ? tw`text-white`
                    : tw`${isDarkMode ? "text-white" : "text-gray-700"}`,
                ]}
              >
                {item}
              </AppText>
            </Pressable>
          </View>
        )
      })}
    </View>
  )
}

const CategoryTabs = <T extends string>({
  items,
  value,
  onChange,
}: SegmentedControlProps<T>) => {
  const { colors, resolvedTheme } = useAppTheme()
  const isDarkMode = resolvedTheme === "dark"

  return (
    <View style={tw`flex-row flex-wrap gap-2`}>
      {items.map((item) => {
        const isActive = item === value

        return (
          <Pressable
            key={item}
            onPress={() => onChange(item)}
            style={({ pressed }) => [
              tw`
                rounded-full
                px-4
                py-2
              `,
              isActive ? tw`bg-[#2F9C8F]` : tw`bg-[${colors.backButtonBg}]`,
              pressed && tw`opacity-80`,
            ]}
          >
            <AppText
              variant="caption"
              style={[
                tw`
                  font-inter-regular
                  text-sm
                  leading-5
                `,
                isActive
                  ? tw`text-white`
                  : tw`${isDarkMode ? "text-white" : "text-gray-700"}`,
              ]}
            >
              {item}
            </AppText>
          </Pressable>
        )
      })}
    </View>
  )
}
