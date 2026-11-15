export interface IEmergencyVetHelp {
  id: number;
  type: string;
  name: string;
  phone_number: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface ICreateEmergencyContactPayload {
  type: string;
  name: string;
  phone_number: string;
  notes?: string;
}

export interface IUpdateEmergencyContactPayload extends ICreateEmergencyContactPayload {
  id: number | string;
}