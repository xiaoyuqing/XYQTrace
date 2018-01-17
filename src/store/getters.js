import {constInStore} from '../util/const'

export default {
  getGiftPage (state) {
    return Math.ceil(state.giftNum / constInStore.PAGESIZE)
  },
  getGifts: (state) => (page) => {
    return state.gifts[page - 1]
  },
  getSearchType (state) {
    return state.searchType
  },
  getSearchName (state) {
    return state.searchName
  },
  getSearchScore (state) {
    return state.searchScore
  },
  getSearchCategory (state) {
    return state.searchCategory
  },
  getGiftDetail (state) {
    return state.giftDetail
  },
  getFavorite (state) {
    return state.favorite
  },
  getCart (state) {
    return state.cart
  },
  getUser (state) {
    return state.user
  },
  getOrder (state) {
    return state.order
  },
  getContactInfo (state) {
    return state.contactInfo
  },
  getProcedureRecordDetail (state) {
    return state.procedureRecordDetail
  },
  getProcedureField (state) {
    return state.procedureField
  },
  getProcedureValueId (state) {
    return state.procedureValueId
  },
  getDetailType (state) {
    return state.detailType
  },
  getProductDetail (state) {
    return state.productDetail
  }
}
