<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-6">
        img
      </div>
      <div class="col-xs-6">
        <h2>{{giftDetail.giftname}}</h2>
        <p>所需积分：{{giftDetail.need_point}}</p>
        <p>剩余库存：{{giftDetail.stock}}</p>
        <p>参考价格：{{giftDetail.price}}</p>
        <p>
          <button class="btn btn-default" @click="deleteFromFavorite()" v-if="isTheGiftInFavorite">取消收藏
          </button>
          <button class="btn btn-default" @click="addToFavorite(giftDetail.id)" v-else>收藏</button>
        </p>
        <div>
          <button class="btn btn-default" @click="showDiv" v-if="show">加入购物车</button>
          <div class="row" v-else>
            <div class="col-xs-6">
              <div class="input-group">
                <div class="input-group-btn">
                  <button class="btn btn-default" @click="countPlus">+</button>
                </div>
                <input type="text" class="form-control" v-model="count">
                <div class="input-group-btn">
                  <button class="btn btn-default" @click="countMinus" :disabled="minusButton">-</button>
                </div>
              </div>
            </div>
            <div class="col-xs-6">
              <button class="btn btn-default" @click="updateCart()" v-if="isTheGiftInCart">加入购物车</button>
              <button class="btn btn-default" @click="addToCart(giftDetail.id)" v-else>加入购物车</button>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12 detail">
          <p>礼品详情：</p>
          <p>{{giftDetail.description}}</p>
          <br>
          <p>giftDetail：{{giftDetail}}</p>
          <br>
          <p>favorite：{{favorite}}</p>
          <br>
          <p>isTheGiftInFavorite：{{isTheGiftInFavorite}}</p>
          <br>
          <p>cart：{{cart}}</p>
          <br>
          <p>isTheGiftInCart：{{isTheGiftInCart}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import {mapGetters} from 'vuex'
  import {lsKeyInStore, requestInStore} from '../../util/const'

  export default {
    mounted: function () {
      axios.get(requestInStore.GETGIFTDETAIL + this.id)
        .then((response) => {
          localStorage.setItem(lsKeyInStore.GIFTDETAIL, JSON.stringify(response.data))
          this.$store.dispatch('loadGiftDetailFromLocal')
        })
      this.$store.dispatch('loadFavoriteFromLocal')
      this.$store.dispatch('loadCartFromLocal')
    },
    data () {
      return {
        show: true,
        count: 1,
        minusButton: true
      }
    },
    props: ['id'],
    computed: {
      ...mapGetters({
        user: 'getUser',
        giftDetail: 'getGiftDetail',
        favorite: 'getFavorite',
        cart: 'getCart'
      }),
      theFavoriteId () {
        const theFavorite = this.favorite.find((item) => item.gift_id.id === this.giftDetail.id)
        return theFavorite.favorite_id
      },
      theCartId () {
        const theCart = this.cart.find((item) => item.gift.id === this.giftDetail.id)
        return theCart.id
      },
      currentCount () {
        for (let i = 0; i < this.cart.length; i++) {
          if (this.cart[i].gift.id === Number(this.id)) {
            return this.cart[i].number
          }
        }
      },
      isTheGiftInFavorite () {
        let ids = []
        for (let i = 0; i < this.favorite.length; i++) {
          ids.push(this.favorite[i].gift_id.id)
        }
        if (ids.includes(Number(this.id))) {
          return true
        } else {
          return false
        }
      },
      isTheGiftInCart () {
        let ids = []
        for (let i = 0; i < this.cart.length; i++) {
          ids.push(this.cart[i].gift.id)
        }
        if (ids.includes(Number(this.id))) {
          return true
        } else {
          return false
        }
      }
    },
    methods: {
      addToFavorite (giftId) {
        axios.post(requestInStore.ADDFAVORITE, {'customer_id': this.user.id, 'gift_id': Number(giftId)})
          .then((response) => {
            console.log(response.data)
            let favorites = JSON.parse(localStorage.getItem(lsKeyInStore.FAVORITE))
            favorites.push(response.data)
            localStorage.setItem(lsKeyInStore.FAVORITE, JSON.stringify(favorites))
            this.$store.dispatch('loadFavoriteFromLocal')
          })
      },
      deleteFromFavorite () {
        axios.get(requestInStore.DELETEFAVORITE + this.theFavoriteId)
          .then((response) => {
            if (response.data === 'success') {
              let favorites = JSON.parse(localStorage.getItem(lsKeyInStore.FAVORITE))
              favorites = favorites.filter((favorite) => favorite.favorite_id !== Number(this.theFavoriteId))
              localStorage.setItem(lsKeyInStore.FAVORITE, JSON.stringify(favorites))
              this.$store.dispatch('loadFavoriteFromLocal')
            } else {
              alert('delete failed')
            }
          })
      },
      showDiv () {
        this.show = false
      },
      countPlus () {
        this.count += 1
        if (this.count > 1) {
          this.minusButton = false
        }
      },
      countMinus () {
        if (this.count <= 1) {
          this.minusButton = true
        } else {
          this.count -= 1
        }
      },
      addToCart (id) {
        const reg = /^\d$/
        if (this.count >= 1 && this.count <= this.giftDetail.stock) {
          axios.post(requestInStore.ADDCART, {
            'customer_id': this.user.id,
            'gift_id': id,
            'number': Number(this.count)
          })
            .then((response) => {
              let carts = JSON.parse(localStorage.getItem(lsKeyInStore.CART))
              carts.push(response.data)
              localStorage.setItem(lsKeyInStore.CART, JSON.stringify(carts))
              this.$store.dispatch('loadCartFromLocal')
              alert('添加成功')
              this.show = true
            })
        } else if (this.count < 1) {
          alert('商品每次最少添加1件')
          this.count = 1
        } else if (this.count > this.giftDetail.stock) {
          alert('兑换数量不能超过库存数量')
          this.count = this.giftDetail.stock
        } else if (!reg.test(this.count)) {
          alert('请输入正确数量')
          this.count = 1
        }
      },
      updateCart () {
        const reg = /^\d$/
        const currentStock = this.giftDetail.stock - this.currentCount
        if (this.count >= 1 && this.count <= currentStock) {
          axios.get(requestInStore.UPDATECARTNUM1 + this.theCartId + requestInStore.UPDATECARTNUM2 + (this.currentCount + this.count))
            .then((response) => {
              if (response.data === 'success') {
                let carts = JSON.parse(localStorage.getItem(lsKeyInStore.CART))
                for (let i = 0; i < carts.length; i++) {
                  if (carts[i].id === this.theCartId) {
                    carts[i].number = this.currentCount + this.count
                  }
                }
                localStorage.setItem(lsKeyInStore.CART, JSON.stringify(carts))
                this.$store.dispatch('loadCartFromLocal')
                alert('添加成功')
                this.show = true
              } else {
                alert('update failed')
              }
            })
        } else if (this.count < 1) {
          alert('商品每次最少添加1件')
          this.count = 1
        } else if (this.count > currentStock) {
          alert('兑换数量不能超过剩余库存数量')
        } else if (!reg.test(this.count)) {
          alert('请输入正确数量')
          this.count = 1
        }
      }
    }
  }
</script>

<style scoped>
  .container {
    margin-top: 100px;
  }

  .detail {
    margin-top: 50px;
  }
</style>
