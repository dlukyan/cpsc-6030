import React from 'react'

export const republicanIconPath =
  'M0 20C0 8.95 8.95 0 20 0H48C59.05 0 68 8.95 68 20V28H0V20ZM51.9875 12C51.6875 12 51.4 12.1625 51.275 12.425L49.7 15.5L46.175 16C45.875 16.0375 45.625 16.25 45.525 16.525C45.425 16.8 45.5125 17.1125 45.725 17.3125L48.275 19.7125L47.675 23.1C47.625 23.3875 47.75 23.6875 47.9875 23.85C48.225 24.0125 48.5625 24.05 48.825 23.9125L51.975 22.3125L55.125 23.9125C55.4 24.05 55.725 24.025 55.9625 23.85C56.2 23.675 56.3375 23.3875 56.275 23.1L55.675 19.7125L58.25 17.3125C58.4625 17.1125 58.55 16.8 58.45 16.525C58.35 16.25 58.1 16.0375 57.8 16L54.275 15.5L52.7 12.425C52.5625 12.1625 52.2875 12 51.9875 12V12ZM34.7 12.425C34.5625 12.1625 34.2875 12 33.9875 12C33.6875 12 33.4 12.1625 33.275 12.425L31.7 15.5L28.175 16C27.875 16.0375 27.625 16.25 27.525 16.525C27.425 16.8 27.5125 17.1125 27.725 17.3125L30.275 19.7125L29.675 23.1C29.625 23.3875 29.75 23.6875 29.9875 23.85C30.225 24.0125 30.5625 24.05 30.825 23.9125L33.975 22.3125L37.125 23.9125C37.4 24.05 37.725 24.025 37.9625 23.85C38.2 23.675 38.3375 23.3875 38.275 23.1L37.675 19.7125L40.25 17.3125C40.4625 17.1125 40.55 16.8 40.45 16.525C40.35 16.25 40.1 16.0375 39.8 16L36.275 15.5L34.7 12.425V12.425ZM15.9875 12C15.6875 12 15.4 12.1625 15.275 12.425L13.7 15.5L10.175 16C9.875 16.0375 9.625 16.25 9.525 16.525C9.425 16.8 9.5125 17.1125 9.725 17.3125L12.275 19.7125L11.675 23.1C11.625 23.3875 11.75 23.6875 11.9875 23.85C12.225 24.0125 12.5625 24.05 12.825 23.9125L15.975 22.3125L19.125 23.9125C19.4 24.05 19.725 24.025 19.9625 23.85C20.2 23.675 20.3375 23.3875 20.275 23.1L19.675 19.7125L22.25 17.3125C22.4625 17.1125 22.55 16.8 22.45 16.525C22.35 16.25 22.1 16.0375 21.8 16L18.275 15.5L16.7 12.425C16.5625 12.1625 16.2875 12 15.9875 12V12ZM16 32H68V46C68 47.1 68.9 48 70 48C71.1 48 72 47.1 72 46V40C72 37.7875 73.7875 36 76 36C78.2125 36 80 37.7875 80 40V46C80 51.525 75.525 56 70 56C64.475 56 60 51.525 60 46V40H56V52C56 54.2125 54.2125 56 52 56H44C41.7875 56 40 54.2125 40 52V44H16V52C16 54.2125 14.2125 56 12 56H4C1.7875 56 0 54.2125 0 52V32H16Z'

export const RepublicanIcon: React.FC<{ color?: string; scale?: number }> = ({ color = '#fff', scale = 1 }) => {
  return (
    <svg width={scale * 80} height={scale * 56} viewBox="0 0 80 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d={republicanIconPath} fill={color} />
    </svg>
  )
}