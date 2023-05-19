const proxy = Proxy
export const proxies: Record<string, any> = {};
(window as any)._proxies = proxies

export function init() {
  (window as any).Proxy = class {
    constructor(target: any, handler: ProxyHandler<any>) {
      if (target && target.$id) {
        proxies[target.$id] = target
      }
      return new proxy(target, handler)
    }
  }
}

