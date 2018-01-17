<template>
  <div class="container">
    <div v-if="cart.length === 0">
      <div class="row">
        <div class="col-xs-2 col-xs-offset-5">
          您未添加任何商品
        </div>
      </div>
    </div>
    <div v-else>
      您所拥有的积分：{{user.point}}
      <br>
      订单所需总积分：{{totalScore}}
      <ul class="list-group">
        <li class="list-group-item" v-for="(item,index) in cart" :key="index">
          <div class="row">
            <div class="col-xs-3">
              img
            </div>
            <div class="col-xs-1">
              {{item.gift.giftname}}
            </div>
            <div class="col-xs-1">
              所需积分：{{item.gift.need_point}}
            </div>
            <div class="col-xs-1">
              剩余库存：{{item.gift.stock}}
            </div>
            <div class="col-xs-2">
              <div v-if="isChangeButton[index]">
                当前数量：{{item.number}}
              </div>
              <div class="input-group" v-else>
                <div class="input-group-btn">
                  <button class="btn btn-default" @click="countPlus(index)">+</button>
                </div>
                <input type="text" class="form-control" v-model="item.number">
                <div class="input-group-btn">
                  <button class="btn btn-default" @click="countMinus(index)" :disabled="minusButton[index]">-</button>
                </div>
              </div>
            </div>
            <div class="col-xs-2">
              兑换所需积分：{{item.number * item.gift.need_point}}
            </div>
            <div class="col-xs-2">
              <button class="btn btn-primary" @click="deleteFromCart(item.id)">删除</button>
              <button class="btn btn-primary" @click="changeButtonStatus(index)" v-if="isChangeButton[index]">修改数量
              </button>
              <button class="btn btn-primary" @click="submitChange(item.id,index)" v-else>提交修改</button>
            </div>
          </div>
        </li>
      </ul>
      <div>
        <button class="btn btn-primary" @click="submitOrder">提交订单</button>
      </div>
    </div>
    {{cart}}
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import axios from 'axios'
  import {lsKeyInStore, requestInStore} from '../../util/const'

  export default {
    mounted: function () {
      this.$store.dispatch('loadCartFromLocal')
      this.$store.dispatch('loadUserFromLocal')
      for (let i = 0; i < this.cart.length; i++) {
        this.isChangeButton[i] = true
        this.minusButton[i] = false
      }
    },
    data () {
      return {
        minusButton: [],
        isChangeButton: []
      }
    },
    computed: {
      ...mapGetters({
        user: 'getUser',
        cart: 'getCart'
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
      deleteFromCart (id) {
        axios.get(requestInStore.DELETECART + id)
          .then((response) => {
            if (response.data === 'success') {
              let carts = JSON.parse(localStorage.getItem(lsKeyInStore.CART))
              carts = carts.filter((cart) => cart.id !== id)
              localStorage.setItem(lsKeyInStore.CART, JSON.stringify(carts))
              this.$store.dispatch('loadCartFromLocal')
            } else {
              alert('delete failed')
            }
          })
      },
      countPlus (index) {
        this.cart[index].number += 1
        localStorage.setItem(lsKeyInStore.CART, JSON.stringify(this.cart))
        if (this.cart[index].number > 1) {
          this.$set(this.minusButton, index, false)
        }
      },
      countMinus (index) {
        if (this.cart[index].number <= 1) {
          this.$set(this.minusButton, index, true)
        } else {
          this.cart[index].number -= 1
          localStorage.setItem(lsKeyInStore.CART, JSON.stringify(this.cart))
        }
      },
      changeButtonStatus (index) {
        this.$set(this.isChangeButton, index, !this.isChangeButton[index])
      },
      submitChange (id, index) {
        const reg = /^\d$/
        const newNumber = this.cart[index].number
        if (newNumber >= 1 && newNumber <= this.cart[index].gift.stock) {
          axios.get(requestInStore.UPDATECARTNUM1 + id + requestInStore.UPDATECARTNUM2 + newNumber)
            .then((response) => {
              if (response.data === 'success') {
                let carts = JSON.parse(localStorage.getItem(lsKeyInStore.CART))
                carts[index].number = newNumber
                localStorage.setItem(lsKeyInStore.CART, JSON.stringify(carts))
                this.$set(this.isChangeButton, index, !this.isChangeButton[index])
              } else {
                alert('update failed')
              }
            })
        } else if (newNumber < 1) {
          alert('商品每次最少添加1件')
          this.cart[index].number = 1
        } else if (newNumber > this.cart[index].stock) {
          alert('兑换数量不能超过库存数量')
          this.cart[index].number = this.cart[index].stock
        } else if (!reg.test(newNumber)) {
          alert('请输入正确数量')
          this.cart[index].number = 1
        }
      },
      submitOrder () {
        if (this.totalScore > this.user.point) {
          alert('您的积分不足')
          return
        }
        this.$router.push({path: 'confirm'})
      }
    }
  }
</script>

<style scoped>
  .container {
    margin-top: 100px;
  }
</style>
