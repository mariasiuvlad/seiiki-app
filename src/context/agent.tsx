import React, {PropsWithChildren} from 'react'
import {sensorStatus} from '../lib/daikin'
import {heatingOff, heatingOn, heatingStatus} from '../lib/heating'

export enum Agents {
  HeatingAgent = 'HeatingAgent',
  SensorAgent = 'SensorAgent'
}

interface IAgent<T> {
  loading: boolean
  ID?: string
  value?: T
  error?: Error
}

interface HeatingAgent extends IAgent<boolean> {
  toggle: () => void
}

interface AgentContext {
  [Agents.HeatingAgent]: HeatingAgent
  [Agents.SensorAgent]: IAgent<number>
}

const initialState: AgentContext = {
  [Agents.HeatingAgent]: {
    loading: true,
    toggle: () => {
      console.warn('not initialized')
      return {}
    }
  },
  [Agents.SensorAgent]: {loading: true}
}

const AgentContext = React.createContext<AgentContext>(initialState)

export function AgentProvider({children}: PropsWithChildren<unknown>) {
  const [heating, setHeating] = React.useState<IAgent<boolean>>({
    loading: true
  })
  const [sensor, setSensor] = React.useState<IAgent<number>>({
    loading: true
  })

  const updateHeating = React.useCallback(() => {
    heatingStatus().then((value) => setHeating({loading: false, value}))
  }, [])

  const updateSensor = React.useCallback(() => {
    sensorStatus().then((value) => setSensor({loading: false, value}))
  }, [])

  const toggle = React.useCallback(async () => {
    const action = heating?.value ? heatingOff : heatingOn
    setHeating({
      loading: false,
      value: await action()
    })
  }, [heating])

  React.useEffect(() => {
    updateHeating()
    updateSensor()

    const handles = [
      setInterval(updateHeating, 60 * 1000),
      setInterval(updateSensor, 60 * 1000)
    ]

    return () => handles.forEach(clearInterval)
  }, [updateHeating, updateSensor])

  return (
    <AgentContext.Provider
      value={{
        [Agents.HeatingAgent]: {
          ...heating,
          toggle
        },
        [Agents.SensorAgent]: {
          ...sensor
        }
      }}>
      {children}
    </AgentContext.Provider>
  )
}

export function useSensorAgent() {
  return React.useContext(AgentContext).SensorAgent
}

export function useHeatingAgent() {
  return React.useContext(AgentContext).HeatingAgent
}
