import { deleteIcons } from "@/assets/icons/icons"
import { AppText } from "@/components/ui/app-text"
import tw from "@/lib/tailwind"
import { Pressable, View } from "react-native"
import { SvgXml } from "react-native-svg"

export default function PostDeleteModalScreen() {
  return (
    <View style={tw`items-center gap-2`}>
      {/* Delete Icon */}

      <View style={tw`items-center pb-6`}>
        <SvgXml xml={deleteIcons} height={50} width={50} />
      </View>

      {/* Title */}

      <View style={tw`items-center pb-3`}>
        <AppText
          variant="title"
          tone="text"
          style={tw`text-center font-inter-semibold`}
        >
          Delete Post?
        </AppText>
      </View>

      {/* Description */}

      <View style={tw`items-center pb-8`}>
        <AppText
          variant="body"
          tone="grayish"
          style={tw`text-center font-inter-regular`}
        >
          Are you sure you want to delete this post?
        </AppText>
      </View>

      {/* Actions */}

      <View style={tw`w-full gap-3`}>
        {/* Delete */}

        <Pressable
          style={({ pressed }) => [
            tw`items-center justify-center rounded-xl bg-red-700 py-3.5`,
          ]}
        >
          <AppText
            variant="body"
            tone="textWhite"
            style={tw`font-inter-medium`}
          >
            {"Delete Post"}
          </AppText>
        </Pressable>

        {/* Cancel */}

        <Pressable
          style={({ pressed }) => [
            tw`items-center justify-center rounded-xl border border-gray-200 bg-white py-3.5`,
          ]}
        >
          <AppText variant="body" tone="text" style={tw`font-inter-medium`}>
            Cancel
          </AppText>
        </Pressable>
      </View>
    </View>
  )
}
