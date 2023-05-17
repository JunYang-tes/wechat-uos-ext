const ids = {
  'alita': '2cfa'
}
type Modules = keyof typeof ids
function getModuleId(name: Modules) {
  return ids[name]
}
export function requireModule(name: Modules): any {
  return (window as any)._require(
    getModuleId(name)
  )
}
