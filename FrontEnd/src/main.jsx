import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import App from './App.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

//bun create vite

//Select a framework: React
//Select a variant: JavaScript
//Install with bun and start now? Yes

//ezt itt consol-ba
//bun add bootstrap
//bun add bootstrap-icons
//bun add react-router-dom
//bun add -d jsdom @testing-library/jest-dom 
