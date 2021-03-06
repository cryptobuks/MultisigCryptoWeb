import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import VuexPersistence from 'vuex-persist'

const createStore = () => {
  return new Vuex.Store({
    state: {
      setupInfo: {
        devicePlan: '',
        thisdeviceInfo: '',
        publicInfo: ''
      },
      mainView: 0

    },
    actions,
    mutations,
    plugins: [new VuexPersistence().plugin]
  })
}

export default createStore
