import { AppHTMLDocument } from '@local/worker/components/Document'
import { HTMLResponse } from 'keywork/responses'

export class AppHTMLResponse extends HTMLResponse {
  DocumentComponent = AppHTMLDocument
}
