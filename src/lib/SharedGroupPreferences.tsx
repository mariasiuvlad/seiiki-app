import SharedGroupPreferences from 'react-native-shared-group-preferences'
import WidgetCenter from 'react-native-widget-center'

const appGroupIdentifier = 'group.mariasiuvlad.seiiki'

export type HeatingPayload = {
  success: boolean
  state: number
}

export type TempPayload = {
  temp: number
}

enum Channels {
  Heating = 'SharedHeatingStatus',
  Temp = 'SharedTempValues'
}

export async function setItem(
  key: Channels,
  data: HeatingPayload | TempPayload
) {
  console.log(`[@saveUserDataToSharedStorage] key=${key}`)
  try {
    await SharedGroupPreferences.setItem(key, data, appGroupIdentifier)
    WidgetCenter.reloadTimelines('RN_widget')
    console.log('successfuly saved', data)
  } catch (errorCode) {
    console.log('failed to save', errorCode)
  }
}

export const setHeating = (data: HeatingPayload) =>
  setItem(Channels.Heating, data)
export const setTemp = (data: TempPayload) => setItem(Channels.Temp, data)
