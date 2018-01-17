export const lsKeyInStore = {
  'GIFTNUM': 'giftNum',
  'GIFTS': 'gifts',
  'GIFTDETAIL': 'giftDetail',
  'FAVORITE': 'favorite',
  'CART': 'cart',
  'USER': 'user',
  'CONTACTINFO': 'contactInfo',
  'ORDER': 'order',
  'PRODUCT_Detail': 'productDetail'
}

export const lsKeyInEnterprise = {
  'AUTH': 'auth',
  'USER': 'user',
  'PROCEDURERECORDDETAIL': 'procedureRecordDetail',
  'PROCEDUREFIELD': 'procedureField',
  'PROCEDUREVALUEID': 'procedureValueId',
  'DETAILTYPE': 'detailType'
}

const URL = 'http://172.20.11.57:8887/farm/'

export const requestInStore = {
  'GETFAVORITE': URL + 'favorite/getall?customer_id=',
  'GETCART': URL + 'cart/find?customer_id=',
  'GETGIFTNUM': URL + 'gift/getall?current_page=1&size=3',
  'GETGIFTSBYPAGE': URL + 'gift/getall?current_page=',
  'GETGIFTSBYSIZE': '&size=',
  'GETGIFTBYCATEGORY': '&type_id=',
  'GETGIFTBYLOWPOINT': '&low_point=',
  'GETGIFTBYHIGHPOINT': '&high_point=',
  'GETGIFTBYNAME': '&giftname=',
  'GETGIFTDETAIL': URL + 'gift/find?giftid=',
  'ADDFAVORITE': URL + 'favoritesID/add',
  'DELETEFAVORITE': URL + 'favorite/delete?favorite_id=',
  'ADDCART': URL + 'cart/add',
  'UPDATECARTNUM1': URL + 'cartID/update?cdid=',
  'UPDATECARTNUM2': '&number=',
  'DELETECART': URL + 'cartID/delete?cdid=',
  'GETCONTACTINFO': URL + 'customer/getaddrs?customer_id=',
  'UPDATACONTACTINFODEFAULT': URL + 'contactInfos/setdeft',
  'ADDCONTACTINFO': URL + 'contactInfos'
}
export const constInStore = {
  'PAGESIZE': 8
}

export const requestInEnterprise = {
  'GIFTDELETE': URL + 'gift/delete?giftid=',
  //
  'REGISTERCUSTOMER': URL + 'customer/reg',
  'REGISTERENTERPRISE': URL + 'user/reg',
  'GETCOMPANY': URL + 'company/getall',
  'GETFIELDTYPE': URL + 'type/getall',
  'ADDPROCEDUREFIELDS': URL + 'consistdetail/add',
  'GETPROCEDUREFIELDS': URL + 'consistprocess/getall?username=',
  'GETOPERATORS': URL + 'user/findbyuname?username=',
  'ADDPROCEDURECONSIST': URL + 'consistprocess/set',
  'GETPROCEDURECHAIN': URL + 'chain/getall',
  'GETPROCEDUREVALUE1': URL + 'process/getall?consistprocessid=',
  'GETPROCEDUREVALUE2': '&current_page=',
  'GETPROCEDUREVALUE3': '&size=',
  'ADDPROCEDUREVALUE': URL + 'process/add',
  'UPDATEPROCEDUREVALUE': URL + 'process/update',
  'UPLOADIMAGE': URL + 'process/upload',
  'UPLOADIMAGEBATCH': URL + 'propic/upload',
  'DELETERECORDVALUE': URL + 'process/delete?processid='
}

export const constInEnterprise = {
  'PAGESIZE': 8
}

export const requestInIndex = {
  'GETUSER': URL + 'user/log'
}

export const requestInShow = {
  'SEARCH': URL + 'product/find',
  'COMPANY_DETAIL': URL + 'product/bypid',
  'TRACE_DETAIL': URL + 'process/getbyTraceCode',
  'GET_COMMENTS': URL + 'productcomment/get',
  'ADD_COMMENT': URL + 'productcomment/add'
}
export const path = {
  'PICTURE': 'http://172.20.11.57:8887/farm/image_uploaded/'
}
