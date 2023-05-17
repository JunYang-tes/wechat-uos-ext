import { addInvokeHook, ipcRenderer } from './hook-points/ipcRender'
import { Dexie, Table } from 'dexie'
import { requireModule } from './hook-points/req'

const db = new Dexie("db")
db.version(1).stores({
  recallMessages: "++id,msgSvrid,content"
})

const recallMsgDb = (db as any).recallMessages as Table<{
  msgSvrid: number,
  content: string
}>

type Messsage = {
  msgid: number
  msgSvrid: number
  content: string
  talkerId: number
  conversationName: string
  chatroomMemberUsername: string
  msgType: number
  createTime: number
}
const messages = new Map<number, Messsage>()
const recalledMessages: Record<
  number,
  { content: string }
> = {}

recallMsgDb.toArray()
  .then((msgs) => {
    for (const m of msgs) {
      recalledMessages[m.msgSvrid] = m
    }
  })

addInvokeHook('MessageManager.getMessageList', async (p) => {
  const msg: { msg: Array<Messsage> } = await p
  for (const m of msg.msg) {
    if (m.msgType === 10000) {
      const recalledMsg = recalledMessages[m.msgSvrid] //await db.table('messages').get(m.msgid)
      if (recalledMsg) {
        m.content = "已撤回：" + recalledMsg.content
      }
    }
  }
  console.log("MessageManager.getMessageList", msg)
  return msg
})

ipcRenderer.on("alita_notify", (_, t: { eventType: number, content: Uint8Array }) => {
  if (t.eventType === 12) {
    const msg: {
      msgId: number,
      newMsg: Messsage
    } = requireModule('alita').alita
      .MessageUpdateRequest.decode(t.content)
    if (msg.newMsg.msgType === 10000) {
      const oldMsg =
        messages.get(msg.newMsg.msgSvrid)
      if (oldMsg) {
        recallMsgDb.add(
          oldMsg
        )
        recalledMessages[msg.newMsg.msgSvrid] = messages.get(msg.newMsg.msgSvrid)!
      }
    } else {
      messages.set(msg.newMsg.msgSvrid, msg.newMsg)
    }
  }
})

