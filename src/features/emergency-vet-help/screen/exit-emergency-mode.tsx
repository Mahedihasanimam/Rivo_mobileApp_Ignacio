import { useState } from "react"
import { Pressable, ScrollView, View } from "react-native"

import { emergencyMode, leftArrowRad, redLocations } from "@/assets/icons/icons"
import { AppText } from "@/components/ui/app-text"
import tw from "@/lib/tailwind"
import { router } from "expo-router"
import { SvgXml } from "react-native-svg"

type EmergencyStep = {
  id: number
  number: string
  text: string
}

type EmergencyAction = {
  id: "trusted-vet" | "emergency-clinic"
  title: string
  icon?: string
  activeStyle: string
}

const emergencySteps: EmergencyStep[] = [
  {
    id: 1,
    number: "01",
    text: "Stay calm - your pet senses your stress and it can worsen their condition.",
  },
  {
    id: 2,
    number: "02",
    text: "Do not give any human medications unless directed by a vet.",
  },
  {
    id: 3,
    number: "03",
    text: "If breathing is laboured, keep the airway clear and keep the pet still.",
  },
  {
    id: 4,
    number: "04",
    text: "For bleeding wounds, apply gentle pressure with a clean cloth.",
  },
  {
    id: 5,
    number: "05",
    text: "Transport carefully - use a carrier or blanket to minimize movement.",
  },
]

const emergencyActions: EmergencyAction[] = [
  {
    id: "trusted-vet",
    title: "Trusted Vet",
    icon: "call-outline",
    activeStyle: "bg-[#FF3B30]",
  },
  {
    id: "emergency-clinic",
    title: "Locate Emergency Clinic",
    icon: "location-outline",
    activeStyle: "bg-[#FF3B30]/12 border border-[#FF3B30]/30",
  },
]

type EmergencyModeScreenProps = {
  onExitEmergencyMode?: () => void
  onTrustedVet?: () => void
  onLocateEmergencyClinic?: () => void
}

export default function ExitEmergencyModeScreen({
  onExitEmergencyMode,
  onTrustedVet,
  onLocateEmergencyClinic,
}: EmergencyModeScreenProps) {
  const [activeAction, setActiveAction] =
    useState<EmergencyAction["id"]>("trusted-vet")

  const handleActionPress = (id: EmergencyAction["id"]) => {
    setActiveAction(id)
    router.push("/(main)/(tabs)")

    if (id === "trusted-vet") {
      onTrustedVet?.()
      return
    }

    if (id === "emergency-clinic") {
      onLocateEmergencyClinic?.()
    }
  }

  return (
    <View style={tw`flex-1 bg-black`}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`px-5 pb-12 pt-14`}
      >
        {/* Exit Emergency Mode */}

        <Pressable
          onPress={onExitEmergencyMode}
          style={tw`flex-row items-center gap-1.5 self-start`}
        >
          <SvgXml xml={leftArrowRad} color={"#FF6464CC"} />
          <AppText
            variant="body"
            style={tw`font-inter-semibold text-[#FF6464CC]`}
          >
            Exit Emergency Mode
          </AppText>
        </Pressable>

        {/* Emergency Icon */}

        <View style={tw`items-center pt-8`}>
          <View
            style={[
              tw`h-20 w-20 items-center justify-center rounded-[28px] border`,
              {
                backgroundColor: "rgba(255, 59, 48, 0.20)",
                borderColor: "rgba(255, 59, 48, 0.40)",
              },
            ]}
          >
            <SvgXml xml={emergencyMode} />
          </View>
        </View>

        {/* Title */}

        <View style={tw`items-center pt-6`}>
          <AppText
            variant="title"
            style={tw`font-inter-bold text-[28px] leading-[35px] text-[#FF3B30]`}
          >
            Emergency Mode
          </AppText>
        </View>

        {/* Subtitle */}

        <View style={tw`items-center pt-2`}>
          <AppText
            variant="body"
            style={tw`text-center font-inter-regular text-[15px] leading-[22px] text-white/55`}
          >
            Stay calm. Follow these steps while getting professional help.
          </AppText>
        </View>

        {/* Emergency Steps */}

        <View style={tw`gap-3 pt-8`}>
          {emergencySteps.map((step) => (
            <EmergencyStepCard key={step.id} step={step} />
          ))}
        </View>

        {/* Emergency Actions */}

        <View style={tw`gap-3 pt-8`}>
          {emergencyActions.map((action) => {
            const isActive = activeAction === action.id

            return (
              <EmergencyActionButton
                key={action.id}
                action={action}
                isActive={isActive}
                onPress={() => handleActionPress(action.id)}
              />
            )
          })}
        </View>

        {/* Footer Disclaimer */}

        <View style={tw`items-center pt-6`}>
          <AppText
            variant="caption"
            style={tw`text-center font-inter-regular text-[12px] leading-[18px] text-white/30`}
          >
            In a life-threatening emergency, always call your vet or emergency
            clinic directly. RivoCare AI is not a substitute for professional
            veterinary care.
          </AppText>
        </View>
      </ScrollView>
    </View>
  )
}

const EmergencyStepCard = ({ step }: { step: EmergencyStep }) => {
  return (
    <View
      style={[
        tw`flex-row items-start gap-4 rounded-2xl border p-4`,
        {
          backgroundColor: "rgba(255, 59, 48, 0.07)",
          borderColor: "rgba(255, 59, 48, 0.14)",
        },
      ]}
    >
      <View style={tw`w-4 pt-0.5`}>
        <AppText variant="caption" style={tw`font-inter-bold  text-[#FF3B30]`}>
          {step.number}
        </AppText>
      </View>

      <View style={tw`flex-1`}>
        <AppText
          variant="body"
          style={tw`font-inter-regular text-[14px] leading-[22px] text-white/80`}
        >
          {step.text}
        </AppText>
      </View>
    </View>
  )
}

const EmergencyActionButton = ({
  action,
  isActive,
  onPress,
}: {
  action: EmergencyAction
  isActive: boolean
  onPress: () => void
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        tw`h-[58px] flex-row items-center justify-center gap-3 rounded-2xl`,
        isActive
          ? action.id === "trusted-vet"
            ? tw`bg-[#FF3B30]`
            : tw`border border-[#FF3B30]/30 bg-[#FF3B30]/12`
          : tw`border border-white/10 bg-white/5`,
      ]}
    >
      <SvgXml xml={redLocations} />

      <AppText
        variant="body"
        style={[
          tw`font-inter-semibold`,
          {
            fontSize: action.id === "trusted-vet" ? 17 : 16,
            color:
              isActive && action.id === "trusted-vet" ? "#FFFFFF" : "#FF3B30",
          },
        ]}
      >
        {action.title}
      </AppText>
    </Pressable>
  )
}
