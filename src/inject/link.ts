document.addEventListener('click', (e) => {
  const el = e.target as HTMLElement
  const link = el.getAttribute('data-link')
  if (el.tagName === 'A' && link?.startsWith('http')) {
    e.preventDefault()
    e.stopPropagation()
    require('child_process').exec('xdg-open ' + link)
  }

}, { capture: true })
