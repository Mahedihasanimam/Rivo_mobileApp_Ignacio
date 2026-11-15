import * as yup from "yup"

export const petDetailsSchema = yup.object({
  age: yup
    .number()
    .typeError("Age must be a number")
    .required("Age is required")
    .min(0, "Age cannot be negative")
    .max(100, "Please enter a valid age"),

  weight: yup
    .number()
    .typeError("Weight must be a number")
    .required("Weight is required")
    .positive("Weight must be greater than 0"),

  breed: yup
    .string()
    .trim()
    .required("Breed is required")
    .max(100, "Breed is too long"),
})

export type PetDetails = yup.InferType<typeof petDetailsSchema>
