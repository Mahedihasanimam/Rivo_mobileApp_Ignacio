import { useEffect, useState } from "react"
import { View } from "react-native"
import { router, useLocalSearchParams } from "expo-router"
import { ICountry } from "rn-country-select"

import { AppText } from "@/components/ui/app-text"
import TopBackButton from "@/components/ui/app-top-bar"
import { Button } from "@/components/ui/button"
import MainInput from "@/components/ui/main-input"
import { Screen } from "@/components/ui/screen"
import { PhoneInput } from "@/features/auth/components/phone-input"
import tw from "@/lib/tailwind"
import { appToast } from "@/lib/toast/app-toast"
import {
  useCreateEmergencyContactMutation,
  useUpdateEmergencyContactMutation,
} from "../api/emergency-vet-help-api"

const FieldLabel = ({
  label,
  required = false,
}: {
  label: string
  required?: boolean
}) => {
  return (
    <View style={tw`flex-row items-center`}>
      <AppText
        variant="body"
        tone="blackish"
        style={[
          tw`font-inter-semibold text-sm`,
          {
            lineHeight: 20,
          },
        ]}
      >
        {label}
      </AppText>

      {required && (
        <AppText
          variant="body"
          tone="danger"
          style={[
            tw`font-inter-semibold text-sm`,
            {
              lineHeight: 20,
            },
          ]}
        >
          {" *"}
        </AppText>
      )}
    </View>
  )
}

export default function AddPrimaryVetScreen() {
  const {
    id,
    type,
    name: paramName,
    phoneNumber: paramPhone,
    phone_number: paramPhoneUnderscore,
    notes: paramNotes,
  } = useLocalSearchParams<{
    id?: string
    type?: string
    name?: string
    phoneNumber?: string
    phone_number?: string
    notes?: string
  }>()

  const isEdit = Boolean(id)

  const [createEmergencyContact, { isLoading: isCreating }] =
    useCreateEmergencyContactMutation()
  const [updateEmergencyContact, { isLoading: isUpdating }] =
    useUpdateEmergencyContactMutation()

  const isLoading = isCreating || isUpdating

  const rawType = Array.isArray(type) ? type[0] : type
  const contactType =
    rawType && rawType.toLowerCase().includes("secondary")
      ? "secondary"
      : "primary"
  const displayType = contactType === "secondary" ? "Secondary" : "Primary"

  const incomingName = Array.isArray(paramName)
    ? paramName[0]
    : (paramName ?? "")
  const rawIncomingPhone = Array.isArray(paramPhone)
    ? paramPhone[0]
    : (paramPhone ??
      (Array.isArray(paramPhoneUnderscore)
        ? paramPhoneUnderscore[0]
        : (paramPhoneUnderscore ?? "")))
  const incomingNotes = Array.isArray(paramNotes)
    ? paramNotes[0]
    : (paramNotes ?? "")

  const incomingPhoneFormatted = rawIncomingPhone.startsWith("+62")
    ? rawIncomingPhone.slice(3)
    : rawIncomingPhone

  const [name, setName] = useState(incomingName)
  const [phoneNumber, setPhoneNumber] = useState(incomingPhoneFormatted)
  const [notes, setNotes] = useState(incomingNotes)
  const [selectedCountry, setSelectedCountry] = useState<ICountry | null>(null)

  useEffect(() => {
    if (paramName !== undefined) {
      setName(Array.isArray(paramName) ? paramName[0] : paramName)
    }
    if (rawIncomingPhone) {
      setPhoneNumber(
        rawIncomingPhone.startsWith("+62")
          ? rawIncomingPhone.slice(3)
          : rawIncomingPhone
      )
    }
    if (paramNotes !== undefined) {
      setNotes(Array.isArray(paramNotes) ? paramNotes[0] : paramNotes)
    }
  }, [paramName, rawIncomingPhone, paramNotes])

  const handleSubmit = async () => {
    if (!name.trim()) {
      appToast.error("Please enter the vet's name")
      return
    }

    if (!phoneNumber.trim()) {
      appToast.error("Please enter a phone number")
      return
    }

    const countryCallingCode = selectedCountry?.idd?.root
      ? `${selectedCountry.idd.root}${selectedCountry.idd.suffixes?.[0] ?? ""}`
      : "+62"

    const cleanedPhone = phoneNumber.trim().replace(/\s+/g, "")
    const normalizedDigits = cleanedPhone.startsWith("0")
      ? cleanedPhone.slice(1)
      : cleanedPhone
    const fullPhoneNumber = cleanedPhone.startsWith("+")
      ? cleanedPhone
      : `${countryCallingCode}${normalizedDigits}`

    const payload = {
      type: contactType,
      name: name.trim(),
      phone_number: fullPhoneNumber,
      notes: notes.trim(),
    }

    try {
      if (id) {
        const res = await updateEmergencyContact({
          id: Number(id),
          ...payload,
        }).unwrap()

        if (res?.message) {
          appToast.success(res.message)
        } else {
          appToast.success(`${displayType} Vet updated successfully!`)
        }
      } else {
        const res = await createEmergencyContact(payload).unwrap()

        if (res?.message) {
          appToast.success(res.message)
        } else {
          appToast.success(`${displayType} Vet added successfully!`)
        }
      }

      if (router.canGoBack()) {
        router.back()
      } else {
        router.replace("/emergency-help")
      }
    } catch (err: any) {
      const errorMessage =
        err?.data?.message ||
        err?.message ||
        `Failed to ${id ? "update" : "add"} emergency contact`
      appToast.error(errorMessage)
    }
  }

  return (
    <Screen>
      <TopBackButton
        title={isEdit ? `Edit ${displayType} Vet` : `Add ${displayType} Vet`}
      />

      <View style={tw`flex-1`}>
        <View style={tw`gap-8`}>
          {/* Header */}
          <View style={tw`gap-[3px]`}>
            <AppText
              variant="subtitle"
              tone="blackish"
              style={tw`font-inter-bold`}
            >
              {isEdit ? `Edit ${displayType} Vet` : `${displayType} Vet`}
            </AppText>

            <AppText
              variant="body"
              tone="grayish"
              style={tw`font-inter-regular`}
            >
              {isEdit
                ? `Update your ${contactType} veterinary contact.`
                : `Your ${contactType} veterinary contact.`}
            </AppText>
          </View>

          {/* Form */}
          <View style={tw`gap-6`}>
            {/* Vet Name */}
            <View style={tw`gap-2`}>
              <FieldLabel label="Vet Name" required />

              <MainInput
                value={name}
                onChangeText={setName}
                placeholder="Dr. Michael Ahmed"
                outerContainerStyle={tw`mb-0`}
              />
            </View>

            {/* Phone Number */}
            <PhoneInput
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
            />

            {/* Notes */}
            <View style={tw`gap-2 pb-1.5`}>
              <View style={tw`flex-row items-center`}>
                <AppText
                  variant="body"
                  tone="gray"
                  style={[
                    tw`font-inter-semibold`,
                    {
                      lineHeight: 20,
                    },
                  ]}
                >
                  Notes
                </AppText>

                <AppText
                  variant="caption"
                  style={[
                    tw`ml-1 font-inter-regular`,
                    {
                      lineHeight: 16,
                    },
                  ]}
                >
                  (Optional)
                </AppText>
              </View>

              <MainInput
                value={notes}
                onChangeText={setNotes}
                placeholder="E.g. Available on weekends"
                multiline
                outerContainerStyle={tw`mb-0`}
              />
            </View>

            {/* Submit Button */}
            <Button
              label={
                isEdit
                  ? `Update ${displayType} Vet`
                  : `Save ${displayType} Vet`
              }
              loading={isLoading}
              disabled={isLoading}
              onPress={handleSubmit}
            />

            {/* Delete Contact Button (when editing) */}
            {isEdit && (
              <Button
                label="Delete Contact"
                variant="danger"
                onPress={() =>
                  router.push({
                    pathname: "/delete-contact",
                    params: {
                      id: String(id),
                      name: name || incomingName || "this contact",
                      type: `${displayType} Vet`,
                    },
                  })
                }
              />
            )}
          </View>
        </View>
      </View>
    </Screen>
  )
}

