import { patch } from '../patch'
import type Electron from 'electron'
declare function require(moduleName: string): any
const ipcRender: Electron.IpcRenderer = require('electron').ipcRenderer

export type StopSend = boolean
const sendHooks: Record<string, (args: any[]) => StopSend> = {

}

patch(ipcRender, 'send', ({ args, context, original }) => {
  if (typeof args[0] === 'string') {
    const hook = sendHooks[args[0]]
    if (hook && hook(args)) {
      return
    }
  }
  original.apply(context, args)
})

export function addSendHook(key: string, hook: (args: any[]) => StopSend) {
  sendHooks[key] = hook
}

export const emit = ipcRender.emit.bind(ipcRender)


type InvokeHook =
  | ((i: Promise<any>) => Promise<any>)
  | { kind: 'intercept', func: (param: { args: any[], context: any, original: (...args:any[]) => Promise<any> }) => Promise<any> }
const invokeHooks: Record<string, InvokeHook> = {}
patch(ipcRender, 'invoke', ({ args, context, original }) => {
  const [channel] = args
  if (invokeHooks[channel]) {
    const hook = invokeHooks[channel]
    if (typeof hook === 'function') {
      return hook(original.apply(context, args))
    }
    return hook.func({ args, context, original })
  }
  console.log("invoke", channel)
  return original.apply(context, args)
})

export function addInvokeHook(key: string, hook: InvokeHook) {
  invokeHooks[key] = hook
}

export const ipcRenderer = ipcRender
