import { closeIcon } from "@/assets/icons/icons"
import tw from "@/lib/tailwind"
import { useAppTheme } from "@/theme/theme-provider"
import React from "react"
import {
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native"
import { SvgXml } from "react-native-svg"
interface InputProps {
  label?: string
  placeholder?: string
  value: string
  onChangeText: (text: string) => void
  onBlur?: () => void
  error?: string
  touched?: boolean
  keyboardType?: TextInputProps["keyboardType"]
  labelStyle?: object
  textInputStyle?: object
  containerStyle?: object
  outerContainerStyle?: object
  isPassword?: boolean
  multiline?: boolean
  numberOfLines?: number
  autoCapitalize?: TextInputProps["autoCapitalize"]
}

const MainInput = React.forwardRef<TextInput, InputProps>(
  (
    {
      label,
      placeholder,
      value,
      onChangeText,
      onBlur,
      error,
      touched,
      keyboardType = "default",
      labelStyle,
      textInputStyle,
      containerStyle,
      outerContainerStyle,
      isPassword = false,
      multiline = false,
      numberOfLines = 1,
      autoCapitalize = "none",
    },
    ref
  ) => {
    const [secureText, setSecureText] = React.useState(isPassword)

    const { colors, resolvedTheme } = useAppTheme()
    const isDarkMode = resolvedTheme === "dark"
    const textColor = isDarkMode ? colors.text : colors.blackish
    const inputBackground = colors.backgroundHigh
    const showError = touched && !!error

    return (
      <View style={tw.style(`mb-4`, outerContainerStyle)}>
        {/* Label */}
        {Boolean(label) && (
          <Text
            style={[
              tw.style(`font-inter-medium text-sm mb-2`, labelStyle),
              { color: textColor },
            ]}
          >
            {label}
          </Text>
        )}

        {/* Input Container */}
        <View
          style={[
            tw.style(
              `flex-row items-center border rounded-full px-4`,
              multiline ? "min-h-28 rounded-3xl items-start pt-1" : "h-12",
              showError ? "border-error" : ""
            ),
            {
              backgroundColor: inputBackground,
              borderColor: showError ? undefined : colors.border,
            },
            containerStyle,
          ]}
        >
          {/* Input */}
          <TextInput
            ref={ref}
            style={[
              tw.style(
                `flex-1 text-base font-inter-medium`,
                multiline && "text-top",
                textInputStyle
              ),
              { color: textColor },
            ]}
            placeholder={placeholder}
            placeholderTextColor={isDarkMode ? "#B7BFC6" : "#72777a"}
            keyboardType={keyboardType}
            secureTextEntry={isPassword && secureText}
            value={value}
            onChangeText={onChangeText}
            onBlur={onBlur}
            multiline={multiline}
            numberOfLines={numberOfLines}
            textAlignVertical="top"
            autoCapitalize={autoCapitalize}
          />

          {/* Password Toggle */}
          {isPassword ? (
            <TouchableOpacity
              onPress={() => setSecureText(!secureText)}
              style={tw`ml-2 pt-1`}
            >
              {/* <Feather
              name={secureText ? "eye" : "eye-off"}
              size={24}
              color="#A2A2A2"
            /> */}
              {/* <SvgXml xml={secureText ? IconsCloseEyse : IconsEyse} /> */}
            </TouchableOpacity>
          ) : (
            value?.length > 0 && (
              <TouchableOpacity
                onPress={() => onChangeText("")}
                style={tw`ml-2`}
              >
                <SvgXml xml={closeIcon} />
              </TouchableOpacity>
            )
          )}
        </View>

        {/* Error */}
        {showError && (
          <Text style={tw`text-error text-xs mt-1 ml-2 font-inter-medium`}>
            {error}
          </Text>
        )}
      </View>
    )
  }
)
MainInput.displayName = "MainInput"

export default MainInput
