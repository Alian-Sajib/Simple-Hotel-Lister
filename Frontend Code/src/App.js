import React from 'react'
import './App.css'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { store } from './redux/store';

import Main from './Components/Main'

const App = () => {
  return (
    <div className='App'>
      <Provider store={store}>
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Main />
        </BrowserRouter>
      </Provider>

    </div>
  )
}

export default App
