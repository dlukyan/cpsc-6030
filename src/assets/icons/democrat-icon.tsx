import React from 'react'

export const democratIconPath =
  'M8 4C8 2.8875 8.475 1.3875 8.775 0.5875C8.9 0.225 9.25 0 9.625 0C9.8625 0 10.1 0.0875 10.275 0.2625L16 5.7125L21.725 0.2625C21.9 0.0875 22.1375 0 22.375 0C22.75 0 23.1 0.225 23.225 0.5875C23.525 1.4 24 2.8875 24 4C24 7.3125 21.2625 9.25 20.3125 9.825L29.8375 18.9C30.5875 19.6125 31.575 20 32.6 20H60C67.675 20 72.7 23 75.775 26.25C77.275 27.825 78.2625 29.4 78.8875 30.6125C79.2 31.2125 79.425 31.7375 79.575 32.125C79.65 32.3125 79.7125 32.475 79.75 32.6C79.775 32.6625 79.7875 32.7125 79.8 32.7625L79.8125 32.825L79.825 32.85V32.8625L76.05 34L79.825 32.8625C80.4625 34.975 79.2625 37.2125 77.1375 37.8375C75.0375 38.4625 72.825 37.2875 72.175 35.2C72.1625 35.175 72.15 35.125 72.1125 35.05C72.05 34.8875 71.9375 34.625 71.7625 34.2875C71.4125 33.6125 70.8375 32.6875 69.9625 31.775C69.4375 31.225 68.7875 30.65 67.9875 30.125V40H24L18.95 28.2125C18.4625 27.0625 17.0375 26.6375 16 27.3375L10.7375 30.8375C9.6 31.6 8.275 32 6.9 32H6.65C2.9875 32 0 29.0125 0 25.3375C0 23.825 0.5125 22.3625 1.4625 21.175L10.95 9.325C9.7625 8.425 8 6.65 8 4ZM56 44H68V60C68 62.2125 66.2125 64 64 64H60C57.7875 64 56 62.2125 56 60V52H36V60C36 62.2125 34.2125 64 32 64H28C25.7875 64 24 62.2125 24 60V44H56ZM72.175 35.15L76 34L72.175 35.15ZM32.6125 26.3625C32.5 26.1375 32.2625 26 32.0125 26C31.7625 26 31.525 26.1375 31.4125 26.3625L30.1 28.925L27.1625 29.3375C26.9125 29.375 26.7 29.5375 26.625 29.775C26.55 30.0125 26.6125 30.2625 26.7875 30.4375L28.9125 32.4375L28.4125 35.2625C28.375 35.5 28.475 35.75 28.675 35.8875C28.875 36.025 29.15 36.05 29.375 35.9375L32 34.6L34.625 35.9375C34.85 36.05 35.125 36.0375 35.325 35.8875C35.525 35.7375 35.6375 35.5 35.5875 35.2625L35.0875 32.4375L37.2125 30.4375C37.4 30.2625 37.4625 30.0125 37.375 29.775C37.2875 29.5375 37.0875 29.375 36.8375 29.3375L33.9 28.925L32.5875 26.3625H32.6125ZM46.0125 26C45.7625 26 45.525 26.1375 45.4125 26.3625L44.1 28.925L41.1625 29.3375C40.9125 29.375 40.7 29.5375 40.625 29.775C40.55 30.0125 40.6125 30.2625 40.7875 30.4375L42.9125 32.4375L42.4125 35.2625C42.375 35.5 42.475 35.75 42.675 35.8875C42.875 36.025 43.15 36.05 43.375 35.9375L46 34.6L48.625 35.9375C48.85 36.05 49.125 36.0375 49.325 35.8875C49.525 35.7375 49.6375 35.5 49.5875 35.2625L49.0875 32.4375L51.2125 30.4375C51.4 30.2625 51.4625 30.0125 51.3875 29.775C51.3125 29.5375 51.1 29.375 50.85 29.3375L47.9125 28.925L46.6 26.3625C46.4875 26.1375 46.25 26 46 26H46.0125ZM60.6125 26.3625C60.5 26.1375 60.2625 26 60.0125 26C59.7625 26 59.525 26.1375 59.4125 26.3625L58.1 28.925L55.1625 29.3375C54.9125 29.375 54.7 29.5375 54.625 29.775C54.55 30.0125 54.6125 30.2625 54.7875 30.4375L56.9125 32.4375L56.4125 35.2625C56.375 35.5 56.475 35.75 56.675 35.8875C56.875 36.025 57.15 36.05 57.375 35.9375L60 34.6L62.625 35.9375C62.85 36.05 63.125 36.0375 63.325 35.8875C63.525 35.7375 63.6375 35.5 63.5875 35.2625L63.0875 32.4375L65.2125 30.4375C65.4 30.2625 65.4625 30.0125 65.3875 29.775C65.3125 29.5375 65.1 29.375 64.85 29.3375L61.9125 28.925L60.6 26.3625H60.6125Z'

export const DemocratIcon: React.FC<{ color?: string; scale?: number }> = ({ color = '#fff', scale = 1 }) => {
  return (
    <svg width={scale * 80} height={scale * 64} viewBox="0 0 80 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d={democratIconPath} fill={color} />
    </svg>
  )
}
