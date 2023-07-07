import { render } from "solid-js/web";
import { getOrCreateMountPoint } from "../utils/dom";
import { addDomAdditionHandler } from "./hook-points/dom-mutation";
import { emit } from "./hook-points/ipcRender";
import { css } from '@emotion/css'
import { primaryTxtButton, secondaryTxtButton } from "../utils/style";

addDomAdditionHandler(

  (node) => node.nodeType === Node.ELEMENT_NODE && (node as HTMLElement).querySelector('#textContent') !== null,
  (node) => {
    const textContent = (node as HTMLElement).querySelector('#textContent') as HTMLElement
    if (textContent) {
      document.addEventListener(
        'paste',
        (e) => {
          if (e.clipboardData && e.clipboardData.files.length) {
            const file = e.clipboardData.files[0]
            if (file.type.startsWith('image')) {

              e.stopPropagation()
              e.preventDefault()


              const reader = new FileReader()
              reader.addEventListener('load', async (e) => {
                const data: ArrayBuffer = reader.result as any
                const unlink = require('fs/promises').unlink
                try {
                  await unlink('/tmp/wechat-img')
                } catch {}
                const write = require('fs/promises').writeFile
                await write('/tmp/wechat-img', new Uint8Array(data))
                let keydownHandler: (e: KeyboardEvent) => void
                const unmount = render(() => <div class={css`
                    position: absolute;
                    background-color: white;
                    top: 50px;
                    left: 50%;
                    transform: translateX(-50%);
                    padding: 10px;
                    display: flex;
                    flex-direction: column;
                    border-radius: var(--dialog-radius);
                    align-items: center;
                `}>
                  <img src="/tmp/wechat-img" class={css`max-width: 500vw;max-height:50vh;`} />
                  <div class={css`
                  display: flex;
    gap: 10px;
    padding-top: 10px;
    align-self: end;
                  `}>
                    <button
                      class={secondaryTxtButton}
                      onClick={() => {
                        document.removeEventListener('keydown', keydownHandler, { capture: true })
                        unmount()
                      }}>
                      Cancel
                    </button>
                    <button
                      class={primaryTxtButton}
                      onClick={() => {
                        document.removeEventListener('keydown', keydownHandler, { capture: true })
                        emit('SCREENSHOT::SAVE_Local_Success',
                          null, {
                          filePath: '/tmp/wechat-img',
                          isShare: false
                        })
                        unmount()
                      }}>
                      Send
                    </button>
                  </div>
                </div>,
                  getOrCreateMountPoint('#--paste-img'))

                keydownHandler = (e: KeyboardEvent) => {
                  console.log(e.key)
                  if (e.key === 'Escape') {
                    unmount()
                    e.stopPropagation()
                    e.preventDefault()
                    document.removeEventListener('keydown', keydownHandler, { capture: true })
                  }
                  if (e.key === 'Enter') {
                    unmount()
                    emit('SCREENSHOT::SAVE_Local_Success',
                      null, {
                      filePath: '/tmp/wechat-img',
                      isShare: false
                    })
                    e.stopPropagation()
                    e.preventDefault()
                    document.removeEventListener('keydown', keydownHandler, { capture: true })
                  }

                }
                document.addEventListener('keydown', keydownHandler, {
                  capture: true,
                })
              })
              reader.readAsArrayBuffer(
                file
              )
            }

          }
        },
        {
          capture: true
        }
      )
    }
  }
)
