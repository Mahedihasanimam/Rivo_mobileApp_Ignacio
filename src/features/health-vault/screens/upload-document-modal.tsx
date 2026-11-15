import { documentIcon } from "@/assets/icons/icons"
import { AppText } from "@/components/ui/app-text"
import { Button } from "@/components/ui/button"
import { Divider } from "@/components/ui/divider"
import MainInput from "@/components/ui/main-input"
import TopHandler from "@/components/ui/top-handler"
import tw from "@/lib/tailwind"
import * as DocumentPicker from "expo-document-picker"
import { router } from "expo-router"
import { Formik } from "formik"
import { useState } from "react"
import { Pressable, View } from "react-native"
import { SvgXml } from "react-native-svg"
import { UploadDocumentFile, useUploadDocument } from "../hook"
import { uploadDocumentSchema } from "../schema/health-vault-schema"

export default function UploadDocumentModal() {
  const { uploadDocument, isLoading } = useUploadDocument()
  const [selectedFile, setSelectedFile] = useState<UploadDocumentFile | null>(
    null
  )
  const [fileError, setFileError] = useState<string | null>(null)

  const handlePickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["application/pdf", "image/*"],
        multiple: false,
        copyToCacheDirectory: true,
      })

      if (result.canceled) return

      const file = result.assets[0]
      setSelectedFile({
        name: file.name,
        size: file.size,
        mimeType: file.mimeType,
        uri: file.uri,
      })
      setFileError(null)
    } catch (err) {
      console.error("Document picking error:", err)
      setFileError("Failed to select document")
    }
  }

  const formatFileSize = (sizeBytes?: number) => {
    if (!sizeBytes || sizeBytes <= 0) return "0 KB"
    const sizeInKB = Math.round(sizeBytes / 1024)
    if (sizeInKB > 1024) {
      return `${(sizeInKB / 1024).toFixed(1)} MB`
    }
    return `${sizeInKB} KB`
  }

  return (
    <View style={tw`pb-4`}>
      <TopHandler />

      <AppText variant="title" tone="blackish" style={tw`font-inter-semibold`}>
        Upload Document
      </AppText>
      <AppText
        variant="caption"
        tone="gray"
        style={tw`font-inter-regular mt-0.5`}
      >
        Add medical records, prescriptions, or vaccination certificates
      </AppText>

      <View style={tw`py-3`}>
        <Divider />
      </View>

      <Formik
        initialValues={{ title: "" }}
        validationSchema={uploadDocumentSchema}
        onSubmit={async (values) => {
          if (!selectedFile) {
            setFileError("Please select a document or image to upload")
            return
          }

          await uploadDocument({
            title: values.title,
            file: selectedFile,
          })
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
            <View style={tw`gap-4`}>
              <MainInput
                label="Document Title"
                placeholder="e.g., Vaccination Card, Blood Test"
                value={values.title}
                onChangeText={handleChange("title")}
                onBlur={() => handleBlur("title")}
                error={errors.title}
                touched={touched.title}
                containerStyle={tw`rounded-xl`}
                labelStyle={tw` font-inter-semibold`}
              />

              {/* 🔹 Document Picker Section */}
              <View>
                <AppText
                  variant="caption"
                  tone="gray"
                  style={tw`uppercase font-inter-semibold mb-1.5`}
                >
                  Document File
                </AppText>

                {!selectedFile ? (
                  <Pressable
                    onPress={handlePickDocument}
                    style={({ pressed }) => [
                      tw`items-center justify-center rounded-xl border-2 border-dashed border-[#0D9488]/40 bg-[#F0FDFA] p-5`,
                      pressed && tw`opacity-70 bg-teal-100/50`,
                    ]}
                  >
                    <View
                      style={tw`w-12 h-12 rounded-full bg-[#0D9488]/10 items-center justify-center mb-2`}
                    >
                      <SvgXml xml={documentIcon} width={24} height={24} />
                    </View>

                    <AppText
                      variant="body"
                      tone="primary"
                      style={tw`font-inter-semibold text-center`}
                    >
                      Tap to Choose File
                    </AppText>

                    <AppText
                      variant="caption"
                      tone="grayish"
                      style={tw`font-inter-regular text-center mt-1 text-xs`}
                    >
                      PDF or Image (PNG, JPG) up to 10MB
                    </AppText>
                  </Pressable>
                ) : (
                  <View
                    style={tw`flex-row items-center justify-between rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm`}
                  >
                    <View style={tw`flex-row items-center gap-3 flex-1`}>
                      <View
                        style={tw`w-10 h-10 rounded-lg bg-teal-50 items-center justify-center`}
                      >
                        <SvgXml xml={documentIcon} width={22} height={22} />
                      </View>

                      <View style={tw`flex-1`}>
                        <AppText
                          variant="caption"
                          tone="blackish"
                          numberOfLines={1}
                          style={tw`font-inter-semibold text-sm`}
                        >
                          {selectedFile.name}
                        </AppText>

                        <AppText
                          variant="caption"
                          tone="grayish"
                          style={tw`font-inter-regular text-xs`}
                        >
                          {formatFileSize(selectedFile.size)} •{" "}
                          {selectedFile.name.split(".").pop()?.toUpperCase() ??
                            "FILE"}
                        </AppText>
                      </View>
                    </View>

                    <Pressable
                      onPress={handlePickDocument}
                      style={({ pressed }) => [
                        tw`px-3 py-1.5 rounded-lg bg-teal-50`,
                        pressed && tw`opacity-70`,
                      ]}
                    >
                      <AppText
                        variant="caption"
                        tone="primary"
                        style={tw`font-inter-semibold text-xs`}
                      >
                        Change
                      </AppText>
                    </Pressable>
                  </View>
                )}

                {fileError && (
                  <AppText
                    variant="caption"
                    tone="danger"
                    style={tw`mt-1.5 text-xs font-inter-medium`}
                  >
                    {fileError}
                  </AppText>
                )}
              </View>
            </View>

            {/* 🔹 Action Buttons */}
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
                  label="Upload"
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
