import { AppText } from "@/components/ui/app-text"
import { Button } from "@/components/ui/button"
import { Divider } from "@/components/ui/divider"
import MainInput from "@/components/ui/main-input"
import TopHandler from "@/components/ui/top-handler"
import { petDetailsSchema } from "@/features/pet-setup/schema/pet-details-schema"
import tw from "@/lib/tailwind"
import { Formik } from "formik"
import { View } from "react-native"

export default function NewAppointmentModalModal() {
  return (
    <View>
      <TopHandler />

      <AppText variant="title" tone="blackish" style={tw`font-inter-semibold`}>
        New Appointment
      </AppText>
      <AppText variant="body" tone="gray" style={tw`font-inter-regular`}>
        Schedule a care event for your pet
      </AppText>

      <View style={tw`py-3`}>
        <Divider />
      </View>

      <Formik
        initialValues={{ age: "", weight: "", breed: "" }}
        validationSchema={petDetailsSchema}
        onSubmit={(values) => {
          console.log(values)
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
          <View style={tw`flex-col  justify-between `}>
            {/* 🔹 Input Fields */}
            <View style={tw` `}>
              <MainInput
                label="Title"
                placeholder="e.g., Annual Vet Checkup"
                value={values.breed}
                onChangeText={handleChange("breed")}
                onBlur={() => handleBlur("breed")}
                error={errors.breed}
                touched={touched.breed}
                containerStyle={tw`rounded-xl bg-[#F0F4F3]  border border-[#0000001A]`}
                labelStyle={tw` uppercase font-inter-semibold`}
              />

              <MainInput
                label="Type"
                placeholder="Enter Your Age"
                value={values.age}
                onChangeText={handleChange("age")}
                onBlur={() => handleBlur("age")}
                error={errors.age}
                touched={touched.age}
                containerStyle={tw`rounded-xl bg-[#F0F4F3]  border border-[#0000001A]`}
              />
              <MainInput
                label="Pet"
                placeholder="Enter Your Weight"
                value={values.weight}
                onChangeText={handleChange("weight")}
                onBlur={() => handleBlur("weight")}
                error={errors.weight}
                touched={touched.weight}
                containerStyle={tw`rounded-xl bg-[#F0F4F3]  border border-[#0000001A]`}
              />
            </View>
            <View style={tw`flex-row items-center justify-between gap-3 mt-6`}>
              <View style={tw`flex-1`}>
                <Button
                  style={tw`rounded-xl`}
                  label={"Cancel"}
                  onPress={() => handleSubmit()}
                  variant="ghost"
                />
              </View>
              <View style={tw`flex-1`}>
                <Button
                  style={tw`rounded-xl`}
                  label={"Set"}
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
