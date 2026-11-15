import { AppText } from "@/components/ui/app-text"
import TopBackButton from "@/components/ui/app-top-bar"
import { Card } from "@/components/ui/card"
import { Screen } from "@/components/ui/screen"
import tw from "@/lib/tailwind"
import { Image } from "expo-image"
import { router } from "expo-router"
import { Pressable, View } from "react-native"

type Category = {
  name: string
  lessons: string
  image?: string
}

const categories: Category[] = [
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

export default function CategoriesScreen() {
  return (
    <Screen>
      <TopBackButton title="Categories" />
      <View style={tw`w-full gap-[9px] `}>
        {categories.map((item) => (
          <LessonCard key={item.name} item={item} />
        ))}
      </View>
    </Screen>
  )
}

const LessonCard = ({ item }: { item: Category }) => {
  return (
    <Pressable
      onPress={() => router.push(`/basic-commands`)}
      style={tw`w-full`}
    >
      <Card radius="md" style={tw`w-full flex-col`}>
        <View style={tw`flex-row items-center gap-4`}>
          {/* Image */}
          <Image
            source={item.image || require("@/assets/train/basic.png")}
            style={tw`h-[39px] w-[31px]`}
            contentFit="contain"
          />

          {/* Content */}
          <View style={tw`flex-col gap-1`}>
            <AppText
              variant="body"
              tone="blackish"
              style={tw`font-inter-semibold`}
            >
              {item.name}
            </AppText>

            <AppText
              variant="caption"
              tone="blackish"
              style={tw`font-inter-regular`}
            >
              {item.lessons}
            </AppText>
          </View>
        </View>
      </Card>
    </Pressable>
  )
}
