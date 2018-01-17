<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-3 product" v-for="gift in gifts">
        <div class="thumbnail">
          img
          <div class="caption">
            <h4>{{gift.giftname}}</h4>
            <p>所需积分：{{gift.need_point}}</p>
            <p>参考价格：{{gift.price}}</p>
            <button class="btn btn-primary" @click="goToDetail(gift.id)">查看详情</button>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-4 col-xs-offset-4 text-center">
        <nav aria-label="Page navigation">
          <ul class="pagination">
            <li>
              <a @click="goToFirst" aria-label="Previous">
                <span aria-hidden="true">首页</span>
              </a>
            </li>
            <li v-if="preIsClicked">
              <a @click="goToPre" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li class="disabled" v-else>
              <span aria-hidden="true">&laquo;</span>
            </li>
            <li :class="{active:isActive[index-1]}" v-for="index in indexs"><a @click="goToThePage(index)">{{index}}</a>
            </li>
            <li v-if="nextIsClicked">
              <a @click="goToNext" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
            <li class="disabled" v-else>
              <span aria-hidden="true">&raquo;</span>
            </li>
            <li>
              <a @click="goToLast" aria-label="Previous">
                <span aria-hidden="true">末页</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    currentPage：{{currentPage}}
    <ul>
      <li v-for="gift in gifts">{{gift}}</li>
    </ul>
    giftPage：{{giftPage}}
  </div>
</template>

<script>
  import axios from 'axios'
  import {mapGetters} from 'vuex'
  import {lsKeyInStore, requestInStore, constInStore} from '../../util/const'

  export default {
    mounted: function () {
      // 将搜索类型初始化为default，即进入此组件时默认请求所有礼品信息
      this.$store.dispatch('setSearchType', 'default')
      axios.get(requestInStore.GETGIFTSBYPAGE + this.currentPage + requestInStore.GETGIFTSBYSIZE + constInStore.PAGESIZE)
        .then((response) => {
          localStorage.setItem(lsKeyInStore.GIFTNUM, JSON.stringify(response.data.total))
          this.$store.dispatch('loadGiftNumFromLocal')
          return this.requestGiftsByPage(this.currentPage)
        })
    },
    data () {
      return {
        currentPage: 1,
        preIsClicked: false,
        nextIsClicked: true
      }
    },
    computed: {
      ...mapGetters({
        giftPage: 'getGiftPage',
        searchType: 'getSearchType',
        searchScore: 'getSearchScore',
        searchName: 'getSearchName',
        searchCategory: 'getSearchCategory'
      }),
      gifts () {
        return this.$store.getters.getGifts(this.currentPage)
      },
      indexs () {
        let indexs = []
        for (let i = 0; i < this.giftPage; i++) {
          indexs[i] = i + 1
        }
        if (this.giftPage < 3) {
          return indexs
        }
        if (this.currentPage === 1) {
          indexs = [indexs[this.currentPage - 1], indexs[this.currentPage], indexs[this.currentPage + 1]]
          return indexs
        } else if (this.currentPage === this.giftPage) {
          indexs = [indexs[this.currentPage - 3], indexs[this.currentPage - 2], indexs[this.currentPage - 1]]
          return indexs
        } else {
          indexs = [indexs[this.currentPage - 2], indexs[this.currentPage - 1], indexs[this.currentPage]]
          return indexs
        }
      },
      isActive () {
        let isActive = []
        for (let i = 0; i < this.giftPage; i++) {
          if (i === this.currentPage - 1) {
            isActive[i] = true
          } else {
            isActive[i] = false
          }
        }
        return isActive
      }
    },
    methods: {
      goToDetail (id) {
        this.$router.push({path: `detail/${id}`})
      },
      goToPre () {
        if (this.currentPage === 1) {
          this.preIsClicked = false
        } else {
          this.currentPage -= 1
          this.requestGiftsByPage(this.currentPage)
          this.nextIsClicked = true
        }
      },
      goToNext () {
        if (this.currentPage === this.giftPage) {
          this.nextIsClicked = false
        } else {
          this.currentPage += 1
          this.requestGiftsByPage(this.currentPage)
          this.preIsClicked = true
        }
      },
      goToFirst () {
        this.currentPage = 1
        this.requestGiftsByPage(this.currentPage)
      },
      goToLast () {
        this.currentPage = this.giftPage
        this.requestGiftsByPage(this.currentPage)
      },
      goToThePage (index) {
        this.currentPage = index
        this.requestGiftsByPage(index)
      },
      requestGiftsByPage (page) {
        if (this.searchType === 'score') {
          axios.get(requestInStore.GETGIFTSBYPAGE + this.currentPage + requestInStore.GETGIFTSBYSIZE + constInStore.PAGESIZE + requestInStore.GETGIFTBYLOWPOINT + this.searchScore.low + requestInStore.GETGIFTBYHIGHPOINT + this.searchScore.high)
            .then((response) => {
              localStorage.setItem((lsKeyInStore.GIFTS + page), JSON.stringify(response.data.rows))
              this.$store.dispatch('loadGiftsFromLocal', page)
            })
        } else if (this.searchType === 'category') {
          axios.get(requestInStore.GETGIFTSBYPAGE + 1 + requestInStore.GETGIFTSBYSIZE + constInStore.PAGESIZE + requestInStore.GETGIFTBYCATEGORY + this.searchCategory)
            .then((response) => {
              localStorage.setItem((lsKeyInStore.GIFTS + page), JSON.stringify(response.data.rows))
              this.$store.dispatch('loadGiftsFromLocal', page)
            })
        } else if (this.searchType === 'name') {
          axios.get(requestInStore.GETGIFTSBYPAGE + 1 + requestInStore.GETGIFTSBYSIZE + constInStore.PAGESIZE + requestInStore.GETGIFTBYNAME + this.searchName)
            .then((response) => {
              localStorage.setItem((lsKeyInStore.GIFTS + page), JSON.stringify(response.data.rows))
              this.$store.dispatch('loadGiftsFromLocal', page)
            })
        } else {
          axios.get(requestInStore.GETGIFTSBYPAGE + this.currentPage + requestInStore.GETGIFTSBYSIZE + constInStore.PAGESIZE)
            .then((response) => {
              localStorage.setItem((lsKeyInStore.GIFTS + page), JSON.stringify(response.data.rows))
              this.$store.dispatch('loadGiftsFromLocal', page)
            })
        }
      }
    }
  }
</script>

<style scoped>
  .container {
    margin-top: 20px;
  }

  .product {
    padding: 0;
  }
</style>
