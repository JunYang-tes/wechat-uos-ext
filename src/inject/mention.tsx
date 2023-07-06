import { render } from 'solid-js/web';
import { Mention } from '../components/mention'
import { css } from '@emotion/css'
import { getOrCreateMountPoint } from '../utils/dom';
import { addDomAdditionHandler } from './hook-points/dom-mutation'
import { proxies } from './hook-points/proxy'

const style = document.createElement('style')
style.innerHTML=`
.at-list {
  visibility: hidden;
}
`
document.body.append(style)

addDomAdditionHandler(
  (node) => node.nodeType === Node.ELEMENT_NODE && (node as HTMLElement).querySelector('#textContent') !== null,
  (node) => {
    const textContent = (node as HTMLElement).querySelector('#textContent') as HTMLElement
    if (textContent) {
      (node as HTMLElement).addEventListener('keyup', (event) => {
        if (event.key === '@') {
          const users: Array<{
            username: string,
            nickName: string,
            displayName: string,
            hdAvatarUrl: string,
          }> = proxies.groupMembers?.groupMembers ?? []
          if (users.length > 0) {
            console.log("SHOW")
            const umount = render(() => <Mention
              class={css`
                    position: absolute;
                    background-color: white;
                    width: min(500px, 80vw);
                    top: 50px;
                    left: 50%;
                    transform: translateX(-50%);
            `}
              users={users}
              onSelect={(user) => {
                console.log(user)
                const items = document.querySelectorAll('.at-list__item__container')
                const title = user.displayName || user.nickName || user.username
                for (const item of items) {
                  if (item.textContent === title) {
                    (item as HTMLElement).click()
                    break
                  }
                }
                umount()
              }}
              onCancel={() => {
                umount()
                textContent.focus()
              }}
            />,
              getOrCreateMountPoint('#mention-container')
            )
          }
        }
      })
    }
  }
)

