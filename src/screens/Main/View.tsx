import React from 'react'
import TextStatus from '../../components/TextStatus'

interface MainViewProps {
  heating: boolean
  temp: number
}

export default function MainView({heating, temp}: MainViewProps) {
  return (
    <>
      <TextStatus heating={heating} temp={temp} />
    </>
  )
}
