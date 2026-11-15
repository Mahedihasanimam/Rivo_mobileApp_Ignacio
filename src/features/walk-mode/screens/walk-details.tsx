import { blackShareIcon, shareIcon, sunIcon } from "@/assets/icons/icons"
import { AppText } from "@/components/ui/app-text"
import TopBackButton from "@/components/ui/app-top-bar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import tw from "@/lib/tailwind"
import { useAppTheme } from "@/theme/theme-provider"
import { View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { SvgXml } from "react-native-svg"

const roadStyle = [
  { elementType: "geometry", stylers: [{ color: "#ebe3cd" }] },

  {
    featureType: "road.local",
    elementType: "geometry",
    stylers: [{ color: "#f8c967" }],
  },

  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#f8c967" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#e9bc62" }],
  },

  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [{ color: "#fdfcf8" }],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry.stroke",
    stylers: [{ color: "#f3d191" }],
  },

  {
    featureType: "poi.park",
    elementType: "geometry.fill",
    stylers: [{ color: "#a5b076" }],
  },

  {
    featureType: "water",
    elementType: "geometry.fill",
    stylers: [{ color: "#b9d3c2" }],
  },
]

export default function WalkDetailsScreen() {
  const { colors, spacing } = useAppTheme()
  const insets = useSafeAreaInsets()

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        paddingTop: Math.max(insets.top + spacing.md, spacing.xl),
        // paddingBottom: Math.max(insets.bottom + spacing.xl, spacing.xxl),
      }}
    >
      {/* Top Bar */}
      <View style={tw`px-4 py-2`}>
        <TopBackButton newTopBarExtra={false} title="Walk Details" />
      </View>

      {/* Map */}
      <View style={tw`flex-1`}>
        {/* <MapView
          provider={PROVIDER_GOOGLE}
          style={tw`flex-1`}
          customMapStyle={roadStyle}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        /> */}
      </View>

      {/* Walk Details */}
      <WalkDetailsCard
        title="Morning Walk"
        date="May 20, 2026 - 7:30 AM"
        status="Goal Completed"
        distance="2.35"
        duration="00:24:18"
        calories="210"
        dogName="Butch"
        routeLabel="Saved Route"
        onShare={() => {
          console.log("Share walk")
        }}
      />
    </View>
  )
}

type WalkDetailsCardProps = {
  title?: string
  date?: string
  status?: string
  distance?: string
  duration?: string
  calories?: string
  dogName?: string
  routeLabel?: string
  onShare?: () => void
}

const WalkDetailsCard = ({
  title = "Morning Walk",
  date = "May 20, 2026 - 7:30 AM",
  status = "Goal Completed",
  distance = "2.35",
  duration = "00:24:18",
  calories = "210",
  dogName = "Butch",
  routeLabel = "Saved Route",
  onShare,
}: WalkDetailsCardProps) => {
  const { resolvedTheme } = useAppTheme()

  const isDarkMode = resolvedTheme === "dark"

  return (
    <Card style={tw`w-full gap-6  rounded-t-3xl px-6 pt-6`}>
      {/* Header */}
      <View style={tw`w-full gap-1`}>
        <View style={tw`w-full flex-row items-start justify-between`}>
          <View style={tw`flex-1 pr-2`}>
            <AppText
              variant="title"
              tone="blackish"
              style={tw`font-inter-bold`}
            >
              {title}
            </AppText>

            <AppText
              variant="caption"
              tone="gray"
              style={tw`mt-1 font-inter-medium`}
            >
              {date}
            </AppText>
          </View>

          {/* Status */}
          <View style={tw`rounded-full bg-emerald-50 px-3 py-1.5`}>
            <AppText
              variant="caption"
              tone="success"
              style={tw`font-inter-bold`}
            >
              {status}
            </AppText>
          </View>
        </View>
      </View>

      {/* Statistics */}
      <View
        style={tw`w-full flex-row items-center border-b border-zinc-200 py-4`}
      >
        <StatItem value={distance} label="DISTANCE (KM)" />

        <View style={tw`h-10 w-px bg-neutral-300`} />

        <StatItem value={duration} label="DURATION" />

        <View style={tw`h-10 w-px bg-neutral-300`} />

        <StatItem value={calories} label="CALORIES (KCAL)" />
      </View>

      {/* Route Preview */}
      <View
        style={[
          tw`h-40 w-full overflow-hidden rounded-2xl bg-white`,
          {
            borderWidth: 0.73,
            borderColor: "rgba(0,0,0,0.1)",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.08,
            shadowRadius: 3,
            elevation: 2,
          },
        ]}
      >
        <View style={tw`flex-1 bg-gray-50/40`}>
          {/* TODO: Replace this with your actual MapView / route preview */}
          <RoutePreview dogName={dogName} routeLabel={routeLabel} />

          {/* Weather */}
          <View style={tw`absolute right-2 top-2 flex-row items-center gap-1`}>
            <AppText
              variant="caption"
              tone="blackish"
              style={tw`font-inter-regular`}
            >
              ☀️
            </AppText>

            <View
              style={tw`h-7 w-7 items-center justify-center rounded-full bg-gray-50/80`}
            >
              <SvgXml xml={sunIcon} width={14} height={14} />
            </View>
          </View>

          {/* Dog */}
          <View
            style={tw`absolute left-2 top-2 rounded-full bg-gray-50/80 px-2 py-1`}
          >
            <AppText
              variant="caption"
              tone="blackish"
              style={tw`font-inter-semibold`}
            >
              {dogName}
            </AppText>
          </View>

          {/* Route Label */}
          <View
            style={tw`absolute bottom-2 left-2 rounded-full bg-amber-500/90 px-2 py-0.5`}
          >
            <AppText
              variant="caption"
              tone="textWhite"
              style={tw`font-inter-semibold`}
            >
              {routeLabel}
            </AppText>
          </View>
        </View>
      </View>

      {/* Share */}
      <Button
        leftIcon={isDarkMode ? blackShareIcon : shareIcon}
        variant="ghost"
        label="   Share to Social Feed"
      />
    </Card>
  )
}

type StatItemProps = {
  value: string
  label: string
}

const StatItem = ({ value, label }: StatItemProps) => {
  return (
    <View style={tw`flex-1 items-center justify-center`}>
      <AppText variant="title" tone="blackish" style={tw`font-inter-bold`}>
        {value}
      </AppText>

      <AppText
        variant="caption"
        tone="gray"
        style={tw`mt-1 font-inter-semibold uppercase`}
      >
        {label}
      </AppText>
    </View>
  )
}

type RoutePreviewProps = {
  dogName: string
  routeLabel: string
}

const RoutePreview = ({ dogName, routeLabel }: RoutePreviewProps) => {
  return (
    <View style={tw`flex-1 items-center justify-center`}>
      {/* Route rings / route placeholder */}
      <View
        style={[
          tw`h-28 w-32 rounded-2xl border-2 border-teal-600`,
          {
            opacity: 0.9,
          },
        ]}
      />

      <View
        style={[
          tw`absolute h-28 w-32 rounded-2xl border-4 border-teal-600`,
          {
            opacity: 0.1,
          },
        ]}
      />

      {/* Route points */}
      <View
        style={tw`absolute left-[52%] top-[43%] h-2 w-2 rounded-full bg-red-500`}
      />

      <View
        style={tw`absolute left-[60%] top-[43%] h-2 w-2 rounded-full bg-emerald-500`}
      />
    </View>
  )
}
