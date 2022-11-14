export interface PoliceViolenceDataPoint {
  age: number
  agency_responsible: string
  allegedly_armed?: 'Allegedly Armed' | 'Unclear' | 'Unarmed/Did Not Have Actual Weapon'
  call_for_service: string
  cause_of_death: string
  circumstances: string
  city: string
  county: string
  date: string
  disposition_official: string
  encounter_type: string
  gender: string
  initial_reason: string
  name: string
  news_urls: string
  race: string
  signs_of_mental_illness: string
  state: string
  street_address: string
  victim_image: string
  wapo_armed: string
  wapo_body_camera: 'Yes' | 'No' | 'Surveillance Video' | 'Dash Cam Video' | 'Vehicle' | 'Bystander Video'

  wapo_flee: string
  wapo_threat_level: string
  zip: string
}
