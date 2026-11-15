import { memo, useCallback, useMemo, useState } from "react"

import { Pressable, View } from "react-native"

import { clander, injectionIcons, time } from "@/assets/icons/icons"
import { AppText } from "@/components/ui/app-text"
import TopBackButton from "@/components/ui/app-top-bar"
import { Button } from "@/components/ui/button"
import { Screen } from "@/components/ui/screen"
import tw from "@/lib/tailwind"
import { router } from "expo-router"
import { SvgXml } from "react-native-svg"

type ReminderStatus = "upcoming" | "completed"

type Reminder = {
  id: string
  title: string
  description: string
  date: string
  remaining?: string
  status: ReminderStatus
}

const REMINDERS: Reminder[] = [
  {
    id: "1",
    title: "DHPP",
    description: "Distemper, Hepatitis, Parvovirus, Parainfluenza",
    date: "15 Aug 2026",
    remaining: "45 days left",
    status: "upcoming",
  },
  {
    id: "2",
    title: "Kennel Cough",
    description: "Kennel Cough vaccination",
    date: "15 Aug 2026",
    remaining: "45 days left",
    status: "upcoming",
  },
  {
    id: "3",
    title: "Rabies",
    description: "Rabies vaccination",
    date: "10 Jul 2026",
    status: "completed",
  },
  {
    id: "4",
    title: "DHPP",
    description: "Annual booster vaccination",
    date: "05 Jul 2026",
    status: "completed",
  },
  {
    id: "5",
    title: "Kennel Cough",
    description: "Annual Kennel Cough vaccine",
    date: "28 Jun 2026",
    status: "completed",
  },
]

type Tab = ReminderStatus

type ReminderCardProps = {
  item: Reminder
  onPress: (item: Reminder) => void
}

const ReminderCard = memo(({ item, onPress }: ReminderCardProps) => {
  const isUpcoming = item.status === "upcoming"

  return (
    <Pressable
      onPress={() => onPress(item)}
      style={({ pressed }) => [
        tw`rounded-[20px] border border-slate-200 bg-white p-5 gap-4`,
        pressed && tw`opacity-70`,
      ]}
    >
      {/* Top Section */}
      <View style={tw`flex-row items-start justify-between gap-3`}>
        <View style={tw`flex-1 flex-row items-center`}>
          {/* Icon */}
          <SvgXml xml={injectionIcons} />

          {/* Content */}
          <View style={tw`flex-1 pl-3 gap-1`}>
            <AppText variant="body" tone="text" style={tw`font-inter-bold`}>
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
        </View>

        {/* Status */}
        <View
          style={[
            tw`rounded-full px-2.5 py-1`,
            isUpcoming ? tw`bg-orange-50` : tw`bg-teal-500/10`,
          ]}
        >
          <AppText
            variant="caption"
            tone={isUpcoming ? "warning" : "success"}
            style={tw`font-inter-bold`}
          >
            {isUpcoming ? "UPCOMING" : "COMPLETED"}
          </AppText>
        </View>
      </View>

      {/* Bottom Section */}
      <View
        style={tw`flex-row items-center justify-between gap-3 border-t border-slate-200 pt-4`}
      >
        <View style={tw`flex-row items-center gap-1.5`}>
          <SvgXml xml={clander} />
          <AppText
            variant="caption"
            tone="grayish"
            style={tw`font-inter-semibold`}
          >
            {item.date}
          </AppText>
        </View>

        {item.remaining && (
          <View style={tw`flex-row items-center gap-1.5`}>
            <SvgXml xml={time} />

            <AppText
              variant="caption"
              tone="warning"
              style={tw`font-inter-semibold`}
            >
              {item.remaining}
            </AppText>
          </View>
        )}
      </View>
    </Pressable>
  )
})

ReminderCard.displayName = "ReminderCard"

export default function VaccinationScreen() {
  const [activeTab, setActiveTab] = useState<Tab>("upcoming")

  const upcomingCount = useMemo(
    () => REMINDERS.filter((item) => item.status === "upcoming").length,
    []
  )

  const completedCount = useMemo(
    () => REMINDERS.filter((item) => item.status === "completed").length,
    []
  )

  const filteredReminders = useMemo(
    () => REMINDERS.filter((item) => item.status === activeTab),
    [activeTab]
  )

  const handleReminderPress = useCallback((item: Reminder) => {
    // router.push({
    //   pathname:
    //     "/(drawer)/vaccination-details",
    //   params: {
    //     id: item.id,
    //     title: item.title,
    //     description:
    //       item.description,
    //     date: item.date,
    //     status: item.status,
    //   },
    // })
  }, [])

  return (
    <Screen>
      <TopBackButton title="Vaccinations" />

      {/* Tabs */}
      <View style={tw`flex-row`}>
        <Pressable
          onPress={() => setActiveTab("upcoming")}
          style={[
            tw`flex-1 items-center `,
            activeTab === "upcoming" && tw`border-b-2 border-teal-600`,
          ]}
        >
          <AppText
            variant="body"
            tone={activeTab === "upcoming" ? "success" : "grayish"}
            style={
              activeTab === "upcoming"
                ? tw`font-inter-bold`
                : tw`font-inter-semibold`
            }
          >
            Upcoming ({upcomingCount})
          </AppText>
        </Pressable>

        <Pressable
          onPress={() => setActiveTab("completed")}
          style={[
            tw`flex-1 items-center py-3`,
            activeTab === "completed" && tw`border-b-2 border-teal-600`,
          ]}
        >
          <AppText
            variant="body"
            tone={activeTab === "completed" ? "success" : "grayish"}
            style={
              activeTab === "completed"
                ? tw`font-inter-bold`
                : tw`font-inter-semibold`
            }
          >
            Completed ({completedCount})
          </AppText>
        </Pressable>
      </View>

      {/* Reminder Cards */}
      <View style={tw`gap-3`}>
        {filteredReminders.map((item) => (
          <ReminderCard
            key={item.id}
            item={item}
            onPress={handleReminderPress}
          />
        ))}
      </View>

      {/* Add Reminder */}
      <View style={tw`items-center py-3`}>
        <Button
          onPress={() => router.push("/new-appointment")}
          label="Add Reminder"
        />
      </View>
    </Screen>
  )
}
