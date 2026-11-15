import { useRouter } from "expo-router"
import { memo, useCallback, useState } from "react"
import {
  FlatList,
  Image,
  Pressable,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { SvgXml } from "react-native-svg"

import {
  locationPrimarys,
  myHeard,
  redHeard,
  rightBack,
} from "@/assets/icons/icons"
import { AppText } from "@/components/ui/app-text"
import { UpdateTopBarPluseLogo } from "@/components/ui/app-top-bar"
import { Screen } from "@/components/ui/screen"
import tw from "@/lib/tailwind"

type Comment = {
  id: string
  name: string
  avatar: string
  message: string
  time: string
  isLiked?: boolean
}

const POST_IMAGES = [
  "https://images.unsplash.com/photo-1500534623283-312aade485b7",
  "https://images.unsplash.com/photo-1543466835-00a7907e9de1",
  "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e",
]

const INITIAL_COMMENTS: Comment[] = [
  {
    id: "1",
    name: "Elena",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
    message: "So cute! Love Charlie's smile 😍",
    time: "1 min ago",
  },
  {
    id: "2",
    name: "Max",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    message: "What a happy boy! 💛",
    time: "5 min ago",
    isLiked: true,
  },
]

type ReactionType = "paw" | "fire"

type ReactionProps = {
  emoji: string
  count: number
  active?: boolean
  onPress: () => void
}

const ReactionButton = memo(
  ({ emoji, count, active, onPress }: ReactionProps) => {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          tw`flex-row items-center gap-1.5 rounded-full border border-gray-100 bg-gray-50 px-3.5 py-1.5`,
          active && tw`bg-primary/10 border-primary/30`,
          pressed && tw`opacity-70`,
        ]}
      >
        <AppText variant="caption" tone="text" style={tw`font-inter-semibold`}>
          {emoji}
        </AppText>

        <AppText
          variant="caption"
          tone={active ? "primary" : "grayish"}
          style={tw`font-inter-semibold`}
        >
          {count}
        </AppText>
      </Pressable>
    )
  }
)

ReactionButton.displayName = "ReactionButton"

type CommentItemProps = {
  item: Comment
  onLike: (id: string) => void
}

const CommentItem = memo(({ item, onLike }: CommentItemProps) => {
  return (
    <View style={tw`flex-row items-start gap-3  py-1`}>
      <Image source={{ uri: item.avatar }} style={tw`h-9 w-9 rounded-full`} />

      <View style={tw`flex-1 flex-row items-start gap-2`}>
        <View
          style={tw`flex-1 rounded-2xl rounded-tl-none bg-white p-3 border border-gray-100 shadow-sm gap-1`}
        >
          <View style={tw`flex-row items-center justify-between`}>
            <AppText
              variant="caption"
              tone="blackish"
              style={tw`font-inter-bold`}
            >
              {item.name}
            </AppText>

            <AppText
              variant="caption"
              tone="grayish"
              style={tw`font-inter-regular text-[11px]`}
            >
              {item.time}
            </AppText>
          </View>

          <AppText
            variant="caption"
            tone="blackish"
            style={tw`font-inter-regular leading-5`}
          >
            {item.message}
          </AppText>
        </View>

        <Pressable
          onPress={() => onLike(item.id)}
          style={({ pressed }) => [tw`p-2 pt-1`, pressed && tw`opacity-70`]}
        >
          {/* <AppText variant="caption" style={tw`text-base`}>
            {item.isLiked ? "❤️" : "🤍"}
          </AppText> */}
          <SvgXml xml={item.isLiked ? redHeard : myHeard} />
        </Pressable>
      </View>
    </View>
  )
})

CommentItem.displayName = "CommentItem"

export default function PostDetailsScreen() {
  const router = useRouter()
  const insets = useSafeAreaInsets()

  const [comments, setComments] = useState<Comment[]>(INITIAL_COMMENTS)
  const [comment, setComment] = useState("")
  const [imageIndex, setImageIndex] = useState(0)

  const [reactions, setReactions] = useState({
    paw: 14,
    fire: 6,
  })

  const [activeReactions, setActiveReactions] = useState<
    Record<ReactionType, boolean>
  >({
    paw: false,
    fire: false,
  })

  const handleReaction = useCallback((type: ReactionType) => {
    setActiveReactions((previous) => {
      const isActive = previous[type]

      setReactions((reactionPrevious) => ({
        ...reactionPrevious,
        [type]: Math.max(0, reactionPrevious[type] + (isActive ? -1 : 1)),
      }))

      return {
        ...previous,
        [type]: !isActive,
      }
    })
  }, [])

  const handleLikeComment = useCallback((id: string) => {
    setComments((previous) =>
      previous.map((item) =>
        item.id === id
          ? {
              ...item,
              isLiked: !item.isLiked,
            }
          : item
      )
    )
  }, [])

  const handleSendComment = useCallback(() => {
    const value = comment.trim()
    if (!value) return

    const newComment: Comment = {
      id: Date.now().toString(),
      name: "You",
      avatar: "https://images.unsplash.com/photo-1500534623283-312aade485b7",
      message: value,
      time: "Just now",
    }

    setComments((previous) => [...previous, newComment])
    setComment("")
  }, [comment])

  const renderComment = useCallback(
    ({ item }: { item: Comment }) => (
      <CommentItem item={item} onLike={handleLikeComment} />
    ),
    [handleLikeComment]
  )

  const keyExtractor = useCallback((item: Comment) => item.id, [])

  const handleImageScroll = useCallback((event: any) => {
    const width = event.nativeEvent.layoutMeasurement.width
    const offsetX = event.nativeEvent.contentOffset.x
    if (!width) return

    const nextIndex = Math.round(offsetX / width)
    setImageIndex(nextIndex)
  }, [])

  return (
    <Screen contentStyle={{ gap: 10, flexDirection: "column" }}>
      <UpdateTopBarPluseLogo />
      <FlatList
        data={comments}
        renderItem={renderComment}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`pb-6`}
        initialNumToRender={8}
        maxToRenderPerBatch={8}
        windowSize={7}
        ListHeaderComponent={
          <>
            {/* Header Bar */}

            <View
              style={tw`pt-1 pb-2 gap-2 flex-row items-center justify-between`}
            >
              <TouchableOpacity onPress={() => router.back()}>
                <SvgXml xml={rightBack} />
              </TouchableOpacity>
              <View style={tw`flex-row items-center gap-3 flex-1`}>
                <Image
                  source={{
                    uri: "https://images.unsplash.com/photo-1500534623283-312aade485b7",
                  }}
                  style={tw`h-10 w-10 rounded-full border border-gray-200`}
                />

                <View style={tw`flex-1`}>
                  <AppText
                    variant="body"
                    tone="blackish"
                    style={tw`font-inter-bold`}
                  >
                    Pedro
                  </AppText>

                  <View style={tw`flex-col items-start`}>
                    <AppText
                      variant="caption"
                      tone="grayish"
                      style={tw`font-inter-regular text-xs`}
                    >
                      2 min ago
                    </AppText>
                    {/* <AppText variant="caption" tone="grayish">
                      •
                    </AppText> */}
                    <AppText
                      variant="caption"
                      tone="primary"
                      style={tw`font-inter-medium text-xs`}
                    >
                      <SvgXml xml={locationPrimarys} /> Lima Dog Park
                    </AppText>
                  </View>
                </View>
              </View>
            </View>

            {/* Post Image Carousel */}
            <View style={tw`relative bg-black`}>
              <FlatList
                horizontal
                pagingEnabled
                data={POST_IMAGES}
                keyExtractor={(item, index) => index.toString()}
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={handleImageScroll}
                renderItem={({ item }) => (
                  <Image
                    source={{
                      uri: "https://images.unsplash.com/photo-1558788353-f76d92427f16",
                    }}
                    resizeMode="contain"
                    style={tw`w-screen h-80`}
                  />
                )}
              />

              {/* Image Count Badge */}
              <View
                style={tw`absolute bottom-3 right-4 bg-black/60 px-3 py-1 rounded-full`}
              >
                <AppText
                  variant="caption"
                  tone="textWhite"
                  style={tw`font-inter-medium text-xs`}
                >
                  {imageIndex + 1}/{POST_IMAGES.length}
                </AppText>
              </View>
            </View>

            {/* Caption */}
            <View
              style={tw`flex-row items-start justify-between bg-white px-4 py-3 border-b border-gray-100`}
            >
              <AppText
                variant="body"
                tone="blackish"
                style={tw`flex-1 font-inter-medium leading-6`}
              >
                Morning walk with Charlie! 🐕☀️
              </AppText>
            </View>

            {/* Reactions Bar */}
            <View
              style={tw`flex-row items-center justify-between border-b border-gray-100 bg-white px-4 py-3`}
            >
              <View style={tw`flex-row items-center gap-2`}>
                <ReactionButton
                  emoji="🐾"
                  count={reactions.paw}
                  active={activeReactions.paw}
                  onPress={() => handleReaction("paw")}
                />

                <ReactionButton
                  emoji="🔥"
                  count={reactions.fire}
                  active={activeReactions.fire}
                  onPress={() => handleReaction("fire")}
                />
              </View>
            </View>

            {/* Comments Header */}
            <View style={tw`bg-gray-50 px-4 pt-4 pb-2`}>
              <AppText
                variant="caption"
                tone="grayish"
                style={tw`font-inter-semibold`}
              >
                Comments ({comments.length})
              </AppText>
            </View>
          </>
        }
        ItemSeparatorComponent={() => <View style={tw`h-2`} />}
        scrollEnabled={false}
      />

      {/* Comment Input Bar */}
      <View
        style={[
          tw`border-t border-gray-100  py-3`,
          { paddingBottom: Math.max(insets.bottom, 12) },
        ]}
      >
        <View
          style={tw`flex-row items-center gap-2 rounded-full bg-gray-100 px-3.5 py-1.5`}
        >
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1500534623283-312aade485b7",
            }}
            style={tw`h-7 w-7 rounded-full`}
          />

          <TextInput
            value={comment}
            onChangeText={setComment}
            placeholder="Add a comment..."
            placeholderTextColor="#9CA3AF"
            style={tw`flex-1 font-inter-regular text-sm text-gray-800 py-1.5`}
            onSubmitEditing={handleSendComment}
          />

          <Pressable
            disabled={!comment.trim()}
            onPress={handleSendComment}
            style={({ pressed }) => [
              tw`w-8 h-8 items-center justify-center rounded-full bg-primary`,
              !comment.trim() && tw`opacity-40`,
              pressed && tw`opacity-70`,
            ]}
          >
            <AppText
              variant="caption"
              tone="textWhite"
              style={tw`font-inter-bold text-xs`}
            >
              ➤
            </AppText>
          </Pressable>
        </View>
      </View>
    </Screen>
  )
}
