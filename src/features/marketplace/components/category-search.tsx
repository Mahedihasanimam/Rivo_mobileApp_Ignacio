import { closeIcon, resetPrimary } from "@/assets/icons/icons"
import { AppText } from "@/components/ui/app-text"
import { SectionHeader } from "@/components/ui/section-header"
import tw from "@/lib/tailwind"
import { memo, useCallback, useMemo, useState } from "react"

import { FlatList, Pressable, View } from "react-native"
import { SvgXml } from "react-native-svg"
import { CategoriesSection } from "./categories-section"

type RecentSearch = {
  id: string
  title: string
}

type PopularSearch = {
  id: string
  title: string
}

type BrowseCategory = {
  id: string
  title: string
  icon?: string
}

type ScreenSection =
  | {
      id: "recent"
      type: "recent"
    }
  | {
      id: "popular"
      type: "popular"
    }
  | {
      id: "categories"
      type: "categories"
    }

const INITIAL_RECENT_SEARCHES: RecentSearch[] = [
  {
    id: "1",
    title: "Royal Canin Puppy Food",
  },
  {
    id: "2",
    title: "Dental Chews",
  },
  {
    id: "3",
    title: "Cat Litter",
  },
  {
    id: "4",
    title: "Pet Bed",
  },
]

const POPULAR_SEARCHES: PopularSearch[] = [
  {
    id: "dog-food",
    title: "Dog food",
  },
  {
    id: "cat-food",
    title: "Cat food",
  },
  {
    id: "treats",
    title: "Treats",
  },
  {
    id: "grooming",
    title: "Grooming",
  },
  {
    id: "toys",
    title: "Toys",
  },
  {
    id: "vitamins",
    title: "Vitamins",
  },
  {
    id: "shampoo",
    title: "Shampoo",
  },
  {
    id: "leash",
    title: "Leash",
  },
]

const BROWSE_CATEGORIES: BrowseCategory[] = [
  {
    id: "food",
    title: "Food",
    icon: "restaurant-outline",
  },
  {
    id: "treats",
    title: "Treats",
    icon: "nutrition-outline",
  },
  {
    id: "toys",
    title: "Toys",
    icon: "football-outline",
  },
  {
    id: "beds",
    title: "Beds",
    icon: "bed-outline",
  },
]

const SCREEN_SECTIONS: ScreenSection[] = [
  {
    id: "recent",
    type: "recent",
  },
  {
    id: "popular",
    type: "popular",
  },
  {
    id: "categories",
    type: "categories",
  },
]

type RecentSearchItemProps = {
  item: RecentSearch
  onPress: (title: string) => void
  onRemove: (id: string) => void
}

const RecentSearchItem = memo(
  ({ item, onPress, onRemove }: RecentSearchItemProps) => {
    const handlePress = useCallback(() => {
      onPress(item.title)
    }, [item.title, onPress])

    const handleRemove = useCallback(() => {
      onRemove(item.id)
    }, [item.id, onRemove])

    return (
      <Pressable
        onPress={handlePress}
        style={({ pressed }) => [
          tw`flex-row items-center justify-between rounded-xl border border-neutral-300/40 bg-white px-3 py-3 shadow-sm`,
          pressed && tw`opacity-70`,
        ]}
      >
        <View style={tw`flex-1 flex-row items-center gap-3`}>
          <SvgXml xml={resetPrimary} />

          <AppText
            variant="body"
            tone="text"
            numberOfLines={1}
            style={tw`flex-1 font-inter-medium`}
          >
            {item.title}
          </AppText>
        </View>

        <Pressable
          onPress={handleRemove}
          hitSlop={8}
          style={({ pressed }) => [
            tw`items-center justify-center rounded-full p-1`,
            pressed && tw`bg-gray-100`,
          ]}
        >
          <SvgXml xml={closeIcon} />
        </Pressable>
      </Pressable>
    )
  }
)

RecentSearchItem.displayName = "RecentSearchItem"

type PopularSearchItemProps = {
  item: PopularSearch
  onPress: (title: string) => void
}

const PopularSearchItem = memo(({ item, onPress }: PopularSearchItemProps) => {
  const handlePress = useCallback(() => {
    onPress(item.title)
  }, [item.title, onPress])

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        tw`rounded-full bg-gray-100 px-4 py-2`,
        pressed && tw`opacity-70`,
      ]}
    >
      <AppText variant="body" tone="text" style={tw`font-inter-medium`}>
        {item.title}
      </AppText>
    </Pressable>
  )
})

PopularSearchItem.displayName = "PopularSearchItem"

type CategoryItemProps = {
  item: BrowseCategory
  onPress: (id: string) => void
}

const CategoryItem = memo(({ item, onPress }: CategoryItemProps) => {
  const handlePress = useCallback(() => {
    onPress(item.id)
  }, [item.id, onPress])

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        tw`items-center justify-center gap-2 rounded-3xl bg-white px-4 py-4 shadow-sm`,
        pressed && tw`opacity-70`,
      ]}
    >
      <View style={tw`items-center justify-center rounded-full bg-teal-50 p-2`}>
        <SvgXml xml={resetPrimary} />
      </View>

      <AppText variant="body" tone="text" style={tw`font-inter-semibold`}>
        {item.title}
      </AppText>
    </Pressable>
  )
})

CategoryItem.displayName = "CategoryItem"

type SearchSuggestionsProps = {
  onSearch?: (search: string) => void
  onPressSeeAll?: () => void
  onPressCategory?: (categoryId: string) => void
}

export default function SearchSuggestions({
  onSearch,
  onPressSeeAll,
  onPressCategory,
}: SearchSuggestionsProps) {
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>(
    INITIAL_RECENT_SEARCHES
  )

  const handleSearch = useCallback(
    (search: string) => {
      onSearch?.(search)
    },
    [onSearch]
  )

  const handleRemoveRecentSearch = useCallback((id: string) => {
    setRecentSearches((previous) => previous.filter((item) => item.id !== id))
  }, [])

  const handleClearAll = useCallback(() => {
    setRecentSearches([])
  }, [])

  const handleCategoryPress = useCallback(
    (categoryId: string) => {
      onPressCategory?.(categoryId)
    },
    [onPressCategory]
  )

  const renderCategoryItem = useCallback(
    ({ item }: { item: BrowseCategory }) => (
      <CategoryItem item={item} onPress={handleCategoryPress} />
    ),
    [handleCategoryPress]
  )

  const recentSection = useMemo(() => {
    if (recentSearches.length === 0) {
      return null
    }

    return (
      <View style={tw`gap-3`}>
        {/* Section Header */}
        <SectionHeader
          title="Recent Searches"
          action="Clear all"
          onActionPress={handleClearAll}
        />

        {/* Recent Search List */}
        <View style={tw`gap-3`}>
          {recentSearches.map((item) => (
            <RecentSearchItem
              key={item.id}
              item={item}
              onPress={handleSearch}
              onRemove={handleRemoveRecentSearch}
            />
          ))}
        </View>
      </View>
    )
  }, [recentSearches, handleSearch, handleRemoveRecentSearch, handleClearAll])

  const popularSection = useMemo(
    () => (
      <View style={tw`gap-3`}>
        <SectionHeader title="Popular Searches" />

        <View style={tw`flex-row flex-wrap gap-2`}>
          {POPULAR_SEARCHES.map((item) => (
            <PopularSearchItem
              key={item.id}
              item={item}
              onPress={handleSearch}
            />
          ))}
        </View>
      </View>
    ),
    [handleSearch]
  )

  const categoriesSection = useMemo(
    () => (
      <View style={tw`gap-3`}>
        {/* <SectionHeader title="Browse Categories" action="See All" /> */}

        <CategoriesSection />
      </View>
    ),
    [renderCategoryItem]
  )

  const renderSection = useCallback(
    ({ item }: { item: ScreenSection }) => {
      switch (item.type) {
        case "recent":
          return recentSection

        case "popular":
          return popularSection

        case "categories":
          return categoriesSection

        default:
          return null
      }
    },
    [recentSection, popularSection, categoriesSection]
  )

  return (
    <FlatList
      data={SCREEN_SECTIONS}
      renderItem={renderSection}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={tw`gap-6 py-4`}
      removeClippedSubviews
      initialNumToRender={3}
      windowSize={5}
      scrollEnabled={false}
    />
  )
}
