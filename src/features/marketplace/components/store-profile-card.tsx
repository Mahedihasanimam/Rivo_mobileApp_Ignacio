import { ratingStar, shapingIcons, timeGreenish } from "@/assets/icons/icons"
import { AppText } from "@/components/ui/app-text"
import tw from "@/lib/tailwind"

import { Image, View, type ImageSourcePropType } from "react-native"
import { SvgXml } from "react-native-svg"

type StoreProfileCardProps = {
  name: string
  rating: number
  reviews: string
  image: ImageSourcePropType
  minimumDeliveryAmount?: number
  deliveryTime?: string
}

export function StoreProfileCard({
  name,
  rating,
  reviews,
  image,
  minimumDeliveryAmount = 50,
  deliveryTime = "1-2 days",
}: StoreProfileCardProps) {
  return (
    <View style={tw`gap-4 py-4`}>
      <View style={tw`relative mb-8`}>
        <Image source={image} resizeMode="cover" style={tw`h-52 w-full `} />
        <View
          style={tw`absolute -bottom-8 left-4 overflow-hidden rounded-full border-4 border-white bg-zinc-200 shadow-md`}
        >
          <Image
            source={image}
            resizeMode="cover"
            style={tw`h-20 w-20 rounded-full`}
          />
        </View>
      </View>

      {/* Store Information */}
      <View style={tw`gap-3 px-[4%]`}>
        {/* Store Name & Rating */}
        <View style={tw`gap-1`}>
          <AppText variant="title" tone="text" style={tw`font-inter-bold`}>
            {name}
          </AppText>

          <View style={tw`flex-row items-center gap-2`}>
            <SvgXml xml={ratingStar} />

            <AppText variant="body" tone="text" style={tw`font-inter-semibold`}>
              {rating.toFixed(1)}
            </AppText>

            <AppText variant="body" tone="gray" style={tw`font-inter-regular`}>
              ({reviews} reviews)
            </AppText>
          </View>
        </View>

        {/* Delivery Information */}
        <View style={tw`flex-row flex-wrap items-center gap-2`}>
          <View
            style={tw`flex-row items-center gap-2 rounded-full bg-gray-100 px-3 py-1.5`}
          >
            <SvgXml xml={shapingIcons} />

            <AppText
              variant="caption"
              tone="gray"
              style={tw`font-inter-medium`}
            >
              Delivery over ${minimumDeliveryAmount}
            </AppText>
          </View>

          <View
            style={tw`flex-row items-center gap-2 rounded-full bg-gray-100 px-3 py-1.5`}
          >
            <SvgXml xml={timeGreenish} height={10} width={10} />

            <AppText
              variant="caption"
              tone="gray"
              style={tw`font-inter-medium`}
            >
              Delivery: {deliveryTime}
            </AppText>
          </View>
        </View>
      </View>
    </View>
  )
}
