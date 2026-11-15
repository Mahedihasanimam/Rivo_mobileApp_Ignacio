import { AppText } from "@/components/ui/app-text"
import TopBackButton from "@/components/ui/app-top-bar"
import { Screen } from "@/components/ui/screen"
import tw from "@/lib/tailwind"
import { appToast } from "@/lib/toast/app-toast"
import { Image } from "expo-image"
import { ActivityIndicator, Pressable, View } from "react-native"
import { SvgXml } from "react-native-svg"
import { useGetLostPetsQuery } from "../api/pet-lost-api"
import { PET_ID } from "@/constants/pet-id"

const locationPinIcon = `
<svg width="14" height="17" viewBox="0 0 14 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.49167 16.7508L6.55 16.7842L6.57333 16.7975C6.76131 16.8991 6.98786 16.8991 7.17583 16.7975L7.19917 16.785L7.25833 16.7508C7.58426 16.5576 7.9023 16.3513 8.21167 16.1325C9.01256 15.5671 9.76087 14.9306 10.4475 14.2308C12.0675 12.5725 13.75 10.0808 13.75 6.875C13.75 3.08058 10.6694 0 6.875 0C3.08058 0 0 3.08058 0 6.875C0 10.08 1.68333 12.5725 3.3025 14.2308C3.98887 14.9306 4.73689 15.567 5.5375 16.1325C5.84714 16.3513 6.16545 16.5576 6.49167 16.7508ZM6.875 9.375C8.25479 9.375 9.375 8.25479 9.375 6.875C9.375 5.49521 8.25479 4.375 6.875 4.375C5.49521 4.375 4.375 5.49521 4.375 6.875C4.375 8.25479 5.49521 9.375 6.875 9.375Z" fill-rule="evenodd" clip-rule="evenodd" fill="#1F2937"/>
</svg>

`

const clockCalendarIcon = `
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 1.875C5.5125 1.875 1.875 5.5125 1.875 10C1.875 14.4875 5.5125 18.125 10 18.125C14.4875 18.125 18.125 14.4875 18.125 10C18.125 5.5125 14.4875 1.875 10 1.875V1.875M10.625 5C10.625 4.65505 10.3449 4.375 10 4.375C9.65505 4.375 9.375 4.65505 9.375 5V10C9.375 10.345 9.655 10.625 10 10.625H13.75C14.0949 10.625 14.375 10.3449 14.375 10C14.375 9.65505 14.0949 9.375 13.75 9.375H10.625V5V5" fill-rule="evenodd" clip-rule="evenodd" fill="#1F2937"/>
</svg>

`

const shareIcon = `
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="18" cy="5" r="3"/>
  <circle cx="6" cy="12" r="3"/>
  <circle cx="18" cy="19" r="3"/>
  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
</svg>
`

export default function PreviewPoster() {
  const { data, isLoading, isError, refetch } = useGetLostPetsQuery(
    { petId: PET_ID },
    { refetchOnMountOrArgChange: true }
  )

  const report = data?.data

  const handleShare = () => {
    appToast.success("Poster shared!", {
      description: "Lost pet poster saved and ready for broadcast.",
    })
  }

  const formatDisplayDate = (dateStr?: string) => {
    if (!dateStr) return "N/A"
    const parts = dateStr.split("-")
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10)
      const month = parseInt(parts[1], 10) - 1
      const day = parseInt(parts[2], 10)
      const d = new Date(year, month, day)
      return d.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    }
    return dateStr
  }

  const formatDisplayTime = (timeStr?: string) => {
    if (!timeStr) return "N/A"
    const parts = timeStr.split(":")
    if (parts.length >= 2) {
      let hours = parseInt(parts[0], 10)
      const minutes = parts[1]
      const ampm = hours >= 12 ? "PM" : "AM"
      hours = hours % 12
      hours = hours ? hours : 12
      const formattedHours = String(hours).padStart(2, "0")
      return `${formattedHours}:${minutes} ${ampm}`
    }
    return timeStr
  }

  const formattedReward = report?.reward_amount
    ? typeof report.reward_amount === "number"
      ? `$${report.reward_amount}`
      : String(report.reward_amount).startsWith("$")
        ? report.reward_amount
        : `$${report.reward_amount}`
    : "$500"

  const imageUri =
    report?.last_seen_photo_url ||
    "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=400"

  return (
    <Screen>
      <TopBackButton title="Preview Poster" />

      {isLoading ? (
        <View style={tw`flex-1 items-center justify-center py-24`}>
          <ActivityIndicator size="large" color="#0D9488" />
          <AppText
            variant="caption"
            tone="gray"
            style={tw`font-inter-medium mt-3 text-sm`}
          >
            Loading active lost report...
          </AppText>
        </View>
      ) : isError || !report ? (
        <View style={tw`flex-1 items-center justify-center py-24 px-6 gap-3`}>
          <AppText
            variant="body"
            tone="blackish"
            style={tw`font-inter-semibold text-base text-center`}
          >
            No active lost report found
          </AppText>
          <AppText
            variant="caption"
            tone="gray"
            style={tw`font-inter-regular text-sm text-center`}
          >
            There is currently no active lost report for this pet.
          </AppText>
          <Pressable
            onPress={() => refetch()}
            style={({ pressed }) => [
              tw`mt-2 px-5 py-2.5 bg-teal-600 rounded-full`,
              pressed && tw`opacity-80`,
            ]}
          >
            <AppText variant="body" tone="textWhite" style={tw`font-inter-medium text-sm`}>
              Retry
            </AppText>
          </Pressable>
        </View>
      ) : (
        <View
          style={[
            tw`gap-6 p-3 items-center shadow-sm border-red-600`,
            {
              shadowOffset: { width: 0, height: 6 },
              shadowRadius: 26,
              borderBlockColor : "#000000"
            },
          ]}
        >
          {/* Outer Red Frame with Red Drop Shadow */}
          <View>
            {/* Inner Poster Content Box */}
            <View style={tw`w-full p-3 items-center gap-4`}>
              {/* Lost Pet Header */}
              <AppText
                variant="hero"
                tone="danger"
                style={tw`font-inter-bold text-3xl uppercase tracking-wider text-center text-red-600`}
              >
                LOST PET
              </AppText>

              {/* Pet Image */}
              <View
                style={tw`w-56 h-48 rounded-2xl overflow-hidden bg-gray-100 border border-black/10`}
              >
                <Image
                  source={{ uri: imageUri }}
                  style={tw`w-full h-full`}
                  contentFit="cover"
                />
              </View>

              {/* Breed / Contact Info */}
              {report?.user?.name ? (
                <AppText
                  variant="body"
                  tone="text"
                  style={tw`font-inter-semibold text-sm text-center text-gray-800`}
                >
                  Contact: {report.user.name}
                </AppText>
              ) : (
                <AppText
                  variant="body"
                  tone="text"
                  style={tw`font-inter-semibold text-sm text-center text-gray-800`}
                >
                  Domestic Shorthair • Male • 2 Years
                </AppText>
              )}

              {/* Location & Time Info Grid */}
              <View
                style={tw`w-full border-t border-b border-black/10 py-3 flex-row justify-between items-start gap-4`}
              >
                {/* Last Seen Location */}
                <View style={tw`flex-1 flex-row items-start gap-2`}>
                  <View style={tw`pt-0.5`}>
                    <SvgXml xml={locationPinIcon} width={18} height={18} />
                  </View>
                  <View style={tw`gap-0.5 flex-1`}>
                    <AppText
                      variant="caption"
                      tone="gray"
                      style={tw`font-inter-bold text-[10px] uppercase tracking-wide text-gray-500`}
                    >
                      LAST SEEN LOCATION
                    </AppText>
                    <AppText
                      variant="caption"
                      tone="blackish"
                      style={tw`font-inter-semibold text-xs text-gray-900`}
                    >
                      {report?.last_seen_location || "Unknown"}
                    </AppText>
                  </View>
                </View>

                {/* Date & Time */}
                <View style={tw`flex-1 flex-row items-start gap-2`}>
                  <View style={tw`pt-0.5`}>
                    <SvgXml xml={clockCalendarIcon} width={18} height={18} />
                  </View>
                  <View style={tw`gap-0.5 flex-1`}>
                    <AppText
                      variant="caption"
                      tone="gray"
                      style={tw`font-inter-bold text-[10px] uppercase tracking-wide text-gray-500`}
                    >
                      DATE & TIME
                    </AppText>
                    <AppText
                      variant="caption"
                      tone="blackish"
                      style={tw`font-inter-semibold text-xs text-gray-900`}
                    >
                      {formatDisplayDate(report?.last_seen_date)} •{"\n"}
                      {formatDisplayTime(report?.last_seen_time)}
                    </AppText>
                  </View>
                </View>
              </View>

              {/* Description */}
              <AppText
                variant="body"
                tone="text"
                style={tw`font-inter-medium text-sm text-center text-gray-800 px-2 leading-5`}
              >
                {report?.additional_info || "Please help us locate our lost pet."}
              </AppText>

              {/* Reward Banner */}
              <AppText
                variant="subtitle"
                tone="primary"
                style={tw`font-inter-bold text-lg text-teal-600 text-center tracking-tight`}
              >
                REWARD OFFERED: {formattedReward}
              </AppText>

              {/* Help Callout Banner */}
              <View
                style={tw`w-full bg-teal-600 rounded-full py-3.5 px-4 items-center justify-center`}
              >
                <AppText
                  variant="body"
                  tone="textWhite"
                  style={tw`font-inter-bold text-sm uppercase tracking-tight text-center`}
                >
                  PLEASE HELP US FIND OUR PET!
                </AppText>
              </View>
            </View>
          </View>
        </View>
      )}
    </Screen>
  )
}
