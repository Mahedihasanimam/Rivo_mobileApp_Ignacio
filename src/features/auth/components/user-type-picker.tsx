import { AppText } from "@/components/ui/app-text"
import tw from "@/lib/tailwind"
import { useAppTheme } from "@/theme/theme-provider"
import { Picker } from "@react-native-picker/picker"
import { View } from "react-native"

interface UserTypePickerProps {
  userType: string
  setUserType: (type: string) => void
}

export function UserTypePicker({ userType, setUserType }: UserTypePickerProps) {
  const { colors, resolvedTheme } = useAppTheme()
  const isDarkMode = resolvedTheme === "dark"
  const pickerTextColor = isDarkMode ? colors.text : colors.blackish

  return (
    <View style={tw`w-full gap-1`}>
      <AppText variant="caption" tone="gray">
        Select user Type
      </AppText>
      <View
        style={[
          tw`h-14 w-full flex-row items-center rounded-[24px] px-4`,
          {
            backgroundColor: colors.backgroundHigh,
            borderColor: colors.border,
          },
        ]}
      >
        <View style={tw`w-full`}>
          <Picker
            selectedValue={userType}
            onValueChange={(itemValue) => setUserType(itemValue)}
            mode="dropdown"
            style={[
              tw`h-14 w-full`,
              {
                color: pickerTextColor,
                backgroundColor: colors.backgroundHigh,
              },
            ]}
            itemStyle={{ color: pickerTextColor, fontSize: 16 }}
            dropdownIconColor={pickerTextColor}
          >
            <Picker.Item
              label="Pet Owner"
              value="Pet Owner"
              color={pickerTextColor}
            />
            <Picker.Item
              label="Pet Sitter"
              value="Pet Sitter"
              color={pickerTextColor}
            />
            <Picker.Item
              label="Veterinarian"
              value="Veterinarian"
              color={pickerTextColor}
            />
          </Picker>
        </View>
      </View>
    </View>
  )
}
