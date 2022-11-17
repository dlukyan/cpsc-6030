import { createUseStyles } from 'react-jss'

const colors = {
  darkGray: '#575B65',
  white: '#ffffff',
  empty: '#b0b0b0',
  primary: '#ff8037',
  primaryLight: '#ffa26e',
  secondary: '#8274ff',
  blue: '#3661ff',
  red: '#f84040',
}

const maxWidthMedia = (size: number) => `@media screen and (max-width: ${size}px)`
const minWidthMedia = (size: number) => `@media screen and (min-width: ${size}px)`
type Breakpoint = 'sm' | 'md'

const breakpoints = {
  smWidth: 480,
  mdWidth: 768,
  down: (size: Breakpoint): string => {
    switch (size) {
      case 'sm':
        return maxWidthMedia(breakpoints.smWidth - 1)
      case 'md':
        return maxWidthMedia(breakpoints.mdWidth - 1)
    }
  },
  up: (size: Breakpoint): string => {
    switch (size) {
      case 'sm':
        return minWidthMedia(breakpoints.smWidth)
      case 'md':
        return minWidthMedia(breakpoints.mdWidth)
    }
  },
}

const baseTypography = {
  fontFamily: '"Avenir Next", sans-serif',
  fontWeight: 500,
  color: colors.darkGray,
  lineHeight: 4 / 3,
}

const typography = {
  smallest: {
    fontSize: 10,
    ...baseTypography,
  },
  small: {
    fontSize: 13,
    ...baseTypography,
  },
  medium: {
    fontSize: 16,
    ...baseTypography,
  },
  sortOfLarge: {
    fontSize: 20,
    ...baseTypography,
  },
  large: {
    fontSize: 26,
    ...baseTypography,
  },
  larger: {
    fontSize: 32,
    ...baseTypography,
  },
  largest: {
    fontSize: 40,
    ...baseTypography,
  },
  moreLarge: {
    fontSize: 56,
    ...baseTypography,
  },
  extraLarge: {
    fontSize: 68,
    ...baseTypography,
  },
}

const elements = {
  button: {
    borderStyle: 'none',
    padding: 0,
    borderRadius: 10,
    backgroundColor: 'transparent',
    '&:active': {
      opacity: 0.2,
      tapHighlightColor: 'transparent',
    },
    '&:hover': {
      cursor: 'pointer',
    },
    '&:focus': {
      outline: 'none',
    },
  },
  link: {
    borderStyle: 'none',
    '&:focus': {
      outline: 'none',
    },
    '&:hover': {
      cursor: 'pointer',
    },
    '&:active': {
      opacity: 0.2,
      tapHighlightColor: 'transparent',
    },
    textDecoration: 'none',
  },
}

const common = {
  flexBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerAbsolute: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  vizContainer: (gridArea: string, origin: string, scale: number) => ({
    cursor: 'pointer',
    backgroundColor: 'white',
    gridArea,
    '&:hover': {
      zIndex: 100,
      scale: scale,
      transition: 'scale 0.5s ease-out, box-shadow 0.5s ease',
      transformOrigin: origin,
      boxShadow: `1px 1px 50px 5px ${theme.colors.darkGray}`,
      border: 'none',
    },
    transition: 'scale 0.5s ease-out, box-shadow 0.5s ease, height 0.5s ease-out, width 0.5s ease-out',
    padding: 10,
    border: `1px solid ${theme.colors.empty}`,
    ...common.flexBox,
  }),
  vizContainerClicked: (gridArea: string, origin: string, scale: number) => ({
    backgroundColor: 'white',
    position: 'absolute',
    height: 500,
    width: 500,
    bottom: 0,
    transformOrigin: origin,
    boxShadow: `1px 1px 50px 5px ${theme.colors.darkGray}`,
    transition: 'height 0.5s ease-out, width 0.5s ease-out',
    border: 'none',
    zIndex: 100,
    padding: 10,
    ...common.flexBox,
    flexDirection: 'column',
  }),
}

export const useGlobalStyles = createUseStyles({
  '@global': {
    'html, body, #root': {
      margin: 0,
      height: '100%',
      ...baseTypography,
    },
    '*, *::before, *::after': {
      boxSizing: 'border-box',
    },
    'ul, ol': {
      padding: 0,
      margin: 0,
      listStyle: 'none',
    },
    'h1,h2,h3,h4,h5,p,li': {
      margin: 0,
    },
  },
})

export const theme = {
  colors,
  typography,
  elements,
  breakpoints,
  common,
}

export type Theme = typeof theme