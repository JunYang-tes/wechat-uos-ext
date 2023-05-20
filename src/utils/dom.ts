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
