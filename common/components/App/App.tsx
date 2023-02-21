import React, { CSSProperties, useCallback, useState } from 'react'
import './App.css'
import Logo from './logo.svg'

function createLogoStyle(hue: number) {
  return { '--hue': `${hue}deg` } as CSSProperties
}

const defaultHue = createLogoStyle(193)

export interface AppProps {
  greeting: string
}

export const App: React.FC<AppProps> = ({ greeting }) => {
  const [logoStyle, setLogoStyle] = useState(defaultHue)

  const randomizeColor = useCallback(() => {
    const nextHue = Math.floor(Math.random() * 360)
    setLogoStyle(createLogoStyle(nextHue))
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <Logo className="App-logo" style={logoStyle} />

        <h1>{greeting}</h1>
        <p>
          <button onClick={randomizeColor} type="button">
            Click me, I&#39;m hydrated!
          </button>
        </p>

        <p>
          You can edit this file in <code>packages/shared/components/App/App.tsx</code>.
        </p>
        <a className="App-link" href="https://keywork.app" target="_blank" rel="noopener noreferrer">
          Visit the Keywork documentation
        </a>
      </header>
    </div>
  )
}
