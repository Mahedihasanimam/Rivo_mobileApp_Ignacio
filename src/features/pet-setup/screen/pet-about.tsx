import { threeNextArrow } from "@/assets/icons/icons"
import { AppText } from "@/components/ui/app-text"
import TopBackButton from "@/components/ui/app-top-bar"
import { Button } from "@/components/ui/button"
import { HeroPanel } from "@/components/ui/hero-panel"
import MainInput from "@/components/ui/main-input"
import { Screen } from "@/components/ui/screen"
import tw from "@/lib/tailwind"
import { router, useLocalSearchParams } from "expo-router"
import { Formik } from "formik"
import { useState } from "react"
import { View } from "react-native"
import { petDetailsSchema } from "../schema/pet-details-schema"

const genders = [
  {
    id: "male",
    label: "Male",
  },
  {
    id: "female",
    label: "Female",
  },
] as const

export default function PetAboutScreen() {
  const { pet, pet_name, selectedBreed } = useLocalSearchParams<{
    pet: string
    pet_name: string
    selectedBreed: string
  }>()

  const [gender, setGender] = useState<"male" | "female">("male")

  // console.log(pet, pet_name, selectedBreed)

  const handlePetAdd = (value: {
    age: string
    weight: string
    breed: string
  }) => {
    console.log("uuuuu", value)

    router.push({
      pathname: "/(pet-setup)/pet-photo",
      params: {
        pet,
        pet_name,
        selectedBreed,
        age: value.age,
        weight: value.weight,
        breed: value.breed,
        gender,
      },
    })
  }

  return (
    <Screen>
      <TopBackButton hidden={true} newTopBarExtra={false} />

      <HeroPanel
        title={`Tell us about ${pet_name || "your pet"}`}
        body="This helps us personalize your experience"
      />
      <Formik
        initialValues={{
          age: "",
          weight: "",
          breed: "",
        }}
        enableReinitialize
        validationSchema={petDetailsSchema}
        onSubmit={handlePetAdd}
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
                label="Breed"
                placeholder="Enter Your Breed"
                value={values.breed}
                onChangeText={handleChange("breed")}
                onBlur={() => handleBlur("breed")}
                error={errors.breed}
                touched={touched.breed}
              />
              <MainInput
                label="Age"
                placeholder="Enter Your Age"
                value={values.age}
                onChangeText={handleChange("age")}
                onBlur={() => handleBlur("age")}
                keyboardType="numeric"
                error={errors.age}
                touched={touched.age}
              />

              <View>
                <MainInput
                  label="Weight"
                  placeholder="Enter Your Weight"
                  value={values.weight}
                  onChangeText={handleChange("weight")}
                  onBlur={() => handleBlur("weight")}
                  keyboardType="numeric"
                  error={errors.weight}
                  touched={touched.weight}
                />
              </View>
            </View>
            <View style={tw`flex-col gap-6`}>
              <GenderSelector selected={gender} onSelect={setGender} />
              {/* Next Button */}
              <Button
                label={"Next"}
                onPress={() => handleSubmit()}
                rightIcon={threeNextArrow}
              />
            </View>
          </View>
        )}
      </Formik>
    </Screen>
  )
}

function GenderSelector({
  selected,
  onSelect,
}: {
  selected: "male" | "female"
  onSelect: (gender: "male" | "female") => void
}) {
  return (
    <View style={tw`w-full pt-4`}>
      {/* Label */}
      <AppText variant="body" tone="blackish" style={tw`font-inter-medium`}>
        Gender
      </AppText>

      <View style={tw`w-full flex-row gap-2 pt-2`}>
        {genders.map((gender) => {
          const isActive = selected === gender.id

          return (
            <Button
              key={gender.id}
              variant={isActive ? "primary" : "soft"}
              label={gender.label}
              onPress={() => onSelect(gender.id)}
              style={tw`flex-1`}
            />
          )
        })}
      </View>
    </View>
  )
}
