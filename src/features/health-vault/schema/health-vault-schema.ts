import * as yup from "yup"

export const healthVaultSchema = yup.object({
  weight_kg: yup
    .number()
    .typeError("Weight must be a number")
    .required("Weight is required")
    .positive("Weight must be greater than 0"),
})

export const uploadDocumentSchema = yup.object({
  title: yup
    .string()
    .trim()
    .required("Document title is required")
    .max(100, "Title is too long"),
})
export const addCareTaskSchema = yup.object({
  title: yup
    .string()
    .trim()
    .required("Document title is required")
    .max(100, "Title is too long"),
  description: yup
    .string()
    .trim()
    .max(1000, "Document title is too long"),
})

export type HealthVault = yup.InferType<typeof healthVaultSchema>
export type UploadDocument = yup.InferType<typeof uploadDocumentSchema>
export type AddCareTask = yup.InferType<typeof addCareTaskSchema>

