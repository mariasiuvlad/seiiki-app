import React from 'react'
import {Text, View} from 'react-native'
import {Colors} from '../../design'
import style from './style'

interface TextStatusProps {
  heating: boolean
  temp: number
}

export default function TextStatus({heating, temp}: TextStatusProps) {
  return (
    <View style={style.root}>
      <Text style={style.statusText}>
        The heating is
        {heating ? (
          <Text style={{...style.highlight, color: Colors.Red}}>{' on '}</Text>
        ) : (
          <Text style={{...style.highlight, color: Colors.Blue}}>
            {' off '}
          </Text>
        )}
        {'and the inside temperature\n is around'}
        <Text style={style.temp}>{` ${temp} `}</Text>
        degrees celsius.
      </Text>
      <View style={style.actions}>
        {heating ? (
          <Text style={{...style.action, color: Colors.Blue}}>turn off</Text>
        ) : (
          <Text style={{...style.action, color: Colors.Red}}>turn on</Text>
        )}
      </View>
    </View>
  )
}
