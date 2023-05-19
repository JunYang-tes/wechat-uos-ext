import { SearchList } from './search-list'
import pinyin from 'pinyin'
import { css } from '@emotion/css'

export type User = {
  nickName: string
  displayName: string
  hdAvatarUrl: string
}

const item = css`
display: flex;
gap: 8px;
align-items: center;
`
function text(user: UserInternal) {
  return <div class={item}>
    <img style={{ "max-width": "30px" }} src={user.user.hdAvatarUrl} />
    {user.user.displayName || user.user.nickName || "N/A"}
  </div>
}

type UserInternal = {
  user: User
  keywords: string[]
}

function isMatch(kw: string, user: UserInternal) {
  return user.keywords.some(item => item.toLowerCase().includes(kw.toLowerCase()))
}

function getKeywords(user: User) {
  const kw: string[] = []
  if (user.displayName) {
    kw.push(pinyin(user.displayName, {
      style: pinyin.STYLE_NORMAL
    })
      .map(i => i[0])
      .join('')
    )
  }
  if (user.nickName) {
    kw.push(pinyin(user.nickName, {
      style: pinyin.STYLE_NORMAL
    })
      .map(i => i[0])
      .join('')
    )

  }
  return kw
}

export function Mention<T extends User>(props: {
  class?: string
  users: T[]
  onSelect: (user: T) => void
  onCancel?: () => void
}) {
  return <SearchList
    class={props.class}
    data={props.users.map(user => ({
      user,
      keywords: getKeywords(user)
    }))}
    onCancel={props.onCancel}
    text={text}
    isMatch={isMatch}
    onSelect={(i) => props.onSelect(i.user)}
  />
}
