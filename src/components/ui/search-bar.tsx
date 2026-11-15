import {
  filterIcon,
  filterIconDark,
  searchIcon,
  searchIconWhite,
} from "@/assets/icons/icons"
import tw from "@/lib/tailwind"
import { useAppTheme } from "@/theme/theme-provider"
import React from "react"
import { TextInput, TouchableOpacity, View } from "react-native"
import { SvgXml } from "react-native-svg"

interface SearchProps {
  placeholder: string
  value: string
  onChangeText: (text: string) => void
  onClear: () => void
  setShowFilter?: (value: boolean) => void
  leftIcon?: boolean
  navigation?: () => void
  filter?: boolean
}

const SearchBar: React.FC<SearchProps> = ({
  placeholder,
  value,
  onChangeText,
  onClear,
  setShowFilter,
  leftIcon = false,
  navigation,
  filter = true,
}) => {
  const { resolvedTheme, colors } = useAppTheme()
  const isDark = resolvedTheme === "dark"

  return (
    <View style={tw`flex-row items-center gap-2  justify-between`}>
      <View
        style={[
          tw`  h-11 flex-1 flex-row items-center rounded-2xl  px-3`,
          {
            backgroundColor: colors.surface,
            borderColor: colors.border,
          },
        ]}
      >
        {leftIcon && <SvgXml xml={isDark ? searchIconWhite : searchIcon} />}
        <TextInput
          style={tw`flex-1 h-12 items-center justify-center text-sm text-wellComeBlack`}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor="#888"
          clearButtonMode="while-editing"
          returnKeyType="search"
          autoCapitalize="none"
        />
      </View>
      {filter && (
        <TouchableOpacity
          style={[
            tw` h-12 w-12 items-center justify-center rounded-2xl`,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
            },
          ]}
          onPress={() => {
            // setShowFilter?.(true)
            navigation?.()
          }}
        >
          <SvgXml xml={isDark ? filterIcon : filterIconDark} />
        </TouchableOpacity>
      )}
    </View>
  )
}

export default SearchBar
