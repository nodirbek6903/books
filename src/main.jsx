import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import {store} from "./store/store.js"

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
  <React.StrictMode>
    <Routes>
      <Route path='*' element={<App />} />
    </Routes>
  </React.StrictMode>
  </BrowserRouter>
  </Provider>
)
