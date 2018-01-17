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
  }
}
