import {StyleSheet} from 'react-native'
import {Colors} from '../design'

export default StyleSheet.create({
  root: {
    height: '100%',
    backgroundColor: Colors.Background2
  },
  container: {
    flexGrow: 1,
    backgroundColor: Colors.Background
  },
  actionBar: {alignSelf: 'flex-end'}
})
