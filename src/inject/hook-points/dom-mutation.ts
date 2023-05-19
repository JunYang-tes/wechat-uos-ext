const additionHandler: Array<{
  test: (node: Node) => boolean
  handler: (node: Node) => void
}> = []

document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('app')!
  const observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      m.addedNodes.forEach((node) => {
        additionHandler.forEach(({ test, handler }) => {
          if (test(node)) {
            handler(node)
          }
        })
      })
    }
  })
  observer.observe(el, {
    childList: true,
    subtree: true,
  })
})

export function addDomAdditionHandler(
  test: (node: Node) => boolean,
  handler: (node: Node) => void
) {
  additionHandler.push({
    test,
    handler,
  })
}
