import { HelloWorldRouter } from '@local/worker/routers/HelloWorldRouter'
import { CloudflarePagesAssetRouter } from 'keywork/assets'
import { WorkerRouter } from 'keywork/routing'

// Create a router to receive all incoming requests...
const app = new WorkerRouter({
  // A display name used for debugging and log messages.
  displayName: 'Example Keywork App',
  // Here we combine our routers...
  middleware: [
    // The example routes...
    HelloWorldRouter,
    // And the static assets...
    new CloudflarePagesAssetRouter(),
  ],
})

// Log our known routes to the console for debugging...
app.$prettyPrintRoutes()

// Finally, export our router so that Cloudflare Workers can send requests...
export default app
