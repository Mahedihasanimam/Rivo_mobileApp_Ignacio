import { AppText } from "@/components/ui/app-text"
import tw from "@/lib/tailwind"
import React from "react"
import { Pressable, View } from "react-native"

type MessageHeaderProps = {
  unreadCount?: number
  onPressMessages?: () => void
  icon?: React.ReactNode
}

export function MessageHeader({
  unreadCount = 3,
  onPressMessages,
  icon,
}: MessageHeaderProps) {
  const hasUnreadMessages = unreadCount > 0

  return (
    <View style={tw`flex-row items-center justify-between gap-4`}>
      {/* Left Content */}
      <View style={tw`flex-1`}>
        <AppText variant="subtitle" tone="text" style={tw`font-inter-bold`}>
          Messages
        </AppText>

        {hasUnreadMessages && (
          <AppText
            variant="caption"
            tone="grayish"
            style={tw`font-inter-regular`}
          >
            {unreadCount} unread
          </AppText>
        )}
      </View>

      {/* Message Button */}
      <Pressable
        onPress={onPressMessages}
        style={({ pressed }) => [
          tw`flex-row relative items-center justify-center gap-1 rounded-full border border-black/10 bg-[#F7FAF9] px-3 py-3`,
          pressed && tw`opacity-70`,
        ]}
      >
        {/* Icon */}
        {icon}

        {/* Unread Count */}
        {hasUnreadMessages && (
          <View
            style={tw`items-center absolute top-0 -right-2 justify-center rounded-full bg-primary px-1.5 py-0.5`}
          >
            <AppText
              variant="caption"
              tone="textWhite"
              style={tw`font-inter-bold`}
            >
              {unreadCount > 99 ? "99+" : unreadCount}
            </AppText>
          </View>
        )}
      </Pressable>
    </View>
  )
}
