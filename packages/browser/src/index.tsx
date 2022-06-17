import { App } from '@packages/common/components/App'
import React from 'react'

import { hydrateKeyworkApp } from 'keywork/react'
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
