import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './components/redox/store.js'
// import Topbarcomponent from './components/navbar/Topbarcomponent.jsx'
// import Items from './components/navbar/SideBar.jsx'
// import Managebooking2 from './components/manageBooking/managebooking2.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <StrictMode>
        <App />
      </StrictMode>
    </Provider>
  </BrowserRouter>,
)
