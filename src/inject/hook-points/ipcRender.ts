import { patch } from '../patch'
import type Electron from 'electron'
declare function require(moduleName: string): any
const ipcRender:Electron.IpcRenderer = require('electron').ipcRenderer

export type StopSend = boolean
const sendHooks: Record<string, (args: any[]) => StopSend> = {

}

patch(ipcRender, 'send', ({ args, context, original }) => {
  if (typeof args[0] === 'string') {
    const hook = sendHooks[args[0]]
    if(hook && hook(args)) {
      return
    }
  }
  original.apply(context, args)
})

export function addSendHook(key: string, hook: (args: any[]) => StopSend) {
  sendHooks[key] = hook
}

export const emit = ipcRender.emit.bind(ipcRender)


const invokeHooks: Record<string, (i:Promise<any>) => Promise<any>> = {}
patch(ipcRender,'invoke',( { args, context, original }) => {
  const [channel] = args
  if(invokeHooks[channel]) {
    const hook = invokeHooks[channel]
    return hook(original.apply(context, args))
  }
  console.log("invoke",channel)
  return original.apply(context, args)
})

export function addInvokeHook(key: string, hook: (i:Promise<any>) => Promise<any>) {
  invokeHooks[key] = hook
}

export const ipcRenderer = ipcRender
