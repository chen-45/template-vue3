import { createStore } from 'vuex'
import getters from './getters'

import permission from './modules/permission'
import user from './modules/user'
import app from './modules/app'

const store = createStore({
  modules: {
    user,
    permission,
    app,
  },
  getters,
})

export default store
