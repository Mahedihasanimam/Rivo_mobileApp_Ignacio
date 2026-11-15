import { dubboLag, leftArrow, sendIcons, threeDot } from "@/assets/icons/icons"
import { AppText } from "@/components/ui/app-text"
import tw from "@/lib/tailwind"
import { spacing } from "@/theme/spacing"
import { memo, useCallback, useMemo, useState } from "react"

import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  TextInput,
  View,
} from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { SvgXml } from "react-native-svg"

type MessageType = "text" | "activity"

type Message = {
  id: string
  type: MessageType
  message?: string
  time: string
  isMine: boolean
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    type: "text",
    message: "Hey! Saw Luna completed a 4.2 km walk today 🐾 That's amazing!",
    time: "10:28 AM",
    isMine: false,
  },
  {
    id: "2",
    type: "text",
    message:
      "Thanks! She's been crushing it lately. Just hit her 7-day streak too 🔥",
    time: "10:30 AM",
    isMine: true,
  },
  {
    id: "3",
    type: "activity",
    time: "10:32 AM",
    isMine: false,
  },
  {
    id: "4",
    type: "text",
    message: "That's a great route! We should try it together sometime",
    time: "10:33 AM",
    isMine: true,
  },
  {
    id: "5",
    type: "text",
    message: "Would love that! How about this Saturday morning?",
    time: "10:35 AM",
    isMine: false,
  },
  {
    id: "6",
    type: "text",
    message: "Saturday works perfectly. 8am at the park entrance? 🌅",
    time: "10:37 AM",
    isMine: true,
  },
]

const QUICK_REPLIES = [
  "Sounds great! 🎉",
  "See you then 🐾",
  "That's awesome!",
  "👍",
]

type ChatMessageProps = {
  item: Message
}

const ChatMessage = memo(({ item }: ChatMessageProps) => {
  if (item.type === "activity") {
    return (
      <View style={tw`flex-row items-start gap-2`}>
        {/* Avatar */}
        <View style={tw`rounded-full overflow-hidden bg-gray-200`}>
          <Image
            source={{
              uri: "https://i.pravatar.cc/100?img=47",
            }}
            style={tw`w-7 h-7`}
          />
        </View>

        {/* Activity Card */}
        <Pressable
          style={({ pressed }) => [
            tw`flex-1 rounded-2xl border border-[#30B0C7]/20 bg-[#30B0C7]/5 overflow-hidden`,
            pressed && tw`opacity-70`,
          ]}
        >
          <View style={tw`flex-row items-center gap-3 px-3 py-3`}>
            <View
              style={tw`items-center justify-center rounded-full bg-[#30B0C7]/10 p-2`}
            >
              <AppText
                variant="body"
                tone="text"
                style={tw`font-inter-regular`}
              >
                🚶
              </AppText>
            </View>

            <View style={tw`flex-1`}>
              <AppText
                variant="caption"
                tone="info"
                style={tw`font-inter-bold`}
              >
                ACTIVITY
              </AppText>

              <AppText
                variant="caption"
                tone="text"
                style={tw`font-inter-semibold`}
              >
                Shared a walk route
              </AppText>
            </View>
          </View>

          <View style={tw`border-t border-[#30B0C7]/15 px-3 py-2`}>
            <AppText
              variant="caption"
              tone="info"
              style={tw`font-inter-semibold`}
            >
              View Activity →
            </AppText>
          </View>
        </Pressable>
      </View>
    )
  }

  return (
    <View
      style={[tw`flex-row`, item.isMine ? tw`justify-end` : tw`justify-start`]}
    >
      {!item.isMine && (
        <View style={tw`mr-2`}>
          <View style={tw`rounded-full overflow-hidden bg-gray-200`}>
            <Image
              source={{
                uri: "https://i.pravatar.cc/100?img=47",
              }}
              style={tw`w-7 h-7`}
            />
          </View>
        </View>
      )}

      <View
        style={[
          tw`max-w-[82%] rounded-2xl px-3 py-2`,
          item.isMine
            ? tw`bg-[#2F9C8F]`
            : tw`border border-black/10 bg-[#F7FAF9]`,
        ]}
      >
        <AppText
          variant="body"
          tone={item.isMine ? "textWhite" : "text"}
          style={tw`font-inter-regular`}
        >
          {item.message}
        </AppText>

        <View
          style={[
            tw`flex-row items-center gap-1 pt-1`,
            item.isMine ? tw`justify-end` : tw`justify-start`,
          ]}
        >
          <AppText
            variant="caption"
            tone={item.isMine ? "textWhite" : "grayish"}
            style={[tw`font-inter-regular`, item.isMine && tw`opacity-60`]}
          >
            {item.time}
          </AppText>

          {/* {item.isMine && (
            <Ionicons
              name="checkmark-done"
              size={13}
              color="rgba(255,255,255,0.65)"
            />
          )} */}
        </View>
      </View>
    </View>
  )
})

ChatMessage.displayName = "ChatMessage"

export default function PetChatScreen() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES)

  const [message, setMessage] = useState("")

  const quickReplies = useMemo(() => QUICK_REPLIES, [])

  const sendMessage = useCallback(
    (text?: string) => {
      const value = text ?? message

      if (!value.trim()) return

      const newMessage: Message = {
        id: Date.now().toString(),
        type: "text",
        message: value.trim(),
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isMine: true,
      }

      setMessages((previous) => [...previous, newMessage])

      setMessage("")
    },
    [message]
  )

  const renderItem = useCallback(
    ({ item }: { item: Message }) => <ChatMessage item={item} />,
    []
  )

  const keyExtractor = useCallback((item: Message) => item.id, [])
  const insets = useSafeAreaInsets()

  return (
    <KeyboardAvoidingView
      style={[
        tw`flex-1 pt-40 bg-white`,
        {
          paddingTop: Math.max(insets.top + spacing.md, spacing.xl),
        },
      ]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {/* Header */}
      <View
        style={tw`flex-row items-center gap-3 border-b border-black/10 px-4 py-3`}
      >
        <Pressable
          style={({ pressed }) => [
            tw`items-center justify-center rounded-full border border-black/10 bg-[#F7FAF9] p-2`,
            pressed && tw`opacity-70`,
          ]}
        >
          <SvgXml xml={leftArrow} />
        </Pressable>

        {/* Avatar */}
        <View style={tw`gap-1`}>
          <View style={tw`rounded-full overflow-hidden bg-gray-200`}>
            <Image
              source={{
                uri: "https://i.pravatar.cc/100?img=47",
              }}
              style={tw`w-10 h-10`}
            />
          </View>

          <View
            style={tw`self-end rounded-full border-2 border-white bg-green-500 p-1`}
          />
        </View>

        {/* User Info */}
        <View style={tw`flex-1`}>
          <AppText variant="body" tone="text" style={tw`font-inter-bold`}>
            Luna
          </AppText>

          <AppText
            variant="caption"
            tone="grayish"
            style={tw`font-inter-regular`}
          >
            Sarah M. · Active now
          </AppText>
        </View>

        <Pressable
          style={({ pressed }) => [
            tw`items-center justify-center rounded-full border border-black/10 bg-[#F7FAF9] p-2`,
            pressed && tw`opacity-70`,
          ]}
        >
          <SvgXml xml={threeDot} />
        </Pressable>
      </View>

      {/* Chat */}
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`px-4 py-4 gap-3`}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={7}
        removeClippedSubviews
        ListHeaderComponent={
          <View style={tw`flex-row items-center gap-3 pb-3`}>
            <View style={tw`h-px flex-1 bg-black/10`} />

            <AppText
              variant="caption"
              tone="grayish"
              style={tw`font-inter-semibold`}
            >
              TODAY
            </AppText>

            <View style={tw`h-px flex-1 bg-black/10`} />
          </View>
        }
      />

      {/* Quick Replies */}
      <View style={tw`border-t border-black/10 py-2`}>
        <FlatList
          horizontal
          data={quickReplies}
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={tw`gap-2 px-4`}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => sendMessage(item)}
              style={({ pressed }) => [
                tw`rounded-full border border-black/10 bg-[#F7FAF9] px-3 py-2`,
                pressed && tw`opacity-70`,
              ]}
            >
              <AppText
                variant="caption"
                tone="text"
                style={tw`font-inter-medium`}
              >
                {item}
              </AppText>
            </Pressable>
          )}
        />
      </View>

      {/* Message Input */}
      <View
        style={tw`flex-row items-end gap-2 border-t border-black/10 bg-white px-4 py-3`}
      >
        <Pressable
          style={({ pressed }) => [
            tw`items-center justify-center `,
            pressed && tw`opacity-70`,
          ]}
        >
          <SvgXml xml={dubboLag} width={45} height={45} />
        </Pressable>

        <View
          style={tw`flex-1 rounded-2xl border border-black/10 bg-[#F7FAF9] px-3 py-1`}
        >
          <TextInput
            value={message}
            onChangeText={setMessage}
            placeholder="Message…"
            placeholderTextColor="rgba(0,0,0,0.46)"
            multiline
            style={tw`font-inter-regular text-[15px] text-black`}
          />
        </View>

        <Pressable
          onPress={() => sendMessage()}
          disabled={!message.trim()}
          style={({ pressed }) => [
            tw`items-center justify-center rounded-full`,
            !message.trim() && tw`opacity-40`,
            pressed && tw`opacity-70`,
          ]}
        >
          <SvgXml xml={sendIcons} width={45} height={45} />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  )
}
