// import { ElMessage, ElNotification } from "element-plus"
// import { MessageType } from "element-plus/lib/el-message/src/types"

const DOWNLOAD = 'download-a'
const OPEN = 'open-a'
type LoopFunc = () => any

export function download (file: {
  path: string
  name: string
}): void {
  let a = document.getElementById(DOWNLOAD)
  if (!a) {
    a = document.createElement('a')
    document.appendChild(a)
  }
  a.setAttribute('id', DOWNLOAD)
  a.setAttribute('href', file.path)
  a.setAttribute('download', file.name)
  a.click()
}

export function openPage (url: string): void {
  let a = document.getElementById(OPEN)
  if (!a) {
    a = document.createElement('a')
    document.body.appendChild(a)
    a.setAttribute('target', '_bank')
    a.setAttribute('rel', 'noopener')
  }
  a.setAttribute('id', OPEN)
  a.setAttribute('href', url)
  a.click()
}
/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime (time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if ((/^[0-9]+$/.test(time))) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  }
  const timeString = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    return value.toString().padStart(2, '0')
  })
  return timeString
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime (time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d.getTime()) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}
export function getQueryObject (url: string) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

export function deepClone<T> (source: T): T {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj as T
}

export function createUniqueString () {
  const timestamp = +new Date() + ''
  const randomNum = parseInt((1 + Math.random()) * 65536 + '') + ''
  return (+(randomNum + timestamp)).toString(32)
}

export function hasClass (ele: HTMLElement, cls: string) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

export function addClass (ele: HTMLElement, cls: string) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

export function removeClass (ele: HTMLElement, cls: string) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}
export function debounce (func: LoopFunc, wait = 300, immediate = false) {
  let timeout, context, args, res

  return function (...params) {
    context = this
    args = [...params]
    if (timeout) {
      clearTimeout(timeout)
    }
    if (immediate) {
      const canRun = !timeout
      setTimeout(() => {
        timeout = null
      }, wait)
      if (canRun) {
        res = func.apply(context, args)
      }
    } else {
      setTimeout(() => {
        res = func.apply(context, args)
      }, wait)
    }
    return res
  }
}
export function throttle (func: LoopFunc, wait = 300) {
  let timeout; let context; let args; let result; let previous = 0
  const later = function () {
    previous = new Date().getTime()
    timeout = null
    result = func.apply(context, args)
    context = args = null
    return result
  }
  return function (...params) {
    args = [...params]
    context = this
    const now = new Date().getTime()
    const remain = wait - (now - previous)
    if (remain <= 0 || remain > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      result = func.apply(context, args)
      context = args = null
      return result
    } else if (!timeout) {
      timeout = setTimeout(later, remain)
    }
  }
}
