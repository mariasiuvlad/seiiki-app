import React from 'react'
import {ActivityIndicator, View} from 'react-native'
import style from './style'

export default function Loading() {
  return (
    <View style={style.loading}>
      <ActivityIndicator size="large" />
    </View>
  )
}
