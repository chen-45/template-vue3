
export enum StorageKeys {
  AppToken='app-token',
  SidebarStatus='sidebarStatus',
  Size='size'
}

function deserialize (val) {
  if (typeof val !== 'string') {
    return undefined
  }
  try {
    return JSON.parse(val)
  } catch (e) {
    return val || undefined
  }
}

export function getToken () {
  return getItem(StorageKeys.AppToken)
}
export function setToken (value) {
  return setItem(StorageKeys.AppToken, value)
}
export function removeToken () {
  return removeItem(StorageKeys.AppToken)
}

/**
 *
 * @param key Returns the name of the nth key in the list
 * @param def default value
 * @returns
 */
export function getItem (key, def?) {
  const val = deserialize(localStorage.getItem(key))
  return val || def
}

export function setItem (key, val) {
  if (val === undefined) {
    return localStorage.remove(key)
  }
  localStorage.setItem(key, JSON.stringify(val))
  return val
}

export function removeItem (key) {
  localStorage.removeItem(key)
}

export function clearItems () {
  localStorage.clear()
}
