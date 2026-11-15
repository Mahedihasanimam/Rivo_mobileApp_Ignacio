import { AppText } from "@/components/ui/app-text"
import { Card } from "@/components/ui/card"
import tw from "@/lib/tailwind"
import { Image } from "expo-image"
import { Pressable, View } from "react-native"

const quickActions = [
  {
    id: "health-vault",
    title: "Health Vault",
    image: require("@/assets/home-image/health-vault.png"),
    imageStyle: "w-9 h-10",
  },
  {
    id: "ai-vet",
    title: "Appts",
    image: require("@/assets/home-image/training-streak.png"),
    imageStyle: "w-9 h-12",
  },
]

export const QuickActions = () => {
  return (
    <Card radius="md" style={tw`w-full flex-col`}>
      {/* Header */}
      <AppText variant="body" tone="blackish" style={tw`font-bold leading-7`}>
        Quick Actions
      </AppText>

      {/* First Row */}
      <View style={tw`flex-row items-start justify-between gap-3`}>
        {quickActions.slice(0, 3).map((action) => (
          <Pressable key={action.id} style={tw`flex-1 items-center gap-3`}>
            <Image
              source={action?.image}
              contentFit="contain"
              style={tw`${action.imageStyle}`}
            />

            <AppText
              variant="caption"
              tone="blackish"
              style={tw`text-center font-bold`}
            >
              {action.title}
            </AppText>
          </Pressable>
        ))}
      </View>

      {/* Second Row */}
      <View style={tw`flex-row items-start gap-3`}>
        {quickActions.slice(3).map((action) => (
          <Pressable key={action.id} style={tw`flex-1 items-center gap-3`}>
            <Image
              source={action.image}
              contentFit="contain"
              style={tw`${action.imageStyle}`}
            />

            <AppText
              variant="caption"
              tone="blackish"
              style={tw`text-center font-bold`}
            >
              {action.title}
            </AppText>
          </Pressable>
        ))}
      </View>
    </Card>
  )
}
