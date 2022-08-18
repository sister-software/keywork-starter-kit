import { App, AppProps } from '@local/shared/components/App'
import { AppHTMLDocument } from '@local/worker/components/Document'
import { KeyworkRouter } from 'keywork/router'
import React from 'react'

// Declaring a router...
export const HelloWorldRouter = new KeyworkRouter({
  displayName: 'Hello World Router',
  react: {
    DocumentComponent: AppHTMLDocument,
  },
})

// Declaring a route that returns a React element...
HelloWorldRouter.get('/', async ({ request }) => {
  const url = new URL(request.url)
  // Reading some optional static props from the URL search params...
  const staticProps: AppProps = {
    greeting: url.searchParams.get('greeting') || 'Hello there!',
  }

  return <App {...staticProps} />
})

// Declaring a route that returns JSON...
HelloWorldRouter.get('/example-json', () => {
  return { hello: 'world' }
})

// Declaring a route with URL params...
interface ExampleParams {
  foo: string
  bar: string
}

HelloWorldRouter.get<ExampleParams>('/json/:foo/:bar', ({ params }) => {
  return { foo: params.foo, bar: params.bar }
})
