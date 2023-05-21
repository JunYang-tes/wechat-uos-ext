export function getOrCreateMountPoint(selector: string, tag: string = 'div') {
  let el = document.querySelector(selector)
  if (el === null) {
    el = document.createElement(tag)
    const container = document.body
    container.append(
      el
    )
  }
  return el

}
export function moveCaretToEnd(element: HTMLElement | HTMLTextAreaElement) {
  if ((element as Node).nodeName !== "TEXTAREA" && element.getAttribute("contenteditable") === "true") {
    element.focus()
    window.getSelection()?.selectAllChildren(element)
    window.getSelection()?.collapseToEnd()
  } else {
    element.focus();
    (element as HTMLTextAreaElement).select()
    window.getSelection()?.collapseToEnd()
  }
}
