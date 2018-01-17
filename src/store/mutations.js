import {lsKeyInStore, lsKeyInEnterprise} from '../util/const'
import Vue from 'vue'

export default {
  DELETEUSER (state) {
    state.user = {}
    state.favorite = []
    state.cart = []
    state.contactInfo = []
    state.order = []
    localStorage.clear()
  },
  LOADUSER (state) {
    state.user = JSON.parse(localStorage.getItem(lsKeyInStore.USER))
  },
  GETGIFTNUM (state, payload) {
    state.giftNum = payload
  },
  LOADGIFTNUM (state) {
    state.giftNum = JSON.parse(localStorage.getItem(lsKeyInStore.GIFTNUM))
  },
  LOADGIFTS (state, payload) {
    const gifts = JSON.parse(localStorage.getItem((lsKeyInStore.GIFTS + payload)))
    // 当一页展示礼品数少于8个时，将数组中为null的剔除
    // 不能直接向数组赋值，因为框架检测不到数组的变化
    Vue.set(state.gifts, payload - 1, gifts.filter((gift) => gift !== null))
  },
  SETSEARCHTYPE (state, payload) {
    state.searchType = payload
  },
  SETSCORE (state, payload) {
    state.searchScore = payload
  },
  SETCATEGORY (state, payload) {
    state.searchCategory = payload
  },
  SETNAME (state, payload) {
    state.searchName = payload
  },
  LOADGIFTDETAIL (state) {
    state.giftDetail = JSON.parse(localStorage.getItem(lsKeyInStore.GIFTDETAIL))
  },
  LOADFAVORITE (state) {
    state.favorite = JSON.parse(localStorage.getItem(lsKeyInStore.FAVORITE))
  },
  LOADCART (state) {
    state.cart = JSON.parse(localStorage.getItem(lsKeyInStore.CART))
  },
  CLEARCART (state) {
    state.cart = []
  },
  LOADCONTACTINFO (state) {
    state.contactInfo = JSON.parse(localStorage.getItem(lsKeyInStore.CONTACTINFO))
  },
  LOADORDER (state) {
    state.order = JSON.parse(localStorage.getItem(lsKeyInStore.ORDER))
  },
  LOADPROCEDURERECORDDETAIL (state) {
    state.procedureRecordDetail = JSON.parse(localStorage.getItem(lsKeyInEnterprise.PROCEDURERECORDDETAIL))
  },
  LOADPROCEDUREFIELD (state) {
    state.procedureField = JSON.parse(localStorage.getItem(lsKeyInEnterprise.PROCEDUREFIELD))
  },
  LOADPROCEDUREVALUEID (state) {
    state.procedureValueId = JSON.parse(localStorage.getItem(lsKeyInEnterprise.PROCEDUREVALUEID))
  },
  LOADDETAILTYPE (state) {
    state.detailType = JSON.parse(localStorage.getItem(lsKeyInEnterprise.DETAILTYPE))
  },
  SET_PRODUCT_DETAIL (state) {
    state.productDetail = JSON.parse(localStorage.getItem(lsKeyInStore.PRODUCT_Detail))
  }
}
