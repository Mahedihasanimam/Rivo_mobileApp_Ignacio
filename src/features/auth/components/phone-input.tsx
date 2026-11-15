import { downArrow, downArrowDark } from "@/assets/icons/icons"
import { AppText } from "@/components/ui/app-text"
import tw from "@/lib/tailwind"
import { useAppTheme } from "@/theme/theme-provider"
import { useState } from "react"
import { Text, TextInput, TouchableOpacity, View } from "react-native"
import { SvgXml } from "react-native-svg"
import CountrySelect, { ICountry } from "rn-country-select"

interface PhoneInputProps {
  phoneNumber: string
  setPhoneNumber: (number: string) => void
  selectedCountry: ICountry | null
  setSelectedCountry: (country: ICountry) => void
}

export function PhoneInput({
  phoneNumber,
  setPhoneNumber,
  selectedCountry,
  setSelectedCountry,
}: PhoneInputProps) {
  const [showCountryPicker, setShowCountryPicker] = useState(false)
  const { colors, resolvedTheme, radius } = useAppTheme()
  const isDarkMode = resolvedTheme === "dark"
  const pickerTextColor = isDarkMode ? colors.text : colors.blackish
  const inputBackground = colors.backgroundHigh

  const handleCountrySelect = (country: ICountry) => {
    setSelectedCountry(country)
    setShowCountryPicker(false)
  }

  return (
    <View style={tw`w-full gap-1`}>
      <AppText variant="caption" tone="gray" style={tw`font-inter-regular`}>
        Phone Number
      </AppText>

      <View
        style={[
          tw`h-14 w-full flex-row items-center rounded-[24px] border px-4`,
          {
            backgroundColor: inputBackground,
            borderColor: colors.border,
          },
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setShowCountryPicker(true)}
          style={tw`flex-row items-center gap-1`}
        >
          <Text style={tw`text-base`}>{selectedCountry?.flag ?? "🇮🇩"}</Text>

          <Text
            style={[
              tw`text-base font-inter-regular`,
              { color: pickerTextColor },
            ]}
          >
            {selectedCountry?.idd?.root
              ? `${selectedCountry.idd.root}${
                  selectedCountry.idd.suffixes?.[0] ?? ""
                }`
              : "+62"}
          </Text>
          <SvgXml xml={isDarkMode ? downArrowDark : downArrow} />
        </TouchableOpacity>

        <TextInput
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          placeholder="Mobile number"
          placeholderTextColor={isDarkMode ? "#B7BFC6" : "#72777a"}
          keyboardType="phone-pad"
          style={[
            tw`ml-4 flex-1 text-sm font-inter-regular`,
            {
              color: pickerTextColor,
              letterSpacing: 0.2,
            },
          ]}
        />
      </View>

      <CountrySelect
        visible={showCountryPicker}
        onClose={() => setShowCountryPicker(false)}
        onSelect={handleCountrySelect}
        modalType="bottomSheet"
        theme={isDarkMode ? "dark" : "light"}
        searchPlaceholder="Search country..."
        searchPlaceholderTextColor={isDarkMode ? "#B7BFC6" : "#72777a"}
        searchSelectionColor={colors.primary}
        searchFocusedBorderColor={colors.primary}
        showsVerticalScrollIndicator={false}
        countrySelectStyle={{
          content: {
            backgroundColor: colors.surface,
            borderTopLeftRadius: radius.xl,
            borderTopRightRadius: radius.xl,
            borderTopWidth: 1,
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderColor: colors.border,
            overflow: "hidden",
          },
          dragHandleContainer: {
            backgroundColor: colors.surface,
            borderTopLeftRadius: radius.xl,
            borderTopRightRadius: radius.xl,
          },
          dragHandleIndicator: {
            backgroundColor: isDarkMode
              ? "rgba(255, 255, 255, 0.2)"
              : "rgba(0, 0, 0, 0.15)",
          },
          searchContainer: {
            backgroundColor: colors.surface,
            paddingHorizontal: 16,
            paddingBottom: 8,
          },
          searchInput: {
            backgroundColor: isDarkMode
              ? colors.surfaceStrong
              : colors.backgroundHigh,
            borderColor: colors.border,
            borderWidth: 1,
            borderRadius: radius.md,
            color: colors.text,
          },
          list: {
            backgroundColor: colors.surface,
          },
          countryItem: {
            backgroundColor: isDarkMode
              ? colors.surfaceStrong
              : colors.backgroundHigh,
            borderColor: colors.border,
            borderWidth: 1,
            borderRadius: radius.md,
          },
          countryName: {
            color: colors.text,
          },
          callingCode: {
            color: isDarkMode ? colors.texttextMute : colors.subTitle,
          },
          sectionTitle: {
            color: colors.text,
          },
          closeButton: {
            backgroundColor: isDarkMode
              ? colors.surfaceStrong
              : colors.backgroundHigh,
            borderColor: colors.border,
            borderRadius: radius.md,
          },
          closeButtonText: {
            color: colors.text,
          },
          alphabetLetterText: {
            color: isDarkMode ? colors.texttextMute : colors.subTitle,
          },
          alphabetLetterTextActive: {
            color: colors.primary,
          },
        }}
      />
    </View>
  )
}
