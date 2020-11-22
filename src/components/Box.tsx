import React from 'react'
import {Text, Animated, PlatformColor} from 'react-native'

export default function Box(): JSX.Element {
  return (
    <>
      <Animated.View
        style={{backgroundColor: PlatformColor('secondarySystemBackground')}}>
        <Text>Box</Text>
      </Animated.View>
    </>
  )
}
