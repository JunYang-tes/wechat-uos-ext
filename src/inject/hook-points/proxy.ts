const proxy = Proxy
const proxyInstance: Record<string, any> = {};
(window as any)._proxies = proxyInstance

export function init() {
  (window as any).Proxy = class {
    constructor(target: any, handler: ProxyHandler<any>) {
      if (target && target.$id) {
        proxyInstance[target.$id] = target
      }
      return new proxy(target, handler)
    }
  }
}

