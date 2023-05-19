const proxy = Proxy
export const proxies: Record<string, any> = {};
(window as any)._proxies = proxies

export function init() {
  (window as any).Proxy = class {
    constructor(target: any, handler: ProxyHandler<any>) {
      const p = new proxy(target, handler)
      if (target && target.$id) {
        proxies[target.$id] = p
      }
      return p
    }
  }
}

export function getConversion() {
  const conversation: {
    newChat: (username: string) => void
  } = proxies['conversation']
  return conversation
}
