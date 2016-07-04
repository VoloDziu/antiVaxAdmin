import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import './styles/global.css'
import configureStore from './store'
import { Provider } from 'react-redux'
const store = configureStore()

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('app'))
