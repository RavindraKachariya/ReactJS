import React from 'react'
import './App.css'
import store from './components/store'
import { Provider } from 'react-redux'
import Dashboard from './components/Dashboard'
import Counter from './components/Counter'

const App = () => {
  return (
    <Provider store={store}>
      <Dashboard />
      <Counter />
    </Provider>
  )
}

export default App