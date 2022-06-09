import { App } from '@packages/common'
import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// function renderClientSide() {
//   const rootElement = document.getElementById('root') as HTMLElement
//   const reactRoot = ReactDOM.createRoot(rootElement)

//   reactRoot.render(
//     <React.StrictMode>
//       <App />
//     </React.StrictMode>
//   )
// }

function renderHydrate() {
  const root = document.getElementById('root') as HTMLElement

  console.debug('Hydrating...')

  ReactDOM.hydrateRoot(
    root,
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
