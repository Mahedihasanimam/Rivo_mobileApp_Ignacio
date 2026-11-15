import * as yup from "yup"

export const newAppointmentSchema = yup.object({
  title: yup
    .string()
    .trim()
    .required("Title is required")
    .max(100, "Title cannot exceed 100 characters"),

  type: yup
    .string()
    .trim()
    .required("Type is required"),

  vet_name: yup
    .string()
    .trim()
    .optional(),

  location: yup
    .string()
    .trim()
    .optional(),

  latitude: yup
    .string()
    .optional()
    .test("is-valid-lat", "Latitude must be between -90 and 90", (val) => {
      if (!val) return true
      const num = Number(val)
      return !isNaN(num) && num >= -90 && num <= 90
    }),

  longitude: yup
    .string()
    .optional()
    .test("is-valid-lng", "Longitude must be between -180 and 180", (val) => {
      if (!val) return true
      const num = Number(val)
      return !isNaN(num) && num >= -180 && num <= 180
    }),

  datetime: yup
    .string()
    .trim()
    .required("Date and time is required"),

  reminder: yup
    .string()
    .optional(),
})

export type NewAppointmentFormValues = yup.InferType<typeof newAppointmentSchema>
