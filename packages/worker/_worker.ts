import { HelloWorldRouter } from '@local/worker/routers/HelloWorldRouter'
import { CloudflarePagesAssetRouter } from 'keywork/assets'
import { WorkerRouter } from 'keywork/routing'

const app = new WorkerRouter({
  displayName: 'Example Keywork App',
  middleware: [
    ['/static', new CloudflarePagesAssetRouter()],
    ['/', HelloWorldRouter],
    ['/foo/', HelloWorldRouter],
  ],
})

app.$prettyPrintRoutes()

export default app
