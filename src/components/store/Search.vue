<template>
  <div class="search">
    <Row>
      <i-col offset="8" span="8">
        <i-input v-model="text">
          <span slot="append">
            <i-button type="primary" @click="searchByName">search by text</i-button>
          </span>
        </i-input>
      </i-col>
    </Row>
    <br>
    <Row>
      <i-col offset="8" span="4">
        <i-input v-model="score.low" placeholder="low score"></i-input>
      </i-col>
      <i-col span="4">
        <i-input v-model="score.high" placeholder="high score"></i-input>
      </i-col>
      <i-col span="2">
        <i-button type="primary" @click="searchByScore">search by scores</i-button>
      </i-col>
    </Row>
    <Row>
      <i-col span="3" offset="1">search by categories:</i-col>
      <i-col span="2">
        <a @click="searchByCategory(category1)">category1</a>
      </i-col>
      <i-col span="2">
        <a @click="searchByCategory(category2)">category2</a>
      </i-col>
    </Row>
  </div>
</template>

<script>
  import axios from 'axios'
  import {lsKeyInStore, requestInStore, constInStore} from '../../util/const'
  // import IInput from 'iview/src/components/input/input'
  // import IButton from 'iview/src/components/button/button'
  // import Row from 'iview/src/components/grid/row'
  // import ICol from 'iview/src/components/grid/col'

  export default {
    components: {
      // ICol,
      // Row,
      // IInput,
      // IButton
    },
    data () {
      return {
        text: '',
        score: {
          low: '',
          high: ''
        },
        category1: 1,
        category2: 2
      }
    },
    methods: {
      searchByName () {
        if (this.text === '') {
          alert('please input giftname...')
        } else {
          this.$store.dispatch('setSearchType', 'name')
          this.$store.dispatch('setName', this.text)
          axios.get(requestInStore.GETGIFTSBYPAGE + 1 + requestInStore.GETGIFTSBYSIZE + constInStore.PAGESIZE + requestInStore.GETGIFTBYNAME + this.text)
            .then((response) => {
              localStorage.setItem(lsKeyInStore.GIFTNUM, JSON.stringify(response.data.total))
              this.$store.dispatch('loadGiftNumFromLocal')
              return axios.get(requestInStore.GETGIFTSBYPAGE + 1 + requestInStore.GETGIFTSBYSIZE + constInStore.PAGESIZE + requestInStore.GETGIFTBYNAME + this.text)
                .then((response) => {
                  localStorage.setItem((lsKeyInStore.GIFTS + 1), JSON.stringify(response.data.rows))
                  this.$store.dispatch('loadGiftsFromLocal', 1)
                })
            })
        }
      },
      searchByCategory (typeId) {
        this.$store.dispatch('setSearchType', 'category')
        this.$store.dispatch('setCategory', typeId)
        axios.get(requestInStore.GETGIFTSBYPAGE + 1 + requestInStore.GETGIFTSBYSIZE + constInStore.PAGESIZE + requestInStore.GETGIFTBYCATEGORY + typeId)
          .then((response) => {
            localStorage.setItem(lsKeyInStore.GIFTNUM, JSON.stringify(response.data.total))
            this.$store.dispatch('loadGiftNumFromLocal')
            return axios.get(requestInStore.GETGIFTSBYPAGE + 1 + requestInStore.GETGIFTSBYSIZE + constInStore.PAGESIZE + requestInStore.GETGIFTBYCATEGORY + typeId)
              .then((response) => {
                localStorage.setItem((lsKeyInStore.GIFTS + 1), JSON.stringify(response.data.rows))
                this.$store.dispatch('loadGiftsFromLocal', 1)
              })
          })
      },
      searchByScore () {
        if (this.score.low === '' | this.score.high === '') {
          alert('please input score...')
        } else {
          this.$store.dispatch('setSearchType', 'score')
          this.$store.dispatch('setScore', this.score)
          axios.get(requestInStore.GETGIFTSBYPAGE + 1 + requestInStore.GETGIFTSBYSIZE + constInStore.PAGESIZE + requestInStore.GETGIFTBYLOWPOINT + this.score.low + requestInStore.GETGIFTBYHIGHPOINT + this.score.high)
            .then((response) => {
              localStorage.setItem(lsKeyInStore.GIFTNUM, JSON.stringify(response.data.total))
              this.$store.dispatch('loadGiftNumFromLocal')
              return axios.get(requestInStore.GETGIFTSBYPAGE + 1 + requestInStore.GETGIFTSBYSIZE + constInStore.PAGESIZE + requestInStore.GETGIFTBYLOWPOINT + this.score.low + requestInStore.GETGIFTBYHIGHPOINT + this.score.high)
                .then((response) => {
                  localStorage.setItem((lsKeyInStore.GIFTS + 1), JSON.stringify(response.data.rows))
                  this.$store.dispatch('loadGiftsFromLocal', 1)
                })
            })
        }
      }
    }
  }
</script>

<style scoped>
  .search {
    margin-top: 100px;
  }
</style>
