import { ipcRenderer } from '../inject/hook-points/ipcRender'
import { Command } from './type'
import {getConversion} from '../inject/hook-points/proxy'

export const chartTo: Command = {
  label: 'Chart to',
  execute: async () => {
    const result: {
      contact: Array<{ username: string, nickname: string, hdAvatarUrl: string }>
    } = await ipcRenderer.invoke('ContactManager.getContactList', [])
    return result.contact.map((contact) => ({
      label: contact.nickname,
      execute: () => getConversion().newChat(contact.username)
    }))
  }
}
