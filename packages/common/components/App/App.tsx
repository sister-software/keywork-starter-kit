import React, { CSSProperties, useCallback, useState } from 'react'
import './App.css'
import Logo from './logo.svg'

function createLogoStyle(hue: number) {
  return { '--hue': `${hue}deg` } as CSSProperties
}

const defaultHue = createLogoStyle(193)

export const App: React.FC = () => {
  const [logoStyle, setLogoStyle] = useState(defaultHue)

  const randomizeColor = useCallback(() => {
    const nextHue = Math.floor(Math.random() * 360)
    setLogoStyle(createLogoStyle(nextHue))
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <Logo className="App-logo" style={logoStyle} />

        <p>
          <button onClick={randomizeColor} type="button">
            Click me, I&#39;m hydrated!
          </button>
        </p>

        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  )
}
