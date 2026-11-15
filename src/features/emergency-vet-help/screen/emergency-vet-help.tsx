import { useState } from "react"
import {
  ActivityIndicator,
  Pressable,
  View,
} from "react-native"
import { SvgXml } from "react-native-svg"

import { plusIcon, userIcons } from "@/assets/icons/icons"
import { AppText } from "@/components/ui/app-text"
import TopBackButton from "@/components/ui/app-top-bar"
import { Screen } from "@/components/ui/screen"
import tw from "@/lib/tailwind"
import { router } from "expo-router"
import { useGetAllEmergencyContactsQuery } from "../api/emergency-vet-help-api"
import EmergencyHelpScreen from "./emergency-help"

export default function EmergencyVetHelpScreen() {
  const { data, isLoading } = useGetAllEmergencyContactsQuery()
  const contacts = Array.isArray(data?.data) ? data.data : []

  const [activeTab, setActiveTab] = useState<VetType>("primary")


 

  const handleVetPress = (type: VetType) => {
    setActiveTab(type)

    router.push({
      pathname: "/add-primary-vet",
      params: {
        type: type
      }
    })
  }

  if (isLoading) {
    return (
      <Screen>
        <TopBackButton title="Emergency Vet Help" />
        <View style={tw`flex-1 items-center justify-center`}>
          <ActivityIndicator size="large" color="#2F9C8F" />
        </View>
      </Screen>
    )
  }

  if (contacts.length > 0) {
    return <EmergencyHelpScreen />
  }

  return (
    <Screen>
      <TopBackButton title="Emergency Vet Help" />
      <View style={tw`w-full `}>
        <VetImageSection />

        <VetEmptyContent  />

        <View style={tw`gap-4`}>
          {vetTabs.map((item) => (
            <VetButton
              key={item.id}
              item={item}
              activeTab={activeTab}
              onPress={() => handleVetPress(item.id)}
            />
          ))}
        </View>
      </View>

      <View
        style={[
          tw`mt-6 h-[21px] w-full`,
          {
            shadowColor: "#878787",
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 0.3,
            shadowRadius: 25,
            elevation: 2,
          },
        ]}
      />
    </Screen>
  )
}

type VetType = "primary" | "secondary"

type VetTab = {
  id: VetType
  label: string
}

const vetTabs: VetTab[] = [
  {
    id: "primary",
    label: "Add Primary Vet",
  },
  {
    id: "secondary",
    label: "Add Secondary Vet",
  },
]


const VetImageSection = () => {
  return (
    <View style={tw`items-center pt-10 pb-8`}>
      <Pressable
        style={tw`relative h-32 w-32 items-center justify-center rounded-full bg-[#E8F5F1]`}
      >
      <SvgXml xml={userIcons} width={64} height={64} />
        
      </Pressable>
    </View>
  )
}


const VetEmptyContent = () => {

  return (
    <View style={tw`items-center pb-10`}>
      <AppText variant="subtitle" tone="blackish" style={tw`text-center`}>
        No vet contacts added yet
      </AppText>

      <View style={tw`mt-3 w-[280px]`}>
        <AppText
          variant="body"
          tone="grayish"
          style={tw`text-center leading-6`}
        >
          Add your Primary Vet and Secondary Vet{"\n"}
          so you can contact them quickly during{"\n"}
          an emergency.
        </AppText>
      </View>
    </View>
  )
}

type VetButtonProps = {
  item: VetTab
  activeTab: VetType
  onPress: () => void
}

const VetButton = ({ item, activeTab, onPress }: VetButtonProps) => {
  const isActive = activeTab === item.id

  return (
    <Pressable
      onPress={onPress}
      style={[
        tw` flex-row items-center justify-center gap-2 rounded-full border px-4 py-3.5
        `,
        isActive
          ? tw`border-[#2F9C8F] bg-[#E8F5F1]`
          : tw`border-[#2F9C8F] bg-transparent`,
      ]}
    >
      <View style={tw`h-4 w-4 items-center justify-center`}>
        <SvgXml xml={plusIcon} />
      </View>

      <AppText variant="body" tone="primary" style={tw`text-center`}>
        {item.label}
      </AppText>
    </Pressable>
  )
}
