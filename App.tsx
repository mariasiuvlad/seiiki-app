import React from 'react'
import Layout from './src/components/Layout'
import {AgentProvider} from './src/context/agent'
import Main from './src/screens/Main'

export default function App() {
  return (
    <AgentProvider>
      <Layout>
        <Main />
      </Layout>
    </AgentProvider>
  )
}
