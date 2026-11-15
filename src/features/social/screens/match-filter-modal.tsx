import TopHandler from "@/components/ui/top-handler"
import tw from "@/lib/tailwind"
import { useState } from "react"
import { Pressable, View } from "react-native"

import { AppText } from "@/components/ui/app-text"
import { Card } from "@/components/ui/card"
import { Divider } from "@/components/ui/divider"
import Slider from "@react-native-community/slider"

export default function MatchFilterModal() {
  const [distance, setDistance] = useState(8)

  const [age, setAge] = useState<Age>("Adult")

  const [size, setSize] = useState<Size>("Medium")

  const [vaccinated, setVaccinated] = useState<Vaccinated>("Not Required")

  const [gender, setGender] = useState<Gender>("Any")

  const handleSaveFilter = () => {
    const filters = {
      distance,
      age,
      size,
      vaccinated,
      gender,
    }

    console.log("Saved Filters:", filters)

    // API call / navigation here
  }

  const [value, setValue] = useState(0)

  return (
    <View style={tw`flex-1 `}>
      <TopHandler />
      {/* Header */}
      <View style={tw`flex-row items-center justify-between`}>
        <AppText
          variant="subtitle"
          tone="blackish"
          style={tw`font-inter-medium`}
        >
          Filters
        </AppText>

        <Pressable
          onPress={() => {
            setDistance(8)
            setAge("Adult")
            setSize("Medium")
            setVaccinated("Not Required")
            setGender("Any")
          }}
          style={({ pressed }) => [
            tw`rounded-full p-2`,
            pressed && tw`opacity-70`,
          ]}
        >
          <AppText
            variant="caption"
            tone="textMute"
            style={tw`font-inter-medium`}
          >
            Reset
          </AppText>
        </Pressable>
      </View>
      <Slider
        style={{
          width: "100%",
          height: 40,
        }}
        minimumValue={0}
        maximumValue={1}
        value={value}
        onValueChange={setValue}
        minimumTrackTintColor={"#2F9C8F"}
        maximumTrackTintColor="#E5E7EB"
        thumbTintColor={"#2F9C8F"}
        thumbSize={32}
      />

      <View style={tw`mt-4 gap-4`}>
        {/* Breed */}
        <Pressable
          style={({ pressed }) => [
            tw`flex-row items-center justify-between`,
            pressed && tw`opacity-70`,
          ]}
        >
          <AppText
            variant="body"
            tone="blackish"
            style={tw`font-inter-regular`}
          >
            Breed
          </AppText>

          <View style={tw`flex-row items-center gap-2`}>
            <AppText
              variant="body"
              tone="textMute"
              style={tw`font-inter-regular`}
            >
              Any Breed
            </AppText>

            <AppText
              variant="body"
              tone="textMute"
              style={tw`font-inter-medium`}
            >
              ›
            </AppText>
          </View>
        </Pressable>

        <Divider />

        {/* Age */}
        <FilterSection title="Age">
          <View style={tw`flex-row flex-wrap gap-3`}>
            {AGE_OPTIONS.map((item) => (
              <FilterChip
                key={item}
                label={item}
                active={age === item}
                onPress={() => setAge(item)}
              />
            ))}
          </View>
        </FilterSection>

        {/* Size */}
        <FilterSection title="Size">
          <View style={tw`flex-row gap-3`}>
            {SIZE_OPTIONS.map((item) => (
              <SizeOption
                key={item}
                label={item}
                active={size === item}
                onPress={() => setSize(item)}
              />
            ))}
          </View>
        </FilterSection>

        {/* Vaccinated */}
        <FilterSection title="Vaccinated ⓘ">
          <View style={tw`flex-row flex-wrap gap-3`}>
            {VACCINATED_OPTIONS.map((item) => (
              <FilterChip
                key={item}
                label={item}
                active={vaccinated === item}
                onPress={() => setVaccinated(item)}
              />
            ))}
          </View>
        </FilterSection>

        {/* Gender */}
        <FilterSection title="Gender">
          <View style={tw`flex-row flex-wrap gap-3`}>
            {GENDER_OPTIONS.map((item) => (
              <FilterChip
                key={item}
                label={item}
                active={gender === item}
                onPress={() => setGender(item)}
              />
            ))}
          </View>
        </FilterSection>

        {/* Save */}
        <Pressable
          onPress={handleSaveFilter}
          style={({ pressed }) => [
            tw`mb-10 mt-2 items-center justify-center rounded-full bg-primary px-5 py-4 shadow`,
            pressed && tw`opacity-80`,
          ]}
        >
          <AppText
            variant="body"
            tone="textWhite"
            style={tw`font-inter-semibold`}
          >
            Save Filter
          </AppText>
        </Pressable>
      </View>
    </View>
  )
}

type Age = "Puppy" | "Adult" | "Senior"
type Size = "Small" | "Medium" | "Large"
type Vaccinated = "Required" | "Not Required"
type Gender = "Male" | "Female" | "Any"

const AGE_OPTIONS: Age[] = ["Puppy", "Adult", "Senior"]

const SIZE_OPTIONS: Size[] = ["Small", "Medium", "Large"]

const VACCINATED_OPTIONS: Vaccinated[] = ["Required", "Not Required"]

const GENDER_OPTIONS: Gender[] = ["Male", "Female", "Any"]

type FilterChipProps<T extends string> = {
  label: T
  active: boolean
  onPress: () => void
}

function FilterChip<T extends string>({
  label,
  active,
  onPress,
}: FilterChipProps<T>) {
  return (
    <Card
      radius="pill"
      style={[
        tw`p-0 overflow-hidden`,
        active && tw`border-primary bg-primary shadow-sm`,
      ]}
    >
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [tw`px-6 py-2.5`, pressed && tw`opacity-70`]}
      >
        <AppText
          variant="body"
          tone={active ? "textWhite" : "blackish"}
          style={tw`font-inter-regular text-center`}
        >
          {label}
        </AppText>
      </Pressable>
    </Card>
  )
}

type SizeOptionProps = {
  label: Size
  active: boolean
  onPress: () => void
}

function SizeOption({ label, active, onPress }: SizeOptionProps) {
  return (
    <Card
      radius="md"
      style={[
        tw`flex-1 min-w-0 p-0 overflow-hidden`,
        active && tw`border-2 border-primary bg-primary/10`,
      ]}
    >
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          tw`w-full items-center justify-center px-3 py-4`,
          pressed && tw`opacity-70`,
        ]}
      >
        <AppText
          variant="body"
          tone={active ? "primary" : "blackish"}
          style={tw`font-inter-regular`}
        >
          {label}
        </AppText>
      </Pressable>
    </Card>
  )
}

type FilterSectionProps = {
  title: string
  children: React.ReactNode
}

function FilterSection({ title, children }: FilterSectionProps) {
  return (
    <View style={tw`gap-4`}>
      <AppText variant="body" tone="blackish" style={tw`font-inter-regular`}>
        {title}
      </AppText>

      {children}
    </View>
  )
}
