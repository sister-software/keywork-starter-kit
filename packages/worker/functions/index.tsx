import { App } from '@packages/common'
import React from 'react'

import type { renderToReadableStream as RenderToReadableStream } from 'react-dom/server'
// @ts-expect-error This export isn't yet defined.
import { renderToReadableStream as _renderToReadableStream } from 'react-dom/server.browser'
import { HTMLDocument } from '../components/Document'

const renderToReadableStream: typeof RenderToReadableStream = _renderToReadableStream

const renderReact: PagesFunction = async () => {
  let reactError: any

  let readableStream

  try {
    readableStream = await renderToReadableStream(
      <HTMLDocument>
        <App />
      </HTMLDocument>,
      {
        onError: (error) => {
          reactError = error
        },
      }
    )
  } catch (error) {
    let statusText = 'react Unknown Error'
    if (error instanceof Error) {
      statusText = error.message
    }

    if (reactError instanceof Error) {
      statusText += reactError.message
    }

    return new Response(undefined, {
      status: 500,
      statusText,
    })
  }

  try {
    return new Response(readableStream, {
      headers: {
        'Content-Type': 'text/html',
      },
    })
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
