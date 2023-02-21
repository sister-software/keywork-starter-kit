import { KeyworkHTMLDocumentAppRoot } from 'keywork/components'
import React from 'react'

export interface AppHTMLDocumentProps {
  children: React.ReactNode
}

export const AppHTMLDocument: React.FC<AppHTMLDocumentProps> = ({ children }) => {
  return (
    <html>
      <head>
        <title>ESbuild SSR Example</title>
        <link href="/static/main.css" rel="stylesheet" />
      </head>
      <body>
        <div id={KeyworkHTMLDocumentAppRoot}>{children}</div>

        <script src="/static/main.js"></script>
      </body>
    </html>
  )
}
