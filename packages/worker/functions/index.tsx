import { App } from '@packages/common/components/App'

import { DefaultWorkerBindings } from 'keywork/bindings'
import { KeyworkRequestHandler } from 'keywork/requests'
import { HTMLDocument } from '../components/Document'

class ExampleAppWorker extends KeyworkRequestHandler<DefaultWorkerBindings, {}> {
  PageComponent = App
  DocumentComponent = HTMLDocument
}

const worker = new ExampleAppWorker()

export const onRequest = worker.fetch
