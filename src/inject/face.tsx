import { render } from "solid-js/web"
import { Face } from "../components/face"
import { getOrCreateMountPoint, moveCaretToEnd } from "../utils/dom"
import { dialog } from "../utils/style"
import { addDomAdditionHandler } from "./hook-points/dom-mutation"

addDomAdditionHandler(
  (node) => node.nodeType === Node.ELEMENT_NODE && (node as HTMLElement).querySelector('#textContent') !== null,
  (node) => {
    const textContent = (node as HTMLElement).querySelector('#textContent') as HTMLElement
    if (textContent) {
      textContent.addEventListener('keydown', e => {
        console.log('dd')
        if (e.key == "/") {
          const index = document.getSelection()?.getRangeAt(0)?.startOffset ??
            (textContent.textContent ?? " ").length - 1
          e.stopPropagation()
          e.preventDefault()

          const unmount = render(
            () => <Face
              class={dialog}
              onSelect={(i) => {
                unmount()
                textContent.focus()
                const txt = textContent.textContent?? ''
                const a = txt.substring(0,index)
                const b = txt.substring(index)
                textContent.textContent = `${a}[${i}]${b}`
                moveCaretToEnd(textContent)
              }}
              onCancel={() => {
                unmount()
                textContent.focus()
              }}
            />,
            getOrCreateMountPoint('#face-container')
          )
        }
      })
    }
  })
