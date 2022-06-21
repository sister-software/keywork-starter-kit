import { KeyworkHTMLDocumentAppRoot } from 'keywork/react'
import React from 'react'

export interface KeyworkHTMLDocumentProps {
  children: React.ReactNode
}

export const HTMLDocument: React.FC<KeyworkHTMLDocumentProps> = ({ children }) => {
  return (
    <html>
      <head>
        <title>ESbuild SSR Example</title>
        <link href="/main.css" rel="stylesheet" />
      </head>
      <body>
        <div id={KeyworkHTMLDocumentAppRoot}>{children}</div>

        <script src="/main.js"></script>
      </body>
    </html>
  )
}
