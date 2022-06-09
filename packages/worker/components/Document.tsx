import React from 'react'

export interface KeyworkHTMLDocumentProps {
  children: React.ReactNode
}

export const HTMLDocument: React.FC<KeyworkHTMLDocumentProps> = ({ children }) => {
  return (
    <html>
      <head>
        <title>ESbuild SSR Example</title>
        <link href="/index.css" rel="stylesheet" />
      </head>
      <body>
        <div id="root">{children}</div>

        <script src="/index.js"></script>
      </body>
    </html>
  )
}
