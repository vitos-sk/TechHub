import { createRoot } from 'react-dom/client'
import TechHub from './tech-hub.jsx'
import { BrowserRouter } from 'react-router-dom'
import { store } from './store'
import { Provider } from 'react-redux'
import './index.css'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <TechHub />
    </Provider>
  </BrowserRouter>
)
