
class Monitor {
  static instance
  constructor () {
    if (!Monitor.instance) {
      Monitor.instance = true
      this.init()
    }
  }

  init () {
    this.errorWatch()
  }

  errorWatch () {
    // 重写window.onerror
    window.onerror = function (
      event: Event | string,
      source?: string,
      lineno?: number,
      colno?: number,
      error?: Error,
    ) {
      console.log('I make a mistake', event, source, lineno, colno, error)
      // return true // 返回 true 的时候，异常不会向上抛出，控制台不会输出错误
    }
    // 捕获网络请求错误 捕获阶段获取
    window.addEventListener('error', (e:any) => {
      if (e.target !== window) { // 避免重复上报
        console.log({
          url: window.location.href, // 引用资源地址
          srcUrl: e.target.src, // 资源加载出错地址
          target: e.target.tagName,
        })
      }
    }, true)

    // 捕捉promise
    window.addEventListener('unhandledrejection', function (e:PromiseRejectionEvent) {
      console.log('promise error', e)
    })
  }
}
(window as any).ErrorWatch = new Monitor()
