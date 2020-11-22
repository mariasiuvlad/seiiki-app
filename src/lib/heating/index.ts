import {setHeating} from '../SharedGroupPreferences'

export async function heatingStatus(): Promise<boolean> {
  const res = await fetch('http://192.168.0.102')
  const data = await res.json()
  setHeating(data)
  return data.state
}

export async function heatingOn(): Promise<boolean> {
  const res = await fetch('http://192.168.0.102/on')
  const data = await res.json()
  setHeating(data)
  return data.state
}

export async function heatingOff(): Promise<boolean> {
  const res = await fetch('http://192.168.0.102/off')
  const data = await res.json()
  setHeating(data)
  return data.state
}
