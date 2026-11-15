import { View } from "react-native"
import { SvgXml } from "react-native-svg"

import { locationPrimary } from "@/assets/icons/icons"
import { AppText } from "@/components/ui/app-text"
import { Card } from "@/components/ui/card"
import tw from "@/lib/tailwind"

const mostWalkedAreas = [
  {
    name: "Riverside Loop area",
    percentage: 62,
    color: "#2F9C8F",
  },
  {
    name: "Roadside North",
    percentage: 24,
    color: "#10B981",
  },
  {
    name: "Neighborhood block",
    percentage: 14,
    color: "#F59E0B",
  },
]

const walkingPatterns = [
  {
    label: "Preferred time",
    value: "7:00 - 8:30 AM",
  },
  {
    label: "Most active day",
    value: "Saturday",
  },
  {
    label: "Avg walk distance",
    value: "3.1 km",
  },
  {
    label: "Walk streak",
    value: "6 days",
  },
]

const HeatmapScreen = () => {
  return (
    <View style={tw`w-full gap-5 pb-10 pt-5`}>
      {/* Most Walked Areas */}
      <Card
        radius="md"
        style={[
          tw`w-full p-4`,
          {
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.08,
            shadowRadius: 3,
            elevation: 3,
            borderWidth: 0.73,
            borderColor: "rgba(0,0,0,0.1)",
          },
        ]}
      >
        {/* Header */}
        <View style={tw`flex-row items-center gap-2`}>
          <SvgXml xml={locationPrimary} />

          <AppText
            variant="body"
            tone="blackish"
            style={tw`font-inter-semibold`}
          >
            Most Walked Areas
          </AppText>
        </View>

        {/* Areas */}
        <View style={tw`mt-3 w-full gap-3`}>
          {mostWalkedAreas.map((area) => (
            <View key={area.name} style={tw`w-full`}>
              {/* Label + Percentage */}
              <View style={tw`w-full flex-row items-center justify-between`}>
                <AppText
                  variant="caption"
                  tone="blackish"
                  style={tw`font-inter-medium`}
                >
                  {area.name}
                </AppText>

                <AppText
                  variant="caption"
                  style={[
                    tw`font-inter-bold`,
                    {
                      color: area.color,
                    },
                  ]}
                >
                  {area.percentage}%
                </AppText>
              </View>

              {/* Progress */}
              <View
                style={tw`mt-1 h-2 w-full overflow-hidden rounded-full bg-gray-100`}
              >
                <View
                  style={[
                    tw`h-2 rounded-full`,
                    {
                      width: `${area.percentage}%`,
                      backgroundColor: area.color,
                    },
                  ]}
                />
              </View>
            </View>
          ))}
        </View>
      </Card>

      {/* Walking Patterns */}
      <Card
        radius="md"
        style={[
          tw`w-full p-4`,
          {
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.08,
            shadowRadius: 3,
            elevation: 3,
            borderWidth: 0.73,
            borderColor: "rgba(0,0,0,0.1)",
          },
        ]}
      >
        <AppText variant="body" tone="blackish" style={tw`font-inter-semibold`}>
          Walking Patterns
        </AppText>

        <View style={tw`mt-3 w-full`}>
          {walkingPatterns.map((item) => (
            <View
              key={item.label}
              style={tw`w-full flex-row items-center justify-between pt-3`}
            >
              <AppText
                variant="body"
                tone="gray"
                style={tw`font-inter-regular`}
              >
                {item.label}
              </AppText>

              <AppText
                variant="body"
                tone="blackish"
                style={tw`font-inter-semibold`}
              >
                {item.value}
              </AppText>
            </View>
          ))}
        </View>
      </Card>
    </View>
  )
}

export default HeatmapScreen
