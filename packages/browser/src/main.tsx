import { App } from '@local/shared/components/App'
import { hydrateKeyworkApp } from 'keywork/react'
import React from 'react'
import './main.css'

function renderHydrate() {
  console.debug('Hydrating...')

  hydrateKeyworkApp(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
  console.debug('Hydrated!')
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderHydrate)
} else {
  renderHydrate()
}
