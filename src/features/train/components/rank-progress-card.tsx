import { AppText } from "@/components/ui/app-text"
import { Card } from "@/components/ui/card"
import tw from "@/lib/tailwind"
import { Image } from "expo-image"
import { LinearGradient } from "expo-linear-gradient"
import { View } from "react-native"

export function RankProgressCard() {
  const totalTutorials = 30
  const completedTutorials = 23

  const progress = (completedTutorials / totalTutorials) * 100

  return (
    <Card
      radius="lg"
      style={[
        tw`w-full `,
        {
          shadowColor: "#2F9C8F",
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.12,
          shadowRadius: 10,
          elevation: 4,
        },
      ]}
    >
      {/* Top Rank Section */}
      <View style={tw`flex-row items-center`}>
        {/* Rank Image */}
        <Image
          source={require("@/assets/auth-image/home-icon.png")}
          contentFit="contain"
          style={{
            width: 78,
            height: 86,
          }}
        />

        {/* Rank Text */}
        <View style={tw`ml-3`}>
          <AppText
            variant="caption"
            style={tw`font-inter-semibold `}
            tone="primary"
          >
            Rank
          </AppText>

          <AppText variant="title" style={tw`font-inter-bold`} tone="blackish">
            Gold III
          </AppText>
        </View>
      </View>

      {/* Progress Section */}
      <View style={tw`mt-2`}>
        {/* Progress Background */}
        <View
          style={[
            tw`border border-[#00000059]`,
            {
              height: 8,
              width: "100%",
              borderRadius: 999,
              overflow: "hidden",
              backgroundColor: "#F4F6F6",
            },
          ]}
        >
          <LinearGradient
            colors={["rgba(255, 234, 47, 0.4)", "#2F9C8F"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={{
              width: `${progress}%`,
              height: "100%",
              borderRadius: 999,
              shadowColor: "#2F9C8F",
              shadowOffset: {
                width: 0,
                height: 0,
              },
              shadowOpacity: 0.35,
              shadowRadius: 12,
              elevation: 4,
            }}
          />
        </View>

        {/* Progress Info */}
        <View style={tw`mt-2 flex-row items-center justify-between`}>
          <AppText variant="caption" tone="gray">
            7 to Gold II
          </AppText>

          <AppText
            variant="body"
            style={{
              textAlign: "right",
              fontSize: 14,
              lineHeight: 20,
            }}
          >
            <AppText
              variant="body"
              style={{
                color: "#115E59",
                fontFamily: "inter-bold",
                fontSize: 14,
              }}
            >
              {completedTutorials}
            </AppText>

            <AppText
              variant="body"
              style={{
                color: "#14B8A6",
                fontSize: 14,
              }}
            >
              {` / ${totalTutorials} Tutorials`}
            </AppText>
          </AppText>
        </View>
      </View>
    </Card>
  )
}
