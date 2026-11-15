import { AppText } from "@/components/ui/app-text"
import { Screen } from "@/components/ui/screen"
import tw from "@/lib/tailwind"
import { router, useFocusEffect } from "expo-router"
import { useCallback, useMemo, useState } from "react"
import { ActivityIndicator, FlatList, View } from "react-native"

import { UpdateTopBarPluseLogo } from "@/components/ui/app-top-bar"
import {
  Appointment,
  AppointmentCard,
  AppointmentTabs,
  ApptsAiInsight,
  ApptsEmptyState,
  ApptsHeader,
  ApptsStats,
  CalendarCard,
  Tab,
  TabKey,
} from "../components"
import { formatDateDisplay, formatTimeDisplay } from "../helper"
import {
  AppointmentStatus,
  useAppointmentComplete,
  useAppointments,
} from "../hook"

export default function AppointmentsScreen() {
  const [activeTab, setActiveTab] = useState<TabKey>("upcoming")

  const statusFilter: AppointmentStatus | undefined =
    activeTab === "all" ? undefined : (activeTab as AppointmentStatus)

  const {
    appointments,
    stats,
    isLoading,
    isLoadingMore,
    isRefreshing,
    isEmpty,
    hasMore,
    loadMore,
    fetchInitial,
    onRefresh,
  } = useAppointments({ status: statusFilter })

  const { completeAppointment } = useAppointmentComplete({
    onSuccess: () => {
      fetchInitial()
    },
  })

  // Refetch appointments when the screen regains focus (e.g. after adding an appointment)
  useFocusEffect(
    useCallback(() => {
      fetchInitial()
    }, [fetchInitial])
  )

  // Map API data to Appointment type for the card
  const mappedAppointments: Appointment[] = useMemo(() => {
    return appointments
      .filter((item) => {
        if (activeTab === "all") return true
        const itemStatus = (item.status ?? "upcoming").toLowerCase().trim()
        return itemStatus === activeTab.toLowerCase().trim()
      })
      .map((item) => ({
        id: String(item.id),
        title: item.title ?? "",
        type: item.type ?? "",
        pet: item.pet?.name ?? "",
        date: formatDateDisplay(item.datetime),
        time: formatTimeDisplay(item.datetime),
        clinic: item.location ?? "",
        doctor: item.vet_name ?? "",
        status: item.status ?? "upcoming",
        reminder: item.reminder !== "none" ? item.reminder : undefined,
      }))
  }, [appointments, activeTab])

  const tabs: Tab[] = useMemo(
    () => [
      {
        key: "upcoming",
        label: "Upcoming",
        count: stats.upcoming,
      },
      {
        key: "completed",
        label: "Completed",
        count: stats.completed,
      },
      {
        key: "all",
        label: "All",
      },
    ],
    [stats]
  )

  const handleEndReached = useCallback(() => {
    if (hasMore && !isLoadingMore) {
      loadMore()
    }
  }, [hasMore, isLoadingMore, loadMore])

  return (
    <Screen >
      <UpdateTopBarPluseLogo />
      <FlatList
        data={mappedAppointments}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`pb-10`}
        refreshing={isRefreshing}
        onRefresh={onRefresh}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.3}
        nestedScrollEnabled={false}
        ListHeaderComponent={
          <>
            <ApptsHeader />
            <ApptsStats
              upcomingCount={stats.upcoming}
              completedCount={stats.completed}
              thisMonthCount={stats.this_month}
            />
            <ApptsAiInsight />
            <CalendarCard />
            <AppointmentTabs
              tabs={tabs}
              activeTab={activeTab}
              onChange={setActiveTab}
            />
            <AppText variant="subtitle" style={tw`mb-3 mt-5`}>
              {activeTab === "upcoming"
                ? "Upcoming Appointments"
                : activeTab === "completed"
                  ? "Completed Appointments"
                  : "All Appointments"}
            </AppText>
          </>
        }
        renderItem={({ item }) => (
          <AppointmentCard
            appointment={item}
            onEdit={() => {}}
            onComplete={() => completeAppointment(item.id)}
            onCancel={() => {}}
            onDirections={() => {
              router.push("/appts-dirrection")
            }}
            onAddNote={() => {}}
            onPrepare={() => {}}
          />
        )}
        ListEmptyComponent={
          isLoading ? (
            <View style={tw`items-center py-10`}>
              <ActivityIndicator size="large" />
            </View>
          ) : (
            <ApptsEmptyState />
          )
        }
        ListFooterComponent={
          isLoadingMore ? (
            <View style={tw`items-center py-4`}>
              <ActivityIndicator size="small" />
            </View>
          ) : null
        }
      />
    </Screen>
  )
}

