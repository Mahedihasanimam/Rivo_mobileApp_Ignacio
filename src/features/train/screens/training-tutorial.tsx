import { useMemo, useState } from "react"
import { View } from "react-native"
import { SvgXml } from "react-native-svg"

import {
  bookmarkIcon,
  bookmarkIconWhite,
  checkIcon,
  difficultyIcon,
  dogIcons,
  durationIcon,
  needIcon,
  placeIcon,
  rewardIcons,
  startPrimary,
  warningIcon,
  whyIcon,
} from "@/assets/icons/icons"
import { AppText } from "@/components/ui/app-text"
import TopBackButton from "@/components/ui/app-top-bar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Screen } from "@/components/ui/screen"
import tw from "@/lib/tailwind"
import { useAppTheme } from "@/theme/theme-provider"
import { LinearGradient } from "expo-linear-gradient"
import { router } from "expo-router"

type SelectionItem = {
  id: string
  value: string
  label: string
  icon: string
}

type StepItem = {
  id: number
  title: string
  description: string
  note?: string
}

const selectionItems: SelectionItem[] = [
  {
    id: "duration",
    value: "10 min",
    label: "Duration",
    icon: durationIcon,
  },
  {
    id: "difficulty",
    value: "Beginner",
    label: "Difficulty",
    icon: difficultyIcon,
  },
  {
    id: "pet",
    value: "Dog",
    label: "Pet type",
    icon: dogIcons,
  },
  {
    id: "place",
    value: "Both",
    label: "Place",
    icon: placeIcon,
  },
]

const steps: StepItem[] = [
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

const needs = ["Treats", "Patience"]

const beforeYouStart = [
  "Train for 5 to 10 minutes, then stop while motivation is high.",
  "Use small soft treats and reward quickly when the right behavior appears.",
  "Pause if you see stress, avoidance, panting, pinned ears, or repeated disengagement.",
]

const SelectionCard = ({ item }: { item: SelectionItem }) => {
  return (
    <Card radius="md" style={tw`flex-1 min-w-0`}>
      <SvgXml xml={item.icon} width={20} height={20} />

      <AppText variant="body" tone="blackish" style={tw`mt-2 font-inter-bold`}>
        {item.value}
      </AppText>

      <AppText
        variant="caption"
        tone="grayish"
        style={tw`mt-1 font-inter-regular`}
      >
        {item.label}
      </AppText>
    </Card>
  )
}

const SelectionGrid = ({
  selectedId,
  onSelect,
}: {
  selectedId?: string
  onSelect?: (id: string) => void
} = {}) => {
  const rows = useMemo(() => {
    const result: SelectionItem[][] = []

    for (let i = 0; i < selectionItems.length; i += 2) {
      result.push(selectionItems.slice(i, i + 2))
    }

    return result
  }, [])

  return (
    <View style={tw`w-full gap-3`}>
      {rows.map((row, rowIndex) => (
        <View
          key={`selection-row-${rowIndex}`}
          style={tw`w-full flex-row gap-3`}
        >
          {row.map((item) => (
            <SelectionCard key={item.id} item={item} />
          ))}
          {row.length === 1 && <View style={tw`flex-1`} />}
        </View>
      ))}
    </View>
  )
}

const RewardCard = () => {
  return (
    <Card radius="md">
      <SvgXml xml={rewardIcons} width={20} height={20} />

      <AppText variant="body" tone="blackish" style={tw`mt-2 font-inter-bold`}>
        Sit Master
      </AppText>

      <AppText
        variant="caption"
        tone="grayish"
        style={tw`mt-1 font-inter-regular`}
      >
        Reward
      </AppText>
    </Card>
  )
}

const InfoSection = ({
  icon,
  title,
  children,
}: {
  icon: string
  title: string
  children: React.ReactNode
}) => {
  return (
    <Card radius="xl" style={tw`p-5`}>
      <View style={tw`flex-row items-center gap-2`}>
        <SvgXml xml={icon} width={20} height={20} />

        <AppText
          variant="title"
          tone="blackish"
          style={tw`font-inter-black text-2xl`}
        >
          {title}
        </AppText>
      </View>

      {children}
    </Card>
  )
}

const NeedChips = () => {
  return (
    <View style={tw`mt-3 flex-row gap-2`}>
      {needs.map((item) => (
        <Card
          key={item}
          style={tw`
            px-3
            py-2
          `}
        >
          <AppText
            variant="caption"
            tone="blackish"
            style={tw`font-inter-semibold`}
          >
            {item}
          </AppText>
        </Card>
      ))}
    </View>
  )
}

const WhyThisMatters = () => {
  return (
    <InfoSection icon={whyIcon} title="Why this matters">
      <AppText
        variant="body"
        tone="grayish"
        style={tw`mt-2 leading-6 font-inter-regular`}
      >
        A reliable sit creates calm pauses before meals, doors, greetings, and
        walks.
      </AppText>
    </InfoSection>
  )
}

const BeforeYouStart = () => {
  return (
    <InfoSection icon={warningIcon} title="Before you start">
      <View style={tw`mt-3 gap-2`}>
        {beforeYouStart.map((item) => (
          <View key={item} style={tw`flex-row items-start gap-2`}>
            <View style={tw`pt-0.5`}>
              <SvgXml xml={checkIcon} width={16} height={16} />
            </View>

            <AppText
              variant="body"
              tone="grayish"
              style={tw`flex-1 leading-6 font-inter-regular`}
            >
              {item}
            </AppText>
          </View>
        ))}
      </View>
    </InfoSection>
  )
}

const WhatYouWillNeed = () => {
  return (
    <InfoSection icon={needIcon} title="What you will need">
      <NeedChips />
    </InfoSection>
  )
}

const StepCard = ({ step }: { step: StepItem }) => {
  return (
    <Card radius="xl" style={tw`p-5`}>
      <View
        style={tw` h-10 w-10 items-center justify-center rounded-2xl bg-primary/10
        `}
      >
        <AppText variant="body" style={tw`font-inter-black text-primary`}>
          {step.id}
        </AppText>
      </View>

      <View style={tw`flex-1`}>
        <AppText variant="subtitle" tone="blackish" style={tw`font-inter-bold`}>
          {step.title}
        </AppText>

        <AppText
          variant="body"
          tone="grayish"
          style={tw`mt-1 leading-6 font-inter-regular`}
        >
          {step.description}
        </AppText>

        {step.note ? (
          <AppText
            variant="caption"
            tone="primary"
            style={tw`mt-2 font-inter-semibold`}
          >
            {step.note}
          </AppText>
        ) : null}
      </View>
    </Card>
  )
}

const VisualStepPlan = () => {
  return (
    <View style={tw`mt-6`}>
      <AppText
        variant="subtitle"
        tone="blackish"
        style={tw`font-inter-black text-xl`}
      >
        Visual step plan
      </AppText>

      <View style={tw`mt-3 gap-3`}>
        {steps.map((step) => (
          <StepCard key={step.id} step={step} />
        ))}
      </View>
    </View>
  )
}

export default function TutorialScreen() {
  const [selectedId, setSelectedId] = useState("duration")
  const { resolvedTheme } = useAppTheme()
  const isDark = resolvedTheme === "dark"

  const handleStartTutorial = () => {
    // router.push(...)
    router.push(`/training-tutorial-see`)
  }

  return (
    <Screen>
      <TopBackButton title="Teach Sit Command" />

      <TutorialCard isDark={isDark} />
      <SelectionGrid selectedId={selectedId} onSelect={setSelectedId} />

      <RewardCard />

      <View style={tw`mt-3`}>
        <Button label="Start Tutorial" onPress={handleStartTutorial} />
      </View>

      <View style={tw`mt-3 gap-3`}>
        <WhatYouWillNeed />

        <WhyThisMatters />

        <BeforeYouStart />
      </View>

      <VisualStepPlan />
    </Screen>
  )
}

type TutorialCardProps = {
  title?: string
  description?: string
  onPress?: () => void
  isDark?: boolean
}

export function TutorialCard({
  title = 'Teach "Sit" Command',
  description = "Master the foundational sit command with positive reinforcement",
  onPress,
  isDark: propIsDark,
}: TutorialCardProps) {
  const { resolvedTheme } = useAppTheme()
  const isDark = propIsDark ?? resolvedTheme === "dark"

  return (
    <LinearGradient
      colors={
        isDark
          ? ["rgba(47, 156, 143, 0.16)", "#182522"]
          : ["rgba(47, 156, 143, 0.16)", "#FFFFFF"]
      }
      locations={[0, 0.58]}
      start={isDark ? { x: 0.21, y: 0.09 } : { x: 0.5, y: 0 }}
      end={isDark ? { x: 0.79, y: 0.91 } : { x: 0.5, y: 1 }}
      style={[
        tw`w-full rounded-3xl overflow-hidden border border-black/10 px-[23px] py-[23px]`,
        {
          minHeight: 243,
        },
      ]}
    >
      {/* Icon */}
      <View
        style={[
          tw`w-16 h-16 rounded-[24px bg-primary items-center justify-center`,
          {
            shadowColor: "#2F9C8F",
            shadowOffset: {
              width: 0,
              height: 20,
            },
            shadowOpacity: 0.25,
            shadowRadius: 25,
            elevation: 8,
          },
        ]}
      >
        <SvgXml xml={startPrimary} width={32} height={32} />
      </View>

      {/* Title */}
      <View style={tw`mt-5`}>
        <AppText
          tone="blackish"
          style={{
            fontSize: 30,
            lineHeight: 38,
            letterSpacing: -0.2,
            fontFamily: "inter-black",
          }}
        >
          {title}
        </AppText>
      </View>

      {/* Description */}
      <View style={tw`mt-3`}>
        <AppText
          tone="gray"
          style={{
            fontSize: 17,
            lineHeight: 28,
            letterSpacing: -0.5,
          }}
        >
          {description}
        </AppText>
      </View>

      {/* Arrow Button */}
      <View
        style={[
          tw`absolute top-[25px] right-[23px] w-10 h-10 rounded-full items-center justify-center`,
          {
            backgroundColor: isDark ? "#2F9C8F1A" : "#FFFFFF",
          },
        ]}
      >
        <SvgXml xml={isDark ? bookmarkIconWhite : bookmarkIcon} />
      </View>
    </LinearGradient>
  )
}
