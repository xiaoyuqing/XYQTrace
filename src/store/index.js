import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

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
  getters
})
