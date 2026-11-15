import { resumeWalk } from "@/assets/icons/icons"
import { AppText } from "@/components/ui/app-text"
import TopBackButton from "@/components/ui/app-top-bar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import tw from "@/lib/tailwind"
import { useAppTheme } from "@/theme/theme-provider"
import { router } from "expo-router"
import { View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

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

export default function WalkStartScreen() {
  const { colors, spacing } = useAppTheme()
  const insets = useSafeAreaInsets()

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        paddingTop: Math.max(insets.top + spacing.md, spacing.xl),
        paddingBottom: Math.max(insets.bottom + spacing.xl, spacing.xxl),
      }}
    >
      {/* Top Bar */}
      <View style={tw`px-4 `}>
        <TopBackButton newTopBarExtra={false} title="Walk Start" />
      </View>

      {/* Remaining Screen */}
      <View style={tw`flex-1 relative`}>
        {/* <MapView
          provider={PROVIDER_GOOGLE}
          style={tw`h-[80%]`}
          customMapStyle={roadStyle}

          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        /> */}
      </View>
      <View
        style={[tw`w-full flex-row gap-3`, { paddingHorizontal: spacing.xl }]}
      >
        <View style={tw`flex-1`}>
          <Button
            leftIcon={resumeWalk}
            onPress={() => router.push("/(walk-mode)/walk-start")}
            label="Resume Walk"
          />
        </View>

        <View style={tw`flex-1`}>
          <Button
            onPress={() => router.push("/(walk-mode)/end-walk")}
            label="End Walk"
            variant="ghost"
          />
        </View>
      </View>

      <View
        style={[
          tw`mt-4 absolute bottom-30 w-full`,
          { paddingHorizontal: spacing.sm },
        ]}
      >
        <GoalProgress />
      </View>
    </View>
  )
}

const GoalProgress = () => {
  return (
    <Card
      radius="xl"
      style={[
        tw`w-full  p-6 items-center justify-center`,
        {
          // minHeight: 224,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 8,
          },
          shadowOpacity: 0.1,
          shadowRadius: 12,
          elevation: 5,
        },
      ]}
    >
      {/* Header */}
      <View style={tw`w-full flex-row items-end justify-between`}>
        <AppText variant="subtitle" tone="blackish" style={tw`font-inter-bold`}>
          Goal Progress
        </AppText>

        <AppText
          variant="body"
          tone="grayish"
          style={tw`font-inter-regular text-sm`}
        >
          2.5 km Goal
        </AppText>
      </View>

      {/* Progress Value */}
      <View style={tw`mt-4 w-full flex-row items-end justify-between`}>
        <View style={tw`flex-row items-end`}>
          <AppText variant="title" tone="blackish" style={tw`font-inter-bold`}>
            1.60
          </AppText>

          <AppText
            variant="subtitle"
            tone="gray"
            style={tw`ml-1 font-inter-bold`}
          >
            / 2.50 km
          </AppText>
        </View>

        <AppText variant="title" tone="primary" style={tw`font-inter-bold`}>
          64%
        </AppText>
      </View>

      {/* Progress Bar */}
      <View
        style={tw`mt-4 h-2 w-full overflow-hidden rounded-full bg-zinc-200`}
      >
        <View
          style={[
            tw`h-2 rounded-full`,
            {
              width: "64%",
              backgroundColor: "#2F9C8F",
              shadowColor: "#2F9C8F",
              shadowOffset: {
                width: 0,
                height: 0,
              },
              shadowOpacity: 0.35,
              shadowRadius: 6,
              elevation: 3,
            },
          ]}
        />
      </View>

      {/* Statistics */}
      <View style={tw`w-full flex-row gap-2 pt-2`}>
        {/* Time */}
        <View style={tw`flex-1 items-center`}>
          <AppText
            variant="body"
            tone="blackish"
            style={tw`font-inter-regular`}
          >
            00:24:18
          </AppText>

          <AppText
            variant="caption"
            tone="grayish"
            style={tw`font-inter-regular uppercase`}
          >
            TIME
          </AppText>
        </View>

        {/* KM */}
        <View style={tw`flex-1 items-center`}>
          <AppText variant="body" tone="blackish" style={tw`font-inter-bold`}>
            2.35
          </AppText>

          <AppText
            variant="caption"
            tone="grayish"
            style={tw`font-inter-regular uppercase`}
          >
            KM
          </AppText>
        </View>

        {/* Speed */}
        <View style={tw`flex-1 items-center`}>
          <AppText variant="body" tone="blackish" style={tw`font-inter-bold`}>
            6.2
          </AppText>

          <AppText
            variant="caption"
            tone="grayish"
            style={tw`font-inter-regular uppercase`}
          >
            KM/H
          </AppText>
        </View>

        {/* Calories */}
        <View style={tw`flex-1 items-center`}>
          <AppText variant="body" tone="primary" style={tw`font-inter-regular`}>
            210
          </AppText>

          <AppText
            variant="caption"
            tone="grayish"
            style={tw`font-inter-regular uppercase`}
          >
            KCAL
          </AppText>
        </View>
      </View>
    </Card>
  )
}
