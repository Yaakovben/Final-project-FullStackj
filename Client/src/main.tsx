import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Browser } from 'leaflet'
import { BrowserRouter } from 'react-router-dom'
import { FluentProvider, webLightTheme } from '@fluentui/react-components'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    
    <BrowserRouter>
      <App />
      </BrowserRouter>

    
  </StrictMode>,
)
