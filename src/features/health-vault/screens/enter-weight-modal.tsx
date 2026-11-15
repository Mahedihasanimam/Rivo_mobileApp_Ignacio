import { AppText } from "@/components/ui/app-text"
import { Button } from "@/components/ui/button"
import { Divider } from "@/components/ui/divider"
import MainInput from "@/components/ui/main-input"
import TopHandler from "@/components/ui/top-handler"
import tw from "@/lib/tailwind"
import { router } from "expo-router"
import { Formik } from "formik"
import { View } from "react-native"
import { useCreateWeightLog } from "../hook"
import { healthVaultSchema } from "../schema/health-vault-schema"

export default function EnterWeightModal() {
  const { createWeightLog, isLoading } = useCreateWeightLog()

  return (
    <View>
      <TopHandler />

      <AppText variant="title" tone="blackish" style={tw`font-inter-semibold`}>
        Weight Log
      </AppText>

      <View style={tw`py-3`}>
        <Divider />
      </View>

      <Formik
        initialValues={{ weight_kg: "" }}
        validationSchema={healthVaultSchema}
        onSubmit={async (values) => {
          await createWeightLog(
            { weight_kg: Number(values.weight_kg) },
            {
              onSuccess: (res) => {
                console.log("Weight log created successfully:", res)
              },
              onError: (err) => {
                console.error("Error creating weight log:", err)
              },
            }
          )
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={tw`flex-col justify-between`}>
            {/* 🔹 Input Fields */}
            <View>
              <MainInput
                label="Weight"
                placeholder="Enter"
                value={values.weight_kg}
                onChangeText={handleChange("weight_kg")}
                onBlur={() => handleBlur("weight_kg")}
                error={errors.weight_kg}
                touched={touched.weight_kg}
                keyboardType="numeric"
                containerStyle={tw`rounded-xl bg-[#F0F4F3] border border-[#0000001A]`}
                labelStyle={tw`uppercase font-inter-semibold`}
              />
            </View>

            <View style={tw`flex-row items-center justify-between gap-3 mt-6`}>
              <View style={tw`flex-1`}>
                <Button
                  style={tw`rounded-xl`}
                  label="Cancel"
                  onPress={() => router.back()}
                  variant="ghost"
                  disabled={isLoading}
                />
              </View>
              <View style={tw`flex-1`}>
                <Button
                  style={tw`rounded-xl`}
                  label="Set"
                  loading={isLoading}
                  onPress={() => handleSubmit()}
                />
              </View>
            </View>
          </View>
        )}
      </Formik>
    </View>
  )
}
