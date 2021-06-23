import { StorageKeys, getItem, setItem } from './../../utils/storage'
import { ActionTree, MutationTree } from 'vuex'

interface AppState {
  sidebar:{
    opened:boolean
    withoutAnimation:boolean
    mode: 'horizon' | 'vertical'
  }
  device:'desktop'|'mobile'
  size:'mini'|'default'|'medium'|'default'
}

const state:AppState = {
  sidebar: {
    opened: getItem(StorageKeys.SidebarStatus) ? !!+getItem(StorageKeys.SidebarStatus) : true,
    withoutAnimation: false,
    mode: 'vertical',

  },
  device: 'desktop',
  size: getItem(StorageKeys.Size) || 'medium',
}

const mutations:MutationTree<AppState> = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      setItem(StorageKeys.SidebarStatus, 1)
    } else {
      setItem(StorageKeys.SidebarStatus, 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    setItem(StorageKeys.SidebarStatus, 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_MODE: (state, mode) => {
    state.sidebar.mode = mode
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  SET_SIZE: (state, size) => {
    state.size = size
    setItem(StorageKeys.Size, size)
  },
}

const actions:ActionTree<AppState, any> = {
  toggleSideBar ({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar ({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice ({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  toggleMode ({ commit }, mode) {
    commit('TOGGLE_MODE', mode)
  },
  setSize ({ commit }, size) {
    commit('SET_SIZE', size)
  },
}

export default {
  namespace: true,
  state,
  mutations,
  actions,
}
