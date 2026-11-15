import { AppText } from "@/components/ui/app-text"
import { Card } from "@/components/ui/card"
import tw from "@/lib/tailwind"
import { Pressable, ScrollView, View } from "react-native"
import { FILTERS } from "../data/social-data"
import type { ActivityItem, Filter } from "../types"
import { ActivityCard } from "./activity-card"

type FeedTabProps = {
  activeFilter: Filter
  setActiveFilter: (filter: Filter) => void
  filteredActivities: ActivityItem[]
}

export const FeedTab = ({
  activeFilter,
  setActiveFilter,
  filteredActivities,
}: FeedTabProps) => {
  return (
    <View>
      {/* Filter Pills */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={tw`gap-2 pb-4`}
      >
        {FILTERS.map((filter) => {
          const active = activeFilter === filter

          return (
            <Card
              key={filter}
              radius="pill"
              style={[
                tw`p-0 overflow-hidden`,
                active && tw`border-primary bg-primary`,
              ]}
            >
              <Pressable
                onPress={() => setActiveFilter(filter)}
                style={({ pressed }) => [
                  tw`px-4 py-2`,
                  active && {
                    shadowColor: "#2F9C8F",
                    shadowOffset: {
                      width: 0,
                      height: 3,
                    },
                    shadowOpacity: 0.35,
                    shadowRadius: 12,
                    elevation: 12,
                  },
                  pressed && tw`opacity-70`,
                ]}
              >
                <AppText
                  variant="caption"
                  tone={active ? "textWhite" : "blackish"}
                  style={
                    active ? tw`font-inter-semibold` : tw`font-inter-medium`
                  }
                >
                  {filter}
                </AppText>
              </Pressable>
            </Card>
          )
        })}
      </ScrollView>

      {/* Activities List */}
      {filteredActivities.length > 0 ? (
        filteredActivities.map((item) => (
          <ActivityCard key={item.id} item={item} />
        ))
      ) : (
        <View style={tw`py-10 items-center justify-center`}>
          <AppText
            variant="body"
            tone="textMute"
            style={tw`font-inter-medium text-center`}
          >
            No activities found
          </AppText>
        </View>
      )}
    </View>
  )
}
