import {
  addNote,
  cancel,
  clander,
  complete,
  directions,
  doctorP,
  edit,
  locations,
  notificationsGolden,
  prepare,
  smallLag,
  time,
} from "@/assets/icons/icons"
import { AppText } from "@/components/ui/app-text"
import { Button } from "@/components/ui/button"
import MainInput from "@/components/ui/main-input"
import tw from "@/lib/tailwind"
import { useState } from "react"
import { Alert, Pressable, View } from "react-native"
import { SvgXml } from "react-native-svg"
import { useAppointmentNotes } from "../hook"
import { Appointment } from "./types"

export function StatusBadge({ status }: { status: Appointment["status"] }) {
  const upcoming = status === "upcoming"

  return (
    <View
      style={[
        tw`rounded-full px-2 py-0.5`,
        upcoming ? tw`bg-primary/10` : tw`bg-[#00C897]/10`,
      ]}
    >
      <AppText
        variant="caption"
        style={[
          tw`text-[11px] font-bold`,
          upcoming ? tw`text-primary` : tw`text-[#00C897]`,
        ]}
      >
        {upcoming ? "Upcoming" : "Completed"}
      </AppText>
    </View>
  )
}

export function InfoItem({ icon, text }: { icon: string; text: string }) {
  return (
    <View style={tw`flex-row items-center`}>
      <SvgXml xml={icon} />

      <AppText
        variant="caption"
        tone="gray"
        style={tw`ml-1 font-inter-semibold`}
      >
        {text}
      </AppText>
    </View>
  )
}

export function ActionButton({
  icon,
  label,
  onPress,
}: {
  icon: string
  label: string
  onPress: () => void
}) {
  return (
    <Pressable
      onPress={onPress}
      style={tw`flex-row items-center rounded-full bg-[#F0F4F3] px-3 py-2`}
    >
      <SvgXml xml={icon} />

      <AppText variant="caption" style={tw`ml-1.5 font-medium`}>
        {label}
      </AppText>
    </Pressable>
  )
}

export function AppointmentCard({
  appointment,
  onEdit,
  onSaveEdit,
  onComplete,
  onCancel,
  onDirections,
  onAddNote,
  onPrepare,
}: {
  appointment: Appointment
  onEdit?: () => void
  onSaveEdit?: (value: string) => void
  onComplete: () => void
  onCancel: () => void
  onDirections: () => void
  onAddNote?: () => void
  onPrepare: () => void
}) {
  const isCompleted = appointment.status === "completed"

  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(
    appointment.note ?? appointment.title ?? ""
  )
  const [noteText, setNoteText] = useState(appointment.note)

  const { saveNote, isSavingNote } = useAppointmentNotes()

  const handleToggleEdit = () => {
    setIsEditing((prev) => !prev)
    onEdit?.()
  }

  const handleSave = async () => {
    try {
      await saveNote(appointment.id, editValue, {
        onSuccess: () => {
          setNoteText(editValue.trim())
          setIsEditing(false)
          onSaveEdit?.(editValue.trim())
        },
      })
    } catch {
      // Error handled with toast inside useAppointmentNotes
    }
  }

  const handleCompletePress = () => {
    Alert.alert(
      "Complete Appointment",
      "Are you sure you want to mark this appointment as completed?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Confirm",
          style: "default",
          onPress: onComplete,
        },
      ]
    )
  }

  return (
    <View style={tw`mb-5 overflow-hidden rounded-[20px] bg-white shadow-sm`}>
      {/* Header */}
      <View style={tw`p-[18px]`}>
        <View style={tw`flex-row items-start`}>
          <View
            style={tw`h-12 w-12 items-center justify-center rounded-2xl bg-primary/10`}
          >
            <SvgXml xml={doctorP} />
          </View>

          <View style={tw`ml-4 flex-1`}>
            <View style={tw`flex-row items-start justify-between`}>
              <View style={tw`flex-1 pr-2`}>
                <AppText variant="body" style={tw`font-inter-semibold`}>
                  {appointment.title}
                </AppText>
              </View>

              <StatusBadge status={appointment.status} />
            </View>

            <View style={tw`mt-2 flex-row items-center`}>
              <AppText
                variant="caption"
                style={tw`rounded-full bg-primary/10 px-2 py-0.5 text-primary`}
              >
                {appointment.type}
              </AppText>

              <View style={tw`ml-2 flex-row items-center`}>
                <SvgXml xml={smallLag} />
                <AppText
                  variant="caption"
                  tone="gray"
                  style={tw`ml-1 font-inter-semibold`}
                >
                  {appointment.pet}
                </AppText>
              </View>
            </View>

            <View style={tw`mt-2.5 flex-row items-center gap-3`}>
              <InfoItem icon={clander} text={appointment.date} />

              <InfoItem icon={time} text={appointment.time} />
            </View>
          </View>
        </View>

        {/* Clinic */}
        <View style={tw`ml-16 mt-3 flex-row items-center`}>
          <SvgXml xml={locations} />

          <AppText
            variant="caption"
            tone="gray"
            style={tw`ml-1 flex-1 font-inter-semibold`}
            numberOfLines={1}
          >
            {appointment.clinic}
          </AppText>

          {appointment.daysAgo && (
            <View style={tw`rounded-full bg-[#F0F4F3] px-2 py-0.5`}>
              <AppText
                variant="caption"
                tone="gray"
                style={tw`text-[12px] font-bold`}
              >
                {appointment.daysAgo}
              </AppText>
            </View>
          )}
        </View>

        <AppText variant="caption" tone="gray" style={tw`ml-16 mt-1`}>
          {appointment.doctor}
        </AppText>
      </View>

      {/* Note */}
      {Boolean(noteText || appointment.note) && !isEditing && (
        <View style={tw`px-[18px]`}>
          <View
            style={tw`rounded-[14px] border border-black/10 bg-[#F0F4F3] px-3.5 py-3`}
          >
            <AppText variant="caption" tone="gray">
              {noteText ?? appointment.note}
            </AppText>
          </View>
        </View>
      )}

      {/* Edit Input Box */}
      {isEditing && (
        <View style={tw`px-[18px]`}>
          <MainInput
            label="Edit Note"
            placeholder="Add or update appointment note..."
            value={editValue}
            onChangeText={setEditValue}
            multiline
            numberOfLines={2}
            containerStyle={tw`rounded-xl bg-[#F0F4F3] border border-[#0000001A]`}
            labelStyle={tw`uppercase font-inter-semibold text-xs`}
          />

          <View style={tw`mt-2 flex-row gap-2`}>
            <View style={tw`flex-1`}>
              <Button
                label="Cancel"
                variant="ghost"
                size="sm"
                onPress={() => setIsEditing(false)}
              />
            </View>
            <View style={tw`flex-1`}>
              <Button
                label="Save Note"
                variant="primary"
                size="sm"
                loading={isSavingNote}
                onPress={handleSave}
              />
            </View>
          </View>
        </View>
      )}

      {/* Reminder */}
      {appointment.reminder && (
        <View style={tw`mt-3 flex-row items-center px-[18px]`}>
          <SvgXml xml={notificationsGolden} />
          <AppText variant="caption" tone="gray" style={tw`ml-2`}>
            {appointment.reminder}
          </AppText>
        </View>
      )}

      {/* Quick actions */}
      <View style={tw`mt-3 flex-row gap-2 px-[18px]`}>
        <ActionButton
          icon={directions}
          label="Directions"
          onPress={onDirections}
        />

        <ActionButton
          icon={addNote}
          label="Add Note"
          onPress={() => {
            setIsEditing(true)
            onAddNote?.()
          }}
        />
      </View>

      {/* Bottom actions */}
      <View style={tw`mt-3 border-t border-black/10 px-[18px] py-3.5`}>
        <Pressable
          onPress={onPrepare}
          style={tw`flex-row items-center justify-center rounded-[14px] border border-primary/20 bg-primary/10 p-3`}
        >
          <SvgXml xml={prepare} />

          <AppText
            variant="caption"
            style={tw`ml-2 font-inter-semibold text-primary`}
          >
            Prepare for Vet Visit
          </AppText>
        </Pressable>

        <View style={tw`mt-2 flex-row gap-2`}>
          <Pressable
            onPress={handleToggleEdit}
            style={[
              tw`flex-1 flex-row items-center justify-center rounded-[14px] bg-[#F0F4F3] px-4 py-[11px]`,
              isEditing ? tw`bg-primary/10 border border-primary/30` : null,
            ]}
          >
            <SvgXml xml={edit} />

            <AppText
              variant="caption"
              style={[
                tw`ml-2 font-inter-semibold`,
                isEditing ? tw`text-primary` : null,
              ]}
            >
              {isEditing ? "Close" : "Edit"}
            </AppText>
          </Pressable>

          {!isCompleted && (
            <Pressable
              onPress={handleCompletePress}
              style={tw`flex-1/2 flex-row items-center justify-center rounded-[14px] bg-[#00C897] px-4 py-[11px]`}
            >
              <SvgXml xml={complete} />

              <AppText
                variant="caption"
                tone="textWhite"
                style={tw`ml-2 font-inter-semibold`}
              >
                Complete
              </AppText>
            </Pressable>
          )}

          {!isCompleted && (
            <Pressable
              onPress={onCancel}
              style={tw`flex-1 flex-row items-center justify-center rounded-[14px] border border-[#FF3B30]/30 px-4 py-[11px]`}
            >
              <SvgXml xml={cancel} />
              <AppText
                variant="caption"
                style={tw`ml-2 font-inter-semibold text-[#FF3B30]`}
              >
                Cancel
              </AppText>
            </Pressable>
          )}
        </View>
      </View>
    </View>
  )
}
