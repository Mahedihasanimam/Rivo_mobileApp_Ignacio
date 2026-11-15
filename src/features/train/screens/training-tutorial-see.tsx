import { useMemo, useState } from "react"
import { Pressable, TouchableOpacity, View } from "react-native"

import {
  backButton,
  backButtonWhite,
  repeatIcon,
  rightArrowWhite,
  warningIcon,
  watchIcons,
  whyIcon,
} from "@/assets/icons/icons"
import { AppText } from "@/components/ui/app-text"
import TopBackButton from "@/components/ui/app-top-bar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Screen } from "@/components/ui/screen"
import tw from "@/lib/tailwind"
import { useAppTheme } from "@/theme/theme-provider"
import { useEvent } from "expo"
import { router } from "expo-router"
import { VideoView, useVideoPlayer } from "expo-video"
import { SvgXml } from "react-native-svg"

type TutorialStep = {
  id: number
  title: string
  description: string
  note?: string
}

type StatCard = {
  id: string
  icon: string
  title: string
  description: string
}

const tutorialSteps: TutorialStep[] = [
  {
    id: 1,
    title: "Get attention",
    description: "Hold a treat near your dog's nose to get their attention",
    note: "Includes visual cue and motion guide",
  },
  {
    id: 2,
    title: "Raise the treat",
    description: "Slowly move the treat upward and back over their head",
  },
  {
    id: 3,
    title: 'Say "Sit"',
    description: 'As their bottom touches the ground, say "Sit" clearly',
  },
  {
    id: 4,
    title: "Reward immediately",
    description: "Give the treat and praise enthusiastically",
  },
  {
    id: 5,
    title: "Practice daily",
    description: "Repeat 5-10 times per session, twice daily",
  },
]

const stats: StatCard[] = [
  {
    id: "repeat",
    title: "Repeat 3 times",
    description: "Short reps beat long drills.",
    icon: repeatIcon,
  },
  {
    id: "watch",
    icon: watchIcons,
    title: "Watch example",
    description: "Preview the motion cue.",
  },
]

const videoSource =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"

export default function TrainingTutorialScreen() {
  const { colors, resolvedTheme } = useAppTheme()
  const isDark = resolvedTheme === "dark"

  const [currentStep, setCurrentStep] = useState(1)

  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true
    player.play()
  })

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  })

  const activeStep = useMemo(
    () => tutorialSteps[currentStep - 1],
    [currentStep]
  )

  return (
    <Screen>
      <TopBackButton title="Training tutorial" />
      <View style={tw``}>
        <TutorialHeader
          currentStep={currentStep}
          totalSteps={tutorialSteps.length}
          title='Teach "Sit" Command'
        />

        {/* Coaching step */}

        <View style={tw`mt-3`}>
          <View
            style={tw`self-start flex-row items-center gap-2 rounded-full bg-[#2F9C8F1A] px-3 py-2`}
          >
            <View
              style={tw`h-6 w-6 items-center justify-center rounded-full bg-primary`}
            >
              <AppText variant="caption" style={tw`font-bold text-white`}>
                {currentStep}
              </AppText>
            </View>

            <AppText variant="caption" style={tw`font-bold text-primary`}>
              Coaching step
            </AppText>
          </View>
        </View>

        {/* Current step title */}

        <AppText variant="hero" tone="blackish" style={tw`font-inter-bold`}>
          {activeStep.title}
        </AppText>

        <AppText
          variant="body"
          tone="grayish"
          style={tw`mt-1 font-inter-semibold`}
        >
          {activeStep.description}
        </AppText>

        {/* =========================
              VIDEO
          ========================== */}

        <Pressable
          // onPress={handlePlayVideo}
          style={tw`mt-5 h-[180px] overflow-hidden rounded-2xl`}
        >
          <VideoView
            style={{ width: 350, height: 275 }}
            player={player}
            fullscreenOptions={{ enable: true }}
            allowsPictureInPicture
          />

          {/* <Button
            title={isPlaying ? "Pause" : "Play"}
            onPress={() => {
              if (isPlaying) {
                player.pause()
              } else {
                player.play()
              }
            }}
          /> */}
        </Pressable>

        {/* =========================
              PRO TIP
          ========================== */}

        <Card radius="xl" style={tw`mt-5 flex-row gap-3 p-4`}>
          <View style={tw`flex-1`}>
            <View style={tw`flex-row items-center gap-2`}>
              <SvgXml xml={whyIcon} />
              <AppText
                variant="subtitle"
                tone="blackish"
                style={tw`text-[17px] font-inter-bold`}
              >
                Pro tip
              </AppText>
            </View>

            <AppText
              variant="body"
              tone="grayish"
              style={tw`mt-1 text-[14px] leading-[23px]`}
            >
              Use high-value treats for better results
            </AppText>
          </View>
        </Card>

        {/* =========================
              STAT CARDS
          ========================== */}

        <View style={tw`mt-3 flex-row gap-3`}>
          {stats.map((item) => (
            <StatCardItem key={item.id} item={item} />
          ))}
        </View>

        {/* =========================
              WARNING
          ========================== */}

        <View
          style={tw`mt-3 flex-row gap-3 rounded-[24px] border border-[#F59E0B38] bg-[#F59E0B17] p-4`}
        >
          <SvgXml xml={warningIcon} />

          <AppText variant="body" tone="blackish" style={tw`flex-1 `}>
            Avoid repeating the cue over and over. Reset, make it easier, then
            reward the next try.
          </AppText>
        </View>

        {/* =========================
              NAVIGATION
          ========================== */}

        <View style={tw`flex-row items-center pt-7 gap-3 w-full`}>
          {/* 20% Back Button */}
          <TouchableOpacity
            style={[
              {
                backgroundColor: colors.backButtonBg,
                padding: 8,
                borderRadius: 100,
              },
              tw`flex-shrink-0`,
            ]}
          >
            <SvgXml
              xml={isDark ? backButtonWhite : backButton}
              height={30}
              width={30}
            />
          </TouchableOpacity>

          {/* 80% Next Button */}
          <View style={tw`flex-1`}>
            <Button
              onPress={() => router.push("/tutorial-end")}
              label="Next Step"
              rightIcon={rightArrowWhite}
            />
          </View>
        </View>
      </View>
    </Screen>
  )
}

/* =========================================================
   INFO CARD
========================================================= */

/* =========================================================
   STAT CARD
========================================================= */

function StatCardItem({ item }: { item: StatCard }) {
  return (
    <Card radius="xl" style={tw` p-4`}>
      <SvgXml xml={item.icon} />

      <AppText
        variant="subtitle"
        tone="blackish"
        style={tw`mt-2 font-inter-bold`}
      >
        {item.title}
      </AppText>

      <AppText
        variant="caption"
        tone="grayish"
        style={tw`mt-1 font-inter-medium`}
      >
        {item.description}
      </AppText>
    </Card>
  )
}

/* =========================================================
   TUTORIAL HEADER
========================================================= */

function TutorialHeader({
  currentStep,
  totalSteps,
  title,
}: {
  currentStep: number
  totalSteps: number
  title: string
}) {
  const progress = currentStep / totalSteps

  return (
    <Card radius="md" style={tw`px-5 pb-4 pt-3`}>
      <View style={tw`flex-row items-center justify-between`}>
        <View style={tw`flex-1`}>
          <AppText
            tone="blackish"
            variant="caption"
            style={tw`font-inter-semibold`}
          >
            Step {currentStep} of {totalSteps}
          </AppText>

          <AppText variant="body" tone="blackish" style={tw`font-inter-bold`}>
            {title}
          </AppText>
        </View>
      </View>

      <View style={tw`mt-3 h-2 overflow-hidden rounded-full bg-[#F0F4F3]`}>
        <View
          style={[
            tw`h-full rounded-full bg-primary`,
            {
              width: `${progress * 100}%`,
            },
          ]}
        />
      </View>
    </Card>
  )
}
