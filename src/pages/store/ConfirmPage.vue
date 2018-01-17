<template>
  <div class="container">
    <div class="thumbnail">
      <ul class="list-group">
        <li class="list-group-item" v-for="item in contactInfo">
          <div class="row">
            <div class="col-xs-3">
              {{item.address}}
            </div>
            <div class="col-xs-3">
              {{item.phone}}
            </div>
            <div class="col-xs-3">
              {{item.receive_name}}
            </div>
            <div class="col-xs-1">
              {{item.postcode}}
            </div>
            <div class="col-xs-2">
              <div v-if="Boolean(item.isdefault)">
                默认地址
              </div>
              <div v-else>
                <button class="btn btn-default" @click="setDefault(item.id)">设为默认地址</button>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <button class="btn btn-primary" @click="showAddressForm" v-if="addAddress">新增地址</button>
      <contact-info :showForm="addAddress" @showButton="showAddressButton" v-else></contact-info>
    </div>
    <div>
      您所拥有的积分：{{user.point}}
      <br>
      订单所需总积分：{{totalScore}}
      <ul class="list-group">
        <li class="list-group-item" v-for="(item,index) in cart" :key="index">
          <div class="row">
            <div class="col-xs-3">
              img
            </div>
            <div class="col-xs-3">
              {{item.gift.giftname}}
            </div>
            <div class="col-xs-2">
              所需积分：{{item.gift.need_point}}
            </div>
            <div class="col-xs-2">
              兑换数量：{{item.number}}
            </div>
            <div class="col-xs-2">
              兑换所需积分：{{item.number * item.gift.need_point}}
            </div>
          </div>
        </li>
      </ul>
      <div>
        <button class="btn btn-default" @click="submitOrder">提交订单</button>
      </div>
    </div>
    contactInfo：{{contactInfo}}
    <br>
    <br>
    cart: {{cart}}
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import ContactInfo from '../../components/store/ContactInfo.vue'
  import axios from 'axios'
  import {lsKeyInStore, requestInStore} from '../../util/const'

  export default {
    components: {
      ContactInfo
    },
    mounted: function () {
      this.$store.dispatch('loadCartFromLocal')
      this.$store.dispatch('loadUserFromLocal')
      axios.get(requestInStore.GETCONTACTINFO + this.user.id)
        .then((response) => {
          localStorage.setItem(lsKeyInStore.CONTACTINFO, JSON.stringify(response.data))
          this.$store.dispatch('loadContactInfoFromLocal')
        })
    },
    data () {
      return {
        addAddress: true
      }
    },
    computed: {
      ...mapGetters({
        user: 'getUser',
        cart: 'getCart',
        contactInfo: 'getContactInfo'
      }),
      totalScore () {
        let totalScore = 0
        for (let i = 0; i < this.cart.length; i++) {
          totalScore += this.cart[i].number * this.cart[i].gift.need_point
        }
        return totalScore
      }
    },
    methods: {
      showAddressForm () {
        this.addAddress = !this.addAddress
      },
      showAddressButton (data) {
        this.addAddress = data
      },
      setDefault (id) {
        axios.post(requestInStore.UPDATACONTACTINFODEFAULT,
          {
            'id': id + '',
            'customerid': this.user.id
          })
          .then((response) => {
            if (response.data === 'success') {
              let contactInfos = JSON.parse(localStorage.getItem(lsKeyInStore.CONTACTINFO))
              for (let i = 0; i < contactInfos.length; i++) {
                if (contactInfos[i].id === id) {
                  contactInfos[i].isdefault = 1
                } else {
                  contactInfos[i].isdefault = 0
                }
              }
              localStorage.setItem(lsKeyInStore.CONTACTINFO, JSON.stringify(contactInfos))
              this.$store.dispatch('loadContactInfoFromLocal')
            } else {
              alert('update failed')
            }
          })
      },
      submitOrder () {
        axios.post(requestInStore.ADDORDER, {
          'id': this.user.id,
          'point': this.user.point
        })
          .then((response) => {
            if (response.data === 'success') {
              // 由于用户积分及购物车信息只在登录时请求，所以需要本地更新
              this.user.score -= this.totalScore
              localStorage.setItem(lsKeyInStore.USER, JSON.stringify(this.user))
              this.$store.dispatch('clearCart')
              localStorage.setItem(lsKeyInStore.CART, JSON.stringify(this.cart))
              this.$router.push({path: 'confirmSuccess'})
            } else {
              alert('submit order failed')
            }
          })
      }
    }
  }
</script>

<style scoped>
  .container {
    margin-top: 100px;
  }
</style>
