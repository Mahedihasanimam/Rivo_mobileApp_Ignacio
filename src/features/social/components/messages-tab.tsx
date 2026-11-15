import { dogChatIcon } from "@/assets/icons/icons"
import { AppText } from "@/components/ui/app-text"
import { Card } from "@/components/ui/card"
import tw from "@/lib/tailwind"
import { router } from "expo-router"
import { Image, Pressable, View } from "react-native"
import { SvgXml } from "react-native-svg"
import { MESSAGES } from "../data/social-data"

export const MessagesTab = () => {
  return (
    <View style={tw`gap-3 pb-6`}>
      {MESSAGES.map((msg) => (
        <Card key={msg.id} radius="md" style={tw`p-0 overflow-hidden`}>
          <Pressable
            onPress={() => router.push("/pet-chat")}
            style={({ pressed }) => [
              tw`flex-row items-center gap-3 p-3.5`,
              pressed && tw`opacity-70`,
            ]}
          >
            <View style={tw`relative`}>
              <Image
                source={{ uri: msg.avatar }}
                style={tw`h-12 w-12 rounded-full`}
              />
              {msg.online && (
                <View style={tw`absolute top-0 -left-2 `}>
                  <SvgXml xml={dogChatIcon} />
                </View>
              )}
            </View>

            <View style={tw`flex-1`}>
              <View style={tw`flex-row items-center justify-between`}>
                <AppText
                  variant="body"
                  tone="blackish"
                  style={tw`font-inter-bold`}
                >
                  {msg.ownerName} & {msg.petName}
                </AppText>
                <AppText
                  variant="caption"
                  tone="textMute"
                  style={tw`font-inter-regular text-xs`}
                >
                  {msg.time}
                </AppText>
              </View>

              <AppText
                variant="caption"
                tone={msg.unreadCount > 0 ? "blackish" : "textMute"}
                numberOfLines={1}
                style={
                  msg.unreadCount > 0
                    ? tw`font-inter-semibold mt-1`
                    : tw`font-inter-regular mt-1`
                }
              >
                {msg.lastMessage}
              </AppText>
            </View>

            {msg.unreadCount > 0 && (
              <View
                style={tw`h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5`}
              >
                <AppText
                  variant="caption"
                  tone="textWhite"
                  style={tw`font-inter-bold text-xs`}
                >
                  {msg.unreadCount}
                </AppText>
              </View>
            )}
          </Pressable>
        </Card>
      ))}
    </View>
  )
}
