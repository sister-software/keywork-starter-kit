import { App } from '@packages/common'
import React from 'react'

import { renderToReadableStream as RenderToReadableStream } from 'react-dom/server'
// @ts-expect-error This export isn't yet defined.
import { renderToReadableStream as _renderToReadableStream } from 'react-dom/server.browser'
import { HTMLDocument } from '../components/Document'

const renderToReadableStream: typeof RenderToReadableStream = _renderToReadableStream

export const onRequestGet: PagesFunction = async (data) => {
  console.debug('Check your terminal! This is the URL that requested!', data.request.url.toString())

  const readableStream = await renderToReadableStream(
    <HTMLDocument>
      <App />
    </HTMLDocument>
  )

  return new Response(readableStream, {
    headers: {
      'Content-Type': 'text/html',
    },
  })
}
