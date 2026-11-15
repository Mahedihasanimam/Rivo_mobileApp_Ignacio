import TopBackButton from "@/components/ui/app-top-bar"
import { Screen } from "@/components/ui/screen"

export default function DirrectionScreen() {
  return (
    <Screen>
      <TopBackButton newTopBarExtra={false} title="Address" />
      {/* <Text>Dirrection</Text> */}
    </Screen>
  )
}
