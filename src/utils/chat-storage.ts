import { Dexie, Table } from 'dexie'

const db = new Dexie("db")
db.version(1).stores({
  messages: "++id,ToUserName,FromUserName,MMActualContent"
})


type Message = {
  MMActualContent: string
  MMPeerUserName: string
  MMSendContent: string
  MMTime: string
  FromUserName: string
  ToUserName: string
}
const messages = (db as any)["messages"] as Table<Message>
// const db = new IndexedDb({
//   namespace: 'db'
// }, () => console.log('db created', db), console.error)

// let messages: MinimongoBaseCollection<Message> | null = null
// db.addCollection("messages", () => {
//   messages = (db as any).messages
// }, console.error)


export function insertMessage(msg: Message) {
  return messages.add(msg)
}

export function getMessages(username: string, limit: number) {
  return messages
    .where("ToUserName")
    .equals(username)
    .or("FromUserName")
    .equals(username)
    .limit(limit)
    .toArray()
}

export function removeByUserName(username: string) {
  messages.where("ToUserName")
    .equals(username)
    .or("FromUserName")
    .equals(username)
    .delete()
}
