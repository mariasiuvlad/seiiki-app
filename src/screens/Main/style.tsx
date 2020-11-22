import {StyleSheet} from 'react-native'
import {Colors, DefaultPadding, FontVariants, SFFont} from '../../design'

export default StyleSheet.create({
  root: {
    backgroundColor: Colors.Background
  },
  highlight: {
    fontVariant: ['small-caps']
  },
  statusText: {
    ...SFFont({variant: FontVariants.Light, size: 48}),
    marginLeft: 72,
    letterSpacing: -1,
    color: Colors.Label,
    marginVertical: 24
  },
  // card
  card: {
    alignSelf: 'flex-start',
    overflow: 'hidden',
    margin: DefaultPadding,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  loading: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: '100%'
  }
})
