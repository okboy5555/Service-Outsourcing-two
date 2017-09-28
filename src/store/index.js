import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    user: {},
    user_info: null,
    token: '',
    is_login: false,
    time: 60,
    eval_jobs: [],
    timer: '',
    rest_time: 5400,
    countdown_sec: '00',
    countdown_min: '00',
    countdown_hour: '00',
    test: '',
    list: [],// marked list
    analysis_list: [],
  },
  actions,
  getters,
  mutations
})
