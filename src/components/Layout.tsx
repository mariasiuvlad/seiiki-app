import React, {PropsWithChildren} from 'react'
import {SafeAreaView, TouchableOpacity, View} from 'react-native'
import Icon from 'react-native-ionicons'
import {useHeatingAgent} from '../context/agent'
import {Colors, DefaultPadding} from '../design'
import style from './style'

interface IconBarProps {
  onToggle: () => void
}

const IconBar = ({onToggle}: IconBarProps) => {
  const {value, loading} = useHeatingAgent()
  const iconColor = React.useMemo(() => {
    if (loading) {
      return Colors.Gray
    }
    if (value) {
      return Colors.Blue
    }
    return Colors.Red
  }, [value, loading])
  return (
    <View style={{padding: DefaultPadding}}>
      <View style={style.actionBar}>
        <TouchableOpacity onPress={onToggle}>
          <Icon name="flame" size={48} color={iconColor} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default function Layout({children}: PropsWithChildren<unknown>) {
  const {toggle} = useHeatingAgent()
  return (
    <SafeAreaView style={style.root}>
      <IconBar onToggle={toggle} />
      <View style={style.container}>{children}</View>
    </SafeAreaView>
  )
}
