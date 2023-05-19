const ids = {
  'alita': '2cfa',
  'vue':'7a23',
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
