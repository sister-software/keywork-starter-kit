import { hydrateKeyworkApp } from 'keywork/react'
import React from 'react'
import { App } from '~common/components/App'
import './index.css'

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
