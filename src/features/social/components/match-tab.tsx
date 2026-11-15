import { redHeard } from "@/assets/icons/icons"
import { AppText } from "@/components/ui/app-text"
import tw from "@/lib/tailwind"
import { LinearGradient } from "expo-linear-gradient"
import { router } from "expo-router"
import { useRef, useState } from "react"
import { Image, Pressable, TouchableOpacity, View } from "react-native"
import Swiper from "react-native-deck-swiper"
import { SvgXml } from "react-native-svg"
import { MATCH_PROFILES } from "../data/social-data"
import type { MatchProfile } from "../types"

type CardContentProps = {
  match: MatchProfile
}

const CardContent = ({ match }: CardContentProps) => {
  return (
    <Pressable
      onPress={() => router.push("/(pet-social)")}

      style={tw`relative h-[440px] w-full overflow-hidden rounded-[32px] bg-slate-900 shadow-lg`}
    >
      {/* Background Pet Image */}
      <Image
        source={{ uri: match.image }}
        resizeMode="cover"
        style={tw`absolute inset-0 h-full w-full`}
      />

      {/* Top Left Match Percentage Badge */}
      <View
        style={tw`absolute top-4 left-4 z-10 flex-row items-center gap-1.5 rounded-full border border-teal-300/30 bg-[#16655B]/90 px-3.5 py-1.5`}
      >
        <AppText
          variant="caption"
          tone="textWhite"
          style={tw`font-inter-bold text-xs`}
        >
          ⚡ {match.matchPercentage}% Match
        </AppText>
      </View>

      {/* Dark Overlay Gradient & Pet Info */}
      <LinearGradient
        colors={[
          "transparent",
          "rgba(15,23,42,0.25)",
          "rgba(15,23,42,0.85)",
          "rgba(15,23,42,0.98)",
        ]}
        style={tw`absolute inset-x-0 bottom-0 justify-end p-5 pt-20`}
      >
        {/* Name, Age & Gender */}
        <View style={tw`flex-row items-baseline gap-2`}>
          <AppText
            variant="title"
            tone="textWhite"
            style={tw`font-inter-black text-2xl`}
          >
            {match.petName}
          </AppText>

          <AppText
            variant="subtitle"
            tone="textWhite"
            style={tw`font-inter-bold text-lg opacity-90`}
          >
            {match.age}
          </AppText>

          <AppText
            tone="textWhite"
            style={tw`font-inter-semibold text-base opacity-75`}
          >
            {match.gender === "female" ? "♀" : "♂"}
          </AppText>
        </View>

        {/* Breed & Distance */}
        <View style={tw`mt-1 flex-row items-center justify-between`}>
          <AppText
            variant="body"
            tone="textWhite"
            style={tw`font-inter-medium text-sm opacity-85`}
          >
            {match.breed}
          </AppText>

          <AppText
            variant="caption"
            tone="textWhite"
            style={tw`font-inter-medium text-xs opacity-85`}
          >
            📍 {match.distance}
          </AppText>
        </View>

        {/* Badges / Tags */}
        <View style={tw`mt-3 flex-row flex-wrap gap-2`}>
          {match.tags.map((tag, idx) => {
            const badgeStyles = [
              tw`border border-emerald-500/40 bg-emerald-950/60`,
              tw`border border-fuchsia-500/40 bg-fuchsia-950/60`,
              tw`border border-amber-500/40 bg-amber-950/60`,
              tw`border border-teal-500/40 bg-teal-950/60`,
            ]
            const badgeTextTones = [
              tw`text-emerald-400`,
              tw`text-fuchsia-400`,
              tw`text-amber-400`,
              tw`text-teal-400`,
            ]

            const currentStyle = badgeStyles[idx % badgeStyles.length]
            const currentTextColor = badgeTextTones[idx % badgeTextTones.length]

            return (
              <View
                key={tag}
                style={[tw`rounded-full px-3 py-1`, currentStyle]}
              >
                <AppText
                  variant="caption"
                  style={[tw`font-inter-semibold text-xs`, currentTextColor]}
                >
                  {tag}
                </AppText>
              </View>
            )
          })}
        </View>

        {/* Bio Description */}
        {match.bio ? (
          <AppText
            variant="caption"
            tone="textWhite"
            numberOfLines={2}
            style={tw`font-inter-regular mt-2.5 text-xs leading-4 opacity-75`}
          >
            {match.bio}
          </AppText>
        ) : null}
      </LinearGradient>
    </Pressable>
  )
}

type StackedCardsProps = {
  data: MatchProfile[]
}

const StackedCards = ({ data }: StackedCardsProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const swiperRef = useRef<Swiper<MatchProfile>>(null)
  const remainingCards = data.length - currentIndex

  return (
    <View style={tw`relative h-[530px] w-full items-center justify-center`}>
      {/* Background stationary stack layers behind active card */}
      {remainingCards >= 3 && (
        <View
          style={tw`absolute top-[16px] right-6 left-6 h-[410px] rounded-[32px] bg-slate-200/90`}
        />
      )}
      {remainingCards >= 2 && (
        <View
          style={tw`absolute top-[8px] right-3 left-3 h-[425px] rounded-[32px] bg-slate-300/90`}
        />
      )}

      {remainingCards > 0 ? (
        <Swiper
          ref={swiperRef}
          cards={data}
          renderCard={(match: MatchProfile) => {
            if (!match) return <View />
            return <CardContent match={match} />
          }}
          onSwiped={(cardIndex) => {
            setCurrentIndex(cardIndex + 1)
          }}
          onSwipedAll={() => {
            console.log("All match cards swiped")
          }}
          cardIndex={0}
          backgroundColor="transparent"
          stackSize={1}
          cardHorizontalMargin={0}
          cardVerticalMargin={0}
          animateCardOpacity
          swipeBackCard
          verticalSwipe={false}
          disableTopSwipe={true}
          disableBottomSwipe={true}
          containerStyle={tw`h-[440px] w-full bg-transparent pt-0`}
          cardStyle={tw`top-0 left-0 right-0 h-[440px] w-full`}
          pointerEvents="box-none"
        />
      ) : (
        <View
          style={tw`h-[440px] w-full items-center justify-center rounded-[32px] border border-black/10 bg-white p-6`}
        >
          <AppText
            variant="subtitle"
            tone="blackish"
            style={tw`font-inter-bold text-center`}
          >
            No More Matches Nearby 🐾
          </AppText>
          <AppText
            variant="caption"
            tone="textMute"
            style={tw`font-inter-regular mt-1 text-center`}
          >
            Check back later for new furry friends!
          </AppText>

          <TouchableOpacity
            style={tw`mt-4 rounded-full bg-[#FF3B5C] px-5 py-2.5`}
            onPress={() => setCurrentIndex(0)}
          >
            <AppText
              variant="caption"
              tone="textWhite"
              style={tw`font-inter-bold`}
            >
              Reset Cards
            </AppText>
          </TouchableOpacity>
        </View>
      )}

      {/* Swipe Action Control Buttons */}
      {remainingCards > 0 && (
        <>
          <View
            style={tw`absolute bottom-0 z-30 flex-row items-center justify-center gap-6`}
          >
            {/* Pass / Swipe Left */}
            <TouchableOpacity
              onPress={() => swiperRef.current?.swipeLeft()}
              style={tw`h-14 w-14 items-center justify-center rounded-full border border-black/10 bg-white shadow-md`}
            >
              <AppText style={tw`text-xl text-slate-400`}>✕</AppText>
            </TouchableOpacity>

            {/* Paw High-Five / Swipe Right */}
            <TouchableOpacity
              onPress={() => swiperRef.current?.swipeRight()}
              style={tw`h-14 w-14 items-center justify-center rounded-full border border-black/10 bg-white shadow-md`}
            >
              <SvgXml xml={redHeard} height={30} width={30} />
            </TouchableOpacity>
          </View>

          <AppText
            variant="caption"
            tone="textMute"
            style={tw`font-inter-regular mt-1 text-center`}
          >
            Tap card to see full profile
          </AppText>
        </>
      )}
    </View>
  )
}

export const MatchTab = () => {
  return (
    <View style={tw`gap-4 pb-6`}>
      {/* Header section */}

      <View style={tw`flex-row items-end justify-between gap-4`}>
        <View style={tw`flex-1`}>
          <AppText
            variant="subtitle"
            tone="blackish"
            style={tw`font-inter-black`}
          >
            Find a Match
          </AppText>

          <AppText
            variant="caption"
            tone="textMute"
            style={tw`font-inter-regular mt-0.5`}
          >
            Discover compatible pets near you
          </AppText>
        </View>

        <View style={tw`shrink-0`}>
          <TouchableOpacity onPress={() => router.push("/pet-matched-list")}>
            <AppText
              variant="caption"
              style={[
                tw`font-inter-semibold`,
                {
                  color: "#FF4D4F",
                },
              ]}
            >
              {MATCH_PROFILES.length} New Matches
            </AppText>
          </TouchableOpacity>
        </View>
      </View>

      {/* Stacked Cards Swiper */}
      <StackedCards data={MATCH_PROFILES} />
    </View>
  )
}
