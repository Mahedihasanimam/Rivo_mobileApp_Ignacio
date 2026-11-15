import { Alert, Linking, Pressable, View } from "react-native"
import { SvgXml } from "react-native-svg"

import { plusIcon, threeDot } from "@/assets/icons/icons"
import { AppText } from "@/components/ui/app-text"
import TopBackButton from "@/components/ui/app-top-bar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Screen } from "@/components/ui/screen"
import tw from "@/lib/tailwind"
import { router } from "expo-router"
import { useGetAllEmergencyContactsQuery } from "../api/emergency-vet-help-api"
import { IEmergencyVetHelp } from "../type"

const vetIcon = `
<svg
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <circle
    cx="12"
    cy="8"
    r="4"
    stroke="#2F9C8F"
    stroke-width="2"
  />

  <path
    d="M4 21C4.7 17.5 7.8 15 12 15C16.2 15 19.3 17.5 20 21"
    stroke="#2F9C8F"
    stroke-width="2"
    stroke-linecap="round"
  />
</svg>
`

const phoneIcon = `
<svg
  width="18"
  height="18"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M7.5 3.5L10.2 3C10.9 2.9 11.5 3.3 11.7 4L12.6 7.2C12.8 7.8 12.5 8.5 11.9 8.8L10.1 9.7C11.2 12.1 12.9 13.8 15.3 14.9L16.2 13.1C16.5 12.5 17.2 12.2 17.8 12.4L21 13.3C21.7 13.5 22.1 14.1 22 14.8L21.5 17.5C21.4 18.1 20.9 18.6 20.3 18.7C11.2 19.6 4.4 12.8 5.3 3.7C5.4 3.1 5.9 2.6 6.5 2.5L7.5 3.5Z"
    fill="#2F9C8F"
  />
</svg>
`

const callIcon = `
<svg
  width="18"
  height="18"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M7.5 3.5L10.2 3C10.9 2.9 11.5 3.3 11.7 4L12.6 7.2C12.8 7.8 12.5 8.5 11.9 8.8L10.1 9.7C11.2 12.1 12.9 13.8 15.3 14.9L16.2 13.1C16.5 12.5 17.2 12.2 17.8 12.4L21 13.3C21.7 13.5 22.1 14.1 22 14.8L21.5 17.5C21.4 18.1 20.9 18.6 20.3 18.7C11.2 19.6 4.4 12.8 5.3 3.7C5.4 3.1 5.9 2.6 6.5 2.5L7.5 3.5Z"
    fill="white"
  />
</svg>
`

type VetCardProps = {
  contact: IEmergencyVetHelp
  onCall: () => void
}

const VetCard = ({ contact, onCall }: VetCardProps) => {
  const isPrimary = contact.type?.toLowerCase() === "primary"

  return (
    <Card
      radius="lg"
      style={[
        tw`mt-3 p-4`,
        {
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.05,
          shadowRadius: 2,
          elevation: 2,
        },
      ]}
    >
      <View style={tw`flex-row items-start`}>
        <View
          style={[
            tw`h-12 w-12 items-center justify-center rounded-full`,
            {
              backgroundColor: "#EBF5F3",
            },
          ]}
        >
          <SvgXml xml={vetIcon} width={24} height={24} />
        </View>

        <View style={tw`ml-4 flex-1 pt-0.5`}>
          <AppText
            variant="body"
            tone="blackish"
            style={tw`font-inter-semibold`}
          >
            {contact.name}
          </AppText>

          {Boolean(contact.notes) && (
            <AppText
              variant="caption"
              tone="grayish"
              style={tw`mt-0.5 font-inter-regular text-[13px]`}
            >
              {contact.notes}
            </AppText>
          )}

          <View style={tw`mt-1.5 flex-row items-center gap-1.5`}>
            <SvgXml xml={phoneIcon} width={12} height={12} />

            <AppText
              variant="caption"
              tone="grayish"
              style={tw`font-inter-medium text-[13px]`}
            >
              {contact.phone_number}
            </AppText>
          </View>
        </View>
        <Pressable
          onPress={() =>
            router.push({
              pathname: "/add-primary-vet",
              params: {
                id: String(contact.id),
                name: contact.name,
                type: contact.type || (isPrimary ? "primary" : "secondary"),
                phoneNumber: contact.phone_number,
                notes: contact.notes || "",
              },
            })
          }
          hitSlop={8}
        >
          <SvgXml xml={threeDot} />
        </Pressable>
      </View>

      <Pressable
        onPress={onCall}
        style={[
          tw`mt-4 h-[50px] flex-row items-center justify-center rounded-full`,
          {
            backgroundColor: "#2F9C8F",
          },
        ]}
      >
        <SvgXml xml={callIcon} width={18} height={18} />

        <AppText
          variant="body"
          tone="textWhite"
          style={tw`ml-2 font-inter-semibold`}
        >
          Call {isPrimary ? "Primary Vet" : "Secondary Vet"}
        </AppText>
      </Pressable>
    </Card>
  )
}

type EmptyVetCardProps = {
  onAdd: () => void
  title?: string
  description?: string
  buttonText?: string
}

const EmptyVetCard = ({
  onAdd,
  title = "No secondary vet added",
  description = "Add a backup vet contact.",
  buttonText = "Add Secondary Vet",
}: EmptyVetCardProps) => {
  return (
    <Card
      radius="lg"
      style={tw`
        mt-2
        items-center
      `}
    >
      <AppText variant="body" tone="blackish" style={tw`font-inter-semibold `}>
        {title}
      </AppText>

      <AppText variant="caption" tone="grayish" style={tw`mt-1 text-center`}>
        {description}
      </AppText>

      <Pressable onPress={onAdd} style={tw`mt-4 flex-row items-center gap-1.5`}>
        <SvgXml xml={plusIcon} />

        <AppText variant="body" tone="primary" style={tw`font-inter-bold `}>
          {buttonText}
        </AppText>
      </Pressable>
    </Card>
  )
}

export default function EmergencyHelpScreen() {
  const { data } = useGetAllEmergencyContactsQuery()

  const contacts = Array.isArray(data?.data) ? data.data : []
  const primaryContact = contacts.find(
    (c) => c.type?.toLowerCase() === "primary"
  )
  const secondaryContacts = contacts.filter(
    (c) => c.type?.toLowerCase() !== "primary"
  )

  const handleCallVet = async (contact: IEmergencyVetHelp) => {
    if (!contact.phone_number) {
      Alert.alert("No Phone Number", "This vet does not have a phone number.")

      return
    }

    const phoneNumber = contact.phone_number.replace(/[^0-9+]/g, "")

    try {
      const supported = await Linking.canOpenURL(`tel:${phoneNumber}`)

      if (supported) {
        await Linking.openURL(`tel:${phoneNumber}`)
      } else {
        Alert.alert(
          "Unable to Call",
          "Calling is not available on this device."
        )
      }
    } catch {
      Alert.alert("Something went wrong", "Unable to start the phone call.")
    }
  }

  const handleAddSecondaryVet = () => {
    router.push({
      pathname: "/add-primary-vet",
      params: {
        type: "secondary",
      },
    })
  }

  return (
    <Screen>
      <TopBackButton title="Emergency Vet Help" />
      <View
        style={tw`
          flex-1
        `}
      >
        <View>
          <AppText
            variant="subtitle"
            tone="blackish"
            style={[
              tw`font-inter-bold`,
              {
                fontSize: 20,
                lineHeight: 28,
              },
            ]}
          >
            Emergency Help
          </AppText>

          <AppText
            variant="body"
            tone="grayish"
            style={[
              tw`mt-2 font-inter-regular`,
              {
                fontSize: 14,
                lineHeight: 22.75,
              },
            ]}
          >
            If your pet needs urgent help, contact your{"\n"}
            trusted vet.
          </AppText>
        </View>

        {/* Vet Sections */}

        <View style={tw`mt-6`}>
          {/* Primary Vet */}
          <View style={tw`mb-5`}>
            <AppText
              variant="eyebrow"
              tone="primary"
              style={[
                tw`px-1 font-inter-bold`,
                {
                  fontSize: 11,
                  lineHeight: 16.5,
                  letterSpacing: 0.55,
                },
              ]}
            >
              PRIMARY VET
            </AppText>

            {primaryContact ? (
              <VetCard
                contact={primaryContact}
                onCall={() => handleCallVet(primaryContact)}
              />
            ) : (
              <EmptyVetCard
                title="No primary vet added"
                description="Add a primary vet contact."
                buttonText="Add Primary Vet"
                onAdd={() =>
                  router.push({
                    pathname: "/add-primary-vet",
                    params: {
                      type: "primary",
                    },
                  })
                }
              />
            )}
          </View>

          {/* Secondary Vets */}
          {secondaryContacts.map((contact) => (
            <View key={contact.id} style={tw`mb-5`}>
              <AppText
                variant="eyebrow"
                tone="primary"
                style={[
                  tw`px-1 font-inter-bold`,
                  {
                    fontSize: 11,
                    lineHeight: 16.5,
                    letterSpacing: 0.55,
                  },
                ]}
              >
                SECONDARY VET
              </AppText>

              <VetCard
                contact={contact}
                onCall={() => handleCallVet(contact)}
              />
            </View>
          ))}

          {/* Add Secondary Vet Option */}
          {contacts.length < 3 && (
            <View style={tw`mb-5`}>
              {secondaryContacts.length === 0 && (
                <AppText
                  variant="eyebrow"
                  tone="primary"
                  style={[
                    tw`px-1 font-inter-bold`,
                    {
                      fontSize: 11,
                      lineHeight: 16.5,
                      letterSpacing: 0.55,
                    },
                  ]}
                >
                  SECONDARY VET
                </AppText>
              )}

              <EmptyVetCard
                title={
                  secondaryContacts.length > 0
                    ? "Add backup vet"
                    : "No secondary vet added"
                }
                description="Add a backup vet contact."
                buttonText="Add Secondary Vet"
                onAdd={handleAddSecondaryVet}
              />
            </View>
          )}
        </View>
        <Button
          label="Exit Emergency Mode"
          onPress={() => router.push("/exit-emergency-mode")}
        />
      </View>
    </Screen>
  )
}
