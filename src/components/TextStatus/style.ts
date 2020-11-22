import {PlatformColor, StyleSheet} from 'react-native'
import {Colors, DefaultPadding, FontVariants, Fonts, SFFont} from '../../design'

export default StyleSheet.create({
  root: {
    padding: DefaultPadding,
    margin: DefaultPadding,
    borderLeftWidth: 4,
    borderLeftColor: (Colors.Red as unknown) as string
  },
  temp: {
    color: PlatformColor('systemOrange'),
    ...SFFont({variant: FontVariants.Regular, size: 72, font: Fonts.SFRounded})
  },
  highlight: {
    ...SFFont({variant: FontVariants.Light, size: 72, font: Fonts.SFRounded}),
    fontVariant: ['small-caps'],
    color: PlatformColor('systemOrange')
  },
  statusText: {
    ...SFFont({variant: FontVariants.Light, size: 48, font: Fonts.SFRounded}),
    marginLeft: DefaultPadding,
    letterSpacing: -1
  },
  actions: {
    flexDirection: 'row-reverse',
    marginHorizontal: DefaultPadding
  },
  action: {
    fontVariant: ['small-caps'],
    fontFamily: 'SFProRounded-Regular',
    fontSize: 32,
    marginHorizontal: 24
  }
})
