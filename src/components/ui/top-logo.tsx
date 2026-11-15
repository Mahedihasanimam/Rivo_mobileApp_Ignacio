import { Image } from "expo-image"
import { View } from "react-native"
import { scale, verticalScale } from "react-native-size-matters"

export default function TopLogo() {
  return (
    <View>
      <Image
        source={require("@/assets/auth-image/rivo.png")}
        style={{
          height: verticalScale(33),
          width: scale(85),
        }}
        contentFit="contain"
      />
    </View>
  )
}
