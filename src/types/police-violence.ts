export interface PoliceViolenceDataPoint {
  age: number
  allegedly_armed?: 'Allegedly Armed' | 'Unclear' | 'Unarmed/Did Not Have Actual Weapon'
  call_for_service: string
  cause_of_death: string
  city: string
  congressperson_party: string
  county: string
  date: string
  disposition_official: string
  fe_id: number
  georgaphy: string
  gender: string
  hhincome_median_census_tract: number
  latitude: number
  longitude: number
  mpv_id: number
  name: string
  off_duty_killing: string
  officer_charged: string
  ori: string
  pop_asian_census_tract: number
  pop_black_census_tract: number
  pop_hispanic_census_tract: number
  pop_native_american_census_tract: number
  pop_other_multiple_census_tract: number
  pop_pacific_islander_census_tract: number
  pop_total_census_tract: number
  pop_white_census_tract: number
  prosecutor_gender: string
  prosecutor_party: string
  prosecutor_race: string
  race: string
  signs_of_mental_illness: string
  state: string
  street_address: string
  tract: number
  urban_rural_upsai: string
  wapo_armed: string
  wapo_body_ccamera?: 'Yes' | 'No'

  wapo_flee: string
  wapo_threat_level: string
  zip: string
}
