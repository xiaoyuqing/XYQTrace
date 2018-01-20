import axios from 'axios'
import { requestInShow } from '../../util/const'
export default {
  deleteUserFromStore ({commit}) {
    commit('DELETEUSER')
  },
  loadUserFromLocal ({commit}) {
    commit('LOADUSER')
  },
  loadGiftNumFromLocal ({commit}) {
    commit('LOADGIFTNUM')
  },
  loadGiftsFromLocal ({commit}, payload) {
    commit('LOADGIFTS', payload)
  },
  setSearchType ({commit}, payload) {
    commit('SETSEARCHTYPE', payload)
  },
  setScore ({commit}, payload) {
    commit('SETSCORE', payload)
  },
  setCategory ({commit}, payload) {
    commit('SETCATEGORY', payload)
  },
  setName ({commit}, payload) {
    commit('SETNAME', payload)
  },
  loadGiftDetailFromLocal ({commit}) {
    commit('LOADGIFTDETAIL')
  },
  loadFavoriteFromLocal ({commit}) {
    commit('LOADFAVORITE')
  },
  loadCartFromLocal ({commit}) {
    commit('LOADCART')
  },
  clearCart ({commit}) {
    commit('CLEARCART')
  },
  loadContactInfoFromLocal ({commit}) {
    commit('LOADCONTACTINFO')
  },
  loadOrderFromLocal ({commit}) {
    commit('LOADORDER')
  },
  loadProcedureRecordDetailFromLocal ({commit}) {
    commit('LOADPROCEDURERECORDDETAIL')
  },
  loadProcedureFieldFromLocal ({commit}) {
    commit('LOADPROCEDUREFIELD')
  },
  loadProcedureValueIdFromLocal ({commit}) {
    commit('LOADPROCEDUREVALUEID')
  },
  loadDetailTypeFromLocal ({commit}) {
    commit('LOADDETAILTYPE')
  },
  loadProductDetail ({commit}) {
    commit('SET_PRODUCT_DETAIL')
  },
  setContext ({commit}, payload) {
    commit('SET_CONTEXT', payload)
  },
  productFind ({commit, state}) {
    return new Promise((resolve, reject) => {
      axios.get(requestInShow.SEARCH, {params: {
        name: state.searchContext,
        current_page: 1,
        size: 10
      }})
      .then((res) => {
        let product = {}
        if (res.data) {
          product = res.data
        } else {
          product = {
            rows: [],
            total: 0
          }
        }
        commit('SET_PRODUCT_DETAIL', product)
        resolve()
      })
    })
  }
}
