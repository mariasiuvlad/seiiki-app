import {PlatformColor} from 'react-native'

export const DefaultPadding = 24

export const Colors = {
  Red: (PlatformColor('systemRed') as unknown) as string,
  Blue: (PlatformColor('systemBlue') as unknown) as string,
  Gray: (PlatformColor('systemGray') as unknown) as string,
  Background: (PlatformColor('systemBackground') as unknown) as string,
  Background2: (PlatformColor(
    'secondarySystemBackground'
  ) as unknown) as string,
  Background3: (PlatformColor('tertiarySystemBackground') as unknown) as string,
  Label: (PlatformColor('labelColor') as unknown) as string
}

export enum Fonts {
  SFText = 'System',
  SFDisplay = 'SFProDisplay',
  SFRounded = 'SFProRounded'
}

export enum FontVariants {
  Ultralight = 'Ultralight',
  Light = 'Light',
  Thin = 'Thin',
  Regular = 'Regular',
  Medium = 'Medium',
  Semibold = 'Semibold',
  Bold = 'Bold',
  Heavy = 'Heavy',
  Black = 'Black'
}

const WeightMap = {
  [FontVariants.Ultralight]: 100,
  [FontVariants.Light]: 200,
  [FontVariants.Thin]: 300,
  [FontVariants.Regular]: 'normal',
  [FontVariants.Medium]: 500,
  [FontVariants.Semibold]: 600,
  [FontVariants.Bold]: 'bold',
  [FontVariants.Heavy]: 800,
  [FontVariants.Black]: 900
}

function composeFont(font: Fonts, variant: FontVariants) {
  let style = {}
  switch (font) {
    case Fonts.SFText:
      style = {
        ...style,
        fontFamily: `${font}`,
        fontWeight: WeightMap[variant]
      }
      break
    default:
      style = {
        ...style,
        fontFamily: `${font}-${variant}`
      }
      break
  }

  return style
}

interface ISFont {
  variant: FontVariants
  size: number
  font?: Fonts
}

export const SFFont = ({variant, size, font}: ISFont) => {
  const fontFamily = font ?? (size > 20 ? Fonts.SFDisplay : Fonts.SFText)

  return {
    ...composeFont(fontFamily, variant),
    fontSize: size
  }
}
