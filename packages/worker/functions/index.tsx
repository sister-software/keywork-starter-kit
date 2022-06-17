import { DefaultWorkerBindings } from 'keywork/bindings'
import { KeyworkRequestHandler } from 'keywork/requests'
import { App } from '~common/components/App'
import { HTMLDocument } from '~worker/components/Document'

class ExampleAppWorker extends KeyworkRequestHandler<DefaultWorkerBindings, {}> {
  PageComponent = App
  DocumentComponent = HTMLDocument
}

const worker = new ExampleAppWorker()

export const onRequest = worker.fetch
