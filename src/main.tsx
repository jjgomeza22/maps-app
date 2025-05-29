import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MapsApp } from './MapsApp'

import { config } from '@maptiler/sdk';
import { envs } from './config/envs';

if ( !navigator.geolocation ) {
  alert('Tu navegador no tiene opción de Geolocation')
  throw new Error('Tu navegador no tiene opción de Geolocation')
}

config.apiKey = envs.GEO_KEY;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MapsApp />
  </StrictMode>,
)
