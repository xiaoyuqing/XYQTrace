import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'// 会在控制打印mutation

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

const state = {
  gifts: [],
  giftNum: {},
  searchType: '',
  searchName: '',
  searchScore: {},
  searchCategory: '',
  giftDetail: {},
  favorite: [],
  cart: [],
  user: {},
  order: [],
  contactInfo: [],
  procedureRecordDetail: {},
  procedureField: [],
  procedureValueId: '',
  detailType: '',
  searchContext: '',
  productDetail: []
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  strict: false,
  plugins: debug ? [createLogger()] : []
})
