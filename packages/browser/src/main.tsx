import { App, AppProps } from '@local/shared/components/App'
import { KeyworkApp } from 'keywork/react/browser'
import { waitUntilDOMReady } from 'keywork/timers/browser'
import React from 'react'
import './main.css'

waitUntilDOMReady().then(() => {
  const app = new KeyworkApp()

  return app.hydrate<AppProps>((staticProps) => (
    <React.StrictMode>
      <App {...staticProps} />
    </React.StrictMode>
  ))
})
