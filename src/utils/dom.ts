export function getOrCreateMountPoint(selector: string, tag: string = 'div') {
  let el = document.querySelector(selector)
  if (el === null) {
    el = document.createElement(tag)
    document.body.append(
      el
    )
  }
  return el

}
