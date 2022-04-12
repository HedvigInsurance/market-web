import { ReactNode } from 'react'

interface IconVariant {
  svgUrl: string
}

interface IconVariants {
  dark: IconVariant
  light: IconVariant
}

export interface PerilIcon {
  variants: IconVariants
}

export interface Peril {
  title: ReactNode
  description?: string
  covered: string[]
  exceptions: string[]
  info?: string
  icon: PerilIcon
}

export type TypeOfContract =
  | 'SE_HOUSE'
  | 'SE_APARTMENT_BRF'
  | 'SE_APARTMENT_RENT'
  | 'SE_APARTMENT_STUDENT_BRF'
  | 'SE_APARTMENT_STUDENT_RENT'
  | 'NO_HOME_CONTENT_OWN'
  | 'NO_HOME_CONTENT_RENT'
  | 'NO_HOME_CONTENT_YOUTH_OWN'
  | 'NO_HOME_CONTENT_YOUTH_RENT'
  | 'NO_TRAVEL'
  | 'NO_TRAVEL_YOUTH'
  | 'NO_ACCIDENT'
  | 'NO_ACCIDENT_YOUTH'
  | 'NO_HOUSE'
  | 'DK_HOME_CONTENT'
