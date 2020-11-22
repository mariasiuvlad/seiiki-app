import Axios from 'axios'
import {setTemp} from '../SharedGroupPreferences'

const URL = 'http://192.168.0.101'

function parseResponse(data: string) {
  const entries: {htemp: string} = data
    .split(',')
    .map((t) => t.split('='))
    .reduce(
      (acc, val) => {
        return {...acc, [val[0]]: val[1]}
      },
      {htemp: ''}
    )
  return {...entries, htemp: parseFloat(entries.htemp)}
}

export async function sensorStatus(): Promise<number> {
  return Axios.get(`${URL}/aircon/get_sensor_info`)
    .then(({data}) => {
      const {htemp: temp} = parseResponse(data)
      setTemp({temp})
      return temp
    })
    .catch((error) => {
      console.warn(error.message)
      return error
    })
}
