import { Command } from './type'
import { getConversion } from '../inject/hook-points/proxy'
import { css } from '@emotion/css'
import { getContactList, getConversationList } from '../utils/wechat'

function openChat(username: string) {
  return () => {
    getConversion().newChat(username)
    setTimeout(() => {
      document.querySelector<HTMLElement>('#textContent')?.focus()
    }, 300)
  }
}

const item = css`
display: flex;
gap: 8px;
align-items: center;
`
export const chartTo: Command = {
  label: 'Chart to',
  execute: async () => {
    const contacts = await getContactList()
    const { conversation } = await getConversationList()
    const ids = new Set(contacts.contact.map(i => i.username))
    return conversation.filter(
      c => !ids.has(c.conversationName)
    )
      .map(conversation => {
        return {
          label: conversation.nickname,
          isMatch: (keywords: string) => conversation.nickname.includes(keywords),
          execute: openChat(conversation.conversationName),
          render: () => {
            return <div class={item}>
              <img style={{ "max-width": "30px" }} src={conversation.avatarUrl} />
              <span>{conversation.nickname}</span>
            </div>
          }

        }
      })
      .concat(
        contacts.contact.map((contact) => ({
          label: contact.nickname,
          execute: openChat(contact.username),
          isMatch: (keywords) => contact.pyquan.includes(keywords),
          render: () => {
            return <div class={item}>
              <img style={{ "max-width": "30px" }} src={contact.hdAvatarUrl} />
              <span>{contact.nickname}</span>
            </div>
          }
        }))
      )
  }
}
