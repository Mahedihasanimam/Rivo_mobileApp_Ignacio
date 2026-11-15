import { AppText } from "@/components/ui/app-text"
import tw from "@/lib/tailwind"
import { Pressable, ScrollView, View } from "react-native"
import { Tab, TabKey } from "./types"

export function AppointmentTabs({
  tabs,
  activeTab,
  onChange,
}: {
  tabs: Tab[]
  activeTab: TabKey
  onChange: (tab: TabKey) => void
}) {
  return (
    <View style={tw`mt-5`}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={tw`gap-2`}
      >
        {tabs.map((tab) => {
          const active = activeTab === tab.key

          return (
            <Pressable
              key={tab.key}
              onPress={() => onChange(tab.key)}
              style={[
                tw`flex-row items-center rounded-full px-[18px] py-[10px]`,
                active ? tw`bg-primary` : tw`bg-[#F0F4F3]`,
              ]}
            >
              <AppText
                variant="caption"
                style={[
                  tw`font-inter-semibold`,
                  active ? tw`text-white` : tw`text-black/60`,
                ]}
              >
                {tab.label}
              </AppText>

              {tab.count !== undefined && (
                <View
                  style={[
                    tw`ml-2 min-w-5 items-center rounded-full px-1`,
                    active ? tw`bg-white/30` : tw`bg-black/5`,
                  ]}
                >
                  <AppText
                    variant="caption"
                    style={[
                      tw`text-[11px] font-bold`,
                      active ? tw`text-white` : tw`text-black/60`,
                    ]}
                  >
                    {tab.count}
                  </AppText>
                </View>
              )}
            </Pressable>
          )
        })}
      </ScrollView>
    </View>
  )
}
