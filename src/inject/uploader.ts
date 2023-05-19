import { hookAssign } from './hook-points/global'
import { patch } from './patch'
type WebUploader = {
  create(...args: any[]): WebUploaderInstance
}
type WebUploaderInstance = {
  addFile(file: any): void
}
let uploader: WebUploaderInstance | null
hookAssign<WebUploader>('WebUploader', (value) => {
  patch(
    value,
    'create',
    ({ original, context, args }) => {
      const instance = original(...args) as WebUploaderInstance
      uploader = instance
      console.log(instance)
      return instance
    }
  )
  return value
})

export function getUploader() {
  return uploader!
}
