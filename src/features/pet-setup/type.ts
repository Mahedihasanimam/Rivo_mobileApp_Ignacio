export interface PetSetupResponse {
  id: number
  user_id: number
  type: string
  name: string
  breed: string
  age_years: string
  age_months: string
  weight: number
  gender: string
  photo: string | null
  created_at: string
  updated_at: string
}
