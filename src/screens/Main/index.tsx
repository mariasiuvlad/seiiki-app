import React from 'react'
import {View} from 'react-native'

import style from './style'
import Loading from './Loading'
import MainView from './View'
import {useHeatingAgent, useSensorAgent} from '../../context/agent'

export default function Main() {
  const {value: heating, loading: heatingLoading} = useHeatingAgent()
  const {value: temp, loading: tempLoading} = useSensorAgent()

  const isLoading = React.useMemo(() => heatingLoading || tempLoading, [
    heatingLoading,
    tempLoading
  ])

  if (isLoading) {
    return (
      <View style={style.root}>
        <Loading />
      </View>
    )
  }

  return (
    <View style={style.root}>
      <MainView heating={heating!} temp={temp!} />
    </View>
  )
}
