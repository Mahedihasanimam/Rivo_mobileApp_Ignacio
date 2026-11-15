import { AppText } from "@/components/ui/app-text"
import { Card } from "@/components/ui/card"
import tw from "@/lib/tailwind"
import { Image } from "expo-image"
import { router } from "expo-router"
import { Pressable, View } from "react-native"

export type Category = {
  name: string
  lessons: string
  image?: string
}

export const categories: Category[] = [
  {
    name: "Basic",
    lessons: "4 Lessons",
    image: require("@/assets/train/basic.png"),
  },
  {
    name: "Walk",
    lessons: "3 Lessons",
    image: require("@/assets/train/walk.png"),
  },
  {
    name: "Tricks",
    lessons: "3 Lessons",
    image: require("@/assets/train/tricks.png"),
  },
  {
    name: "Behavior",
    lessons: "3 Lessons",
    image: require("@/assets/train/behavior.png"),
  },
]

export const CategoryItem = ({ item }: { item: Category }) => {
  return (
    <View style={tw`flex-1 items-center gap-3`}>
      <Image
        source={item.image || require("@/assets/train/basic.png")}
        style={tw`h-[39px] w-[31px]`}
        contentFit="contain"
      />

      <View style={tw`w-full items-center gap-[1px]`}>
        <AppText
          variant="caption"
          tone="blackish"
          style={tw`text-center font-inter-semibold`}
        >
          {item.name}
        </AppText>

        <AppText
          variant="caption"
          tone="gray"
          style={tw`text-center font-inter-regular`}
        >
          {item.lessons}
        </AppText>
      </View>
    </View>
  )
}

export const TrainCategories = () => {
  return (
    <Card
      radius="xl"
      style={[
        tw`w-full p-3`,
        {
          shadowColor: "#2C78DC",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.08,
          shadowRadius: 12,
          elevation: 3,
        },
      ]}
    >
      {/* Header */}
      <View style={tw`flex-row items-center justify-between`}>
        <AppText variant="body" tone="blackish" style={tw`font-inter-bold `}>
          Categories
        </AppText>

        <Pressable onPress={() => router.push("/(train)")}>
          <AppText
            variant="caption"
            tone="blackish"
            style={tw`font-inter-regular`}
          >
            See All
          </AppText>
        </Pressable>
      </View>

      {/* Categories */}
      <View style={tw`mt-3 flex-row items-center gap-3`}>
        {categories.map((item) => (
          <CategoryItem key={item.name} item={item} />
        ))}
      </View>
    </Card>
  )
}
