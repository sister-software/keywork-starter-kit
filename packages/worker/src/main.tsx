import { App } from '@local/shared/components/App'
import { HTMLDocument } from '@local/worker/components/Document'
import { getReasonPhrase, StatusCodes } from 'http-status-codes'
import { DefaultWorkerBindings } from 'keywork/bindings'
import { matchPath } from 'keywork/paths'
import {
  KeyworkRequestHandler,
  RequestWithCFProperties,
  WorkerRequestHandler,
  _KeyworkRequestHandlerBase,
} from 'keywork/requests'
import { ErrorResponse, JSONResponse } from 'keywork/responses'

class TodoAppRouter extends KeyworkRequestHandler<DefaultWorkerBindings> {
  PageComponent = App
  DocumentComponent = HTMLDocument
}

class ExampleRouter extends KeyworkRequestHandler<DefaultWorkerBindings> {
  onRequestGet: PagesFunction<DefaultWorkerBindings> = async () => {
    return new JSONResponse({ hello: 'world' })
  }
}

class AssetRouter extends KeyworkRequestHandler<DefaultWorkerBindings> {
  onRequestGet: PagesFunction<DefaultWorkerBindings> = ({ env, request }) => {
    return env.ASSETS.fetch(request)
  }
}

type RouteHandlerLike<BoundAliases extends {} | null = null> =
  | KeyworkRequestHandler<BoundAliases, any, any, any>
  | { fetch: WorkerRequestHandler<BoundAliases> }

class KeyworkRequestRouter<BoundAliases extends {} | null = null> extends _KeyworkRequestHandlerBase<BoundAliases> {
  routePatternToHandler: Map<string, RouteHandlerLike<BoundAliases>>

  constructor(routePatterns: Array<[string, RouteHandlerLike<BoundAliases>]>) {
    super()
    this.routePatternToHandler = new Map(routePatterns)
  }

  public matchRoute(location: URL) {
    for (const pattern of this.routePatternToHandler.keys()) {
      const possibleMatch = matchPath(pattern, location.pathname)

      if (possibleMatch) return possibleMatch
    }

    return null
  }

  onRequestGet: PagesFunction<BoundAliases> = (context) => {
    const url = new URL(context.request.url)
    const match = this.matchRoute(url)
    const routeHandler = this.routePatternToHandler.get(match?.pattern.path || '')

    if (!routeHandler) {
      return new ErrorResponse(StatusCodes.NOT_FOUND, getReasonPhrase(StatusCodes.NOT_FOUND))
    }

    // TODO: replace with `isKeyworkRequestHandlerLike`
    if (routeHandler instanceof KeyworkRequestHandler) {
      return routeHandler.fetch(context)
    }

    return routeHandler.fetch(
      context.request as unknown as RequestWithCFProperties,
      context.env,
      context as unknown as ExecutionContext
    )
  }
}

const router = new KeyworkRequestRouter([
  ['/', new TodoAppRouter()],
  ['/example', new ExampleRouter()],
  ['*', new AssetRouter()],
])

export default router
