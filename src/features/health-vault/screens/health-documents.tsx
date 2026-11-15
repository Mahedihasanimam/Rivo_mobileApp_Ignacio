import { useCallback, useMemo } from "react"
import { Alert, Linking, Pressable, View } from "react-native"

import { documentIcon, threeDot, upgradeIcon } from "@/assets/icons/icons"
import { AppText } from "@/components/ui/app-text"
import TopBackButton from "@/components/ui/app-top-bar"
import { LoadingIndicator } from "@/components/ui/loading-indicator"
import { Screen } from "@/components/ui/screen"
import { PET_ID } from "@/constants/pet-id"
import tw from "@/lib/tailwind"
import { router } from "expo-router"
import { SvgXml } from "react-native-svg"
import { useGetHealthVaultDocumentQuery } from "../api/health-vault-api"
import { IDocument } from "../type"

type DocumentItem = {
  id: string
  title: string
  type: string
  size: string
  date: string
  uri?: string
}

const MAX_DOCUMENTS = 5

export default function DocumentsScreen() {
  const { data, isLoading } = useGetHealthVaultDocumentQuery(PET_ID)

  const rawDocuments = data?.data

  const documents: DocumentItem[] = useMemo(() => {
    if (!rawDocuments || !Array.isArray(rawDocuments)) {
      return []
    }

    return rawDocuments.map((doc: IDocument) => ({
      id: String(doc.id),
      title: doc.title,
      type: (doc.type || "pdf").toUpperCase(),
      size:
        doc.file_size_human ||
        `${Math.round((doc.file_size_bytes || 0) / 1024)} KB`,
      date: doc.created_at || "Recent",
      uri: doc.file_url,
    }))
  }, [rawDocuments])

  const handleDocumentPress = useCallback((document: DocumentItem) => {
    if (document.uri) {
      Linking.openURL(document.uri).catch((err) =>
        console.warn("Failed to open document URL:", err)
      )
    }
  }, [])

  const handleUpload = useCallback(() => {
    if (documents.length >= MAX_DOCUMENTS) {
      Alert.alert(
        "Document limit reached",
        `You can upload up to ${MAX_DOCUMENTS} documents.`
      )

      return
    }

    router.push("/(modal)/upload-document-modal" as never)
  }, [documents.length])

  return (
    <Screen>
      <TopBackButton title="Health Documents" />

      {isLoading && !data ? (
        <LoadingIndicator label="Loading documents..." />
      ) : (
        <View style={tw`gap-3`}>
          {documents.map((document) => (
            <DocumentCard
              key={document.id}
              document={document}
              onPress={() => handleDocumentPress(document)}
            />
          ))}

          {/* Upload Document */}
          {documents.length < MAX_DOCUMENTS && (
            <Pressable
              onPress={handleUpload}
              style={({ pressed }) => [
                tw`items-center justify-center rounded-2xl border-2 border-gray-200 bg-white py-6`,
                pressed && tw`opacity-70`,
              ]}
            >
              <View style={tw`items-center gap-1`}>
                <View style={tw`flex-row items-center gap-1`}>
                  <AppText
                    variant="body"
                    tone="primary"
                    style={tw`font-inter-medium`}
                  >
                    +
                  </AppText>

                  <AppText
                    variant="body"
                    tone="primary"
                    style={tw`font-inter-medium`}
                  >
                    Upload Document
                  </AppText>
                </View>

                <AppText
                  variant="caption"
                  tone="grayish"
                  style={tw`font-inter-medium`}
                >
                  You can upload up to {MAX_DOCUMENTS} documents.
                </AppText>
              </View>
            </Pressable>
          )}

          {/* Document Counter */}
          <View style={tw`items-center`}>
            <AppText
              variant="caption"
              tone="grayish"
              style={tw`font-inter-medium`}
            >
              {documents.length} of {MAX_DOCUMENTS} documents
            </AppText>
          </View>

          {/* Upgrade Card */}
          <UpgradeCard
            onPress={() => {
              router.push("/membership" as never)
            }}
          />
        </View>
      )}
    </Screen>
  )
}

type DocumentCardProps = {
  document: DocumentItem
  onPress: () => void
}

function DocumentCard({ document, onPress }: DocumentCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        tw`flex-row items-center rounded-2xl border border-gray-100 bg-white p-4`,
        pressed && tw`opacity-70`,
      ]}
    >
      {/* Document Icon */}
      <View style={tw`mr-4`}>
        <SvgXml xml={documentIcon} width={24} height={24} />
      </View>

      {/* Document Info */}
      <View style={tw`flex-1 gap-1`}>
        <AppText
          variant="body"
          tone="text"
          style={tw`font-inter-bold`}
          numberOfLines={1}
        >
          {document.title}
        </AppText>

        <AppText variant="caption" tone="grayish" style={tw`font-inter-medium`}>
          {document.type} • {document.size}
        </AppText>
      </View>

      {/* Date + Menu */}
      <View style={tw`items-end gap-2`}>
        <AppText
          variant="caption"
          tone="grayish"
          style={tw`font-inter-medium`}
          numberOfLines={1}
        >
          {document.date}
        </AppText>

        <SvgXml xml={threeDot} />
      </View>
    </Pressable>
  )
}

type UpgradeCardProps = {
  onPress?: () => void
}

export function UpgradeCard({ onPress }: UpgradeCardProps) {
  return (
    <View
      style={tw`flex-row items-center gap-3 rounded-2xl border border-gray-100 bg-white p-3`}
    >
      <SvgXml xml={upgradeIcon} />

      <View style={tw`flex-1`}>
        <AppText variant="caption" tone="text" style={tw`font-inter-semibold`}>
          Store unlimited documents
        </AppText>

        <AppText
          variant="caption"
          tone="primary"
          style={tw`font-inter-regular`}
        >
          Upgrade to Rivo Plus
        </AppText>
      </View>

      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          tw`rounded-full px-4 py-2`,
          { backgroundColor: "#2F9C8F" },
          pressed && tw`opacity-70`,
        ]}
      >
        <AppText variant="caption" tone="textWhite" style={tw`font-inter-bold`}>
          Upgrade
        </AppText>
      </Pressable>
    </View>
  )
}
