<template>
  <div>
    <ul class="list-group">
      <li class="list-group-item" v-for="item in order">
        商品信息：
        <ul class="list-group">
          <li class="list-group-item" v-for="orderdetail in item.orderdetails">
            {{orderdetail.gift.giftname}}&nbsp{{orderdetail.number}}&nbsp{{orderdetail.gift.need_point}}
          </li>
        </ul>
        <p>
          收货信息：{{item.customerinfo.address}}&nbsp{{item.customerinfo.phone}}&nbsp{{item.customerinfo.postcode}}&nbsp{{item.customerinfo.receive_name}}</p>
        <p>下单时间：{{item.otime}}</p>
        <div v-if="!Boolean(Number(item.state))">
          物流状态：未发货
        </div>
        <div v-else>
          <p>物流状态：已发货</p>
          <p>订单号：{{item.logistics_id}}</p>
          <p>物流公司：{{item.logisticsInfo.logisticsCompany}}</p>
        </div>
      </li>
    </ul>
    {{order}}
  </div>
</template>

<script>
  import axios from 'axios'
  import {mapGetters} from 'vuex'
  import {lsKeyInStore, requestInStore} from '../../util/const'

  export default {
    mounted: function () {
      this.$store.dispatch('loadUserFromLocal')
      axios.post(requestInStore.GETORDER,
        {
          'customer_id': this.user.id
        })
        .then((response) => {
          localStorage.setItem(lsKeyInStore.ORDER, JSON.stringify(response.data.rows))
          this.$store.dispatch('loadOrderFromLocal')
        })
    },
    computed: {
      ...mapGetters({
        user: 'getUser',
        order: 'getOrder'
      })
    }
  }
</script>

<style scoped>

</style>
