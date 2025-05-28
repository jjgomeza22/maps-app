import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MapsApp } from './MapsApp'

import { config } from '@maptiler/sdk';

if ( !navigator.geolocation ) {
  alert('Tu navegador no tiene opción de Geolocation')
  throw new Error('Tu navegador no tiene opción de Geolocation')
}

config.apiKey = 'MrGcFBAfgejdBRruVsiW';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MapsApp />
  </StrictMode>,
)
