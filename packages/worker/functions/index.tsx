import { App } from '@packages/common'
import React from 'react'

import { renderToReadableStream as RenderToReadableStream } from 'react-dom/server'
// @ts-expect-error This export isn't yet defined.
import { renderToReadableStream as _renderToReadableStream } from 'react-dom/server.browser'
import { HTMLDocument } from '../components/Document'

const renderToReadableStream: typeof RenderToReadableStream = _renderToReadableStream

export const renderReact: PagesFunction = async (data) => {
  console.log('Check your terminal! This is the URL that requested!', data.request.url.toString())

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

export const onRequestGet: PagesFunction = async (data) => {
  try {
    const response = await renderReact(data)

    return response
  } catch (error) {
    let statusText = 'Unknown Error'
    if (error instanceof Error) {
      statusText = error.message
    }
    return new Response(undefined, {
      status: 500,
      statusText,
    })
  }
}
